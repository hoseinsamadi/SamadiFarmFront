/* ════════════ صفحه‌ی محصولات ════════════
   بازکننده‌ی صفحه + فیلتر دسته‌بندی (همگام با آدرس صفحه)
   + شبکه‌ی محصولات + فرم سفارش */
import { Link, useSearchParams } from "react-router-dom";
import Products, { type Filter } from "../components/Products";
import OrderSection from "../components/OrderSection";
import { PRODUCTS, type Product } from "../data/site";
import { toFa, useReveal } from "../hooks/useReveal";
import { IconBee, IconHex } from "../components/icons";

const VALID_FILTERS: Filter[] = ["single", "multi", "hive"];

interface ProductsPageProps {
  onAdd: (p: Product) => void;
  justAddedId: string | null;
}

export default function ProductsPage({ onAdd, justAddedId }: ProductsPageProps) {
  const [params, setParams] = useSearchParams();
  const raw = params.get("cat");
  const filter: Filter = VALID_FILTERS.includes(raw as Filter) ? (raw as Filter) : "all";

  /* تغییر فیلتر = تغییر آدرس؛ پس لینک دسته‌ها قابل اشتراک‌گذاری می‌شود */
  const setFilter = (f: Filter) => setParams(f === "all" ? {} : { cat: f }, { replace: true });

  /* انیمیشن ظهور کارت‌ها بعد از تغییر فیلتر بازخوانی شود */
  useReveal([filter]);

  const shown =
    filter === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === filter).length;

  return (
    <>
      {/* ── بازکننده‌ی صفحه ── */}
      <section className="page-opener">
        <div className="honeycomb pattern-abs" aria-hidden="true" />
        <div className="shell" style={{ position: "relative" }}>
          <nav className="breadcrumb" aria-label="مسیر صفحه">
            <Link to="/">خانه</Link>
            <span aria-hidden="true">/</span>
            <span>محصولات</span>
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
                {toFa(shown)} محصول آماده‌ی ارسال
              </span>
              <span className="fact">
                <IconBee size={15} />
                برداشت پاییز ۱۴۰۴ — دماوند و سبلان
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── فیلترها + محصولات ── */}
      <Products filter={filter} onFilter={setFilter} onAdd={onAdd} justAddedId={justAddedId} />

      {/* ── فرم سفارش ── */}
      <OrderSection />
    </>
  );
}
