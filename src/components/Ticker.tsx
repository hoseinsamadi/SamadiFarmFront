/* ──────────── نوار متحرک وعده‌های برند ──────────── */
import { TICKER_ITEMS } from "../data/site";
import { IconHex } from "./icons";

export default function Ticker() {
  const loop = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker" aria-label="وعده‌های صمدی فارم">
      <div className="ticker-track">
        {loop.map((item, i) => (
          <span className="ticker-item" key={`${item}-${i}`}>
            {item}
            <IconHex size={13} />
          </span>
        ))}
      </div>
    </div>
  );
}
