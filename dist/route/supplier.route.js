"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supplier_controller_1 = require("../controller/supplier.controller");
const supplier_middleware_1 = require("../middleware/supplier.middleware");
const router = express_1.default.Router();
// Protected routes - require authentication
// router.use(validateAccessToken);
// Create a new supplier
router.post("/", supplier_middleware_1.validateCreateSupplier, supplier_controller_1.createSupplier);
// Get all suppliers with pagination and filtering
router.get("/", supplier_middleware_1.validateSupplierQuery, supplier_controller_1.getSuppliers);
// Get supplier statistics
router.get("/stats", supplier_controller_1.getSupplierStats);
// Get a single supplier by ID
router.get("/:id", supplier_controller_1.getSupplierById);
// Update a supplier
router.put("/:id", supplier_middleware_1.validateUpdateSupplier, supplier_controller_1.updateSupplier);
// Delete a supplier
router.delete("/:id", supplier_controller_1.deleteSupplier);
exports.default = router;
//# sourceMappingURL=supplier.route.js.map