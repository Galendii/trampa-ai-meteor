import { Mongo } from "meteor/mongo";
import { PLAN_IDS } from "../constants";

export type MercadoPagoPlan = {
  _id: string;
  mercadoPagoId: string;
  reason: string;
  frequency: number;
  frequencyType: "months" | "days";
  productId: string;
  priceId: string;
  currency: "BRL" | "USD";
  backUrl: string;
  createdAt: Date;
  amount: number;
};
