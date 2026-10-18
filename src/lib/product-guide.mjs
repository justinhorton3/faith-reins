// Labels follow the selected variant's actual information, including when a
// reference measurement table exists for one color but not another.
export function productGuide(product, variant) {
  const hasMeasurements = !!(variant.guide?.columns?.length && variant.guide?.rows?.length);
  const label = hasMeasurements ? "Size & fit guide" : variant.sizes.length ? "Size information" : product.collection === "Headwear" ? "Fit information" : "Item information";
  return { label, open: "Open " + label.toLowerCase(), close: "Close " + label.toLowerCase(), hasMeasurements };
}
