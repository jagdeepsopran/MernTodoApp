import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(express.json()); //middleware -> req middleware  res

dbConnect();

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/todo", todoRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
