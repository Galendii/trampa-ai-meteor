import { Mongo } from "meteor/mongo";
import { Product } from "../../models/subscriptions/product";
import { Discount, Price } from "../../models/subscriptions";
import { Subscription } from "meteor/meteor";

// <Subscriptions>
export const ProductsCollection = new Mongo.Collection<Product>("products");
export const PricesCollection = new Mongo.Collection<Price>("prices");
export const DiscountsCollection = new Mongo.Collection<Discount>("discounts");
export const SubscriptionsCollection = new Mongo.Collection<Subscription>(
  "subscriptions"
);

// <End Subscriptions/>
