import { Meteor } from "meteor/meteor";

Meteor.publish("users.current", function () {
  if (!this.userId) return this.ready();

  return Meteor.users.find(
    { _id: this.userId },
    {
      fields: {
        email: 1,
        firstName: 1,
        lastName: 1,
        role: 1,
        phone: 1,
        cpf: 1,
        createdAt: 1,
        lastLogin: 1,
        clientData: 1,
        professionalData: 1,
      },
    }
  );
});
