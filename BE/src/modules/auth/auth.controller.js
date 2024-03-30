import bcryptjs from "bcryptjs";
import userModel from "../../../DB/model/User.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../../utils/errorHandling.js";
import { userStatus } from "../../utils/systemConstants.js";

export const signup = asyncHandler(async (req, res, next) => {
  // Check if email is already exist
  const isEmail = await userModel.findOne({ email: req.body.email });
  if (isEmail) return next(new Error("Email is already exist"));

  // hashing user password
  req.body.password = bcryptjs.hashSync(
    req.body.password,
    +process.env.SALT_ROUND // 9
  );

  // Add user info to DB
  const user = await userModel.create(req.body);

  // return response with user info
  return res.json({ message: "Done", user });
});

export const login = asyncHandler(async (req, res, next) => {
  // constract data from body
  const { email, password } = req.body;

  // check if user is exist
  const isEmail = await userModel.findOne({ email });
  if (!isEmail) return next(new Error("invalid info"));

  // check if the password matching with hashed password in DB
  if (!bcryptjs.compareSync(password, isEmail.password))
    return next(new Error("invalid info"));

  // generate token to the login user
  const token = jwt.sign({ id: isEmail._id }, process.env.TOKEN_SIGNATURE);

  isEmail.status = userStatus.Online; // Change status of user to online
  await isEmail.save(); // apply changes into DB

  // return response with token
  return res.json({ message: "done", token });
});