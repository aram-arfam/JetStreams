import express from "express";
import {
  createMessage,
  delMessages,
  getMessages,
} from "../Controllers/msgController.js";

const MsgRouter = express.Router();

MsgRouter.post("/messages", createMessage);
MsgRouter.get("/messages", getMessages);
MsgRouter.delete("/messages/:id", delMessages);

export default MsgRouter;
