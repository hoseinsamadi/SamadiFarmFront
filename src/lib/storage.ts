/* ════════════════════════════════════════════════════════════
   صمدی فارم — لایه‌ی ذخیره‌سازی محلی
   در نسخه‌ی نهایی، این توابع به API جنگو (DRF) وصل می‌شوند؛
   امضای تابع‌ها طوری طراحی شده که جابه‌جایی بدون تغییر کامپوننت‌ها ممکن باشد.
   ════════════════════════════════════════════════════════════ */

export interface UserAccount {
  name: string;
  email: string;
  phone: string;
  password: string; /* در نسخه‌ی جنگو: هش با PBKDF2 سمت سرور */
}

export interface SessionUser {
  name: string;
  email: string;
  phone: string;
}

export interface Address {
  id: string;
  owner: string;
  receiver: string;
  phone: string;
  province: string;
  city: string;
  detail: string;
  postal: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  weight: string;
  img: string;
}

export interface Order {
  id: string;
  email: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  discountCode: string | null;
  payment: string;
  address: string;
  date: string;
  status: string;
}

const KEYS = {
  users: "samadi_users",
  session: "samadi_session",
  addresses: "samadi_addresses",
  cart: "samadi_cart",
  orders: "samadi_orders",
  discount: "samadi_discount",
  reviews: "samadi-user-reviews",
  helpful: "samadi_helpful_votes",
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* حافظه پر یا غیرفعال — فقط نمایش، بدون ذخیره */
  }
}

export const storage = {
  users: {
    all: () => read<UserAccount[]>(KEYS.users, []),
    save: (list: UserAccount[]) => write(KEYS.users, list),
  },
  session: {
    get: () => read<SessionUser | null>(KEYS.session, null),
    set: (u: SessionUser | null) => write(KEYS.session, u),
  },
  addresses: {
    all: () => read<Address[]>(KEYS.addresses, []),
    save: (list: Address[]) => write(KEYS.addresses, list),
  },
  cart: {
    get: () => read<{ id: string; qty: number }[]>(KEYS.cart, []),
    save: (list: { id: string; qty: number }[]) => write(KEYS.cart, list),
  },
  orders: {
    all: () => read<Order[]>(KEYS.orders, []),
    save: (list: Order[]) => write(KEYS.orders, list),
  },
  discount: {
    get: () => read<{ code: string; rate: number } | null>(KEYS.discount, null),
    save: (d: { code: string; rate: number } | null) => write(KEYS.discount, d),
  },
  reviews: {
    all: () => read<unknown[]>(KEYS.reviews, []),
    save: (list: unknown[]) => write(KEYS.reviews, list),
  },
  helpful: {
    all: () => read<Record<string, "up" | "down">>(KEYS.helpful, {}),
    save: (m: Record<string, "up" | "down">) => write(KEYS.helpful, m),
  },
};

/* تبدیل ارقام فارسی/عربی به لاتین (برای اعتبارسنجی شماره‌ها) */
export function normalizeDigits(s: string): string {
  return s
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
}

export function faDate(): string {
  try {
    return new Intl.DateTimeFormat("fa-IR", { dateStyle: "medium" }).format(new Date());
  } catch {
    return new Date().toLocaleDateString();
  }
}
