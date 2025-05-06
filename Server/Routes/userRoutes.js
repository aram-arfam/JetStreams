import express from "express";
import {
  getProfile,
  setProfile,
  userList,
} from "../Controllers/userController.js";
import userAuth from "../Middleware/userAuth.js";

const userRouter = express.Router();

userRouter.get("/profile", userAuth, getProfile);
userRouter.put("/profile", userAuth, setProfile);
userRouter.get("/userlist", userList);

export default userRouter;
