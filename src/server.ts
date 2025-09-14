
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Route Handlers
import authRouteHandler from "./route/auth.route";
import productRouteHandler from "./route/product.route";
import categoryRouteHandler from "./route/category.route";
import vehicleRouteHandler from "./route/vehicle.route";
import orderRouteHandler from "./route/order.route";
import orderItemRouteHandler from "./route/orderItem.route";
import customerRouteHandler from "./route/customer.route";
import deliveryAddressRouteHandler from "./route/deliveryAddress.route";
import productTagRouteHandler from "./route/productTag.route";
import stockRouteHandler from "./route/stock.route";
import supplierRouteHandler from "./route/supplier.route";

const app = express();

// allow all origins
app.use(
  cors({
    origin: ["http://localhost:3000", "https://erp-frontend-sepia.vercel.app"],
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
app.use("/api/products", productRouteHandler);
app.use("/api/categories", categoryRouteHandler);
app.use("/api/vehicles", vehicleRouteHandler);
app.use("/api/orders", orderRouteHandler);
app.use("/api/order-items", orderItemRouteHandler);
app.use("/api/customers", customerRouteHandler);
app.use("/api/delivery-addresses", deliveryAddressRouteHandler);
app.use("/api/product-tags", productTagRouteHandler);
app.use("/api/stocks", stockRouteHandler);
app.use("/api/suppliers", supplierRouteHandler);

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Visit: http://localhost:${PORT}`);
});
