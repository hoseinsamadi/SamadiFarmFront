import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "داستان ما",
  description: "داستان زنبورداری خانوادگی صمدی فارم و مسیر تولید عسل طبیعی.",
  alternates: { canonical: "/story" },
};

export default function StoryPage() {
  return <main className="shell page-section"><h1>داستان صمدی فارم</h1><p>صفحه داستان برند در حال انتقال از نسخه قبلی است.</p></main>;
}
