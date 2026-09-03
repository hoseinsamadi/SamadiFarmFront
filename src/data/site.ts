/* ════════════════════════════════════════════════════════════
   صمدی فارم — داده‌های محتوایی سایت
   تمام متن‌ها، محصولات، ویدیوها و دیدگاه‌ها در این فایل
   نگهداری می‌شوند تا تغییر محتوا نیازی به دست‌زدن به
   ساختار صفحه (HTML) یا استایل (CSS) نداشته باشد.
   ════════════════════════════════════════════════════════════ */

export const BRAND = {
  name: "صمدی فارم",
  tagline: "زنبورستان خانوادگی از ۱۳۸۵",
};

export const NAV_LINKS = [
  { id: "home", label: "خانه" },
  { id: "products", label: "محصولات" },
  { id: "story", label: "داستان ما" },
  { id: "reviews", label: "دیدگاه‌ها" },
] as const;

export type NavId = (typeof NAV_LINKS)[number]["id"];

export const HERO = {
  eyebrow: "زنبورستان خانوادگی صمدی — از ۱۳۸۵",
  titleLines: ["طعمِ واقعی عسل،", "مستقیم از", "کندو تا سفره"],
  highlightWord: "کندو",
  desc: "عسل‌های تک‌گل و چندگیاه، شهد موم، ژل رویال و بره‌موم؛ همه‌ی فرآورده‌های کندو با برداشت محدود و درب‌مومِ همان روز، بی‌هیچ واسطه‌ای از دشت قزوین کوه‌های الموت و طارم به خانه‌ی شما می‌رسد.",
  ctaPrimary: "خرید از برداشت تازه",
  ctaSecondary: "داستان دو نسل ما",
  img: "../mainBiBak.png",
  imgAlt: "کندوهای چوبی صمدی فارم میان دشت گل‌های وحشی",
  captionTitle: "برداشت تازه‌ی تابستان ۱۴۰۵",
  captionCopy: "موجودی محدود — هر شیشه شماره‌ی کندو دارد",
  badges: [
    { icon: "drop", text: "عسل ۱۰۰٪ خام" },
    { icon: "flask", text: "ساکارز زیر ۳٪" },
    { icon: "sun", text: "برداشت ۱۴۰۴" },
  ] as const,
  mini: {
    avatars: ["م", "س", "ر"],
    text: "بیش از ۲٬۵۰۰ خانواده، عسل‌شان را از کندوهای ما می‌خرند.",
  },
};

export const TICKER_ITEMS = [
  "عسل صددرصد خام و درب‌موم",
  "ارسال رایگان بالای ده میلیون تومان",
  "ضمانت بازگشت وجه تا ۷ روز",
  "برگه‌ی آزمایش هر شیشه",
  "کوچ فصلی کندوها؛ سه ییلاق",
  "بسته‌بندی هدیه‌ی رایگان",
];

export const BENEFITS = [
  {
    icon: "truck",
    title: "ارسال سریع و مطمئن",
    desc: "بسته‌بندی ضربه‌گیر و ارسال به سراسر کشور ظرف ۲۴ تا ۷۲ ساعت.",
  },
  {
    icon: "shield",
    title: "ضمانت اصالت",
    desc: "هر شیشه شماره‌ی کندو و برگه‌ی آزمایش ساکارز و رطوبت دارد.",
  },
  {
    icon: "drop",
    title: "خام و حرارت‌ندیده",
    desc: "عسل ما نه فیلتر صنعتی می‌بیند نه حرارت؛ دقیقاً همان چیزی که زنبور ساخته.",
  },
  {
    icon: "hive",
    title: "خرید مستقیم از زنبوردار",
    desc: "بدون واسطه و دلال؛ قیمتِ منصفانه برای شما، درآمدِ عادلانه برای کندو.",
  },
] as const;

export type CategoryId = "single" | "multi" | "hive";

