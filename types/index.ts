import { z } from "zod";
import {
  cartItemSchema,
  insertProductsSchema,
  insertCartSchema,
  shippingAddressSchema,
  insertOrderSchema,
  insertOrderItemSchema,
  paymentResultSchema,
  inserReviewSchema,
} from "@/lib/validator";

export type Product = z.infer<typeof insertProductsSchema> & {
  id: string;
  rating: string;
  numReviews: number;
  createdAt: Date;
};
export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type OrderItem = z.infer<typeof insertOrderItemSchema>;
export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  orderItems: OrderItem[];
  user: { name: string; email: string };
  paymentResult: PaymentResult;
};
export type PaymentResult = z.infer<typeof paymentResultSchema>;
export type Review = z.infer<typeof inserReviewSchema> & {
  id: string;
  createdAt: Date;
  user?: { name: string; email?: string };
};
// f
