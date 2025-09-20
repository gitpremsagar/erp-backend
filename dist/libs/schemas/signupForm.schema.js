"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupFormSchema = void 0;
const zod_1 = require("zod");
exports.SignupFormSchema = zod_1.z
    .object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(100, "Password must be at most 100 characters long")
        .trim(),
    name: zod_1.z
        .string()
        .min(2, "Name must be at least 2 characters long")
        .max(100, "Name must be at most 100 characters long")
        .trim(),
    phone: zod_1.z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number must be at most 15 digits")
        .trim()
        .optional(),
    aadharNumber: zod_1.z.number().optional(),
    pan: zod_1.z.string().optional(),
    gstNumber: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    userType: zod_1.z.enum(["ADMIN", "CUSTOMER", "EMPLOYEE", "ACCOUNTANT", "DELIVERY_MANAGER", "INVENTORY_MANAGER"]).optional(),
    confirmPassword: zod_1.z
        .string()
        .min(6, "Confirm Password must be at least 6 characters long")
        .max(100, "Confirm Password must be at most 100 characters long"),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
//# sourceMappingURL=signupForm.schema.js.map