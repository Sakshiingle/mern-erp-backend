import express from "express";
const router = express.Router();
import { registerUser, login } 
from "../controllers/authControllers.js";

// sanity check
router.get("/", (req, res) => {
  res.send("Auth Routes Working");
});

// PUBLIC
router.post("/register", registerUser);
router.post("/login", login);

export default router;
