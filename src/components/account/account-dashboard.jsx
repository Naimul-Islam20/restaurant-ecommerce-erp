"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  LuBellOff,
  LuBike,
  LuCalendarCheck,
  LuCircleCheck,
  LuCrown,
  LuGift,
  LuMedal,
  LuShoppingBag,
  LuSparkle,
  LuStar,
  LuTag,
} from "react-icons/lu";
import { AddAddressModal } from "@/components/account/add-address-modal";
import { BrandLogo, BrandMark } from "@/components/layout/brand-logo";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/contexts/toast-context";
import { formatPrice } from "@/lib/format";
import { getProductBySlug } from "@/lib/products";
import { useWishlist } from "@/contexts/wishlist-context";

// Sidebar navigation items for the account dashboard
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: IconHome },
  { id: "orders", label: "My Orders", icon: IconPackage },
  { id: "rewards", label: "Rewards", icon: IconTrophy },
  { id: "wishlist", label: "Favourites", icon: IconHeart },
  { id: "services", label: "Saved Addresses", icon: IconMapPin },
];

// Quick order & services grid (10 actions) for the account dashboard
const QUICK_SHOPPING_ACTIONS = [
  { id: "order-food", label: "Order Food", href: "/shop", icon: IconBag },
  { id: "track-order", label: "Track Order", href: "/track-order", icon: IconTruck },
  { id: "specials", label: "Chef's Specials", href: "/collections/featured", icon: IconGrid },
  { id: "new-dishes", label: "New Dishes", href: "/collections/new-arrivals", icon: IconSpark },
  { id: "favourites", label: "Favourites", idNav: "wishlist", icon: IconHeart },
  { id: "store-credit", label: "Store Credit", idNav: "account-detail", icon: IconCreditCard },
  { id: "offers", label: "Today's Offers", href: "/collections/sale", icon: IconGift },
  { id: "delivery", label: "Delivery Info", href: "/shipping-policy", icon: IconTag },
  { id: "refund", label: "Refund & Replacement", href: "/exchange-refund", icon: IconRefresh },
  { id: "support", label: "Call Restaurant", href: "tel:+8801786493740", icon: IconPhone },
];

// Favourite dishes shown as round thumbnails (images come from the menu data)
const FAVORITES_LIST = [
  { id: "f1", slug: "dhaka-kacchi-biryani", name: "Kacchi Biryani", type: "Mains" },
  { id: "f2", slug: "butter-chicken", name: "Butter Chicken", type: "Mains" },
  { id: "f3", slug: "beef-seekh-kebab", name: "Seekh Kebab", type: "Starters" },
  { id: "f4", slug: "molten-chocolate-cake", name: "Chocolate Cake", type: "Desserts" },
  { id: "f5", slug: "mango-lassi", name: "Mango Lassi", type: "Drinks" },
  { id: "f6", slug: "masala-chai", name: "Masala Chai", type: "Drinks" },
].map((fav) => ({ ...fav, image: getProductBySlug(fav.slug)?.images?.[0] }));

// Past orders shown on "My Orders" (demo data until orders come from the backend)
const ORDERS = [
  {
    id: "ERP-10501",
    date: "Today, 1:40 PM",
    status: "On the way",
    items: [
      { slug: "dhaka-kacchi-biryani", qty: 2 },
      { slug: "mango-lassi", qty: 2 },
    ],
  },
  {
    id: "ERP-10482",
    date: "12 Oct 2026",
    status: "Delivered",
    items: [
      { slug: "butter-chicken", qty: 1 },
      { slug: "beef-seekh-kebab", qty: 1 },
      { slug: "masala-chai", qty: 2 },
    ],
  },
  {
    id: "ERP-10455",
    date: "05 Oct 2026",
    status: "Delivered",
    items: [
      { slug: "house-beef-burger", qty: 2 },
      { slug: "molten-chocolate-cake", qty: 1 },
    ],
  },
];

