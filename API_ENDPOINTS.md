# Product Management API Endpoints

This document describes all the API endpoints for the Product Management system.

## Authentication

All endpoints (except auth endpoints) require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Base URL
```
http://localhost:3008/api
```

---

## Product Endpoints

### 1. Create Product
**POST** `/products`

**Request Body:**
```json
{
  "name": "Sample Product",
  "mrp": 1000,
  "productCode": "PROD001",
  "description": "A sample product description",
  "expiryDate": "2024-12-31T23:59:59.000Z",
  "validity": "1 year",
  "quantity": 50,
  "tags": ["electronics", "gadgets"],
  "imageUrl": "https://example.com/image.jpg",
  "categoryId": "507f1f77bcf86cd799439011",
  "groupId": "507f1f77bcf86cd799439012",
  "subCategoryId": "507f1f77bcf86cd799439013",
  "grammage": "500g"
}
```

**Response:**
```json
{
  "product": {
    "id": "507f1f77bcf86cd799439014",
    "name": "Sample Product",
    "mrp": 1000,
    "productCode": "PROD001",
    "description": "A sample product description",
    "expiryDate": "2024-12-31T23:59:59.000Z",
    "validity": "1 year",
    "quantity": 50,
    "tags": ["electronics", "gadgets"],
    "imageUrl": "https://example.com/image.jpg",
    "categoryId": "507f1f77bcf86cd799439011",
    "groupId": "507f1f77bcf86cd799439012",
    "subCategoryId": "507f1f77bcf86cd799439013",
    "grammage": "500g",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "category": { ... },
    "group": { ... },
    "subCategory": { ... }
  }
}
```

### 2. Get All Products
**GET** `/products`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search in name, productCode, or description
- `categoryId` (optional): Filter by category
- `groupId` (optional): Filter by group
- `subCategoryId` (optional): Filter by subcategory
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter

**Example:**
```
GET /products?page=1&limit=10&search=laptop&minPrice=500&maxPrice=2000
```

**Response:**
```json
{
  "products": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### 3. Get Product by ID
**GET** `/products/:id`

**Response:**
```json
{
  "product": {
    "id": "507f1f77bcf86cd799439014",
    "name": "Sample Product",
    "mrp": 1000,
    "productCode": "PROD001",
    "description": "A sample product description",
    "expiryDate": "2024-12-31T23:59:59.000Z",
    "validity": "1 year",
    "quantity": 50,
    "tags": ["electronics", "gadgets"],
    "imageUrl": "https://example.com/image.jpg",
    "categoryId": "507f1f77bcf86cd799439011",
    "groupId": "507f1f77bcf86cd799439012",
    "subCategoryId": "507f1f77bcf86cd799439013",
    "grammage": "500g",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "category": { ... },
    "group": { ... },
    "subCategory": { ... }
  }
}
```

### 4. Update Product
**PUT** `/products/:id`

**Request Body:** (All fields optional)
```json
{
  "name": "Updated Product Name",
  "mrp": 1200,
  "quantity": 75
}
```

### 5. Delete Product
**DELETE** `/products/:id`

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

### 6. Get Product Statistics
**GET** `/products/stats`

**Response:**
```json
{
  "stats": {
    "totalProducts": 150,
    "lowStockProducts": 12,
    "totalValue": 150000,
    "averagePrice": 1000
  }
}
```

---

## Category Endpoints

### 1. Create Category
**POST** `/categories/categories`

**Request Body:**
```json
{
  "name": "Electronics",
  "description": "Electronic products and gadgets"
}
```

### 2. Get All Categories
**GET** `/categories/categories`

### 3. Get Category by ID
**GET** `/categories/categories/:id`

### 4. Update Category
**PUT** `/categories/categories/:id`

### 5. Delete Category
**DELETE** `/categories/categories/:id`

---

## Group Endpoints

### 1. Create Group
**POST** `/groups`

**Request Body:**
```json
{
  "name": "Premium",
  "description": "Premium quality products"
}
```

**Response:**
```json
{
  "group": {
    "id": "507f1f77bcf86cd799439012",
    "name": "Premium",
    "description": "Premium quality products",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Get All Groups
**GET** `/groups`

**Response:**
```json
{
  "groups": [
    {
      "id": "507f1f77bcf86cd799439012",
      "name": "Premium",
      "description": "Premium quality products",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 3. Get Group by ID
**GET** `/groups/:id`

**Response:**
```json
{
  "group": {
    "id": "507f1f77bcf86cd799439012",
    "name": "Premium",
    "description": "Premium quality products",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "Product": [...]
  }
}
```

### 4. Update Group
**PUT** `/groups/:id`

**Request Body:**
```json
{
  "name": "Premium Plus",
  "description": "Premium plus quality products"
}
```

**Response:**
```json
{
  "group": {
    "id": "507f1f77bcf86cd799439012",
    "name": "Premium Plus",
    "description": "Premium plus quality products",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 5. Delete Group
**DELETE** `/groups/:id`

**Response:**
```json
{
  "message": "Group deleted successfully"
}
```

---

## SubCategory Endpoints

### 1. Create SubCategory
**POST** `/categories/subcategories`

**Request Body:**
```json
{
  "name": "Laptops",
  "description": "Laptop computers and accessories"
}
```

### 2. Get All SubCategories
**GET** `/categories/subcategories`

### 3. Get SubCategory by ID
**GET** `/categories/subcategories/:id`

### 4. Update SubCategory
**PUT** `/categories/subcategories/:id`

### 5. Delete SubCategory
**DELETE** `/categories/subcategories/:id`

---

## Error Responses

### 400 Bad Request
```json
{
  "message": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "number",
      "path": ["name"],
      "message": "Expected string, received number"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "Access token is missing"
}
```

### 404 Not Found
```json
{
  "message": "Product not found"
}
```

### 409 Conflict
```json
{
  "message": "Product code already exists"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

---

## Usage Examples

### Creating a Complete Product Setup

1. **Create Category:**
```bash
curl -X POST http://localhost:3008/api/categories/categories \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Electronics", "description": "Electronic products"}'
```

2. **Create Group:**
```bash
curl -X POST http://localhost:3008/api/categories/groups \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Premium", "description": "Premium quality products"}'
```

3. **Create SubCategory:**
```bash
curl -X POST http://localhost:3008/api/categories/subcategories \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name": "Laptops", "description": "Laptop computers"}'
```

4. **Create Product:**
```bash
curl -X POST http://localhost:3008/api/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "MacBook Pro",
    "mrp": 150000,
    "productCode": "MBP001",
    "description": "Apple MacBook Pro 13-inch",
    "expiryDate": "2025-12-31T23:59:59.000Z",
    "validity": "2 years",
    "quantity": 10,
    "tags": ["laptop", "apple", "premium"],
    "imageUrl": "https://example.com/macbook.jpg",
    "categoryId": "CATEGORY_ID",
    "groupId": "GROUP_ID",
    "subCategoryId": "SUBCATEGORY_ID",
    "grammage": "1.4kg"
  }'
```

### Searching Products
```bash
curl -X GET "http://localhost:3008/api/products?search=laptop&minPrice=50000&maxPrice=200000&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```
