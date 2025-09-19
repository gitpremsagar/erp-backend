"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeQuerySchema = exports.UpdateEmployeeSchema = exports.CreateEmployeeSchema = void 0;
const zod_1 = require("zod");
exports.CreateEmployeeSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Employee name is required")
        .max(100, "Employee name must be at most 100 characters long")
        .trim(),
    email: zod_1.z
        .string()
        .email("Invalid email format")
        .trim(),
    phone: zod_1.z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must be at most 15 digits")
        .trim(),
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .optional(),
    address: zod_1.z
        .string()
        .min(1, "Address is required")
        .max(500, "Address must be at most 500 characters long")
        .trim()
        .optional(),
    aadharNumber: zod_1.z
        .number()
        .int("Aadhar number must be an integer")
        .positive("Aadhar number must be positive")
        .optional(),
    pan: zod_1.z
        .string()
        .min(10, "PAN must be 10 characters long")
        .max(10, "PAN must be 10 characters long")
        .trim()
        .optional(),
});
exports.UpdateEmployeeSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Employee name is required")
        .max(100, "Employee name must be at most 100 characters long")
        .trim()
        .optional(),
    email: zod_1.z
        .string()
        .email("Invalid email format")
        .trim()
        .optional(),
    phone: zod_1.z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must be at most 15 digits")
        .trim()
        .optional(),
    address: zod_1.z
        .string()
        .min(1, "Address is required")
        .max(500, "Address must be at most 500 characters long")
        .trim()
        .optional(),
    aadharNumber: zod_1.z
        .number()
        .int("Aadhar number must be an integer")
        .positive("Aadhar number must be positive")
        .optional(),
    pan: zod_1.z
        .string()
        .min(10, "PAN must be 10 characters long")
        .max(10, "PAN must be 10 characters long")
        .trim()
        .optional(),
});
exports.EmployeeQuerySchema = zod_1.z.object({
    page: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
    limit: zod_1.z.string().regex(/^\d+$/).transform(Number).optional(),
    search: zod_1.z.string().trim().optional(),
});
//# sourceMappingURL=employeeForm.schema.js.map