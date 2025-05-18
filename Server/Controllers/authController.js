import bcrypt from "bcryptjs";
import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password, phone, bio } = req.body;

  if (!name || !email || !password) {
    return res.json({ succes: false, message: "Missing Necessary Details" });
  }

  try {
    const excistingUser = await userModel.findOne({ email });

    if (excistingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      bio,
    });

    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: process.env.NODE_ENV === "development" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({
      success: true,
      message: "User Created successfully ^_^",
      token,
    });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ succes: false, message: "Missing Details" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        succes: false,
        message: "User Dosen't exists, Please Sign Up",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true, // ✅ Secure, can't be accessed via JavaScript
      secure: process.env.NODE_ENV !== "development", // ✅ Secure in production
      sameSite: "strict", // ✅ Prevent CSRF
      path: "/", // ✅ Available on all routes
      maxAge: 7 * 24 * 60 * 60 * 1000, // ✅ 7 days expiry
    });

    return res.json({ success: true, message: "Logged In" });
  } catch (error) {
    return res.json({ succes: false, message: error });
  }
};

export const logout = async (req, res) => {
  const isProduction = process.env.NODE_ENV !== "development";
  try { // <<<< THIS IS YOUR TRY BLOCK
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/", // Important to match the path used when setting the cookie
    });
    return res.json({ success: true, message: "Logged Out" });
  } catch (error) { // <<<< YOU ARE LIKELY MISSING THIS CATCH BLOCK OR IT'S MALFORMED
    console.error("Error during logout:", error); // Good practice to log the error on the server
    // Send a generic error response to the client
    return res.status(500).json({ success: false, message: "Logout failed. Please try again." });
  }
};

