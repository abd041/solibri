import type { Product } from "@/data/products";

export type ShopCategory = "all" | "premium-peptides" | "accessories" | "premium-10ml-vials";
export type ShopSort = "featured" | "price-asc" | "price-desc" | "name";

const SHOP_CATEGORIES: ShopCategory[] = ["premium-peptides", "accessories", "premium-10ml-vials"];

export function parseShopCategory(value?: string | null): ShopCategory {
  if (value && SHOP_CATEGORIES.includes(value as ShopCategory)) return value as ShopCategory;
  return "all";
}

export function filterShopProducts(
  products: Product[],
  {
    category,
    inStockOnly,
    query,
    sort,
  }: {
    category: ShopCategory;
    inStockOnly: boolean;
    query: string;
    sort: ShopSort;
  },
): Product[] {
  const needle = query.trim().toLowerCase();
  const filtered = products.filter((product) => {
    if (category !== "all" && product.category !== category) return false;
    if (inStockOnly && !product.inStock) return false;
    if (needle && !product.name.toLowerCase().includes(needle)) return false;
    return true;
  });

  const sorted = [...filtered];
  if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
  if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
  return sorted;
}
