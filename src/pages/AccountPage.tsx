/* ════════════ صفحه‌ی حساب کاربری و آدرس‌ها ════════════
   ورود / ثبت‌نام، پروفایل، مدیریت آدرس‌ها و تاریخچه‌ی سفارش‌ها */
import { useState } from "react";
import type React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";
import AddressForm, { type AddressFormValues } from "../components/AddressForm";
import { useShop } from "../context/ShopContext";
import { formatToman, toFa } from "../hooks/useReveal";
import { normalizeDigits } from "../lib/storage";
import {
  IconCheck, IconLock, IconLogout, IconMapPinPlus, IconPackage, IconPin, IconUser,
} from "../components/icons";

type AuthMode = "login" | "signup";
type PanelTab = "addresses" | "orders";

export default function AccountPage() {
  const {
    user, login, signup, logout,
    addresses, saveAddress, deleteAddress, setDefaultAddress,
    orders, showToast,
  } = useShop();
  const [params] = useSearchParams();
  const next = params.get("next");
  const navigate = useNavigate();

  const [mode, setMode] = useState<AuthMode>(next ? "login" : "signup");
  const [tab, setTab] = useState<PanelTab>("addresses");
  const [addingAddress, setAddingAddress] = useState(false);

  /* فیلدهای فرم ورود/ثبت‌نام */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const myAddresses = user ? addresses.filter((a) => a.owner === user.email) : [];
  const myOrders = user ? orders.filter((o) => o.email === user.email) : [];

  const submitAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const normalizedEmail = normalizeDigits(email).trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setAuthError("ایمیل معتبر نیست.");
      return;
    }
    if (password.length < 6) {
      setAuthError("رمز عبور باید حداقل ۶ حرف باشد.");
      return;
    }
    const err =
      mode === "login"
        ? login(normalizedEmail, password)
        : signup(name, normalizedEmail, phone, password);
    if (err) {
      setAuthError(err);
      return;
    }
    showToast(mode === "login" ? "خوش آمدید؛ وارد شدید" : "حساب شما ساخته شد؛ خوش آمدید");
    if (next) navigate(next);
  };

  /* ──────────── حالت واردنشده: فرم ورود/ثبت‌نام ──────────── */
  if (!user) {
    return (
      <>
        <Seo
          title="حساب کاربری"
          description="ساخت حساب یا ورود به فروشگاه صمدی فارم برای مدیریت آدرس‌ها، سفارش‌ها و پرداخت امن."
        />
        <section className="page-opener">
          <div className="honeycomb pattern-abs" aria-hidden="true" />
          <div className="shell" style={{ position: "relative" }}>
            <nav className="breadcrumb" aria-label="مسیر صفحه">
              <Link to="/">خانه</Link>
              <span aria-hidden="true">/</span>
              <span>حساب کاربری</span>
            </nav>
            <h1 className="page-title">{next ? "برای ادامه‌ی خرید وارد شوید" : "حساب کاربری"}</h1>
            <p className="page-desc">
              {next
                ? "برای ثبت آدرس و پرداخت امن، به حساب خود وارد شوید یا در چند ثانیه حساب بسازید."
                : "با حساب صمدی فارم، آدرس‌ها و سفارش‌هایتان همیشه در دسترس است."}
            </p>
          </div>
        </section>

        <section className="shell auth-wrap" style={{ padding: "3.5rem 1.25rem 5rem" }}>
          <div className="auth-card reveal is-visible">
            <div className="auth-tabs" role="tablist" aria-label="ورود یا ثبت‌نام">
              <button
                type="button"
                role="tab"
                aria-selected={mode === "login"}
                className={`auth-tab${mode === "login" ? " is-active" : ""}`}
                onClick={() => { setMode("login"); setAuthError(""); }}
              >
                ورود
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "signup"}
                className={`auth-tab${mode === "signup" ? " is-active" : ""}`}
                onClick={() => { setMode("signup"); setAuthError(""); }}
              >
                ساخت حساب
              </button>
            </div>

            <form onSubmit={submitAuth} noValidate>
              {mode === "signup" && (
                <div className="field">
                  <label htmlFor="auth-name">نام و نام خانوادگی</label>
                  <input id="auth-name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="مثلاً مریم صمدی" />
                </div>
              )}
              <div className="field">
                <label htmlFor="auth-email">ایمیل</label>
                <input id="auth-email" className="input" dir="ltr" style={{ textAlign: "left" }} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" inputMode="email" />
              </div>
              {mode === "signup" && (
                <div className="field">
                  <label htmlFor="auth-phone">شماره موبایل</label>
                  <input id="auth-phone" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="۰۹۱۲..." inputMode="tel" />
                </div>
              )}
              <div className="field">
                <label htmlFor="auth-pass">رمز عبور</label>
                <input id="auth-pass" className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="حداقل ۶ حرف" />
              </div>

              {authError && <p className="auth-error">{authError}</p>}

              <button type="submit" className="btn btn-primary w-full" style={{ marginTop: "1.4rem" }}>
                <IconLock size={17} />
                {mode === "login" ? "ورود به حساب" : "ساخت حساب"}
              </button>
            </form>

            <p className="auth-foot">
              <IconLock size={14} />
              اطلاعات شما فقط برای پردازش سفارش استفاده می‌شود. در نسخه‌ی نهایی، احراز هویت با
              توکن JWT روی سرور جنگو انجام می‌گیرد.
            </p>
          </div>
        </section>
      </>
    );
  }

  /* ──────────── حالت واردشده: پنل کاربر ──────────── */
  return (
    <>
      <Seo
        title="حساب کاربری"
        description="مدیریت آدرس‌ها، سفارش‌ها و اطلاعات حساب در فروشگاه صمدی فارم."
      />

      <section className="page-opener">
        <div className="honeycomb pattern-abs" aria-hidden="true" />
        <div className="shell" style={{ position: "relative" }}>
          <nav className="breadcrumb" aria-label="مسیر صفحه">
            <Link to="/">خانه</Link>
            <span aria-hidden="true">/</span>
            <span>حساب کاربری</span>
          </nav>
          <div className="opener-flex">
            <div>
              <h1 className="page-title">سلام، {user.name.split(" ")[0]}</h1>
              <p className="page-desc">{user.email}</p>
            </div>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => { logout(); showToast("از حساب خارج شدید"); }}
            >
              <IconLogout size={16} />
              خروج از حساب
            </button>
          </div>
        </div>
      </section>

      <section className="shell" style={{ padding: "2.6rem 1.25rem 4.5rem" }}>
        <div className="panel-tabs" role="tablist" aria-label="بخش‌های حساب">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "addresses"}
            className={`panel-tab${tab === "addresses" ? " is-active" : ""}`}
            onClick={() => setTab("addresses")}
          >
            <IconPin size={16} />
            آدرس‌های من ({toFa(myAddresses.length)})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "orders"}
            className={`panel-tab${tab === "orders" ? " is-active" : ""}`}
            onClick={() => setTab("orders")}
          >
            <IconPackage size={16} />
            سفارش‌های من ({toFa(myOrders.length)})
          </button>
        </div>

        {/* ── آدرس‌ها ── */}
        {tab === "addresses" && (
          <div className="address-panel">
            {myAddresses.length === 0 && !addingAddress && (
              <div className="empty-note reveal is-visible">
                <IconPin size={22} />
                هنوز آدرسی ثبت نکرده‌اید. اولین آدرس را اضافه کنید تا ارسال سریع‌تر شود.
              </div>
            )}

            <div className="address-cards">
              {myAddresses.map((a) => (
                <div className={`address-card${a.isDefault ? " is-default" : ""}`} key={a.id}>
                  {a.isDefault && (
                    <span className="default-chip">
                      <IconCheck size={12} />
                      پیش‌فرض
                    </span>
                  )}
                  <h3>
                    <IconUser size={16} />
                    {a.receiver}
                  </h3>
                  <p className="address-line">
                    <IconPin size={14} />
                    {a.province}، {a.city}، {a.detail}
                  </p>
                  <p className="address-sub">
                    <span dir="ltr">{toFa(a.phone)}</span>
                    {a.postal && <span>• کد پستی: {toFa(a.postal)}</span>}
                  </p>
                  <div className="address-actions">
                    {!a.isDefault && (
                      <button type="button" className="chip-btn" onClick={() => setDefaultAddress(a.id)}>
                        پیش‌فرض شود
                      </button>
                    )}
                    <button
                      type="button"
                      className="chip-btn chip-btn--danger"
                      onClick={() => { deleteAddress(a.id); showToast("آدرس حذف شد"); }}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))}

              {!addingAddress && (
                <button type="button" className="address-card address-add" onClick={() => setAddingAddress(true)}>
                  <IconMapPinPlus size={26} />
                  <span>افزودن آدرس جدید</span>
                </button>
              )}
            </div>

            {addingAddress && (
              <div className="address-form-card reveal is-visible">
                <h3>آدرس جدید</h3>
                <AddressForm
                  onSubmit={(v: AddressFormValues) => {
                    saveAddress(v);
                    setAddingAddress(false);
                    showToast("آدرس ذخیره شد");
                  }}
                  onCancel={() => setAddingAddress(false)}
                />
              </div>
            )}
          </div>
        )}

        {/* ── سفارش‌ها ── */}
        {tab === "orders" && (
          <div className="orders-panel">
            {myOrders.length === 0 ? (
              <div className="empty-note reveal is-visible">
                <IconPackage size={22} />
                هنوز سفارشی ثبت نکرده‌اید.
                <Link to="/shop" style={{ fontWeight: 800, color: "var(--orange)" }}>
                  از فروشگاه دیدن کنید
                </Link>
              </div>
            ) : (
              myOrders.map((o) => (
                <div className="order-card reveal is-visible" key={o.id}>
                  <div className="order-card-head">
                    <div>
                      <strong className="order-id">{o.id}</strong>
                      <span className="order-date">{o.date}</span>
                    </div>
                    <span className="status-chip">{o.status}</span>
                  </div>
                  <div className="order-items">
                    {o.items.map((it) => (
                      <span className="order-item" key={it.id}>
                        <img src={it.img} alt="" />
                        {it.name} × {toFa(it.qty)}
                      </span>
                    ))}
                  </div>
                  <div className="order-card-foot">
                    <span>
                      پرداخت: <strong>{o.payment}</strong>
                    </span>
                    <span>
                      ارسال به: <strong>{o.address}</strong>
                    </span>
                    <span className="order-total">
                      {formatToman(o.total)} تومان
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </>
  );
}
