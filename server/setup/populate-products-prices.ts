import { Meteor } from "meteor/meteor";
import {
  ProductsCollection,
  PricesCollection,
} from "/imports/api/subscriptions/collections";
export async function populateProductsAndPrices() {
  if (Meteor.isServer) {
    if ((await ProductsCollection.find().countAsync()) === 0) {
      console.log("Populating products...");

      const product1Id = await ProductsCollection.insertAsync({
        name: "Basic Plan",
        description: "A basic subscription plan.",
        active: true,
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const product2Id = await ProductsCollection.insertAsync({
        name: "Premium Plan",
        description: "A premium subscription plan with more features.",
        active: true,
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const product3Id = await ProductsCollection.insertAsync({
        name: "Basic Plan / Yearly",
        description: "A basic subscription plan paid yearly.",
        active: true,
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const product4Id = await ProductsCollection.insertAsync({
        name: "Premium Plan Yearly",
        description: "A premium subscription plan with more features.",
        active: true,
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      console.log("Products populated.");

      if ((await PricesCollection.find().countAsync()) === 0) {
        console.log("Populating prices...");

        await PricesCollection.insertAsync({
          productId: product1Id,
          amount: 1000, // Amount in cents (e.g., $10.00)
          currency: "BRL",
          interval: "months",
          intervalCount: 12,
          active: true,
          trialPeriodDays: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        await PricesCollection.insertAsync({
          productId: product2Id,
          amount: 5000, // Amount in cents (e.g., $50.00)
          currency: "BRL",
          interval: "months",
          intervalCount: 12,
          active: true,
          trialPeriodDays: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        await PricesCollection.insertAsync({
          productId: product3Id,
          amount: 10000, // Amount in cents (e.g., $500.00)
          currency: "BRL",
          interval: "years",
          intervalCount: 1,
          active: true,
          trialPeriodDays: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        await PricesCollection.insertAsync({
          productId: product4Id,
          amount: 50000, // Amount in cents (e.g., $500.00)
          currency: "BRL",
          interval: "years",
          intervalCount: 1,
          active: true,
          trialPeriodDays: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        console.log("Prices populated.");
      }
    }
  }
}
