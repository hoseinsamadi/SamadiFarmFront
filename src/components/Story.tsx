/* ──────────── داستان برند + آمار با شمارش متحرک ──────────── */
import type React from "react";
import { STATS, STORY } from "../data/site";
import { formatToman, toFa, useCountUp } from "../hooks/useReveal";

function Stat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
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

export default function Story() {
  return (
    <section id="story" className="shell" style={{ paddingTop: "4.5rem" }}>
      <div className="story-panel reveal-lines">
        <div className="story-media">
          <img src={STORY.img} alt={STORY.imgAlt} loading="lazy" />
          <span className="story-since">{STORY.since}</span>
        </div>
        <div className="story-body">
          <span className="eyebrow">{STORY.eyebrow}</span>
          <h2 className="line-mask">
            <span className="line-inner">{STORY.title}</span>
          </h2>
          <p>{STORY.copy}</p>
          <p className="story-quote">
            {STORY.quote}
            <br />
            <strong>— {STORY.quoteBy}</strong>
          </p>

          <div className="stats-grid">
            {STATS.map((s, i) => (
              <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={i * 0.1} />
            ))}
          </div>

          <div style={{ marginTop: "2rem" }}>
            <a href="#products" className="btn btn-primary">
              {STORY.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
