import { StatusCodes } from "http-status-codes";
import { ModifyError } from "../utils/classError.js";
import { asyncHandler } from "../utils/errorHandling.js";

export const isNotExist = ({ model, searchData }) => {
  return asyncHandler(async (req, res, next) => {
    const inputDB = {};
    inputDB[searchData] = req.body[searchData];

    const isExist = await model.findOne(inputDB);

    if (isExist) {
      return next(
        new ModifyError(`${searchData} is already exist`, StatusCodes.CONFLICT)
      );
    }

    next();
  });
};
