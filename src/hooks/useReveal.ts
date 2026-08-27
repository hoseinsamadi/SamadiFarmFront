/* ════════════════════════════════════════════════════════════
   صمدی فارم — هوک‌های تعاملی
   - useReveal:      ظهور تدریجی عناصر هنگام اسکرول
   - useScrollSpy:   مشخص‌کردن بخش فعال منو
   - useScrolled:    حالت فشرده‌ی سربرگ بعد از اسکرول
   - useCountUp:     شمارش اعداد آمار هنگام ورود به دید
   ════════════════════════════════════════════════════════════ */
import { useEffect, useRef, useState } from "react";

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/** تبدیل ارقام لاتین به فارسی */
export function toFa(input: string | number): string {
  return String(input).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}

/** قالب‌بندی قیمت با جداکننده‌ی هزارگان فارسی */
export function formatToman(n: number): string {
  try {
    return new Intl.NumberFormat("fa-IR").format(n);
  } catch {
    return toFa(n.toLocaleString("en-US"));
  }
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** ظهور تدریجی همه‌ی عناصر .reveal و .reveal-lines */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".reveal, .reveal-lines");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** فعال‌سازی ماسک خطی عنوان Hero پس از لود */
export function useHeroIntro() {
  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const t = window.setTimeout(() => hero.classList.add("is-in"), 120);
    return () => window.clearTimeout(t);
  }, []);
}

/** سایه و فشرده‌شدن سربرگ بعد از اسکرول */
export function useScrolled(threshold = 10): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/** ردیابی بخش فعال صفحه برای هایلایت منو */
export function useScrollSpy(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/** شمارش عدد هنگام ورود به دید کاربر */
export function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLElement | null>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return { ref, value };
}

/** اسکرول نرم به یک بخش */
export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
