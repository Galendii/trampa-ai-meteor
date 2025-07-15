import { Meteor } from "meteor/meteor";
import { MercadoPagoConfig, PreApprovalPlan } from "mercadopago";

import { ProductsCollection } from "/imports/api/subscriptions/collections";
import { Product } from "/imports/models/subscriptions/product";
import { PreApprovalPlanResponse } from "mercadopago/dist/clients/preApprovalPlan/commonTypes";
import { Random } from "meteor/random";

export async function createPreapprovalPlans() {
  try {
    if ((await ProductsCollection.countDocuments()) > 0) {
      return;
    }
    if (Meteor.isServer) {
      const mercadoPagoPlansIds = [
        "2c93808497f5fad1019801a3a304042a",
        "2c93808497f5fac3019801a2c505044b",
      ];
      console.log("Creating preapproval plans");

      const client = new MercadoPagoConfig({
        accessToken: String(process.env.mercadoPagoAccessToken),
      });
      console.log(client);

      const planAPI = new PreApprovalPlan(client);
      const mpPlans = (await Promise.all(
        mercadoPagoPlansIds.map(
          async (id) => await planAPI.get({ preApprovalPlanId: id })
        )
      )) as PreApprovalPlanResponse[];
      console.log(mpPlans);
      if (!mpPlans) throw new Meteor.Error("no-plans");

      const productsToCreate: Product[] = mpPlans.map((plan) => {
        const product: Product = {
          _id: Random.id(),
          active: plan.status === "active",
          name: String(plan.reason),
          description: `${plan.reason} - ${plan.auto_recurring?.frequency_type}`,
          interval:
            plan.auto_recurring?.frequency_type === "months"
              ? "monthly"
              : "yearly",
          amount: Number(plan.auto_recurring?.transaction_amount),
          currency: "BRL",
          mercadoPagoPlanId: plan.id,
          metadata: plan,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        return product;
      });
      console.log(productsToCreate);

      const createdProducts =
        await ProductsCollection.rawCollection().insertMany(productsToCreate);

      console.log(
        `✅ Created ${createdProducts.insertedCount} new products. Following products ids: ${createdProducts.insertedIds} `
      );
    }
  } catch (err: any) {
    console.log(err);
    throw new Meteor.Error(err?.message);
  }
}
