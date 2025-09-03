"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
// Route Handlers
const auth_route_1 = __importDefault(require("./route/auth.route"));
const product_route_1 = __importDefault(require("./route/product.route"));
const category_route_1 = __importDefault(require("./route/category.route"));
const group_route_1 = __importDefault(require("./route/group.route"));
const subcategory_route_1 = __importDefault(require("./route/subcategory.route"));
const vehicle_route_1 = __importDefault(require("./route/vehicle.route"));
const order_route_1 = __importDefault(require("./route/order.route"));
const orderItem_route_1 = __importDefault(require("./route/orderItem.route"));
const customer_route_1 = __importDefault(require("./route/customer.route"));
const deliveryAddress_route_1 = __importDefault(require("./route/deliveryAddress.route"));
const userPrivilege_route_1 = __importDefault(require("./route/userPrivilege.route"));
const app = (0, express_1.default)();
// allow all origins
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_DOMAIN || "https://frontend-blogging-platform.vercel.app" || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World! Edited");
});
// endpoints
app.use("/api/auth", auth_route_1.default);
app.use("/api/user-privileges", userPrivilege_route_1.default);
app.use("/api/products", product_route_1.default);
app.use("/api/categories", category_route_1.default);
app.use("/api/sub-categories", subcategory_route_1.default);
app.use("/api/groups", group_route_1.default);
app.use("/api/vehicles", vehicle_route_1.default);
app.use("/api/orders", order_route_1.default);
app.use("/api/order-items", orderItem_route_1.default);
app.use("/api/customers", customer_route_1.default);
app.use("/api/delivery-addresses", deliveryAddress_route_1.default);
const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`Visit: http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map