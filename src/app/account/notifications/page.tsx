import { gatedPageMetadata, redirectToLogin } from "@/lib/auth";

export const metadata = gatedPageMetadata;

export default function AccountNotificationsPage() {
  redirectToLogin("/account/notifications");
}
