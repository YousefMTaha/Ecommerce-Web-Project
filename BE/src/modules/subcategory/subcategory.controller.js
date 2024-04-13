import subcategoryModel from "../../../DB/model/Subcategory.model.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const add = asyncHandler(async (req, res, next) => {
  req.body.categoryId = req.params.categoryId;
  req.body.createdBy = req.user._id;
  req.subcategory = await subcategoryModel.create(req.body);
  return next();
});

export const remove = asyncHandler(async (req, res, next) => {
  await req.subcategory.deleteOne();
  return res.status(200).json({ message: "Done" });
});

export const update = asyncHandler(async (req, res, next) => {
  await req.subcategory.updateOne(req.body);
  return res.status(200).json({ message: "Done" });
});
