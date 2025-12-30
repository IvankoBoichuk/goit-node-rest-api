import User from "../models/User.js";
import bcrypt from "bcrypt";
import gravatar from "gravatar";

export const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: "200", d: "identicon" }, true);
  
  const user = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
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

export const updateUserSubscription = async (id, subscription) => {
  await User.update({ subscription }, { where: { id } });
  return await User.findByPk(id);
};

export const updateUserAvatar = async (id, avatarURL) => {
  await User.update({ avatarURL }, { where: { id } });
  return await User.findByPk(id);
};
