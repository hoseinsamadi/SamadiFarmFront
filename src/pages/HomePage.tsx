/* ════════════ صفحه‌ی خانه ════════════
   Hero + نوار وعده‌ها + مزایا + دسته‌بندی‌ها
   + پیش‌نمایش داستان و پیش‌نمایش دیدگاه‌ها */
import type React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Categories from "../components/Categories";
import { IconArrow, IconQuote, IconStar, IconYoutube } from "../components/icons";
import { STORY, TESTIMONIALS } from "../data/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Categories />

      {/* ── پیش‌نمایش داستان ── */}
      <section className="shell" style={{ paddingTop: "4.5rem" }}>
        <div className="story-panel reveal-lines">
          <div className="story-media">
            <img src={STORY.img} alt={STORY.imgAlt} loading="lazy" />
            <span className="story-since">{STORY.since}</span>
          </div>
          <div className="story-body">
            <span className="eyebrow">داستان ما</span>
            <h2 className="line-mask">
              <span className="line-inner">چیزی که می‌خورید، قصه دارد</span>
            </h2>
            <p>
              از دو کندوی چوبی پدربزرگ تا ۱۴۰ کندوی امروز؛ و حالا همه‌چیز را جلوی دوربین
              یوتیوب ثبت می‌کنیم تا ببینید عسل‌تان دقیقاً از کجا می‌آید.
            </p>
            <div className="teaser-ctas">
              <Link to="/story" className="btn btn-primary">
                خواندن داستان و تماشای ویدیوها
                <IconArrow size={17} />
              </Link>
              <a
                href="https://www.youtube.com/@samadifarm"
                target="_blank"
                rel="noreferrer"
                className="yt-pill"
              >
                <IconYoutube size={16} />
                کانال یوتیوب ما
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── پیش‌نمایش دیدگاه‌ها ── */}
      <section className="shell" style={{ paddingTop: "4.5rem" }}>
        <div className="cats-head reveal">
          <div>
            <span className="eyebrow">دیدگاه‌ها</span>
            <h2 className="section-title">حرفِ کسانی که چشیده‌اند</h2>
          </div>
          <Link to="/reviews" className="more-link">
            دیدن همه‌ی دیدگاه‌ها
            <IconArrow size={16} />
          </Link>
        </div>

        <div className="quotes-grid quotes-grid--two">
          {TESTIMONIALS.slice(0, 2).map((t, i) => (
            <figure
              className="quote-card reveal"
              key={t.name}
              style={
                {
                  "--d": `${i * 0.1}s`,
                  "--tilt": i % 2 === 0 ? "-1.2deg" : "1.1deg",
                } as React.CSSProperties
              }
            >
              <span className="quote-mark">
                <IconQuote size={30} />
              </span>
              <div className="quote-stars" aria-label={`${t.stars} ستاره از ۵`}>
                {Array.from({ length: t.stars }).map((_, s) => (
                  <IconStar key={s} size={14} />
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
          ))}
        </div>
      </section> 

      {/* ── دعوت به خرید ── */}
      <section className="shell" style={{ padding: "4.5rem 1.25rem" }}>
        <div className="cta-band reveal">
          <h2>برداشت تازه هنوز روی میز است؛ تا تمام نشده بچشید</h2>
          <Link to="/products" className="btn btn-primary">
            دیدن محصولات
            <IconArrow size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
