/* ════════════════════════════════════════════════════════════
   صمدی فارم — مجموعه آیکون‌های SVG اختصاصی
   همه‌ی آیکون‌ها به‌صورت درون‌خطی (Inline SVG) هستند و
   رنگ‌شان را از currentColor می‌گیرند.
   ════════════════════════════════════════════════════════════ */
import type { ReactNode } from "react";

interface IconProps {
  size?: number;
  className?: string;
}

function Base({
  size = 20,
  className,
  children,
  filled = false,
}: IconProps & { children: ReactNode; filled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* زنبور — لوگوی برند */
export const IconBee = (p: IconProps) => (
  <Base {...p}>
    <ellipse cx="12" cy="13.4" rx="3.6" ry="4.6" />
    <path d="M8.9 12h6.2M9.2 14.8h5.6" />
    <ellipse cx="7.6" cy="8" rx="2.9" ry="1.9" transform="rotate(-28 7.6 8)" />
    <ellipse cx="16.4" cy="8" rx="2.9" ry="1.9" transform="rotate(28 16.4 8)" />
    <path d="M10.6 8.9 9.8 6.9M13.4 8.9l.8-2" />
  </Base>
);

export const IconHex = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 2.5l8.2 4.75v9.5L12 21.5l-8.2-4.75v-9.5z" />
  </Base>
);

export const IconMenu = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </Base>
);

export const IconX = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const IconBag = (p: IconProps) => (
  <Base {...p}>
    <path d="M5.5 8h13l-.9 11a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8z" />
    <path d="M8.8 10.5V6.7a3.2 3.2 0 0 1 6.4 0v3.8" />
  </Base>
);

export const IconTruck = (p: IconProps) => (
  <Base {...p}>
    <path d="M2.5 6.5h11.5v9.5H2.5z" />
    <path d="M14 9.5h4l2.5 3v3.5H14z" />
    <circle cx="6.5" cy="17.8" r="1.8" />
    <circle cx="17" cy="17.8" r="1.8" />
  </Base>
);

export const IconShield = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 2.8 4.8 5.6v6c0 4.6 3 8 7.2 9.6 4.2-1.6 7.2-5 7.2-9.6v-6z" />
    <path d="m8.9 11.6 2.2 2.2 4-4.2" />
  </Base>
);

export const IconDrop = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.2s6.3 6.6 6.3 11a6.3 6.3 0 0 1-12.6 0c0-4.4 6.3-11 6.3-11Z" />
    <path d="M9.4 14.2a2.7 2.7 0 0 0 2.5 2.7" />
  </Base>
);

export const IconHive = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 2.6 15 4.3v3.4L12 9.4 9 7.7V4.3z" />
    <path d="M6.5 11.6l3 1.7v3.4l-3 1.7-3-1.7v-3.4z" />
    <path d="M17.5 11.6l3 1.7v3.4l-3 1.7-3-1.7v-3.4z" />
    <path d="M12 14.5v6.9" />
  </Base>
);

export const IconFlower = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="10.5" r="2.4" />
    <path d="M12 8.1V4.6M14.1 9.3l2.5-2.5M14.4 10.5h3.5M14.1 11.7l2.5 2.5M12 12.9v3.4M9.9 11.7l-2.5 2.5M9.6 10.5H6.1M9.9 9.3 7.4 6.8" />
    <path d="M12 16.3v5.1M12 18.6c-1.6 0-2.8-1-3-2.4M12 18.6c1.6 0 2.8-1 3-2.4" />
  </Base>
);

export const IconMeadow = (p: IconProps) => (
  <Base {...p}>
    <circle cx="7" cy="7" r="1.8" />
    <path d="M7 8.8V21M7 13.5c-1.8-.2-3-1.5-3.2-3.2M7 16.5c1.8-.2 3-1.5 3.2-3.2" />
    <circle cx="16.5" cy="5.5" r="1.8" />
    <path d="M16.5 7.3V21M16.5 12c1.8-.2 3-1.5 3.2-3.2M16.5 15.5c-1.8-.2-3-1.5-3.2-3.2" />
    <path d="M11.8 21v-6.5" />
  </Base>
);

