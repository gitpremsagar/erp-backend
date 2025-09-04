"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignPrivilegeSchema = void 0;
const zod_1 = require("zod");
exports.AssignPrivilegeSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1, "User ID is required"),
    privilegeId: zod_1.z.string().min(1, "Privilege ID is required"),
});
//# sourceMappingURL=assignPrivilege.schema.js.map