/* ════════════════════════════════════════════════════════════
   صمدی فارم — ریشه‌ی برنامه (نسخه‌ی فروشگاهی)
   مسیرها:
     /          → خانه
     /shop      → فروشگاه (فیلتر + مرتب‌سازی)
     /story     → داستان برند + ویدیوهای یوتیوب
     /reviews   → دیدگاه‌ها (بهینه‌شده)
     /cart      → سبد خرید
     /account   → حساب کاربری و آدرس‌ها
     /checkout  → تسویه‌حساب (کریپتو / بانک)
   ════════════════════════════════════════════════════════════ */
import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { ShopProvider, useShop } from "./context/ShopContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { IconCheck } from "./components/icons";
import { useReveal } from "./hooks/useReveal";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import StoryPage from "./pages/StoryPage";
import ReviewsPage from "./pages/ReviewsPage";
import CartPage from "./pages/CartPage";
import AccountPage from "./pages/AccountPage";
import CheckoutPage from "./pages/CheckoutPage";

/* ── نمایش صفحه‌ها با انیمیشن ورود هنگام تغییر مسیر ── */
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-in">
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
}

/* ── پوسته‌ی مشترک: سربرگ، فوتر، توست سراسری ── */
function SiteShell() {
  const location = useLocation();
  const { cartCount, toast } = useShop();

  /* با هر تغییر صفحه: اسکرول به بالا + بازخوانی انیمیشن‌های ظهور */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useReveal([location.pathname]);

  return (
    <div className="page">
      <Header cartCount={cartCount} badgeKey={cartCount} onCartOpen={() => undefined} />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />

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
      <ShopProvider>
        <SiteShell />
      </ShopProvider>
    </HashRouter>
  );
}
