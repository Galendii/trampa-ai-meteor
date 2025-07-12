import SimpleSchema from "simpl-schema";

export const PlanSchema = new SimpleSchema({
  id: String,
  name: String,
  price: Number,
  duration: Number,
  frequency: Number,
});

export const ServiceSchema = new SimpleSchema({
  id: String,
  name: String,
  price: Number,
  description: String,
  professional: Number,
  plans: Array,
  "plans.$": PlanSchema,
});
