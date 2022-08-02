const express = require("express");
const router = express.Router();

const stripe = require("stripe")(
  "sk_test_51LSJbrSHKwWbek0R6esxrRKpNKGamIvumCb53pCxkbJ69EqQ7ZgLDYgIZm6FTsI8qggGgUaPyTWrn5OB83SBuSJU009XnqRQWT"
);

router.post("/", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      payment_method_types: ["card"],
    });
    if (paymentIntent) {
      res
        .status(200)
        .json({ message: "Payment successfull", data: paymentIntent });
    } else {
      res.status(400).json({ message: "Payment not done", data: null });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error });
  }
});

module.exports = router;