export interface Category {
  id: string;
  icon: "flower" | "meadow" | "cells" | "gift";
  title: string;
  desc: string;
  scrollTo?: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "single",
    icon: "flower",
    title: "عسل‌های تک‌گل",
    desc: "آویشن، گون و کنار؛ هرکدام با عطر و طعم یک مزرعه‌ی مشخص.",
  },
  {
    id: "multi",
    icon: "meadow",
    title: "عسل‌های چندگیاه",
    desc: "ترکیب شهد گل‌های وحشی ییلاق؛ طعمِ خودِ کوهستان.",
  },
  {
    id: "hive",
    icon: "cells",
    title: "فرآورده‌های کندو",
    desc: "شهد موم، ژل رویال، بره‌موم و گرده‌ی گل؛ قدرت کامل کندو.",
  },
  {
    id: "gift",
    icon: "gift",
    title: "ابزار آلات زنبورداری",
    desc: "ابزار و تجهیزات حرفه‌ای زنبورداری برای نگهداری و برداشت عسل.",
    scrollTo: "order",
  },
];

export interface Product {
  id: string;
  cat: CategoryId;
  name: string;
  weight: string;
  price: number;
  desc: string;
  img: string;
  tag?: string;
  tagTone?: "honey" | "olive" | "ember";
}

export const PRODUCTS: Product[] = [
  {
    id: "p-thyme",
    cat: "single",
    name: "عسل آویشن دماوند",
    weight: "۹۰۰ گرم",
    price: 685000,
    desc: "تند و معطر؛ برداشت تیرماه از مراتع آویشن‌زار بالای روستای دشتک.",
    img: "https://image.qwenlm.ai/generated-images/4d9944ff-6f97-40a9-8147-10e3379609c6/_result.png",
    tag: "پرفروش‌ترین",
    tagTone: "ember",
  },
  {
    id: "p-wild",
    cat: "multi",
    name: "عسل چندگیاه ییلاقی",
    weight: "۹۰۰ گرم",
    price: 545000,
    desc: "شهد گل‌های وحشی دشت لار؛ روشن، ملایم و همه‌پسند برای صبحانه.",
    img: "https://image.qwenlm.ai/generated-images/17f20ccd-e2b6-44a8-9a71-4d7f10c3a88a/_result.png",
    tag: "برداشت ۱۴۰۴",
    tagTone: "honey",
  },
  {
    id: "p-comb",
    cat: "hive",
    name: "شهد با موم طبیعی",
    weight: "۷۵۰ گرم",
    price: 790000,
    desc: "مومِ بافته‌شده با شهدِ تازه؛ نزدیک‌ترین تجربه به چشیدن عسل از کندو.",
    img: "https://image.qwenlm.ai/generated-images/8026c46a-c307-4be4-b9be-0f3b58460805/_result.png",
    tag: "محدود",
    tagTone: "olive",
  },
  {
    id: "p-gon",
    cat: "single",
    name: "عسل گون سبلان",
    weight: "۹۰۰ گرم",
    price: 615000,
    desc: "شیره‌ی روشن و کش‌دار گون‌های دامنه‌ی سبلان؛ شیرینیِ لطیف و ماندگار.",
    img: "https://image.qwenlm.ai/generated-images/e6c3f5ca-0c50-4fb3-ba2a-8360b731ac3a/_result.png",
  },
  {
    id: "p-propolis",
    cat: "hive",
    name: "عصاره‌ی بره‌موم",
    weight: "۳۰ میلی‌لیتر",
    price: 425000,
    desc: "قطره‌ی تقویت طبیعی کندو؛ خالص، بدون الکل و افزودنی.",
    img: "https://image.qwenlm.ai/generated-images/05a4e692-8c36-4ea1-ab49-a20be5f63e35/_result.png",
    tag: "ارگانیک",
    tagTone: "olive",
  },
  {
    id: "p-pollen",
    cat: "hive",
    name: "گرده‌ی گل تازه",
    weight: "۲۵۰ گرم",
    price: 365000,
    desc: "دانه‌های طلایی گرده با پروتئین گیاهی؛ مکمل روزانه‌ی صبحانه.",
    img: "https://image.qwenlm.ai/generated-images/812fc844-913e-4da0-98fd-551ff63b9fb2/_result.png",
  },
];

