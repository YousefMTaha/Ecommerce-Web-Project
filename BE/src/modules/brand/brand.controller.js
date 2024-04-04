import brandModel from "../../../DB/model/Brand.model.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const add = asyncHandler(async (req, res, next) => {
  req.body.createdBy = req.user._id;
  return res.json({
    message: "Done",
    brand: await brandModel.create(req.body),
  });
});
