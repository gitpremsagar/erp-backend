# Stock Record API Endpoints

This document describes all the available endpoints for managing stock records in the system. Stock records track all changes to stock quantities, including arrivals from suppliers, deliveries to customers, and administrative corrections.

## Base URL
```
/api/stock-records
```

## Authentication
All endpoints require authentication (currently commented out in routes for development).

---

## Endpoints

### 1. Create Stock Record
**POST** `/api/stock-records`

Creates a new stock record and updates the corresponding stock batch quantity.

**Request Body:**
```json
{
  "productId": "string (required, 24 chars)",
  "stockBatchId": "string (required, 24 chars)",
  "changeInStock": "number (required, integer, cannot be zero)",
  "reason": "string (required, one of: ARRIVAL_FROM_SUPPLIER, DELIVERED_TO_CUSTOMER, CORRECTION_BY_ADMIN)",
  "createdBy": "string (required, 24 chars)"
}
```

**Response (201):**
```json
{
  "stockRecord": {
    "id": "string",
    "productId": "string",
    "stockBatchId": "string",
    "changeInStock": "number",
    "reason": "string",
    "createdBy": "string",
    "createdAt": "datetime",
    "Product": {
      "id": "string",
      "name": "string",
      "productCode": "string",
      "mrp": "number",
      "Category": {
        "id": "string",
        "name": "string"
      }
    },
    "StockBatch": {
      "id": "string",
      "productId": "string",
      "manufacturingDate": "datetime",
      "arrivalDate": "datetime",
      "validityMonths": "number",
      "expiryDate": "datetime",
      "supplierName": "string",
      "supplierId": "string",
      "stockQuantity": "number",
      "isArchived": "boolean",
      "createdAt": "datetime",
      "updatedAt": "datetime",
      "product": {
        "id": "string",
        "name": "string",
        "productCode": "string",
        "mrp": "number",
        "Category": {
          "id": "string",
          "name": "string"
        }
      },
      "supplier": {
        "id": "string",
        "name": "string",
        "createdAt": "datetime",
        "updatedAt": "datetime"
      }
    },
    "User": {
      "id": "string",
      "name": "string",
      "email": "string",
      "userType": "string"
    }
  },
  "updatedStockQuantity": "number"
}
```

**Validation Rules:**
- `productId`: Required, must be 24 characters (valid MongoDB ObjectId)
- `stockBatchId`: Required, must be 24 characters (valid MongoDB ObjectId)
- `changeInStock`: Required, must be a non-zero integer
- `reason`: Required, must be one of the specified enum values
- `createdBy`: Required, must be 24 characters (valid MongoDB ObjectId)
- Stock batch must belong to the specified product
- Change cannot result in negative stock quantity

**Error Responses:**
- `400`: Validation error or insufficient stock
- `404`: Product, stock batch, or user not found
- `500`: Internal server error

---

### 2. Get All Stock Records
**GET** `/api/stock-records`

Retrieves all stock records with pagination and filtering options.

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 10)
- `search` (optional): Search in product name, product code, or user name/email
- `productId` (optional): Filter by product ID
- `stockBatchId` (optional): Filter by stock batch ID
- `reason` (optional): Filter by reason (ARRIVAL_FROM_SUPPLIER, DELIVERED_TO_CUSTOMER, CORRECTION_BY_ADMIN)
- `createdBy` (optional): Filter by user who created the record
- `dateFrom` (optional): Filter records from this date (ISO format)
- `dateTo` (optional): Filter records to this date (ISO format)

**Example:**
```
GET /api/stock-records?page=1&limit=10&reason=ARRIVAL_FROM_SUPPLIER&dateFrom=2024-01-01&dateTo=2024-12-31
```

