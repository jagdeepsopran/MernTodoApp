import express from "express";
import {
  createTodoController,
  deleteTodoController,
  getAllTodoController,
  updateTodoController,
} from "../controllers/todoControllers.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", auth, createTodoController);
router.put("/update/:id", auth, updateTodoController);
router.delete("/delete/:id", auth, deleteTodoController);
router.get("/getAllTodo", auth, getAllTodoController);

export default router;
