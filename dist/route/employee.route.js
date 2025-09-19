"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employee_controller_1 = require("../controller/employee.controller");
const employee_middleware_1 = require("../middleware/employee.middleware");
const router = express_1.default.Router();
// Protected routes - require authentication
// router.use(validateAccessToken);
// Create a new employee
router.post("/", employee_middleware_1.validateCreateEmployee, employee_controller_1.createEmployee);
// Get all employees with pagination and search
router.get("/", employee_middleware_1.validateEmployeeQuery, employee_controller_1.getEmployees);
// Get employee statistics
router.get("/stats", employee_controller_1.getEmployeeStats);
// Get a single employee by ID
router.get("/:id", employee_controller_1.getEmployeeById);
// Update an employee
router.put("/:id", employee_middleware_1.validateUpdateEmployee, employee_controller_1.updateEmployee);
// Delete an employee
router.delete("/:id", employee_controller_1.deleteEmployee);
exports.default = router;
//# sourceMappingURL=employee.route.js.map