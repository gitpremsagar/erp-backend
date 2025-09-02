"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controller/category.controller");
const category_middleware_1 = require("../middleware/category.middleware");
const router = express_1.default.Router();
// Protected routes - require authentication
// router.use(validateAccessToken);
// Category routes
router.post("/", category_middleware_1.validateCreateCategory, category_controller_1.createCategory);
router.get("/", category_controller_1.getCategories);
router.get("/:id", category_controller_1.getCategoryById);
router.put("/:id", category_middleware_1.validateUpdateCategory, category_controller_1.updateCategory);
router.delete("/:id", category_controller_1.deleteCategory);
exports.default = router;
//# sourceMappingURL=category.route.js.map