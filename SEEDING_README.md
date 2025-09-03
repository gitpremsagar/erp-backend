# Database Seeding Guide

This document explains how to seed the database with default data for the Haldiram-style ERP system.

## What Gets Seeded

The seeding process creates the following default data:

### 1. User Privileges
- **ADMIN**: Full system access with all permissions
- **ORDER_PROCESSOR**: Can process orders and manage inventory
- **CUSTOMER**: Can place orders and view products
- **EMPLOYEE**: Basic access for general employees

### 2. Categories
- Snacks & Namkeen
- Sweets & Desserts
- Ready to Eat
- Beverages
- Spices & Seasonings
- Pickles & Chutneys
- Dry Fruits & Nuts
- Grocery & Staples

### 3. Groups
- Premium
- Standard
- Economy
- Organic
- Diabetic Friendly
- Kids Special
- Festival Special
- Export Quality

### 4. Subcategories
Each category has relevant subcategories. For example:
- **Snacks & Namkeen**: Moong Dal Namkeen, Aloo Bhujia, Mixed Namkeen, Chips & Crisps, Khatta Meetha
- **Sweets & Desserts**: Ladoos, Barfis, Gulab Jamun, Rasgullas, Jalebis
- **Ready to Eat**: Curries & Gravies, Rice Dishes, Bread & Rotis, Snack Mixes
- **Beverages**: Fruit Juices, Sherbets, Lassi & Shakes, Traditional Drinks
- **Spices & Seasonings**: Ground Spices, Spice Blends, Whole Spices, Seasoning Mixes
- **Pickles & Chutneys**: Mango Pickles, Mixed Pickles, Chutneys, Achar Masala
- **Dry Fruits & Nuts**: Premium Nuts, Dried Fruits, Mixed Dry Fruits, Seeds
- **Grocery & Staples**: Rice & Pulses, Flour & Atta, Cooking Oils, Sugar & Jaggery

### 5. Products
A comprehensive collection of Haldiram-style products including:
- **Snacks**: Moong Dal Namkeen, Aloo Bhujia, Premium variants
- **Sweets**: Besan Ladoo, Motichoor Ladoo, Kaju Barfi
- **Ready to Eat**: Paneer Butter Masala, various curries
- **Beverages**: Mango Juice, traditional drinks
- **Spices**: Garam Masala, spice blends
- **Pickles**: Sweet Mango Pickle, traditional pickles
- **Dry Fruits**: Premium Almonds, organic mixed nuts
- **Grocery**: Basmati Rice, essential staples
- **Special Products**: Diwali Special Mix, Sugar-Free Ladoo, Kids Snack Pack

### 6. Default Users
- **Admin User**: admin@edigitalindia.com / admin123
- **Sample Customer**: customer@example.com / customer123

## How to Run Seeding

### Option 1: Using npm script
```bash
npm run seed
```

### Option 2: Direct execution
```bash
npx ts-node src/libs/dummyData/seedDatabase.ts
```

### Option 3: After building
```bash
npm run build
node dist/libs/dummyData/seedDatabase.js
```

## Seeding Logic

The seeding process follows this order:

1. **User Privileges** - Creates basic system permissions
2. **Categories** - Creates main food product categories
3. **Groups** - Creates product quality and target market groups
4. **Subcategories** - Creates subcategories linked to their parent categories
5. **Products** - Creates sample products with proper category, group, and subcategory relationships
6. **Default Users** - Creates admin and sample customer accounts

## Product Features

The seeded products include:
- **Realistic Pricing**: MRP ranges from ₹25 to ₹220 based on product type and quality
- **Proper Expiry Dates**: Different validity periods based on product type (3 months to 2 years)
- **Stock Management**: Initial stock levels with low and over stock limits
- **Product Codes**: Systematic HD-XXX-XXX format for easy identification
- **Rich Descriptions**: Detailed product descriptions with authentic Haldiram-style language
- **Tags**: Relevant tags for search and categorization
- **Image URLs**: Placeholder image URLs for product images
- **Grammage**: Realistic package sizes from 100g to 1000g

## Safety Features

- **Idempotent**: Running the seed multiple times won't create duplicates
- **Error Handling**: Graceful error handling with detailed logging
- **Dependency Management**: Products are only created after categories, groups, and subcategories exist
- **Existing Data Check**: Skips creation if data already exists
- **Reference Validation**: Ensures all product references (category, group, subcategory) exist before creation

## Customization

To modify the default data:

1. **Categories**: Edit `src/libs/dummyData/defaultCategories.ts`
2. **Groups**: Edit `src/libs/dummyData/defaultGroups.ts`
3. **Subcategories**: Edit `src/libs/dummyData/defaultSubCategories.ts`
4. **Products**: Edit `src/libs/dummyData/defaultProducts.ts`
5. **Privileges**: Edit `src/libs/dummyData/defaultPrivileges.ts`

## Logging

The seeding process provides detailed console output:
- ✅ Success messages for created items
- ⏭️ Skip messages for existing items
- ❌ Error messages for failed operations
- 📋 Section headers for each seeding phase
- 🛍️ Product creation progress with detailed validation

## Troubleshooting

### Common Issues

1. **Database Connection**: Ensure your database is running and accessible
2. **Prisma Client**: Run `npx prisma generate` if you get Prisma client errors
3. **Permissions**: Ensure your database user has CREATE permissions
4. **Schema Mismatch**: Ensure your Prisma schema matches the seeding data structure
5. **Reference Errors**: Check that categories, groups, and subcategories exist before seeding products

### Reset Database

If you need to start fresh:
```bash
npx prisma db push --force-reset
npm run seed
```

## File Structure

```
src/libs/dummyData/
├── seedDatabase.ts          # Main seeding logic
├── defaultPrivileges.ts     # User privilege definitions
├── defaultCategories.ts     # Food category definitions
├── defaultGroups.ts         # Product group definitions
├── defaultSubCategories.ts  # Food subcategory definitions
└── defaultProducts.ts       # Sample product definitions
```

## Notes

- The seeding process is designed to be safe for production use
- All timestamps are automatically set by Prisma
- MongoDB ObjectIds are automatically generated
- The process maintains referential integrity between related entities
- Categories and subcategories are specifically designed for Haldiram-style food products
- Products include realistic pricing, expiry dates, and stock levels
- All products are properly linked to their respective categories, groups, and subcategories
