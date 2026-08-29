/* ──────────── نوار مزایا (۴ وعده‌ی کلیدی) ──────────── */
import type React from "react";
import { BENEFITS } from "../data/site";
import { IconDrop, IconHive, IconShield, IconTruck } from "./icons";

const ICONS = {
  truck: IconTruck,
  shield: IconShield,
  drop: IconDrop,
  hive: IconHive,
};

export default function Benefits() {
  return (
    <section className="benefits-band" aria-label="مزایای خرید از صمدی فارم">
      <div className="shell benefits-grid">
        {BENEFITS.map((b, i) => {
          const Icon = ICONS[b.icon];
          return (
            <div
              className="benefit reveal"
              key={b.title}
              style={{ "--d": `${i * 0.1}s` } as React.CSSProperties}
            >
              <span className="benefit-icon">
                <Icon size={22} />
              </span>
              <div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
