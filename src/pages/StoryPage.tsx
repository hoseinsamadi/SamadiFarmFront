/* ════════════ صفحه‌ی داستان ما ════════════
   بازکننده‌ی تصویری + متن بلند داستان + خط زمانی سه نسل
   + آمار با شمارش متحرک + ویدیوهای یوتیوب + دعوت به خرید */
import type React from "react";
import { Link } from "react-router-dom";
import {
  FEATURED_VIDEO,
  STATS,
  STORY,
  STORY_LONG,
  TIMELINE,
  VIDEOS,
  YOUTUBE,
} from "../data/site";
import { formatToman, scrollToId, toFa, useCountUp } from "../hooks/useReveal";
import { IconArrow, IconPlay, IconYoutube } from "../components/icons";

function StatBlock({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const { ref, value: v } = useCountUp(value);
  return (
    <div className="reveal" style={{ "--d": `${delay}s` } as React.CSSProperties}>
      <span className="stat-num" ref={ref as React.RefObject<HTMLSpanElement>}>
        {formatToman(v)}
        {suffix && <span> {toFa(suffix)}</span>}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function StoryPage() {
  return (
    <>
      {/* ── بازکننده‌ی صفحه با پس‌زمینه‌ی تصویری ── */}
      <section className="page-opener page-opener--dark">
        <div className="page-opener-media">
          <img src={STORY.img} alt="" />
        </div>
        <div className="opener-overlay" aria-hidden="true" />
        <div className="shell" style={{ position: "relative" }}>
          <nav className="breadcrumb" aria-label="مسیر صفحه">
            <Link to="/">خانه</Link>
            <span aria-hidden="true">/</span>
            <span>داستان ما</span>
          </nav>
          <span className="eyebrow eyebrow--light">{STORY.eyebrow}</span>
          <h1 className="page-title">{STORY.title}</h1>
          <p className="page-desc">{STORY.copy}</p>
          <div className="opener-actions">
            <button type="button" className="btn btn-primary" onClick={() => scrollToId("videos")}>
              <IconPlay size={17} />
              تماشای ویدیوهای برداشت
            </button>
            <a href={YOUTUBE.channelUrl} target="_blank" rel="noreferrer" className="yt-pill">
              <IconYoutube size={16} />
              {YOUTUBE.channelLabel}
            </a>
          </div>
        </div>
      </section>

      {/* ── داستان بلند + خط زمانی ── */}
      <section className="shell" style={{ paddingTop: "4.2rem" }}>
        <div className="story-cols">
          <div>
            <h2 className="section-title">سه نسل، یک وسواس</h2>
            {STORY_LONG.map((para, i) => (
              <p
                className="story-para reveal"
                key={para.slice(0, 18)}
                style={{ "--d": `${i * 0.1}s` } as React.CSSProperties}
              >
                {para}
              </p>
            ))}
            <blockquote className="story-quote-big reveal">
              {STORY.quote}
              <strong>— {STORY.quoteBy}</strong>
            </blockquote>
          </div>

          <div>
            <h3 className="timeline-title reveal">خطِ زمانِ کندوها</h3>
            <div className="timeline">
              {TIMELINE.map((t, i) => (
                <div
                  className="timeline-item reveal"
                  key={t.year}
                  style={{ "--d": `${i * 0.09}s` } as React.CSSProperties}
                >
                  <span className="timeline-dot" aria-hidden="true" />
                  <span className="timeline-year">{t.year}</span>
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── آمار ── */}
        <div className="stats-grid stats-grid--wide" style={{ marginTop: "3.8rem" }}>
          {STATS.map((s, i) => (
            <StatBlock key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* ── ویدیوهای یوتیوب ── */}
      <section id="videos" className="products-band" style={{ marginTop: "4.5rem" }}>
        <div className="shell" style={{ padding: "4.2rem 1.25rem" }}>
          <div className="cats-head reveal">
            <div>
              <span className="eyebrow">کانال یوتیوب</span>
              <h2 className="section-title">از کندو تا شیشه، جلوی دوربین</h2>
            </div>
            <a href={YOUTUBE.channelUrl} target="_blank" rel="noreferrer" className="yt-pill">
              <IconYoutube size={16} />
              {YOUTUBE.channelLabel}
            </a>
          </div>

          {/* ویدیوی اصلی — پخش درون‌صفحه‌ای */}
          <div className="video-featured reveal">
            <div className="video-frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${FEATURED_VIDEO.videoId}`}
                title={FEATURED_VIDEO.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="video-featured-info">
              <strong>{FEATURED_VIDEO.title}</strong>
              <span>
                {FEATURED_VIDEO.meta} • {FEATURED_VIDEO.duration}
              </span>
            </div>
          </div>

          {/* سایر ویدیوها */}
          <div className="videos-grid">
            {VIDEOS.map((v, i) => (
              <a
                key={v.videoId}
                className="video-card reveal"
                style={{ "--d": `${i * 0.08}s` } as React.CSSProperties}
                href={`https://www.youtube.com/watch?v=${v.videoId}`}
                target="_blank"
                rel="noreferrer"
              >
                <div className="video-thumb">
                  <img
                    src={`https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`}
                    alt={v.title}
                    loading="lazy"
                  />
                  <span className="video-play">
                    <span className="play-btn">
                      <IconPlay size={22} />
                    </span>
                  </span>
                  <span className="video-duration">{v.duration}</span>
                </div>
                <div className="video-info">
                  <h4>{v.title}</h4>
                  <span>{v.meta}</span>
                </div>
              </a>
            ))}
          </div>

          <p className="products-note reveal">
            <IconYoutube size={17} />
            هر ویدیو، همان کندویی را نشان می‌دهد که عسلِ همان شیشه از آن برداشت شده است
          </p>
        </div>
      </section>

      {/* ── دعوت به خرید ── */}
      <section className="shell" style={{ padding: "4.5rem 1.25rem" }}>
        <div className="cta-band reveal">
          <h2>حالا که قصه را دیدید، طعمش را هم بچشید</h2>
          <Link to="/shop" className="btn btn-primary">
            دیدن محصولات
            <IconArrow size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
