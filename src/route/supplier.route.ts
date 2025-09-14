import express from "express";
import {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
  getSupplierStats,
} from "../controller/supplier.controller";
import {
  validateCreateSupplier,
  validateUpdateSupplier,
  validateSupplierQuery,
} from "../middleware/supplier.middleware";
import { validateAccessToken } from "../middleware/auth.middleware";

const router = express.Router();

// Protected routes - require authentication
// router.use(validateAccessToken);

// Create a new supplier
router.post("/", validateCreateSupplier, createSupplier);

// Get all suppliers with pagination and filtering
router.get("/", validateSupplierQuery, getSuppliers);

// Get supplier statistics
router.get("/stats", getSupplierStats);

// Get a single supplier by ID
router.get("/:id", getSupplierById);

// Update a supplier
router.put("/:id", validateUpdateSupplier, updateSupplier);

// Delete a supplier
router.delete("/:id", deleteSupplier);

export default router;
