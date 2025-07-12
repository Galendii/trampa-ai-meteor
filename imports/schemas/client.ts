import SimpleSchema from "simpl-schema";
import { ServiceSchema } from "./service";

export const ClientUserSchema = new SimpleSchema({
  professionalReferralCode: {
    type: String,
    optional: true,
  },
  services: {
    type: Array,
    optional: true,
  },
  "services.$": {
    type: ServiceSchema,
  },
});
