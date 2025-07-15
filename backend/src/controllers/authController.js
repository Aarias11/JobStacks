import User from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";


// REMEMBER TO TURN COOKIED BACK ON


// @desc   Register a new user
// @route  POST /api/users/register
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const user = new User({ name, email, passwordHash: password });
    await user.save();

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.status(201).json({
      message: "User registered successfully",
      token: {
        access: accessToken,
        refresh: refreshToken,
      },
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Login user
// @route  POST /api/users/login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please enter both fields" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token: {
        access: accessToken,
        refresh: refreshToken,
      },
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Get current logged-in user
// @route  GET /api/users/me
// @access Private
export const getCurrentUser = async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      created: user.createdAt,
    });
  } catch (err) {
    next(err);
  }
};

// @desc   Log out user (clear token cookie)
// @route  POST /api/users/logout
export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("refreshToken");

  res.status(200).json({ message: "Logged out successfully" });
};

// @desc   Refresh access token
// @route  POST /api/users/refresh-token
export const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token missing" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = generateAccessToken(decoded.id);

    res.status(200).json({ token: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired refresh token" });
  }
};