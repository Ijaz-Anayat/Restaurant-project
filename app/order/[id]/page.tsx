import type { Metadata } from "next";
import { OrderStatusPage } from "@/components/checkout/OrderStatusPage";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Order",
};

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <OrderStatusPage id={id} />
      <Footer />
    </>
  );
}
