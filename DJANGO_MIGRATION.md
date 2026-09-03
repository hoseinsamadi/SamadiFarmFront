# 🐍 اتصال صمدی فارم به بک‌اند جنگو (Django)

این سند نقشه‌ی راه تبدیل نسخه‌ی نمایشی فعلی (React + ذخیره‌سازی مرورگر) به یک فروشگاه
واقعی با **Django 5 + Django REST Framework** است. فرانت‌اند همین پروژه بدون بازنویسی،
به‌عنوان کلاینتِ API استفاده می‌شود.

---

## ۱) معماری پیشنهادی

```
┌───────────────────────┐        ┌──────────────────────────────┐
│  React (همین پروژه)    │  REST  │  Django + DRF + SimpleJWT    │
│  dist/ → nginx        │ ─────► │  gunicorn + PostgreSQL       │
└───────────────────────┘        │  + وب‌هوک زرین‌پال / NOWPayments │
                                 └──────────────────────────────┘
```

- فرانت‌اند: خروجی `npm run build` (پوشه‌ی `dist`) توسط nginx سرو می‌شود.
- بک‌اند: APIهای JSON در `/api/v1/...` — جنگو فقط API است (یا در صورت علاقه، کل صفحات با Django Templates + همین CSS رندر شوند؛ فایل `src/styles/site.css` مستقیم قابل استفاده است).

---

## ۲) مدل‌های جنگو

جایگزین مستقیم برای داده‌های `src/lib/storage.ts`:

```python
# shop/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):                      # ← جای storage.users / session
    phone = models.CharField(max_length=15, blank=True)

class Category(models.Model):                  # ← CATEGORIES در site.ts
    slug = models.SlugField(unique=True)       # single | multi | hive | gift
    title = models.CharField(max_length=60)

class Product(models.Model):                   # ← PRODUCTS در site.ts
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=80)
    weight = models.CharField(max_length=30)
    price = models.PositiveBigIntegerField()   # تومان
    image = models.ImageField(upload_to="products/")
    tag = models.CharField(max_length=40, blank=True)
    description = models.TextField()
    stock = models.PositiveIntegerField(default=0)

class Address(models.Model):                   # ← storage.addresses
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    receiver = models.CharField(max_length=60)
    phone = models.CharField(max_length=15)
    province = models.CharField(max_length=40)
    city = models.CharField(max_length=40)
    detail = models.TextField()
    postal = models.CharField(max_length=12, blank=True)
    is_default = models.BooleanField(default=False)

class Order(models.Model):                     # ← storage.orders
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    address_snapshot = models.TextField()
    subtotal = models.PositiveBigIntegerField()
    discount = models.PositiveBigIntegerField(default=0)
    shipping = models.PositiveBigIntegerField(default=0)
    total = models.PositiveBigIntegerField()
    payment_method = models.CharField(max_length=40)   # "USDT (TRC20)" | "درگاه زرین‌پال"
    status = models.CharField(max_length=20, default="در حال پردازش")
    created_at = models.DateTimeField(auto_now_add=True)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    qty = models.PositiveSmallIntegerField()
    price_snapshot = models.PositiveBigIntegerField()

class Payment(models.Model):                   # تراکنش‌ها (کریپتو/بانک)
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    gateway = models.CharField(max_length=30)          # zarinpal | nowpayments
    ref_id = models.CharField(max_length=120, blank=True)
    amount = models.PositiveBigIntegerField()
    verified = models.BooleanField(default=False)
    raw_callback = models.JSONField(null=True)

class Review(models.Model):                    # ← TESTIMONIALS + storage.reviews
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, null=True, on_delete=models.SET_NULL)
    stars = models.PositiveSmallIntegerField()         # 1..5
    text = models.TextField()
    verified_purchase = models.BooleanField(default=False)
    seller_reply = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class HelpfulVote(models.Model):               # ← storage.helpful
    review = models.ForeignKey(Review, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    class Meta:
        unique_together = ("review", "user")
```

---

## ۳) APIها (DRF)

