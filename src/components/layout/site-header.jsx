"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { useCountry } from "@/contexts/country-context";
import { COUNTRY_LIST, getCountryConfig } from "@/lib/country-config";
import { useWishlist } from "@/contexts/wishlist-context";
import { ChromeContainer } from "@/components/layout/container";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { getShopEdit } from "@/data/shop-edits";
import { formatPrice } from "@/lib/format";
import { getProductBySlug } from "@/lib/products";
import { sizeOptionLabel } from "@/lib/size-chart";
import { QuickAddModal } from "@/components/product/quick-add-modal";
import { BrandLogo, BrandMark } from "@/components/layout/brand-logo";
import {
  LuBike,
  LuBookOpen,
  LuCalendarCheck,
  LuClock,
  LuHouse,
  LuInfo,
  LuMail,
  LuMapPin,
  LuPhone,
  LuSparkles,
} from "react-icons/lu";

function HeartIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function BagIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function UserIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function HomeIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function SearchIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function MenuIcon({ className = "h-6 w-6" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function TrashIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

function CloseIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

const BOTTOM_CHIP = 48; // h-12
const BOTTOM_GAP = 8;
const BOTTOM_GAP_RING = BOTTOM_CHIP + BOTTOM_GAP * 2; // 64
const BOTTOM_NOTCH_R = 36; // soft rounded bowl (same look as before)
const BOTTOM_NOTCH_SHOULDER = 16;
const BOTTOM_DOCK_CORNER = 22;
const BOTTOM_DOCK_H = 60;
const BOTTOM_DOCK_SPRING = { stiffness: 340, damping: 30 };
const BOTTOM_ICON_COLS = 5;

const BOTTOM_IDLE = 44; // h-11
const BOTTOM_BTN_GAP = 16;

/** Side inset that leaves a light gap between the five dock buttons. */
function dockIconInset(width) {
  if (!width) return 8;
  const pitch = BOTTOM_IDLE + BOTTOM_BTN_GAP;
  const inset = (width - BOTTOM_ICON_COLS * pitch) / 2;
  const minInset = 8;
  const maxInset = (width - BOTTOM_ICON_COLS * (BOTTOM_IDLE + 10)) / 2;
  if (maxInset < minInset) return minInset;
  return Math.max(minInset, Math.min(inset, maxInset));
}


function getBottomBarActiveIndex({
  pathname,
  bottomBarPanelOpen,
  wishlistOpen,
  cartMounted,
  searchOpen,
}) {
  if (searchOpen) return 4;
  if (cartMounted) return 2;
  if (wishlistOpen) return 1;
  if (
    (pathname === "/account" || pathname === "/login") &&
    !bottomBarPanelOpen
  ) {
    return 3;
  }
  if (pathname === "/" && !bottomBarPanelOpen) return 0;
  return -1;
}

/** Soft rounded notch — circular bowl + mirrored shoulders (no cubic wobble). */
function buildNotchedDockPath(width, height, notchX, notchR) {
  const corner = Math.min(BOTTOM_DOCK_CORNER, height / 2);
  const fmt = (n) => Number(n.toFixed(2));

  if (notchX == null || notchR <= 0) {
    return `M ${corner},0 H ${width - corner} A ${corner} ${corner} 0 0 1 ${width},${corner} V ${height - corner} A ${corner} ${corner} 0 0 1 ${width - corner},${height} H ${corner} A ${corner} ${corner} 0 0 1 0,${height - corner} V ${corner} A ${corner} ${corner} 0 0 1 ${corner},0 Z`;
  }

  // Shrink the bowl only when an edge icon would otherwise push the notch
  // through the dock's rounded corner (that pinch is what breaks the home tab).
  let r = notchR;
  let shoulder = BOTTOM_NOTCH_SHOULDER;
  const room = Math.min(notchX, width - notchX) - corner;
  if (room > 0 && r + shoulder > room) {
    const scale = room / (r + shoulder);
    r *= scale;
    shoulder *= scale;
  }
  const cx = notchX;

  const alpha = (58 * Math.PI) / 180;
  const sinA = Math.sin(alpha);
  const cosA = Math.cos(alpha);
  const lx = cx - r * sinA;
  const ly = r * cosA;
  const rx = cx + r * sinA;
  const leftFlat = cx - r - shoulder;
  const rightFlat = cx + r + shoulder;

  const joinHandle = r * 0.42;
  const flatHandle = shoulder * 0.55;

  return [
    `M ${fmt(corner)},0`,
    `H ${fmt(leftFlat)}`,
    `C ${fmt(leftFlat + flatHandle)},0 ${fmt(lx - cosA * joinHandle)},${fmt(ly - sinA * joinHandle)} ${fmt(lx)},${fmt(ly)}`,
    `A ${fmt(r)} ${fmt(r)} 0 0 0 ${fmt(rx)},${fmt(ly)}`,
    `C ${fmt(rx + cosA * joinHandle)},${fmt(ly - sinA * joinHandle)} ${fmt(rightFlat - flatHandle)},0 ${fmt(rightFlat)},0`,
    `H ${fmt(width - corner)}`,
    `A ${corner} ${corner} 0 0 1 ${width} ${corner}`,
    `V ${height - corner}`,
    `A ${corner} ${corner} 0 0 1 ${width - corner} ${height}`,
    `H ${corner}`,
    `A ${corner} ${corner} 0 0 1 0 ${height - corner}`,
    `V ${corner}`,
    `A ${corner} ${corner} 0 0 1 ${corner} 0`,
    "Z",
  ].join(" ");
}

function ChevronDownIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** Active state for main nav links. */
function navHrefIsActive(href, pathname, searchParams) {
  if (href === "/cart") return pathname === "/cart";

  const onCollectionEdit =
    pathname.startsWith("/collections/") && pathname !== "/collections";

  if (href === "/collections") {
    return pathname === "/collections" || onCollectionEdit;
  }

  if (href === "/shop") {
    if (pathname.startsWith("/shop/")) return true;
    if (onCollectionEdit) return false;
    if (pathname !== "/shop") return false;
    const edit = searchParams.get("edit");
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    return !edit && !category && !tag;
  }

  if (href.startsWith("/collections/") && !href.includes("?")) {
    const wantSlug = href.slice("/collections/".length).replace(/\/$/, "");
    if (pathname === `/collections/${wantSlug}`) return true;
    if (
      wantSlug === "evening-silhouettes" &&
      (pathname === "/shop" || pathname === "/products") &&
      searchParams.get("category") === "starters"
    ) {
      return true;
    }
    return false;
  }

  const [path, queryString = ""] = href.split("?");
  if (path !== "/products" && path !== "/shop") return false;

  const q = new URLSearchParams(queryString);
  const wantEdit = q.get("edit");
  const wantCat = q.get("category");

  if (wantEdit && getShopEdit(wantEdit)) {
    return pathname === `/collections/${wantEdit}`;
  }
  if (wantCat != null) {
    return (
      (pathname === "/shop" || pathname === "/products") &&
      searchParams.get("category") === wantCat
    );
  }

  if (pathname.startsWith("/shop/")) return true;
  if (pathname === "/shop" || pathname === "/products") {
    const hasListFilter = Boolean(
      searchParams.get("edit") ||
      searchParams.get("category") ||
      searchParams.get("tag"),
    );
    return !hasListFilter;
  }
  return false;
}

const MAIN_NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Menu" },
  { href: "/collections", label: "Categories" },
  { href: "/about-us", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

// Pages grouped under the "Help" menu.
const HELP_LINKS = [
  { href: "/faqs", label: "FAQs", note: "Quick answers" },
  { href: "/shipping-policy", label: "Delivery Policy", note: "Areas, charges & times" },
  { href: "/exchange-refund", label: "Refund & Replacement", note: "If something's wrong" },
  { href: "/return-policy", label: "Cancellation Policy", note: "Change or cancel an order" },
  { href: "/privacy-policy", label: "Privacy Policy", note: "How we use your data" },
];

const navLinkClass = (active) =>
  `relative py-1 text-[13px] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-[var(--secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--secondary)] after:absolute after:left-1/2 after:-bottom-1 after:h-px after:-translate-x-1/2 after:bg-[var(--secondary)] after:transition-[width] after:duration-300 ${
    active
      ? "text-[var(--secondary)] after:w-full"
      : "text-white/85 after:w-0 hover:after:w-full"
  }`;

function MainNavLinks() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <>
      {MAIN_NAV.map((item) => {
        const active =
          item.href === "/shop" || item.href === "/collections"
            ? navHrefIsActive(item.href, pathname, searchParams)
            : pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={navLinkClass(active)}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
      <HelpMenu active={HELP_LINKS.some((link) => link.href === pathname)} />
    </>
  );
}

/** "Help" item with a dropdown of the information pages (hover or keyboard focus). */
function HelpMenu({ active = false }) {
  return (
    <div className="group relative">
      <button
        type="button"
        aria-haspopup="true"
        className={`${navLinkClass(active)} inline-flex items-center gap-1 rounded-none`}
      >
        Help
        <ChevronDownIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul className="overflow-hidden rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5">
          {HELP_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-xl px-4 py-2.5 transition-colors hover:bg-stone-100"
              >
                <span className="block text-sm font-semibold text-stone-900">{link.label}</span>
                <span className="block text-xs text-stone-500">{link.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MainNavFallback() {
  return (
    <>
      {MAIN_NAV.map((item) => (
        <Link key={item.href} href={item.href} className={navLinkClass(false)}>
          {item.label}
        </Link>
      ))}
      <span className={navLinkClass(false)}>Help</span>
    </>
  );
}

const headerIconBtn =
  "relative h-10 w-10 items-center justify-center rounded-full text-[var(--secondary)] transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--secondary)]";

const headerBadge =
  "absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--secondary)] px-1 text-[9px] font-bold text-[var(--primary)]";

export function SiteHeader() {
  const pathname = usePathname();
  const {
    totalItems,
    ready,
    items: cartItems,
    subtotal,
    updateQuantity,
    changeSize,
    removeItem: removeCartItem,
    cartOpen,
    openCart,
    closeCart,
  } = useCart();
  const {
    totalItems: wishCount,
    ready: wishReady,
    items: wishItems,
    removeItem: removeWishlistItem,
  } = useWishlist();
  const { user, isAuthenticated, ready: authReady } = useAuth();
  const accountHref = isAuthenticated ? "/account" : "/login";
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlistFromBottom, setWishlistFromBottom] = useState(true);
  const cartMounted = cartOpen;
  const [quickAddProduct, setQuickAddProduct] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerCompact, setHeaderCompact] = useState(false);
  const bottomBarPanelOpen =
    wishlistOpen || cartMounted || searchOpen || menuOpen;
  const { countryCode, setCountryCode } = useCountry();
  const [countryOpen, setCountryOpen] = useState(false);
  const wishlistPopoverRef = useRef(null);
  const mobileWishlistRef = useRef(null);
  const searchAreaRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const mobileSearchTriggerRef = useRef(null);
  const countryPopoverRef = useRef(null);

  useEffect(() => {
    if (!wishlistOpen) return;
    function onClick(event) {
      // Clicks inside the desktop popover or the mobile panel keep it open.
      if (wishlistPopoverRef.current?.contains(event.target)) return;
      if (mobileWishlistRef.current?.contains(event.target)) return;
      // The bottom bar's own button toggles it; don't close here first.
      if (bottomBarRef.current?.contains(event.target)) return;
      setWishlistOpen(false);
    }
    function onKey(event) {
      if (event.key === "Escape") setWishlistOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [wishlistOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    function onClick(event) {
      if (searchAreaRef.current?.contains(event.target)) return;
      if (mobileSearchRef.current?.contains(event.target)) return;
      if (mobileSearchTriggerRef.current?.contains(event.target)) return;
      setSearchOpen(false);
    }
    function onKey(event) {
      if (event.key === "Escape") setSearchOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [searchOpen]);

  useEffect(() => {
    if (!countryOpen) return;
    function onClick(event) {
      if (countryPopoverRef.current?.contains(event.target)) return;
      setCountryOpen(false);
    }
    function onKey(event) {
      if (event.key === "Escape") setCountryOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [countryOpen]);

  const wishlistPreview = wishItems ?? [];

  const openWishlist = () => {
    if (typeof window !== "undefined") {
      setWishlistFromBottom(window.matchMedia("(max-width: 639px)").matches);
    }
    setWishlistOpen(true);
  };

  const closeWishlist = () => {
    setWishlistOpen(false);
  };

  const closeBottomBarPanels = () => {
    if (searchOpen) setSearchOpen(false);
    if (wishlistOpen) closeWishlist();
    if (cartMounted) closeCart();
    if (menuOpen) setMenuOpen(false);
  };

  useEffect(() => {
    if (!wishlistOpen) return;
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setWishlistFromBottom(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [wishlistOpen]);

  useEffect(() => {
    const onScroll = () => {
      setHeaderCompact(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const toggleSearch = () => {
    setSearchOpen((open) => {
      const nextOpen = !open;
      if (nextOpen) {
        setCountryOpen(false);
        if (wishlistOpen) closeWishlist();
        if (cartMounted) closeCart();
        if (menuOpen) setMenuOpen(false);
      }
      return nextOpen;
    });
  };

  const bottomBarRef = useRef(null);
  const [bottomDockSize, setBottomDockSize] = useState({ width: 0, notchX: null });

  const bottomActiveIndex = getBottomBarActiveIndex({
    pathname,
    bottomBarPanelOpen,
    wishlistOpen,
    cartMounted,
    searchOpen,
  });

  // Active item stays in place, so the dock never gets a notch.
  const notchX = null;
  const bottomBtnClass = (i) =>
    `mx-auto flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 ${
      bottomActiveIndex === i
        ? "bg-[var(--primary)] text-white"
        : "text-[var(--primary)]/80"
    }`;
  const dockWidth = bottomDockSize.width || 360;
  const iconInset = dockIconInset(dockWidth);

  useLayoutEffect(() => {
    const syncDock = () => {
      const root = bottomBarRef.current;
      if (!root) return;
      const width = root.getBoundingClientRect().width;
      if (bottomActiveIndex < 0) {
        setBottomDockSize({ width, notchX: null });
        return;
      }
      const item = root.querySelector(`[data-bottom-idx="${bottomActiveIndex}"]`);
      if (!item) {
        setBottomDockSize({ width, notchX: null });
        return;
      }
      const rootRect = root.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      setBottomDockSize({
        width,
        notchX: itemRect.left + itemRect.width / 2 - rootRect.left,
      });
    };

    syncDock();
    window.addEventListener("resize", syncDock);
    return () => window.removeEventListener("resize", syncDock);
  }, [bottomActiveIndex, iconInset]);

  const dockPath = buildNotchedDockPath(
    dockWidth,
    BOTTOM_DOCK_H,
    notchX,
    notchX == null ? 0 : BOTTOM_NOTCH_R,
  );
  const iconLayerMask =
    notchX == null
      ? undefined
      : {
          WebkitMaskImage: `radial-gradient(circle ${BOTTOM_GAP_RING / 2 + 6}px at ${notchX}px 0px, transparent ${BOTTOM_GAP_RING / 2 + 4}px, #000 ${BOTTOM_GAP_RING / 2 + 5}px)`,
          maskImage: `radial-gradient(circle ${BOTTOM_GAP_RING / 2 + 6}px at ${notchX}px 0px, transparent ${BOTTOM_GAP_RING / 2 + 4}px, #000 ${BOTTOM_GAP_RING / 2 + 5}px)`,
        };
  const dockSpring = {
    type: "spring",
    ...BOTTOM_DOCK_SPRING,
  };

  const openWishlistFromBar = () => {
    if (wishlistOpen) {
      closeWishlist();
    } else {
      if (cartMounted) closeCart();
      if (menuOpen) setMenuOpen(false);
      if (searchOpen) setSearchOpen(false);
      openWishlist();
    }
  };

  const openCartFromBar = () => {
    if (cartMounted) {
      closeCart();
    } else {
      if (wishlistOpen) closeWishlist();
      if (menuOpen) setMenuOpen(false);
      if (searchOpen) setSearchOpen(false);
      openCart();
    }
  };

  if (pathname === "/account") return null;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--secondary)]/25 bg-[var(--primary)] shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
        <div className="border-b border-white/10 bg-black/25 text-[var(--secondary)]">
          <ChromeContainer>
            <div className="flex h-9 items-center justify-between gap-3 text-[11px] font-medium tracking-wide sm:text-xs">
              <div className="flex min-w-0 items-center gap-4 lg:gap-6">
                <span className="inline-flex min-w-0 items-center gap-1.5">
                  <LuClock className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  <span className="truncate">Open daily · 12 PM – 11 PM</span>
                </span>
                <a
                  href="tel:+8801786493740"
                  className="hidden items-center gap-1.5 transition-colors hover:text-white sm:inline-flex"
                >
                  <LuPhone className="h-3.5 w-3.5" aria-hidden />
                  +88017 86 493 740
                </a>
                <span className="hidden items-center gap-1.5 lg:inline-flex">
                  <LuMapPin className="h-3.5 w-3.5" aria-hidden />
                  Halishahar K Block, Chittagong
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-3 sm:gap-4">
                <Link
                  href="/track-order"
                  className="hidden items-center gap-1.5 transition-colors hover:text-white sm:inline-flex"
                >
                  <LuBike className="h-3.5 w-3.5" aria-hidden />
                  Track order
                </Link>
                <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden />
                <div className="relative" ref={countryPopoverRef}>
                  <button
                    type="button"
                    onClick={() => setCountryOpen((open) => !open)}
                    aria-label="Select country"
                    aria-expanded={countryOpen}
                    className="inline-flex items-center gap-1 rounded-full py-0.5 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--secondary)]"
                  >
                    <span>
                      {getCountryConfig(countryCode).flag} {countryCode}
                    </span>
                    <ChevronDownIcon className="h-3.5 w-3.5" />
                  </button>
                  {countryOpen ? (
                    <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-black/10">
                      <p className="border-b border-stone-100 px-4 py-2.5 text-xs font-semibold text-stone-500">
                        Select your country
                      </p>
                      <ul className="max-h-80 overflow-y-auto p-1.5">
                        {COUNTRY_LIST.map((option) => {
                          const selected = option.code === countryCode;
                          return (
                            <li key={option.code}>
                              <button
                                type="button"
                                onClick={() => {
                                  setCountryCode(option.code);
                                  setCountryOpen(false);
                                }}
                                aria-pressed={selected}
                                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                  selected
                                    ? "bg-[var(--primary)]/10 font-bold text-[var(--primary)]"
                                    : "font-medium text-stone-700 hover:bg-stone-100"
                                }`}
                              >
                                <span className="text-base leading-none">{option.flag}</span>
                                <span className="min-w-0 flex-1 truncate">{option.label}</span>
                                <span className="text-xs text-stone-400">+{option.dialCode}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </ChromeContainer>
        </div>

        <ChromeContainer>
          <div
            className={`relative flex items-center justify-between gap-4 transition-[min-height] duration-300 ease-out ${
              headerCompact ? "min-h-16" : "min-h-[4.5rem] sm:min-h-[5.25rem]"
            }`}
          >
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--secondary)] sm:gap-3"
              aria-label="ERP17 Restaurant home"
            >
              <BrandLogo
                markClassName={`w-auto transition-[height] duration-300 ease-out ${
                  headerCompact ? "h-8 sm:h-9" : "h-9 sm:h-11"
                }`}
                nameClassName="text-[1.5rem] sm:text-[1.8rem]"
                taglineClassName="text-[8.5px] text-white/65 sm:text-[10px]"
              />
            </Link>

            <nav
              className="hidden items-center gap-8 lg:flex xl:gap-10"
              aria-label="Main"
            >
              <Suspense fallback={<MainNavFallback />}>
                <MainNavLinks />
              </Suspense>
            </nav>

            <div className="relative z-20 flex items-center gap-0.5 sm:gap-1">
              <div className="relative hidden sm:block" ref={searchAreaRef}>
                <button
                  type="button"
                  onClick={toggleSearch}
                  className={`${headerIconBtn} inline-flex`}
                  aria-label={searchOpen ? "Close search" : "Search the menu"}
                  aria-expanded={searchOpen}
                >
                  {searchOpen ? (
                    <CloseIcon className="h-5 w-5" />
                  ) : (
                    <SearchIcon className="h-5 w-5" />
                  )}
                </button>
                {/* Desktop search: a full-width bar that drops down from the top */}
                <AnimatePresence>
                  {searchOpen ? (
                    <>
                      <motion.button
                        key="search-backdrop"
                        type="button"
                        aria-label="Close search"
                        onClick={() => setSearchOpen(false)}
                        className="fixed inset-0 z-[70] cursor-default bg-black/40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div
                        key="search-panel"
                        className="fixed inset-x-0 top-0 z-[71] bg-white shadow-2xl"
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <ChromeContainer className="py-8">
                          <form
                            action="/search"
                            method="get"
                            role="search"
                            aria-label="Search the menu"
                            className="mx-auto flex max-w-3xl items-center gap-3"
                          >
                            <div className="relative flex-1">
                              <SearchIcon className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400" />
                              <input
                                type="search"
                                name="q"
                                placeholder="Search dishes, drinks…"
                                className="h-14 w-full rounded-full border border-stone-200 bg-stone-50 pl-14 pr-32 text-lg text-stone-900 outline-none placeholder:text-stone-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/15"
                                autoFocus
                              />
                              <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)] px-6 py-2.5 text-base font-semibold text-white"
                              >
                                Search
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => setSearchOpen(false)}
                              aria-label="Close search"
                              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-stone-500 hover:bg-stone-100"
                            >
                              <CloseIcon className="h-6 w-6" />
                            </button>
                          </form>
                        </ChromeContainer>
                      </motion.div>
                    </>
                  ) : null}
                </AnimatePresence>
              </div>
              <div
                className="relative hidden sm:block"
                ref={wishlistPopoverRef}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (wishlistOpen) {
                      closeWishlist();
                      return;
                    }
                    openWishlist();
                  }}
                  className={`${headerIconBtn} inline-flex`}
                  aria-label={`Favourites, ${wishReady ? wishCount : 0} saved`}
                  aria-expanded={wishlistOpen}
                >
                  <HeartIcon className="h-5 w-5" />
                  {wishReady && wishCount > 0 ? (
                    <span className={headerBadge}>
                      {wishCount > 99 ? "99+" : wishCount}
                    </span>
                  ) : null}
                </button>
                {wishlistOpen && !wishlistFromBottom ? (
                  <div className="absolute right-0 top-full z-50 mt-2 w-72 max-w-none rounded-xl border border-stone-200 bg-[var(--surface-elevated)] p-4 text-sm shadow-lg ring-1 ring-black/5">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                        Wishlist
                      </p>
                      <p className="text-xs text-stone-600">
                        <span className="font-semibold text-stone-900">
                          Total products
                        </span>{" "}
                        {wishCount}
                      </p>
                    </div>
                    {wishCount === 0 ? (
                      <p className="mt-3 text-xs text-stone-500">
                        No products in your wishlist yet.
                      </p>
                    ) : (
                      <div className="mt-3 min-h-0 flex-1 pr-1">
                        <ul
                          className={`space-y-3 ${
                            wishCount > 4 ? "h-[260px] overflow-y-auto" : ""
                          }`}
                        >
                          {wishlistPreview.map((item) => (
                            <li
                              key={item.productId}
                              className="flex items-center gap-3"
                            >
                              <button
                                type="button"
                                className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left"
                                onClick={() => {
                                  const product = getProductBySlug(item.slug);
                                  closeWishlist();
                                  if (product) setQuickAddProduct(product);
                                }}
                              >
                                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-stone-200">
                                  <ImageWithFallback
                                    src={item.image}
                                    alt=""
                                    useNative
                                    imageClassName="object-cover"
                                    fallbackClassName="flex h-full w-full items-center justify-center bg-stone-200 text-stone-500"
                                    fallbackLabelClassName="text-[9px] font-semibold uppercase tracking-[0.14em]"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex h-12 flex-col justify-between">
                                    <div className="truncate text-sm font-medium text-stone-900">
                                      {item.name}
                                    </div>
                                    <div className="text-sm text-stone-700">
                                      {formatPrice(item.price, item.currency)}
                                    </div>
                                  </div>
                                </div>
                              </button>
                              <button
                                type="button"
                                aria-label="Remove from wishlist"
                                onClick={() =>
                                  removeWishlistItem(item.productId)
                                }
                                className="ml-1 inline-flex h-7 w-7 items-center justify-center text-stone-400 hover:text-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                              >
                                <span
                                  aria-hidden
                                  className="text-base leading-none"
                                >
                                  ×
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <Link
                      href="/wishlist"
                      className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                      onClick={closeWishlist}
                    >
                      View all
                    </Link>
                  </div>
                ) : null}
              </div>
              <button
                type="button"
                onClick={openCart}
                className={`${headerIconBtn} hidden sm:inline-flex`}
                aria-label={`Your order, ${ready ? totalItems : 0} items`}
              >
                <BagIcon className="h-5 w-5" />
                {ready && totalItems > 0 ? (
                  <span className={headerBadge}>
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                ) : null}
              </button>
              <Link
                href={accountHref}
                className={`${headerIconBtn} hidden sm:inline-flex`}
                aria-label={isAuthenticated ? "My account" : "Login / Account"}
              >
                <UserIcon className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="ml-2 hidden items-center gap-2 rounded-full bg-[var(--secondary)] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[var(--primary)] shadow-sm transition-colors hover:bg-[#f8c76f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:inline-flex"
              >
                <LuCalendarCheck className="h-4 w-4" aria-hidden />
                Book a table
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className={`${headerIconBtn} inline-flex sm:hidden`}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <CloseIcon className="h-5 w-5" />
                ) : (
                  <MenuIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            <AnimatePresence>
              {searchOpen ? (
                <motion.form
                  ref={mobileSearchRef}
                  action="/search"
                  method="get"
                  role="search"
                  aria-label="Search the menu"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute inset-x-0 top-0 bottom-0 z-30 flex items-center gap-2 bg-[var(--primary)] px-4 sm:hidden"
                >
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="inline-flex shrink-0 min-h-10 min-w-10 items-center justify-center text-[var(--secondary)] transition-colors hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    aria-label="Close search"
                  >
                    <CloseIcon className="h-5 w-5" />
                  </button>
                  <div className="relative min-w-0 flex-1">
                    <input
                      type="search"
                      name="q"
                      placeholder="Search dishes, drinks…"
                      autoFocus
                      className="h-11 w-full rounded-full border border-white/35 bg-white/10 px-4 pr-24 text-sm text-white placeholder:text-white/70 backdrop-blur-sm outline-none transition-colors focus:border-white"
                    />
                    <button
                      type="submit"
                      className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Search
                    </button>
                  </div>
                </motion.form>
              ) : null}
            </AnimatePresence>
          </div>

          <nav
            className="hidden items-center justify-center gap-x-7 border-t border-white/10 py-2.5 sm:flex lg:hidden"
            aria-label="Main"
          >
            <Suspense fallback={<MainNavFallback />}>
              <MainNavLinks />
            </Suspense>
          </nav>
        </ChromeContainer>
      </header>
      <AnimatePresence>
        {wishlistOpen && wishlistFromBottom && (
          <div className="fixed inset-0 z-50">
            <motion.button
              type="button"
              aria-label="Close wishlist"
              onClick={closeWishlist}
              className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            />
            <motion.aside
              ref={mobileWishlistRef}
              initial={{ y: "-100%", x: 0 }}
              animate={{ x: 0, y: 0 }}
              exit={{ y: "-100%", x: 0, transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] } }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-0 right-0 top-0 z-50 flex h-[58vh] max-h-[calc(100dvh-6rem)] min-h-[24rem] flex-col rounded-b-2xl bg-[var(--surface-elevated)] pt-[env(safe-area-inset-top)] shadow-[0_12px_40px_rgba(0,0,0,0.15)] ring-1 ring-black/10"
            >
              <div className="flex shrink-0 items-baseline justify-between gap-2 border-b border-stone-200 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Wishlist
                </p>
                <p className="text-xs text-stone-600">
                  <span className="font-semibold text-stone-900">
                    Total products
                  </span>{" "}
                  {wishCount}
                </p>
              </div>
              {wishCount === 0 ? (
                <div className="flex min-h-0 flex-1 flex-col px-5 py-4">
                  <p className="mt-2 text-xs text-stone-500">
                    No products in your wishlist yet.
                  </p>
                </div>
              ) : (
                <div className="min-h-0 flex-1 px-5 py-3">
                  <ul
                    className={`space-y-3 ${
                      wishCount > 4
                        ? "erp17-wishlist-scroll max-h-[17.75rem] overflow-y-scroll pr-1"
                        : ""
                    }`}
                  >
                    {wishlistPreview.map((item) => (
                      <li
                        key={item.productId}
                        className="flex items-center gap-3"
                      >
                        <button
                          type="button"
                          className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left"
                          onClick={() => {
                            const product = getProductBySlug(item.slug);
                            closeWishlist();
                            if (product) setQuickAddProduct(product);
                          }}
                        >
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-stone-200">
                            <ImageWithFallback
                              src={item.image}
                              alt=""
                              useNative
                              imageClassName="object-cover"
                              fallbackClassName="flex h-full w-full items-center justify-center bg-stone-200 text-stone-500"
                              fallbackLabelClassName="text-[9px] font-semibold uppercase tracking-[0.14em]"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="flex h-12 flex-col justify-between">
                              <div className="truncate text-sm font-medium text-stone-900">
                                {item.name}
                              </div>
                              <div className="text-sm text-stone-700">
                                {formatPrice(item.price, item.currency)}
                              </div>
                            </div>
                          </div>
                        </button>
                        <button
                          type="button"
                          aria-label="Remove from wishlist"
                          onClick={() => removeWishlistItem(item.productId)}
                          className="ml-1 inline-flex h-7 w-7 items-center justify-center text-stone-400 hover:text-stone-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                        >
                          <span aria-hidden className="text-base leading-none">
                            ×
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Link
                href="/wishlist"
                className="mx-5 mb-3 mt-0.5 inline-flex w-auto shrink-0 items-center justify-center rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                onClick={closeWishlist}
              >
                View all
              </Link>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {cartMounted && (
          <div className="fixed inset-0 z-[80]">
            <motion.button
              type="button"
              aria-label="Close cart"
              onClick={closeCart}
              className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 right-0 z-[80] flex h-full w-[calc(100%-2.5rem)] max-w-[24rem] flex-col overflow-hidden bg-[var(--surface)] pb-[calc(4.75rem+env(safe-area-inset-bottom))] shadow-2xl sm:w-full sm:pb-0"
              aria-label="Your order"
            >
              <div className="flex shrink-0 items-center justify-between gap-3 bg-[var(--primary)] px-5 py-4 text-white">
                <div className="flex items-center gap-3">
                  <BrandMark className="h-6 w-auto text-[var(--secondary)]" />
                  <div>
                    <h2 className="text-base font-bold leading-tight">
                      Your Order
                    </h2>
                    <p className="text-xs text-white/70">
                      {ready ? totalItems : 0}{" "}
                      {totalItems === 1 ? "item" : "items"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <CloseIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto">
                {!ready ? (
                  <p className="px-5 py-6 text-sm text-stone-500">Loading…</p>
                ) : cartItems.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center px-8 text-center">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--background)]">
                      <BrandMark className="h-9 w-auto text-[var(--primary)]" />
                    </span>
                    <p className="mt-5 text-lg font-bold text-stone-900">
                      Your order is empty
                    </p>
                    <p className="mt-1 text-sm text-stone-500">
                      Add a few dishes from the menu to get started.
                    </p>
                    <Link
                      href="/shop"
                      onClick={closeCart}
                      className="mt-6 inline-flex rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white"
                    >
                      Browse menu
                    </Link>
                  </div>
                ) : (
                  <ul className="space-y-3 p-4">
                    {cartItems.map((line) => {
                      const product = getProductBySlug(line.slug);
                      const sizes = product?.sizes?.length
                        ? product.sizes
                        : [line.size];
                      return (
                        <li
                          key={line.lineId}
                          className="flex gap-3 rounded-2xl border border-stone-200 bg-white p-3"
                        >
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                            <ImageWithFallback
                              src={line.image}
                              alt=""
                              useNative
                              imageClassName="object-cover"
                              fallbackClassName="flex h-full w-full items-center justify-center bg-stone-200 text-stone-500"
                              fallbackLabelClassName="text-[8px] font-semibold uppercase tracking-[0.12em]"
                            />
                          </div>
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-semibold leading-snug text-stone-900">
                                {line.name}
                              </p>
                              <button
                                type="button"
                                onClick={() => removeCartItem(line.lineId)}
                                aria-label={`Remove ${line.name}`}
                                className="-mr-1 -mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-stone-400 hover:bg-red-50 hover:text-[var(--primary)]"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-stone-500">
                              {sizes.length > 1 ? (
                                <select
                                  aria-label={`Portion for ${line.name}`}
                                  value={line.size}
                                  onChange={(event) =>
                                    changeSize(line.lineId, event.target.value)
                                  }
                                  className="rounded-full border border-stone-200 bg-stone-50 px-2 py-0.5 text-xs text-stone-700"
                                >
                                  {sizes.map((size) => (
                                    <option key={size} value={size}>
                                      {sizeOptionLabel(size)}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <span>{sizeOptionLabel(line.size)}</span>
                              )}
                              {line.color ? <span>· {line.color}</span> : null}
                            </div>
                            <div className="mt-auto flex items-center justify-between pt-2">
                              <div className="flex items-center rounded-full border border-stone-200">
                                <button
                                  type="button"
                                  aria-label={`Decrease ${line.name}`}
                                  disabled={line.quantity <= 1}
                                  onClick={() =>
                                    updateQuantity(
                                      line.lineId,
                                      line.quantity - 1,
                                    )
                                  }
                                  className="inline-flex h-7 w-7 items-center justify-center rounded-full text-stone-700 disabled:opacity-30"
                                >
                                  −
                                </button>
                                <span className="min-w-6 text-center text-sm font-semibold text-stone-900">
                                  {line.quantity}
                                </span>
                                <button
                                  type="button"
                                  aria-label={`Increase ${line.name}`}
                                  onClick={() =>
                                    updateQuantity(
                                      line.lineId,
                                      line.quantity + 1,
                                    )
                                  }
                                  className="inline-flex h-7 w-7 items-center justify-center rounded-full text-stone-700"
                                >
                                  +
                                </button>
                              </div>
                              <span className="text-sm font-bold text-[var(--primary)]">
                                {formatPrice(
                                  line.price * line.quantity,
                                  line.currency,
                                )}
                              </span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {ready && cartItems.length > 0 ? (
                <div className="shrink-0 border-t border-stone-200 bg-white px-5 pb-5 pt-4">
                  <div className="flex items-center justify-between text-sm text-stone-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-900">
                      {formatPrice(subtotal, cartItems[0].currency)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-stone-400">
                    Delivery charge is added at checkout.
                  </p>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="mt-4 flex h-12 items-center justify-between rounded-full bg-[var(--primary)] px-6 text-sm font-semibold text-white"
                  >
                    <span>Checkout</span>
                    <span>{formatPrice(subtotal, cartItems[0].currency)}</span>
                  </Link>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="mt-3 block text-center text-sm font-medium text-[var(--primary)]"
                  >
                    + Add more items
                  </Link>
                </div>
              ) : null}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
      {quickAddProduct ? (
        <QuickAddModal
          product={quickAddProduct}
          onClose={() => setQuickAddProduct(null)}
        />
      ) : null}

      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-[100] sm:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-[80%] max-w-sm bg-[var(--background)] shadow-2xl"
            >
              <div className="flex flex-col h-full bg-[var(--background)]">
                <div className="relative flex items-center justify-center bg-[var(--primary)] px-4 py-3">
                  <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex h-12 max-w-[75%] items-center justify-center"
                    aria-label="ERP17 Restaurant"
                  >
                    <BrandLogo
                      markClassName="h-9 w-auto"
                      nameClassName="text-2xl"
                      taglineClassName="text-[9px] text-white/70"
                    />
                  </Link>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="absolute right-3.5 p-1.5 text-white/70 hover:text-white"
                  >
                    <CloseIcon className="h-6 w-6" />
                  </button>
                </div>
                <div className="flex gap-3 border-b border-stone-100 px-6 py-5">
                  {authReady && isAuthenticated && user ? (
                    <Link
                      href="/account"
                      onClick={() => setMenuOpen(false)}
                      className="flex w-full items-center gap-3 rounded-xl transition-colors hover:bg-stone-100/70"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white">
                        <UserIcon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 text-left">
                        <span className="block truncate text-[15px] font-semibold leading-tight text-stone-900">
                          {user.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-stone-500">
                          View Profile
                        </span>
                      </span>
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setMenuOpen(false)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[var(--primary)] bg-transparent px-4 py-2.5 text-xs font-semibold text-[var(--primary)] transition-colors hover:bg-[var(--primary)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                      >
                        <UserIcon className="h-4 w-4" />
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setMenuOpen(false)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
                <nav className="flex-1 overflow-y-auto px-6 py-8">
                  <ul className="space-y-6">
                    {[
                      { href: "/", label: "Home", Icon: LuHouse },
                      { href: "/shop", label: "Menu", Icon: LuBookOpen },
                      { href: "/collections", label: "Categories", Icon: LuSparkles },
                      { href: "/about-us", label: "Our Story", Icon: LuInfo },
                      { href: "/contact", label: "Contact", Icon: LuMail },
                      { href: "/track-order", label: "Track Order", Icon: LuBike },
                    ].map(({ href, label, Icon }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 text-[17px] font-medium text-stone-900 transition-colors hover:text-[var(--accent)]"
                        >
                          <Icon className="h-[22px] w-[22px] shrink-0 text-[var(--primary)]" aria-hidden />
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="my-6 border-b border-stone-200" />

                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
                    Help
                  </p>
                  <ul className="space-y-4">
                    {HELP_LINKS.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="block text-base font-medium text-stone-800 transition-colors hover:text-[var(--accent)]"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="my-6 border-b border-stone-200" />

                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">
                    My Account
                  </p>
                  <ul className="space-y-6">
                    <li>
                      <Link
                        href="/wishlist"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 text-[17px] font-medium text-stone-900 transition-colors hover:text-[var(--accent)]"
                      >
                        <HeartIcon className="h-[22px] w-[22px] shrink-0 text-[var(--primary)]" />
                        My Favourites
                      </Link>
                    </li>
                  </ul>
                </nav>
                <div className="space-y-4 border-t border-stone-200 bg-[var(--background)] p-6">
                  <div className="space-y-1.5 text-sm text-stone-600">
                    <p className="flex items-center gap-2">
                      <LuClock className="h-4 w-4 text-[var(--primary)]" aria-hidden />
                      Open daily · 12 PM – 11 PM
                    </p>
                    <a
                      href="tel:+8801786493740"
                      className="flex items-center gap-2 hover:text-[var(--accent)]"
                    >
                      <LuPhone className="h-4 w-4 text-[var(--primary)]" aria-hidden />
                      +88017 86 493 740
                    </a>
                  </div>
                  <Link
                    href="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--primary)] px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[var(--secondary)]"
                  >
                    <LuCalendarCheck className="h-4 w-4" aria-hidden />
                    Book a table
                  </Link>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Bar — soft rounded dock; active item highlighted in place */}
      <div className="fixed bottom-0 left-0 right-0 z-[85] px-3 pb-[max(0.85rem,env(safe-area-inset-bottom))] pt-10 sm:hidden">
        <div ref={bottomBarRef} className="relative h-[3.75rem]">
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0"
            width={dockWidth}
            height={BOTTOM_DOCK_H}
          >
            <defs>
              <mask
                id="erp17-dock-mask"
                maskUnits="userSpaceOnUse"
                maskContentUnits="userSpaceOnUse"
              >
                <motion.path
                  d={dockPath}
                  fill="white"
                  initial={false}
                  animate={{ d: dockPath }}
                  transition={dockSpring}
                />
              </mask>
            </defs>
          </svg>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{
              height: BOTTOM_DOCK_H,
              width: dockWidth,
              backdropFilter: "blur(28px) saturate(1.45)",
              WebkitBackdropFilter: "blur(28px) saturate(1.45)",
              backgroundColor: "rgba(255, 248, 239, 0.86)",
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,240,225,0.16) 52%, rgba(245,181,74,0.24) 100%)",
              WebkitMaskImage: "url(#erp17-dock-mask)",
              maskImage: "url(#erp17-dock-mask)",
            }}
          />

          <div
            className="relative z-10 grid h-full grid-cols-5 items-center"
            style={{ ...iconLayerMask, paddingInline: 6 }}
          >
            <div
              data-bottom-idx="0"
              className="relative flex h-full items-center justify-center"
            >
              {(
                <Link
                  href="/"
                  onClick={closeBottomBarPanels}
                  className={bottomBtnClass(0)}
                  aria-label="Home"
                  aria-current={pathname === "/" ? "page" : undefined}
                >
                  <HomeIcon className="h-6 w-6" />
                </Link>
              )}
            </div>

            <div
              data-bottom-idx="1"
              className="relative flex h-full items-center justify-center"
            >
              {(
                <button
                  type="button"
                  onClick={openWishlistFromBar}
                  className={bottomBtnClass(1)}
                  aria-label="Wishlist"
                  aria-pressed={wishlistOpen}
                >
                  <div className="relative">
                    <HeartIcon className="h-6 w-6" />
                    {wishReady && wishCount > 0 && (
                      <span className="absolute -right-1.5 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[var(--primary)] px-0.5 text-[8px] font-bold leading-none text-[var(--secondary)]">
                        {wishCount > 99 ? "99+" : wishCount}
                      </span>
                    )}
                  </div>
                </button>
              )}
            </div>

            <div
              data-bottom-idx="2"
              className="relative flex h-full items-center justify-center"
            >
              {(
                <button
                  type="button"
                  onClick={openCartFromBar}
                  className={bottomBtnClass(2)}
                  aria-label="Cart"
                  aria-pressed={cartMounted}
                >
                  <div className="relative">
                    <BagIcon className="h-6 w-6" />
                    {ready && totalItems > 0 && (
                      <span className="absolute -right-1.5 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[var(--primary)] px-0.5 text-[8px] font-bold leading-none text-[var(--secondary)]">
                        {totalItems > 99 ? "99+" : totalItems}
                      </span>
                    )}
                  </div>
                </button>
              )}
            </div>

            <div
              data-bottom-idx="3"
              className="relative flex h-full items-center justify-center"
            >
              {(
                <Link
                  href={accountHref}
                  onClick={closeBottomBarPanels}
                  className={bottomBtnClass(3)}
                  aria-label={isAuthenticated ? "My account" : "Login"}
                >
                  <UserIcon className="h-6 w-6" />
                </Link>
              )}
            </div>

            <div
              data-bottom-idx="4"
              className="relative flex h-full items-center justify-center"
            >
              {(
                <button
                  type="button"
                  ref={mobileSearchTriggerRef}
                  onClick={toggleSearch}
                  className={bottomBtnClass(4)}
                  aria-label={searchOpen ? "Close search" : "Search"}
                  aria-expanded={searchOpen}
                >
                  <SearchIcon className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
