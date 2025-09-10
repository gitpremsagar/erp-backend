# Database Seeding Documentation

This directory contains all the dummy data and seeding logic for the ERP system database.

## Files Overview

### Core Seeding Files
- **`seedDatabase.ts`** - Main seeding function that orchestrates the entire seeding process
- **`defaultPrivileges.ts`** - User privilege definitions (ADMIN, CUSTOMER, etc.)
- **`defaultCategories.ts`** - Product category definitions
- **`defaultSubCategories.ts`** - Product subcategory definitions
- **`defaultProducts.ts`** - Product definitions with realistic data
- **`defaultCustomers.ts`** - Customer user definitions
- **`defaultOrders.ts`** - Order definitions with status and delivery details
- **`defaultOrderItems.ts`** - Order item definitions linking products to orders
- **`defaultVehicles.ts`** - Delivery vehicle definitions

### Data Files
- **`products.csv`** - CSV file with product data
- **`customers.csv`** - CSV file with customer data

## Seeding Process

The seeding process follows this order to maintain referential integrity:

1. **User Privileges** - Create basic user roles
2. **Categories** - Create product categories
3. **Subcategories** - Create product subcategories (linked to categories)
4. **Products** - Create products (linked to categories and subcategories)
5. **Admin User** - Create default system administrator
6. **Customers** - Create customer users
7. **Sample Customer** - Create additional sample customer
8. **Vehicles** - Create delivery vehicles
9. **Orders** - Create orders (linked to customers, delivery addresses, and vehicles)
10. **Order Items** - Create order items (linked to orders, products, and customers)

## Order Seeding Details

### Orders Created
- **5 dummy orders** with different statuses:
  - Order 1: COMPLETED (₹2,500) - Delivered on 2024-01-18
  - Order 2: SHIPPING (₹1,800) - Delivery expected on 2024-01-25
  - Order 3: PACKING (₹3,200) - Delivery expected on 2024-01-30
  - Order 4: PENDING (₹1,500) - No delivery date set
  - Order 5: MODIFYING (₹2,800) - No delivery date set

### Order Items
- **5 items per order** (25 total order items)
- Each item links to real products from the product catalog
- Realistic quantities and delivery dates
- Some orders have vehicles assigned for delivery

### Vehicle Assignment
- **3 delivery vehicles** available:
  - Delivery Truck 1 (MH-01-AB-1234) - 5000kg capacity
  - Pickup Van 1 (DL-02-CD-5678) - 1000kg capacity  
  - Delivery Truck 2 (KA-03-EF-9012) - 3000kg capacity

## Running the Seeder

### Method 1: Direct Execution
```bash
npx ts-node src/libs/dummyData/seedDatabase.ts
```

### Method 2: Import and Call
```typescript
import { seedDatabase } from './src/libs/dummyData/seedDatabase';

// Call the seeding function
await seedDatabase();
```

### Method 3: Build and Run
```bash
npm run build
node dist/libs/dummyData/seedDatabase.js
```

## Default Credentials

After seeding, the following default users are available:

### Admin User
- **Email**: admin@edigitalindia.com
- **Password**: admin123
- **Privilege**: ADMIN

### Sample Customer
- **Email**: customer@example.com
- **Password**: customer123
- **Privilege**: CUSTOMER

## Data Relationships

The seeding ensures proper relationships between:
- Users and their privileges
- Products and their categories/subcategories
- Orders and their customers/delivery addresses/vehicles
- Order items and their orders/products/customers

## Error Handling

The seeder includes comprehensive error handling:
- Checks for existing data before creation
- Validates referential integrity
- Provides detailed logging for each step
- Gracefully handles missing dependencies
- Continues processing even if some items fail

## Customization

To add more dummy data:
1. Create a new data file (e.g., `defaultNewEntity.ts`)
2. Define the interface and data array
3. Import it in `seedDatabase.ts`
4. Add the seeding logic in the appropriate section
5. Maintain referential integrity order

## Notes

- All dates are set relative to the current date
- Product codes match those in the actual product catalog
- Delivery addresses are realistic Indian business addresses
- Vehicle numbers follow Indian registration format
- Quantities and prices are realistic for the product types
