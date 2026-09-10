import Link from "next/link";
import { Fragment } from "react";
import { ButtonLink } from "@/components/Button";
import type { GuideArticle as GuideArticleData } from "@/data/guides";

export function GuideArticle({ article }: { article: GuideArticleData }) {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14 px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="reveal glass rounded-2xl border border-line p-6 sm:p-8">
        <p className="text-sm leading-relaxed text-fg-muted">{article.intro}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {article.ctas.map((cta) => (
            <ButtonLink key={cta.href} href={cta.href} variant={cta.variant} size="md">
              {cta.label}
            </ButtonLink>
          ))}
        </div>
      </div>

      <section>
        <h2 className="font-display text-2xl font-extrabold text-fg">{article.stepsHeading}</h2>
        {article.stepsStyle === "numbered" ? (
          <ol className="mt-6 space-y-5">
            {article.steps.map((step, index) => (
              <li
                key={step.number}
                className="reveal flex gap-4 rounded-2xl border border-line bg-surface-subtle p-5"
                style={{ ["--reveal-delay" as string]: `${index * 40}ms` }}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500/15 font-display text-sm font-extrabold text-brand-300">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-fg">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <ol className="mt-6 space-y-5">
            {article.steps.map((step) => (
              <li key={step.number} className="glass rounded-2xl border border-line p-5 sm:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-300/80">{step.number}</p>
                <h3 className="mt-1 font-display text-lg font-bold text-fg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        )}
      </section>

      {article.tips ? (
        <section>
          <h2 className="font-display text-2xl font-extrabold text-fg">Quick tips</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-fg-muted">
            {article.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {article.kitNote ? (
        <section className="rounded-2xl border border-line p-6">
          <h2 className="font-display text-xl font-bold text-fg">{article.kitNote.heading}</h2>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">{article.kitNote.body}</p>
          <Link
            href={article.kitNote.link.href}
            className="mt-4 inline-block text-sm font-semibold text-brand-300 hover:text-brand-200"
          >
            {article.kitNote.link.label}
          </Link>
        </section>
      ) : null}

      {article.footerNav ? (
        <p className="text-center text-sm text-fg-muted">
          {article.footerNav.prefix}{" "}
          {article.footerNav.links.map((link, index) => (
            <Fragment key={link.href}>
              {index > 0 ? article.footerNav?.separator : null}
              <Link href={link.href} className="font-semibold text-brand-300 hover:text-brand-200">
                {link.label}
              </Link>
            </Fragment>
          ))}
        </p>
      ) : null}
    </div>
  );
}
