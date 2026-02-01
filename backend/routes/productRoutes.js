import express from "express";
const router = express.Router();

import protect from "../middlewares/authMiddleware.js";
import roleCheck from "../middlewares/roleMiddleware.js";
import {createProduct, getAllProducts, getProductById, updateProduct ,deleteProduct} from "../controllers/productControllers.js";


// Admin-only: create product
router.post(
  "/",
  protect,
  roleCheck("admin"),
  createProduct
);


// Get all products (admin, inventory, sales)
router.get(
  "/",
  protect,
  roleCheck("admin", "inventory", "sales"),
  getAllProducts
);
// Get product by ID (admin, inventory, sales)
router.get(
  "/:id",
  protect,
  roleCheck("admin", "inventory", "sales"),
  getProductById
);
router.put(
  "/:id",
  protect,
  roleCheck("admin", "inventory"),
  updateProduct
);
router.delete(
  "/:id",
  protect,
  roleCheck("admin"),
  deleteProduct
);



export default router;
