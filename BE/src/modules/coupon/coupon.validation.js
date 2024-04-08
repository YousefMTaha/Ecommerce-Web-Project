import { StatusCodes } from "http-status-codes";
import { ModifyError } from "../../utils/classError.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const couponValidity = () => {
    return asyncHandler(async (req, res, next) => {
        if (req.coupon.usages <= 0) {
            return next(new ModifyError(`coupon is not active`, StatusCodes.FORBIDDEN))
        }
        next();
    })
}

export const userValidity = () => {
    return asyncHandler(async (req, res, next) => {
        if (!req.coupon.users[req.user._id]) {
            req.coupon.users[req.user._id] = 0
        }
        if (req.coupon.users[req.user._id] >= req.coupon.limit) {
            return next(new ModifyError(`user reach his limit`, StatusCodes.FORBIDDEN))
        }
        next();
    })
}