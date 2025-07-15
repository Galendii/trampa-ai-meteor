import { Meteor } from "meteor/meteor";
import { Roles } from "meteor/roles";

import "/imports/api/users";
import "/imports/api/subscriptions/";
import { populateProductsAndPrices } from "./setup/populate-products-prices";
import { createPreapprovalPlans } from "./setup/create-preapproval-plans";

Meteor.startup(() => {
  // populateProductsAndPrices();
  createPreapprovalPlans();
});

Meteor.startup(async () => {
  const roles = await Meteor.roles.countDocuments();
  if (roles !== 3) {
    await Promise.all([
      Roles.createRoleAsync("professional", { unlessExists: true }),
      Roles.createRoleAsync("client", { unlessExists: true }),
      Roles.createRoleAsync("admin", { unlessExists: true }),
    ]);
  }
});
