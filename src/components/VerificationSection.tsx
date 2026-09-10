import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { CheckIcon } from "@/components/icons";

function CheckItem({ children }: { children: string }) {
  return (
    <li className="flex items-center gap-2.5 text-sm text-fg">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600/10 text-brand-600">
        <CheckIcon size={13} />
      </span>
      {children}
    </li>
  );
}

export function VerificationSection() {
  return (
    <section className="relative py-8">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="reveal">
            <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-700 p-7 sm:p-9">
              <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-md">
                  <h3 className="font-display text-[clamp(1.4rem,2.4vw,1.8rem)] font-extrabold leading-tight tracking-tight text-fg">
                    Peptides you can actually verify
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    Every Solibri peptide is batch-tested for purity and identity before it&apos;s kitted — so what&apos;s in
                    the vial matches the label, every time.
                  </p>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    <CheckItem>Batch-tested purity</CheckItem>
                    <CheckItem>Verified identity</CheckItem>
                    <CheckItem>Research-grade peptides</CheckItem>
                  </ul>
                  <div className="mt-7">
                    <ButtonLink href="/science" variant="outline" size="sm">
                      Read the science
                    </ButtonLink>
                  </div>
                </div>
                <div className="relative h-40 w-32 shrink-0 self-center sm:h-[180px] sm:w-40">
                  <Image src="/products/box.webp" alt="Solibri peptide carton" fill className="object-contain" sizes="160px" />
                </div>
              </div>
            </article>
          </div>
          <div className="reveal" style={{ ["--reveal-delay" as string]: "100ms" }}>
            <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-700 p-7 sm:p-9">
              <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-md">
                  <h3 className="font-display text-[clamp(1.4rem,2.4vw,1.8rem)] font-extrabold leading-tight tracking-tight text-fg">
                    Two kits, one exacting standard
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    Choose a Standard Kit with 2 ml of sterile water, or a Premium Pen Kit in a presentation box with a
                    disposable injection pen — both prepared for precise reconstitution.
                  </p>
                  <ul className="mt-5 flex flex-col gap-2.5">
                    <CheckItem>Standard or Premium Pen Kit</CheckItem>
                    <CheckItem>Sterile water included</CheckItem>
                    <CheckItem>Prepared for precise reconstitution</CheckItem>
                  </ul>
                  <div className="mt-7">
                    <ButtonLink href="/about" variant="outline" size="sm">
                      Our quality promise
                    </ButtonLink>
                  </div>
                </div>
                <div className="relative h-40 w-32 shrink-0 self-center sm:h-[180px] sm:w-40">
                  <Image
                    src="/products/cartage.webp"
                    alt="Solibri Premium Pen Kit cartridge"
                    fill
                    className="object-contain"
                    sizes="160px"
                  />
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
