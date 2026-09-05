import Link from "next/link";

export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero">
        <p className="eyebrow">زنبورستان خانوادگی صمدی — از ۱۳۸۵</p>
        <h1>طعم واقعی عسل، مستقیم از کندو تا سفره</h1>
        <p>
          اسکلت جدید فروشگاه صمدی فارم با Next.js آماده است و در مرحله بعد طراحی فعلی سایت
          به این ساختار منتقل می‌شود.
        </p>
        <div className="actions">
          <Link href="/products" className="btn">مشاهده محصولات</Link>
          <Link href="/story" className="btn secondary">داستان ما</Link>
        </div>
      </section>
    </main>
  );
}
