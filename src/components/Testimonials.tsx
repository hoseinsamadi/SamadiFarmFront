/* ──────────── دیدگاه مشتریان ──────────── */
import type React from "react";
import { TESTIMONIALS } from "../data/site";
import { IconQuote, IconStar } from "./icons";

export default function Testimonials() {
  return (
    <section id="reviews" className="shell" style={{ paddingTop: "4.5rem" }}>
      <div className="cats-head reveal">
        <div>
          <span className="eyebrow">دیدگاه‌ها</span>
          <h2 className="section-title">حرفِ کسانی که چشیده‌اند</h2>
        </div>
        <p>
          نظرهایی که بعد از هر برداشت برایمان می‌رسد؛ بی‌کم‌وکاست، همان‌طور که نوشته شده‌اند.
        </p>
      </div>

      <div className="quotes-grid">
        {TESTIMONIALS.map((t, i) => (
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
  );
}
