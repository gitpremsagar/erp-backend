"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productTag_controller_1 = require("../controller/productTag.controller");
const productTag_middleware_1 = require("../middleware/productTag.middleware");
const router = express_1.default.Router();
// Protected routes - require authentication
// router.use(validateAccessToken);
// Create a new product tag
router.post("/", productTag_middleware_1.validateCreateProductTag, productTag_controller_1.createProductTag);
// Get all product tags with pagination and filtering
router.get("/", productTag_middleware_1.validateProductTagQuery, productTag_controller_1.getProductTags);
// Get product tag statistics
router.get("/stats", productTag_controller_1.getProductTagStats);
// Get a single product tag by ID
router.get("/:id", productTag_controller_1.getProductTagById);
// Update a product tag
router.put("/:id", productTag_middleware_1.validateUpdateProductTag, productTag_controller_1.updateProductTag);
// Delete a product tag
router.delete("/:id", productTag_controller_1.deleteProductTag);
exports.default = router;
//# sourceMappingURL=productTag.route.js.map