import { catalogueFilters, homepageProducts } from "@/data/products";
import { ButtonLink } from "@/components/Button";
import { ChevronRightIcon } from "@/components/icons";
import { ProductCard } from "@/components/ProductCard";

export function ProductCatalogue() {
  return (
    <section id="products" className="relative scroll-mt-28 py-20 sm:py-28">
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-8">
        <div className="mb-9 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-400">
              The catalogue
            </span>
            <h2 className="mt-3 max-w-2xl text-balance font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-fg">
              Batch-tested peptides, kitted your way.
            </h2>
          </div>
          <ButtonLink href="/shop" variant="outline" size="md" className="shrink-0">
            View all
            <ChevronRightIcon size={16} />
          </ButtonLink>
        </div>
        <div className="reveal mb-10 flex flex-wrap gap-2">
          {catalogueFilters.map((filter) => (
            <a
              key={filter.href + filter.label}
              className={
                filter.active
                  ? "rounded-full border border-brand-500 bg-brand-500/10 px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-400"
                  : "rounded-full border border-line px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-muted transition-colors hover:border-brand-500/50 hover:text-fg"
              }
              href={filter.href}
            >
              {filter.label}
            </a>
          ))}
        </div>
        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {homepageProducts.map((product, index) => (
            <ProductCard key={product.slug} product={product} delay={index * 70} />
          ))}
        </div>
      </div>
    </section>
  );
}
