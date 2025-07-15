import { Discount } from "./discount";
import { Price } from "./price";
import { Product } from "./product";

// Subscription type
export interface Subscription {
  _id: string;
  userId: string;
  productId: string;
  priceId: string;
  status: "active" | "cancelled" | "incomplete" | "expired" | "trialing";
  startDate: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd?: boolean;
  createdAt: Date;
  updatedAt: Date;
  mercadoPagoSubscriptionId?: string;
  productSnapshot: Product;
  priceSnapshot: Price;
  discountSnapshot?: Discount;
}