export const STORY = {
  eyebrow: "داستان ما",
  title: "دو نسل، یک وسواس: عسلِ واقعی",
  copy: "صمدی فارم یک برند نیست؛ یک خانواده است. از دو کندوی چوبی پدربزرگ در سال ۱۳۸۵ تا ۱۴۰ کندوی امروز در سه ییلاق، راهِ عسل برای ما عوض نشده است: صبر، کوچ با فصل‌ها و دست‌نزدن به خلوص.",
  img: "https://image.qwenlm.ai/generated-images/d19261e3-a521-412d-99a0-7a2782029fe9/_result.png",
  imgAlt: "زنبوردار صمدی فارم کنار کندوها در غروب",
  since: "از ۱۳۸۵",
  quote: "«عسلِ خوب خودش را لو می‌دهد؛ چه در شیشه، چه در خاطر مشتری.»",
  quoteBy: "حاج قاسم صمدی، بنیان‌گذار",
  cta: "دیدن برداشت تازه",
};

/* ── متن بلند داستان (صفحه‌ی «داستان ما») ── */
export const STORY_LONG = [
  "همه‌چیز از دو کندوی چوبی شروع شد که حاج قاسم صمدی با دست خودش ساخت و پشت خانه گذاشت. عسلِ آن سال‌ها را با اسب به بازار دماوند می‌برد و با همان دست‌های پینه‌بسته، شیشه‌ها را به مشتری می‌داد. مشتری‌هایی که هنوز هم اسم‌شان را حفظیم.",
  "نسل دوم، راهِ کوچ با فصل‌ها را جدی گرفت: بهار در دامنه‌های سبز دماوند، تابستان در مراتع آویشن و گونِ سبلان، و پاییز برای برداشت. ما یاد گرفتیم که عسلِ خوب را نمی‌شود ساخت؛ فقط می‌شود دنبالش رفت.",
  "امروز نسل سوم پشت کندوهاست — با همان وسواس قدیمی و یک دوربین. از وقتی کانال یوتیوب راه افتاد، همه‌چیز جلوی چشم شماست: کوچ، گل‌دهی، قاب‌کشی و لحظه‌ی برداشت. اگر عسلی را روی صفحه دیدید، همان است که به دست‌تان می‌رسد.",
];

/* ── خط زمانی ── */
export const TIMELINE = [
  {
    year: "۱۳۸۵",
    title: "دو کندوی چوبی پدر",
    desc: "حاج علی صمدی اولین کندوها را در دشت قزوین داشت .",
  },
  {
    year: "۱۳۸۸",
    title: "نسل اول  کندوها",
    desc: "خسین صمدی زنبورستان را بزرگ‌تر کرد وشرکت دانش بینان رو راه اندازی کرد و دستگاه زهر زنبور عسل ساخت.",
  },
  {
    year: "۱۳۹۸",
    title: "عسل‌های تک‌ گل الموت و طارم",
    desc: "با افزودن مراتع الموت و طارم آویشن و گون به خانواده‌ی محصولات اضافه شدند.",
  },
  {
    year: "۱۴۰۱",
    title: "دوربین وارد کندوستان شد",
    desc: "کانال یوتیوب راه افتاد؛ از بهار تا برداشت، همه‌چیز جلوی دوربین ثبت می‌شود.",
  },
  {
    year: "امروز",
    title: " الان نیز با پیشرفت در زنبورداری و کندو زنبور عسل",
    desc: "ژنبورداری به جایی رسیده که محصولات زنبور عسل و همچین ابزارآلات و آموزش در صنعت زنبورداری انجام میدیم ",
  },
];

export const STATS = [
  { value: 71, suffix: "سال", label: "زنبورداری خانوادگی" },
  { value: 140, suffix: "", label: "کندوی فعال در سه ییلاق" },
  { value: 3200, suffix: "", label: "کیلوگرم عسل در سال" },
  { value: 2500, suffix: "+", label: "مشتری همیشگی" },
];

/* ── کانال یوتیوب — لینک کانال خود را اینجا جایگزین کنید ── */
export const YOUTUBE = {
  channelUrl: "https://www.youtube.com/@HoseinBeekeeper",
  channelLabel: "صمدی فارم در یوتیوب",
};

export interface VideoItem {
  videoId: string;
  title: string;
  duration: string;
  meta: string;
}

/* ویدیوی اصلی که در صفحه‌ی داستان Embed می‌شود */
export const FEATURED_VIDEO: VideoItem = {
  videoId: "OUsCdTlBNn4",
  title: "روش صحیح برداشت عسل طبیعی از کندو",
  duration: "۱۴:۲۰",
  meta: "آموزش زنبورداری • فصل برداشت",
};

