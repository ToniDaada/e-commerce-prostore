import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order.actions";
import { notFound } from "next/navigation";
import { Order, ShippingAddress } from "@/types";
import OrderDetailsTable from "./order-details-table";
import Stripe from "stripe";
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

  let client_secret = null;
  //Check if is not paid and using stripe
  if (order.paymentMethod === "Stripe" && !order.isPaid) {
    // Init strupe instance

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    // Create payment intent

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalPrice) * 100), // amount in cents
      currency: "USD",
      metadata: { order_id: order.id },
    });

    //gET CLIENT SECRETE
    client_secret = paymentIntent.client_secret;
  }

  return (
    <OrderDetailsTable
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress,
        orderItems: order.orderitems, // Add this line back
      }}
      stripeClientSecret={client_secret}
      paypalClientId={process.env.PAYPAL_CLIENT_ID || "sb"}
      isAdmin={session?.user?.role === "admin" || false}
    />
  );
};

export default OrderDetailsPage;
