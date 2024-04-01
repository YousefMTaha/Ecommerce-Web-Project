import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../utils/errorHandling.js";
import { ModifyError } from "../utils/classError.js";

export const isExist = (model) => {
  return asyncHandler(async (req, res, next) => {
    // construct model name from model
    const modelName = model.modelName.toLowerCase();
    // check the id exist ?
    const isModelExist = await model.findById(req.params.id);
    if (!isModelExist)
      return next(
        new ModifyError(`${modelName} id doesn't exist`, StatusCodes.NOT_FOUND)
      );

    // add model data to the request object to use it throw other middlewares
    req[`${modelName}`] = isModelExist;
    next();
  });
};
