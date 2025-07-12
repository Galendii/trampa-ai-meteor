import { Meteor } from "meteor/meteor";

import "/imports/api/users";
import { Roles } from "meteor/roles";

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
