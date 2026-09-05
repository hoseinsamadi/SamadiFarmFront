import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "محصولات",
  description: "خرید عسل طبیعی و محصولات زنبور عسل صمدی فارم.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <main className="shell page-section">
      <h1>محصولات صمدی فارم</h1>
      <p>در این مرحله مسیر SEO-friendly محصولات ایجاد شده است. محصولات واقعی در مرحله اتصال Django می‌آیند.</p>
    </main>
  );
}
