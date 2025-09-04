"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserPrivilegeSchema = exports.CreateUserPrivilegeSchema = void 0;
const zod_1 = require("zod");
exports.CreateUserPrivilegeSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(2, "Name must be at least 2 characters long")
        .max(50, "Name must be at most 50 characters long")
        .trim(),
    description: zod_1.z
        .string()
        .min(10, "Description must be at least 10 characters long")
        .max(200, "Description must be at most 200 characters long")
        .trim(),
});
exports.UpdateUserPrivilegeSchema = exports.CreateUserPrivilegeSchema.partial();
//# sourceMappingURL=userPrivilege.schema.js.map