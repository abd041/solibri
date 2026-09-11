import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brandedOgImage } from "@/lib/site";
import { GuideArticle } from "@/components/guides/GuideArticle";
import { GuideArticleHero } from "@/components/guides/GuideArticleHero";
import { getGuideArticle, guideArticleSlugs } from "@/data/guides";

type Params = { slug: string };

const pageKeywords = [
  "peptides",
  "research peptides",
  "premium peptides",
  "10ml vials",
  "peptide pen kit",
  "Solibri Labs",
  "Solibri",
];

export function generateStaticParams() {
  return guideArticleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getGuideArticle(slug);
  if (!article) return { title: "Guide · Solibri Labs" };

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: pageKeywords,
    alternates: {
      canonical: `/guides/${article.slug}`,
    },
    openGraph: {
      title: "Solibri Labs — Research-Grade Peptides",
      description:
        "Premium research peptides. Choose your peptide, then your kit — Standard or Premium Pen. Batch-tested, precisely dosed.",
      images: [brandedOgImage],
    },
  };
}

export default async function GuideArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getGuideArticle(slug);
  if (!article) notFound();

  return (
    <>
      <GuideArticleHero eyebrow={article.eyebrow} heading={article.heading} subtitle={article.subtitle} />
      <GuideArticle article={article} />
    </>
  );
}