**Response (200):**
```json
{
  "stockRecords": [
    {
      "id": "string",
      "productId": "string",
      "stockBatchId": "string",
      "changeInStock": "number",
      "reason": "string",
      "createdBy": "string",
      "createdAt": "datetime",
      "Product": {
        "id": "string",
        "name": "string",
        "productCode": "string",
        "mrp": "number",
        "Category": {
          "id": "string",
          "name": "string"
        }
      },
      "StockBatch": {
        "id": "string",
        "productId": "string",
        "manufacturingDate": "datetime",
        "arrivalDate": "datetime",
        "validityMonths": "number",
        "expiryDate": "datetime",
        "supplierName": "string",
        "supplierId": "string",
        "stockQuantity": "number",
        "isArchived": "boolean",
        "createdAt": "datetime",
        "updatedAt": "datetime",
        "product": {
          "id": "string",
          "name": "string",
          "productCode": "string",
          "mrp": "number",
          "Category": {
            "id": "string",
            "name": "string"
          }
        },
        "supplier": {
          "id": "string",
          "name": "string",
          "createdAt": "datetime",
          "updatedAt": "datetime"
        }
      },
      "User": {
        "id": "string",
        "name": "string",
        "email": "string",
        "userType": "string"
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

### 3. Get Stock Record by ID
**GET** `/api/stock-records/:id`

Retrieves a specific stock record by ID.

**Response (200):**
```json
{
  "stockRecord": {
    "id": "string",
    "productId": "string",
    "stockBatchId": "string",
    "changeInStock": "number",
    "reason": "string",
    "createdBy": "string",
    "createdAt": "datetime",
    "Product": {
      "id": "string",
      "name": "string",
      "productCode": "string",
      "mrp": "number",
      "Category": {
        "id": "string",
        "name": "string"
      }
    },
    "StockBatch": {
      "id": "string",
      "productId": "string",
      "manufacturingDate": "datetime",
      "arrivalDate": "datetime",
      "validityMonths": "number",
      "expiryDate": "datetime",
      "supplierName": "string",
      "supplierId": "string",
      "stockQuantity": "number",
      "isArchived": "boolean",
      "createdAt": "datetime",
      "updatedAt": "datetime",
      "product": {
        "id": "string",
        "name": "string",
        "productCode": "string",
        "mrp": "number",
        "Category": {
          "id": "string",
          "name": "string"
        }
      },
      "supplier": {
        "id": "string",
        "name": "string",
        "createdAt": "datetime",
        "updatedAt": "datetime"
      }
    },
    "User": {
      "id": "string",
      "name": "string",
      "email": "string",
      "userType": "string"
    },
    "Order": [
      {
        "id": "string",
        "customeOrderId": "string",
        "status": "string",
        "totalPrice": "number",
        "orderDate": "datetime"
      }
    ]
  }
}
```

**Error Responses:**
- `400`: Invalid stock record ID format
- `404`: Stock record not found
- `500`: Internal server error

---

### 4. Update Stock Record
**PUT** `/api/stock-records/:id`

Updates an existing stock record and recalculates the stock batch quantity.

**Request Body:** (All fields optional)
```json
{
  "changeInStock": "number (integer, cannot be zero)",
  "reason": "string (one of: ARRIVAL_FROM_SUPPLIER, DELIVERED_TO_CUSTOMER, CORRECTION_BY_ADMIN)"
}
```

**Response (200):**
```json
{
  "stockRecord": {
    "id": "string",
    "productId": "string",
    "stockBatchId": "string",
    "changeInStock": "number",
    "reason": "string",
    "createdBy": "string",
    "createdAt": "datetime",
    "Product": {
      "id": "string",
      "name": "string",
      "productCode": "string",
      "mrp": "number",
      "Category": {
        "id": "string",
        "name": "string"
      }
    },
    "StockBatch": {
      "id": "string",
      "productId": "string",
      "manufacturingDate": "datetime",
      "arrivalDate": "datetime",
      "validityMonths": "number",
      "expiryDate": "datetime",
      "supplierName": "string",
      "supplierId": "string",
      "stockQuantity": "number",
      "isArchived": "boolean",
      "createdAt": "datetime",
      "updatedAt": "datetime",
      "product": {
        "id": "string",
        "name": "string",
        "productCode": "string",
        "mrp": "number",
        "Category": {
          "id": "string",
          "name": "string"
        }
      },
      "supplier": {
        "id": "string",
        "name": "string",
        "createdAt": "datetime",
        "updatedAt": "datetime"
      }
    },
    "User": {
      "id": "string",
      "name": "string",
      "email": "string",
      "userType": "string"
    }
  }
}
```

**Error Responses:**
- `400`: Validation error or insufficient stock
- `404`: Stock record not found
- `500`: Internal server error

---

### 5. Delete Stock Record
**DELETE** `/api/stock-records/:id`

Deletes a stock record and reverts the stock batch quantity.

**Response (200):**
```json
{
  "message": "Stock record deleted successfully",
  "revertedStockQuantity": "number"
}
```

**Error Responses:**
- `400`: Invalid stock record ID format, record associated with orders, or would result in negative stock
- `404`: Stock record not found
- `500`: Internal server error

---

### 6. Get Stock Records by Product ID
**GET** `/api/stock-records/product/:productId`

Retrieves all stock records for a specific product.

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 10)
- `reason` (optional): Filter by reason
- `dateFrom` (optional): Filter records from this date
- `dateTo` (optional): Filter records to this date

**Response (200):**
```json
{
  "product": {
    "id": "string",
    "name": "string",
    "productCode": "string",
    "mrp": "number",
    "Category": {
      "id": "string",
      "name": "string"
    }
  },
  "stockRecords": [...],
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

### 7. Get Stock Records by Stock Batch ID
**GET** `/api/stock-records/stock-batch/:stockBatchId`

Retrieves all stock records for a specific stock batch.

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 10)
- `reason` (optional): Filter by reason
- `dateFrom` (optional): Filter records from this date
- `dateTo` (optional): Filter records to this date

