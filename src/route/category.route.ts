import express from "express";
import {
  // Category controllers
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  // Group controllers
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
  // SubCategory controllers
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
} from "../controller/category.controller";
import {
  // Category middleware
  validateCreateCategory,
  validateUpdateCategory,
  // Group middleware
  validateCreateGroup,
  validateUpdateGroup,
  // SubCategory middleware
  validateCreateSubCategory,
  validateUpdateSubCategory,
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

// Group routes
router.post("/groups", validateCreateGroup, createGroup);
router.get("/groups", getGroups);
router.get("/groups/:id", getGroupById);
router.put("/groups/:id", validateUpdateGroup, updateGroup);
router.delete("/groups/:id", deleteGroup);

// SubCategory routes
router.post("/subcategories", validateCreateSubCategory, createSubCategory);
router.get("/subcategories", getSubCategories);
router.get("/subcategories/:id", getSubCategoryById);
router.put("/subcategories/:id", validateUpdateSubCategory, updateSubCategory);
router.delete("/subcategories/:id", deleteSubCategory);

export default router;
