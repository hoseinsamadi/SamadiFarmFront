/* ──────────── فوتر سایت ──────────── */
import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BRAND, CATEGORIES, CONTACT, FOOTER_YEAR, type CategoryId } from "../data/site";
import { NAV_ROUTES } from "./Header";
import { IconBee, IconClock, IconInstagram, IconPhone, IconPin, IconYoutube } from "./icons";

export default function Footer() {
  const navigate = useNavigate();

  const goCategory = (id: CategoryId) => navigate(`/products?cat=${id}`);

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          {/* برند */}
          <div className="footer-brand">
            <Link to="/" className="brand" style={{ color: "var(--cream)" }}>
              <span className="brand-hex">
              {/* <IconBee size={24} />  */}
                <img  src="src/img/logohoseinbeekeeper.png"  alt="صمدی فارم"
              width="200"
              height="200"
                 />
              </span>
              <span>
                <strong className="brand-name">{BRAND.name}</strong>
                <span className="brand-tag" style={{ color: "rgba(249,243,226,0.55)" }}>
                  {BRAND.tagline}
                </span>
              </span>
            </Link>
            <p>
              زنبورستان خانوادگی صمدی؛ دو نسل است که عسلِ خام و فرآورده‌های کندو را بی‌واسطه از
              در دشت قزوین  در کوه‌های الموت و طارم به سفره‌ی شما می‌رسانیم — و همه‌چیز را جلوی دوربین
              یوتیوب نشان می‌دهیم.
            </p>
          </div>

          {/* دسترسی سریع */}
          <nav aria-label="دسترسی سریع">
            <h4 className="footer-title">دسترسی سریع</h4>
            <ul className="footer-links">
              {NAV_ROUTES.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* محصولات */}
          <nav aria-label="دسته‌بندی محصولات">
            <h4 className="footer-title">محصولات</h4>
            <ul className="footer-links">
              {CATEGORIES.filter((c) => !("scrollTo" in c)).map((c) => (
                <li key={c.id}>
                  <button type="button" onClick={() => goCategory(c.id as CategoryId)}>
                    {c.title}
                  </button>
                </li>
              ))}
             {/* <li>
                <Link to="/products">بسته‌ی هدیه</Link>
              </li>
              */}
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
                <IconYoutube size={16} />
                <a href={CONTACT.YOUTUBEHref} target="_blank" rel="noreferrer" dir="ltr">
                  @{CONTACT.YOUTUBE}
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
