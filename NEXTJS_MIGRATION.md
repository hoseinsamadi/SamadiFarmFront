# 🍯 مهاجرت صمدی فارم به Next.js

ساختار فعلی پروژه عمداً طوری چیده شده که مهاجرت به Next.js (App Router) تقریباً «کپی-پیست» باشد.

---

## ۱) ساخت پروژه‌ی Next.js

```bash
npx create-next-app@latest samadi-farm --typescript --tailwind --app --src-dir
cd samadi-farm
```

## ۲) نگاشت فایل‌ها (کپی مستقیم)

| فایل فعلی | محل در Next.js |
|---|---|
| `index.html` | `src/app/layout.tsx` (به‌صورت JSX) |
| `src/pages/HomePage.tsx` | `src/app/page.tsx` |
| `src/pages/ProductsPage.tsx` | `src/app/products/page.tsx` |
| `src/pages/StoryPage.tsx` | `src/app/story/page.tsx` |
| `src/pages/ReviewsPage.tsx` | `src/app/reviews/page.tsx` |
| `src/components/*` | `src/components/*` (بدون تغییر) |
| `src/data/site.ts` | `src/lib/site.ts` |
| `src/hooks/useReveal.ts` | `src/hooks/useReveal.ts` |
| `src/styles/site.css` | `src/app/globals.css` (بعد از `@import "tailwindcss";`) |
| `src/App.tsx` | منطقش به `src/app/layout.tsx` منتقل می‌شود |

## ۳) تغییرات لازم در کد

### الف) حذف روتر دستی
Next.js خودش route می‌سازد؛ این‌ها را حذف کنید:
- `HashRouter` و `Routes` و `AnimatedRoutes` در `App.tsx`
- وابستگی به `react-router-dom`

### ب) جایگزینی ایمپورت‌ها

```tsx
// قبلاً
import { Link } from "react-router-dom";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

// در Next.js
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
```

- `navigate("/products?cat=single")` → `router.push("/products?cat=single")`
- `location.pathname` برای اسکرول به بالا → `usePathname()` در یک کامپوننت کلاینتِ `ScrollToTop` داخل layout

### ج) layout.tsx (جایگزین App.tsx)

چون state سبد خرید داخل layout است، باید کلاینت باشد:

```tsx
// src/app/layout.tsx
"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // ... همان stateهای سبد و توستِ App.tsx
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <html lang="fa" dir="rtl">
      <head>...</head>
      <body>
        <Header ... />
        <main>{children}</main>
        <Footer />
        <CartDrawer ... />
      </body>
    </html>
  );
}
```

### د) useSearchParams در صفحه‌ی محصولات
در App Router باید داخل `<Suspense>` باشد:

```tsx
// src/app/products/page.tsx
import { Suspense } from "react";
import ProductsPageInner from "./ProductsPageInner";

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsPageInner />
    </Suspense>
  );
}
```

### هـ) فونت‌ها با next/font (بهینه‌تر از Google CDN)

```tsx
import { Vazirmatn, Lalezar } from "next/font/google";
const vazir = Vazirmatn({ subsets: ["arabic"], variable: "--font-vazir" });
const lalezar = Lalezar({ weight: "400", subsets: ["arabic"], variable: "--font-lalezar" });
```

### و) metadata (جایگزین title در index.html)

```tsx
export const metadata = {
  title: "صمدی فارم | عسل طبیعی و فرآورده‌های کندو",
  description: "...",
};
```

(اگر layout کلاینت باشد، metadata را در یک `template.tsx` یا routeهای سرور-کامپوننت بگذارید — یا state سبد را با Context به یک کامپوننت کلاینتِ جدا منتقل کنید تا layout سرور بماند.)

---

## ۴) نکات مهم

- ✅ همه‌ی انیمیشن‌ها (reveal، شمارنده، نوار متحرک) با CSS و IntersectionObserver نوشته شده‌اند و **بدون تغییر** در Next.js کار می‌کنند.
- ✅ کامپوننت‌هایی که `useState`/`useEffect` دارند در Next.js به `"use client"` در بالای فایل نیاز دارند (Header، Products، CartDrawer، OrderSection، ReviewsPage، StoryPage برای useCountUp).
- ✅ بیلد نهایی: `npm run build` → خروجی استاتیک با `output: "export"` در `next.config.ts` اگر هاست استاتیک دارید.

## ۵) چرا در این سَندباکس Next.js نشد؟

دستور بیلد این محیط از پیش `vite build` قفل شده و فایل‌های پیکربندی قابل ویرایش نیستند؛ خروجی فقط از مسیر Vite سرو می‌شود. اما کد طوری نوشته شده که همین فایل‌ها با تغییرات بالا مستقیماً در Next.js اجرا شوند.
