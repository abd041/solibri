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
                  {visible.length} {visible.length === 1 ? "product" : "products"}
                </span>
              </div>
            </div>
            {visible.length === 0 ? (
              <p className="py-16 text-center text-fg-muted">No products match. Try clearing filters.</p>
            ) : (
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
                {visible.map((product, index) => (
                  <ProductCard key={product.slug} product={product} delay={index * 40} />
                ))}
              </div>
            )}
          </section>
      </div>

      {filtersOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-end bg-black/60 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
          onClick={(event) => {
            if (event.target === event.currentTarget) setFiltersOpen(false);
          }}
        >
          <div className="max-h-[86vh] w-full overflow-auto rounded-t-[18px] border border-line bg-ink-800 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-extrabold text-fg">Filters</h2>
              <button
                type="button"
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-full text-fg-muted hover:bg-surface-subtle"
                onClick={() => setFiltersOpen(false)}
              >
                <CloseIcon size={18} />
              </button>
            </div>
            <ShopFilters
              name="shop-cat-mobile"
              category={category}
              inStockOnly={inStockOnly}
              onCategoryChange={(next) => {
                updateCategory(next);
              }}
              onInStockChange={setInStockOnly}
            />
            <button
              type="button"
              className="mt-4 w-full rounded-full bg-brand-500 py-3.5 text-sm font-extrabold text-fg-on-brand"
              onClick={() => setFiltersOpen(false)}
            >
              Apply filters
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
