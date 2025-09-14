import express from "express";
import {
  createStockBatch,
  getStockBatches,
  getStockBatchById,
  updateStockBatch,
  deleteStockBatch,
  toggleStockArchive,
  getStockStats,
  getStockAlerts,
} from "../controller/stockBatch.controller";
import {
  validateCreateStockBatch,
  validateUpdateStockBatch,
  validateStockBatchQuery,
  validateToggleArchive,
} from "../middleware/stockBatch.middleware";
import { validateAccessToken } from "../middleware/auth.middleware";

const router = express.Router();

// Protected routes - require authentication
// router.use(validateAccessToken);

// Create a new stock entry
router.post("/", validateCreateStockBatch, createStockBatch);

// Get all stock entries with pagination and filtering
router.get("/", validateStockBatchQuery, getStockBatches);

// Get stock statistics
router.get("/stats", getStockStats);

// Get stock alerts (expired, low stock, etc.)
router.get("/alerts", getStockAlerts);


// Get a single stock entry by ID
router.get("/:id", getStockBatchById);

// Update a stock entry
router.put("/:id", validateUpdateStockBatch, updateStockBatch);

// Archive/Unarchive stock
router.patch("/:id/archive", validateToggleArchive, toggleStockArchive);

// Delete a stock entry
router.delete("/:id", deleteStockBatch);

export default router;
