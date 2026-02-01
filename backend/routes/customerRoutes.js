import express from "express";
import {
  createCustomer,
  getCustomers,
} from "../controllers/customerController.js";
import protect from "../middlewares/authMiddleware.js";
import  roleCheck  from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Admin + Sales can manage customers
router.post("/", protect, roleCheck("admin", "sales"), createCustomer);
router.get("/", protect, roleCheck("admin", "sales"), getCustomers);

export default router;
