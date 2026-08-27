/* ════════════════════════════════════════════════════════════
   صمدی فارم — App
   سرهم‌بندی همه‌ی بخش‌ها + state سبد خرید، فیلتر و توست.
   ساختار: HTML/JSX در کامپوننت‌ها | CSS جدا در src/styles/site.css
   ════════════════════════════════════════════════════════════ */
import { useCallback, useEffect, useRef, useState } from "react";
import Benefits from "./components/Benefits";
import CartDrawer, { type CartEntry } from "./components/CartDrawer";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import OrderSection from "./components/OrderSection";
import Products, { type Filter } from "./components/Products";
import Story from "./components/Story";
import Testimonials from "./components/Testimonials";
import Ticker from "./components/Ticker";
import { IconCheck } from "./components/icons";
import { PRODUCTS, type Product } from "./data/site";
import { useHeroIntro, useReveal } from "./hooks/useReveal";

export default function App() {
  /* ── state سبد خرید ── */
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [badgeKey, setBadgeKey] = useState(0);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  /* ── فیلتر دسته‌بندی ── */
  const [filter, setFilter] = useState<Filter>("all");

  /* ── توست ── */
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);
  const addedTimer = useRef<number | null>(null);

  /* ── ظهورهای اسکرول و عنوان Hero ── */
  useReveal([filter]);
  useHeroIntro();

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2400);
  }, []);

  const addToCart = useCallback(
    (p: Product) => {
      setCart((c) => ({ ...c, [p.id]: (c[p.id] ?? 0) + 1 }));
      setBadgeKey((k) => +new Date());
      setJustAddedId(p.id);
      if (addedTimer.current) window.clearTimeout(addedTimer.current);
      addedTimer.current = window.setTimeout(() => setJustAddedId(null), 1600);
      showToast(`«${p.name}» به سبد اضافه شد`);
    },
    [showToast]
  );

  const inc = useCallback((id: string) => {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  }, []);

  const dec = useCallback((id: string) => {
    setCart((c) => {
      const next = { ...c };
      if ((next[id] ?? 0) <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setCart((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });
  }, []);

  const entries: CartEntry[] = PRODUCTS.filter((p) => cart[p.id]).map((p) => ({
    product: p,
    qty: cart[p.id],
  }));
  const cartCount = entries.reduce((s, e) => s + e.qty, 0);
  const cartTotal = entries.reduce((s, e) => s + e.qty * e.product.price, 0);

  /* قفل اسکرول وقتی کشو باز است + بستن با Escape */
  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [cartOpen]);

  useEffect(
    () => () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
      if (addedTimer.current) window.clearTimeout(addedTimer.current);
    },
    []
  );

  return (
    <div className="page-root">
      {/* لایه‌ی محیطی (کندوی محو + هاله‌های رنگی) */}
      <div className="ambient" aria-hidden="true" />

      <Header
        cartCount={cartCount}
        badgeKey={badgeKey}
        onCartOpen={() => setCartOpen(true)}
      />

      <main>
        <Hero />
        <Ticker />
        <Benefits />
        <Categories onSelectCategory={setFilter} />
        <Products
          filter={filter}
          onFilter={setFilter}
          onAdd={addToCart}
          justAddedId={justAddedId}
        />
        <Story />
        <Testimonials />
        <OrderSection />
      </main>

      <Footer onSelectCategory={setFilter} />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        entries={entries}
        total={cartTotal}
        onInc={inc}
        onDec={dec}
        onRemove={remove}
        onCheckout={() => setCart({})}
      />

      {/* توستِ بازخورد افزودن به سبد */}
      <div className={`toast${toast ? " is-show" : ""}`} role="status" aria-live="polite">
        <IconCheck size={17} />
        {toast}
      </div>
    </div>
  );
}
