"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateVehicle = exports.validateCreateVehicle = void 0;
const vehicleForm_schema_1 = require("../libs/schemas/vehicleForm.schema");
const zod_1 = __importDefault(require("zod"));
// Vehicle Middleware
const validateCreateVehicle = (req, res, next) => {
    try {
        vehicleForm_schema_1.CreateVehicleSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Create Vehicle Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateCreateVehicle = validateCreateVehicle;
const validateUpdateVehicle = (req, res, next) => {
    try {
        vehicleForm_schema_1.UpdateVehicleSchema.parse(req.body);
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            console.error("Update Vehicle Validation error:\n", error);
            res.status(400).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
    next();
};
exports.validateUpdateVehicle = validateUpdateVehicle;
//# sourceMappingURL=vehicle.middleware.js.map