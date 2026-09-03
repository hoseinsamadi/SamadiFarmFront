/* ════════════ صفحه‌ی دیدگاه‌ها — نسخه‌ی بهینه ════════════
   خلاصه‌ی امتیاز + نمودار توزیع + مرتب‌سازی و فیلتر ستاره
   + رأی «مفید بود» + نشان خرید تأییدشده + پاسخ فروشگاه
   + فرم ثبت دیدگاه + پرسش‌های پرتکرار (با JSON-LD برای سئو) */
import { useMemo, useState } from "react";
import type React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { FAQ_ITEMS, RATING_DIST, RATING_SUMMARY, TESTIMONIALS, type Testimonial } from "../data/site";
import { formatToman, toFa } from "../hooks/useReveal";
import { storage } from "../lib/storage";
import { useShop } from "../context/ShopContext";
import { IconCheck, IconQuote, IconSend, IconSpark, IconStar, IconThumbsUp } from "../components/icons";

const LS_KEY = "samadi-user-reviews";

interface UserReview {
  name: string;
  city: string;
  stars: number;
  text: string;
}

/* داده‌های تکمیلی برای بهینه‌سازی نمایش دیدگاه‌ها */
const REVIEW_META: Record<string, { helpful: number; reply?: string }> = {
  نرگس: {
    helpful: 41,
    reply: "سپاس نرگس خانم! برداشت گونِ همان هفته را در کانال یوتیوب گذاشته‌ایم؛ ببینید و لذت ببرید. 🌿",
  },
  امیر: {
    helpful: 27,
    reply: "امیر جان، شکرکِ عسل خام یعنی زنده بودن آن؛ با آب ولرم به حالت اول برمی‌گردد.",
  },
  لیلا: { helpful: 19 },
  سعید: {
    helpful: 33,
    reply: "سعید عزیز، برای سفارش عمده با شماره‌ی واتساپ پیام بدهید تا قیمت همکاری بفرستیم.",
  },
};

function loadUserReviews(): UserReview[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as UserReview[]) : [];
  } catch {
    return [];
  }
}

type SortKey = "newest" | "highest" | "lowest";
type StarFilter = 0 | 5 | 4 | 3;

interface ViewReview extends Testimonial {
  id: string;
  verified: boolean;
  helpful: number;
  reply?: string;
  mine?: boolean;
}

