/* ──────────── کارت محصول و فیلترهای دسته‌بندی ────────────
   صفحه‌ی فروشگاه این کارت‌ها را همراه با فیلتر و مرتب‌سازی ترکیب می‌کند. */
import type React from "react";
import { PRODUCTS, type CategoryId, type Product } from "../data/site";
import { formatToman, toFa } from "../hooks/useReveal";
import { IconBag, IconCheck, IconHex } from "./icons";

export type Filter = CategoryId | "all";
export type Sort = "featured" | "cheap" | "expensive";

export const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "همه‌ی محصولات" },
  { id: "single", label: "تک‌گل" },
  { id: "multi", label: "چندگیاه" },
  { id: "hive", label: "فرآورده‌های کندو" },
];

const TAG_CLASS: Record<string, string> = {
  honey: "",
  olive: "tag--olive",
  ember: "tag--ember",
};

export function applyProductFilters(list: Product[], filter: Filter, sort: Sort): Product[] {
  const filtered = filter === "all" ? list : list.filter((p) => p.cat === filter);
  if (sort === "cheap") return [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "expensive") return [...filtered].sort((a, b) => b.price - a.price);
  return filtered;
}

interface ProductCardProps {
  p: Product;
  onAdd: (p: Product) => void;
  justAddedId: string | null;
  index?: number;
}

export function ProductCard({ p, onAdd, justAddedId, index = 0 }: ProductCardProps) {
  const catLabel = FILTERS.find((f) => f.id === p.cat)?.label ?? "";
  return (
    <article
      className="product-card reveal"
      style={{ "--d": `${(index % 3) * 0.09}s` } as React.CSSProperties}
    >
      <div className="product-media">
        <img src={p.img} alt={p.name} loading="lazy" />
        {p.tag && <span className={`tag ${TAG_CLASS[p.tagTone ?? "honey"]}`}>{p.tag}</span>}
      </div>
      <div className="product-body">
        <div className="product-meta">
          <span className="weight">
            <IconHex size={12} />
            {p.weight}
          </span>
          <span>{catLabel}</span>
        </div>
        <h3>{p.name}</h3>
        <p>{p.desc}</p>
        <div className="product-foot">
          <div className="price">
            {formatToman(p.price)} <small>تومان</small>
          </div>
          <button
            type="button"
            className={`add-btn${justAddedId === p.id ? " is-added" : ""}`}
            onClick={() => onAdd(p)}
            aria-label={`افزودن ${p.name} به سبد خرید`}
          >
            {justAddedId === p.id ? (
              <>
                <IconCheck size={16} />
                اضافه شد
              </>
            ) : (
              <>
                <IconBag size={16} />
                افزودن
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export const ALL_PRODUCTS = PRODUCTS;
