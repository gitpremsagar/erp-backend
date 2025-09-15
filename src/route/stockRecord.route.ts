import express from "express";
import {
  createStockRecord,
  getStockRecords,
  getStockRecordById,
  updateStockRecord,
  deleteStockRecord,
  getStockRecordsByProductId,
  getStockRecordsByStockBatchId,
  getStockRecordStats,
} from "../controller/stockRecord.controller";
import {
  validateCreateStockRecord,
  validateUpdateStockRecord,
  validateStockRecordQuery,
  validateStockRecordId,
  validateProductId,
  validateStockBatchId,
} from "../middleware/stockRecord.middleware";
import { validateAccessToken } from "../middleware/auth.middleware";

const router = express.Router();

// Protected routes - require authentication
// router.use(validateAccessToken);

// Create a new stock record
router.post("/", validateCreateStockRecord, createStockRecord);

// Get all stock records with pagination and filtering
router.get("/", validateStockRecordQuery, getStockRecords);

// Get stock records by product ID
router.get("/product/:productId", validateProductId, getStockRecordsByProductId);

// Get stock records by stock batch ID
router.get("/stock-batch/:stockBatchId", validateStockBatchId, getStockRecordsByStockBatchId);

// Get stock record statistics
router.get("/stats", getStockRecordStats);

// Get a single stock record by ID
router.get("/:id", validateStockRecordId, getStockRecordById);

// Update a stock record
router.put("/:id", validateStockRecordId, validateUpdateStockRecord, updateStockRecord);

// Delete a stock record
router.delete("/:id", validateStockRecordId, deleteStockRecord);

export default router;
