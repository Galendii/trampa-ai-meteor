import { Meteor } from "meteor/meteor";
import { BaseUserSchema } from "/imports/schemas/user";
import { Accounts } from "meteor/accounts-base";
import { Roles } from "meteor/roles";
import { UserSignupInput } from "/imports/models/user";

Meteor.methods({
  async "users.create"(data: UserSignupInput): Promise<string> {
    try {
      const { email, password, profile, role, professional, client } = data;

      console.log({
        email,
        password,
        profile,
      });

      const userId = await Accounts.createUserAsync({
        email,
        password,
        profile,
      });

      if (!userId) {
        throw new Meteor.Error(
          "user-creation-failed",
          "Failed to create user account."
        );
      }

      let $set: Partial<Record<string, any>> = { role };
      console.log(professional, client);
      if (role === "client" && client) {
        $set.client = client;
      } else if (role === "professional" && professional) {
        $set.professional = professional;
      }

      await Meteor.users.updateAsync(userId, { $set });
      await Roles.addUsersToRolesAsync(userId, [role]);

      return userId;
    } catch (err) {
      throw new Meteor.Error(String(err));
    }
  },
  "users.update"(updates: any) {
    if (!this.userId) throw new Meteor.Error("Not authorized");

    BaseUserSchema.validate(updates);

    Meteor.users.update(this.userId, {
      $set: updates,
    });
  },
});
