import express from "express";
const router = express.Router();

import protect from "../middlewares/authMiddleware.js";
import userVerify from "../middlewares/verifyMiddleware.js";

import {
  registerUser,
  verifyToken,
  regenerateToken,
  login,
  changePassword,
  changeEmail,
  verifyChangeEmail,
  forgetPasswordInitiate,
  verifyForgetPasswordRequest,
} from "../controllers/authControllers.js";

router.get("/", (req, res) => {
  res.send("Auth Routes");
});

// PUBLIC
router.post("/register", registerUser);
router.post("/login", login);
router.put("/password/forget", forgetPasswordInitiate);
router.put("/password/verify/:email/:token", verifyForgetPasswordRequest);

// 🔐 PROTECTED (JWT REQUIRED)
router.get("/token/verify/:token", protect, verifyToken);
router.get("/token/regenerate", protect, regenerateToken);
router.put("/password", protect, userVerify, changePassword);
router.put("/email", protect, userVerify, changeEmail);
router.get("/email/verify/:token", protect, userVerify, verifyChangeEmail);

export default router;
