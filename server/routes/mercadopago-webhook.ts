import { WebApp } from "meteor/webapp";

WebApp.handlers.use("/webhook/mercado-pago", async (req, res, next) => {
  if (req.method === "POST") {
    // Handle Mercado Pago webhook
    res.writeHead(200);
    res.end("ok");
  } else {
    next();
  }
});
