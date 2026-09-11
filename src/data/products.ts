export type ProductAction = "configure" | "add";
export type ProductCategory = "premium-peptides" | "accessories" | "premium-10ml-vials";

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductCertificate = {
  label: string;
  url: string;
};

export type Product = {
  slug: string;
  name: string;
  href: string;
  price: number;
  originalPrice?: number;
  size?: string;
  sizeLabel?: string;
  badge?: "Best seller" | "New";
  image: string;
  action: ProductAction;
  category: ProductCategory;
  categoryLabel: string;
  format: string;
  purity?: string;
  tagline: string;
  description: string;
  benefits?: string[];
  specs?: ProductSpec[];
  certificates?: ProductCertificate[];
  inStock: boolean;
};

export const HOW_TO_USE =
  "Store lyophilised vials refrigerated until reconstitution. Standard Kits include 2 ml sterile bacteriostatic water; Premium Pen Kits add a disposable injection pen for precise, single-use reconstitution. For laboratory research use only.";

export const SHIPPING_COPY =
  "Free carbon-neutral shipping on orders over £75. Every Solibri Labs order is backed by our 60-day guarantee — if a batch doesn't meet spec, we'll replace it or refund you in full.";

const PEPTIDE_BENEFITS = [
  "HPLC-verified purity",
  "Certificate of analysis with every batch",
  "Standard Kit (2ml sterile water) or Premium Pen Kit",
  "Discreet, cold-safe UK dispatch",
];

const PEPTIDE_SPECS: ProductSpec[] = [
  { label: "Contents", value: "5 mg lyophilised" },
  { label: "Purity", value: "HPLC-verified" },
  { label: "Kit options", value: "Standard / Premium Pen" },
];

