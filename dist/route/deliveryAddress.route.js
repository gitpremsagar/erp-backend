"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deliveryAddress_controller_1 = require("../controller/deliveryAddress.controller");
const router = express_1.default.Router();
// Protected routes - require authentication
// router.use(validateAccessToken);
// Create a new delivery address
router.post("/", deliveryAddress_controller_1.createDeliveryAddress);
// Get all delivery addresses for a user
router.get("/", deliveryAddress_controller_1.getDeliveryAddresses);
// Get a single delivery address by ID
router.get("/:id", deliveryAddress_controller_1.getDeliveryAddressById);
// Update a delivery address
router.put("/:id", deliveryAddress_controller_1.updateDeliveryAddress);
// Delete a delivery address
router.delete("/:id", deliveryAddress_controller_1.deleteDeliveryAddress);
// Set a delivery address as default
router.patch("/:id/default", deliveryAddress_controller_1.setDefaultDeliveryAddress);
exports.default = router;
//# sourceMappingURL=deliveryAddress.route.js.map