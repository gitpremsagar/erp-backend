"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmployeeQuery = exports.validateUpdateEmployee = exports.validateCreateEmployee = void 0;
const employeeForm_schema_1 = require("../libs/schemas/employeeForm.schema");
const zod_1 = __importDefault(require("zod"));
const validateCreateEmployee = (req, res, next) => {
    try {
        employeeForm_schema_1.CreateEmployeeSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Create Employee Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateCreateEmployee = validateCreateEmployee;
const validateUpdateEmployee = (req, res, next) => {
    try {
        employeeForm_schema_1.UpdateEmployeeSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Update Employee Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateUpdateEmployee = validateUpdateEmployee;
const validateEmployeeQuery = (req, res, next) => {
    try {
        employeeForm_schema_1.EmployeeQuerySchema.parse(req.query);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Employee Query Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateEmployeeQuery = validateEmployeeQuery;
//# sourceMappingURL=employee.middleware.js.map