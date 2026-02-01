import express from "express";
import { createSalesOrder } from "../controllers/salesOrderController.js";
import protect from "../middlewares/authMiddleware.js";
import  roleCheck  from "../middlewares/roleMiddleware.js";

const router = express.Router();

/*
  Route: POST /api/sales-orders
  Access: Sales, Admin
*/
router.post(
  "/",
  protect,
  roleCheck("sales", "admin"),
  createSalesOrder
);

export default router;
