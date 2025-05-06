import express from "express";
import userAuth from "../Middleware/userAuth.js";

import { login, logout, register } from "../Controllers/authController.js";

const authRouter = express.Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
