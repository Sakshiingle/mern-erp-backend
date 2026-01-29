import express from "express";
const router = express.Router();

import protect from "../middlewares/authMiddleware.js";
import roleCheck from "../middlewares/roleMiddleware.js";
import {createProduct, getProducts, getProductById, updateProduct ,deleteProduct} from "../controllers/productControllers.js";


// Admin-only: create product
router.post(
  "/",
  protect,
  roleCheck("admin"),
  createProduct
);

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
