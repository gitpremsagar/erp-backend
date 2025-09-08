# ProductTag API Endpoints

This document describes the API endpoints for managing ProductTag entities in the ERP system.

## Base URL
```
/api/product-tags
```

## Endpoints

### 1. Create Product Tag
**POST** `/api/product-tags`

Creates a new product tag.

**Request Body:**
```json
{
  "name": "string (required, 1-100 characters)"
}
```

**Response (201):**
```json
{
  "productTag": {
    "id": "string",
    "name": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  }
}
```

**Validation Rules:**
- `name`: Required, must be 1-100 characters, trimmed
- Tag names must be unique

**Error Responses:**
- `400`: Validation error
- `409`: Tag name already exists
- `500`: Internal server error

---

### 2. Get All Product Tags
**GET** `/api/product-tags`

Retrieves all product tags with pagination and filtering options.

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 10)
- `search` (optional): Search in tag name (case-insensitive)

**Example:**
```
GET /api/product-tags?page=1&limit=10&search=electronics
```

**Response (200):**
```json
{
  "productTags": [
    {
      "id": "string",
      "name": "string",
      "createdAt": "datetime",
      "updatedAt": "datetime",
      "ProductTagRelation": [
        {
          "id": "string",
          "productId": "string",
          "productTagId": "string",
          "Product": {
            "id": "string",
            "name": "string",
            "productCode": "string",
            "mrp": "number",
            "description": "string",
            "imageUrl": "string",
            "Category": {
              "id": "string",
              "name": "string"
            },
            "SubCategory": {
              "id": "string",
              "name": "string"
            }
          }
        }
      ],
      "_count": {
        "ProductTagRelation": 5
      }
    }
  ],
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

---

### 3. Get Product Tag by ID
**GET** `/api/product-tags/:id`

Retrieves a specific product tag by its ID.

**Response (200):**
```json
{
  "productTag": {
    "id": "string",
    "name": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime",
    "ProductTagRelation": [
      {
        "id": "string",
        "productId": "string",
        "productTagId": "string",
        "Product": {
          "id": "string",
          "name": "string",
          "productCode": "string",
          "mrp": "number"
        }
      }
    ],
    "_count": {
      "ProductTagRelation": 5
    }
  }
}
```

**Error Responses:**
- `404`: Product tag not found
- `500`: Internal server error

---

### 4. Update Product Tag
**PUT** `/api/product-tags/:id`

Updates an existing product tag.

**Request Body:**
```json
{
  "name": "string (optional, 1-100 characters)"
}
```

**Response (200):**
```json
{
  "productTag": {
    "id": "string",
    "name": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime",
    "_count": {
      "ProductTagRelation": 5
    }
  }
}
```

**Validation Rules:**
- `name`: Optional, must be 1-100 characters if provided, trimmed
- Tag names must be unique

**Error Responses:**
- `400`: Validation error
- `404`: Product tag not found
- `409`: Tag name already exists
- `500`: Internal server error

---

### 5. Delete Product Tag
**DELETE** `/api/product-tags/:id`

Deletes a product tag. Cannot delete tags that are associated with products.

**Response (200):**
```json
{
  "message": "Product tag deleted successfully"
}
```

**Error Responses:**
- `400`: Cannot delete tag as it is associated with existing products
- `404`: Product tag not found
- `500`: Internal server error

---

### 6. Get Product Tag Statistics
**GET** `/api/product-tags/stats`

Retrieves statistics about product tags.

**Response (200):**
```json
{
  "stats": {
    "totalTags": 25,
    "mostUsedTags": [
      {
        "id": "string",
        "name": "string",
        "createdAt": "datetime",
        "updatedAt": "datetime",
        "_count": {
          "ProductTagRelation": 15
        }
      }
    ],
    "unusedTagsCount": 3,
    "unusedTags": [
      {
        "id": "string",
        "name": "string",
        "createdAt": "datetime",
        "updatedAt": "datetime",
        "_count": {
          "ProductTagRelation": 0
        }
      }
    ]
  }
}
```

---

## Authentication

All endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

**Note:** Currently, authentication is commented out in the route handlers. Uncomment the `router.use(validateAccessToken);` line in `src/route/productTag.route.ts` to enable authentication.

---

## Usage Examples

### Creating a Product Tag
```bash
curl -X POST http://localhost:3008/api/product-tags \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name": "Electronics"}'
```

### Getting All Product Tags
```bash
curl -X GET "http://localhost:3008/api/product-tags?page=1&limit=10&search=electronics" \
  -H "Authorization: Bearer <token>"
```

### Updating a Product Tag
```bash
curl -X PUT http://localhost:3008/api/product-tags/:id \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name": "Updated Electronics"}'
```

### Deleting a Product Tag
```bash
curl -X DELETE http://localhost:3008/api/product-tags/:id \
  -H "Authorization: Bearer <token>"
```

---

## Database Schema

The ProductTag model has the following structure:

```prisma
model ProductTag {
  id                 String               @id @default(auto()) @map("_id") @db.ObjectId
  name               String
  createdAt          DateTime             @default(now())
  updatedAt          DateTime             @updatedAt
  ProductTagRelation ProductTagRelation[]
}
```

The ProductTagRelation model connects products to tags:

```prisma
model ProductTagRelation {
  id           String     @id @default(auto()) @map("_id") @db.ObjectId
  productId    String     @db.ObjectId
  productTagId String     @db.ObjectId
  Product      Product    @relation(fields: [productId], references: [id])
  ProductTag   ProductTag @relation(fields: [productTagId], references: [id])
}
```
