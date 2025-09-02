"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const group_controller_1 = require("../controller/group.controller");
const group_middleware_1 = require("../middleware/group.middleware");
const router = express_1.default.Router();
// Protected routes - require authentication
// router.use(validateAccessToken);
// Group routes
router.post("/", group_middleware_1.validateCreateGroup, group_controller_1.createGroup);
router.get("/", group_controller_1.getGroups);
router.get("/:id", group_controller_1.getGroupById);
router.put("/:id", group_middleware_1.validateUpdateGroup, group_controller_1.updateGroup);
router.delete("/:id", group_controller_1.deleteGroup);
exports.default = router;
//# sourceMappingURL=group.route.js.map