export const IconCells = (p: IconProps) => (
  <Base {...p}>
    <path d="M8.7 3.6 12 5.5v3.8L8.7 11.2 5.4 9.3V5.5z" />
    <path d="M15.3 8.6l3.3 1.9v3.8l-3.3 1.9-3.3-1.9v-3.8z" />
    <path d="M8.7 13.6 12 15.5v3.8l-3.3 1.9-3.3-1.9v-3.8z" />
  </Base>
);

export const IconGift = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="9" width="16" height="4" rx="0.8" />
    <path d="M5.5 13v7a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5v-7M12 9v12.5" />
    <path d="M12 9C12 6.8 10.8 4.6 8.9 4.6 7.6 4.6 7 5.6 7.2 6.7 7.5 8.3 9.8 9 12 9Zm0 0c0-2.2 1.2-4.4 3.1-4.4 1.3 0 1.9 1 1.7 2.1C16.5 8.3 14.2 9 12 9Z" />
  </Base>
);

export const IconStar = ({ size = 15, className }: IconProps) => (
  <Base size={size} className={className} filled>
    <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z" />
  </Base>
);

export const IconQuote = (p: IconProps) => (
  <Base {...p} filled>
    <path d="M9.6 6.2C6.6 7.8 4.8 10.2 4.8 13.4c0 2.6 1.6 4.4 3.9 4.4 2 0 3.5-1.5 3.5-3.5 0-1.9-1.3-3.3-3.2-3.3-.3 0-.7 0-.9.1.3-1.6 1.6-3 3.4-4zm9.2 0c-3 1.6-4.8 4-4.8 7.2 0 2.6 1.6 4.4 3.9 4.4 2 0 3.5-1.5 3.5-3.5 0-1.9-1.3-3.3-3.2-3.3-.3 0-.7 0-.9.1.3-1.6 1.6-3 3.4-4z" />
  </Base>
);

export const IconFlask = (p: IconProps) => (
  <Base {...p}>
    <path d="M9.5 3.2h5M10.3 3.2v5.4l-5 8.6a1.6 1.6 0 0 0 1.4 2.4h10.6a1.6 1.6 0 0 0 1.4-2.4l-5-8.6V3.2" />
    <path d="M7.6 14.5h8.8" />
  </Base>
);

export const IconSun = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
  </Base>
);

export const IconPhone = (p: IconProps) => (
  <Base {...p}>
    <path d="M5.2 3.8h3l1.6 4-2 1.6a12.8 12.8 0 0 0 6.8 6.8l1.6-2 4 1.6v3a1.8 1.8 0 0 1-1.9 1.8A16.8 16.8 0 0 1 3.4 5.7a1.8 1.8 0 0 1 1.8-1.9Z" />
  </Base>
);

export const IconWhatsApp = (p: IconProps) => (
  <Base {...p} filled>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </Base>
);

export const IconInstagram = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
  </Base>
);

export const IconPin = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21.5s-7-6.6-7-11.5a7 7 0 0 1 14 0c0 4.9-7 11.5-7 11.5Z" />
    <circle cx="12" cy="9.8" r="2.6" />
  </Base>
);

export const IconClock = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.2V12l3.2 2" />
  </Base>
);

export const IconPlus = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5.5v13M5.5 12h13" />
  </Base>
);

export const IconMinus = (p: IconProps) => (
  <Base {...p}>
    <path d="M5.5 12h13" />
  </Base>
);

export const IconTrash = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 6.5h15M9.5 6.5V4.8a1.3 1.3 0 0 1 1.3-1.3h2.4a1.3 1.3 0 0 1 1.3 1.3v1.7M6.5 6.5l.8 12.7a1.6 1.6 0 0 0 1.6 1.5h6.2a1.6 1.6 0 0 0 1.6-1.5l.8-12.7" />
    <path d="M10.2 10.5v6M13.8 10.5v6" />
  </Base>
);

export const IconCheck = (p: IconProps) => (
  <Base {...p}>
    <path d="m4.5 12.8 5 5L19.5 6.6" />
  </Base>
);

