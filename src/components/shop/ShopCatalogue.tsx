"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { CloseIcon, SearchIcon } from "@/components/icons";
import { ShopFilters } from "@/components/shop/ShopFilters";
import { ShopHero } from "@/components/shop/ShopHero";
import { products } from "@/data/products";
import { filterShopProducts, parseShopCategory, type ShopCategory, type ShopSort } from "@/lib/shop";

export function ShopCatalogue({ initialCategory }: { initialCategory?: string }) {
  const router = useRouter();
  const [category, setCategory] = useState<ShopCategory>(parseShopCategory(initialCategory));
  const [inStockOnly, setInStockOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<ShopSort>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setCategory(parseShopCategory(initialCategory));
  }, [initialCategory]);

  useEffect(() => {
    document.body.style.overflow = filtersOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [filtersOpen]);

  function updateCategory(next: ShopCategory) {
    setCategory(next);
    const href = next === "all" ? "/shop" : `/shop?category=${next}`;
    router.replace(href, { scroll: false });
  }

  const visible = useMemo(
    () => filterShopProducts(products, { category, inStockOnly, query, sort }),
    [category, inStockOnly, query, sort],
  );

  return (
    <>
      <section className="relative z-10 pb-8 max-lg:pb-28">
        <ShopHero />
        <div className="mx-auto grid w-full max-w-[1200px] gap-5 px-4 pt-3 pb-5 sm:px-6 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-6 lg:px-8">
          <aside
            className="sticky top-24 hidden self-start rounded-[18px] border border-line bg-surface-raised p-3.5 lg:block"
            aria-label="Filters"
          >
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.12em] text-fg-faint">Filters</p>
            <ShopFilters
              name="shop-cat-desktop"
              category={category}
              inStockOnly={inStockOnly}
              onCategoryChange={updateCategory}
              onInStockChange={setInStockOnly}
            />
          </aside>

          <section className="min-w-0">
            <div className="mb-3 flex flex-col gap-2">
              <div className="flex items-center gap-2.5 rounded-full border border-line bg-surface-subtle px-4 py-2.5 focus-within:border-brand-400/40">
                <SearchIcon size={16} className="shrink-0 text-fg-faint" />
                <input
                  type="search"
                  placeholder="Search peptides…"
                  aria-label="Search peptides"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full min-w-0 bg-transparent text-sm text-fg placeholder:text-fg-faint focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface-raised px-3 text-[12px] font-semibold text-fg-muted transition-colors hover:border-brand-400/40 hover:text-fg lg:hidden"
                  onClick={() => setFiltersOpen(true)}
                >
                  Filters
                </button>
                <select
                  aria-label="Sort by"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as ShopSort)}
                  className="h-8 min-w-0 flex-1 rounded-full border border-line bg-surface-raised px-3 text-[12px] text-fg-muted sm:flex-none"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Price: Low–High</option>
                  <option value="price-desc">Price: High–Low</option>
                  <option value="name">Name</option>
                </select>
                <span className="shrink-0 whitespace-nowrap text-[11px] font-medium tabular-nums text-fg-faint">
                  {visible.length} products
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((product, index) => (
                <ProductCard key={product.slug} product={product} delay={index * 40} />
              ))}
            </div>
          </section>
        </div>
      </section>

      <div
        className={`overlay-backdrop fixed inset-0 z-[80] transition-opacity duration-300 lg:hidden ${
          filtersOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setFiltersOpen(false)}
        aria-hidden={!filtersOpen}
      />
      <aside
        className={`fixed inset-x-0 bottom-0 z-[85] flex max-h-[min(82vh,640px)] flex-col rounded-t-[22px] border-t border-line-strong bg-surface-raised p-5 transition-transform duration-450 ease-[var(--ease-smooth)] lg:hidden ${
          filtersOpen ? "translate-y-0" : "translate-y-full"
        }`}
        role="dialog"
        aria-label="Filters"
        aria-modal={filtersOpen}
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-fg-faint">Filters</p>
          <button
            type="button"
            aria-label="Close filters"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-fg-muted hover:bg-surface-subtle hover:text-fg"
            onClick={() => setFiltersOpen(false)}
          >
            <CloseIcon size={18} />
          </button>
        </div>
        <div className="overflow-y-auto pb-4">
          <ShopFilters
            name="shop-cat-mobile"
            category={category}
            inStockOnly={inStockOnly}
            onCategoryChange={(next) => {
              updateCategory(next);
            }}
            onInStockChange={setInStockOnly}
          />
        </div>
      </aside>
    </>
  );
}
