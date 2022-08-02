const express = require("express");
const router = express.Router();

const stripe = require("stripe")(
  "sk_test_51LQAlnSBPB9EUUtKrC9J76qNd8KeEh5UQHQJdsF6Yjw8NAhXBe9DRfqLhcuexjSry7UAgBh5sc5js8G3URgSTzLt00zdhDtJKi"
);

router.post("/", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
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

// const paymentIntent = await stripe.paymentIntents.create({
//     type: 'card',
//     amount: req.body.amount,
//     currency: "inr",

//     automatic_payment_methods: {
//       enabled: true,
//     },
// });
