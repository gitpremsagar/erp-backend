"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stockBatch_controller_1 = require("../controller/stockBatch.controller");
const stockBatch_middleware_1 = require("../middleware/stockBatch.middleware");
const router = express_1.default.Router();
// Protected routes - require authentication
// router.use(validateAccessToken);
// Create a new stock entry
router.post("/", stockBatch_middleware_1.validateCreateStockBatch, stockBatch_controller_1.createStockBatch);
// Get all stock entries with pagination and filtering
router.get("/", stockBatch_middleware_1.validateStockBatchQuery, stockBatch_controller_1.getStockBatches);
// Get stock batches by product ID
router.get("/product/:productId", stockBatch_middleware_1.validateProductId, stockBatch_controller_1.getStockBatchesByProductId);
// Get stock statistics
router.get("/stats", stockBatch_controller_1.getStockStats);
// Get stock alerts (expired, low stock, etc.)
router.get("/alerts", stockBatch_controller_1.getStockAlerts);
// Get a single stock entry by ID
router.get("/:id", stockBatch_controller_1.getStockBatchById);
// Update a stock entry
router.put("/:id", stockBatch_middleware_1.validateUpdateStockBatch, stockBatch_controller_1.updateStockBatch);
// Archive/Unarchive stock
router.patch("/:id/archive", stockBatch_middleware_1.validateToggleArchive, stockBatch_controller_1.toggleStockArchive);
// Delete a stock entry
router.delete("/:id", stockBatch_controller_1.deleteStockBatch);
exports.default = router;
//# sourceMappingURL=stockBatch.route.js.map