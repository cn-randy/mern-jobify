import bcrypt from "bcryptjs";

export const hashPassword = function (password, salt = 10) {
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = function (candidatePassword, hashedPassword) {
  return bcrypt.compareSync(candidatePassword, hashedPassword);
};
