import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const protect = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Check Authorization header exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // 2️⃣ Extract token from "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];
    }

    // 3️⃣ If token missing → block
    if (!token) {
      return res.status(401).json({
        msg: { title: "Authentication Failed! 🧑‍💻" },
      });
    }

    // 4️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5️⃣ Fetch user from DB
    req.user = await userModel.findById(decoded.id).select("-password");

    // 6️⃣ If user not found
    if (!req.user) {
      return res.status(401).json({
        msg: { title: "User not found!" },
      });
    }

    // 7️⃣ Allow request to continue
    next();
  } catch (error) {
    return res.status(401).json({
      msg: { title: "Authentication Failed! 🧑‍💻" },
    });
  }
};

export default protect;
