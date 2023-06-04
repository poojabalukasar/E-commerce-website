const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(
  "sk_test_51N8IckSIcvhLYPCLytpj8xnNAZETJ6q56qShB0v3E3dJ0YZAfoU7wQYGm2It16Ae5mTWH8gwTDZ5sgCEhgZyp26m00uChIYTxY"
);

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Becodemy",
      },
    });
    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
      stripeApikey:
        "pk_test_51N8IckSIcvhLYPCLr5mrVLHlqr6e333jcJg9BRyZAoLMtcmg4kxWZGHMbwU9sS9FDzdPrCkUuvaE5uMOMoDuUQQ7008yqiNwDa",
    });
  })
);

module.exports = router;
