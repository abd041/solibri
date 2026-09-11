import { colourLabel, formatAddonCents, KIT_SETTINGS, type KitFormatId, type PenColour } from "@/data/kits";
import { getProduct, type Product } from "@/data/products";
import type { CartItemInput } from "@/lib/cart";
import { fromCents, toCents } from "@/lib/money";

export type FormatQty = {
  id: KitFormatId;
  quantity: number;
  colour: PenColour;
};

export function kitOptionNames() {
  return KIT_SETTINGS.formatOptions.filter((o) => o.active).map((o) => o.name);
}

export function formatExtraCents(id: KitFormatId) {
  const option = KIT_SETTINGS.formatOptions.find((o) => o.id === id);
  if (option?.productSlug) {
    const extra = getProduct(option.productSlug);
    if (extra) return toCents(extra.price);
  }
  return formatAddonCents(id);
}

export function kitTotalCents(product: Product, formats: FormatQty[]) {
  const base = toCents(product.price);
  let total = 0;
  for (const row of formats) {
    if (row.quantity <= 0) continue;
    let unit = base + formatExtraCents(row.id);
    if (row.id === "premium") {
      const caseProduct = getProduct(KIT_SETTINGS.hardCaseSlug);
      const caseCents = caseProduct ? toCents(caseProduct.price) : 0;
      unit += Math.max(0, caseCents - KIT_SETTINGS.premiumDiscountCents);
    }
    total += unit * row.quantity;
  }
  return total;
}

export function kitCartLines(product: Product, formats: FormatQty[]): CartItemInput[] {
  const lines: CartItemInput[] = [];
  for (const row of formats) {
    if (row.quantity <= 0) continue;
    const option = KIT_SETTINGS.formatOptions.find((o) => o.id === row.id)!;
    const colourKey = row.id === "reusable" || row.id === "premium" ? `::${row.colour}` : "";
    const kitId = `${product.slug}::${option.id}${colourKey}`;

    lines.push({
      id: `${kitId}::peptide`,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: row.quantity,
      format: product.format,
      kitLabel: option.name,
      kitId,
      role: "primary",
    });

    if (row.id === "vial") {
      const water = getProduct(KIT_SETTINGS.includedVialBacWaterSlug);
      if (water) {
        lines.push({
          id: `${kitId}::water`,
          slug: water.slug,
          name: water.name,
          price: water.price,
          image: water.image,
          quantity: row.quantity,
          format: water.format,
          kitId,
          role: "included",
        });
      }
    }

    if (row.id === "disposable") {
      const pen = getProduct(option.productSlug || KIT_SETTINGS.disposableSlug);
      if (pen) {
        lines.push({
          id: `${kitId}::pen`,
          slug: pen.slug,
          name: pen.name,
          price: pen.price,
          image: pen.image,
          quantity: row.quantity,
          format: pen.format,
          kitLabel: option.name,
          kitId,
          role: "component",
        });
      }
    }

    if (row.id === "reusable" || row.id === "premium") {
      const pen = getProduct(option.productSlug || KIT_SETTINGS.reusablePenSlug);
      if (pen) {
        const label = row.id === "premium" ? option.name : `${option.name} · ${colourLabel(row.colour)}`;
        lines.push({
          id: `${kitId}::pen`,
          slug: pen.slug,
          name: pen.name,
          price: pen.price,
          image: pen.image,
          quantity: row.quantity,
          format: pen.format,
          kitLabel: label,
          kitId,
          role: "component",
        });
      }
    }

    if (row.id === "premium") {
      const hardCase = getProduct(KIT_SETTINGS.hardCaseSlug);
      if (hardCase) {
        const discounted = Math.max(0, hardCase.price - fromCents(KIT_SETTINGS.premiumDiscountCents));
        lines.push({
          id: `${kitId}::case`,
          slug: hardCase.slug,
          name: hardCase.name,
          price: discounted,
          image: hardCase.image,
          quantity: row.quantity,
          format: hardCase.format,
          kitId,
          role: "included",
        });
      }
    }
  }
  return lines;
}
