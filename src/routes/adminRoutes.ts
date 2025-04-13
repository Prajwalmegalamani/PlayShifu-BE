import express from "express";
import { seedProductsController } from "../controllers/adminController";
import adminAuth from "../middleware/auth";

const router = express.Router();

// Seed products route
router.post("/seed", adminAuth, seedProductsController);

export default router;
