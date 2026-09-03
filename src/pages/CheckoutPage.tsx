/* ════════════ صفحه‌ی تسویه‌حساب و پرداخت ════════════
   سه گام: ۱) انتخاب آدرس  ۲) روش ارسال  ۳) پرداخت (کریپتو یا کارت بانکی)
   سپس صفحه‌ی موفقیت با شماره سفارش. در نسخه‌ی جنگو، کریپتو به
   NOWPayments و بانک به درگاه زرین‌پال/آی‌دی‌پی وصل می‌شود. */
import { useMemo, useRef, useState } from "react";
import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import Seo from "../components/Seo";
import AddressForm, { type AddressFormValues } from "../components/AddressForm";
import { useShop } from "../context/ShopContext";
import {
  BANK_GATEWAYS, CRYPTO_WALLETS, RATES, SHIPPING_METHODS,
  type CryptoWallet, type ShippingMethod,
} from "../data/site";
import { formatToman, toFa } from "../hooks/useReveal";
import { normalizeDigits, type Address, type Order } from "../lib/storage";
import {
  IconArrow, IconBag, IconCheck, IconCopy, IconCreditCard, IconLock, IconPin, IconWallet,
} from "../components/icons";

type PayMethod = "crypto" | "bank";

const STEPS = ["آدرس ارسال", "روش ارسال", "پرداخت"];

function cryptoAmount(totalToman: number, w: CryptoWallet): string {
  const usd = totalToman / RATES.tomanPerUsd;
  const amount = usd / w.usd;
  return amount.toFixed(w.decimals);
}

function cryptoUri(w: CryptoWallet, amount: string): string {
  if (w.coin === "BTC") return `bitcoin:${w.address}?amount=${amount}`;
  if (w.coin === "ETH") return `ethereum:${w.address}?value=${amount}`;
  return w.address;
}

