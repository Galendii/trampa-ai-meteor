// /imports/api/users/schemas.ts
import SimpleSchema from "simpl-schema";
import { ProfessionalUserSchema } from "./professional";
import { ClientUserSchema } from "./client";

export const EmailSchema = new SimpleSchema({
  verified: Boolean,
  primary: Boolean,
  address: String,
});

export const BaseUserProfileSchema = new SimpleSchema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  cpf: {
    type: String,
    regEx: /^[0-9]{11}$/, // Brazilian CPF format
  },
  phone: {
    type: String,
  },
  email: {
    type: Array,
  },
  "email.$": {
    type: EmailSchema,
  },
});

// Base User Schema
export const BaseUserSchema = new SimpleSchema({
  username: {
    type: String,
  },
  profile: BaseUserProfileSchema,
  createdAt: {
    type: Date,
  },
  lastLogin: {
    type: Date,
    optional: true,
  },
  professional: {
    type: ProfessionalUserSchema,
    optional: true,
  },
  client: {
    type: ClientUserSchema,
    optional: true,
  },
  role: {
    type: String,
    allowedValues: ["client", "professional", "admin"],
  },
});
