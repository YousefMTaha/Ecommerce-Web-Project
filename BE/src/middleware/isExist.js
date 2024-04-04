import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../utils/errorHandling.js";
import { ModifyError } from "../utils/classError.js";
import { reqDataForms, uniqueFields } from "../utils/systemConstants.js";

export const isExist = ({
  model,
  searchData = uniqueFields.id,
  dataFrom = reqDataForms.parmas,
}) => {
  return asyncHandler(async (req, res, next) => {
    // construct model name from model
    const modelName = model.modelName.toLowerCase();

    let isModelExist;

    if (req[dataFrom][searchData]) {
      // check the id exist ?
      isModelExist = await model.findById(req[dataFrom][searchData]);
      if (!isModelExist)
        return next(
          new ModifyError(
            `${modelName} ${searchData} doesn't exist`,
            StatusCodes.NOT_FOUND
          )
        );
    }
    // add model data to the request object to use it throw other middlewares
    req[modelName] = isModelExist;
    next();
  });
};
