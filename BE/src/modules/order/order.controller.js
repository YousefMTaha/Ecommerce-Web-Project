import orderModel from "../../../DB/model/Order.model.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import Stripe from "stripe";
import { orderStatus } from "../../utils/systemConstants.js";
import productModel from "../../../DB/model/Product.model.js";
import { sendEmail } from "../../utils/email.js";
// import axios from "axios";
export const create = asyncHandler(async (req, res, next) => {
  // if user use coupon (update info in DB)
  if (req.coupon) {
    req.coupon.usages -= 1;
    req.coupon.users[req.user._id] += 1;
    await req.coupon.updateOne(req.coupon);
  }

  // if (req.order.paymentUrl) {
  //   const response = await axios.get(req.order.paymentUrl);

  //   // Redirect the user to the Stripe URL
  //   return res.setHeader("Access-Control-Allow-Origin", "*").redirect(response.request.res.responseUrl);
  // }
  return res.status(200).json({ message: "done", order: req.order });
});

export const cancel = asyncHandler(async (req, res, next) => {
  // return the products to stock
  for (const product of req.order.products) {
    await productModel.updateOne(
      {
        _id: product.id,
      },
      {
        $inc: { stock: product.quantity },
      }
    );
  }

  // change the status to canceled
  req.order.status = orderStatus.canceled;
  await req.order.save();

  return res.status(200).json({ message: "done", refund: req.order.refund });
});

export const webhook = asyncHandler(async (request, response) => {
  const stripe = new Stripe(process.env.PAYMENT_SECRET_KEY);
  const endpointSecret = process.env.ENDPOINT_SECRET;
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const metadata = event.data.object.metadata;
      const paymentIntent = event.data.object.payment_intent;

      await orderModel.updateOne(
        { _id: metadata.orderId },
        {
          paymentIntent,
          status: orderStatus.chipping,
        }
      );

      break;
    case "charge.refunded":
      const refundCreated = event.data.object;
      // Then define and call a function to handle the event refund.created
      if (!refundCreated.refunded)
        return res
          .status(200)
          .json({ reasonFail: refundCreated.failure_message });

      const html = `<a href=${refundCreated.receipt_url}> Refund Info </a>`;
      await sendEmail({
        to: refundCreated.billing_details.email,
        subject: "Refund",
        html,
      });
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});
