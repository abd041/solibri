import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductView } from "@/components/product/ProductView";
import { getProduct, products, relatedProducts } from "@/data/products";

type Params = { slug: string };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product · Solibri Labs" };
  const title = `${product.name} · Solibri Labs`;
  return {
    title,
    description: product.description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title,
      description: product.tagline,
      images: [{ url: product.image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.tagline,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = relatedProducts(product.slug);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: `https://solibrilabs.co.uk${product.image}`,
      url: `https://solibrilabs.co.uk/product/${product.slug}`,
      brand: { "@type": "Brand", name: "Solibri Labs" },
      offers: {
        "@type": "Offer",
        priceCurrency: "GBP",
        price: product.price.toFixed(2),
        availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        url: `https://solibrilabs.co.uk/product/${product.slug}`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://solibrilabs.co.uk/" },
        { "@type": "ListItem", position: 2, name: "Shop", item: "https://solibrilabs.co.uk/shop" },
        {
          "@type": "ListItem",
          position: 3,
          name: product.categoryLabel,
          item: `https://solibrilabs.co.uk/shop?category=${product.category}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: product.name,
          item: `https://solibrilabs.co.uk/product/${product.slug}`,
        },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductView product={product} related={related} />
    </>
  );
}
