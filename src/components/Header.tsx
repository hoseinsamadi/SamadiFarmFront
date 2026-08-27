/* ──────────── سربرگ چسبان + ناوبری دسکتاپ و موبایل ──────────── */
import { useState } from "react";
import { BRAND, NAV_LINKS } from "../data/site";
import { toFa, useScrolled, useScrollSpy } from "../hooks/useReveal";
import { IconBag, IconBee, IconMenu, IconX } from "./icons";

interface HeaderProps {
  cartCount: number;
  badgeKey: number;
  onCartOpen: () => void;
}

const SPY_IDS = NAV_LINKS.map((l) => l.id);

export default function Header({ cartCount, badgeKey, onCartOpen }: HeaderProps) {
  const scrolled = useScrolled(12);
  const active = useScrollSpy(SPY_IDS);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="shell header-inner">
        {/* برند */}
        <a href="#home" className="brand" aria-label="بازگشت به ابتدای صفحه">
          <span className="brand-hex">
            <IconBee size={26} />
          </span>
          <span>
            <strong className="brand-name">{BRAND.name}</strong>
            <span className="brand-tag">{BRAND.tagline}</span>
          </span>
        </a>

        {/* ناوبری دسکتاپ */}
        <nav className="nav-desktop" aria-label="ناوبری اصلی">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-link${active === link.id ? " is-active" : ""}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* اقدام‌ها */}
        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={onCartOpen}
            aria-label={`باز کردن سبد خرید — ${toFa(cartCount)} قلم`}
          >
            <IconBag size={20} />
            {cartCount > 0 && (
              <span key={badgeKey} className="cart-badge pop">
                {toFa(cartCount)}
              </span>
            )}
          </button>
          <a href="#order" className="btn btn-primary btn-sm btn-hide-mobile">
            سفارش مستقیم
          </a>
          <button
            type="button"
            className="icon-btn menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
          >
            {menuOpen ? <IconX size={21} /> : <IconMenu size={21} />}
          </button>
        </div>
      </div>

      {/* منوی موبایل */}
      <nav
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        aria-label="ناوبری موبایل"
      >
        <div className="shell mobile-menu-inner">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`mobile-link${active === link.id ? " is-active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#order"
            className="btn btn-primary mt-2 justify-center"
            onClick={() => setMenuOpen(false)}
          >
            سفارش مستقیم
          </a>
        </div>
      </nav>
    </header>
  );
}
