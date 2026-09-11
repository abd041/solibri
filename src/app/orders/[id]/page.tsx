import { gatedPageMetadata, redirectToLogin } from "@/lib/auth";

export const metadata = gatedPageMetadata;

type Params = { id: string };

export default async function OrderPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  redirectToLogin(`/orders/${id}`);
}
