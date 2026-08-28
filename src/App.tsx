/* ════════════════════════════════════════════════════════════
   صمدی فارم — ریشه‌ی برنامه
   ساختار چندصفحه‌ای با روتر:
     /          → خانه
     /products  → صفحه‌ی محصولات (با فیلتر دسته‌بندی)
     /story     → داستان برند + ویدیوهای یوتیوب
     /reviews   → دیدگاه مشتریان
   ════════════════════════════════════════════════════════════ */
import { useCallback, useEffect, useState } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer, { type CartEntry } from "./components/CartDrawer";
import { IconCheck } from "./components/icons";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import StoryPage from "./pages/StoryPage";
import ReviewsPage from "./pages/ReviewsPage";
import { toFa, useReveal } from "./hooks/useReveal";
import type { Product } from "./data/site";

/* ── نمایش صفحه‌ها با انیمیشن ورود هنگام تغییر مسیر ── */
function AnimatedRoutes({
  onAdd,
  justAddedId,
}: {
  onAdd: (p: Product) => void;
  justAddedId: string | null;
}) {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-in">
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage onAdd={onAdd} justAddedId={justAddedId} />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

/* ── پوسته‌ی مشترک همه‌ی صفحات: سربرگ، فوتر، سبد خرید، توست ── */
function SiteShell() {
  const location = useLocation();
  const [entries, setEntries] = useState<CartEntry[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  /* با هر بار تغییر صفحه: اسکرول به بالا + بازخوانی انیمیشن‌های ظهور */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useReveal([location.pathname]);

  /* نمایش موقت توست */
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);

  /* پاک‌کردن حالت «اضافه شد» دکمه‌ی محصول */
  useEffect(() => {
    if (!justAddedId) return;
    const t = window.setTimeout(() => setJustAddedId(null), 1500);
    return () => window.clearTimeout(t);
  }, [justAddedId]);

  /* افزودن به سبد */
  const add = useCallback((p: Product) => {
    setEntries((prev) => {
      const existing = prev.find((e) => e.product.id === p.id);
      if (existing) {
        return prev.map((e) => (e.product.id === p.id ? { ...e, qty: e.qty + 1 } : e));
      }
      return [...prev, { product: p, qty: 1 }];
    });
    setJustAddedId(p.id);
    setToast(`«${p.name}» به سبد اضافه شد`);
  }, []);

  const inc = (id: string) =>
    setEntries((prev) => prev.map((e) => (e.product.id === id ? { ...e, qty: e.qty + 1 } : e)));
  const dec = (id: string) =>
    setEntries((prev) =>
      prev
        .map((e) => (e.product.id === id ? { ...e, qty: e.qty - 1 } : e))
        .filter((e) => e.qty > 0)
    );
  const remove = (id: string) => setEntries((prev) => prev.filter((e) => e.product.id !== id));

  const count = entries.reduce((s, e) => s + e.qty, 0);
  const total = entries.reduce((s, e) => s + e.qty * e.product.price, 0);

  return (
    <div className="page">
      <Header cartCount={count} onOpenCart={() => setCartOpen(true)} />

      <main>
        <AnimatedRoutes onAdd={add} justAddedId={justAddedId} />
      </main>

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        entries={entries}
        total={total}
        onInc={inc}
        onDec={dec}
        onRemove={remove}
        onCheckout={() => setEntries([])}
      />

      <div className={`toast${toast ? " is-show" : ""}`} role="status">
        {toast && (
          <>
            <IconCheck size={18} />
            {toast}
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <SiteShell />
    </HashRouter>
  );
}
