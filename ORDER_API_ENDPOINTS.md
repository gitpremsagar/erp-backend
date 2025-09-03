# Order and Customer API Endpoints

## Order Endpoints

### 1. Create Order
- **POST** `/api/orders`
- **Description**: Create a new order with order items
- **Body**:
```json
{
  "customerId": "string (24 chars - MongoDB ObjectId)",
  "totalPrice": "number (positive integer, optional)",
  "vehicleId": "string (24 chars - MongoDB ObjectId, optional)",
  "deliveryAddressId": "string (24 chars - MongoDB ObjectId, optional)",
  "orderItems": [
    {
      "productId": "string (24 chars - MongoDB ObjectId)",
      "quantity": "number (positive integer)"
    }
  ]
}
```
- **Response**: 201 Created with order details
- **Features**: 
  - Validates customer existence
  - Validates vehicle and delivery address if provided
  - Checks product stock availability
  - Automatically decrements product stock
  - Creates order items in transaction with customerId

### 2. Get All Orders
- **GET** `/api/orders`
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10)
  - `status` (optional): Filter by order status
  - `customerId` (optional): Filter by customer ID
  - `startDate` (optional): Filter orders from date (ISO string)
  - `endDate` (optional): Filter orders until date (ISO string)
- **Response**: Orders with pagination info
- **Features**: 
  - Pagination support
  - Multiple filtering options
  - Includes customer, vehicle, delivery address, and product details

### 3. Get Order Statistics
- **GET** `/api/orders/stats`
- **Description**: Get order statistics
- **Response**: Total orders, pending orders, completed orders, total revenue

### 4. Get Order by ID
- **GET** `/api/orders/:id`
- **Description**: Get a specific order by ID
- **Response**: Order details with customer, vehicle, delivery address, and order items

### 5. Update Order
- **PUT** `/api/orders/:id`
- **Description**: Update order status, total price, customer, vehicle, delivery address, or original order ID
- **Body**:
```json
{
  "status": "PENDING|MODIFYING|PACKING|SHIPPING|DELIVERED|COMPLETED",
  "totalPrice": "number (positive integer, optional)",
  "customerId": "string (24 chars - MongoDB ObjectId, optional)",
  "vehicleId": "string (24 chars - MongoDB ObjectId, optional)",
  "deliveryAddressId": "string (24 chars - MongoDB ObjectId, optional)",
  "originalOrderId": "string (24 chars - MongoDB ObjectId, optional)",
  "orderItems": [
    {
      "productId": "string (24 chars - MongoDB ObjectId)",
      "quantity": "number (positive integer)"
    }
  ]
}
```
- **Features**: 
  - Validates all referenced entities exist
  - Handles stock adjustments when updating items
  - Restores old stock and decrements new stock

### 6. Delete Order
- **DELETE** `/api/orders/:id`
- **Description**: Delete an order and restore product stock
- **Features**: 
  - Automatically restores product stock
  - Deletes order items in transaction

## OrderItem Endpoints

### 1. Create Order Item
- **POST** `/api/order-items`
- **Description**: Create a new order item
- **Body**:
```json
{
  "orderId": "string (24 chars - MongoDB ObjectId)",
  "productId": "string (24 chars - MongoDB ObjectId)",
  "quantity": "number (positive integer)",
  "customerId": "string (24 chars - MongoDB ObjectId)",
  "deliveryDate": "date (optional)",
  "orderCompleted": "boolean (optional, default: false)"
}
```

### 2. Get All Order Items
- **GET** `/api/order-items`
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10)
  - `orderId` (optional): Filter by order ID
  - `productId` (optional): Filter by product ID
  - `customerId` (optional): Filter by customer ID
  - `orderCompleted` (optional): Filter by completion status

### 3. Update Order Item
- **PUT** `/api/order-items/:id`
- **Description**: Update an order item
- **Body**: Any combination of order item fields (all optional)

### 4. Delete Order Item
- **DELETE** `/api/order-items/:id`
- **Description**: Delete an order item and restore product stock

### 5. Get Order Item Statistics
- **GET** `/api/order-items/stats`
- **Description**: Get order item statistics

## Customer Endpoints

