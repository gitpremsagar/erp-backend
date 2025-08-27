import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductStats,
} from "../controller/product.controller";
import {
  validateCreateProduct,
  validateUpdateProduct,
  validateProductQuery,
} from "../middleware/product.middleware";
import { validateAccessToken } from "../middleware/auth.middleware";

const router = express.Router();

// Protected routes - require authentication
router.use(validateAccessToken);

// Create a new product
router.post("/", validateCreateProduct, createProduct);

// Get all products with pagination and filtering
router.get("/", validateProductQuery, getProducts);

// Get product statistics
router.get("/stats", getProductStats);

// Get a single product by ID
router.get("/:id", getProductById);

// Update a product
router.put("/:id", validateUpdateProduct, updateProduct);

// Delete a product
router.delete("/:id", deleteProduct);

export default router;
