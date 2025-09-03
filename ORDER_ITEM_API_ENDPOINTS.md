# OrderItem API Endpoints

This document describes the API endpoints for managing OrderItem entities in the ERP system.

## Base URL
```
/api/order-items
```

## Endpoints

### 1. Create Order Item
**POST** `/api/order-items`

Creates a new order item and automatically updates product stock.

**Request Body:**
```json
{
  "orderId": "string (24 chars - MongoDB ObjectId)",
  "productId": "string (24 chars - MongoDB ObjectId)",
  "quantity": "number (positive integer)",
  "deliveryDate": "string (ISO datetime)",
  "orderCompleted": "boolean (optional, default: false)"
}
```

**Response (201):**
```json
{
  "orderItem": {
    "id": "string",
    "orderId": "string",
    "productId": "string",
    "quantity": "number",
    "deliveryDate": "datetime",
    "orderCompleted": "boolean",
    "createdAt": "datetime",
    "updatedAt": "datetime",
    "Order": { /* order details */ },
    "Product": {
      "id": "string",
      "name": "string",
      "mrp": "number",
      "productCode": "string",
      "Category": { /* category details */ },
      "Group": { /* group details */ },
      "SubCategory": { /* subcategory details */ }
    }
  }
}
```

**Validation Rules:**
- `orderId`: Must be a valid MongoDB ObjectId (24 characters)
- `productId`: Must be a valid MongoDB ObjectId (24 characters)
- `quantity`: Must be a positive integer
- `deliveryDate`: Must be a valid ISO datetime string
- `orderCompleted`: Optional boolean, defaults to false

**Business Logic:**
- Verifies that the order exists
- Verifies that the product exists
- Checks if product has sufficient stock
- Automatically reduces product stock by the ordered quantity
- Creates a stock entry record for tracking

---

### 2. Get All Order Items
**GET** `/api/order-items`

Retrieves all order items with pagination and filtering options.

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 10)
- `orderId` (optional): Filter by specific order ID
- `productId` (optional): Filter by specific product ID
- `orderCompleted` (optional): Filter by completion status (true/false)

**Example Request:**
```
GET /api/order-items?page=1&limit=20&orderCompleted=false
```

**Response (200):**
```json
{
  "orderItems": [
    {
      "id": "string",
      "orderId": "string",
      "productId": "string",
      "quantity": "number",
      "deliveryDate": "datetime",
      "orderCompleted": "boolean",
      "createdAt": "datetime",
      "updatedAt": "datetime",
      "Order": { /* order details */ },
      "Product": {
        "id": "string",
        "name": "string",
        "mrp": "number",
        "productCode": "string",
        "Category": { /* category details */ },
        "Group": { /* group details */ },
        "SubCategory": { /* subcategory details */ }
      }
    }
  ],
  "pagination": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "totalPages": "number",
    "hasNext": "boolean",
    "hasPrev": "boolean"
  }
}
```

---

### 3. Get Order Item by ID
**GET** `/api/order-items/:id`

Retrieves a specific order item by its ID.

**Path Parameters:**
- `id`: Order item ID (MongoDB ObjectId)

**Example Request:**
```
GET /api/order-items/507f1f77bcf86cd799439011
```

**Response (200):**
```json
{
  "orderItem": {
    "id": "string",
    "orderId": "string",
    "productId": "string",
    "quantity": "number",
    "deliveryDate": "datetime",
    "orderCompleted": "boolean",
    "createdAt": "datetime",
    "updatedAt": "datetime",
    "Order": { /* order details */ },
    "Product": {
      "id": "string",
      "name": "string",
      "mrp": "number",
      "productCode": "string",
      "Category": { /* category details */ },
      "Group": { /* group details */ },
      "SubCategory": { /* subcategory details */ }
    }
  }
}
```

**Response (404):**
```json
{
  "message": "Order item not found"
}
```

---

### 4. Update Order Item
**PUT** `/api/order-items/:id`

Updates an existing order item. If quantity is changed, automatically adjusts product stock.

**Path Parameters:**
- `id`: Order item ID (MongoDB ObjectId)

**Request Body:**
```json
{
  "quantity": "number (positive integer, optional)",
  "deliveryDate": "string (ISO datetime, optional)",
  "orderCompleted": "boolean (optional)"
}
```

**Example Request:**
```
PUT /api/order-items/507f1f77bcf86cd799439011
{
  "quantity": 5,
  "orderCompleted": true
}
```

**Response (200):**
```json
{
  "orderItem": {
    "id": "string",
    "orderId": "string",
    "productId": "string",
    "quantity": "number",
    "deliveryDate": "datetime",
    "orderCompleted": "boolean",
    "createdAt": "datetime",
    "updatedAt": "datetime",
    "Order": { /* order details */ },
    "Product": {
      "id": "string",
      "name": "string",
      "mrp": "number",
      "productCode": "string",
      "Category": { /* category details */ },
      "Group": { /* group details */ },
      "SubCategory": { /* subcategory details */ }
    }
  }
}
```

**Business Logic:**
- If quantity is increased, checks if product has sufficient stock
- Automatically adjusts product stock based on quantity changes
- Creates stock entry records for tracking changes

---

### 5. Delete Order Item
**DELETE** `/api/order-items/:id`

Deletes an order item and restores the product stock.

**Path Parameters:**
- `id`: Order item ID (MongoDB ObjectId)

**Example Request:**
```
DELETE /api/order-items/507f1f77bcf86cd799439011
```

**Response (200):**
```json
{
  "message": "Order item deleted successfully"
}
```

**Business Logic:**
- Restores the ordered quantity back to product stock
- Creates a stock entry record for tracking the restoration
- Permanently removes the order item

---

### 6. Get Order Item Statistics
**GET** `/api/order-items/stats`

Retrieves statistical information about order items.

**Example Request:**
```
GET /api/order-items/stats
```

**Response (200):**
```json
{
  "stats": {
    "totalOrderItems": "number",
    "completedOrderItems": "number",
    "pendingOrderItems": "number",
    "completionRate": "number (percentage with 2 decimal places)"
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Insufficient stock. Available: 10, Requested: 15"
}
```

### 404 Not Found
```json
{
  "message": "Order item not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

---

## Stock Management

The OrderItem API automatically manages product stock:

1. **Creating Order Items**: Reduces product stock by the ordered quantity
2. **Updating Order Items**: Adjusts stock based on quantity changes
3. **Deleting Order Items**: Restores stock back to the product
4. **Stock Tracking**: Creates StockEntry records for all stock changes

---

## Authentication

Currently, authentication is commented out in the routes. To enable authentication:

1. Uncomment the line: `router.use(validateAccessToken);`
2. Ensure the `validateAccessToken` middleware is properly configured
3. Include the access token in the Authorization header: `Authorization: Bearer <token>`

---

## Data Models

### OrderItem Schema
```typescript
{
  id: string;                    // MongoDB ObjectId
  orderId: string;               // Reference to Order
  productId: string;             // Reference to Product
  quantity: number;              // Quantity ordered
  createdAt: Date;               // Creation timestamp
  updatedAt: Date;               // Last update timestamp
  deliveryDate: Date;            // Expected delivery date
  orderCompleted: boolean;       // Completion status
}
```

### Related Models
- **Order**: Contains order information and customer details
- **Product**: Contains product details, pricing, and current stock
- **StockEntry**: Tracks all stock changes for audit purposes
