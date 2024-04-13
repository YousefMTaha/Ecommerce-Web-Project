import userModel from "../../../DB/model/User.model.js";
import { ModifyError } from "../../utils/classError.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { StatusCodes } from "http-status-codes";


export const getData = asyncHandler(async (req, res, next) => {
  return res.status(200).json({ messaeg: "Done", user: req.user });
});

export const update = asyncHandler(async (req, res, next) => {
  // check if new email is taken by another user
  const isNewEmail = await userModel.findOne({
    _id: { $ne: req.user._id },
    email: req.body.email,
  });
  if (isNewEmail)
    return next(
      new ModifyError("Email is already taken", StatusCodes.CONFLICT)
    );

  await req.user.updateOne(req.body); // update data into DB
  return res.status(200).json({ messaeg: "Done" });
});

export const remove = asyncHandler(async (req, res, next) => {
  await req.user.deleteOne();
  return res.status(200).json({ messaeg: "Done" });
});
