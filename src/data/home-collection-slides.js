/**
 * Home collection slider and /collections page — single source of truth.
 */
import { buildShopEditHref } from "@/data/shop-edits";

export const HOME_COLLECTION_SLIDES = [
  {
    id: "s1",
    left: {
      title: "Signature starters",
      description:
        "Samosas, kebabs, and soups to open the table before the main course.",
      href: buildShopEditHref("evening-silhouettes"),
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=900&q=80",
    },
    right: {
      title: "House mains",
      description:
        "Biryani, grills, and wood-fired plates cooked for sharing or a full meal.",
      href: buildShopEditHref("outer-layers"),
      image:
        "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900&q=80",
    },
  },
  {
    id: "s2",
    left: {
      title: "Sweet finishes",
      description:
        "Warm cakes, kulfi, and cheesecake to close the meal.",
      href: buildShopEditHref("everyday-tops"),
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=900&q=80",
    },
    right: {
      title: "Cool drinks",
      description:
        "Chai, lassi, iced coffee, and lemonade poured to order.",
      href: buildShopEditHref("tailored-bottoms"),
      image:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=900&q=80",
    },
  },
  {
    id: "s3",
    left: {
      title: "New arrivals",
      description:
        "Fresh plates added this week — limited portions from the kitchen.",
      href: buildShopEditHref("new-arrivals"),
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80",
    },
    right: {
      title: "The full menu",
      description:
        "Browse starters, mains, desserts, and drinks in one list.",
      href: buildShopEditHref("full-edit"),
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80",
    },
  },
  {
    id: "s4",
    left: {
      title: "Sale",
      description: "Selected dishes marked down for a short time.",
      href: buildShopEditHref("sale"),
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&q=80",
    },
    right: {
      title: "Featured",
      description: "The plates the kitchen keeps sending out first.",
      href: buildShopEditHref("featured"),
      image:
        "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=900&q=80",
    },
  },
];

/** Flat list for the collections page mosaic grid. */
export const HOME_COLLECTION_ITEMS = HOME_COLLECTION_SLIDES.flatMap((slide) => [
  slide.left,
  slide.right,
]);
