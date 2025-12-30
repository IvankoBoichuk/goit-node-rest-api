import express from "express";
import * as usersControllers from "../controllers/usersControllers.js";
import validateBody from "../helpers/validateBody.js";
import { registerSchema } from "../schemas/usersSchemas.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), usersControllers.register);

export default authRouter;
