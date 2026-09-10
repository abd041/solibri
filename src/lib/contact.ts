export const CONTACT_SUBJECTS = [
  { value: "general", label: "General question" },
  { value: "order", label: "Order support" },
  { value: "product", label: "Product question" },
  { value: "wholesale", label: "Wholesale / partnerships" },
  { value: "other", label: "Something else" },
] as const;

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number]["value"];

export type ContactPayload = {
  name: string;
  email: string;
  subject: ContactSubject;
  message: string;
  turnstileToken: string;
};

export type ContactResult = { ok: true } | { ok: false; error: string };

/**
 * Isolated contact submit.
 * Plug a WordPress/API endpoint in here later.
 * Does not hit a network and never fakes a successful send.
 */
export async function submitContact(_input: ContactPayload): Promise<ContactResult> {
  void _input;
  return {
    ok: false,
    error: "Unable to send your message right now. Please try again later.",
  };
}
