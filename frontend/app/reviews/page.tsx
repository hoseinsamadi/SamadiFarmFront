import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "دیدگاه مشتریان",
  description: "تجربه و دیدگاه مشتریان صمدی فارم درباره عسل و محصولات زنبور عسل.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return <main className="shell page-section"><h1>دیدگاه مشتریان</h1><p>بخش دیدگاه‌ها در مرحله اتصال به Django و دیتابیس تکمیل می‌شود.</p></main>;
}
