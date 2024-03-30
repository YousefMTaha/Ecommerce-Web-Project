import jwt from "jsonwebtoken";
import userModel from "../../DB/model/User.model.js";
import { userRoles, userStatus } from "../utils/systemConstants.js";
import { asyncHandler } from "../utils/errorHandling.js";

const auth = (roles = Object.values(userRoles)) => {
  return asyncHandler(async (req, res, next) => {
    // constract token from headers
    let { token } = req.headers;
    if (!token) return next(new Error("token must be entered"));

    // validate the beaerer key
    if (!token.startsWith(process.env.BEARER_KEY))
      return next(new Error("invalid bearer key"));

    // split the bearer key from original token =>  "bearer_token" => ["","token"]
    token = token.split(process.env.BEARER_KEY)[1];

    // constract id from token
    const { id } = jwt.verify(token, process.env.TOKEN_SIGNATURE);
    if (!id) return next(new Error("invalid payload"));

    // check if the user exist or not
    const user = await userModel.findById(id);
    if (!user) return next(new Error("user id doesn't exist"));

    // check the user authorization
    if (!roles.includes(user.role))
      return next(new Error("You are not authorized"));

    // check if user blocked
    if (user.status == userStatus.Blocked)
      return next(new Error("Your account has been blocked, contact us"));

    // check if user offline
    if (user.status == userStatus.Offline)
      return next(new Error("You need to login again"));

    // add the user object to the request object so it can be accessed throw the other middlewares
    req.user = user;

    // move to the next middleware
    return next();
  });
};

export default auth;