**Response (200):**
```json
{
  "stockBatch": {
    "id": "string",
    "productId": "string",
    "manufacturingDate": "datetime",
    "arrivalDate": "datetime",
    "validityMonths": "number",
    "expiryDate": "datetime",
    "supplierName": "string",
    "supplierId": "string",
    "stockQuantity": "number",
    "isArchived": "boolean",
    "createdAt": "datetime",
    "updatedAt": "datetime",
    "product": {
      "id": "string",
      "name": "string",
      "productCode": "string",
      "mrp": "number",
      "Category": {
        "id": "string",
        "name": "string"
      }
    },
    "supplier": {
      "id": "string",
      "name": "string",
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
  },
  "stockRecords": [...],
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

### 8. Get Stock Record Statistics
**GET** `/api/stock-records/stats`

Retrieves statistics about stock records.

**Response (200):**
```json
{
  "stats": {
    "totalStockRecords": "number",
    "arrivalRecords": "number",
    "deliveryRecords": "number",
    "correctionRecords": "number",
    "totalStockIn": "number",
    "totalStockOut": "number",
    "recentActivity": "number"
  }
}
```

**Statistics Include:**
- `totalStockRecords`: Total number of stock records
- `arrivalRecords`: Number of records with reason "ARRIVAL_FROM_SUPPLIER"
- `deliveryRecords`: Number of records with reason "DELIVERED_TO_CUSTOMER"
- `correctionRecords`: Number of records with reason "CORRECTION_BY_ADMIN"
- `totalStockIn`: Total positive stock changes
- `totalStockOut`: Total negative stock changes (absolute value)
- `recentActivity`: Number of records created in the last 30 days

---

## Stock Record Reasons

The `reason` field can have the following values:

- **ARRIVAL_FROM_SUPPLIER**: Stock received from a supplier
- **DELIVERED_TO_CUSTOMER**: Stock delivered to a customer
- **CORRECTION_BY_ADMIN**: Administrative correction to stock levels

---

## Important Notes

1. **Stock Quantity Updates**: Creating, updating, or deleting stock records automatically updates the corresponding stock batch quantity.

2. **Negative Stock Prevention**: The system prevents operations that would result in negative stock quantities.

3. **Data Integrity**: Stock records maintain referential integrity with products, stock batches, and users.

4. **Audit Trail**: All stock changes are tracked with timestamps and user information for complete audit trails.

5. **Order Association**: Stock records can be associated with orders, and deletion is prevented if orders are linked.

6. **Validation**: All input data is validated using Zod schemas to ensure data integrity.
