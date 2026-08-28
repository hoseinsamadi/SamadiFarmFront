/* ──────────── دسته‌بندی محصولات — کلیک، به صفحه‌ی محصولات
               با فیلتر همان دسته می‌رود ──────────── */
import type React from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES, PRODUCTS, type CategoryId } from "../data/site";
import { scrollToId, toFa } from "../hooks/useReveal";
import { IconCells, IconFlower, IconGift, IconMeadow } from "./icons";

const ICONS = {
  flower: IconFlower,
  meadow: IconMeadow,
  cells: IconCells,
  gift: IconGift,
};

export default function Categories() {
  const navigate = useNavigate();

  const go = (cat: (typeof CATEGORIES)[number]) => {
    if ("scrollTo" in cat && cat.scrollTo) {
      /* بسته‌ی هدیه → صفحه‌ی محصولات، سپس فرم سفارش */
      navigate("/products");
      window.setTimeout(() => scrollToId("order"), 150);
    } else {
      navigate(`/products?cat=${cat.id}`);
    }
  };

  return (
    <section className="shell" style={{ paddingTop: "4rem", paddingBottom: "0.5rem" }}>
      <div className="cats-head reveal">
        <div>
          <span className="eyebrow">دسته‌بندی‌ها</span>
          <h2 className="section-title">از کندو چه می‌خواهید؟</h2>
        </div>
        <p>
          هر دسته، روایتِ خودش را از کندو دارد؛ روی هر کارت بزنید تا محصولاتِ همان دسته را در
          صفحه‌ی محصولات ببینید.
        </p>
      </div>

      <div className="cats-grid">
        {CATEGORIES.map((cat, i) => {
          const Icon = ICONS[cat.icon];
          const count =
            "scrollTo" in cat && cat.scrollTo
              ? null
              : PRODUCTS.filter((p) => p.cat === (cat.id as CategoryId)).length;
          return (
            <button
              type="button"
              key={cat.id}
              className="cat-card reveal"
              style={{ "--d": `${i * 0.09}s` } as React.CSSProperties}
              onClick={() => go(cat)}
            >
              {count !== null && <span className="cat-count">{toFa(count)}</span>}
              <span className="cat-icon">
                <Icon size={26} />
              </span>
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
