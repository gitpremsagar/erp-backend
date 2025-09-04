"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vehicle_controller_1 = require("../controller/vehicle.controller");
const vehicle_middleware_1 = require("../middleware/vehicle.middleware");
const router = express_1.default.Router();
// Protected routes - require authentication
// router.use(validateAccessToken);
// Vehicle routes
router.post("/", vehicle_middleware_1.validateCreateVehicle, vehicle_controller_1.createVehicle);
router.get("/", vehicle_controller_1.getVehicles);
router.get("/:id", vehicle_controller_1.getVehicleById);
router.put("/:id", vehicle_middleware_1.validateUpdateVehicle, vehicle_controller_1.updateVehicle);
router.delete("/:id", vehicle_controller_1.deleteVehicle);
exports.default = router;
//# sourceMappingURL=vehicle.route.js.map