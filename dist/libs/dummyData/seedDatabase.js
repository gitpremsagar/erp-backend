"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const defaultCategories_1 = require("./defaultCategories");
const defaultSubCategories_1 = require("./defaultSubCategories");
const defaultTags_1 = require("./defaultTags");
const defaultProducts_1 = require("./defaultProducts");
const defaultOrders_1 = require("./defaultOrders");
const defaultOrderItems_1 = require("./defaultOrderItems");
const defaultVehicles_1 = require("./defaultVehicles");
const prisma = new client_1.PrismaClient();
const seedDatabase = async () => {
    try {
        console.log("🌱 Starting database seeding...");
        // 1. Create admin user first
        console.log("👤 Creating admin user...");
        const adminEmail = "admin@edigitalindia.com";
        const existingAdmin = await prisma.user.findUnique({
            where: { email: adminEmail },
        });
        let adminUser = existingAdmin;
        if (!existingAdmin) {
            const hashedPassword = await bcrypt_1.default.hash("admin123", 10);
            adminUser = await prisma.user.create({
                data: {
                    email: adminEmail,
                    password: hashedPassword,
                    name: "System Administrator",
                    phone: "9999999999",
                    userType: "ADMIN",
                    address: "System Address",
                },
            });
            console.log("✅ Created admin user");
            console.log("📧 Email: admin@edigitalindia.com");
            console.log("🔑 Password: admin123");
        }
        else {
            console.log("⏭️  Admin user already exists");
        }
        // Create sample customer user for orders
        console.log("👤 Creating sample customer user...");
        const customerEmail = "customer@example.com";
        const existingCustomer = await prisma.user.findUnique({
            where: { email: customerEmail },
        });
        if (!existingCustomer) {
            const hashedPassword = await bcrypt_1.default.hash("customer123", 10);
            await prisma.user.create({
                data: {
                    email: customerEmail,
                    password: hashedPassword,
                    name: "Sample Customer",
                    phone: "8888888888",
                    userType: "CUSTOMER",
                    address: "Customer Address",
                },
            });
            console.log("✅ Created sample customer user");
            console.log("📧 Email: customer@example.com");
            console.log("🔑 Password: customer123");
        }
        else {
            console.log("⏭️  Sample customer user already exists");
        }
        // 2. Seed categories (limit to 5)
        console.log("📂 Seeding categories (max 5)...");
        const categoryMap = new Map(); // name -> id mapping
        const categoriesToSeed = defaultCategories_1.defaultCategories.slice(0, 5);
        for (const category of categoriesToSeed) {
            const existingCategory = await prisma.category.findUnique({
                where: { name: category.name },
            });
            if (!existingCategory) {
                const createdCategory = await prisma.category.create({
                    data: category,
                });
                categoryMap.set(category.name, createdCategory.id);
                console.log(`✅ Created category: ${category.name}`);
            }
            else {
                categoryMap.set(category.name, existingCategory.id);
                console.log(`⏭️  Category already exists: ${category.name}`);
            }
        }
        // 3. Seed subcategories (limit to 5)
        console.log("📁 Seeding subcategories (max 5)...");
        const subCategoryMap = new Map(); // name -> id mapping
        const subCategoriesToSeed = defaultSubCategories_1.defaultSubCategories.slice(0, 5);
        for (const subCategory of subCategoriesToSeed) {
            const categoryId = categoryMap.get(subCategory.categoryName);
            if (!categoryId) {
                console.log(`❌ Category not found for subcategory: ${subCategory.name}`);
                continue;
            }
            const existingSubCategory = await prisma.subCategory.findUnique({
                where: { name: subCategory.name },
            });
            if (!existingSubCategory) {
                const createdSubCategory = await prisma.subCategory.create({
                    data: {
                        name: subCategory.name,
                        description: subCategory.description,
                        categoryId: categoryId,
                    },
                });
                subCategoryMap.set(subCategory.name, createdSubCategory.id);
                console.log(`✅ Created subcategory: ${subCategory.name} (${subCategory.categoryName})`);
            }
            else {
                subCategoryMap.set(subCategory.name, existingSubCategory.id);
                console.log(`⏭️  Subcategory already exists: ${subCategory.name}`);
            }
        }
        // 4. Seed tags (limit to 5)
        console.log("🏷️  Seeding tags (max 5)...");
        const tagMap = new Map(); // name -> id mapping
        for (const tag of defaultTags_1.defaultTags) {
            const existingTag = await prisma.productTag.findFirst({
                where: { name: tag.name },
            });
            if (!existingTag) {
                const createdTag = await prisma.productTag.create({
                    data: tag,
                });
                tagMap.set(tag.name, createdTag.id);
                console.log(`✅ Created tag: ${tag.name}`);
            }
            else {
                tagMap.set(tag.name, existingTag.id);
                console.log(`⏭️  Tag already exists: ${tag.name}`);
            }
        }
        // 5. Seed vehicles (limit to 5)
        console.log("🚛 Seeding vehicles (max 5)...");
        const vehicleMap = new Map(); // vehicleNumber -> id mapping
        const vehiclesToSeed = defaultVehicles_1.defaultVehicles.slice(0, 5);
        for (const vehicle of vehiclesToSeed) {
            const existingVehicle = await prisma.vehicle.findUnique({
                where: { vehicleNumber: vehicle.vehicleNumber },
            });
            if (!existingVehicle) {
                const createdVehicle = await prisma.vehicle.create({
                    data: vehicle,
                });
                vehicleMap.set(vehicle.vehicleNumber, createdVehicle.id);
                console.log(`✅ Created vehicle: ${vehicle.vehicleName} (${vehicle.vehicleNumber})`);
            }
            else {
                vehicleMap.set(vehicle.vehicleNumber, existingVehicle.id);
                console.log(`⏭️  Vehicle already exists: ${vehicle.vehicleName} (${vehicle.vehicleNumber})`);
            }
        }
        // 6. Seed products (limit to 5)
        console.log("🛍️  Seeding products (max 5)...");
        const productMap = new Map(); // productCode -> id mapping
        const productsToSeed = defaultProducts_1.defaultProducts.slice(0, 5);
        for (const product of productsToSeed) {
            const categoryId = categoryMap.get(product.categoryName);
            const subCategoryId = subCategoryMap.get(product.subCategoryName);
            if (!categoryId || !subCategoryId) {
                console.log(`❌ Required references not found for product: ${product.name}`);
                continue;
            }
            const existingProduct = await prisma.product.findUnique({
                where: { productCode: product.productCode },
            });
            if (!existingProduct) {
                const createdProduct = await prisma.product.create({
                    data: {
                        name: product.name,
                        mrp: product.mrp,
                        productCode: product.productCode,
                        description: product.description,
                        lowStockLimit: product.lowStockLimit,
                        overStockLimit: product.overStockLimit,
                        grammage: product.grammage,
                        imageUrl: product.imageUrl,
                        categoryId: categoryId,
                        subCategoryId: subCategoryId,
                    },
                });
                productMap.set(product.productCode, createdProduct.id);
                console.log(`✅ Created product: ${product.name} (${product.productCode})`);
            }
            else {
                productMap.set(product.productCode, existingProduct.id);
                console.log(`⏭️  Product already exists: ${product.name} (${product.productCode})`);
            }
        }
        // 7. Seed stock entries for products
        console.log("📦 Seeding stock entries...");
        for (const product of productsToSeed) {
            const productId = productMap.get(product.productCode);
            if (!productId)
                continue;
            // Check if stock already exists for this product
            const existingStock = await prisma.stock.findFirst({
                where: { productId: productId },
            });
            if (!existingStock && product.stock && product.stock > 0) {
                const manufacturingDate = new Date();
                const arrivalDate = new Date();
                const expiryDate = new Date();
                expiryDate.setMonth(expiryDate.getMonth() + 6); // 6 months validity
                const stock = await prisma.stock.create({
                    data: {
                        stockId: `STK-${product.productCode}-${Date.now()}`,
                        productId: productId,
                        manufacturingDate: manufacturingDate,
                        arrivalDate: arrivalDate,
                        validityMonths: 6,
                        expiryDate: expiryDate,
                        supplierName: "Default Supplier",
                        stockQuantity: product.stock,
                    },
                });
                // Create stock record for the initial stock entry
                await prisma.stockRecord.create({
                    data: {
                        productId: productId,
                        changeInStock: product.stock,
                        createdBy: adminUser.id,
                        stockId: stock.stockId,
                        reason: "ARRIVAL_FROM_SUPPLIER",
                    },
                });
                console.log(`✅ Created stock entry for: ${product.name} (${product.stock} units)`);
            }
        }
        // 8. Seed orders (limit to 5)
        console.log("📋 Seeding orders (max 5)...");
        const orderMap = new Map(); // orderIndex -> id mapping
        const ordersToSeed = defaultOrders_1.defaultOrders.slice(0, 5);
        for (let i = 0; i < ordersToSeed.length; i++) {
            const order = ordersToSeed[i];
            // Find customer by email
            const customer = await prisma.user.findUnique({
                where: { email: order.customerEmail },
            });
            if (!customer) {
                console.log(`❌ Customer not found for order ${i + 1}: ${order.customerEmail}`);
                continue;
            }
            // Create delivery address if provided
            let deliveryAddressId;
            if (order.deliveryAddress) {
                const deliveryAddress = await prisma.deliveryAddress.create({
                    data: {
                        userId: customer.id,
                        address: order.deliveryAddress,
                        default: false,
                    },
                });
                deliveryAddressId = deliveryAddress.id;
            }
            // Get vehicle ID if assigned
            let vehicleId;
            if (order.vehicleNumber) {
                vehicleId = vehicleMap.get(order.vehicleNumber);
            }
            // Create order
            const createdOrder = await prisma.order.create({
                data: {
                    status: order.status,
                    totalPrice: order.totalPrice,
                    orderDate: order.orderDate,
                    customerId: customer.id,
                    deliveryAddressId: deliveryAddressId,
                    vehicleId: vehicleId,
                },
            });
            orderMap.set(i, createdOrder.id);
            console.log(`✅ Created order ${i + 1}: ${order.status} - ₹${order.totalPrice}`);
        }
        // 9. Seed order items (limit to 5)
        console.log("🛒 Seeding order items (max 5)...");
        const orderItemsToSeed = defaultOrderItems_1.defaultOrderItems.slice(0, 5);
        for (const orderItem of orderItemsToSeed) {
            const orderId = orderMap.get(orderItem.orderIndex);
            if (!orderId) {
                console.log(`❌ Order not found for order item: ${orderItem.productCode}`);
                continue;
            }
            // Find product by product code
            const productId = productMap.get(orderItem.productCode);
            if (!productId) {
                console.log(`❌ Product not found for order item: ${orderItem.productCode}`);
                continue;
            }
            // Find customer from the order
            const order = await prisma.order.findUnique({
                where: { id: orderId },
                include: { customer: true },
            });
            if (!order) {
                console.log(`❌ Order not found for order item: ${orderItem.productCode}`);
                continue;
            }
            // Create order item
            await prisma.orderItem.create({
                data: {
                    orderId: orderId,
                    productId: productId,
                    quantity: orderItem.quantity,
                    deliveryDate: orderItem.deliveryDate,
                    orderCompleted: orderItem.orderCompleted,
                    customerId: order.customer.id,
                },
            });
            console.log(`✅ Created order item: ${orderItem.productCode} x${orderItem.quantity} for order ${orderItem.orderIndex + 1}`);
        }
        console.log("🎉 Database seeding completed successfully!");
    }
    catch (error) {
        console.error("❌ Error seeding database:", error);
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.seedDatabase = seedDatabase;
// Run seeding if this file is executed directly
if (require.main === module) {
    (0, exports.seedDatabase)()
        .then(() => {
        console.log("Seeding completed");
        process.exit(0);
    })
        .catch((error) => {
        console.error("Seeding failed:", error);
        process.exit(1);
    });
}
//# sourceMappingURL=seedDatabase.js.map