/* ════════════ صفحه‌ی فروشگاه ════════════
   بازکننده + فیلتر دسته‌بندی (همگام با آدرس) + مرتب‌سازی
   + شبکه‌ی محصولات + فرم سفارش تلفنی */
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";
import OrderSection from "../components/OrderSection";
import { ALL_PRODUCTS, FILTERS, ProductCard, applyProductFilters, type Filter, type Sort } from "../components/Products";
import { PRODUCTS, type Product } from "../data/site";
import { toFa, useReveal } from "../hooks/useReveal";
import { useShop } from "../context/ShopContext";
import { IconBee, IconHex } from "../components/icons";

const VALID_FILTERS: Filter[] = ["single", "multi", "hive"];

const SEO_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "محصولات صمدی فارم",
  itemListElement: PRODUCTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: { "@type": "Product", name: p.name, description: p.desc },
  })),
};

export default function ShopPage() {
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState<Sort>("featured");
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const { addToCart, showToast } = useShop();

  const raw = params.get("cat");
  const filter: Filter = VALID_FILTERS.includes(raw as Filter) ? (raw as Filter) : "all";
  const setFilter = (f: Filter) => setParams(f === "all" ? {} : { cat: f }, { replace: true });

  const list = applyProductFilters(ALL_PRODUCTS, filter, sort);

  /* انیمیشن کارت‌ها بعد از تغییر فیلتر/مرتب‌سازی بازخوانی شود */
  useReveal([filter, sort]);

  const onAdd = (p: Product) => {
    addToCart(p);
    setJustAddedId(p.id);
    showToast(`«${p.name}» به سبد اضافه شد`);
    window.setTimeout(() => setJustAddedId(null), 1400);
  };

  return (
    <>
      <Seo
        title="فروشگاه عسل طبیعی"
        description="خرید عسل خام تک‌گل و چندگیاه، موم، بره‌موم و گرده‌ی گل از زنبورستان صمدی — همراه با برگه‌ی آزمایش و ارسال به سراسر کشور."
        jsonLd={SEO_JSONLD}
      />

      {/* ── بازکننده‌ی صفحه ── */}
      <section className="page-opener">
        <div className="honeycomb pattern-abs" aria-hidden="true" />
        <div className="shell" style={{ position: "relative" }}>
          <nav className="breadcrumb" aria-label="مسیر صفحه">
            <Link to="/">خانه</Link>
            <span aria-hidden="true">/</span>
            <span>فروشگاه</span>
          </nav>
          <div className="opener-flex">
            <div>
              <h1 className="page-title">برداشتِ تازه‌ی کندوها</h1>
              <p className="page-desc">
                همه‌ی شیشه‌ها همان روزِ برداشت درب‌موم می‌شوند و همراه با برگه‌ی آزمایش ساکارز
                و رطوبت به دست شما می‌رسند.
              </p>
            </div>
            <div className="opener-facts">
              <span className="fact">
                <IconHex size={15} />
                {toFa(list.length)} محصول آماده‌ی ارسال
              </span>
              <span className="fact">
                <IconBee size={15} />
                برداشت پاییز ۱۴۰۴ — دماوند و سبلان
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="products-band">
        <div className="shell" style={{ paddingTop: "2.6rem", paddingBottom: "3.6rem" }}>
          {/* ── فیلترها + مرتب‌سازی ── */}
          <div className="shop-toolbar reveal">
            <div className="filters" role="tablist" aria-label="فیلتر دسته‌بندی محصولات">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === f.id}
                  className={`filter-chip${filter === f.id ? " is-active" : ""}`}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <label className="sort-box" htmlFor="sort-select">
              مرتب‌سازی:
              <select
                id="sort-select"
                className="select"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                <option value="featured">پیشنهاد کندو</option>
                <option value="cheap">ارزان‌ترین</option>
                <option value="expensive">گران‌ترین</option>
              </select>
            </label>
          </div>

          {/* ── کارت‌های محصول ── */}
          <div className="products-grid">
            {list.map((p, i) => (
              <ProductCard key={p.id} p={p} index={i} onAdd={onAdd} justAddedId={justAddedId} />
            ))}
          </div>
        </div>
      </section>

      <OrderSection />
    </>
  );
}
