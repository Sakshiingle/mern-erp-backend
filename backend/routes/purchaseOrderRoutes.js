import express from "express";
import {
  createPurchaseOrder,
  getPurchaseOrders,
} from "../controllers/purchaseOrderController.js";
import protect from "../middlewares/authMiddleware.js";
import roleCheck from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Admin + Purchase role can manage purchase orders
router.post("/", protect, roleCheck("admin", "purchase"), createPurchaseOrder);
router.get("/", protect, roleCheck("admin", "purchase"), getPurchaseOrders);

export default router;
