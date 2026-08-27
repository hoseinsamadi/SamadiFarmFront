/* ──────────── کشوی سبد خرید ──────────── */
import { useEffect, useState } from "react";
import { CONTACT, type Product } from "../data/site";
import { formatToman, toFa } from "../hooks/useReveal";
import { IconArrow, IconBag, IconCheck, IconMinus, IconPlus, IconTrash, IconWhatsApp, IconX } from "./icons";

export interface CartEntry {
  product: Product;
  qty: number;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  entries: CartEntry[];
  total: number;
  onInc: (id: string) => void;
  onDec: (id: string) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  open,
  onClose,
  entries,
  total,
  onInc,
  onDec,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const [placed, setPlaced] = useState(false);
  const [waLink, setWaLink] = useState("");

  /* با بسته‌شدن کشو یا باز شدن دوباره‌ی سبدِ پُر، حالت «ثبت شد» پاک شود */
  useEffect(() => {
    if (!open) setPlaced(false);
    else if (entries.length > 0) setPlaced(false);
  }, [open, entries.length]);

  const checkout = () => {
    const lines = entries.map((e) => `• ${e.product.name} × ${toFa(e.qty)}`);
    const msg = `سلام صمدی فارم 🌿%0Aسفارش من:%0A${encodeURIComponent(lines.join("\n"))}%0Aجمع: ${formatToman(total)} تومان`;
    setWaLink(`https://wa.me/${CONTACT.whatsapp}?text=${msg}`);
    setPlaced(true);
    onCheckout();
  };

  return (
    <>
      <div
        className={`overlay${open ? " is-open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`drawer${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="سبد خرید"
      >
        <div className="drawer-head">
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem" }}>
            <h3>سبد خرید</h3>
            <span>{entries.length > 0 ? `${toFa(entries.length)} قلم` : ""}</span>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="بستن سبد خرید">
            <IconX size={19} />
          </button>
        </div>

        {placed ? (
          <div className="drawer-success">
            <span className="ring">
              <IconCheck size={32} />
            </span>
            <h4>سفارش شما آماده است!</h4>
            <p>
              برای تکمیل و هماهنگی ارسال، فهرست سفارش را در واتساپ برایمان بفرستید؛ خودِ
              زنبوردار پاسخ می‌دهد.
            </p>
            <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-wa w-full">
              <IconWhatsApp size={19} />
              تکمیل در واتساپ
            </a>
            <button type="button" className="btn btn-ghost w-full mt-3" onClick={onClose}>
              بستن
            </button>
          </div>
        ) : entries.length === 0 ? (
          <div className="drawer-empty">
            <span className="hex-ghost">
              <IconBag size={30} />
            </span>
            <p>
              سبدتان هنوز خالی است.
              <br />
              از برداشت تازه‌ی کندوها دیدن کنید.
            </p>
            <a href="#products" className="btn btn-primary" onClick={onClose}>
              دیدن محصولات
              <IconArrow size={17} />
            </a>
          </div>
        ) : (
          <>
            <div className="drawer-body">
              {entries.map(({ product, qty }) => (
                <div className="cart-item" key={product.id}>
                  <img src={product.img} alt={product.name} />
                  <div className="cart-item-info">
                    <span className="unit">{product.weight}</span>
                    <h4>{product.name}</h4>
                    <div className="cart-item-row">
                      <div className="qty-ctrl">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => onInc(product.id)}
                          aria-label="افزایش تعداد"
                        >
                          <IconPlus size={14} />
                        </button>
                        <span className="qty-num">{toFa(qty)}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => onDec(product.id)}
                          aria-label="کاهش تعداد"
                        >
                          <IconMinus size={14} />
                        </button>
                      </div>
                      <span className="item-total">{formatToman(product.price * qty)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="item-remove"
                    onClick={() => onRemove(product.id)}
                    aria-label={`حذف ${product.name}`}
                  >
                    <IconTrash size={17} />
                  </button>
                </div>
              ))}
            </div>
            <div className="drawer-foot">
              <div className="drawer-total">
                <span>جمع سبد</span>
                <strong>
                  {formatToman(total)} <small>تومان</small>
                </strong>
              </div>
              <button type="button" className="btn btn-primary" onClick={checkout}>
                ثبت و ادامه در واتساپ
                <IconArrow size={17} />
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
