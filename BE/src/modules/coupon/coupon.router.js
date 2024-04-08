import { Router } from "express";
import * as couponContoller from "./controller/coupon.js"
import couponModel from "../../../DB/model/Coupon.model.js";
import auth from "../../middleware/auth.js";
import { isNotExist } from "../../middleware/isNotExist.js";
import { isExist } from "../../middleware/isExist.js";
import { isOwner } from '../../middleware/isOwner.js';
import { reqDataForms, uniqueFields } from "../../utils/systemConstants.js";
import { couponValidity, userValidity } from "./coupon.validation.js";

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

// use coupon for one time
router.put(
    "/use/:_id",
    auth(),
    isExist({ model: couponModel, dataFrom: reqDataForms.parmas, searchData: uniqueFields.id }),
    couponValidity(),
    userValidity(),
    couponContoller.useCoupon,
);

// update coupon data
router.put(
    "/:_id",
    auth(),
    isExist({ model: couponModel, dataFrom: reqDataForms.parmas, searchData: uniqueFields.id }),
    isOwner(couponModel),
    couponContoller.updateCoupon,
);

router.delete(
    "/:_id",
    auth(),
    isExist({ model: couponModel, dataFrom: reqDataForms.parmas, searchData: uniqueFields.id }),
    isOwner(couponModel),
    couponContoller.removeCoupon,
);



export default router;
