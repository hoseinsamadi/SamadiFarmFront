/* ──────────── فوتر سایت ──────────── */
import type React from "react";
import { BRAND, CATEGORIES, CONTACT, FOOTER_YEAR, NAV_LINKS, type CategoryId } from "../data/site";
import { scrollToId } from "../hooks/useReveal";
import { IconBee, IconClock, IconInstagram, IconPhone, IconPin } from "./icons";

interface FooterProps {
  onSelectCategory: (cat: CategoryId | "all") => void;
}

export default function Footer({ onSelectCategory }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          {/* برند */}
          <div className="footer-brand">
            <a href="#home" className="brand" style={{ color: "var(--cream)" }}>
              <span className="brand-hex">
                <IconBee size={24} />
              </span>
              <span>
                <strong className="brand-name">{BRAND.name}</strong>
                <span className="brand-tag" style={{ color: "rgba(249,243,226,0.55)" }}>
                  {BRAND.tagline}
                </span>
              </span>
            </a>
            <p>
              زنبورستان خانوادگی صمدی؛ سه نسل است که عسلِ خام و فرآورده‌های کندو را بی‌واسطه از
              دامنه‌های دماوند و سبلان به سفره‌ی شما می‌رسانیم.
            </p>
          </div>

          {/* دسترسی سریع */}
          <nav aria-label="دسترسی سریع">
            <h4 className="footer-title">دسترسی سریع</h4>
            <ul className="footer-links">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* دسته‌بندی‌ها */}
          <nav aria-label="دسته‌بندی محصولات">
            <h4 className="footer-title">محصولات</h4>
            <ul className="footer-links">
              {CATEGORIES.filter((c) => !("scrollTo" in c)).map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCategory(c.id as CategoryId);
                      scrollToId("products");
                    }}
                  >
                    {c.title}
                  </button>
                </li>
              ))}
              <li>
                <button type="button" onClick={() => scrollToId("order")}>
                  بسته‌ی هدیه
                </button>
              </li>
            </ul>
          </nav>

          {/* تماس */}
          <div>
            <h4 className="footer-title">تماس با کندو</h4>
            <ul className="footer-contact">
              <li>
                <IconPhone size={16} />
                <a href={CONTACT.phoneHref} dir="ltr">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <IconInstagram size={16} />
                <a href={CONTACT.instagramHref} target="_blank" rel="noreferrer" dir="ltr">
                  @{CONTACT.instagram}
                </a>
              </li>
              <li>
                <IconPin size={16} />
                <span>{CONTACT.address}</span>
              </li>
              <li>
                <IconClock size={16} />
                <span>{CONTACT.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {FOOTER_YEAR} — تمامی حقوق برای <strong>{BRAND.name}</strong> محفوظ است.
          </span>
          <span>
            ساخته‌شده با <strong>عسل</strong> و کمی وسواس؛ ساختار صفحه: HTML و CSS جدا
          </span>
        </div>
      </div>
    </footer>
  );
}
