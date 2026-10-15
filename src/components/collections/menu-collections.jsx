import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { BrandMark } from "@/components/layout/brand-logo";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { buildShopEditHref, shopHrefForCategory } from "@/data/shop-edits";
import { getProducts } from "@/lib/products";

export const MENU_CATEGORIES = [
  {
    id: "starters",
    title: "Starters",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
  },
  {
    id: "mains",
    title: "Mains",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
  },
  {
    id: "desserts",
    title: "Desserts",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
  },
  {
    id: "beverages",
    title: "Drinks",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
  },
];

/** Tag-based collections, shown as extra plates on the /collections page. */
export const MENU_TAG_COLLECTIONS = [
  {
    id: "featured",
    title: "Chef's Specials",
    href: buildShopEditHref("featured"),
    tag: "featured",
    image:
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80",
  },
  {
    id: "new",
    title: "New Dishes",
    href: buildShopEditHref("new-arrivals"),
    tag: "new",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
  },
  {
    id: "sale",
    title: "Today's Offers",
    href: buildShopEditHref("sale"),
    tag: "sale",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
  },
  {
    id: "all",
    title: "Full Menu",
    href: buildShopEditHref("full-edit"),
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  },
];

export const MENU_HIGHLIGHTS = [
  {
    eyebrow: "Chef's specials",
    title: "Plates the kitchen is proud of",
    href: buildShopEditHref("featured"),
    tag: "featured",
    image:
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=900&q=80",
  },
  {
    eyebrow: "New on the menu",
    title: "Fresh dishes added this week",
    href: buildShopEditHref("new-arrivals"),
    tag: "new",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80",
  },
  {
    eyebrow: "Today's offers",
    title: "Favourites at a lighter price",
    href: buildShopEditHref("sale"),
    tag: "sale",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&q=80",
  },
];

function dishCount(count) {
  return `${count} ${count === 1 ? "dish" : "dishes"}`;
}

export function MenuDivider({ className = "" }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${className}`}
      aria-hidden
    >
      <span className="h-px w-12 bg-[var(--secondary)]/60" />
      <BrandMark className="h-5 w-auto text-[var(--secondary)]" />
      <span className="h-px w-12 bg-[var(--secondary)]/60" />
    </div>
  );
}

/**
 * Round "plate" tiles, one per menu category. `withCollections` adds the
 * tag-based collections (specials, new, offers, full menu) after them.
 */
export function MenuCategoryGrid({ className = "", withCollections = false }) {
  const products = getProducts();
  const items = [
    ...MENU_CATEGORIES.map((category) => ({
      id: category.id,
      title: category.title,
      image: category.image,
      href: shopHrefForCategory(category.id),
      count: products.filter((p) => p.category === category.id).length,
    })),
    ...(withCollections
      ? MENU_TAG_COLLECTIONS.map((collection) => ({
          id: collection.id,
          title: collection.title,
          image: collection.image,
          href: collection.href,
          count: collection.tag
            ? products.filter((p) => p.tags?.includes(collection.tag)).length
            : products.length,
        }))
      : []),
  ];

  return (
    <ul
      className={`grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 ${className}`}
  >
      {items.map((category) => (
        <li key={category.id}>
          <Link
            href={category.href}
            className="flex flex-col items-center text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--secondary)]"
          >
            <span className="relative block aspect-square w-full max-w-[13rem] rounded-full border border-[var(--secondary)]/50 p-2 sm:p-2.5">
              <span className="relative block h-full w-full overflow-hidden rounded-full bg-stone-200 shadow-[0_12px_30px_-12px_rgba(165,30,34,0.45)]">
                <ImageWithFallback
                  src={category.image}
                  alt=""
                  sizes="(max-width: 640px) 45vw, 208px"
                  imageClassName="object-cover"
                />
              </span>
            </span>
            <span className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-stone-900 sm:text-2xl">
              {category.title}
            </span>
            <span className="mt-0.5 text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
              {dishCount(category.count)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Wide banner cards for tagged dishes (specials, new, offers). */
export function MenuHighlightGrid({ className = "" }) {
  const products = getProducts();
  const count = (tag) => products.filter((p) => p.tags?.includes(tag)).length;

  return (
    <ul className={`grid gap-4 lg:grid-cols-3 lg:gap-5 ${className}`}>
      {MENU_HIGHLIGHTS.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="relative flex aspect-[16/9] overflow-hidden rounded-2xl bg-stone-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--secondary)] lg:aspect-[4/3]"
          >
            <ImageWithFallback
              src={item.image}
              alt=""
              sizes="(max-width: 1024px) 100vw, 33vw"
              imageClassName="object-cover"
            />
            <span
              className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/95 via-[var(--primary)]/60 to-transparent"
              aria-hidden
            />
            <span className="relative z-10 flex max-w-[75%] flex-col justify-center p-6 sm:p-8 lg:p-7">
              <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--secondary)]">
                {item.eyebrow}
              </span>
              <span className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-[1.65rem]">
                {item.title}
              </span>
              <span className="mt-2 text-xs text-white/70">
                {dishCount(count(item.tag))}
              </span>
              <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--secondary)] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--primary)]">
                View dishes
                <LuArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
