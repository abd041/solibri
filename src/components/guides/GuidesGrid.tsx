import { GuideCard } from "@/components/guides/GuideCard";
import { guideCards } from "@/data/guides";

export function GuidesGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {guideCards.map((guide, index) => (
        <div key={guide.slug} className="reveal" style={{ ["--reveal-delay" as string]: `${index * 60}ms` }}>
          <GuideCard {...guide} />
        </div>
      ))}
    </div>
  );
}
