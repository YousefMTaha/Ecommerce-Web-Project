import { StatusCodes } from "http-status-codes";
import joi from "joi";
import { Types } from "mongoose";
import { userRoles } from "../utils/systemConstants.js";

const validateObjectId = (value, helper) =>
  Types.ObjectId.isValid(value) ? true : helper.message("In-valid objectId");

export const generalFields = {
  email: joi.string().email({
    minDomainSegments: 2,
    maxDomainSegments: 4,
    tlds: { allow: ["com", "net"] },
  }),
  password: joi.string(),
  cPassword: joi.string().valid(joi.ref("password")).required(),
  _id: joi.string().custom(validateObjectId),
  phone: joi.string().regex(/^01[0-2,5]{1}[0-9]{8}$/),
  name: joi.string().min(3).max(10),
  role: joi.string().valid(userRoles.Admin, userRoles.User),
  file: joi.object({
    size: joi.number().positive().required(),
    path: joi.string().required(),
    filename: joi.string().required(),
    destination: joi.string().required(),
    mimetype: joi.string().required(),
    encoding: joi.string().required(),
    originalname: joi.string().required(),
    fieldname: joi.string().required(),
  }),
};
export const validation = (schema) => {
  return (req, res, next) => {
    const dataMethods = ["body", "params", "query", "headers", "file", "files"];
    const validationErr = [];
    dataMethods.forEach((key) => {
      if (schema[key]) {
        const validationResult = schema[key].validate(req[key], {
          abortEarly: false,
        });
        if (validationResult.error) {
          validationErr.push(validationResult.error);
        }
      }
    });

    if (validationErr.length) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Validation Err", validationErr });
    }

    return next();
  };
};

export const IdValidator = {
  body: joi.object({}).required(),
  params: joi
    .object({
      _id: generalFields._id.required(),
    })
    .required(),
  query: joi.object({}).required(),
};
