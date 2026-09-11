import type { ReactNode } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { ClockIcon, ShieldCheckIcon, TruckIcon } from "@/components/icons";
import { ABOUT_EMAIL } from "@/data/about";

const cardIcons: Record<string, ReactNode> = {
  clock: <ClockIcon size={20} />,
  truck: <TruckIcon size={20} />,
  shield: <ShieldCheckIcon size={20} />,
};

export function AboutContact() {
  return (
    <section id="contact" className="relative scroll-mt-24 border-t border-line py-16 sm:py-20 lg:py-24">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
      <div
        aria-hidden="true"
        className="glow-orb"
        style={{
          width: "32rem",
          height: "32rem",
          opacity: 0.25,
          background: "radial-gradient(circle, rgba(212,175,55,0.9) 0%, rgba(212,175,55,0) 70%)",
          bottom: "-15%",
          right: "-10%",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="reveal mb-12 flex flex-col items-center gap-4 text-center sm:mb-14">
          <span className="text-[12px] font-semibold capitalize tracking-wide text-brand-500">Get in touch</span>
          <h2 className="max-w-[20ch] font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-extrabold leading-[1.06] tracking-tight text-fg">
            Questions? We're here to help
          </h2>
          <p className="max-w-[60ch] text-[clamp(0.95rem,1.6vw,1.075rem)] leading-relaxed text-fg-muted">
            Whether it's about an order, a kit, or reconstitution and storage — drop us a line and a real person will get
            back to you.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
          <div className="reveal order-2 flex flex-col gap-4 lg:order-1">
            <div className="glass flex items-start gap-4 rounded-3xl p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-400/12 text-brand-300 ring-1 ring-inset ring-brand-400/20">
                {cardIcons.clock}
              </span>
              <div>
                <h3 className="font-display text-sm font-bold text-fg">Support hours</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">
                  Monday – Friday, 9am – 5pm UK time. We typically reply within one working day.
                </p>
              </div>
            </div>
            <div className="glass flex items-start gap-4 rounded-3xl p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-400/12 text-brand-300 ring-1 ring-inset ring-brand-400/20">
                {cardIcons.truck}
              </span>
              <div>
                <h3 className="font-display text-sm font-bold text-fg">Email us</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">
                  <a className="transition-colors hover:text-fg" href={`mailto:${ABOUT_EMAIL}`}>
                    {ABOUT_EMAIL}
                  </a>{" "}
                  — for orders, kits, and product questions.
                </p>
              </div>
            </div>
            <div className="glass flex items-start gap-4 rounded-3xl p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-400/12 text-brand-300 ring-1 ring-inset ring-brand-400/20">
                {cardIcons.shield}
              </span>
              <div>
                <h3 className="font-display text-sm font-bold text-fg">Unopened kits</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">
                  Changed your mind? Unopened, unused kits can be returned — just get in touch.
                </p>
              </div>
            </div>
          </div>
          <div className="reveal order-1 lg:order-2" style={{ ["--reveal-delay" as string]: "100ms" }}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
