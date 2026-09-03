/* ──────────── فرم ثبت آدرس (صفحه‌ی اکانت و تسویه‌حساب) ──────────── */
import { useState } from "react";
import type React from "react";
import { normalizeDigits } from "../lib/storage";
import { IconCheck } from "./icons";

export interface AddressFormValues {
  receiver: string;
  phone: string;
  province: string;
  city: string;
  detail: string;
  postal: string;
  isDefault: boolean;
}

const EMPTY: AddressFormValues = {
  receiver: "",
  phone: "",
  province: "",
  city: "",
  detail: "",
  postal: "",
  isDefault: true,
};

interface AddressFormProps {
  onSubmit: (v: AddressFormValues) => void;
  onCancel?: () => void;
}

export default function AddressForm({ onSubmit, onCancel }: AddressFormProps) {
  const [v, setV] = useState<AddressFormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof AddressFormValues, string>>>({});

  const set = (k: keyof AddressFormValues) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setV((p) => ({ ...p, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (v.receiver.trim().length < 3) errs.receiver = "نام گیرنده را کامل بنویسید.";
    if (!/^09\d{9}$/.test(normalizeDigits(v.phone).replace(/\s/g, "")))
      errs.phone = "شماره موبایل باید مثل ۰۹۱۲۳۴۵۶۷۸۹ باشد.";
    if (v.province.trim().length < 2) errs.province = "استان را بنویسید.";
    if (v.city.trim().length < 2) errs.city = "شهر را بنویسید.";
    if (v.detail.trim().length < 10) errs.detail = "آدرس کامل را با جزئیات بنویسید (حداقل ۱۰ حرف).";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    onSubmit({ ...v, phone: normalizeDigits(v.phone).replace(/\s/g, "") });
    setV(EMPTY);
  };

  return (
    <form className="address-form" onSubmit={submit} noValidate>
      <div className="form-row">
        <div>
          <label htmlFor="af-receiver">نام گیرنده</label>
          <input id="af-receiver" className="input" value={v.receiver} onChange={set("receiver")} placeholder="مثلاً مریم صمدی" />
          {errors.receiver && <span className="form-error">{errors.receiver}</span>}
        </div>
        <div>
          <label htmlFor="af-phone">شماره موبایل</label>
          <input id="af-phone" className="input" value={v.phone} onChange={set("phone")} placeholder="۰۹۱۲..." inputMode="tel" />
          {errors.phone && <span className="form-error">{errors.phone}</span>}
        </div>
      </div>
      <div className="form-row">
        <div>
          <label htmlFor="af-province">استان</label>
          <input id="af-province" className="input" value={v.province} onChange={set("province")} placeholder="مثلاً مازندران" />
          {errors.province && <span className="form-error">{errors.province}</span>}
        </div>
        <div>
          <label htmlFor="af-city">شهر</label>
          <input id="af-city" className="input" value={v.city} onChange={set("city")} placeholder="مثلاً آمل" />
          {errors.city && <span className="form-error">{errors.city}</span>}
        </div>
      </div>
      <div className="field">
        <label htmlFor="af-detail">آدرس کامل</label>
        <input id="af-detail" className="input" value={v.detail} onChange={set("detail")} placeholder="خیابان، کوچه، پلاک، واحد…" />
        {errors.detail && <span className="form-error">{errors.detail}</span>}
      </div>
      <div className="form-row">
        <div>
          <label htmlFor="af-postal">کد پستی (اختیاری)</label>
          <input id="af-postal" className="input" value={v.postal} onChange={set("postal")} placeholder="۱۰ رقم" inputMode="numeric" />
        </div>
        <label className="check-line" htmlFor="af-default">
          <input
            id="af-default"
            type="checkbox"
            checked={v.isDefault}
            onChange={(e) => setV((p) => ({ ...p, isDefault: e.target.checked }))}
          />
          <span className="check-box" aria-hidden="true">
            <IconCheck size={13} />
          </span>
          به‌عنوان آدرس پیش‌فرض ذخیره شود
        </label>
      </div>
      <div className="address-form-actions">
        <button type="submit" className="btn btn-primary btn-sm">
          ذخیره‌ی آدرس
        </button>
        {onCancel && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={onCancel}>
            انصراف
          </button>
        )}
      </div>
    </form>
  );
}
