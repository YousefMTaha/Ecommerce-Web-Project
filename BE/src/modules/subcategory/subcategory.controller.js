import subcategoryModel from "../../../DB/model/Subcategory.model.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const add = asyncHandler(async (req, res, next) => {
  req.body.categoryId = req.params.categoryId;
  req.body.createdBy = req.user._id;
  const subcategory = await subcategoryModel.create(req.body);
  return res.json({ message: "done", subcategory });
});
