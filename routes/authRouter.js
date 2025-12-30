import express from "express";
import * as usersControllers from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../schemas/usersSchemas.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), usersControllers.register);
authRouter.post("/login", validateBody(loginSchema), usersControllers.login);

export default authRouter;
