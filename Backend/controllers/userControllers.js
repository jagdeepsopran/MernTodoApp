import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";

export async function registerController(req, res) {
  try {
    let { fullName, username, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = {
      fullName,
      email,
      username,
      password: hashedPassword,
    };

    await User(updatedUser).save();

    return res.status(201).json({
      success: true,
      message: "user created successfully",
      updatedUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
}

export async function loginController(req, res) {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "user not exists , please register",
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "invalid credentials!!",
      });
    }

    // Authentication and authorization using JWT Token

    return res.status(200).json({
      success: true,
      message: "user logged in successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
}
