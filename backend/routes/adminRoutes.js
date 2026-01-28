import express from "express";
import protect from "../middlewares/authMiddleware.js";
import roleCheck from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Admin-only test route
router.get(
  "/admin-only",
  protect,
  roleCheck("admin"),
  (req, res) => {
    res.status(200).json({
      message: "Welcome Admin. You have access.",
    });
  }
);

export default router;
