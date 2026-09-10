import { ButtonLink } from "@/components/Button";

export function AffiliateJoin() {
  return (
    <div className="mx-auto w-full max-w-[480px]">
      <div className="glass rounded-2xl border border-line p-6 text-center">
        <p className="text-sm text-fg-muted">Sign in to grab your link and start earning.</p>
        <ButtonLink href="/login?next=/affiliate" variant="primary" size="md" className="mt-4 w-full">
          Sign in to join
        </ButtonLink>
      </div>
    </div>
  );
}
