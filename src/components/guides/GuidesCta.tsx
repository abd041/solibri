import { ButtonLink } from "@/components/Button";

export function GuidesCta() {
  return (
    <div className="glass rounded-3xl border border-line p-8 text-center">
      <h3 className="font-display text-xl font-bold text-fg">Plan your protocol</h3>
      <p className="mx-auto mt-2 max-w-lg text-sm text-fg-muted">
        Use the peptide dosage calculator on the homepage for draw volume, insulin syringe units, and total doses.
      </p>
      <ButtonLink href="/#calculator" variant="primary" size="md" className="mt-5">
        Open peptide calculator
      </ButtonLink>
    </div>
  );
}
