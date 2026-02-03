import express from "express";
import { createSalesOrder } from "../controllers/salesOrderController.js";
import protect from "../middlewares/authMiddleware.js";
import roleCheck from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Create sales order (Admin + Sales)
router.post(
  "/",
  protect,
  roleCheck("admin", "sales"),
  createSalesOrder
);

export default router;
