export type VerifiedProduct = {
  name: string;
  slug: string;
  tagline?: string | null;
  image: string;
  active: boolean;
};

export type VerifyResult =
  | { ok: true; product: VerifiedProduct }
  | { ok: false };

/**
 * Isolated batch-code lookup.
 * Plug a WordPress/API endpoint in here later.
 * Returns null while no backend is connected — never invents valid/invalid results.
 */
export async function verifyProductCode(_input: { code: string }): Promise<VerifyResult | null> {
  void _input;
  return null;
}
