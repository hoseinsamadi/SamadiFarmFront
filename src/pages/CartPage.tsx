/* ════════════ صفحه‌ی سبد خرید ════════════
   فهرست اقلام، تغییر تعداد، کد تخفیف، جمع‌بندی و ادامه‌ی خرید */
import { useState } from "react";
import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import Seo from "../components/Seo";
import { useShop } from "../context/ShopContext";
import { formatToman, toFa } from "../hooks/useReveal";
import { normalizeDigits } from "../lib/storage";
import { IconArrow, IconBag, IconMinus, IconPlus, IconSpark, IconTrash } from "../components/icons";

export default function CartPage() {
  const {
    cart, inc, dec, removeItem, clearCart,
    cartSubtotal, discount, applyDiscount, clearDiscount,
    user, showToast,
  } = useShop();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");

  const discountAmount = discount ? Math.round(cartSubtotal * discount.rate) : 0;
  const total = cartSubtotal - discountAmount;

  const submitCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyDiscount(code)) {
      setCodeError("");
      setCode("");
      showToast("کد تخفیف با موفقیت اعمال شد");
    } else {
      setCodeError("این کد معتبر نیست. کدهای نمونه: ASAL10 یا KANDOO5");
    }
  };

  const goCheckout = () => {
    if (!user) {
      showToast("برای ادامه، ابتدا وارد حساب خود شوید");
      navigate("/account?next=/checkout");
      return;
    }
    navigate("/checkout");
  };

  return (
    <>
      <Seo
        title="سبد خرید"
        description="سبد خرید شما در فروشگاه صمدی فارم — بررسی اقلام، اعمال کد تخفیف و ادامه به پرداخت."
      />

      <section className="page-opener">
        <div className="honeycomb pattern-abs" aria-hidden="true" />
        <div className="shell" style={{ position: "relative" }}>
          <nav className="breadcrumb" aria-label="مسیر صفحه">
            <Link to="/">خانه</Link>
            <span aria-hidden="true">/</span>
            <Link to="/shop">فروشگاه</Link>
            <span aria-hidden="true">/</span>
            <span>سبد خرید</span>
          </nav>
          <h1 className="page-title">سبد خرید شما</h1>
          <p className="page-desc">
            {cart.length > 0
              ? `${toFa(cart.length)} قلم از محصولات کندو در سبد شماست.`
              : "هنوز چیزی در سبد نیست؛ کندوها منتظرند."}
          </p>
        </div>
      </section>

      <section className="shell cart-layout" style={{ padding: "3rem 1.25rem 4.5rem" }}>
        {cart.length === 0 ? (
          <div className="drawer-empty" style={{ gridColumn: "1 / -1" }}>
            <span className="hex-ghost">
              <IconBag size={34} />
            </span>
            <p>
              سبدتان خالی است.
              <br />
              از برداشت تازه‌ی پاییز دیدن کنید.
            </p>
            <Link to="/shop" className="btn btn-primary">
              رفتن به فروشگاه
              <IconArrow size={17} />
            </Link>
          </div>
        ) : (
          <>
            {/* ── فهرست اقلام ── */}
            <div className="cart-list">
              {cart.map(({ product, qty }) => (
                <div className="cart-row reveal" key={product.id}>
                  <img src={product.img} alt={product.name} />
                  <div className="cart-row-main">
                    <div className="cart-row-top">
                      <div>
                        <span className="unit">{product.weight}</span>
                        <h3>{product.name}</h3>
                      </div>
                      <button
                        type="button"
                        className="item-remove"
                        onClick={() => removeItem(product.id)}
                        aria-label={`حذف ${product.name}`}
                      >
                        <IconTrash size={17} />
                      </button>
                    </div>
                    <div className="cart-row-bottom">
                      <div className="qty-ctrl">
                        <button type="button" className="qty-btn" onClick={() => inc(product.id)} aria-label="افزایش تعداد">
                          <IconPlus size={14} />
                        </button>
                        <span className="qty-num">{toFa(qty)}</span>
                        <button type="button" className="qty-btn" onClick={() => dec(product.id)} aria-label="کاهش تعداد">
                          <IconMinus size={14} />
                        </button>
                      </div>
                      <span className="cart-row-price">
                        {formatToman(product.price * qty)} <small>تومان</small>
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <button type="button" className="link-danger" onClick={() => { clearCart(); clearDiscount(); }}>
                خالی‌کردن سبد
              </button>
            </div>

            {/* ── جمع‌بندی ── */}
            <aside className="cart-summary reveal" aria-label="جمع‌بندی سفارش">
              <h2>جمع‌بندی سفارش</h2>

              <form className="discount-box" onSubmit={submitCode}>
                <label htmlFor="discount-code">کد تخفیف</label>
                <div className="discount-row">
                  <input
                    id="discount-code"
                    className="input"
                    value={code}
                    onChange={(e) => { setCode(e.target.value); setCodeError(""); }}
                    placeholder="مثلاً ASAL10"
                  />
                  <button type="submit" className="btn btn-dark btn-sm">
                    اعمال
                  </button>
                </div>
                {codeError && <span className="form-error">{codeError}</span>}
                {discount && (
                  <span className="discount-applied">
                    <IconSpark size={15} />
                    کد {discount.code} فعال است ({toFa(Math.round(discount.rate * 100))}٪)
                    <button type="button" onClick={clearDiscount} aria-label="حذف کد تخفیف">
                      حذف
                    </button>
                  </span>
                )}
              </form>

              <dl className="summary-lines">
                <div>
                  <dt>جمع اقلام</dt>
                  <dd>{formatToman(cartSubtotal)}</dd>
                </div>
                {discount && (
                  <div className="line-green">
                    <dt>تخفیف</dt>
                    <dd>− {formatToman(discountAmount)}</dd>
                  </div>
                )}
                <div>
                  <dt>هزینه‌ی ارسال</dt>
                  <dd className="muted">در مرحله‌ی پرداخت</dd>
                </div>
                <div className="summary-total">
                  <dt>مبلغ قابل پرداخت</dt>
                  <dd>
                    {formatToman(total)} <small>تومان</small>
                  </dd>
                </div>
              </dl>

              <button type="button" className="btn btn-primary w-full" onClick={goCheckout}>
                ادامه و پرداخت
                <IconArrow size={17} />
              </button>
              <Link to="/shop" className="btn btn-ghost w-full mt-3" style={{ justifyContent: "center" }}>
                افزودن محصول دیگر
              </Link>
              {!user && (
                <p className="summary-note">
                  برای پرداخت، در مرحله‌ی بعد وارد حساب می‌شوید یا حساب می‌سازید.
                </p>
              )}
            </aside>
          </>
        )}
      </section>
    </>
  );
}
