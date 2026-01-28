import express from "express";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @route   GET /api/protect/me
 * @desc    Test JWT authentication
 * @access  Private (JWT required)
 */
router.get("/me", protect, (req, res) => {
  // If JWT is valid, protect middleware
  // attaches user data to req.user
  res.status(200).json({
    msg: "JWT is valid ✅",
    user: req.user,
  });
});

export default router;
