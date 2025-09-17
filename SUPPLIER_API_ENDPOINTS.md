# Supplier API Endpoints

This document describes the API endpoints for managing suppliers in the Haldiram backend system.

## Base URL
```
/api/suppliers
```

## Authentication
All endpoints require authentication (currently commented out in routes for development).

## Endpoints

### 1. Create Supplier
**POST** `/api/suppliers`

Creates a new supplier.

**Request Body:**
```json
{
  "name": "string (required, max 200 characters)"
}
```

**Response:**
```json
{
  "supplier": {
    "id": "string",
    "name": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

**Status Codes:**
- `201` - Supplier created successfully
- `400` - Validation error or supplier with same name already exists
- `500` - Internal server error

---

### 2. Get All Suppliers
**GET** `/api/suppliers`

Retrieves all suppliers with pagination and filtering.

**Query Parameters:**
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Items per page (default: 10)
- `search` (optional) - Search by supplier name

**Response:**
```json
{
  "suppliers": [
    {
      "id": "string",
      "name": "string",
      "createdAt": "datetime",
      "updatedAt": "datetime",
      "Stock": [
        {
          "id": "string",
          "stockQuantity": "number",
          "product": {
            "name": "string",
            "productCode": "string"
          }
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

**Status Codes:**
- `200` - Success
- `400` - Validation error
- `500` - Internal server error

---

### 3. Get Supplier by ID
**GET** `/api/suppliers/:id`

Retrieves a specific supplier by ID.

**Response:**
```json
{
  "supplier": {
    "id": "string",
    "name": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime",
    "Stock": [
      {
        "id": "string",
        "stockQuantity": "number",
        "product": {
          "name": "string",
          "productCode": "string",
          "Category": {
            "id": "string",
            "name": "string"
          }
        }
      }
    ]
  }
}
```

**Status Codes:**
- `200` - Success
- `404` - Supplier not found
- `500` - Internal server error

---

### 4. Update Supplier
**PUT** `/api/suppliers/:id`

Updates an existing supplier.

**Request Body:**
```json
{
  "name": "string (optional, max 200 characters)"
}
```

**Response:**
```json
{
  "supplier": {
    "id": "string",
    "name": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime",
    "Stock": [
      {
        "id": "string",
        "stockQuantity": "number",
        "product": {
          "name": "string",
          "productCode": "string"
        }
      }
    ]
  }
}
```

**Status Codes:**
- `200` - Supplier updated successfully
- `400` - Validation error or supplier with same name already exists
- `404` - Supplier not found
- `500` - Internal server error

---

### 5. Delete Supplier
**DELETE** `/api/suppliers/:id`

Deletes a supplier.

**Response:**
```json
{
  "message": "Supplier deleted successfully"
}
```

**Status Codes:**
- `200` - Supplier deleted successfully
- `400` - Cannot delete supplier (has associated stock records)
- `404` - Supplier not found
- `500` - Internal server error

---

### 6. Get Supplier Statistics
**GET** `/api/suppliers/stats`

Retrieves supplier statistics.

**Response:**
```json
{
  "stats": {
    "totalSuppliers": "number",
    "suppliersWithStock": "number",
    "totalStockQuantity": "number",
    "totalInventoryValue": "number",
    "averageStockPerSupplier": "number"
  }
}
```

**Status Codes:**
- `200` - Success
- `500` - Internal server error

---

## Error Response Format

All error responses follow this format:

```json
{
  "message": "Error description"
}
```

For validation errors:
```json
{
  "message": [
    {
      "code": "string",
      "expected": "string",
      "received": "string",
      "path": ["string"],
      "message": "string"
    }
  ]
}
```

## Notes

1. **Supplier Names**: Supplier names are case-insensitive and must be unique.
2. **Stock Association**: Suppliers cannot be deleted if they have associated stock records.
3. **Pagination**: Default page size is 10 items per page.
4. **Search**: Search functionality is case-insensitive and searches by supplier name.
5. **Statistics**: Statistics include inventory value calculations based on product MRP and stock quantities.
