import productModel from "../../../DB/model/Product.model.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { ModifyError } from "../../utils/classError.js";
import { StatusCodes } from "http-status-codes";
import orderModel from "../../../DB/model/Order.model.js";
import { orderStatus, paymentMehods } from "../../utils/systemConstants.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.PAYMENT_SECRET_KEY);

export const isProductsOrder = asyncHandler(async (req, res, next) => {
  // check the prorducts of cart is exist ?
  let product = null;
  const orderProductsDB = [];
  const orderProductsStripe = [];

  for (const prod of req.cart.products) {
    // search for product in DB
    product = await productModel.findById(prod.id);
    if (!product)
      return next(
        new ModifyError("The product has been deleted", StatusCodes.NOT_FOUND)
      );

    // check the quantity
    if (!product.check_Stock(prod.quantity)) {
      return next(
        new ModifyError(
          "The stock is empty or the quantity is larger than the stock",
          StatusCodes.BAD_REQUEST
        )
      );
    }

    // update the stock of the product
    product.stock -= prod.quantity;
    await product.save();

    // push the product info with the quantity that user want into the array
    orderProductsDB.push({
      id: product._id,
      quantity: prod.quantity,
      price: product.price,
    });

    // push the product info needed for payment gateway into the array
    orderProductsStripe.push({
      product,
      quantity: prod.quantity,
    });
  }

  // empty the cart
  req.cart.products = [];
  await req.cart.save();

  // pass the order product to req
  req.orderProductsDB = orderProductsDB;
  req.orderProductsStripe = orderProductsStripe;

  next();
});

export const orderCash = asyncHandler(async (req, res, next) => {
  if (!(req.body.paymentMethod == paymentMehods.cash)) return next();

  const order = await orderModel.create({
    address: req.body.address,
    createdBy: req.user._id,
    products: req.orderProductsDB,
    status: orderStatus.chipping,
    phone: req.body.phone || req.user.phone,
  });

  req.order = order;

  next();
});

export const orderCard = asyncHandler(async (req, res, next) => {
  if (!(req.body.paymentMethod == paymentMehods.card)) return next();

  const order = await orderModel.create({
    address: req.body.address,
    createdBy: req.user._id,
    products: req.orderProductsDB,
    status: orderStatus.watting_for_payment,
    phone: req.body.phone || req.user.phone,
    paymentMehod: paymentMehods.card,
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: req.orderProductsStripe.map((ele) => {
      return {
        price_data: {
          currency: "EGP",
          product_data: { name: ele.product.name },
          unit_amount: ele.product.price * 100,
        },
        quantity: ele.quantity,
      };
    }),
    customer_email: req.user.email,
    cancel_url: process.env.SUCCESS_URL,
    success_url: process.env.SUCCESS_URL,
    metadata: {
      orderId: order._id.toString(),
      cartId: req.cart._id.toString(),
    },
  });

  req.order = session.url;
  next();
});

export const refund = asyncHandler(async (req, res, next) => {
  // make a refund operation if the user pay with card
  if (req.order.paymentMehod != paymentMehods.card) return next();

  const refund = await stripe.refunds.create({
    payment_intent: req.order.paymentIntent,
  });

  req.order.refund = refund;
  next();
});
