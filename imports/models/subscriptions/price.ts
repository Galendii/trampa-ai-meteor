// Price type
export interface Price {
  _id: string;
  productId: string;
  amount: number; // in cents (e.g., 4990 = R$49.90)
  currency: "BRL" | "USD"; // Expand as needed
  interval: "months" | "years" | "days";
  intervalCount: number;
  active: boolean;
  trialPeriodDays?: number;
  createdAt: Date;
  updatedAt: Date;
}
