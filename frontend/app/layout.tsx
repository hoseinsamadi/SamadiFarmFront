import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "صمدی فارم | عسل طبیعی و محصولات زنبور عسل",
    template: "%s | صمدی فارم",
  },
  description:
    "صمدی فارم — عسل خام و فرآورده‌های طبیعی زنبور عسل، مستقیم از کندوهای خانوادگی تا سفره‌ی شما.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "صمدی فارم",
    title: "صمدی فارم | عسل طبیعی و محصولات زنبور عسل",
    description: "عسل طبیعی و فرآورده‌های زنبور عسل صمدی فارم.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