export const IconArrow = (p: IconProps) => (
  <Base {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Base>
);

export const IconPlay = ({ size = 22, className }: IconProps) => (
  <Base size={size} className={className} filled>
    <path d="M8.2 5.4v13.2L19 12z" />
  </Base>
);

export const IconYoutube = (p: IconProps) => (
  <Base {...p} filled>
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12z" />
  </Base>
);

export const IconSend = (p: IconProps) => (
  <Base {...p}>
    <path d="M20.5 3.5 3.8 9.9c-.8.3-.8 1.4.1 1.6l6.5 1.8 1.8 6.5c.2.9 1.3.9 1.6.1z" />
    <path d="M20.5 3.5 10.4 13.3" />
  </Base>
);

export const IconLeaf = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 19c0-8.5 5.5-14 14-14 0 8.5-5.5 14-14 14Z" />
    <path d="M5 19c3-4.5 6.5-8 11-11" />
  </Base>
);

export const IconUser = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M4.8 20.2c1.3-3.4 4-5.2 7.2-5.2s5.9 1.8 7.2 5.2" />
  </Base>
);

export const IconCopy = (p: IconProps) => (
  <Base {...p}>
    <rect x="8.5" y="8.5" width="12" height="12" rx="2.2" />
    <path d="M15.5 5.5v-.7A2.3 2.3 0 0 0 13.2 2.5H5.8a2.3 2.3 0 0 0-2.3 2.3v7.4a2.3 2.3 0 0 0 2.3 2.3h.7" />
  </Base>
);

export const IconWallet = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 7.5A2.5 2.5 0 0 1 6 5h11.5A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19H6a2.5 2.5 0 0 1-2.5-2.5z" />
    <path d="M3.5 9h17M15.5 14h2" />
  </Base>
);

export const IconCreditCard = (p: IconProps) => (
  <Base {...p}>
    <rect x="2.8" y="5.5" width="18.4" height="13" rx="2.4" />
    <path d="M2.8 10h18.4M6.5 14.5h4" />
  </Base>
);

export const IconLock = (p: IconProps) => (
  <Base {...p}>
    <rect x="5" y="10.5" width="14" height="10" rx="2.2" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2.5" />
  </Base>
);

export const IconThumbsUp = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 10.5v9.5H4.2a1.2 1.2 0 0 1-1.2-1.2v-7.1a1.2 1.2 0 0 1 1.2-1.2z" />
    <path d="M7 10.5 11.5 3a2.1 2.1 0 0 1 2 2.6L12.8 8h5.4a2 2 0 0 1 2 2.4l-1.2 6.9a2 2 0 0 1-2 1.7H7" />
  </Base>
);

export const IconPackage = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 2.8 20.5 7v10L12 21.2 3.5 17V7z" />
    <path d="M3.5 7 12 11.2 20.5 7M12 11.2v10M7.8 4.9l8.5 4.2" />
  </Base>
);

export const IconLogout = (p: IconProps) => (
  <Base {...p}>
    <path d="M14.5 8V5.8A1.8 1.8 0 0 0 12.7 4H6a1.8 1.8 0 0 0-1.8 1.8v12.4A1.8 1.8 0 0 0 6 20h6.7a1.8 1.8 0 0 0 1.8-1.8V16" />
    <path d="M9.5 12H21M17.5 8.5 21 12l-3.5 3.5" />
  </Base>
);

export const IconMapPinPlus = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21.5s-7-6.6-7-11.5a7 7 0 0 1 14 0c0 4.9-7 11.5-7 11.5Z" />
    <path d="M12 7.2v5.6M9.2 10h5.6" />
  </Base>
);

export const IconSpark = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.5c.7 3.8 2.7 5.8 6.5 6.5-3.8.7-5.8 2.7-6.5 6.5-.7-3.8-2.7-5.8-6.5-6.5 3.8-.7 5.8-2.7 6.5-6.5Z" />
    <path d="M19 15.5c.3 1.7 1.2 2.6 2.9 2.9-1.7.3-2.6 1.2-2.9 2.9-.3-1.7-1.2-2.6-2.9-2.9 1.7-.3 2.6-1.2 2.9-2.9Z" />
  </Base>
);
