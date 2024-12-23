import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config();

app.use(express.json()); //middleware -> req middleware  res

dbConnect();

app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
