import express from "express";
import protect from "../middlewares/authMiddleware.js";
import roleCheck from "../middlewares/roleMiddleware.js";
import { getAllUsers, updateUserRole, deleteUserById, toggleUserStatus,} from "../controllers/userControllers.js";


const router = express.Router();

// Admin: get all users
router.get(
  "/",
  protect,
  roleCheck("admin"),
  getAllUsers
);

router.put(
  "/:id/role",
  protect,
  roleCheck("admin"),
  updateUserRole
);
router.delete(
  "/:id",
  protect,
  roleCheck("admin"),
  deleteUserById
);
router.put(
  "/:id/status",
  protect,
  roleCheck("admin"),
  toggleUserStatus
);


export default router;
