import { StatusCodes } from "http-status-codes";
import couponModel from "../../../DB/model/Coupon.model.js";
import { ModifyError } from "../../utils/classError.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const couponValidity = () => {
    return asyncHandler(async (req, res, next) => {
        const coupon = await couponModel.findOne(req.coupon.code)
        if (coupon.usages <= 0) {
            return next(new ModifyError(`coupon is not active`, StatusCodes.FORBIDDEN))
        }
        next();
    })
}

export const userValidity = () => {
    return asyncHandler(async (req, res, next) => {
        const coupon = await couponModel.findOne(req.coupon.code)
        if (coupon.users[req.user._id] >= coupon.limit) {
            return next(new ModifyError(`user reach his limit`, StatusCodes.FORBIDDEN))
        }
        next();
    })
}