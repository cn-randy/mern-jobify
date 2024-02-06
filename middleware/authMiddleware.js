import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async function (req, res, next) {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("Authentication Invalid.");
  }
  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === process.env.TEST_USER_ID;
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const testForTestUser = function (req, res, next) {
  if (req.testUser) throw BadRequestError("Test User (read only)");

  next();
};

export const authorizedPermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this function.");
    }

    next();
  };
};
