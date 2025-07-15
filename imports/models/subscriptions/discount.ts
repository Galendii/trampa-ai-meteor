// Discount type
export interface Discount {
  _id: string;
  userId: string;
  productId?: string; // Optional: can be product-specific or global
  code?: string; // If you want to support codes like "WELCOME20"
  percent: number; // 0 to 100
  validUntil?: Date;
  createdAt: Date;
}
