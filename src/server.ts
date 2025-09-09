
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Route Handlers
import authRouteHandler from "./route/auth.route";
import productRouteHandler from "./route/product.route";
import categoryRouteHandler from "./route/category.route";
import groupRouteHandler from "./route/group.route";
import subcategoryRouteHandler from "./route/subcategory.route";
import vehicleRouteHandler from "./route/vehicle.route";
import orderRouteHandler from "./route/order.route";
import orderItemRouteHandler from "./route/orderItem.route";
import customerRouteHandler from "./route/customer.route";
import deliveryAddressRouteHandler from "./route/deliveryAddress.route";
import userPrivilegeRouteHandler from "./route/userPrivilege.route";
import productTagRouteHandler from "./route/productTag.route";

const app = express();

// allow all origins
app.use(
  cors({
    origin: process.env.FRONTEND_DOMAIN || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World! Test from desktop!");
});

// endpoints
app.use("/api/auth", authRouteHandler);
app.use("/api/user-privileges", userPrivilegeRouteHandler);
app.use("/api/products", productRouteHandler);
app.use("/api/categories", categoryRouteHandler);
app.use("/api/sub-categories", subcategoryRouteHandler);
app.use("/api/groups", groupRouteHandler);
app.use("/api/vehicles", vehicleRouteHandler);
app.use("/api/orders", orderRouteHandler);
app.use("/api/order-items", orderItemRouteHandler);
app.use("/api/customers", customerRouteHandler);
app.use("/api/delivery-addresses", deliveryAddressRouteHandler);
app.use("/api/product-tags", productTagRouteHandler);

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
