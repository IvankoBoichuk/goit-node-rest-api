import * as usersServices from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await usersServices.findUserByEmail(email);
    if (existingUser) {
      throw HttpError(409, "Email in use");
    }

    const newUser = await usersServices.createUser(email, password);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
