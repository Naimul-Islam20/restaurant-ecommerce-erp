/** Menu items reuse the `sizes` field as portion sizes. */
export const PORTION_LABELS = {
  XS: "Mini",
  S: "Small",
  M: "Regular",
  L: "Large",
  XL: "Family",
};

export function sizeOptionLabel(size) {
  return PORTION_LABELS[size] ?? size;
}
