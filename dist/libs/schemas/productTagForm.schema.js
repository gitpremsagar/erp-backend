"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTagQuerySchema = exports.UpdateProductTagSchema = exports.CreateProductTagSchema = void 0;
const zod_1 = require("zod");
exports.CreateProductTagSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, "Tag name is required")
        .max(100, "Tag name must be at most 100 characters long")
        .trim(),
});
exports.UpdateProductTagSchema = exports.CreateProductTagSchema.partial();
exports.ProductTagQuerySchema = zod_1.z.object({
    page: zod_1.z.string().optional().transform(val => val ? parseInt(val) : 1),
    limit: zod_1.z.string().optional().transform(val => val ? parseInt(val) : 10),
    search: zod_1.z.string().optional(),
});
//# sourceMappingURL=productTagForm.schema.js.map