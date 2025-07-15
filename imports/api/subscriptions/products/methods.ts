import { Meteor } from "meteor/meteor";
import { ProductsCollection } from "../collections";

Meteor.methods({
  "products.all"() {
    return ProductsCollection.find(
      {},
      {
        fields: {
          name: 1,
          description: 1,
          amount: 1,
          mercadoPagoPlanId: 1,
          currency: 1,
        },
      }
    ).fetch();
  },
});
