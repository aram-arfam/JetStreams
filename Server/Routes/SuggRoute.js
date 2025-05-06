import express from "express";
import {
  createSuggestion,
  delSuggestions,
  getSuggestions,
} from "../Controllers/suggController.js";

const SuggRouter = express.Router();

SuggRouter.post("/suggestions", createSuggestion);
SuggRouter.get("/suggestions", getSuggestions);
SuggRouter.delete("/suggestions/:id", delSuggestions);

export default SuggRouter;
