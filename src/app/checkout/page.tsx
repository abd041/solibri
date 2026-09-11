import { gatedPageMetadata, redirectToLogin } from "@/lib/auth";

export const metadata = gatedPageMetadata;

export default function CheckoutPage() {
  redirectToLogin("/checkout");
}
