const CATEGORY_COPY = {
  starters: {
    detailSuffix: "Made to share at the start of the meal.",
    materials:
      "Prepared in the Maaleen kitchen with fresh produce, house spices, and chutneys on the side where noted.",
    care: [
      "Best eaten soon after delivery",
      "Reheat in a pan or oven, not a microwave if the crust should stay crisp",
      "Keep chutneys sealed until serving",
      "Refrigerate leftovers within two hours",
    ],
  },
  mains: {
    detailSuffix: "A full plate built for lunch or dinner.",
    materials:
      "Slow-cooked or grilled to order. Rice, bread, or sides are included only when the dish description says so.",
    care: [
      "Serve hot",
      "Reheat gently with a splash of water for gravies",
      "Store rice and curry in separate containers",
      "Consume within one day if refrigerated",
    ],
  },
  desserts: {
    detailSuffix: "A small sweet course after the main plates.",
    materials:
      "Baked or churned in house. Dairy and nuts are used unless the description says otherwise.",
    care: [
      "Keep chilled until serving, except warm cakes",
      "Warm molten cakes for a few minutes before eating",
      "Do not refreeze melted kulfi",
      "Allergens are listed in the dish notes",
    ],
  },
  beverages: {
    detailSuffix: "Poured cold or hot to go with the meal.",
    materials:
      "Brewed, blended, or pressed to order. Sugar level follows the style you choose.",
    care: [
      "Drink chilled drinks over ice",
      "Hot drinks are best within 30 minutes",
      "Shake lassi before opening",
      "Do not leave dairy drinks in direct sun",
    ],
  },
};

function buildDetails(product, categoryCopy) {
  const colors =
    product.colors?.map((color) => color.name).join(", ") || "house style";
  const sizes = product.sizes?.join(", ") || "regular portion";

  return [
    `${product.name} is served in ${colors}`,
    categoryCopy.detailSuffix,
    `Portions available: ${sizes}`,
    "Cooked in the Maaleen kitchen for delivery and dine-in orders",
    "Spice and sweetness follow the style selected at checkout",
    "Packed so the plate still tastes right when it arrives",
  ];
}

export function getProductInfo(product) {
  const categoryCopy =
    CATEGORY_COPY[product.category] ?? CATEGORY_COPY.mains;
  const colorText =
    product.colors?.map((color) => color.name).join(" and ") || "the house style";

  return {
    preview: `${product.name} is a ${product.category.replace("_", " ")} from the Maaleen kitchen, finished in ${colorText.toLowerCase()} and packed for the table.`,
    moreParagraphs: [
      product.description,
      `Choose ${colorText.toLowerCase()} when you add it. The kitchen plates it the same way for delivery and for guests in the dining room.`,
      "Maaleen serves a full restaurant menu — starters, mains, desserts, and drinks — from one Dhaka kitchen.",
    ],
    details: buildDetails(product, categoryCopy),
    materials: categoryCopy.materials,
    care: categoryCopy.care,
  };
}
