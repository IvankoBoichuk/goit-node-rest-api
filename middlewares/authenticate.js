import jwt from "jsonwebtoken";
import * as usersServices from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw HttpError(401, "Not authorized");
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw HttpError(401, "Not authorized");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const user = await usersServices.findUserById(decoded.id);

      if (!user || user.token !== token) {
        throw HttpError(401, "Not authorized");
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
        throw HttpError(401, "Not authorized");
      }
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export default authenticate;
