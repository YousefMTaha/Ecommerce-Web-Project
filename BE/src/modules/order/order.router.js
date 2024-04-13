import { Router } from "express";
import auth from "../../middleware/auth.js";
import * as orderMiddleware from "./order.middleware.js";
import * as orderController from "./order.controller.js";
import { isExist } from "../../middleware/isExist.js";
import orderModel from "../../../DB/model/Order.model.js";
import { reqDataForms, uniqueFields } from "../../utils/systemConstants.js";
import { isOwner } from "../../middleware/isOwner.js";

const router = Router();

router.get("/", (req, res) =>
  res.status(200).json({ mesasge: `${req.originalUrl} Page` })
);
// Generate order
router.post(
  "/",
  auth(),
  orderMiddleware.isProductsOrder,
  orderMiddleware.orderCard,
  orderMiddleware.orderCash,
  orderController.create
);

// payment gateway
router.post("/webhook", orderController.webhook);

router.put(
  "/:_id",
  auth(),
  isExist({ model: orderModel }),
  isOwner(orderModel),
  orderMiddleware.refund,
  orderController.cancel
);

export default router;
