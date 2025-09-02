"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateGroup = exports.validateCreateGroup = void 0;
const categoryForm_schema_1 = require("../libs/schemas/categoryForm.schema");
const zod_1 = __importDefault(require("zod"));
// Group Middleware
const validateCreateGroup = (req, res, next) => {
    try {
        categoryForm_schema_1.CreateGroupSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Create Group Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateCreateGroup = validateCreateGroup;
const validateUpdateGroup = (req, res, next) => {
    try {
        categoryForm_schema_1.UpdateGroupSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Update Group Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateUpdateGroup = validateUpdateGroup;
//# sourceMappingURL=group.middleware.js.map