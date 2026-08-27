/* ──────────── دسته‌بندی محصولات — کلیک، فیلتر محصولات را تنظیم می‌کند ──────────── */
import type React from "react";
import { CATEGORIES, PRODUCTS, type CategoryId } from "../data/site";
import { scrollToId, toFa } from "../hooks/useReveal";
import { IconCells, IconFlower, IconGift, IconMeadow } from "./icons";

const ICONS = {
  flower: IconFlower,
  meadow: IconMeadow,
  cells: IconCells,
  gift: IconGift,
};

interface CategoriesProps {
  onSelectCategory: (cat: CategoryId | "all") => void;
}

export default function Categories({ onSelectCategory }: CategoriesProps) {
  return (
    <section id="categories" className="shell" style={{ paddingTop: "4rem", paddingBottom: "0.5rem" }}>
      <div className="cats-head reveal">
        <div>
          <span className="eyebrow">دسته‌بندی‌ها</span>
          <h2 className="section-title">از کندو چه می‌خواهید؟</h2>
        </div>
        <p>
          هر دسته، روایتِ خودش را از کندو دارد؛ روی هر کارت بزنید تا محصولاتِ همان دسته را
          پایین‌تر ببینید.
        </p>
      </div>

      <div className="cats-grid">
        {CATEGORIES.map((cat, i) => {
          const Icon = ICONS[cat.icon];
          const count =
            "scrollTo" in cat && cat.scrollTo
              ? null
              : PRODUCTS.filter((p) => p.cat === cat.id).length;
          return (
            <button
              type="button"
              key={cat.id}
              className="cat-card reveal"
              style={{ "--d": `${i * 0.09}s` } as React.CSSProperties}
              onClick={() => {
                if ("scrollTo" in cat && cat.scrollTo) {
                  scrollToId(cat.scrollTo);
                } else {
                  onSelectCategory(cat.id as CategoryId);
                  scrollToId("products");
                }
              }}
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