export default function CheckoutPage() {
  const {
    cart, cartSubtotal, discount, user, addresses, saveAddress,
    placeOrder, clearCart, clearDiscount, showToast,
  } = useShop();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [addingAddress, setAddingAddress] = useState(false);
  const [shippingId, setShippingId] = useState<string>(SHIPPING_METHODS[0].id);
  const [payMethod, setPayMethod] = useState<PayMethod>("crypto");

  /* کریپتو */
  const [coinIdx, setCoinIdx] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);

  /* بانک */
  const [gateway, setGateway] = useState(BANK_GATEWAYS[0]);
  const [cardNo, setCardNo] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv2, setCvv2] = useState("");
  const [otp, setOtp] = useState("");
  const [bankErrors, setBankErrors] = useState<Record<string, string>>({});

  const [processing, setProcessing] = useState(false);
  const [doneOrder, setDoneOrder] = useState<Order | null>(null);
  const timer = useRef<number | null>(null);

  const myAddresses = useMemo(
    () => (user ? addresses.filter((a) => a.owner === user.email) : []),
    [user, addresses]
  );

  const chosenAddress = myAddresses.find((a) => a.id === selectedAddressId) ?? null;
  const shipping: ShippingMethod =
    SHIPPING_METHODS.find((s) => s.id === shippingId) ?? SHIPPING_METHODS[0];

  const discountAmount = discount ? Math.round(cartSubtotal * discount.rate) : 0;
  const shippingFree = shipping.freeOver !== undefined && cartSubtotal >= shipping.freeOver;
  const shippingCost = shippingFree ? 0 : shipping.price;
  const total = cartSubtotal - discountAmount + shippingCost;

  const wallet = CRYPTO_WALLETS[coinIdx];
  const amount = cryptoAmount(total, wallet);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      showToast("کپی ممکن نشد؛ آدرس را دستی انتخاب کنید");
    }
  };

  /* ── نگهبان‌ها ── */
  if (!user) {
    return (
      <>
        <Seo title="پرداخت" description="تسویه‌حساب و پرداخت امن در فروشگاه صمدی فارم." />
        <section className="shell" style={{ padding: "6rem 1.25rem", textAlign: "center" }}>
          <div className="drawer-empty reveal is-visible">
            <span className="hex-ghost"><IconLock size={30} /></span>
            <p>برای پرداخت امن، ابتدا وارد حساب خود شوید.</p>
            <Link to="/account?next=/checkout" className="btn btn-primary">ورود / ساخت حساب</Link>
          </div>
        </section>
      </>
    );
  }

  if (cart.length === 0 && !doneOrder) {
    return (
      <>
        <Seo title="پرداخت" description="تسویه‌حساب و پرداخت امن در فروشگاه صمدی فارم." />
        <section className="shell" style={{ padding: "6rem 1.25rem", textAlign: "center" }}>
          <div className="drawer-empty reveal is-visible">
            <span className="hex-ghost"><IconBag size={32} /></span>
            <p>سبد شما خالی است؛ چیزی برای پرداخت نیست.</p>
            <Link to="/shop" className="btn btn-primary">
              رفتن به فروشگاه
              <IconArrow size={17} />
            </Link>
          </div>
        </section>
      </>
    );
  }

  const finish = (paymentLabel: string, address: Address) => {
    setProcessing(true);
    timer.current = window.setTimeout(() => {
      const order = placeOrder({
        shipping: shippingCost,
        shippingTitle: shipping.title,
        payment: paymentLabel,
        address,
      });
      clearCart();
      clearDiscount();
      setProcessing(false);
      setDoneOrder(order);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1900);
  };

  const validateBank = (): boolean => {
    const errs: Record<string, string> = {};
    const digits = normalizeDigits(cardNo).replace(/\s/g, "");
    if (!/^\d{16}$/.test(digits)) errs.cardNo = "شماره کارت باید ۱۶ رقم باشد.";
    if (!/^\d{2}\/\d{2}$/.test(normalizeDigits(expiry))) errs.expiry = "تاریخ انقضا به شکل ۰۳/۰۷ باشد.";
    if (!/^\d{3,4}$/.test(normalizeDigits(cvv2))) errs.cvv2 = "CVV2 سه یا چهار رقم است.";
    if (!/^\d{5,8}$/.test(normalizeDigits(otp))) errs.otp = "رمز پویا را از بانک دریافت کنید (۵ تا ۸ رقم).";
    setBankErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ──────────── صفحه‌ی موفقیت ──────────── */
  if (doneOrder) {
    return (
      <>
        <Seo title="سفارش ثبت شد" description="سفارش شما با موفقیت در صمدی فارم ثبت شد." />
        <section className="shell" style={{ padding: "5rem 1.25rem 6rem" }}>
          <div className="success-panel reveal is-visible">
            <span className="ring big"><IconCheck size={38} /></span>
            <h1>پرداخت شما دریافت شد!</h1>
            <p className="success-sub">
              عسل‌ها همان امروز درب‌موم و بسته‌بندی می‌شوند؛ پیامک رهگیری ارسال خواهد شد.
            </p>
            <dl className="success-grid">
              <div><dt>شماره سفارش</dt><dd className="mono">{doneOrder.id}</dd></div>
              <div><dt>روش پرداخت</dt><dd>{doneOrder.payment}</dd></div>
              <div><dt>ارسال به</dt><dd>{doneOrder.address}</dd></div>
              <div><dt>مبلغ پرداختی</dt><dd>{formatToman(doneOrder.total)} تومان</dd></div>
            </dl>
            <div className="success-actions">
              <button type="button" className="btn btn-primary" onClick={() => navigate("/account")}>
                مشاهده‌ی سفارش‌ها
              </button>
              <Link to="/shop" className="btn btn-ghost">بازگشت به فروشگاه</Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  const canNext0 = chosenAddress !== null;
  const canPay = payMethod === "crypto" ? confirmed : true;

  return (
    <>
      <Seo
        title="تسویه‌حساب و پرداخت"
        description="پرداخت امن با ارز دیجیتال (USDT، بیت‌کوین، اتریوم) یا کارت بانکی از طریق درگاه — فروشگاه صمدی فارم."
      />

      <section className="page-opener">
        <div className="honeycomb pattern-abs" aria-hidden="true" />
        <div className="shell" style={{ position: "relative" }}>
          <nav className="breadcrumb" aria-label="مسیر صفحه">
            <Link to="/">خانه</Link>
            <span aria-hidden="true">/</span>
            <Link to="/cart">سبد خرید</Link>
            <span aria-hidden="true">/</span>
            <span>پرداخت</span>
          </nav>
          <h1 className="page-title">تسویه‌حساب</h1>
          <p className="page-desc">سه گام کوتاه تا رسیدن عسل‌ها به درِ خانه‌ی شما.</p>
        </div>
      </section>

      <section className="shell checkout-layout" style={{ padding: "2.8rem 1.25rem 4.5rem" }}>
        <div>
          {/* ── نشانگر گام‌ها ── */}
          <ol className="steps" aria-label="مراحل تسویه‌حساب">
            {STEPS.map((s, i) => (
              <li
                key={s}
                className={`step${i === step ? " is-current" : ""}${i < step ? " is-done" : ""}`}
                aria-current={i === step ? "step" : undefined}
              >
                <span className="step-num">
                  {i < step ? <IconCheck size={13} /> : toFa(i + 1)}
                </span>
                {s}
              </li>
            ))}
          </ol>

          {/* ═══ گام ۱: آدرس ═══ */}
          {step === 0 && (
            <div className="checkout-step reveal is-visible">
              <h2 className="step-title"><IconPin size={19} /> آدرس را انتخاب کنید</h2>

              {myAddresses.length === 0 && !addingAddress && (
                <div className="empty-note">
                  <IconPin size={20} />
                  هنوز آدرسی ندارید؛ اولین آدرس را ثبت کنید.
                </div>
              )}

              <div className="radio-cards">
                {myAddresses.map((a) => (
                  <label className={`radio-card${chosenAddress?.id === a.id ? " is-checked" : ""}`} key={a.id}>
                    <input
                      type="radio"
                      name="address"
                      checked={chosenAddress?.id === a.id}
                      onChange={() => setSelectedAddressId(a.id)}
                    />
                    <span className="radio-dot" aria-hidden="true" />
                    <span className="radio-card-body">
                      <strong>{a.receiver} {a.isDefault && <span className="mini-chip">پیش‌فرض</span>}</strong>
                      <span>{a.province}، {a.city}، {a.detail}</span>
                      <span className="muted" dir="ltr">{toFa(a.phone)}</span>
                    </span>
                  </label>
                ))}
              </div>

              {!addingAddress ? (
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setAddingAddress(true)}>
                  افزودن آدرس جدید
                </button>
              ) : (
                <div className="address-form-card">
                  <h3>آدرس جدید</h3>
                  <AddressForm
                    onSubmit={(v: AddressFormValues) => {
                      saveAddress(v);
                      setAddingAddress(false);
                      showToast("آدرس ذخیره شد؛ آن را انتخاب کنید");
                    }}
                    onCancel={() => setAddingAddress(false)}
                  />
                </div>
              )}

              <div className="step-nav">
                <span />
                <button type="button" className="btn btn-primary" disabled={!canNext0} onClick={() => setStep(1)}>
                  گام بعد: روش ارسال
                  <IconArrow size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ═══ گام ۲: روش ارسال ═══ */}
          {step === 1 && (
            <div className="checkout-step reveal is-visible">
              <h2 className="step-title"><IconBag size={19} /> روش ارسال</h2>
              <div className="radio-cards">
                {SHIPPING_METHODS.map((s) => {
                  const free = s.freeOver !== undefined && cartSubtotal >= s.freeOver;
                  const disabled = s.freeOver !== undefined && !free && s.id === "free";
                  return (
                    <label
                      className={`radio-card${shippingId === s.id ? " is-checked" : ""}${disabled ? " is-disabled" : ""}`}
                      key={s.id}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        disabled={disabled && s.price === 0 && s.id === "free" ? cartSubtotal < (s.freeOver ?? 0) : false}
                        checked={shippingId === s.id}
                        onChange={() => setShippingId(s.id)}
                      />
                      <span className="radio-dot" aria-hidden="true" />
                      <span className="radio-card-body">
                        <strong>{s.title}</strong>
                        <span>{s.desc}</span>
                      </span>
                      <span className="radio-price">
                        {free || s.price === 0 ? "رایگان" : `${formatToman(s.price)} تومان`}
                      </span>
                    </label>
                  );
                })}
              </div>
              <div className="step-nav">
                <button type="button" className="btn btn-ghost" onClick={() => setStep(0)}>
                  بازگشت
                </button>
                <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>
                  گام بعد: پرداخت
                  <IconArrow size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ═══ گام ۳: پرداخت ═══ */}
          {step === 2 && (
            <div className="checkout-step reveal is-visible">
              <h2 className="step-title"><IconLock size={19} /> روش پرداخت</h2>

              {/* انتخاب روش */}
              <div className="pay-switch" role="tablist" aria-label="روش پرداخت">
                <button
                  type="button" role="tab" aria-selected={payMethod === "crypto"}
                  className={`pay-switch-btn${payMethod === "crypto" ? " is-active" : ""}`}
                  onClick={() => setPayMethod("crypto")}
                >
                  <IconWallet size={19} />
                  ارز دیجیتال
                </button>
                <button
                  type="button" role="tab" aria-selected={payMethod === "bank"}
                  className={`pay-switch-btn${payMethod === "bank" ? " is-active" : ""}`}
                  onClick={() => setPayMethod("bank")}
                >
                  <IconCreditCard size={19} />
                  کارت بانکی
                </button>
              </div>

              {/* ── پرداخت کریپتو ── */}
              {payMethod === "crypto" && (
                <div className="pay-panel">
                  <div className="coin-tabs" role="tablist" aria-label="انتخاب ارز">
                    {CRYPTO_WALLETS.map((w, i) => (
                      <button
                        key={w.coin} type="button" role="tab" aria-selected={coinIdx === i}
                        className={`coin-tab${coinIdx === i ? " is-active" : ""}`}
                        onClick={() => { setCoinIdx(i); setConfirmed(false); }}
                      >
                        <strong>{w.coin}</strong>
                        <span>{w.network}</span>
                      </button>
                    ))}
                  </div>

                  <div className="crypto-body">
                    <div className="qr-box">
                      <QRCode value={cryptoUri(wallet, amount)} size={168} bgColor="#fffdf6" fgColor="#243225" />
                      <span>مبلغ را دقیقاً به همین آدرس بفرستید</span>
                    </div>
                    <div className="crypto-info">
                      <div className="crypto-amount">
                        <span>مبلغ قابل پرداخت</span>
                        <strong dir="ltr">{amount} {wallet.coin}</strong>
                        <small>≈ {formatToman(total)} تومان</small>
                      </div>
                      <label className="crypto-label" htmlFor="wallet-address">
                        آدرس کیف پول ({wallet.network})
                      </label>
                      <div className="wallet-row">
                        <code id="wallet-address" dir="ltr">{wallet.address}</code>
                        <button type="button" className={`copy-btn${copied ? " is-copied" : ""}`} onClick={copyAddress}>
                          {copied ? <IconCheck size={15} /> : <IconCopy size={15} />}
                          {copied ? "کپی شد" : "کپی"}
                        </button>
                      </div>
                      <label className="check-line" htmlFor="crypto-confirm">
                        <input
                          id="crypto-confirm" type="checkbox"
                          checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)}
                        />
                        <span className="check-box" aria-hidden="true"><IconCheck size={13} /></span>
                        مبلغ را ارسال کردم؛ رسید تراکنش را در واتساپ می‌فرستم
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* ── پرداخت بانکی ── */}
              {payMethod === "bank" && (
                <div className="pay-panel">
                  <div className="coin-tabs" role="tablist" aria-label="انتخاب درگاه">
                    {BANK_GATEWAYS.map((g) => (
                      <button
                        key={g} type="button" role="tab" aria-selected={gateway === g}
                        className={`coin-tab${gateway === g ? " is-active" : ""}`}
                        onClick={() => setGateway(g)}
                      >
                        <strong>{g}</strong>
                      </button>
                    ))}
                  </div>

                  <div className="bank-form">
                    <div className="field">
                      <label htmlFor="card-no">شماره کارت</label>
                      <input
                        id="card-no" className="input mono" dir="ltr" inputMode="numeric"
                        placeholder="6037 •••• •••• ••••"
                        value={cardNo}
                        onChange={(e) => {
                          const d = normalizeDigits(e.target.value).replace(/\D/g, "").slice(0, 16);
                          setCardNo(d.replace(/(\d{4})(?=\d)/g, "$1 "));
                        }}
                      />
                      {bankErrors.cardNo && <span className="form-error">{bankErrors.cardNo}</span>}
                    </div>
                    <div className="form-row">
                      <div>
                        <label htmlFor="card-exp">انقضا (ماه/سال)</label>
                        <input
                          id="card-exp" className="input mono" dir="ltr" inputMode="numeric" placeholder="03/07"
                          value={expiry}
                          onChange={(e) => {
                            const d = normalizeDigits(e.target.value).replace(/\D/g, "").slice(0, 4);
                            setExpiry(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
                          }}
                        />
                        {bankErrors.expiry && <span className="form-error">{bankErrors.expiry}</span>}
                      </div>
                      <div>
                        <label htmlFor="card-cvv">CVV2</label>
                        <input
                          id="card-cvv" className="input mono" dir="ltr" inputMode="numeric" placeholder="•••"
                          value={cvv2}
                          onChange={(e) => setCvv2(normalizeDigits(e.target.value).replace(/\D/g, "").slice(0, 4))}
                        />
                        {bankErrors.cvv2 && <span className="form-error">{bankErrors.cvv2}</span>}
                      </div>
                    </div>
                    <div className="field">
                      <label htmlFor="card-otp">رمز پویا</label>
                      <div className="otp-row">
                        <input
                          id="card-otp" className="input mono" dir="ltr" inputMode="numeric" placeholder="رمز دوم"
                          value={otp}
                          onChange={(e) => setOtp(normalizeDigits(e.target.value).replace(/\D/g, "").slice(0, 8))}
                        />
                        <button
                          type="button" className="btn btn-dark btn-sm"
                          onClick={() => { showToast("رمز پویای نمونه: ۴۸۲۹۱۳"); setOtp("482913"); }}
                        >
                          دریافت رمز پویا
                        </button>
                      </div>
                      {bankErrors.otp && <span className="form-error">{bankErrors.otp}</span>}
                    </div>
                  </div>
                </div>
              )}

              <div className="step-nav">
                <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>
                  بازگشت
                </button>
                <button
                  type="button" className="btn btn-primary btn-pay" disabled={!canPay || processing}
                  onClick={() => {
                    if (payMethod === "bank" && !validateBank()) return;
                    const label =
                      payMethod === "crypto"
                        ? `${wallet.coin} (${wallet.network})`
                        : `درگاه ${gateway}`;
                    finish(label, chosenAddress!);
                  }}
                >
                  {processing ? (
                    <><span className="spinner" /> در حال پردازش…</>
                  ) : (
                    <>
                      <IconLock size={16} />
                      پرداخت {formatToman(total)} تومان
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── خلاصه‌ی سفارش ── */}
        <aside className="cart-summary reveal is-visible" aria-label="خلاصه‌ی سفارش">
          <h2>خلاصه‌ی سفارش</h2>
          <div className="mini-items">
            {cart.map(({ product, qty }) => (
              <div className="mini-item" key={product.id}>
                <img src={product.img} alt="" />
                <span className="mini-name">{product.name} <small>× {toFa(qty)}</small></span>
                <span className="mini-price">{formatToman(product.price * qty)}</span>
              </div>
            ))}
          </div>
          <dl className="summary-lines">
            <div><dt>جمع اقلام</dt><dd>{formatToman(cartSubtotal)}</dd></div>
            {discount && (
              <div className="line-green"><dt>تخفیف ({discount.code})</dt><dd>− {formatToman(discountAmount)}</dd></div>
            )}
            <div>
              <dt>ارسال ({shipping.title})</dt>
              <dd>{shippingCost === 0 ? "رایگان" : formatToman(shippingCost)}</dd>
            </div>
            <div className="summary-total">
              <dt>مبلغ نهایی</dt>
              <dd>{formatToman(total)} <small>تومان</small></dd>
            </div>
          </dl>
          <p className="summary-note">
            <IconLock size={13} />
            پرداخت امن؛ اطلاعات کارت شما نزد ما ذخیره نمی‌شود.
          </p>
        </aside>
      </section>
    </>
  );
}
