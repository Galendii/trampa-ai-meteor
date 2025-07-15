// imports/api/payments/methods.ts
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { MercadoPagoPlansCollection } from "../collections";
import { MercadoPagoConfig, PreApproval } from "mercadopago";

Meteor.methods({
  async "payments.mercadoPago.createPreapproval"(
    productId: string
  ): Promise<string> {
    check(productId, String);

    const mpClient = new MercadoPagoConfig({
      accessToken: Meteor.settings.mercadoPago.accessToken,
    });

    const preapprovalClient = new PreApproval(mpClient);

    const userId = Meteor.userId();
    if (!userId) throw new Meteor.Error("not-authorized");

    const plan = await MercadoPagoPlansCollection.findOneAsync({
      productId: productId,
    });
    const payerEmail = Meteor.user()?.emails?.[0]?.address;
    if (!payerEmail) throw new Meteor.Error("no-email");
    const result = await preapprovalClient.create({
      body: {
        preapproval_plan_id: plan?.mercadoPagoId,
        back_url: "https://google.com",
      },
    });

    return String(result.init_point);
  },
});
