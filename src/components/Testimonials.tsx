import { testimonialsRowOne, testimonialsRowTwo, type Testimonial } from "@/data/testimonials";
import { StarIcon } from "@/components/icons";

function Stars({ rating }: { rating: 4 | 5 }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} filled={i < rating} size={13} />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Testimonial }) {
  return (
    <figure className="flex w-[340px] shrink-0 flex-col rounded-2xl border border-line bg-ink-700 p-6">
      <div className="flex items-center gap-1.5">
        <Stars rating={review.rating} />
      </div>
      <blockquote className="mt-4 text-[15px] leading-relaxed text-fg-muted">“{review.quote}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="relative flex size-9 h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <span className="flex h-full w-full items-center justify-center rounded-full bg-brand-500/12 text-xs text-brand-300">
            {review.initials}
          </span>
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-fg">{review.name}</p>
          <p className="text-[12px] text-fg-faint">{review.context}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function MarqueeRow({
  items,
  duration,
  reverse = false,
  label,
}: {
  items: Testimonial[];
  duration: string;
  reverse?: boolean;
  label: string;
}) {
  return (
    <div
      className="group flex flex-row overflow-hidden p-2 [--gap:1.25rem] [gap:var(--gap)] hover:[&_.animate-marquee]:[animation-play-state:paused]"
      style={{ ["--duration" as string]: duration }}
      aria-label={label}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className={`flex shrink-0 flex-row justify-around [gap:var(--gap)] animate-marquee ${reverse ? "marquee-reverse" : ""}`}
          aria-hidden={copy === 1}
        >
          {items.map((review) => (
            <ReviewCard key={`${copy}-${review.initials}`} review={review} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="reveal mb-12 flex flex-col items-center gap-4 text-center">
          <span className="text-[12px] font-semibold capitalize tracking-wide text-brand-500">Verified buyers</span>
          <h2 className="max-w-[20ch] font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-extrabold leading-[1.06] tracking-tight text-fg">
            What our customers say
          </h2>
          <p className="max-w-[60ch] text-[clamp(0.95rem,1.6vw,1.075rem)] leading-relaxed text-fg-muted">
            Feedback from buyers on purity, packaging and dispatch.
          </p>
        </div>
      </div>
      <div className="relative flex flex-col gap-5">
        <MarqueeRow items={testimonialsRowOne} duration="48s" label="Customer testimonials" />
        <MarqueeRow items={testimonialsRowTwo} duration="54s" reverse label="More customer testimonials" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-900 to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-900 to-transparent sm:w-40" />
      </div>
    </section>
  );
}
