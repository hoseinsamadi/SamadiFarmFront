/* ════════════════════════════════════════════════════════════
   صمدی فارم — وضعیت سراسری فروشگاه
   سبد خرید، حساب کاربری، آدرس‌ها، سفارش‌ها، تخفیف و توست.
   در نسخه‌ی جنگو، این لایه به APIهای DRF + توکن JWT وصل می‌شود.
   ════════════════════════════════════════════════════════════ */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { PRODUCTS, DISCOUNT_CODES, type Product } from "../data/site";
import {
  storage,
  uid,
  faDate,
  normalizeDigits,
  type Address,
  type Order,
  type OrderItem,
  type SessionUser,
} from "../lib/storage";

export interface CartEntry {
  product: Product;
  qty: number;
}

interface ShopState {
  cart: CartEntry[];
  cartCount: number;
  cartSubtotal: number;
  addToCart: (p: Product) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;

  user: SessionUser | null;
  signup: (name: string, email: string, phone: string, password: string) => string | null;
  login: (email: string, password: string) => string | null;
  logout: () => void;

  addresses: Address[];
  saveAddress: (a: Omit<Address, "id" | "owner">) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  orders: Order[];
  placeOrder: (payload: {
    shipping: number;
    shippingTitle: string;
    payment: string;
    address: Address;
  }) => Order;

  discount: { code: string; rate: number } | null;
  applyDiscount: (code: string) => boolean;
  clearDiscount: () => void;

  toast: string | null;
  showToast: (msg: string) => void;
}

const Ctx = createContext<ShopState | null>(null);

export function useShop(): ShopState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useShop باید داخل ShopProvider استفاده شود");
  return v;
}

