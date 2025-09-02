"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subcategory_controller_1 = require("../controller/subcategory.controller");
const subcategory_middleware_1 = require("../middleware/subcategory.middleware");
const router = express_1.default.Router();
// Protected routes - require authentication
// router.use(validateAccessToken);
// SubCategory routes
router.post("/", subcategory_middleware_1.validateCreateSubCategory, subcategory_controller_1.createSubCategory);
router.get("/", subcategory_controller_1.getSubCategories);
router.get("/:id", subcategory_controller_1.getSubCategoryById);
router.put("/:id", subcategory_middleware_1.validateUpdateSubCategory, subcategory_controller_1.updateSubCategory);
router.delete("/:id", subcategory_controller_1.deleteSubCategory);
exports.default = router;
//# sourceMappingURL=subcategory.route.js.map