| مسیر | متد | جایگزینِ | توضیح |
|---|---|---|---|
| `/api/v1/auth/register/` | POST | `signup()` | ساخت حساب |
| `/api/v1/auth/token/` | POST | `login()` | دریافت JWT (SimpleJWT) |
| `/api/v1/products/?cat=single&sort=cheap` | GET | `applyProductFilters` | لیست + فیلتر + مرتب‌سازی |
| `/api/v1/cart/` | GET/POST/PATCH | `ShopContext.cart` | سبد خرید سرور-ساید |
| `/api/v1/addresses/` | CRUD | `saveAddress…` | آدرس‌های کاربر |
| `/api/v1/orders/` | POST/GET | `placeOrder` | ثبت و تاریخچه‌ی سفارش |
| `/api/v1/reviews/` + `/reviews/{id}/vote/` | CRUD/POST | ReviewsPage | دیدگاه + رأی «مفید بود» |
| `/api/v1/discounts/apply/` | POST | `applyDiscount` | اعتبارسنجی کد تخفیف سروری |

نکته‌ی مهم: تابع‌های `src/lib/storage.ts` عملاً «سرویس‌لایه»ی فرانت هستند؛ برای مهاجرت،
بدنه‌ی همان تابع‌ها را با `fetch("/api/v1/...")` جایگزین کنید — کامپوننت‌ها دست نمی‌خورند.

---

## ۴) پرداخت

### کارت بانکی (زرین‌پال / آی‌دی‌پی)
1. فرانت فرم فعلی را دارد؛ در نسخه‌ی واقعی، دکمه‌ی پرداخت به `/api/v1/payments/bank/request/` می‌رود.
2. جنگو با کلید Merchant، `request` می‌زند و کاربر را به `https://www.zarinpal.com/pg/StartPay/{authority}` ریدایرکت می‌کند.
3. وب‌هوک `/api/v1/payments/bank/verify/` پس از بازگشت، `verify` را صدا زده و `Payment.verified` را تنظیم می‌کند.

### ارز دیجیتال (NOWPayments یا CoinPayments)
1. `/api/v1/payments/crypto/invoice/` یک Invoice با مبلغ معادلِ تومانی (نرخ لحظه‌ای) می‌سازد؛
   آدرس و QR از API خودِ NOWPayments می‌آید (نه هاردکد — آدرس‌های فعلی `site.ts` نمونه‌اند).
2. وب‌هوک `payment.waiting` ← `confirming` ← `finished` وضعیت سفارش را خودکار تغییر می‌دهد.
3. امضای وب‌هوک (HMAC) حتماً در جنگو بررسی شود.

---

## ۵) سئو در جنگو

| کار در نسخه‌ی فعلی | معادل جنگو |
|---|---|
| کامپوننت `Seo.tsx` (تایتل، متا، JSON-LD) | پکیج `django-meta` یا رندر متاتگ‌ها در تمپلیت |
| `public/sitemap.xml` دستی | `django.contrib.sitemaps` (خروجی پویا برای هر محصول) |
| `public/robots.txt` | پکیج `django-robots` |
| آدرس‌های Hash (`/#/shop`) | در نسخه‌ی جنگو از URLهای واقعی (`/shop/...`) استفاده کنید تا خزنده‌ها صفحه‌ها را ببینند |
| — | اسلایدر `og:image` برای هر محصول + کش صفحه با `django-cache` |

پیشنهاد: اگر سئو اولویت اول است، صفحاتِ فروشگاه و محصول را در جنگو به‌صورت
**SSR (تمپلیت)** رندر کنید و صفحات تعاملی (سبد/پرداخت/اکانت) همان SPA بمانند.

---

## ۶) شروع سریع

```bash
# بک‌اند
python -m venv .venv && source .venv/bin/activate
pip install django djangorestframework djangorestframework-simplejwt \
            django-cors-headers pillow psycopg2-binary
django-admin startproject samadi && cd samadi
python manage.py startapp shop
# models.py بالا را کپی کنید، سپس:
python manage.py makemigrations shop && python manage.py migrate
python manage.py createsuperuser && python manage.py runserver 8000

# فرانت‌اند
npm run build          # خروجی dist/ را nginx به‌همراه /api → gunicorn:8000 سرو می‌کند
```

تنظیم `CORS_ALLOWED_ORIGINS` در settings برای دامنه‌ی فرانت‌اند فراموش نشود.

---

## ۷) جمع‌بندی مهاجرت

- ✅ مدل داده‌ها و جریان‌ها (سبد ← آدرس ← ارسال ← پرداخت ← سفارش) دقیقاً همین‌پیاده‌سازی است؛
  فقط لایه‌ی ذخیره‌سازی از `localStorage` به REST تغییر می‌کند.
- ✅ استایل‌ها (`src/styles/site.css`) و کامپوننت‌ها بدون تغییر کار می‌کنند.
- ⚠️ دو نقطه‌ی حساس امنیتی: نرخ تبدیل ارز و اعتبارسنجی کد تخفیف حتماً باید سروری شوند.
