import User from "../models/User.js";
import bcrypt from "bcrypt";

export const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword,
  });

  return user;
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

export const findUserById = async (id) => {
  return await User.findByPk(id);
};

export const updateUserToken = async (id, token) => {
  await User.update({ token }, { where: { id } });
};
