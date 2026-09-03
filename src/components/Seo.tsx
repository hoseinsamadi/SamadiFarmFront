/* ──────────── کامپوننت سئو ────────────
   عنوان، توضیح متا، تگ‌های OpenGraph و داده‌ی ساختاریافته‌ی
   JSON-LD را برای هر صفحه تنظیم می‌کند. در نسخه‌ی جنگو، این نقش
   به django-meta + sitemaps سپرده می‌شود. */
import { useEffect } from "react";
import { BRAND } from "../data/site";

interface SeoProps {
  title: string;
  description: string;
  jsonLd?: object;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertJsonLd(id: string, data: object) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export default function Seo({ title, description, jsonLd }: SeoProps) {
  useEffect(() => {
    const full = `${title} | ${BRAND.name}`;
    document.title = full;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", full);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:locale", "fa_IR");
    if (jsonLd) upsertJsonLd("seo-jsonld", jsonLd);
  }, [title, description, jsonLd]);

  return null;
}
