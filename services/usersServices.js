import User from "../models/User.js";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: "200", d: "identicon" }, true);
  const verificationToken = uuidv4();
  
  const user = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
    verificationToken,
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

export const findUserByVerificationToken = async (verificationToken) => {
  return await User.findOne({ where: { verificationToken } });
};

export const verifyUser = async (id) => {
  await User.update(
    { verify: true, verificationToken: null },
    { where: { id } }
  );
};

export const updateVerificationToken = async (id) => {
  const verificationToken = uuidv4();
  await User.update({ verificationToken }, { where: { id } });
  return verificationToken;
};