// Offers and vouchers for the ERP17 Restaurant menu
const OFFERS_DATA = [
  {
    id: "o1",
    tag: "20% OFF",
    badge: "WELCOME20",
    title: "On First Order",
    description: "Use code WELCOME20 for an instant 20% discount on your first restaurant order.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  },
  {
    id: "o2",
    tag: "FREE DELIVERY",
    badge: "MEMBER",
    title: "Orders Over ৳1,500",
    description: "Free delivery anywhere in Uttara when your order is over ৳1,500.",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&q=80",
  },
  {
    id: "o3",
    tag: "10% OFF",
    badge: "LIMITED",
    title: "Chef's Specials",
    description: "10% off the chef's featured mains this week — kacchi, butter chicken and more.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
  },
  {
    id: "o4",
    tag: "BUNDLE",
    badge: "COMBO",
    title: "Meal for Two",
    description: "Pair a main with a starter and a drink and save on the bundle.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
  },
];

// SVG Icon Definitions styled with the site red (#a51e22)
function IconSun({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="12" cy="12" r="4" fill="#f5b54a" stroke="#f5b54a" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="#f5b54a" strokeLinecap="round" />
    </svg>
  );
}

function IconShield({ className = "h-3 w-3" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconGear({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function IconHome({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M10.707 2.293a1 1 0 011.414 0l9 9a1 1 0 01-1.414 1.414L19 12.086V20a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4h-2v4a1 1 0 01-1 1H6a1 1 0 01-1-1v-7.914l-.293.293a1 1 0 01-1.414-1.414l9-9z" />
    </svg>
  );
}

function IconPackage({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M21 8.5 12 3 3 8.5v7L12 21l9-5.5v-7Z" strokeLinejoin="round" />
      <path d="M3 8.5 12 14l9-5.5M12 14v7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconMapPin({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

function IconLogout({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconEyeSlash({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconEye({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconBag({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M4 7h16l-1.2 12.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8L4 7Z" strokeLinejoin="round" />
      <path d="M9 7a3 3 0 0 1 6 0" strokeLinecap="round" />
    </svg>
  );
}

function IconTruck({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7v-7Z" strokeLinejoin="round" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17.5" cy="18" r="1.6" />
    </svg>
  );
}

function IconGrid({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
    </svg>
  );
}

function IconSpark({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" strokeLinecap="round" />
    </svg>
  );
}

function IconHeart({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" strokeLinejoin="round" />
    </svg>
  );
}

function IconCreditCard({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

function IconGift({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <rect x="3" y="9" width="18" height="12" rx="1.5" />
      <path d="M12 9v12M3 13h18M12 9c-2.2 0-4-1.3-4-3s1-2.2 2.5-1.5S12 7 12 9Zm0 0c2.2 0 4-1.3 4-3s-1-2.2-2.5-1.5S12 7 12 9Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTag({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function IconRefresh({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M4 12a8 8 0 0 1 13.7-5.7L20 8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 4v4h-4M20 12a8 8 0 0 1-13.7 5.7L4 16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPhone({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconChequeBook({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <line x1="7" y1="9" x2="17" y2="9" />
      <line x1="7" y1="13" x2="13" y2="13" />
      <circle cx="16" cy="13" r="1" fill="currentColor" />
    </svg>
  );
}

function IconShareNetwork({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function IconSearch({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
  );
}

function IconTrophy({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M6 9H4a2 2 0 01-2-2V5a2 2 0 012-2h2M18 9h2a2 2 0 002-2V5a2 2 0 00-2-2h-2" />
      <path d="M4 3h16v6a8 8 0 01-16 0V3z" />
      <path d="M12 15v4M8 21h8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconUser({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19.2a6.5 6.5 0 0113 0" strokeLinecap="round" />
    </svg>
  );
}

function IconBell({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChevronRight({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
      <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

function getFirstName(name) {
  return name?.split(" ")[0] ?? "Rakib";
}

// ---------------------- Sub-components ----------------------

function ProfileSection({ user }) {
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [form, setForm] = useState({
    name: user.name || "Rakib",
    email: user.email || "rakib@example.com",
    phone: user.phone ? `+880${user.phone}` : "+8801700000000",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#a51e22]">Profile Details</h2>
        <button
          type="button"
          onClick={() => setEditing((value) => !value)}
          className="text-sm font-semibold text-[#a51e22] hover:underline"
        >
          {editing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="rounded-2xl border border-[#eee7e1] bg-white p-6 shadow-xs">
        {editing ? (
          <form className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((curr) => ({ ...curr, name: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-[#a51e22] focus:ring-1 focus:ring-[#a51e22]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((curr) => ({ ...curr, email: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-[#a51e22] focus:ring-1 focus:ring-[#a51e22]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500">Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((curr) => ({ ...curr, phone: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-[#a51e22] focus:ring-1 focus:ring-[#a51e22]"
              />
            </div>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-xl bg-[#a51e22] px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#7f1519]"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-stone-400">Name</dt>
              <dd className="mt-1 text-base font-semibold text-stone-800">{form.name}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-stone-400">Email</dt>
              <dd className="mt-1 text-base font-medium text-stone-800">{form.email}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-stone-400">Phone</dt>
              <dd className="mt-1 text-base font-medium text-stone-800">{form.phone}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-stone-400">Membership</dt>
              <dd className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-[#f5b54a]/40 bg-[#fff8f0] px-3 py-1 text-xs font-bold text-[#a51e22]">
                <IconShield className="h-3.5 w-3.5 text-[#f5b54a]" /> Bronze Member
              </dd>
            </div>
          </dl>
        )}
      </div>

      <div className="rounded-2xl border border-[#eee7e1] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-stone-800">Security &amp; Password</p>
            <p className="text-xs text-stone-500">Manage your password settings</p>
          </div>
          <button
            type="button"
            onClick={() => setChangingPassword((v) => !v)}
            className="text-sm font-semibold text-[#a51e22] hover:underline"
          >
            {changingPassword ? "Cancel" : "Change Password"}
          </button>
        </div>

        {changingPassword ? (
          <form className="mt-4 space-y-3 border-t border-stone-100 pt-4">
            <input
              type="password"
              placeholder="Current Password"
              value={passwordForm.current}
              onChange={(e) => setPasswordForm((c) => ({ ...c, current: e.target.value }))}
              className="w-full rounded-xl border border-stone-300 px-4 py-2 text-sm outline-none focus:border-[#a51e22]"
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwordForm.next}
              onChange={(e) => setPasswordForm((c) => ({ ...c, next: e.target.value }))}
              className="w-full rounded-xl border border-stone-300 px-4 py-2 text-sm outline-none focus:border-[#a51e22]"
            />
            <button
              type="button"
              onClick={() => setChangingPassword(false)}
              className="rounded-xl bg-[#a51e22] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7f1519]"
            >
              Update Password
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}

function AddressesSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);

  function handleSaveAddress(address) {
    setAddresses((current) => {
      const next = address.isDefault
        ? current.map((item) => ({ ...item, isDefault: false }))
        : current;
      return [...next, { ...address, id: crypto.randomUUID() }];
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#a51e22]">Saved Addresses</h2>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="rounded-xl bg-[#a51e22] px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-[#7f1519]"
        >
          Add New Address
        </button>
      </div>

      {addresses.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((item) => (
            <div key={item.id} className="rounded-2xl border border-[#eee7e1] bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-800">{item.title}</span>
                {item.isDefault ? (
                  <span className="rounded-full bg-[#a51e22]/10 px-2.5 py-0.5 text-xs font-semibold text-[#a51e22]">
                    Default
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm text-stone-600">{item.recipientName}</p>
              <p className="mt-1 text-xs leading-relaxed text-stone-500">
                {item.address}, {item.city}, {item.country}
              </p>
              <p className="mt-2 text-xs font-medium text-stone-700">+{item.phone}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-200 bg-white py-14 text-center">
          <p className="text-base font-semibold text-stone-800">No Saved Addresses</p>
          <p className="mt-1 text-xs text-stone-500">Add an address for quick checkout and order deliveries.</p>
        </div>
      )}

      <AddAddressModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSaveAddress} />
    </div>
  );
}

// Notifications (demo data until they come from the backend)
const INITIAL_NOTIFICATIONS = [
  {
    id: "n1",
    type: "order",
    icon: LuBike,
    title: "Your order is on the way",
    text: "Order #ERP-10501 left our kitchen. Your rider will call when nearby.",
    time: "10 min ago",
    read: false,
  },
  {
    id: "n2",
    type: "offer",
    icon: LuTag,
    title: "Friday special: 15% off Kacchi",
    text: "Order Kacchi Biryani this Friday and get 15% off — dine-in or delivery.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "n3",
    type: "reward",
    icon: LuStar,
    title: "You earned 110 points",
    text: "Points from order #ERP-10482 were added to your ERP17 Rewards.",
    time: "Yesterday",
    read: true,
  },
  {
    id: "n4",
    type: "order",
    icon: LuCircleCheck,
    title: "Order delivered",
    text: "Order #ERP-10482 was delivered. Enjoy your meal!",
    time: "12 Oct",
    read: true,
  },
  {
    id: "n5",
    type: "booking",
    icon: LuCalendarCheck,
    title: "Table booking confirmed",
    text: "Table for 4 on Saturday, 8:00 PM. We'll hold it for 15 minutes.",
    time: "10 Oct",
    read: true,
  },
];

const NOTIFICATION_FILTERS = [
  { id: "all", label: "All" },
  { id: "order", label: "Orders" },
  { id: "offer", label: "Offers" },
  { id: "reward", label: "Rewards" },
];

// Rewards tiers, redeemable treats and points history
const REWARD_POINTS = 1450;

const REWARD_TIERS = [
  { name: "Bronze", min: 0, icon: LuMedal, perk: "1 point for every ৳10" },
  { name: "Silver", min: 2000, icon: LuStar, perk: "1.5× points + free dessert on birthday" },
  { name: "Gold", min: 5000, icon: LuCrown, perk: "2× points + priority table booking" },
];

const REDEEMABLE = [
  { id: "r1", points: 100, title: "Free Masala Chai" },
  { id: "r2", points: 500, title: "৳50 off any order" },
  { id: "r3", points: 1000, title: "Free Molten Chocolate Cake" },
  { id: "r4", points: 2500, title: "Free Kacchi Biryani" },
];

const POINTS_HISTORY = [
  { id: "p1", date: "12 Oct 2026", title: "Order #ERP-10482", points: +110 },
  { id: "p2", date: "05 Oct 2026", title: "Order #ERP-10455", points: +116 },
  { id: "p3", date: "28 Sep 2026", title: "Converted to store credit", points: -500 },
  { id: "p4", date: "15 Sep 2026", title: "Birthday bonus", points: +300 },
];

const STATUS_STYLES = {
  "On the way": "bg-amber-50 text-amber-700",
  Delivered: "bg-emerald-50 text-emerald-700",
};

// MY ORDERS - past orders with one-tap reorder
function OrdersSection() {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const orders = ORDERS.map((order) => {
    const lines = order.items
      .map((item) => ({ ...item, product: getProductBySlug(item.slug) }))
      .filter((line) => line.product);
    const total = lines.reduce(
      (sum, line) => sum + line.product.price * line.qty,
      0,
    );
    return { ...order, lines, total };
  });

  function reorder(order) {
    order.lines.forEach(({ product, qty }) => {
      addItem({
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        currency: product.currency,
        image: product.images?.[0],
        size: product.sizes?.includes("M") ? "M" : product.sizes?.[0],
        color: product.colors?.[0]?.name ?? "",
        quantity: qty,
      });
    });
    showToast(`Order #${order.id} added to your cart`);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#a51e22]">My Orders</h2>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order.id}
            className="rounded-2xl border border-[#eee7e1] bg-white p-4 shadow-xs sm:p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-stone-900">#{order.id}</p>
                <p className="text-xs text-stone-500">{order.date}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[order.status] ?? "bg-stone-100 text-stone-600"}`}
              >
                {order.status}
              </span>
            </div>

            <ul className="mt-4 space-y-3 border-t border-stone-100 pt-4">
              {order.lines.map(({ product, qty }) => (
                <li key={product.slug} className="flex items-center gap-3">
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                    <Image
                      src={product.images[0]}
                      alt=""
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </span>
                  <span className="min-w-0 flex-1 text-sm text-stone-800">
                    {product.name}
                    <span className="text-stone-400"> × {qty}</span>
                  </span>
                  <span className="text-sm font-semibold text-stone-900">
                    {formatPrice(product.price * qty, product.currency)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4">
              <p className="text-sm text-stone-600">
                Total{" "}
                <span className="font-bold text-[#a51e22]">
                  {formatPrice(order.total, "BDT")}
                </span>
              </p>
              <div className="flex gap-2">
                {order.status === "On the way" ? (
                  <Link
                    href="/track-order"
                    className="rounded-full border border-[#a51e22] px-4 py-2 text-xs font-semibold text-[#a51e22]"
                  >
                    Track order
                  </Link>
                ) : null}
                <button
                  type="button"
                  onClick={() => reorder(order)}
                  className="rounded-full bg-[#a51e22] px-4 py-2 text-xs font-semibold text-white"
                >
                  Reorder
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// REWARDS - tier progress, redeemable treats and points history
function RewardsSection() {
  const { showToast } = useToast();
  const currentTier =
    [...REWARD_TIERS].reverse().find((tier) => REWARD_POINTS >= tier.min) ??
    REWARD_TIERS[0];
  const nextTier = REWARD_TIERS.find((tier) => tier.min > REWARD_POINTS);
  const progress = nextTier
    ? ((REWARD_POINTS - currentTier.min) / (nextTier.min - currentTier.min)) * 100
    : 100;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#a51e22]">Rewards</h2>

      <div className="rounded-2xl bg-[#a51e22] p-5 text-white shadow-xs sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#f5b54a]">
          ERP17 Rewards · {currentTier.name} Member
        </p>
        <p className="mt-2 text-3xl font-black">
          {REWARD_POINTS.toLocaleString()}{" "}
          <span className="text-base font-semibold">points</span>
        </p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-[#f5b54a]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-white/80">
          {nextTier
            ? `${(nextTier.min - REWARD_POINTS).toLocaleString()} more points to reach ${nextTier.name}`
            : "You are at the top tier — thank you!"}
        </p>
      </div>

      <div>
        <h3 className="mb-3 text-base font-bold text-stone-900">Membership tiers</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {REWARD_TIERS.map(({ name, min, icon: Icon, perk }) => {
            const active = name === currentTier.name;
            return (
              <div
                key={name}
                className={`rounded-2xl border bg-white p-4 shadow-xs ${
                  active ? "border-[#a51e22] ring-1 ring-[#a51e22]" : "border-[#eee7e1]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#a51e22]/10 text-[#a51e22]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  {active ? (
                    <span className="rounded-full bg-[#a51e22] px-2.5 py-0.5 text-xs font-semibold text-white">
                      Current
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 font-bold text-stone-900">{name}</p>
                <p className="text-xs text-stone-500">
                  {min === 0 ? "Starting tier" : `From ${min.toLocaleString()} points`}
                </p>
                <p className="mt-2 text-sm text-stone-600">{perk}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-base font-bold text-stone-900">Redeem your points</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {REDEEMABLE.map((reward) => {
            const canRedeem = REWARD_POINTS >= reward.points;
            return (
              <div
                key={reward.id}
                className="flex items-center gap-3 rounded-2xl border border-[#eee7e1] bg-white p-4 shadow-xs"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5b54a]/20 text-[#a51e22]">
                  <LuGift className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-stone-900">{reward.title}</p>
                  <p className="text-xs text-stone-500">
                    {reward.points.toLocaleString()} points
                  </p>
                </div>
                <button
                  type="button"
                  disabled={!canRedeem}
                  onClick={() => showToast(`${reward.title} added as a voucher`)}
                  className="rounded-full bg-[#a51e22] px-4 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-500"
                >
                  {canRedeem ? "Redeem" : "Locked"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-[#eee7e1] bg-white shadow-xs">
        <h3 className="border-b border-stone-100 px-5 py-4 text-base font-bold text-stone-900">
          Points history
        </h3>
        <ul>
          {POINTS_HISTORY.map((entry) => (
            <li
              key={entry.id}
              className="flex items-center justify-between border-b border-stone-100 px-5 py-3.5 last:border-b-0"
            >
              <div>
                <p className="text-sm font-semibold text-stone-800">{entry.title}</p>
                <p className="text-xs text-stone-500">{entry.date}</p>
              </div>
              <span
                className={`text-sm font-bold ${
                  entry.points > 0 ? "text-emerald-600" : "text-[#a51e22]"
                }`}
              >
                {entry.points > 0 ? "+" : ""}
                {entry.points} pts
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// FAVOURITES - dishes saved with the heart button
function FavouritesSection() {
  const { items, removeItem } = useWishlist();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#a51e22]">Favourites</h2>
      {items.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-stone-200 bg-white px-6 py-14 text-center">
          <IconHeart className="h-8 w-8 text-[#a51e22]" />
          <p className="mt-3 text-base font-semibold text-stone-800">
            No favourite dishes yet
          </p>
          <p className="mt-1 text-sm text-stone-500">
            Tap the heart on any dish to save it here.
          </p>
          <Link
            href="/shop"
            className="mt-5 rounded-full bg-[#a51e22] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Browse menu
          </Link>
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {items.map((item) => (
            <li
              key={item.productId}
              className="flex items-center gap-3 rounded-2xl border border-[#eee7e1] bg-white p-3 shadow-xs"
            >
              <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                {item.image ? (
                  <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
                ) : null}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-stone-900">{item.name}</p>
                <p className="text-sm font-semibold text-[#a51e22]">
                  {formatPrice(item.price, item.currency)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.productId)}
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-stone-500 hover:bg-stone-100"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// NOTIFICATIONS - slide-in drawer from the bell icon
function NotificationsDrawer({ open, onClose, notifications, onMarkRead, onMarkAllRead }) {
  const [filter, setFilter] = useState("all");
  const unread = notifications.filter((n) => !n.read).length;
  const shown =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[90]">
          <motion.button
            type="button"
            aria-label="Close notifications"
            onClick={onClose}
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Notifications"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#fcf9f6] shadow-2xl"
          >
            <div className="flex shrink-0 items-center justify-between gap-3 bg-[#a51e22] px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                  <IconBell className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-base font-bold leading-tight">Notifications</h2>
                  <p className="text-xs text-white/75">
                    {unread > 0 ? `${unread} unread` : "You're all caught up"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close notifications"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
                  <path d="M18 6 6 18" strokeLinecap="round" />
                  <path d="m6 6 12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex shrink-0 gap-2 overflow-x-auto border-b border-[#eee7e1] bg-white px-5 py-3 scrollbar-none">
              {NOTIFICATION_FILTERS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium ${
                    filter === item.id
                      ? "bg-[#a51e22] text-white"
                      : "bg-stone-100 text-stone-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {shown.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                  <LuBellOff className="h-8 w-8 text-stone-400" aria-hidden />
                  <p className="mt-3 text-sm text-stone-500">No notifications here yet.</p>
                </div>
              ) : (
                <ul>
                  {shown.map(({ id, icon: Icon, title, text, time, read }) => (
                    <li key={id} className="border-b border-[#eee7e1]">
                      <button
                        type="button"
                        onClick={() => onMarkRead(id)}
                        className={`flex w-full items-start gap-3 px-5 py-4 text-left ${
                          read ? "bg-white" : "bg-[#fff3e6]"
                        }`}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#a51e22]/10 text-[#a51e22]">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-start justify-between gap-3">
                            <span
                              className={`text-sm text-stone-900 ${read ? "font-semibold" : "font-bold"}`}
                            >
                              {title}
                            </span>
                            <span className="shrink-0 text-xs text-stone-400">{time}</span>
                          </span>
                          <span className="mt-0.5 block text-sm text-stone-600">{text}</span>
                        </span>
                        {!read ? (
                          <span
                            className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#a51e22]"
                            aria-label="Unread"
                          />
                        ) : null}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {unread > 0 ? (
              <div className="shrink-0 border-t border-[#eee7e1] bg-white p-4">
                <button
                  type="button"
                  onClick={onMarkAllRead}
                  className="w-full rounded-full bg-[#a51e22] py-3 text-sm font-semibold text-white"
                >
                  Mark all as read
                </button>
              </div>
            ) : null}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

// ACCOUNT DETAIL VIEW - account details page
function AccountDetailView({ onBack }) {
  const [activeTab, setActiveTab] = useState("details"); // "details" | "transactions"
  const [selectedAcc, setSelectedAcc] = useState("account-1");
  const [showBal, setShowBal] = useState(false);

  const transactions = [
    { id: "t1", date: "12 Oct 2026", title: "Paid for order #ERP-10482", amount: "- ৳ 900.00", type: "debit" },
    { id: "t2", date: "06 Oct 2026", title: "Refund for missing item", amount: "+ ৳ 220.00", type: "credit" },
    { id: "t3", date: "28 Sep 2026", title: "Reward points converted", amount: "+ ৳ 500.00", type: "credit" },
    { id: "t4", date: "15 Sep 2026", title: "Birthday treat bonus", amount: "+ ৳ 300.00", type: "credit" },
  ];

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* Top Bar with Back Link & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 transition hover:text-[#a51e22]"
        >
          <span className="text-base font-bold">‹</span> My Account
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            className="flex items-center gap-1 sm:gap-1.5 rounded-xl border border-[#a51e22]/30 bg-white px-2.5 sm:px-3 py-1.5 text-xs sm:text-xs font-semibold text-[#a51e22] shadow-2xs hover:bg-[#fff9f5] transition"
          >
            <span>+</span> Redeem Gift Card
          </button>
          <button
            type="button"
            className="flex items-center gap-1 sm:gap-1.5 rounded-xl border border-stone-200 bg-white px-2.5 sm:px-3 py-1.5 text-xs sm:text-xs font-semibold text-stone-700 shadow-2xs hover:bg-stone-50 transition"
          >
            <IconGear className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-stone-500" /> Settings
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-12 items-start">
        {/* Left Column: Accounts & Cards Selector */}
        <div className="space-y-4 lg:col-span-4 xl:col-span-4">
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">Accounts &amp; Balance</h4>
            {/* Account 1 Card (Selected) */}
            <div
              onClick={() => setSelectedAcc("account-1")}
              className={`relative flex flex-col justify-between rounded-2xl border p-4 shadow-2xs cursor-pointer transition ${
                selectedAcc === "account-1"
                  ? "border-[#a51e22] bg-white ring-2 ring-[#a51e22]/10"
                  : "border-stone-200 bg-stone-50/50 hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wide text-[#a51e22]">
                  {showBal ? "1,450 PTS" : "b******.xx"}
                </span>
                <span className="text-[#f5b54a] text-sm">⭐</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#a51e22] text-white font-black text-xs">
                  <BrandMark className="h-4 w-auto text-[var(--secondary)]" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-stone-800">ERP17 REWARDS</p>
                  <p className="text-xs text-[#f5b54a] font-semibold">Bronze Member</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">Store Credit Cards</h4>
            {/* Card 1 */}
            <div
              onClick={() => setSelectedAcc("card-1")}
              className={`flex flex-col justify-between rounded-2xl border p-4 shadow-2xs cursor-pointer transition ${
                selectedAcc === "card-1"
                  ? "border-[#a51e22] bg-white ring-2 ring-[#a51e22]/10"
                  : "border-stone-200 bg-white hover:border-stone-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wide text-stone-700">
                  b******.xx
                </span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-7 w-8 shrink-0 items-center justify-center rounded bg-[#f5b54a] text-[8px] font-black text-white">
                  ERP
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-stone-800">STORE CREDIT CARD</p>
                  <p className="text-xs text-stone-400">ID: ERP-89274</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#a51e22] hover:underline"
            >
              + Add Gift Voucher
            </button>
          </div>
        </div>

        {/* Right Main Column: Passbook Card, Tabs & Details */}
        <div className="space-y-4 sm:space-y-5 lg:col-span-8 xl:col-span-8">
          {/* Top Account Passbook Hero Card */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#f5b54a]/30 bg-gradient-to-r from-[#a51e22] via-[#7f1519] to-[#5e1013] p-5 sm:p-6 text-white shadow-md">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-[#f5b54a]">ERP17 STORE CREDIT</p>
                <p className="text-xs font-medium text-stone-300">ID: ERP-89274</p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5b54a]/20 text-[#f5b54a] font-bold text-sm">
                ✦
              </div>
            </div>

            <div className="mt-6 sm:mt-8">
              <p className="text-xs font-medium text-stone-300">Available Credit Balance</p>
              <p className="text-xl font-black text-white sm:text-3xl">৳ 2,500.00</p>
            </div>
          </div>

          {/* Navigation Tabs (Account Details | Transactions) */}
          <div className="border-b border-stone-200">
            <div className="flex gap-6 sm:gap-8">
              <button
                type="button"
                onClick={() => setActiveTab("details")}
                className={`pb-2.5 sm:pb-3 text-xs font-bold transition border-b-2 ${
                  activeTab === "details"
                    ? "border-[#a51e22] text-[#a51e22]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                Account Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("transactions")}
                className={`pb-2.5 sm:pb-3 text-xs font-bold transition border-b-2 ${
                  activeTab === "transactions"
                    ? "border-[#a51e22] text-[#a51e22]"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                Transactions History
              </button>
            </div>
          </div>

          {/* Tab 1: Account Details Content */}
          {activeTab === "details" ? (
            <div className="rounded-2xl border border-[#eee7e1] bg-white p-4 sm:p-5 shadow-2xs">
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-stone-400">Membership Tier</p>
                  <p className="text-xs font-bold text-[#a51e22]">BRONZE MEMBER</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-400">Total Earned Points</p>
                  <p className="text-xs font-bold text-[#f5b54a]">1,450 PTS</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-stone-400">Member Opening Date</p>
                  <p className="text-xs font-bold text-stone-800">05 Nov 2023</p>
                </div>
              </div>
            </div>
          ) : (
            /* Tab 2: Transactions Content */
            <div className="overflow-hidden rounded-2xl border border-[#eee7e1] bg-white shadow-2xs">
              <div className="divide-y divide-stone-100">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3.5 sm:p-4 text-xs">
                    <div>
                      <p className="font-bold text-stone-800">{tx.title}</p>
                      <p className="text-xs text-stone-400">{tx.date}</p>
                    </div>
                    <span className={`font-bold ${tx.type === "credit" ? "text-emerald-600" : "text-[#a51e22]"}`}>
                      {tx.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Cards - EXACT SCREENSHOT MATCH */}
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 rounded-2xl border border-[#eee7e1] bg-white p-3.5 sm:p-4 shadow-2xs transition hover:bg-[#fff9f5] hover:border-[#a51e22]/30 group"
            >
              <IconChequeBook className="h-5 w-5 text-[#a51e22] transition group-hover:scale-110" />
              <span className="text-xs font-bold text-stone-800">Redeem Points</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2.5 rounded-2xl border border-[#eee7e1] bg-white p-3.5 sm:p-4 shadow-2xs transition hover:bg-[#fff9f5] hover:border-[#a51e22]/30 group"
            >
              <IconShareNetwork className="h-5 w-5 text-[#a51e22] transition group-hover:scale-110" />
              <span className="text-xs font-bold text-stone-800">Invite a Friend</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Dashboard Content View - with separate right column
function MobileDashboardHome({ onNavigate }) {
  const [showRewards, setShowRewards] = useState(false);
  const [showCredit, setShowCredit] = useState(false);
  const [tab, setTab] = useState("quick");
  const [quickOpen, setQuickOpen] = useState(false);

  const accounts = [
    {
      id: "rewards",
      shown: showRewards,
      toggle: () => setShowRewards((value) => !value),
      masked: "••••••",
      value: "1,450 PTS",
      title: "ERP17 REWARDS",
      detail: "Bronze Member",
      mark: "★",
    },
    {
      id: "credit",
      shown: showCredit,
      toggle: () => setShowCredit((value) => !value),
      masked: "••••••",
      value: "৳ 2,500",
      title: "STORE CREDIT",
      detail: "ERP-89274",
      mark: "ERP",
    },
  ];

  const quickItems = quickOpen
    ? QUICK_SHOPPING_ACTIONS
    : QUICK_SHOPPING_ACTIONS.slice(0, 3);

  return (
    <div className="lg:hidden">
      <div className="relative z-10 -mr-3">
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 scrollbar-none">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="w-[78%] shrink-0 snap-start bg-white/50 overflow-hidden rounded-[1.35rem] border border-white p-4 text-left shadow-[0_8px_24px_rgba(255,255,255,0.08)]"
            style={{
              backdropFilter: "blur(16px) saturate(1.25)",
              WebkitBackdropFilter: "blur(16px) saturate(1.25)",
              backgroundColor: "rgba(255, 255, 255, 0.58)",
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(255,248,244,0.5) 58%, rgba(255,236,228,0.38) 100%)",
            }}
          >
            <div className="flex items-center gap-2 text-lg font-semibold tracking-wide text-[#a51e22]">
              <button
                type="button"
                onClick={() => onNavigate("account-detail")}
                className="text-left"
              >
                {account.shown ? account.value : account.masked}
              </button>
              <button
                type="button"
                onClick={account.toggle}
                className="text-stone-400"
                aria-label="Toggle balance visibility"
              >
                {account.shown ? (
                  <IconEye className="h-4 w-4" />
                ) : (
                  <IconEyeSlash className="h-4 w-4" />
                )}
              </button>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("account-detail")}
              className="mt-4 flex w-full items-center gap-2.5 text-left"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#a51e22] text-xs font-bold text-white">
                {account.id === "rewards" ? (
                  <BrandMark className="h-4 w-auto text-[var(--secondary)]" />
                ) : (
                  account.mark
                )}
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-wide text-stone-800">
                  {account.title}
                </span>
                <span className="block text-xs text-stone-500">{account.detail}</span>
              </span>
            </button>
          </div>
        ))}
        </div>
      </div>

      <div className="relative z-0 -mx-3 -mt-[3.7rem] rounded-t-xl bg-white px-3 pt-[4.7rem]">
      <div className="space-y-3.5">
      <div className="relative rounded-[1.35rem] bg-white px-3 pb-2 pt-3.5 shadow-[0_8px_24px_rgba(165,30,34,0.06)]">
        <div className="grid grid-cols-2">
          {[
            { id: "quick", label: "Quick Order", icon: LuShoppingBag },
            { id: "favourites", label: "Favourites", icon: LuSparkle },
          ].map((item) => {
            const TabIcon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`flex items-center justify-center gap-1.5 rounded-none pb-2.5 text-sm font-semibold ${
                  active
                    ? "border-b-2 border-[#a51e22] text-[#a51e22]"
                    : "border-b border-stone-100 text-stone-400"
                }`}
              >
                <TabIcon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                {item.label}
              </button>
            );
          })}
        </div>
        {tab === "quick" ? (
          <button
            type="button"
            onClick={() => setQuickOpen((value) => !value)}
            aria-expanded={quickOpen}
            aria-label={quickOpen ? "Show fewer actions" : "Show more actions"}
            className="absolute top-1/2 right-0 z-10 flex h-14 w-7 -translate-y-1/2 items-center justify-center rounded-l-xl bg-stone-200/90 text-stone-500 shadow-sm"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="h-4 w-4" aria-hidden>
              <path d="M14 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : null}

        {tab === "quick" ? (
          <div className="grid grid-cols-3 gap-y-4 px-1 pr-5 pt-5">
            {quickItems.map((item) => {
              const IconComponent = item.icon;
              const inner = (
                <>
                  <IconComponent className="h-7 w-7 stroke-[1.6]" />
                  <span className="text-xs font-medium leading-tight text-stone-700">
                    {item.label}
                  </span>
                </>
              );
              const className = "flex flex-col items-center gap-2 text-center text-[#a51e22]";
              if (item.href) {
                return (
                  <Link key={item.id} href={item.href} className={className}>
                    {inner}
                  </Link>
                );
              }
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.idNav || "dashboard")}
                  className={className}
                >
                  {inner}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto px-1 pt-5">
            {FAVORITES_LIST.map((fav) => (
              <Link
                key={fav.id}
                href="/shop"
                className="flex w-20 shrink-0 flex-col items-center text-center"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold bg-[#f5ebd9] ring-2 ring-[#f5b54a]/40`}
                >
                  <span className="relative block h-full w-full overflow-hidden rounded-full">
                  {fav.image ? (
                    <Image src={fav.image} alt="" fill sizes="48px" className="object-cover" />
                  ) : null}
                </span>
                </span>
                <span className="mt-1.5 line-clamp-1 w-full text-xs font-semibold text-stone-800">
                  {fav.name}
                </span>
              </Link>
            ))}
          </div>
        )}

        {tab === "quick" ? (
          <button
            type="button"
            onClick={() => setQuickOpen((value) => !value)}
            aria-expanded={quickOpen}
            aria-label={quickOpen ? "Show fewer actions" : "Show more actions"}
            className="mx-auto mt-4 flex h-8 w-full items-center justify-center text-stone-400"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`h-5 w-5 transition-transform ${quickOpen ? "rotate-180" : ""}`}
              aria-hidden
            >
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : null}
      </div>

      <div className="flex items-center gap-3 rounded-[1.35rem] border border-[#a51e22]/25 bg-gradient-to-r from-[#a51e22]/20 to-[#f5b54a]/45 px-4 py-3.5 shadow-sm">
        <IconGift className="h-8 w-8 shrink-0 text-[#a51e22]" />
        <div>
          <p className="text-sm font-bold leading-snug text-[#a51e22]">
            Spend &amp; Earn! Get Rewards on Every Order.
          </p>
          <p className="mt-1 text-xs leading-relaxed text-stone-600">
              Order from the ERP17 Restaurant menu and earn reward points on every checkout.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.35rem] bg-white shadow-[0_8px_24px_rgba(165,30,34,0.05)]">
        <h3 className="px-4 pb-3 pt-4 text-[15px] font-semibold text-stone-800">My Orders</h3>
        <button
          type="button"
          onClick={() => onNavigate("orders")}
          className="mt-2 flex w-full items-center gap-3 border-t border-stone-100 px-4 py-3.5 text-left"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#a51e22]/5 text-[#a51e22]">
            <IconPackage className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-stone-900">Track an order</span>
            <span className="block text-xs text-stone-500">
              See your live delivery status and past orders.
            </span>
          </span>
          <IconChevronRight className="h-4 w-4 text-stone-400" />
        </button>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-stone-800">Offers &amp; Vouchers</h3>
          <Link href="/shop" className="text-xs font-bold text-[#a51e22]">
            View All &gt;
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {OFFERS_DATA.map((offer) => (
            <div
              key={offer.id}
              className="flex overflow-hidden rounded-2xl border border-[#eee7e1] bg-white shadow-xs"
            >
              <div className="flex w-7 shrink-0 items-center justify-center bg-[#a51e22] px-1">
                <span className="rotate-180 text-xs font-black uppercase tracking-widest text-[#f5b54a] [writing-mode:vertical-rl]">
                  {offer.tag}
                </span>
              </div>
              <div className="flex min-w-0 flex-1 items-center gap-3 p-3">
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0">
                  <span className="mb-1 inline-block rounded bg-[#a51e22] px-1.5 py-0.5 text-[8px] font-extrabold uppercase text-white">
                    {offer.badge}
                  </span>
                  <h4 className="truncate text-xs font-bold text-stone-900">{offer.title}</h4>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-stone-500">
                    {offer.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      </div>
    </div>
  );
}

function DashboardHomeView({ onNavigate, wishCount }) {
  // Balance visibility toggles
  const [showAccountBal, setShowAccountBal] = useState(false);
  const [showCardBal, setShowCardBal] = useState(false);

  return (
    <>
    <MobileDashboardHome onNavigate={onNavigate} />
    <div className="hidden w-full lg:grid gap-4 sm:gap-5 lg:gap-6 lg:grid-cols-12 items-start">
      {/* LEFT MAIN COLUMN (spans 8 of 12 cols on desktop) */}
      <div className="w-full min-w-0 space-y-4 sm:space-y-5 lg:col-span-8 xl:col-span-8">
        {/* TOP CARDS ROW (Rewards, Store Credit, View All) */}
        <div className="grid grid-cols-[1fr_1fr_auto] gap-2.5 sm:gap-3">
          {/* Account Card 1: Rewards */}
          <div
            onClick={() => onNavigate("account-detail")}
            className="flex flex-col justify-between rounded-2xl border border-[#eee7e1] bg-white p-3 shadow-xs transition hover:shadow-md cursor-pointer group min-w-0"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wide text-[#a51e22] truncate">
                {showAccountBal ? "1,450 PTS" : "••••••"}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAccountBal((v) => !v);
                }}
                className="ml-1 shrink-0 text-stone-400 transition hover:text-[#a51e22]"
                aria-label="Toggle points visibility"
              >
                {showAccountBal ? <IconEye className="h-3.5 w-3.5" /> : <IconEyeSlash className="h-3.5 w-3.5" />}
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#a51e22] text-white font-bold text-xs shadow-xs">
                <BrandMark className="h-4 w-auto text-[var(--secondary)]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-stone-800 group-hover:text-[#a51e22] transition truncate">ERP17 REWARDS</p>
                <p className="text-xs text-[#f5b54a] font-semibold truncate">Bronze Member</p>
              </div>
            </div>
          </div>

          {/* Account Card 2: Store Credit */}
          <div
            onClick={() => onNavigate("account-detail")}
            className="flex flex-col justify-between rounded-2xl border border-[#eee7e1] bg-white p-3 shadow-xs transition hover:shadow-md cursor-pointer group min-w-0"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wide text-[#a51e22] truncate">
                {showCardBal ? "৳ 2,500" : "••••••"}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCardBal((v) => !v);
                }}
                className="ml-1 shrink-0 text-stone-400 transition hover:text-[#a51e22]"
                aria-label="Toggle credit visibility"
              >
                {showCardBal ? <IconEye className="h-3.5 w-3.5" /> : <IconEyeSlash className="h-3.5 w-3.5" />}
              </button>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#f5b54a] font-extrabold text-[8px] text-white tracking-tighter shadow-xs">
                ERP
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-stone-800 group-hover:text-[#a51e22] transition truncate">STORE CREDIT</p>
                <p className="text-xs text-stone-400 truncate">ERP-89274</p>
              </div>
            </div>
          </div>

          {/* View All — sits to the right of the two cards */}
          <div
            className="flex items-center justify-center rounded-2xl border border-[#eee7e1] bg-white px-5 py-3 shadow-xs hover:bg-[#fff9f5] transition cursor-pointer"
            onClick={() => onNavigate("account-detail")}
          >
            <div className="flex flex-col items-center gap-1.5 text-center">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#a51e22]/10 text-[#a51e22]">
                <IconChevronRight className="h-4 w-4" />
              </span>
              <span className="whitespace-nowrap text-xs font-semibold text-[#a51e22]">View All</span>
            </div>
          </div>
        </div>

        {/* QUICK SHOPPING CARD */}
        <div className="rounded-2xl border border-[#eee7e1] bg-white p-3.5 sm:p-5 shadow-xs">
          <h3 className="text-sm sm:text-base font-semibold text-stone-800">Quick Order &amp; Services</h3>
          <hr className="my-2.5 sm:my-3 border-stone-100" />

          <div className="grid grid-cols-5 gap-y-4 gap-x-1 sm:gap-y-5 sm:gap-x-4">
            {QUICK_SHOPPING_ACTIONS.map((item) => {
              const IconComponent = item.icon;
              const content = (
                <>
                  <span className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#a51e22]/5 text-[#a51e22] transition group-hover:bg-[#a51e22]/10 group-hover:scale-110">
                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 stroke-[1.6]" />
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-stone-700 group-hover:text-[#a51e22] leading-tight">
                    {item.label}
                  </span>
                </>
              );

              if (item.href) {
                return (
                  <Link key={item.id} href={item.href} className="group flex flex-col items-center gap-1.5 sm:gap-2 text-center transition hover:opacity-80">
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.idNav || "dashboard")}
                  className="group flex flex-col items-center gap-1.5 sm:gap-2 text-center transition hover:opacity-80"
                >
                  {content}
                </button>
              );
            })}
          </div>
        </div>

        {/* MY FAVOURITE COLLECTIONS */}
        <div className="rounded-2xl border border-[#eee7e1] bg-white p-3.5 sm:p-5 shadow-xs overflow-hidden">
          <h3 className="text-sm sm:text-base font-semibold text-stone-800">My Favourite Dishes</h3>

          <div className="mt-3 -mx-3.5 sm:-mx-5 flex items-center gap-3 overflow-x-auto px-3.5 sm:px-5 pb-2 scrollbar-none">
            {FAVORITES_LIST.map((fav) => (
              <Link
                key={fav.id}
                href="/shop"
                className="flex w-20 sm:w-24 shrink-0 flex-col items-center text-center cursor-pointer transition hover:opacity-80"
              >
                <div
                  className={`flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full text-sm font-bold shadow-xs bg-[#f5ebd9] ring-2 ring-[#f5b54a]/40`}
                >
                  <span className="relative block h-full w-full overflow-hidden rounded-full">
                    {fav.image ? (
                      <Image src={fav.image} alt="" fill sizes="52px" className="object-cover" />
                    ) : null}
                  </span>
                </div>
                <span className="mt-1.5 text-xs sm:text-xs font-semibold text-stone-800 line-clamp-1 w-full">
                  {fav.name}
                </span>
                <span className="mt-0.5 text-xs sm:text-xs text-stone-400 line-clamp-1 w-full">
                  {fav.type}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* OFFERS & VOUCHERS SECTION */}
        <div className="min-w-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm sm:text-base font-bold text-stone-800">Offers &amp; Vouchers</h3>
            <Link
              href="/shop"
              className="text-xs font-bold text-[#a51e22] hover:underline"
            >
              View All &gt;
            </Link>
          </div>

          {/* Mobile: vertical stack. Desktop: horizontal scroll */}
          <div className="grid grid-cols-1 gap-3 sm:hidden">
            {OFFERS_DATA.map((offer) => (
              <div
                key={offer.id}
                className="group flex overflow-hidden rounded-2xl border border-[#eee7e1] bg-white shadow-xs"
              >
                <div className="flex w-7 shrink-0 items-center justify-center bg-[#a51e22] px-1">
                  <span className="rotate-180 text-xs font-black uppercase tracking-widest text-[#f5b54a] [writing-mode:vertical-rl]">
                    {offer.tag}
                  </span>
                </div>
                <div className="flex flex-1 min-w-0 items-center gap-3 p-3">
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="inline-block rounded bg-[#a51e22] px-1.5 py-0.5 text-[8px] font-extrabold uppercase text-white mb-1">
                      {offer.badge}
                    </span>
                    <h4 className="text-xs font-bold text-stone-900 truncate">{offer.title}</h4>
                    <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-stone-500">
                      {offer.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: horizontal scroll cards */}
          <div className="hidden sm:flex gap-4 overflow-x-auto pb-2 scrollbar-none">
            {OFFERS_DATA.map((offer) => (
              <div
                key={offer.id}
                className="group flex w-[280px] shrink-0 overflow-hidden rounded-2xl border border-[#eee7e1] bg-white shadow-xs transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex w-9 shrink-0 items-center justify-center bg-[#a51e22] px-1">
                  <span className="rotate-180 text-xs font-black uppercase tracking-widest text-[#f5b54a] [writing-mode:vertical-rl]">
                    {offer.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="relative h-36 w-full overflow-hidden rounded-md bg-stone-100">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="280px"
                    />
                    <span className="absolute right-2 top-2 rounded bg-[#a51e22] px-1.5 py-0.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-xs">
                      {offer.badge}
                    </span>
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-bold text-stone-900">{offer.title}</h4>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-500">
                      {offer.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DEDICATED RIGHT COLUMN FOR BANNER CARDS ONLY */}
      <div className="w-full min-w-0 space-y-3 lg:col-span-4 xl:col-span-4">
        {/* Banner 1: Spend & Earn */}
        <div className="flex items-center gap-3 rounded-2xl border border-[#f5b54a]/40 bg-gradient-to-r from-[#fffbf7] to-[#fff3e6] p-3 shadow-xs">
          <IconGift className="h-7 w-7 shrink-0 text-[#a51e22]" />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold leading-snug text-[#a51e22]">
              Spend &amp; Earn! Get Rewards on Every Order.
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-stone-600">
              Order from the ERP17 Restaurant menu and earn reward points on every checkout.
            </p>
          </div>
        </div>

        {/* Banner 2: Live order tracking */}
        <div className="flex items-center gap-3 rounded-2xl border border-amber-200/80 bg-gradient-to-r from-[#fffaf3] to-[#fdf4e8] p-3 shadow-xs">
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold leading-snug text-[#a51e22]">
              Track Your Food Live!
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-stone-600">
              See where your order is — from our kitchen to your door.
            </p>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-xs">
            📑
          </div>
        </div>

        {/* Empty space below right column as requested */}
      </div>
    </div>
    </>
  );
}

// Main Account Dashboard Component
export function AccountDashboard() {
  const router = useRouter();
  const { user, ready, isAuthenticated, logout } = useAuth();
  const { totalItems: wishCount } = useWishlist();

  const [activeSection, setActiveSection] = useState("dashboard");
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const markNotificationRead = (id) =>
    setNotifications((list) =>
      list.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  const markAllNotificationsRead = () =>
    setNotifications((list) => list.map((n) => ({ ...n, read: true })));
  const [greeting, setGreeting] = useState("Good Afternoon");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchMounted, setSearchMounted] = useState(false);

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  useEffect(() => {
    setSearchMounted(true);
  }, []);

  useEffect(() => {
    if (!searchOpen) return undefined;
    function onKey(event) {
      if (event.key === "Escape") setSearchOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  useEffect(() => {
    if (ready && !isAuthenticated) {
      router.replace("/login?redirect=/account");
    }
  }, [ready, isAuthenticated, router]);

  if (!ready || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-[#fcf9f6] p-6 animate-pulse">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[240px_1fr]">
          <div className="h-96 rounded-2xl bg-stone-200" />
          <div className="h-96 rounded-2xl bg-stone-200" />
        </div>
      </div>
    );
  }

  const firstName = getFirstName(user.name);

  function handleSignOut() {
    logout();
    router.push("/login");
  }

  function renderSection() {
    switch (activeSection) {
      case "dashboard":
        return <DashboardHomeView onNavigate={setActiveSection} wishCount={wishCount} />;
      case "account-detail":
        return <AccountDetailView onBack={() => setActiveSection("dashboard")} />;
      case "orders":
        return <OrdersSection />;
      case "wishlist":
        return <FavouritesSection />;
      case "rewards":
        return <RewardsSection />;
      case "services":
        return <AddressesSection />;
      case "profile":
        return (
          <div className="space-y-6">
            <ProfileSection user={user} />
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-2 text-sm font-semibold text-stone-500 lg:hidden"
            >
              <IconLogout className="h-4 w-4" />
              Log out
            </button>
          </div>
        );
      default:
        return <DashboardHomeView onNavigate={setActiveSection} wishCount={wishCount} />;
    }
  }

  return (
    <div className="min-h-screen bg-[#fcf9f6] text-stone-900 font-sans antialiased overflow-x-clip">
      <NotificationsDrawer
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkRead={markNotificationRead}
        onMarkAllRead={markAllNotificationsRead}
      />
      {searchMounted
        ? createPortal(
            <AnimatePresence>
              {searchOpen ? (
                <motion.form
                  key="dashboard-search"
                  action="/shop"
                  method="get"
                  role="search"
                  aria-label="Search dishes"
                  initial={{ y: "-100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed inset-x-0 top-0 z-[80] flex items-center gap-2 bg-[#a51e22] px-4 py-3 shadow-lg"
                >
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-[var(--secondary)]"
                    aria-label="Close search"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
                      <path d="M18 6 6 18" strokeLinecap="round" />
                      <path d="m6 6 12 12" strokeLinecap="round" />
                    </svg>
                  </button>
                  <div className="relative min-w-0 flex-1">
                    <input
                      type="search"
                      name="q"
                      placeholder="Search dishes"
                      autoFocus
                      className="h-11 w-full rounded-full border border-white/35 bg-white/10 px-4 pr-24 text-sm text-white outline-none placeholder:text-white/70 focus:border-white"
                    />
                    <button
                      type="submit"
                      className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      Search
                    </button>
                  </div>
                </motion.form>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 hidden h-16 items-center justify-between border-b border-[#eee7e1] bg-white px-8 shadow-2xs font-sans lg:flex">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center" aria-label="ERP17 Restaurant home">
          <BrandLogo
            tone="dark"
            markClassName="h-8 w-auto"
            nameClassName="text-2xl"
            taglineClassName="text-xs text-stone-500"
          />
        </Link>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          <Link
            href="/shop"
            className="mr-2 inline-flex items-center gap-2 rounded-full bg-[#a51e22] px-5 py-2 text-sm font-semibold text-white"
          >
            <IconBag className="h-4 w-4" />
            Order food
          </Link>
          <button
            type="button"
            aria-label={searchOpen ? "Close search" : "Search"}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((open) => !open)}
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-stone-600 transition hover:bg-stone-100 hover:text-[#a51e22]"
          >
            <IconSearch className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            type="button"
            aria-label="Rewards"
            onClick={() => setActiveSection("rewards")}
            className={`hidden sm:flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-stone-100 hover:text-[#a51e22] ${
              activeSection === "rewards" ? "bg-[#a51e22]/10 text-[#a51e22]" : "text-stone-600"
            }`}
          >
            <IconTrophy className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label={`Notifications, ${unreadCount} unread`}
            onClick={() => setNotificationsOpen(true)}
            className={`relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full transition hover:bg-stone-100 hover:text-[#a51e22] ${
              notificationsOpen ? "bg-[#a51e22]/10 text-[#a51e22]" : "text-stone-600"
            }`}
          >
            <IconBell className="h-4 w-4 sm:h-5 sm:w-5" />
            {unreadCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#a51e22] px-1 text-[10px] font-bold text-white shadow-xs">
                {unreadCount}
              </span>
            ) : null}
          </button>
        </div>
      </header>

      {/* Main Body Container */}
      <div className="mx-auto flex w-full max-w-[1440px] flex-col lg:flex-row overflow-x-clip">
        {/* Sidebar - Desktop Only */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[260px] shrink-0 flex-col self-start overflow-y-auto border-r border-[#eee7e1] bg-white px-5 py-6 lg:flex">
          {/* User Profile Card */}
          <div className="flex items-start gap-3 px-1">
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f2efe9] text-[#a51e22]">
                <IconUser className="h-7 w-7" />
              </div>
              <button
                type="button"
                onClick={() => setActiveSection("profile")}
                className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-[#f5e6ea] text-[#a51e22] shadow-xs hover:scale-110 transition"
              >
                <IconGear className="h-3 w-3" />
              </button>
            </div>

            <div className="min-w-0 pt-0.5">
              <div className="flex items-center gap-1 text-xs text-stone-500">
                <IconSun className="h-3.5 w-3.5" />
                <span>{greeting}</span>
              </div>
              <p className="truncate text-base font-bold text-stone-900">{firstName}</p>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-[#eee7e1] bg-[#fffaf5] px-2 py-0.5 text-xs font-semibold text-[#a51e22]">
                <IconShield className="h-3 w-3 text-[#f5b54a]" />
                Bronze Member
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex-1 space-y-1 border-t border-stone-100 pt-5">
            {NAV_ITEMS.map((item) => {
              const IconComp = item.icon;
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition ${
                    active
                      ? "border border-[#a51e22]/20 bg-[#a51e22]/5 text-[#a51e22] shadow-2xs"
                      : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                  }`}
                >
                  <IconComp className={`h-5 w-5 ${active ? "text-[#a51e22]" : "text-stone-500"}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer Logout */}
          <div className="mt-auto border-t border-stone-100 pt-4">
            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-stone-500 transition hover:bg-stone-50 hover:text-[#a51e22]"
            >
              <IconLogout className="h-5 w-5" />
              Log out
            </button>
          </div>
        </aside>

        <div
          className={`bg-gradient-to-b from-[#9a3038] via-[#8c1a1e] to-[#a51e22] px-4 pt-3.5 text-white lg:hidden ${
            activeSection === "dashboard" ? "pb-24" : "pb-6"
          }`}
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setActiveSection("profile")}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c45660] text-white"
              aria-label="Profile"
            >
              <IconUser className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <button
                type="button"
                aria-label={searchOpen ? "Close search" : "Search"}
                aria-expanded={searchOpen}
                onClick={() => setSearchOpen((open) => !open)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white"
              >
                <IconSearch className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Rewards"
                onClick={() => setActiveSection("rewards")}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white"
              >
                <IconTrophy className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label={`Notifications, ${unreadCount} unread`}
                onClick={() => setNotificationsOpen(true)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-white"
              >
                <IconBell className="h-5 w-5" />
                {unreadCount > 0 ? (
                  <span className="absolute right-0.5 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#f0c14d] px-1 text-xs font-bold text-[#a51e22]">
                    {unreadCount}
                  </span>
                ) : null}
              </button>
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-sm text-white/75">{greeting}</p>
              <p className="mt-0.5 text-[1.35rem] font-extrabold uppercase leading-tight tracking-wide">
                {user.name}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveSection("account-detail")}
              className="mb-1 shrink-0 text-sm text-white/90"
            >
              View All &gt;
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <main
          className={`min-w-0 w-full flex-1 overflow-x-hidden px-3 sm:px-5 lg:px-8 ${
            activeSection === "dashboard"
              ? "-mt-20 pb-24 pt-0 lg:mt-0 lg:py-6"
              : "py-4 pb-24 lg:py-6"
          }`}
        >
          {renderSection()}
        </main>

        <nav className="fixed inset-x-0 bottom-0 z-40 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_18px_rgba(0,0,0,0.06)] lg:hidden">
          <div className="grid grid-cols-5">
            {[
              { id: "dashboard", label: "Home", icon: IconHome },
              { id: "orders", label: "Orders", icon: IconPackage },
              { id: "shop", label: "Menu", href: "/shop", icon: IconBag },
              { id: "wishlist", label: "Favourites", icon: IconHeart },
              { id: "signout", label: "Sign out", icon: IconLogout, signOut: true },
            ].map((item) => {
              const IconComp = item.icon;
              const active = !item.href && !item.signOut && activeSection === item.id;
              const className = `relative flex flex-col items-center gap-1 rounded-none px-1 pb-2 pt-2 text-xs font-semibold ${
                active ? "text-[#a51e22]" : "text-stone-400"
              }`;
              const inner = (
                <>
                  <span
                    className={`absolute inset-x-0 top-0 mx-auto h-[3px] w-8 rounded-b-full ${
                      active ? "bg-[#a51e22]" : "bg-transparent"
                    }`}
                  />
                  <IconComp className="mt-1 h-5 w-5" />
                  {item.label}
                </>
              );
              if (item.href) {
                return (
                  <Link key={item.id} href={item.href} className={className}>
                    {inner}
                  </Link>
                );
              }
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.signOut ? handleSignOut : () => setActiveSection(item.id)}
                  className={className}
                >
                  {inner}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
