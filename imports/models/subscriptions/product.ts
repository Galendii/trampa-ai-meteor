// Product type
export interface Product {
  _id: string;
  name: string;
  description?: string;
  active: boolean;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  mercadoPagoPlanId?: string;
  amount: number;
  currency: "BRL";
  interval: "monthly" | "yearly";
}
