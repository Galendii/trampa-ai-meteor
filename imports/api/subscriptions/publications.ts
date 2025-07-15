import { Meteor } from "meteor/meteor";
import { ProductsCollection } from "./collections";

Meteor.publish("products.active", () => {
  return ProductsCollection.find(
    {
      active: true,
    },
    {
      fields: {
        name: 1,
        description: 1,
        amount: 1,
        mercadoPagoPlanId: 1,
      },
    }
  );
});
