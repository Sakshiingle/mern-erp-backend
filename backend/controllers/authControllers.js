import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

/* ===================== REGISTER ===================== */
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      throw new Error("Please give name, email and password.");
    }

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      throw new Error("User already exists.");
    }

    const user = await userModel.create({
      name,
      email,
      password,
      role: role || "user", // ✅ FIX
    });

    return res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* ===================== LOGIN ===================== */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please give email and password.");
    }

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("User does not exist.");
    }

    // Block inactive users
    if (!user.isActive) {
      return res.status(403).json({
        message: "Your account is deactivated. Please contact admin.",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new Error("Incorrect password.");
    }

    return res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // ✅ important
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { registerUser, login };
