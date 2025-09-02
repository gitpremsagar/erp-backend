"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controller/product.controller");
const product_middleware_1 = require("../middleware/product.middleware");
const router = express_1.default.Router();
// Protected routes - require authentication
// router.use(validateAccessToken);
// Create a new product
router.post("/", product_middleware_1.validateCreateProduct, product_controller_1.createProduct);
// Get all products with pagination and filtering
router.get("/", product_middleware_1.validateProductQuery, product_controller_1.getProducts);
// Get product statistics
router.get("/stats", product_controller_1.getProductStats);
// Get a single product by ID
router.get("/:id", product_controller_1.getProductById);
// Update a product
router.put("/:id", product_middleware_1.validateUpdateProduct, product_controller_1.updateProduct);
// Delete a product
router.delete("/:id", product_controller_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=product.route.js.map