"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stockRecord_controller_1 = require("../controller/stockRecord.controller");
const stockRecord_middleware_1 = require("../middleware/stockRecord.middleware");
const router = express_1.default.Router();
// Protected routes - require authentication
// router.use(validateAccessToken);
// Create a new stock record
router.post("/", stockRecord_middleware_1.validateCreateStockRecord, stockRecord_controller_1.createStockRecord);
// Get all stock records with pagination and filtering
router.get("/", stockRecord_middleware_1.validateStockRecordQuery, stockRecord_controller_1.getStockRecords);
// Get stock records by product ID
router.get("/product/:productId", stockRecord_middleware_1.validateProductId, stockRecord_controller_1.getStockRecordsByProductId);
// Get stock records by stock batch ID
router.get("/stock-batch/:stockBatchId", stockRecord_middleware_1.validateStockBatchId, stockRecord_controller_1.getStockRecordsByStockBatchId);
// Get stock record statistics
router.get("/stats", stockRecord_controller_1.getStockRecordStats);
// Get a single stock record by ID
router.get("/:id", stockRecord_middleware_1.validateStockRecordId, stockRecord_controller_1.getStockRecordById);
// Update a stock record
router.put("/:id", stockRecord_middleware_1.validateStockRecordId, stockRecord_middleware_1.validateUpdateStockRecord, stockRecord_controller_1.updateStockRecord);
// Delete a stock record
// router.delete("/:id", validateStockRecordId, deleteStockRecord);
exports.default = router;
//# sourceMappingURL=stockRecord.route.js.map