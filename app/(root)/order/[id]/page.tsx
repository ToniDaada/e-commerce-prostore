import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.actions";
import { notFound } from "next/navigation";
import { Order, ShippingAddress } from "@/types";
import OrderDetailsTable from "./order-details-table";
import { auth } from "@/auth";
export const metadata: Metadata = {
  title: "Order Details",
};
const OrderDetailsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;
  const order = await getOrderById(id);
  if (!order) notFound();

  // I need to get the session when i am on this page so that i know if the user is an admin so i can pass the update COD button actions to the orderDetails Tble
  const session = await auth();

  return (
    <OrderDetailsTable
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress,
        orderItems: order.orderitems, // Add this line back
      }}
      paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
      isAdmin={session?.user?.role === "admin" || false}
    />
  );
};

export default OrderDetailsPage;