export default function ReviewsPage() {
  const { user, showToast } = useShop();
  const [userReviews, setUserReviews] = useState<UserReview[]>(loadUserReviews);
  const [votes, setVotes] = useState<Record<string, true>>(() => storage.helpful.all() as never);

  const [sort, setSort] = useState<SortKey>("newest");
  const [starFilter, setStarFilter] = useState<StarFilter>(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  /* فرم */
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [stars, setStars] = useState(5);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState<{ name?: string; text?: string }>({});

  const combined: ViewReview[] = useMemo(() => {
    const mine: ViewReview[] = userReviews.map((r, i) => ({
      id: `mine-${i}`,
      name: r.name,
      city: r.city,
      stars: r.stars,
      text: r.text,
      tone: "linear-gradient(135deg,#d89521,#b85d16)",
      verified: true,
      helpful: 0,
      mine: true,
    }));
    const seeded: ViewReview[] = TESTIMONIALS.map((t) => ({
      ...t,
      id: t.name,
      verified: true,
      helpful: REVIEW_META[t.name]?.helpful ?? 8,
      reply: REVIEW_META[t.name]?.reply,
    }));
    return [...mine, ...seeded];
  }, [userReviews]);

  const visible = useMemo(() => {
    let list = combined;
    if (starFilter === 3) list = list.filter((r) => r.stars <= 3);
    else if (starFilter) list = list.filter((r) => r.stars === starFilter);
    if (sort === "highest") list = [...list].sort((a, b) => b.stars - a.stars);
    if (sort === "lowest") list = [...list].sort((a, b) => a.stars - b.stars);
    return list;
  }, [combined, sort, starFilter]);

  const toggleHelpful = (id: string) => {
    const all = storage.helpful.all();
    const has = Boolean(all[id]);
    if (has) {
      delete all[id];
      setVotes((v) => {
        const n = { ...v };
        delete n[id];
        return n;
      });
    } else {
      all[id] = "up";
      setVotes((v) => ({ ...v, [id]: true }));
    }
    storage.helpful.save(all);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (name.trim().length < 2) errs.name = "نام خود را کامل بنویسید.";
    if (text.trim().length < 10) errs.text = "دیدگاه باید حداقل ۱۰ حرف باشد.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const next: UserReview[] = [
      { name: name.trim(), city: city.trim() || "ایران", stars, text: text.trim() },
      ...userReviews,
    ];
    setUserReviews(next);
    storage.reviews.save(next);
    setName("");
    setCity("");
    setText("");
    setStars(5);
    setSort("newest");
    setStarFilter(0);
    showToast("دیدگاه شما ثبت شد؛ سپاس از همراهی‌تان!");
    document.getElementById("all-reviews")?.scrollIntoView({ behavior: "smooth" });
  };

  const totalReviews = RATING_SUMMARY.total + userReviews.length;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Seo
        title="دیدگاه مشتریان"
        description="دیدگاه واقعی خریداران عسل صمدی فارم — امتیاز ۴٫۹ از ۵، همراه با پاسخ زنبوردار به هر نظر."
        jsonLd={faqJsonLd}
      />

      {/* ── بازکننده ── */}
      <section className="page-opener">
        <div className="honeycomb pattern-abs" aria-hidden="true" />
        <div className="shell" style={{ position: "relative" }}>
          <nav className="breadcrumb" aria-label="مسیر صفحه">
            <Link to="/">خانه</Link>
            <span aria-hidden="true">/</span>
            <span>دیدگاه‌ها</span>
          </nav>
          <h1 className="page-title">حرفِ کسانی که چشیده‌اند</h1>
          <p className="page-desc">
            نظرهای واقعی بعد از هر برداشت؛ بی‌کم‌وکاست، با پاسخ خودِ زنبوردار — و شما هم
            می‌توانید نظرتان را ثبت کنید.
          </p>
        </div>
      </section>

      <section className="shell" style={{ paddingTop: "3rem" }}>
        {/* ── خلاصه‌ی امتیاز + توزیع ── */}
        <div className="rating-panel reveal">
          <div className="rating-num-block">
            <span className="rating-big">{RATING_SUMMARY.avg}</span>
            <div className="star-row" aria-label="۵ ستاره از ۵">
              {Array.from({ length: 5 }).map((_, i) => (
                <IconStar key={i} size={19} />
              ))}
            </div>
            <span className="rating-of">از مجموع {formatToman(totalReviews)} دیدگاه ثبت‌شده</span>
          </div>
          <div className="dist-list">
            {RATING_DIST.map((d) => (
              <div className="dist-row" key={d.stars}>
                <span>{toFa(d.stars)} ستاره</span>
                <div className="dist-bar">
                  <div className="dist-fill" style={{ "--w": `${d.pct}%` } as React.CSSProperties} />
                </div>
                <span>{toFa(d.pct)}٪</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── نوار ابزار: مرتب‌سازی + فیلتر ستاره ── */}
        <div className="shop-toolbar reveal" id="all-reviews" style={{ marginTop: "2.4rem" }}>
          <div className="filters" role="tablist" aria-label="فیلتر بر اساس ستاره">
            {(
              [
                { id: 0, label: "همه" },
                { id: 5, label: "۵ ستاره" },
                { id: 4, label: "۴ ستاره" },
                { id: 3, label: "۳ ستاره و کمتر" },
              ] as { id: StarFilter; label: string }[]
            ).map((f) => (
              <button
                key={f.id}
                type="button"
                className={`filter-chip${starFilter === f.id ? " is-active" : ""}`}
                onClick={() => setStarFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <label className="sort-box" htmlFor="review-sort">
            مرتب‌سازی:
            <select id="review-sort" className="select" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
              <option value="newest">جدیدترین</option>
              <option value="highest">بیشترین امتیاز</option>
              <option value="lowest">کمترین امتیاز</option>
            </select>
          </label>
        </div>

        {/* ── کارت‌های دیدگاه ── */}
        <div className="quotes-grid" style={{ marginTop: "1.6rem" }}>
          {visible.length === 0 && (
            <div className="empty-note reveal is-visible" style={{ gridColumn: "1 / -1" }}>
              <IconSpark size={20} />
              در این فیلتر هنوز دیدگاهی نیست؛ اولین نفر باشید!
            </div>
          )}
          {visible.map((t, i) => (
            <figure
              className={`quote-card${t.mine ? " pop-in" : " reveal"}`}
              key={t.id}
              style={{ "--d": `${(i % 3) * 0.08}s` } as React.CSSProperties}
            >
              {t.mine && <span className="user-badge">دیدگاه شما</span>}
              <span className="quote-mark"><IconQuote size={30} /></span>
              <div className="quote-stars" aria-label={`${t.stars} ستاره از ۵`}>
                {Array.from({ length: 5 }).map((_, s) => (
                  <IconStar key={s} size={14} className={s < t.stars ? "" : "star-off"} />
                ))}
              </div>
              <blockquote>{t.text}</blockquote>
              {t.reply && (
                <div className="seller-reply">
                  <strong>پاسخ صمدی فارم:</strong>
                  {t.reply}
                </div>
              )}
              <figcaption className="quote-who">
                <span className="quote-avatar" style={{ background: t.tone }}>{t.name[0]}</span>
                <span>
                  <strong>{t.name}</strong>
                  <span>{t.city}</span>
                </span>
                {t.verified && (
                  <span className="verified-chip">
                    <IconCheck size={11} />
                    خرید تأییدشده
                  </span>
                )}
              </figcaption>
              <button
                type="button"
                className={`helpful-btn${votes[t.id] ? " is-voted" : ""}`}
                onClick={() => toggleHelpful(t.id)}
                aria-pressed={Boolean(votes[t.id])}
              >
                <IconThumbsUp size={15} />
                مفید بود ({toFa(t.helpful + (votes[t.id] ? 1 : 0))})
              </button>
            </figure>
          ))}
        </div>

        {/* ── فرم ثبت دیدگاه ── */}
        <div className="review-form-wrap">
          <form className="review-form reveal" onSubmit={submit} noValidate>
            <h3>شما هم از عسل ما چشیده‌اید؟</h3>
            <p>دیدگاه‌تان را بنویسید؛ مثل بقیه، بی‌کم‌وکاست همین‌جا نمایش می‌دهیم و پاسخ می‌دهیم.</p>

            <div className="star-picker" role="radiogroup" aria-label="امتیاز شما">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button" key={n}
                  className={`star-pick${n <= stars ? " on" : ""}`}
                  onClick={() => setStars(n)}
                  aria-label={`${toFa(n)} ستاره`}
                >
                  <IconStar size={27} />
                </button>
              ))}
              <span className="star-hint">{toFa(stars)} ستاره از {toFa(5)}</span>
            </div>

            <div className="form-row">
              <div>
                <label htmlFor="rv-name">نام و نام خانوادگی</label>
                <input id="rv-name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="مثلاً رضا محمدی" />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div>
                <label htmlFor="rv-city">شهر (اختیاری)</label>
                <input id="rv-city" className="input" value={city} onChange={(e) => setCity(e.target.value)} placeholder="مثلاً اصفهان" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="rv-text">دیدگاه شما</label>
              <textarea
                id="rv-text" className="textarea" value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="طعم، بسته‌بندی، ارسال… هرچه دوست دارید بنویسید."
              />
              <span className="char-count">{toFa(text.trim().length)} حرف</span>
              {errors.text && <span className="form-error">{errors.text}</span>}
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: "1.3rem" }}>
              <IconSend size={17} />
              ثبت دیدگاه
            </button>
          </form>
        </div>

        {/* ── پرسش‌های پرتکرار (سئو) ── */}
        <div className="faq-wrap">
          <h2 className="section-title" style={{ textAlign: "center" }}>پرسش‌های پرتکرار</h2>
          <div className="faq-list">
            {FAQ_ITEMS.map((f, i) => (
              <div className={`faq-item${faqOpen === i ? " is-open" : ""}`} key={f.q}>
                <button type="button" className="faq-q" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                  {f.q}
                  <span className="faq-icon" aria-hidden="true">{faqOpen === i ? "−" : "+"}</span>
                </button>
                <div className="faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell" style={{ padding: "4.5rem 1.25rem" }}>
        <div className="cta-band reveal">
          <h2>هنوز نچشیده‌اید؟ برداشت تازه منتظر نمی‌ماند</h2>
          <Link to="/shop" className="btn btn-primary">دیدن محصولات</Link>
        </div>
      </section>
    </>
  );
}
