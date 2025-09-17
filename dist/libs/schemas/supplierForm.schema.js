"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierQuerySchema = exports.UpdateSupplierSchema = exports.CreateSupplierSchema = void 0;
const zod_1 = require("zod");
exports.CreateSupplierSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Supplier name is required")
        .max(200, "Supplier name must be at most 200 characters long")
        .trim(),
});
exports.UpdateSupplierSchema = exports.CreateSupplierSchema.partial();
exports.SupplierQuerySchema = zod_1.z.object({
    page: zod_1.z.string().optional().transform(val => val ? parseInt(val) : 1),
    limit: zod_1.z.string().optional().transform(val => val ? parseInt(val) : 10),
    search: zod_1.z.string().optional(),
});
//# sourceMappingURL=supplierForm.schema.js.map