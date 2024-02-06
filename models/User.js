import mongoose from "mongoose";
import { USER_ROLE } from "../utils/constants.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: {
    type: String,
    select: false,
  },
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "Precambria",
  },
  role: {
    type: String,
    enum: Object.values(USER_ROLE),
    default: USER_ROLE.USER,
  },
  avatar: String,
  avatarOublicId: String,
});

userSchema.pre("save", function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  user.password = hashPassword(user.password);
  next();
});

userSchema.methods.validatePassword = function (candidatePassword) {
  return comparePassword(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
