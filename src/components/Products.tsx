/* ──────────── محصولات — با فیلتر دسته‌بندی و افزودن به سبد ──────────── */
import type React from "react";
import { PRODUCTS, type CategoryId, type Product } from "../data/site";
import { formatToman, toFa } from "../hooks/useReveal";
import { IconBag, IconCheck, IconFlask, IconHex } from "./icons";

export type Filter = CategoryId | "all";

const FILTERS: { id: Filter; label: string }[] = [
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

interface ProductsProps {
  filter: Filter;
  onFilter: (f: Filter) => void;
  onAdd: (p: Product) => void;
  justAddedId: string | null;
}

export default function Products({ filter, onFilter, onAdd, justAddedId }: ProductsProps) {
  const list = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === filter);

  return (
    <section id="products" className="products-band">
      <div className="shell" style={{ paddingTop: "3.5rem", paddingBottom: "4rem" }}>
        <div className="products-head reveal">
          <span className="eyebrow">محصولات فصل</span>
          <h2 className="section-title">برداشتِ تازه‌ی کندوها</h2>
          <p>
            همه‌ی شیشه‌ها همان روزِ برداشت درب‌موم می‌شوند و همراه با برگه‌ی آزمایش ساکارز و
            رطوبت به دست شما می‌رسند.
          </p>
        </div>

        {/* فیلترها */}
        <div className="filters reveal" role="tablist" aria-label="فیلتر دسته‌بندی محصولات">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              className={`filter-chip${filter === f.id ? " is-active" : ""}`}
              onClick={() => onFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* کارت‌های محصول */}
        <div className="products-grid">
          {list.map((p, i) => (
            <article
              key={p.id}
              className="product-card reveal"
              style={{ "--d": `${(i % 3) * 0.1}s` } as React.CSSProperties}
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
                  <span>{toFa(FILTERS.find((f) => f.id === p.cat)?.label ?? "")}</span>
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
          ))}
        </div>

        <p className="products-note reveal">
          <IconFlask size={17} />
          هر شیشه همراه با برگه‌ی آزمایش معتبر — ساکارز زیر ۳٪ و رطوبت زیر ۱۸٪
        </p>
      </div>
    </section>
  );
}
