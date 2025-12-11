import { Button } from "@/components/ui/button";
import { getOrderById } from "@/lib/actions/order.actions";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const SuccessPage = async (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    payment_intent: string;
  }>;
}) => {
  const { id } = await props.params;

  const { payment_intent: paymentIntentId } = await props.searchParams;

  //Fetch order
  const order = await getOrderById(id);
  if (!order) {
    console.log("❌ Order not found");
    return notFound();
  }

  //RetrIEVE payment intent
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  console.log(paymentIntent.status);

  //chECK IF PAYM4N INTENT IS VALID
  if (
    paymentIntent.metadata.order_id == null ||
    paymentIntent.metadata.order_id !== order.id.toString()
  ) {
    return notFound();
  }

  const isSuccess = paymentIntent.status === "succeeded";

  if (!isSuccess) return redirect(`/order/${id}`);

  return (
    <div className="max-w-4xl w-full mx-auto space-y-8">
      <div className="flex flex-col gap-6 items-center">
        <h1 className="h1-bold">Thanks for your purchase</h1>
        <div className="">We are processing your order</div>
        <Button asChild>
          <Link href={`/order/${id}`}>View Order</Link>
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
