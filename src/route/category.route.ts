import express from "express";
import {
  // Category controllers
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controller/category.controller";
import {
  // Category middleware
  validateCreateCategory,
  validateUpdateCategory,
} from "../middleware/category.middleware";
import { validateAccessToken } from "../middleware/auth.middleware";

const router = express.Router();

// Protected routes - require authentication
router.use(validateAccessToken);

// Category routes
router.post("/categories", validateCreateCategory, createCategory);
router.get("/categories", getCategories);
router.get("/categories/:id", getCategoryById);
router.put("/categories/:id", validateUpdateCategory, updateCategory);
router.delete("/categories/:id", deleteCategory);

export default router;