export const products: Product[] = [
  {
    slug: "bpc-157",
    name: "BPC-157",
    href: "/product/bpc-157",
    price: 39.99,
    originalPrice: 49.99,
    size: "5 mg",
    sizeLabel: "5 mg lyophilised",
    badge: "Best seller",
    image: "/products/box.webp",
    action: "configure",
    category: "premium-peptides",
    categoryLabel: "Premium Peptides",
    format: "Premium Peptide",
    purity: "HPLC-verified",
    tagline: "Research-grade pentadecapeptide, HPLC-verified",
    description:
      "BPC-157 (Body Protection Compound-157) is a synthetic pentadecapeptide supplied as a lyophilised powder for laboratory research. Every vial is HPLC-tested for purity and ships with a certificate of analysis. Choose a Standard Kit with 2 ml sterile water, or a Premium Pen Kit presented in a box with a disposable injection pen.",
    benefits: PEPTIDE_BENEFITS,
    specs: PEPTIDE_SPECS,
    certificates: [
      {
        label: "sale certificate",
        url: "https://api.solibrilabs.co.uk/storage/v1/object/public/product-images/certificates/e1c2c0d3-7a88-4393-9bb0-d10aa55cba5a/b298cfd4-697e-4208-babb-a47e80f208ad.pdf",
      },
    ],
    inStock: true,
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    href: "/product/ipamorelin",
    price: 32.99,
    size: "5 mg",
    sizeLabel: "5 mg lyophilised",
    badge: "New",
    image: "/products/bottle.webp",
    action: "configure",
    category: "premium-peptides",
    categoryLabel: "Premium Peptides",
    format: "Premium Peptide",
    purity: "HPLC-verified",
    tagline: "Selective secretagogue peptide, HPLC-verified",
    description:
      "Ipamorelin is a synthetic pentapeptide supplied as a lyophilised powder for laboratory research. Every vial is HPLC-verified and ships with a certificate of analysis. Choose a Standard Kit with sterile water, or a Premium Pen Kit in a premium presentation box.",
    benefits: PEPTIDE_BENEFITS,
    specs: PEPTIDE_SPECS,
    inStock: true,
  },
  {
    slug: "5mm-pen-needles-pack-20",
    name: "20 × 5mm Pen Needles",
    href: "/product/5mm-pen-needles-pack-20",
    price: 5.99,
    image: "/products/box.webp",
    action: "add",
    category: "accessories",
    categoryLabel: "Accessories",
    format: "Add-on",
    tagline: "Optional pen kit add-on",
    description: "Pack of 20 × 5mm pen needles for research pen kits.",
    inStock: true,
  },
  {
    slug: "antibacterial-wipes-pack-30",
    name: "30 × Antibacterial Wipes",
    href: "/product/antibacterial-wipes-pack-30",
    price: 4.99,
    image: "/products/box.webp",
    action: "add",
    category: "accessories",
    categoryLabel: "Accessories",
    format: "Add-on",
    tagline: "Optional kit add-on",
    description: "Pack of 30 antibacterial wipes for laboratory preparation surfaces.",
    inStock: true,
  },
  {
    slug: "disposable-pen-kit",
    name: "Disposable Pen Kit",
    href: "/product/disposable-pen-kit",
    price: 25.0,
    image: "/products/box.webp",
    action: "add",
    category: "accessories",
    categoryLabel: "Accessories",
    format: "Kit piece",
    tagline: "Single-use pen upgrade",
    description: "Disposable pen kit upgrade for peptide formats.",
    inStock: true,
  },
  {
    slug: "hard-shell-pen-case",
    name: "Hard Shell Pen Case",
    href: "/product/hard-shell-pen-case",
    price: 15.0,
    image: "/products/box.webp",
    action: "add",
    category: "accessories",
    categoryLabel: "Accessories",
    format: "Kit piece",
    tagline: "Included with premium kits",
    description: "Hard shell case bundled with the Premium Pen Kit.",
    inStock: true,
  },
  {
    slug: "preparation-kit",
    name: "Preparation Kit",
    href: "/product/preparation-kit",
    price: 12.99,
    image: "/products/box.webp",
    action: "add",
    category: "accessories",
    categoryLabel: "Accessories",
    format: "Add-on",
    tagline: "Optional vial kit add-on",
    description: "Basic preparation kit for laboratory reconstitution workflows.",
    inStock: true,
  },
  {
    slug: "reusable-pen",
    name: "Reusable Pen",
    href: "/product/reusable-pen",
    price: 35.0,
    image: "/products/box.webp",
    action: "add",
    category: "accessories",
    categoryLabel: "Accessories",
    format: "Kit piece",
    tagline: "Reusable pen for pen kits",
    description: "Reusable pen for reusable and premium pen kits.",
    inStock: true,
  },
  {
    slug: "sterile-water-2ml",
    name: "Sterile Water 2ml",
    href: "/product/sterile-water-2ml",
    price: 0,
    image: "/products/bottle.webp",
    action: "add",
    category: "accessories",
    categoryLabel: "Accessories",
    format: "Kit include",
    tagline: "Included with vial kits",
    description: "2 ml sterile water vial included with vial-format peptide kits.",
    inStock: true,
  },
  {
    slug: "tb-500",
    name: "TB-500",
    href: "/product/tb-500",
    price: 44.99,
    originalPrice: 54.99,
    size: "5 mg",
    sizeLabel: "5 mg lyophilised",
    badge: "New",
    image: "/products/box.webp",
    action: "configure",
    category: "premium-peptides",
    categoryLabel: "Premium Peptides",
    format: "Premium Peptide",
    purity: "HPLC-verified",
    tagline: "Research-grade thymosin beta-4 fragment, HPLC-verified",
    description:
      "TB-500 is a synthetic fragment related to thymosin beta-4, supplied as a lyophilised powder for laboratory research. Every vial is HPLC-tested for purity and ships with a certificate of analysis.",
    benefits: PEPTIDE_BENEFITS,
    specs: PEPTIDE_SPECS,
    inStock: true,
  },
];

const homepageSlugs = ["bpc-157", "ipamorelin", "preparation-kit", "tb-500"];

export const homepageProducts = homepageSlugs.map((slug) => products.find((product) => product.slug === slug)!);

export const catalogueFilters = [
  { href: "/shop", label: "All peptides", active: true },
  { href: "/shop?category=premium-peptides", label: "Premium Peptides", active: false },
  { href: "/shop?category=accessories", label: "Accessories", active: false },
];

export const categoryCounts = {
  all: products.length,
  "premium-peptides": products.filter((p) => p.category === "premium-peptides").length,
  accessories: products.filter((p) => p.category === "accessories").length,
  "premium-10ml-vials": products.filter((p) => p.category === "premium-10ml-vials").length,
  inStock: products.filter((p) => p.inStock).length,
};

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function relatedProducts(slug: string, limit = 4) {
  const current = getProduct(slug);
  if (!current) return [];
  return products.filter((product) => product.slug !== slug && product.category === current.category).slice(0, limit);
}
