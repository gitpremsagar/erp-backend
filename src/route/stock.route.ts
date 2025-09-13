import express from "express";
import {
  createStock,
  getStocks,
  getStockById,
  getStockByStockId,
  updateStock,
  deleteStock,
  toggleStockArchive,
  getStockStats,
  getStockAlerts,
} from "../controller/stock.controller";
import {
  validateCreateStock,
  validateUpdateStock,
  validateStockQuery,
  validateToggleArchive,
} from "../middleware/stock.middleware";
import { validateAccessToken } from "../middleware/auth.middleware";

const router = express.Router();

// Protected routes - require authentication
// router.use(validateAccessToken);

// Create a new stock entry
router.post("/", validateCreateStock, createStock);

// Get all stock entries with pagination and filtering
router.get("/", validateStockQuery, getStocks);

// Get stock statistics
router.get("/stats", getStockStats);

// Get stock alerts (expired, low stock, etc.)
router.get("/alerts", getStockAlerts);

// Get stock by stockId (custom ID provided by admin)
router.get("/stock-id/:stockId", getStockByStockId);

// Get a single stock entry by ID
router.get("/:id", getStockById);

// Update a stock entry
router.put("/:id", validateUpdateStock, updateStock);

// Archive/Unarchive stock
router.patch("/:id/archive", validateToggleArchive, toggleStockArchive);

// Delete a stock entry
router.delete("/:id", deleteStock);

export default router;