export function ShopProvider({ children }: { children: ReactNode }) {
  /* ── سبد خرید ── */
  const [cart, setCart] = useState<CartEntry[]>(() => {
    const saved = storage.cart.get();
    return saved
      .map((s) => {
        const product = PRODUCTS.find((p) => p.id === s.id);
        return product ? { product, qty: s.qty } : null;
      })
      .filter((e): e is CartEntry => e !== null);
  });

  useEffect(() => {
    storage.cart.save(cart.map((e) => ({ id: e.product.id, qty: e.qty })));
  }, [cart]);

  const addToCart = useCallback((p: Product) => {
    setCart((prev) => {
      const found = prev.find((e) => e.product.id === p.id);
      if (found) return prev.map((e) => (e.product.id === p.id ? { ...e, qty: e.qty + 1 } : e));
      return [...prev, { product: p, qty: 1 }];
    });
  }, []);

  const inc = useCallback(
    (id: string) =>
      setCart((prev) => prev.map((e) => (e.product.id === id ? { ...e, qty: e.qty + 1 } : e))),
    []
  );
  const dec = useCallback(
    (id: string) =>
      setCart((prev) =>
        prev.map((e) => (e.product.id === id ? { ...e, qty: e.qty - 1 } : e)).filter((e) => e.qty > 0)
      ),
    []
  );
  const removeItem = useCallback(
    (id: string) => setCart((prev) => prev.filter((e) => e.product.id !== id)),
    []
  );
  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((s, e) => s + e.qty, 0);
  const cartSubtotal = cart.reduce((s, e) => s + e.qty * e.product.price, 0);

  /* ── توست ── */
  const [toast, setToast] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => setToast(msg), []);
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(t);
  }, [toast]);

  /* ── حساب کاربری ── */
  const [user, setUser] = useState<SessionUser | null>(() => storage.session.get());

  const signup = useCallback(
    (name: string, email: string, phone: string, password: string): string | null => {
      const users = storage.users.all();
      const normalizedEmail = normalizeDigits(email).trim().toLowerCase();
      if (users.some((u) => u.email === normalizedEmail)) {
        return "این ایمیل قبلاً ثبت شده است؛ وارد شوید.";
      }
      const account = {
        name: name.trim(),
        email: normalizedEmail,
        phone: normalizeDigits(phone).trim(),
        password,
      };
      storage.users.save([...users, account]);
      const session = { name: account.name, email: account.email, phone: account.phone };
      storage.session.set(session);
      setUser(session);
      return null;
    },
    []
  );

  const login = useCallback((email: string, password: string): string | null => {
    const normalizedEmail = normalizeDigits(email).trim().toLowerCase();
    const account = storage.users.all().find((u) => u.email === normalizedEmail);
    if (!account || account.password !== password) {
      return "ایمیل یا رمز عبور اشتباه است.";
    }
    const session = { name: account.name, email: account.email, phone: account.phone };
    storage.session.set(session);
    setUser(session);
    return null;
  }, []);

  const logout = useCallback(() => {
    storage.session.set(null);
    setUser(null);
  }, []);

  /* ── آدرس‌ها ── */
  const [addresses, setAddresses] = useState<Address[]>(() => storage.addresses.all());
  useEffect(() => storage.addresses.save(addresses), [addresses]);

  const saveAddress = useCallback(
    (a: Omit<Address, "id" | "owner">) => {
      if (!user) return;
      setAddresses((prev) => {
        const others = a.isDefault
          ? prev.map((x) => ({ ...x, isDefault: false }))
          : prev;
        const next: Address = { ...a, id: uid(), owner: user.email };
        return [...others, next];
      });
    },
    [user]
  );

  const deleteAddress = useCallback(
    (id: string) => setAddresses((prev) => prev.filter((a) => a.id !== id)),
    []
  );
  const setDefaultAddress = useCallback(
    (id: string) =>
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id }))),
    []
  );

  /* ── تخفیف ── */
  const [discount, setDiscount] = useState(() => storage.discount.get());
  const applyDiscount = useCallback((code: string): boolean => {
    const normalized = normalizeDigits(code).trim().toUpperCase();
    const rate = DISCOUNT_CODES[normalized];
    if (!rate) return false;
    const d = { code: normalized, rate };
    setDiscount(d);
    storage.discount.save(d);
    return true;
  }, []);
  const clearDiscount = useCallback(() => {
    setDiscount(null);
    storage.discount.save(null);
  }, []);

  /* ── سفارش‌ها ── */
  const [orders, setOrders] = useState<Order[]>(() => storage.orders.all());
  useEffect(() => storage.orders.save(orders), [orders]);

  const placeOrder = useCallback(
    (payload: { shipping: number; shippingTitle: string; payment: string; address: Address }): Order => {
      const discountAmount = discount ? Math.round(cartSubtotal * discount.rate) : 0;
      const items: OrderItem[] = cart.map((e) => ({
        id: e.product.id,
        name: e.product.name,
        price: e.product.price,
        qty: e.qty,
        weight: e.product.weight,
        img: e.product.img,
      }));
      const order: Order = {
        id: `SM-${uid().slice(0, 6).toUpperCase()}`,
        email: user?.email ?? "",
        items,
        subtotal: cartSubtotal,
        discount: discountAmount,
        shipping: payload.shipping,
        total: cartSubtotal - discountAmount + payload.shipping,
        discountCode: discount?.code ?? null,
        payment: payload.payment,
        address: `${payload.address.city}، ${payload.address.detail}`,
        date: faDate(),
        status: "در حال پردازش",
      };
      setOrders((prev) => [order, ...prev]);
      return order;
    },
    [cart, cartSubtotal, discount, user]
  );

  const value = useMemo<ShopState>(
    () => ({
      cart,
      cartCount,
      cartSubtotal,
      addToCart,
      inc,
      dec,
      removeItem,
      clearCart,
      user,
      signup,
      login,
      logout,
      addresses,
      saveAddress,
      deleteAddress,
      setDefaultAddress,
      orders,
      placeOrder,
      discount,
      applyDiscount,
      clearDiscount,
      toast,
      showToast,
    }),
    [
      cart, cartCount, cartSubtotal, addToCart, inc, dec, removeItem, clearCart,
      user, signup, login, logout,
      addresses, saveAddress, deleteAddress, setDefaultAddress,
      orders, placeOrder, discount, applyDiscount, clearDiscount, toast, showToast,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
