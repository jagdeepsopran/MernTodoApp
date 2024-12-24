import { Todo } from "../models/todoSchema.js";

export async function createTodoController(req, res) {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Please provide a title and description" });
    }

    await Todo({ title, description }).save();

    return res.status(200).json({
      success: true,
      message: "todo added successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
}

export async function updateTodoController() {}
export async function deleteTodoController() {}
export async function getAllTodoController() {}
