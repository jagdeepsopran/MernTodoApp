import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: "user logged in successfully",
        token,
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
}

export async function logoutController(req, res) {
  try {
    return res.status(200).cookie("token", "").json({
      success: true,
      message: "logout successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "logout failed",
    });
  }
}