/* ویدیوهای یوتیوب درباره‌ی برداشت عسل — آیدی‌ها را با ویدیوهای کانال خود عوض کنید */
export const VIDEOS: VideoItem[] = [
  {
    videoId: "z6DusH8NDFo",
    title: "برداشت عسل از دل کوهستان؛ از کندو تا صاف‌کردن",
    duration: "۱۱:۰۵",
    meta: "مستند کندوگردی",
  },
  {
    videoId: "gGICW3beiQg",
    title: "برداشت عسل طبیعی در کوه‌های بکر بلوچستان",
    duration: "۰۸:۴۷",
    meta: "کندوگردی",
  },
  {
    videoId: "4O1IQkhVPAI",
    title: "مراحل کامل استخراج عسل؛ از قاب تا شیشه",
    duration: "۱۶:۳۲",
    meta: "آموزش استخراج",
  },
  {
    videoId: "4ZNDjGyFbcM",
    title: "زنبورداری ۱۰۱؛ برداشت عسل قدم‌به‌قدم",
    duration: "۱۲:۵۸",
    meta: "آموزش مقدماتی",
  },
];

export interface Testimonial {
  name: string;
  city: string;
  stars: number;
  text: string;
  tone: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "مریم احمدی",
    city: "تهران",
    stars: 5,
    text: "عسل آویشن را که باز کردم، عطرش کل آشپزخانه را گرفت. واقعاً با عسل‌های بازاری زمین تا آسمان فرق دارد؛ شکرک‌زدنش هم طبیعی و ریز بود.",
    tone: "linear-gradient(135deg,#d89521,#b85d16)",
  },
  {
    name: "سعید رضایی",
    city: "اصفهان",
    stars: 5,
    text: "برگه‌ی آزمایش داخل بسته بود؛ همین برای اعتمادم کافی بود. ارسال هم سریع‌تر از چیزی بود که فکر می‌کردم. شهد مومش معرکه است.",
    tone: "linear-gradient(135deg,#52613c,#243225)",
  },
  {
    name: "زهرا موسوی",
    city: "تبریز",
    stars: 4,
    text: "بسته‌ی هدیه را برای مادرم گرفتم و عاشقش شد. فقط کاش عسل گون زودتر از این‌ها موجود می‌شد؛ دو هفته منتظر ماندیم.",
    tone: "linear-gradient(135deg,#b85d16,#d89521)",
  },
  {
    name: "امیر کاظمی",
    city: "مشهد",
    stars: 5,
    text: "سال‌هاست از زنبوردارهای مختلف خرید می‌کنم، اما کش‌آمدن و عطر عسل گونِ صمدی چیز دیگری است. حالا مشتری ثابت شده‌ام.",
    tone: "linear-gradient(135deg,#243225,#52613c)",
  },
  {
    name: "محمد تقوی",
    city: "مشهد",
    stars: 5,
    text: "شهد مومش را که باز کردیم، بوی کل کندو بلند شد؛ همان عطر دوران بچگی‌ام در روستا. مادرم باور نکرد بسته‌بندی این‌قدر تمیز باشد.",
    tone: "linear-gradient(135deg,#d89521,#8a5a12)",
  },
  {
    name: "نرگس موسوی",
    city: "شیراز",
    stars: 5,
    text: "بسته‌ی هدیه را برای خواهرم فرستادم؛ آن‌قدر خوش‌دست و شیک بود که فکر کرد از خارج آمده. دمنوش آویشنش هم عالی است.",
    tone: "linear-gradient(135deg,#52613c,#243225)",
  },
];

/* ── خلاصه‌ی امتیاز صفحه‌ی دیدگاه‌ها ── */
export const RATING_SUMMARY = { avg: "۴٫۹", total: 312 };

export const RATING_DIST = [
  { stars: 5, pct: 82 },
  { stars: 4, pct: 12 },
  { stars: 3, pct: 4 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
];

export const CONTACT = {
  phone: "۰۹۳۸۲۸۶۶۴۰۸",
  phoneHref: "tel:+989382866408",
  whatsapp: "989382866408",
  YOUTUBE: "samadi.farm",
  YOUTUBEHref: "https://youtube.com/@HoseinBeekeeper",
  address: "قزوین شهرک عارف فروشگاه صمدی فارم",
  hours: "شنبه تا پنجشنبه — ۹ صبح تا ۸ شب",
};

export const FOOTER_YEAR = "۱۴۰۵";
