import { Router } from "express";
import auth from "../../middleware/auth.js";
import * as couponContoller from "./controller/coupon.js"
import { isNotExist } from "../../middleware/isNotExist.js";
import couponModel from "../../../DB/model/Coupon.model.js";
import { isExist } from "../../middleware/isExist.js";
import { reqDataForms, uniqueFields } from "../../utils/systemConstants.js";

const router = Router();

router.get(
    "/",
    auth(),
    couponContoller.getAllCoupons,
);

router.get(
    "/:_id",
    auth(),
    isExist({ model: couponModel, dataFrom: reqDataForms.body, searchData: uniqueFields.couponCode }),
    couponContoller.getCoupon,
);

router.post(
    "/",
    auth(),
    isNotExist({ model: couponModel, searchData: "code" }),
    couponContoller.addCoupon,
);



export default router;
