import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Config/MongoDB.js";
import SuggRouter from "./Routes/SuggRoute.js";
import authRouter from "./Routes/authRoutes.js";
import userRouter from "./Routes/userRoutes.js";
import MsgRouter from "./Routes/msgRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser());
const port = process.env.PORT || 4000;
connectDB();

app.use(express.json()); //**json**
app.use(
  cors({
    origin: "https://jetstreams-ui.onrender.com",
    credentials: true,
  })
);
//server-server auth

app.get("/", (req, res) => res.send("API Working"));
app.use("/api", SuggRouter);
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", MsgRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));
