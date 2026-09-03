/* ──────────── سربرگ چسبان — ناوبری بین صفحات ──────────── */
import { useEffect, useState } from "react";
import type React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BRAND } from "../data/site";
import { toFa, useScrolled } from "../hooks/useReveal";
import { IconBag, IconMenu, IconX } from "./icons";
import logo from "../img/LOGOhOSEINBEEKEEPER.png";

export const NAV_ROUTES = [
  { to: "/", label: "خانه" },
  { to: "/products", label: "محصولات" },
  { to: "/story", label: "داستان ما" },
  { to: "/reviews", label: "دیدگاه‌ها" },
];

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Header({ cartCount, onOpenCart }: HeaderProps) {
  const scrolled = useScrolled(10);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${menuOpen ? " menu-open" : ""}`}>
      <div className="shell header-inner">
        <Link to="/" className="brand" aria-label="صمدی فارم — بازگشت به صفحه‌ی خانه">
          <span className="brand-hex">
            <img src={logo.src} alt="صمدی فارم" width="200" height="200" />
          </span>
          <span>
            <strong className="brand-name">{BRAND.name}</strong>
            <span className="brand-tag">{BRAND.tagline}</span>
          </span>
        </Link>

        <nav className="main-nav" aria-label="ناوبری اصلی">
          {NAV_ROUTES.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"}
              className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <Link to="/products" className="btn btn-primary btn-sm btn-hide-mobile">سفارش آنلاین</Link>
          <button type="button" className="cart-btn" onClick={onOpenCart}
            aria-label={`باز کردن سبد خرید — ${toFa(cartCount)} قلم`}>
            <IconBag size={19} />
            {cartCount > 0 && <span className="cart-count">{toFa(cartCount)}</span>}
          </button>
          <button type="button" className="menu-btn" onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen} aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}>
            {menuOpen ? <IconX size={23} /> : <IconMenu size={23} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu${menuOpen ? " is-open" : ""}`}>
        {NAV_ROUTES.map((l, i) => (
          <NavLink key={l.to} to={l.to} end={l.to === "/"}
            style={{ "--d": `${i * 0.05}s` } as React.CSSProperties}
            className={({ isActive }) => `mobile-link${isActive ? " is-active" : ""}`}>
            {l.label}
          </NavLink>
        ))}
        <Link to="/products" className="btn btn-primary"
          style={{ marginTop: "0.6rem", justifyContent: "center" } as React.CSSProperties}>
          سفارش آنلاین
        </Link>
      </div>
    </header>
  );
}
