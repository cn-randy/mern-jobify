import { StatusCodes } from "http-status-codes";
import cloudinary from "cloudinary";
import User from "../models/User.js";
import Job from "../models/Job.js";
import { formatImage } from "../middleware/multerMiddleware.js";

export const getCurrentUser = async function (req, res) {
  const user = await User.findById(req.user.userId);
  res.status(StatusCodes.OK).json({ user });
};

export const getApplicationStats = async function (req, res) {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

/**
 * Update current users profile.
 * There is a special procedure to update a users password therefore
 * make sure to remove the password property from the data if it is present
 *
 * @param req    - http request object
 * @param res    - http response object
 * @returns {Promise<void>}
 */
export const updateUser = async function (req, res) {
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

    if (req.file && updatedUser.avatarPublicId) {
      await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ updatedUser });
};
