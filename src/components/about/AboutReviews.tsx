export function AboutReviews() {
  return (
    <section id="reviews" className="relative scroll-mt-24 border-t border-line py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="reveal mb-12 flex flex-col items-center gap-4 text-center sm:mb-14">
          <span className="text-[12px] font-semibold capitalize tracking-wide text-brand-500">In their words</span>
          <h2 className="max-w-[20ch] font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-extrabold leading-[1.06] tracking-tight text-fg">
            What our customers say
          </h2>
          <p className="max-w-[60ch] text-[clamp(0.95rem,1.6vw,1.075rem)] leading-relaxed text-fg-muted">
            Verified customer feedback, published after moderation.
          </p>
        </div>
        <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-line bg-surface-subtle px-6 py-12 text-center">
          <p className="text-sm text-fg-muted">
            No published reviews yet. Verified reviews from customers appear here once their orders are delivered and the
            review is approved.
          </p>
        </div>
      </div>
    </section>
  );
}
