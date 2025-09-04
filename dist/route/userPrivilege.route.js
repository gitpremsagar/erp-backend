"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userPrivilege_controller_1 = require("../controller/userPrivilege.controller");
const router = express_1.default.Router();
// Create a new user privilege
router.post("/", userPrivilege_controller_1.createUserPrivilege);
// Get all user privileges
router.get("/", userPrivilege_controller_1.getAllUserPrivileges);
// Get user privilege by ID
router.get("/:id", userPrivilege_controller_1.getUserPrivilegeById);
// Update user privilege
router.put("/:id", userPrivilege_controller_1.updateUserPrivilege);
// Delete user privilege
router.delete("/:id", userPrivilege_controller_1.deleteUserPrivilege);
exports.default = router;
//# sourceMappingURL=userPrivilege.route.js.map