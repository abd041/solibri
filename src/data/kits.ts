export type KitFormatId = "vial" | "disposable" | "reusable" | "premium";
export type PenColour = "black" | "red";

export type KitFormatOption = {
  id: KitFormatId;
  name: string;
  description?: string;
  productSlug?: string;
  active: boolean;
};

export type KitSettings = {
  peptideCategorySlugs: string[];
  formatOptions: KitFormatOption[];
  includedVialBacWaterSlug: string;
  disposableSlug: string;
  reusablePenSlug: string;
  hardCaseSlug: string;
  disposableAddonCents: number;
  reusableAddonCents: number;
  premiumAddonCents: number;
  premiumDiscountCents: number;
  penColours: PenColour[];
};

export const KIT_SETTINGS: KitSettings = {
  peptideCategorySlugs: ["premium-peptides"],
  formatOptions: [
    { id: "vial", name: "Vial", description: "2ml sterile water included", active: true },
    { id: "disposable", name: "Disposable Pen", productSlug: "disposable-pen-kit", active: true },
    { id: "reusable", name: "Reusable Pen Kit", productSlug: "reusable-pen", active: true },
    { id: "premium", name: "Premium Pen Kit", productSlug: "reusable-pen", active: true },
  ],
  includedVialBacWaterSlug: "sterile-water-2ml",
  disposableSlug: "disposable-pen-kit",
  reusablePenSlug: "reusable-pen",
  hardCaseSlug: "hard-shell-pen-case",
  disposableAddonCents: 2500,
  reusableAddonCents: 3500,
  premiumAddonCents: 4500,
  premiumDiscountCents: 500,
  penColours: ["black", "red"],
};

export function colourLabel(colour: PenColour) {
  return colour === "red" ? "Red" : "Black";
}

export function formatAddonCents(id: KitFormatId, settings = KIT_SETTINGS) {
  if (id === "vial") return 0;
  if (id === "disposable") return settings.disposableAddonCents;
  if (id === "reusable") return settings.reusableAddonCents;
  return settings.premiumAddonCents;
}

export function isConfigurableProduct(category: string) {
  return KIT_SETTINGS.peptideCategorySlugs.includes(category);
}
