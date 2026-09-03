/* ──────────── سربرگ سایت — ناوبری صفحات + اکانت + سبد خرید ──────────── */
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BRAND } from "../data/site";
import { useScrolled, useScrollSpy, toFa } from "../hooks/useReveal";
import { useShop } from "../context/ShopContext";
import { IconBag, IconBee, IconMenu, IconUser, IconX } from "./icons";

export const NAV_ROUTES = [
  { to: "/", label: "خانه" },
  { to: "/shop", label: "فروشگاه" },
  { to: "/story", label: "داستان ما" },
  { to: "/reviews", label: "دیدگاه‌ها" },
];

interface HeaderProps {
  cartCount: number;
  badgeKey: number;
  onCartOpen: () => void;
}

const SECTION_IDS = ["home", "shop", "story", "reviews"];

export default function Header({ cartCount, badgeKey, onCartOpen }: HeaderProps) {
  const scrolled = useScrolled(10);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const activeSection = useScrollSpy(SECTION_IDS);
  const { user } = useShop();

  /* صفحه‌ی اصلی: هایلایت بر اساس بخشِ در حال نمایش؛ بقیه‌ی صفحات بر اساس مسیر */
  const active = pathname === "/" ? `/#${activeSection}` : pathname;

  return (
    <header id="home" className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="shell header-inner">
        <Link to="/" className="brand" aria-label="صمدی فارم — صفحه‌ی خانه">
          <span className="brand-hex">
            <IconBee size={24} />
          </span>
          <span>
            <strong className="brand-name">{BRAND.name}</strong>
            <span className="brand-tag">{BRAND.tagline}</span>
          </span>
        </Link>

        <nav className="main-nav" aria-label="ناوبری اصلی">
          {NAV_ROUTES.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link${active === l.to || active === `/${l.to}` ? " is-active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link to="/account" className="icon-btn account-btn" aria-label="حساب کاربری و آدرس‌ها">
            <IconUser size={19} />
            {user && <span className="account-name">{user.name.split(" ")[0]}</span>}
          </Link>

          <Link to="/cart" className="icon-btn cart-btn" aria-label={`سبد خرید — ${toFa(cartCount)} قلم`}>
            <IconBag size={19} />
            {cartCount > 0 && (
              <span key={badgeKey} className="cart-badge">
                {toFa(cartCount)}
              </span>
            )}
          </Link>

          <a href="#order" className="btn btn-primary btn-sm btn-hide-mobile">
            سفارش تلفنی
          </a>

          <button
            type="button"
            className="icon-btn mobile-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <IconX size={22} /> : <IconMenu size={22} />}
          </button>
        </div>
      </div>

      <nav className={`mobile-nav${menuOpen ? " is-open" : ""}`} aria-label="ناوبری موبایل">
        {NAV_ROUTES.map((l) => (
          <Link key={l.to} to={l.to} className="mobile-link" onClick={() => setMenuOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link to="/account" className="mobile-link" onClick={() => setMenuOpen(false)}>
          حساب کاربری
        </Link>
        <Link to="/cart" className="mobile-link" onClick={() => setMenuOpen(false)}>
          سبد خرید {cartCount > 0 ? `(${toFa(cartCount)})` : ""}
        </Link>
      </nav>
    </header>
  );
}
