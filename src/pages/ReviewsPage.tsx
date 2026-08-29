/* ════════════ صفحه‌ی دیدگاه‌ها ════════════
   خلاصه‌ی امتیاز + نمودار توزیع ستاره‌ها + همه‌ی دیدگاه‌ها
   + فرم ثبت دیدگاه (با انتخاب ستاره و ذخیره در مرورگر) */
import { useState } from "react";
import type React from "react";
import { Link } from "react-router-dom";
import { RATING_DIST, RATING_SUMMARY, TESTIMONIALS, type Testimonial } from "../data/site";
import { formatToman, toFa } from "../hooks/useReveal";
import { IconCheck, IconQuote, IconSend, IconStar } from "../components/icons";

const LS_KEY = "samadi-user-reviews";

interface UserReview {
  name: string;
  city: string;
  stars: number;
  text: string;
}

function loadUserReviews(): UserReview[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as UserReview[]) : [];
  } catch {
    return [];
  }
}

function QuoteCard({ t, isNew }: { t: Testimonial; isNew?: boolean }) {
  return (
    <figure className={`quote-card${isNew ? " pop-in" : " reveal"}`}>
      {isNew && <span className="user-badge">دیدگاه شما</span>}
      <span className="quote-mark">
        <IconQuote size={30} />
      </span>
      <div className="quote-stars" aria-label={`${t.stars} ستاره از ۵`}>
        {Array.from({ length: 5 }).map((_, s) => (
          <IconStar key={s} size={14} className={s < t.stars ? "" : "star-off"} />
        ))}
      </div>
      <blockquote>{t.text}</blockquote>
      <figcaption className="quote-who">
        <span className="quote-avatar" style={{ background: t.tone }}>
          {t.name[0]}
        </span>
        <span>
          <strong>{t.name}</strong>
          <span>{t.city}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function ReviewsPage() {
  const [userReviews, setUserReviews] = useState<UserReview[]>(loadUserReviews);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [stars, setStars] = useState(5);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState<{ name?: string; text?: string }>({});
  const [showToast, setShowToast] = useState(false);

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
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(next));
    } catch {
      /* اگر ذخیره ممکن نبود، همان نمایش کافی است */
    }
    setName("");
    setCity("");
    setText("");
    setStars(5);
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 3200);
    window.scrollTo({ top: document.getElementById("all-reviews")?.offsetTop ?? 0, behavior: "smooth" });
  };

  const totalReviews = RATING_SUMMARY.total + userReviews.length;

  return (
    <>
      {/* ── بازکننده‌ی صفحه ── */}
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
            نظرهای واقعی بعد از هر برداشت؛ بی‌کم‌وکاست، همان‌طور که نوشته شده‌اند — و شما هم
            می‌توانید پایین صفحه نظرتان را ثبت کنید.
          </p>
        </div>
      </section>

      <section className="shell" style={{ paddingTop: "3.5rem" }}>
        {/* ── خلاصه‌ی امتیاز + توزیع ستاره‌ها ── */}
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

        {/* ── همه‌ی دیدگاه‌ها ── */}
        <div id="all-reviews" className="quotes-grid" style={{ marginTop: "3rem" }}>
          {userReviews.map((r, i) => (
            <QuoteCard
              key={`user-${i}-${r.name}`}
              isNew
              t={{
                name: r.name,
                city: r.city,
                stars: r.stars,
                text: r.text,
                tone: "linear-gradient(135deg,#d89521,#b85d16)",
              }}
            />
          ))}
          {TESTIMONIALS.map((t) => (
            <QuoteCard key={t.name} t={t} />
          ))}
        </div>

        {/* ── فرم ثبت دیدگاه ── */}
        <div className="review-form-wrap">
          <form className="review-form reveal" onSubmit={submit} noValidate>
            <h3>شما هم از عسل ما چشیده‌اید؟</h3>
            <p>دیدگاه‌تان را بنویسید؛ مثل بقیه، بی‌کم‌وکاست همین‌جا نمایش می‌دهیم.</p>

            <div className="star-picker" role="radiogroup" aria-label="امتیاز شما">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  className={`star-pick${n <= stars ? " on" : ""}`}
                  onClick={() => setStars(n)}
                  aria-label={`${toFa(n)} ستاره`}
                >
                  <IconStar size={27} />
                </button>
              ))}
              <span className="star-hint">
                {toFa(stars)} ستاره از {toFa(5)}
              </span>
            </div>

            <div className="form-row">
              <div>
                <label htmlFor="rv-name">نام و نام خانوادگی</label>
                <input
                  id="rv-name"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثلاً رضا محمدی"
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div>
                <label htmlFor="rv-city">شهر (اختیاری)</label>
                <input
                  id="rv-city"
                  className="input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="مثلاً اصفهان"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="rv-text">دیدگاه شما</label>
              <textarea
                id="rv-text"
                className="textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="طعم، بسته‌بندی، ارسال… هرچه دوست دارید بنویسید."
              />
              {errors.text && <span className="form-error">{errors.text}</span>}
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: "1.3rem" }}>
              <IconSend size={17} />
              ثبت دیدگاه
            </button>
          </form>
        </div>
      </section>

      <section className="shell" style={{ padding: "4.5rem 1.25rem" }}>
        <div className="cta-band reveal">
          <h2>هنوز نچشیده‌اید؟ برداشت تازه منتظر نمی‌ماند</h2>
          <Link to="/products" className="btn btn-primary">
            دیدن محصولات
          </Link>
        </div>
      </section>

      {/* توست مخصوص این صفحه */}
      <div className={`toast${showToast ? " is-show" : ""}`} role="status">
        {showToast && (
          <>
            <IconCheck size={18} />
            دیدگاه شما ثبت شد؛ سپاس از همراهی‌تان!
          </>
        )}
      </div>
    </>
  );
}
