import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { JOB_TYPE, JOB_STATUS, USER_ROLE } from "../utils/constants.js";
import Job from "../models/Job.js";
import User from "../models/User.js";

const withValidationErrors = function (validateValues) {
  return [
    validateValues,
    (req, res, next) => {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        const errorMessages = validationErrors
          .array()
          .map((error) => error.msg);

        // check for not found error
        if (errorMessages[0].startsWith("No job")) {
          throw new NotFoundError(errorMessages);
        }

        if (errorMessages[0].startsWith("Not authorized")) {
          throw new UnauthorizedError("Not authorized to access this document");
        }

        // all errors except not found error
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company")
    .notEmpty()
    .withMessage("company::Company is a required field.\n"),
  body("position")
    .notEmpty()
    .withMessage("position::Position is a required field.\n"),
  body("jobLocation")
    .notEmpty()
    .withMessage("Location::Job location is a required field.\n"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage(
      `jobStatus**::Invalid job Status. Valid choices are (${Object.values(
        JOB_STATUS,
      ).join(", ")})\n`,
    ),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage(
      `jobType::Invalid job Status. Valid choices are (${Object.values(
        JOB_TYPE,
      ).join(", ")})\n`,
    ),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name::Name is a required field.\n"),
  body("email")
    .notEmpty()
    .withMessage("email::Email is a required field.\n")
    .isEmail()
    .withMessage("email::Email is not a valid email address.\n")
    .custom(async (email) => {
      const isUniqueEmail = !(await User.findOne({ email }).count());
      if (!isUniqueEmail) {
        throw new BadRequestError("email::Email must be unique.\n");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password::Password is a required field.\n")
    .isLength({ min: 8 })
    .withMessage("password::Password must be at least 8 characters long\n")
    .custom((password) => {
      //* check password strength
      return !!password.match(
        /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
      );
    })
    .withMessage(
      "password::Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.\n",
    ),
  body("lastName")
    .notEmpty()
    .withMessage("password::Last name is a required field.\n"),
  body("location")
    .notEmpty()
    .withMessage("location::Location is a required field.\n"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name::Name is a required field.\n"),
  body("email")
    .notEmpty()
    .withMessage("email::Email is a required field.\n")
    .isEmail()
    .withMessage("email::Email is not a valid email address.\n")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("email:Email must be unique.\n");
      }
    }),
  body("lastName")
    .notEmpty()
    .withMessage("lastName::Last name is a required field.\n"),
  body("location")
    .notEmpty()
    .withMessage("location::Location is a required field.\n"),
]);

export const validtateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email::Email is a required field.\n")
    .isEmail()
    .withMessage("email::Email is not a valid email address.\n"),
  body("password")
    .notEmpty()
    .withMessage("password::Password is a required field.\n"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValid = mongoose.Types.ObjectId.isValid(value);
    if (!isValid) {
      throw new BadRequestError("Invalid MongoDB Id.");
    }
    const job = await Job.findById(value);
    if (!job) {
      throw new NotFoundError(`No job found with id ${value}`);
    }
    // only admins or resource owner has access to resource
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError("Not authorized to access this document");
    }
  }),
]);
