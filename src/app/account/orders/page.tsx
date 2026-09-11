import { gatedPageMetadata, redirectToLogin } from "@/lib/auth";

export const metadata = gatedPageMetadata;

export default function AccountOrdersPage() {
  redirectToLogin("/account/orders");
}
