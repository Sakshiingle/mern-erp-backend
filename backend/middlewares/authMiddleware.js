import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const protect = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2️⃣ If no token → block
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, token missing",
      });
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Fetch user from DB using decoded.id
    const user = await userModel.findById(decoded.id).select("-password");

    // 5️⃣ If user does not exist
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // 6️⃣ Attach FULL user object to request
    req.user = user;

    // 7️⃣ Continue
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, token invalid",
    });
  }
};

export default protect;
