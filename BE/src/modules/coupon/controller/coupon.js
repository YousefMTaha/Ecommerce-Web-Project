import couponModel from "../../../../DB/model/Coupon.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";


export const addCoupon = asyncHandler(async (req, res, next) => {
    req.body.createdBy = req.user._id;
    const coupon = await couponModel.create(req.body)
    return res.json({ messgae: "Coupon Added Successfully", coupon });
});

export const getCoupon = asyncHandler(async (req, res, next) => {
    const coupons = await couponModel.findById(req.params._id).populate("createdBy");
    return res.json({ messgae: "Coupon Returned Successfully", coupons });
})

export const getAllCoupons = asyncHandler(async (req, res, next) => {
    const coupons = await couponModel.find().populate("createdBy");
    return res.json({ messgae: "All Coupons Returned Successfully", coupons });
})

// update usages
export const useCoupon = asyncHandler(async (req, res, next) => { })

export const removeCoupon = asyncHandler(async (req, res, next) => { });

