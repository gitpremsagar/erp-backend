import express from "express";
import {
  // SubCategory controllers
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} from "../controller/subcategory.controller";
import {
  // SubCategory middleware
  validateCreateSubCategory,
  validateUpdateSubCategory,
} from "../middleware/subcategory.middleware";
import { validateAccessToken } from "../middleware/auth.middleware";

const router = express.Router();

// Protected routes - require authentication
// router.use(validateAccessToken);

// SubCategory routes
router.post("/", validateCreateSubCategory, createSubCategory);
router.get("/", getSubCategories);
router.get("/:id", getSubCategoryById);
router.put("/:id", validateUpdateSubCategory, updateSubCategory);
router.delete("/:id", deleteSubCategory);

export default router;
