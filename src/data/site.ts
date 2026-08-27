/* ════════════════════════════════════════════════════════════
   صمدی فارم — داده‌های محتوایی سایت
   تمام متن‌ها، محصولات، دیدگاه‌ها و اطلاعات تماس این‌جا
   نگهداری می‌شود تا ساختار (HTML/JSX) از محتوا جدا بماند.
   ════════════════════════════════════════════════════════════ */

export interface Product {
  id: string;
  name: string;
  cat: CategoryId;
  weight: string;
  price: number; // تومان
  tag?: string;
  tagTone?: "honey" | "olive" | "ember";
  desc: string;
  img: string;
}

export type CategoryId = "single" | "multi" | "hive";

export const BRAND = {
  name: "صمدی فارم",
  tagline: "محصولات طبیعی زنبور عسل",
  since: "از ۱۳۵۸",
};

export const NAV_LINKS = [
  { id: "home", label: "خانه" },
  { id: "products", label: "محصولات" },
  { id: "story", label: "داستان ما" },
  { id: "reviews", label: "دیدگاه‌ها" },
  { id: "order", label: "سفارش" },
] as const;

export const HERO = {
  eyebrow: "زنبورستان خانوادگی — سه نسل",
  titleLines: ["عسلِ خامِ کوهستان،", "مستقیم از ", "تا سفره‌ی شما"],
  highlightWord: "کندو",
  desc: "در صمدی فارم، عسل را همان‌طور که زنبور ساخته برداشت می‌کنیم: خام، بدون حرارت و بدون هیچ افزودنی. از دامنه‌های دماوند و سبلان، با بسته‌بندی درب‌موم، مستقیم به خانه‌ی شما.",
  ctaPrimary: "دیدن محصولات",
  ctaSecondary: "داستان سه نسل",
  captionTitle: "برداشت پاییز ۱۴۰۴",
  captionCopy: "عسل چهل‌گیاه — فقط ۳۲۰ کیلوگرم",
  img: "https://image.qwenlm.ai/generated-images/3167af2a-7ee1-4017-8c28-c2ce99037abb/_result.png",
  imgAlt: "زنبوردار صمدی فارم در حال برداشت قاب عسل در زنبورستان",
  badges: [
    { icon: "drop" as const, text: "۱۰۰٪ خام" },
    { icon: "flask" as const, text: "آزمایشگاه‌شده" },
    { icon: "sun" as const, text: "برداشت ۱۴۰۴" },
  ],
  mini: {
    avatars: ["م", "ر", "س"],
    text: "بیش از <b>۲٬۵۰۰ خانواده</b> در سراسر ایران، عسل‌شان را از کندوهای ما می‌خرند.",
  },
};

export const TICKER_ITEMS = [
  "عسل ۱۰۰٪ خام",
  "بدون شکر افزودنی",
  "برداشت پاییز ۱۴۰۴",
  "برگه‌ی آزمایش همراه هر شیشه",
  "ارسال به سراسر ایران",
  "ضمانت بازگشت وجه",
  "کندوهای بومی دماوند و سبلان",
];

export const BENEFITS = [
  {
    icon: "truck" as const,
    title: "ارسال ۴۸ ساعته",
    desc: "به سراسر کشور با بسته‌بندی ضدشکست و درب‌موم.",
  },
  {
    icon: "shield" as const,
    title: "ضمانت اصالت",
    desc: "برگه‌ی آزمایش ساکارز و رطوبت همراه هر شیشه.",
  },
  {
    icon: "drop" as const,
    title: "خام و زنده",
    desc: "بدون پاستوریزاسیون؛ آنزیم‌ها و گرده‌ها دست‌نخورده.",
  },
  {
    icon: "hive" as const,
    title: "از خودِ زنبوردار",
    desc: "بدون واسطه؛ مستقیم از کندوهای خانوادگی صمدی.",
  },
];

