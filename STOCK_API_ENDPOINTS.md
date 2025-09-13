# Stock API Endpoints

This document describes all the available endpoints for managing stock entries in the system.

## Base URL
```
/api/stocks
```

## Authentication
All endpoints require authentication (currently commented out in routes for development).

---

## Endpoints

### 1. Create Stock Entry
**POST** `/api/stocks`

Creates a new stock entry.

**Request Body:**
```json
{
  "stockId": "string (required, unique)",
  "productId": "string (required, 24 chars)",
  "manufacturingDate": "string (required, ISO datetime)",
  "arrivalDate": "string (required, ISO datetime)",
  "validityMonths": "number (optional, default: 10)",
  "supplierName": "string (optional, max 200 chars)",
  "supplierId": "string (optional, 24 chars)",
  "stockQuantity": "number (optional, default: 0)",
  "isArchived": "boolean (optional, default: false)"
}
```

**Response:**
```json
{
  "stock": {
    "id": "string",
    "stockId": "string",
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
    }
  }
}
```

---

### 2. Get All Stock Entries
**GET** `/api/stocks`

Retrieves all stock entries with pagination and filtering.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search in stockId, supplierName, or product name
- `productId` (optional): Filter by product ID
- `supplierName` (optional): Filter by supplier name
- `isArchived` (optional): Filter by archive status (true/false)
- `expired` (optional): Filter expired items (true/false)
- `lowStock` (optional): Filter low stock items (true/false)

**Response:**
```json
{
  "stocks": [
    {
      "id": "string",
      "stockId": "string",
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
        "Category": {
          "id": "string",
          "name": "string"
        }
      },
      "StockRecord": [
        {
          "id": "string",
          "changeInStock": "number",
          "reason": "string",
          "createdAt": "datetime"
        }
      ]
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

### 3. Get Stock Statistics
**GET** `/api/stocks/stats`

Retrieves stock statistics and summary information.

**Response:**
```json
{
  "stats": {
    "totalStocks": "number",
    "totalQuantity": "number",
    "totalInventoryValue": "number",
    "expiredStocks": "number",
    "lowStockCount": "number",
    "archivedStocks": "number",
    "activeStocks": "number"
  }
}
```

---

### 4. Get Stock Alerts
**GET** `/api/stocks/alerts`

Retrieves stock alerts for expired, low stock, and expiring soon items.

**Response:**
```json
{
  "alerts": {
    "expired": [
      {
        "id": "string",
        "stockId": "string",
        "expiryDate": "datetime",
        "stockQuantity": "number",
        "product": {
          "name": "string",
          "productCode": "string"
        }
      }
    ],
    "lowStock": [
      {
        "id": "string",
        "stockId": "string",
        "stockQuantity": "number",
        "product": {
          "name": "string",
          "productCode": "string",
          "lowStockLimit": "number"
        }
      }
    ],
    "expiringSoon": [
      {
        "id": "string",
        "stockId": "string",
        "expiryDate": "datetime",
        "stockQuantity": "number",
        "product": {
          "name": "string",
          "productCode": "string"
        }
      }
    ],
    "totalAlerts": "number"
  }
}
```

---

### 5. Get Stock by Stock ID
**GET** `/api/stocks/stock-id/:stockId`

Retrieves a stock entry by its custom stock ID.

**Parameters:**
- `stockId`: The custom stock ID provided by admin

**Response:**
```json
{
  "stock": {
    "id": "string",
    "stockId": "string",
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
      },
      "ProductTagRelation": [
        {
          "ProductTag": {
            "id": "string",
            "name": "string"
          }
        }
      ]
    },
    "StockRecord": [
      {
        "id": "string",
        "changeInStock": "number",
        "reason": "string",
        "createdAt": "datetime",
        "User": {
          "id": "string",
          "name": "string",
          "email": "string"
        }
      }
    ]
  }
}
```

---

### 6. Get Stock by ID
**GET** `/api/stocks/:id`

Retrieves a stock entry by its database ID.

**Parameters:**
- `id`: The database ID of the stock entry

**Response:** Same as above.

---

### 7. Update Stock Entry
**PUT** `/api/stocks/:id`

Updates an existing stock entry.

**Parameters:**
- `id`: The database ID of the stock entry

**Request Body:**
```json
{
  "productId": "string (optional, 24 chars)",
  "manufacturingDate": "string (optional, ISO datetime)",
  "arrivalDate": "string (optional, ISO datetime)",
  "validityMonths": "number (optional)",
  "supplierName": "string (optional, max 200 chars)",
  "supplierId": "string (optional, 24 chars)",
  "stockQuantity": "number (optional)",
  "isArchived": "boolean (optional)"
}
```

**Response:**
```json
{
  "stock": {
    "id": "string",
    "stockId": "string",
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
      "Category": {
        "id": "string",
        "name": "string"
      }
    }
  }
}
```

---

### 8. Archive/Unarchive Stock
**PATCH** `/api/stocks/:id/archive`

Toggles the archive status of a stock entry.

**Parameters:**
- `id`: The database ID of the stock entry

**Request Body:**
```json
{
  "isArchived": "boolean (required)"
}
```

**Response:** Same as update response.

---

### 9. Delete Stock Entry
**DELETE** `/api/stocks/:id`

Deletes a stock entry (only if no stock records exist).

**Parameters:**
- `id`: The database ID of the stock entry

**Response:**
```json
{
  "message": "Stock deleted successfully"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "message": "Validation error details"
}
```

### 404 Not Found
```json
{
  "message": "Stock not found"
}
```

### 409 Conflict
```json
{
  "message": "Stock ID already exists"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

---

## Notes

1. **Stock ID**: The `stockId` field is a custom identifier provided by the admin and must be unique across all stock entries.

2. **Expiry Date**: Automatically calculated based on `manufacturingDate` + `validityMonths`.

3. **Stock Records**: Each stock entry can have multiple stock records tracking changes in quantity.

4. **Archive Status**: Archived stocks are hidden from normal operations but can still be queried.

5. **Low Stock Threshold**: Currently set to 10 units as an example. This should be configured based on business requirements.

6. **Expiring Soon**: Items expiring within 30 days are flagged in alerts.

7. **Authentication**: All routes are currently set up for authentication but commented out for development purposes.
