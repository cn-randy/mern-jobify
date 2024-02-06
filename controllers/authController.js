import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";
import { TIME } from "../utils/constants.js";

/**
 ** Register a new user
 ** The first user created always has the role of admin
 ** All other users have the role of user unless overridden by user input
 *
 * @method POST
 * @route /api/v1/auth/register
 * @param req  - HTTP request object
 * @param res  - HTTP response object]
 * @returns {Promise<void>}
 */

export const register = async function (req, res) {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? "admin" : req.body.role || "user";

  let user = new User();
  Object.entries(req.body).forEach((value) => (user[value[0]] = value[1]));
  await user.save();

  res.status(StatusCodes.CREATED).json({ message: "user created" });
};

export const login = async function (req, res) {
  const user = await User.findOne({ email: req.body.email }).select(
    "+password",
  );

  // validate user credentials
  const isValidUser = user && user.validatePassword(req.body.password);
  if (!isValidUser) {
    throw new UnauthenticatedError("Invalid Credentials.");
  }

  // Jwt token
  const token = createJWT({ userId: user._id, role: user.role });
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + TIME.ONE_DAY_MS * TIME.TOKEN_EXPIRY),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ message: "User logged in." });
};
/**
 * Logout currently logged in user be deleting jwt http token (i.e. set cookie to expire sometime in thr past)
 * @param req    - http request object
 * @param res    - http response object
 */
export const logout = function (req, res) {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() - TIME.ONE_DAY_MS),
  });

  res.status(StatusCodes.OK).json({ message: "User logged out." });
};
