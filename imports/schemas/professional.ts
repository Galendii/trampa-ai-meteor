import SimpleSchema from "simpl-schema";

export const ProfessionalUserSchema = new SimpleSchema({
  code: {
    type: String,
  },
  companyName: {
    type: String,
    optional: true,
  },
  cnpj: {
    type: String,
    regEx: /^[0-9]{14}$/,
    optional: true,
  },
});
