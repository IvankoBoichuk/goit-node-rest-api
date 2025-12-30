import express from "express";
import * as usersControllers from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema, subscriptionSchema } from "../schemas/usersSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), usersControllers.register);
authRouter.post("/login", validateBody(loginSchema), usersControllers.login);
authRouter.post("/logout", authenticate, usersControllers.logout);
authRouter.get("/current", authenticate, usersControllers.current);
authRouter.patch("/subscription", authenticate, validateBody(subscriptionSchema), usersControllers.updateSubscription);

export default authRouter;