export const CATEGORIES = [
  {
    id: "single" as CategoryId,
    icon: "flower" as const,
    title: "عسل‌های تک‌گل",
    desc: "طعمِ خالصِ یک گیاه؛ از آویشنِ دماوند تا گونِ سبلان.",
  },
  {
    id: "multi" as CategoryId,
    icon: "meadow" as const,
    title: "عسل‌های چندگیاه",
    desc: "برداشت بهار و تابستان از مراتع پرگلِ کوهستان.",
  },
  {
    id: "hive" as CategoryId,
    icon: "cells" as const,
    title: "فرآورده‌های کندو",
    desc: "موم، بره‌موم و گرده؛ گنجینه‌های جانبی کندو.",
  },
  {
    id: "gift" as const,
    icon: "gift" as const,
    title: "بسته‌ی هدیه",
    desc: "ترکیب دلخواه شما در جعبه‌ی چوبی صمدی؛ مناسب هدیه.",
    scrollTo: "order",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "عسل چهل‌گیاه کوهستان",
    cat: "multi",
    weight: "۹۵۰ گرم",
    price: 480000,
    tag: "پرفروش‌ترین",
    tagTone: "honey",
    desc: "برداشت تابستان از مراتع چهل‌گل؛ عطر ملایم و شیرینی متعادل برای مصرف روزانه‌ی خانواده.",
    img: "https://image.qwenlm.ai/generated-images/e6c3f5ca-0c50-4fb3-ba2a-8360b731ac3a/_result.png",
  },
  {
    id: "p2",
    name: "عسل آویشن دماوند",
    cat: "single",
    weight: "۹۵۰ گرم",
    price: 560000,
    tag: "تک‌گل کمیاب",
    tagTone: "ember",
    desc: "عطر تند و گرمِ آویشن کوهی؛ همراه سنتی دمنوش‌های زمستانی و تسکین گلودرد.",
    img: "https://image.qwenlm.ai/generated-images/4d9944ff-6f97-40a9-8147-10e3379609c6/_result.png",
  },
  {
    id: "p3",
    name: "عسل گون سبلان",
    cat: "single",
    weight: "۹۵۰ گرم",
    price: 520000,
    tag: "برداشت جدید",
    tagTone: "olive",
    desc: "شفاف و روشن با ته‌مزه‌ی ملایم گلابی؛ محبوب بچه‌ها و مناسب صبحانه.",
    img: "https://image.qwenlm.ai/generated-images/17f20ccd-e2b6-44a8-9a71-4d7f10c3a88a/_result.png",
  },
  {
    id: "p4",
    name: "شان‌موم طبیعی",
    cat: "hive",
    weight: "۵۰۰ گرم",
    price: 620000,
    tag: "تعداد محدود",
    tagTone: "ember",
    desc: "برش مستقیم از قاب کندو؛ تجربه‌ی اصیل خوردن عسل همراه با مومِ تازه.",
    img: "https://image.qwenlm.ai/generated-images/8026c46a-c307-4be4-b9be-0f3b58460805/_result.png",
  },
  {
    id: "p5",
    name: "عصاره‌ی بره‌موم",
    cat: "hive",
    weight: "۳۰ میلی‌لیتر",
    price: 390000,
    tag: "ارگانیک",
    tagTone: "olive",
    desc: "آنتی‌بیوتیک طبیعی کندو؛ چند قطره زیر زبان یا در آب ولرم، همراه هر صبح.",
    img: "https://image.qwenlm.ai/generated-images/05a4e692-8c36-4ea1-ab49-a20be5f63e35/_result.png",
  },
  {
    id: "p6",
    name: "گرده‌ی گل خشک",
    cat: "hive",
    weight: "۲۵۰ گرم",
    price: 340000,
    tag: "سوپرفود",
    tagTone: "honey",
    desc: "دانه‌های طلایی سرشار از پروتئین؛ روزی یک قاشق با ماست، شیر یا سالاد.",
    img: "https://image.qwenlm.ai/generated-images/812fc844-913e-4da0-98fd-551ff63b9fb2/_result.png",
  },
];

export const STORY = {
  eyebrow: "داستان ما",
  title: "سه نسل، یک زنبورستان",
  copy: "حاج صمد کار را در سال ۱۳۵۸ با چهار کندوی چوبی در دامنه‌ی دماوند شروع کرد. امروز نوه‌هایش همان کندوها را با همان وسواس نگه می‌دارند؛ فقط تعدادشان به صد و چهل رسیده است. ما عسل را نمی‌خریم و بسته‌بندی نمی‌کنیم؛ فقط محصولِ کندوهای خودمان را، همان روزِ برداشت، درب‌موم می‌کنیم.",
  quote: "«زنبور، عسل را برای خودش می‌سازد؛ ما فقط مهمانِ سفره‌ی او هستیم.»",
  quoteBy: "حاج صمد، بنیان‌گذار",
  since: "تأسیس ۱۳۵۸",
  img: "https://image.qwenlm.ai/generated-images/d19261e3-a521-412d-99a0-7a2782029fe9/_result.png",
  imgAlt: "کندوهای چوبی صمدی فارم در مرتع کوهستانی هنگام غروب",
  cta: "چشم‌انداز محصولات",
};

export const STATS = [
  { value: 3, suffix: "", label: "نسل زنبوردار" },
  { value: 140, suffix: "+", label: "کندوی فعال" },
  { value: 46, suffix: "", label: "سال سابقه" },
  { value: 2500, suffix: "+", label: "مشتری ثابت" },
];

export const TESTIMONIALS = [
  {
    name: "مریم احمدی",
    city: "تهران",
    stars: 5,
    text: "سه سال است عسل چهل‌گیاه صمدی را می‌خرم؛ مزه‌اش با هیچ عسل سوپرمارکتی قابل مقایسه نیست. عطرش که در خانه می‌پیچد، انگار وسط مراتع ایستاده‌ای.",
    tone: "#e8c98a",
  },
  {
    name: "رضا کریمی",
    city: "اصفهان",
    stars: 5,
    text: "برگه‌ی آزمایش کنار شیشه بود! این‌همه شفافیت را جای دیگری ندیده‌ام. ساکارز زیر ۳ درصد؛ درست همان‌طور که قول داده بودند.",
    tone: "#cdd9b4",
  },
  {
    name: "سارا موسوی",
    city: "شیراز",
    stars: 5,
    text: "بسته‌بندی محکم، ارسال سریع، و بره‌مومی که واقعاً تازه بود. برای بچه‌هایم هم گرده گرفتیم و همه‌مان راضی‌ایم.",
    tone: "#efd9a8",
  },
  {
    name: "امیر قاسمی",
    city: "تبریز",
    stars: 4,
    text: "شان‌مومشان را که چشیدم یاد عسل‌های بچگی‌ام افتادم؛ همان مومِ نرم و عسلِ آفتاب‌دیده. فقط کاش موجودی‌اش زود تمام نشود!",
    tone: "#d8b98a",
  },
];

export const CONTACT = {
  phone: "۰۹۱۲ ۴۵۶ ۷۸۹۰",
  phoneHref: "tel:+989124567890",
  whatsapp: "989124567890",
  instagram: "samadi.farm",
  instagramHref: "https://instagram.com/samadi.farm",
  address: "مازندران، آمل، جاده‌ی هراز، کیلومتر ۱۸، زنبورستان صمدی فارم",
  hours: "هر روز، ۹ صبح تا ۹ شب",
};

export const FOOTER_YEAR = "۱۴۰۴";