### 1. Create Customer
- **POST** `/api/customers`
- **Description**: Create a new customer
- **Body**:
```json
{
  "name": "string (1-100 chars)",
  "aadharNumber": "number (positive integer)",
  "email": "string (valid email)",
  "phone": "string (10-15 chars)",
  "address": "string (1-500 chars)",
  "pan": "string (10 chars)",
  "gstNumber": "string (15 chars)"
}
```
- **Response**: 201 Created with customer details
- **Features**: 
  - Validates unique constraints (email, phone, Aadhar, PAN, GST)
  - Prevents duplicate customer creation

### 2. Get All Customers
- **GET** `/api/customers`
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10)
  - `search` (optional): Search by name, email, or phone
- **Response**: Customers with pagination info
- **Features**: 
  - Pagination support
  - Search functionality
  - Case-insensitive search

### 3. Get Customer Statistics
- **GET** `/api/customers/stats`
- **Description**: Get customer statistics
- **Response**: Total customers, customers with orders, customers without orders

### 4. Get Customer by ID
- **GET** `/api/customers/:id`
- **Description**: Get a specific customer by ID
- **Response**: Customer details with order history

### 5. Update Customer
- **PUT** `/api/customers/:id`
- **Description**: Update customer information
- **Body**: Any combination of customer fields (all optional)
- **Features**: 
  - Validates unique constraints
  - Prevents conflicts with other customers

### 6. Delete Customer
- **DELETE** `/api/customers/:id`
- **Description**: Delete a customer
- **Features**: 
  - Prevents deletion if customer has orders
  - Safety check for data integrity

## Order Status Values
- `PENDING`: Order is created but not yet processed
- `MODIFYING`: Order is being modified
- `PACKING`: Order is being packed
- `SHIPPING`: Order is in transit
- `DELIVERED`: Order has been delivered
- `COMPLETED`: Order is fully completed

## Data Models

### Order Model
```typescript
{
  id: string;                    // MongoDB ObjectId
  customeOrderId: string;        // Unique order identifier (UUID)
  status: OrderStatus;           // Current order status
  totalPrice: number;            // Total order amount
  orderDate: Date;               // Order creation date
  createdAt: Date;               // Creation timestamp
  updatedAt: Date;               // Last update timestamp
  customerId: string;            // Reference to customer
  vehicleId: string;             // Reference to vehicle (optional)
  deliveryAddressId: string;     // Reference to delivery address (optional)
  originalOrderId: string;       // Reference to original order (optional)
  customer: User;                // Customer details
  vehicle: Vehicle;              // Vehicle details (optional)
  deliveryAddress: DeliveryAddress; // Delivery address details (optional)
  OrderItem: OrderItem[];        // Order items
}
```

### OrderItem Model
```typescript
{
  id: string;           // MongoDB ObjectId
  orderId: string;      // Reference to order
  productId: string;    // Reference to product
  quantity: number;     // Quantity ordered
  createdAt: Date;      // Creation timestamp
  updatedAt: Date;      // Last update timestamp
  deliveryDate: Date;   // Delivery date (optional)
  orderCompleted: boolean; // Completion status
  customerId: string;   // Reference to customer
  Order: Order;         // Order details
  Product: Product;     // Product details
  Customer: User;       // Customer details
}
```

### Customer Model (User with CUSTOMER privilege)
```typescript
{
  id: string;           // MongoDB ObjectId
  name: string;         // Customer name
  email: string;        // Email address
  phone: string;        // Phone number
  address: string;      // Address
  aadharNumber: number; // Aadhar card number
  pan: string;          // PAN number
  gstNumber: string;    // GST number
  privilegeId: string;  // Reference to user privilege
  Order: Order[];       // Customer orders
  OrderItem: OrderItem[]; // Customer order items
}
```

## Error Handling
All endpoints return appropriate HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `404`: Not Found
- `409`: Conflict (duplicate data)
- `500`: Internal Server Error

## Stock Management
- Creating an order automatically decrements product stock
- Updating order items adjusts stock accordingly
- Deleting an order restores product stock
- All stock operations are performed in database transactions for data consistency

## Authentication
Currently, authentication middleware is commented out. To enable:
1. Uncomment `router.use(validateAccessToken);` in route files
2. Ensure valid JWT tokens are provided in Authorization header
