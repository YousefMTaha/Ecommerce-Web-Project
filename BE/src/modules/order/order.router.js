import { Router } from "express";
import auth from "../../middleware/auth.js";
import * as orderMiddleware from "./order.middleware.js";
import * as orderController from "./order.controller.js";
import { isExist } from "../../middleware/isExist.js";
import orderModel from "../../../DB/model/Order.model.js";
import {
  reqDataForms,
  uniqueFields,
  userRoles,
} from "../../utils/systemConstants.js";
import { isOwner } from "../../middleware/isOwner.js";
import couponModel from "../../../DB/model/Coupon.model.js";
import * as couponMiddleware from "../coupon/coupon.middleware.js";
import { isCartEmpty } from "../cart/cart.middleware.js";
import { ModifyError } from "../../utils/classError.js";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get(
  "/",
  (req, res, next) => {
    console.log({ body: req.body, params: req.params, headers: req.headers });
    next();
  },
  auth(),
  async (req, res, next) => {
    const orders = await orderModel
      .find({ createdBy: req.user._id })
      .populate("products.id");
    return orders.length
      ? res.status(200).json({ message: "done", orders })
      : next(new ModifyError("no orders found", StatusCodes.NOT_FOUND));
  }
);

// Generate order

/*
========================= ORDER PROCESS =========================
1- check if the products exist and there's stock enough 
2- if does update stock and empty the cart and produce to the order process 
3- (if user use coupoun) check if this coupon still exist in DB and valid to use
4- (in case user use cash as payment method) make status of the order shipping 
5- (in case user use card as payment method) integrate with Stripe gateway to create payment link and make status of the order wait_for_payment
6- return response to user with information about order (cash) or payment link (card)
*/
router.post(
  "/",
  (req, res, next) => {
    console.log({ body: req.body, params: req.params, headers: req.headers });
    next();
  },
  auth(),
  isCartEmpty,
  // isExist({
  //   model: couponModel,
  //   dataFrom: reqDataForms.body,
  //   searchData: uniqueFields.couponCode,
  //   isId: false,
  // }),
  // couponMiddleware.couponValidity,
  // couponMiddleware.userValidity,
  orderMiddleware.isProductsOrder,
  orderMiddleware.orderCard,
  orderMiddleware.orderCash,
  orderController.create
);

// payment gateway
router.post("/webhook", orderController.webhook);

// if user want to cancel the order
router.put(
  "/:_id",
  auth([userRoles.User]),
  isExist({ model: orderModel }),
  isOwner(orderModel),
  orderMiddleware.refund,
  orderController.cancel
);

export default router;
