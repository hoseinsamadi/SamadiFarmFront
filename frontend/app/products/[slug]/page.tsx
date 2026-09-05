import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slug.replaceAll("-", " "),
    description: "جزئیات محصول صمدی فارم.",
    alternates: { canonical: `/products/${slug}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <main className="shell page-section">
      <h1>{slug.replaceAll("-", " ")}</h1>
      <p>اطلاعات محصول از API جنگو در مرحله بعد دریافت خواهد شد.</p>
    </main>
  );
}
