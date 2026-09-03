/* ──────────── بخش سفارش — فرم با اعتبارسنجی + کارت تماس ──────────── */
import { useState } from "react";
import type React from "react";
import { CONTACT, PRODUCTS } from "../data/site";
import {
  IconCheck,
  IconClock,
  IconInstagram,
  IconPhone,
  IconPin,
  IconSend,
  IconWhatsApp,
} from "./icons";

interface FormState {
  name: string;
  phone: string;
  product: string;
  note: string;
}

const EMPTY: FormState = { name: "", phone: "", product: "", note: "" };

/** تبدیل ارقام فارسی/عربی به لاتین برای اعتبارسنجی */
function normalizeDigits(s: string): string {
  return s
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/[\s-]/g, "");
}

export default function OrderSection() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: typeof errors = {};
    if (form.name.trim().length < 3) er.name = "نام و نام خانوادگی را کامل بنویسید.";
    const phone = normalizeDigits(form.phone);
    if (!/^0\d{9,10}$/.test(phone)) er.phone = "شماره‌ی موبایل معتبر نیست. (مثل ۰۹۱۲...)";
    setErrors(er);
    if (Object.keys(er).length === 0) setSent(true);
  };

  return (
    <section id="order" className="shell" style={{ paddingTop: "4.5rem" }}>
      <div className="cats-head reveal">
        <div>
          <span className="eyebrow">سفارش مستقیم</span>
          <h2 className="section-title">از کندو تا درِ خانه</h2>
        </div>
        <p>
          فرم را پر کنید؛ همان روز برای هماهنگی ارسال با شما تماس می‌گیریم. یا اگر راحت‌ترید،
          مستقیم در واتساپ پیام بدهید.
        </p>
      </div>

      <div className="order-grid">
        {/* فرم سفارش */}
       {/* <div className="order-form-card reveal">
          {sent ? (
            <div className="form-success">
              <span className="ring">
                <IconCheck size={34} />
              </span>
              <h3>سفارش شما ثبت شد</h3>
              <p>
                ممنون {form.name.trim()} عزیز! نهایتاً تا چند ساعت آینده با شماره‌ی{" "}
                <b>{form.phone}</b> تماس می‌گیریم تا ارسال را هماهنگ کنیم.
              </p>
              <button
                type="button"
                className="btn btn-ghost mt-6"
                onClick={() => {
                  setForm(EMPTY);
                  setSent(false);
                }}
              >
                ثبت سفارش دیگر
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="f-name">
                    نام و نام خانوادگی <i>*</i>
                  </label>
                  <input
                    id="f-name"
                    className={errors.name ? "err" : ""}
                    value={form.name}
                    onChange={set("name")}
                    placeholder="مثلاً: صمد محمدی"
                  />
                  <p className="field-msg">{errors.name ?? ""}</p>
                </div>
                <div className="field">
                  <label htmlFor="f-phone">
                    شماره‌ی تماس <i>*</i>
                  </label>
                  <input
                    id="f-phone"
                    inputMode="tel"
                    dir="ltr"
                    className={errors.phone ? "err" : ""}
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="0912 345 6789"
                    style={{ textAlign: "end" }}
                  />
                  <p className="field-msg">{errors.phone ?? ""}</p>
                </div>
              </div>

              <div className="field">
                <label htmlFor="f-product">محصول مورد نظر</label>
                <select id="f-product" value={form.product} onChange={set("product")}>
                  <option value="">هنوز انتخاب نکرده‌ام</option>
                  {PRODUCTS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} — {p.weight}
                    </option>
                  ))}
                  <option value="gift">بسته‌ی هدیه‌ی صمدی</option>
                </select>
                <p className="field-msg" />
              </div>

              <div className="field">
                <label htmlFor="f-note">توضیحات (اختیاری)</label>
                <textarea
                  id="f-note"
                  value={form.note}
                  onChange={set("note")}
                  placeholder="مثلاً: تعداد شیشه، آدرس شهر، زمان تحویل مناسب…"
                />
              </div>

              <button type="submit" className="btn btn-primary w-full justify-center">
                <IconSend size={18} />
                ثبت درخواست سفارش
              </button>
            </form>
          )}
        </div>  */}

        {/* کارت تماس */}
        <aside className="contact-card reveal w-288" style={{ "--d": "0.12s" } as React.CSSProperties}>
          <h3>گفتگوی مستقیم با زنبوردار</h3>
          <p>
            سؤال درباره‌ی برداشت فصل، آزمایش عسل یا سفارش عمده؟ هر روز پاسخگو هستیم — خودِ
            زنبوردار، نه اپراتور.
          </p>

          <div className="contact-row">
            <IconPhone size={19} />
            <a href={CONTACT.phoneHref} dir="ltr">
              {CONTACT.phone}
            </a>
          </div>
          <div className="contact-row">
            <IconInstagram size={19} />
            <a href={CONTACT.YOUTUBEHref} target="_blank" rel="noreferrer" dir="ltr">
              @{CONTACT.YOUTUBE}
            </a>
          </div>
          <div className="contact-row">
            <IconPin size={19} />
            <span>{CONTACT.address}</span>
          </div>
          <div className="contact-row">
            <IconClock size={19} />
            <span>{CONTACT.hours}</span>
          </div>

          <div className="contact-actions">
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-wa"
            >
              <IconWhatsApp size={19} />
              پیام در واتساپ
            </a>
            <a href={CONTACT.phoneHref} className="btn btn-cream">
              <IconPhone size={18} />
              تماس تلفنی
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
