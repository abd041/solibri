import { categoryCounts } from "@/data/products";
import type { ShopCategory } from "@/lib/shop";

type Props = {
  name: string;
  category: ShopCategory;
  inStockOnly: boolean;
  onCategoryChange: (category: ShopCategory) => void;
  onInStockChange: (value: boolean) => void;
};

export function ShopFilters({ name, category, inStockOnly, onCategoryChange, onInStockChange }: Props) {
  return (
    <>
      <div className="mb-4">
        <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-fg-muted">Categories</h3>
        <label className="flex cursor-pointer items-center gap-2 py-1 text-sm text-fg-muted hover:text-fg">
          <input
            type="radio"
            className="accent-brand-500"
            name={name}
            checked={category === "all"}
            onChange={() => onCategoryChange("all")}
          />
          All Products
          <span className="ml-auto font-mono text-[11px] text-fg-faint">{categoryCounts.all}</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2 py-1 text-sm text-fg-muted hover:text-fg">
          <input
            type="radio"
            className="accent-brand-500"
            name={name}
            checked={category === "premium-peptides"}
            onChange={() => onCategoryChange("premium-peptides")}
          />
          Premium Peptides
          <span className="ml-auto font-mono text-[11px] text-fg-faint">{categoryCounts["premium-peptides"]}</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2 py-1 text-sm text-fg-muted hover:text-fg">
          <input
            type="radio"
            className="accent-brand-500"
            name={name}
            checked={category === "accessories"}
            onChange={() => onCategoryChange("accessories")}
          />
          Accessories
          <span className="ml-auto font-mono text-[11px] text-fg-faint">{categoryCounts.accessories}</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2 py-1 text-sm text-fg-muted hover:text-fg">
          <input
            type="radio"
            className="accent-brand-500"
            name={name}
            checked={category === "premium-10ml-vials"}
            onChange={() => onCategoryChange("premium-10ml-vials")}
          />
          Premium 10ml Vials
          <span className="ml-auto font-mono text-[11px] text-fg-faint">{categoryCounts["premium-10ml-vials"]}</span>
        </label>
      </div>
      <div>
        <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-fg-muted">Availability</h3>
        <label className="flex cursor-pointer items-center gap-2 py-1 text-sm text-fg-muted hover:text-fg">
          <input
            type="checkbox"
            className="accent-brand-500"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
          />
          In stock
          <span className="ml-auto font-mono text-[11px] text-fg-faint">{categoryCounts.inStock}</span>
        </label>
      </div>
    </>
  );
}
