import jwt from "jsonwebtoken";

export const createJWT = function (payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

/**
 **  returns decoded jwt token
 *
 * @param token   - jwt token stored as http only cookie
 * @returns {*}   - decoded token object
 */
export const verifyJWT = function (token) {
  return jwt.verify(token, process.env.JWT_SECRET);
};
