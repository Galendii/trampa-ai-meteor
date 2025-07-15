import { Meteor } from "meteor/meteor";
import { BaseUserSchema } from "/imports/schemas/user";
import { Accounts } from "meteor/accounts-base";
import { Roles } from "meteor/roles";
import {
  ClientData,
  ProfessionalData,
  UserSignupInput,
} from "../../models/user";

Meteor.methods({
  async "users.create"(data: UserSignupInput): Promise<string> {
    try {
      const {
        role,
        cnpj,
        code,
        professionalReferralCode,
        companyName,
        ...rest
      } = data;
      BaseUserSchema.validate(data);

      const userId = await Accounts.createUserAsync({
        username: rest.username,
        password: rest.password,
        profile: {
          firstName: rest.firstName,
          lastName: rest.lastName,
          cpf: rest.cpf,
          phone: rest.phone,
        },
      });

      if (!userId) {
        throw new Meteor.Error(
          "user-creation-failed",
          "Failed to create user account."
        );
      }

      let $set: Partial<Record<string, any>> = { role };
      if (role === "client") {
        $set.client = {
          professionalReferralCode,
        } as ClientData;
      } else if (role === "professional") {
        $set.professional = {
          code,
          companyName,
          cnpj,
        } as ProfessionalData;
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
