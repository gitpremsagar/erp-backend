# Authentication API Endpoints

This document describes the authentication and user management endpoints for the ERP system.

## Base URL
```
http://localhost:3008/api
```

## Authentication Endpoints

### 1. User Registration
**POST** `/auth/sign-up`

Creates a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "name": "John Doe",
  "phone": "9876543210",
  "privilegeId": "507f1f77bcf86cd799439011",
  "aadharNumber": 123456789012,
  "pan": "ABCDE1234F",
  "gstNumber": "22AAAAA0000A1Z5",
  "address": "123 Main Street, City, State"
}
```

**Required Fields:**
- `email`: Valid email address
- `password`: Minimum 6 characters
- `confirmPassword`: Must match password
- `name`: 2-100 characters
- `phone`: 10-15 digits
- `privilegeId`: Valid privilege ID from the system

**Optional Fields:**
- `aadharNumber`: 12-digit number
- `pan`: PAN card number
- `gstNumber`: GST number
- `address`: Address string

**Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "9876543210",
    "privilegeId": "507f1f77bcf86cd799439011",
    "aadharNumber": 123456789012,
    "pan": "ABCDE1234F",
    "gstNumber": "22AAAAA0000A1Z5",
    "address": "123 Main Street, City, State",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "privilege": {
      "id": "507f1f77bcf86cd799439011",
      "name": "CUSTOMER",
      "description": "Can place orders and manage profile"
    }
  }
}
```

### 2. User Login
**POST** `/auth/sign-in`

Authenticates a user and returns access tokens.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "9876543210",
    "privilege": {
      "id": "507f1f77bcf86cd799439011",
      "name": "CUSTOMER",
      "description": "Can place orders and manage profile"
    },
    "aadharNumber": 123456789012,
    "pan": "ABCDE1234F",
    "gstNumber": "22AAAAA0000A1Z5",
    "address": "123 Main Street, City, State"
  }
}
```

**Cookies Set:**
- `accessToken`: JWT access token
- `refreshToken`: JWT refresh token (httpOnly)

### 3. User Logout
**POST** `/auth/sign-out`

Logs out the user by clearing authentication cookies.

**Response (204):** No content

### 4. Refresh Access Token
**POST** `/auth/refresh-access-token`

Refreshes the access token using a valid refresh token.

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "9876543210",
    "privilege": {
      "id": "507f1f77bcf86cd799439011",
      "name": "CUSTOMER",
      "description": "Can place orders and manage profile"
    },
    "aadharNumber": 123456789012,
    "pan": "ABCDE1234F",
    "gstNumber": "22AAAAA0000A1Z5",
    "address": "123 Main Street, City, State"
  }
}
```

### 5. Decode Access Token
**POST** `/auth/decode-access-token`

Decodes and validates the current access token.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "9876543210",
    "privilege": {
      "id": "507f1f77bcf86cd799439011",
      "name": "CUSTOMER",
      "description": "Can place orders and manage profile"
    },
    "aadharNumber": 123456789012,
    "pan": "ABCDE1234F",
    "gstNumber": "22AAAAA0000A1Z5",
    "address": "123 Main Street, City, State"
  }
}
```

### 6. Get User Profile
**GET** `/auth/profile`

Retrieves the current authenticated user's profile.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "9876543210",
    "privilege": {
      "id": "507f1f77bcf86cd799439011",
      "name": "CUSTOMER",
      "description": "Can place orders and manage profile"
    },
    "aadharNumber": 123456789012,
    "pan": "ABCDE1234F",
    "gstNumber": "22AAAAA0000A1Z5",
    "address": "123 Main Street, City, State"
  }
}
```

### 7. Forgot Password
**POST** `/auth/forgot-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response (501):**
```json
{
  "message": "Not implemented yet"
}
```

### 8. Change Password
**POST** `/auth/change-password`

**Request Body:**
```json
{
  "oldPassword": "currentPassword",
  "newPassword": "newPassword123"
}
```

**Response (501):**
```json
{
  "message": "Not implemented yet"
}
```

## User Privilege Management Endpoints

### 1. Create User Privilege
**POST** `/user-privileges`

Creates a new user privilege level.

**Request Body:**
```json
{
  "name": "MANAGER",
  "description": "Department manager with limited administrative access"
}
```

**Response (201):**
```json
{
  "message": "User privilege created successfully",
  "privilege": {
    "id": "507f1f77bcf86cd799439011",
    "name": "MANAGER",
    "description": "Department manager with limited administrative access",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 2. Get All User Privileges
**GET** `/user-privileges`

Retrieves all available user privileges.

**Response (200):**
```json
{
  "privileges": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "ADMIN",
      "description": "Full system access",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 3. Get User Privilege by ID
**GET** `/user-privileges/:id`

Retrieves a specific user privilege.

**Response (200):**
```json
{
  "privilege": {
    "id": "507f1f77bcf86cd799439011",
    "name": "ADMIN",
    "description": "Full system access",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 4. Update User Privilege
**PUT** `/user-privileges/:id`

Updates an existing user privilege.

**Request Body:**
```json
{
  "name": "SENIOR_ADMIN",
  "description": "Senior administrator with enhanced permissions"
}
```

**Response (200):**
```json
{
  "message": "User privilege updated successfully",
  "privilege": {
    "id": "507f1f77bcf86cd799439011",
    "name": "SENIOR_ADMIN",
    "description": "Senior administrator with enhanced permissions",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### 5. Delete User Privilege
**DELETE** `/user-privileges/:id`

Deletes a user privilege (only if not assigned to any users).

**Response (200):**
```json
{
  "message": "User privilege deleted successfully"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error details"
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
  "message": "User not found"
}
```

### 409 Conflict
```json
{
  "message": "User already exists"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

## Authentication Flow

1. **Registration**: User creates account with required information
2. **Login**: User authenticates and receives access/refresh tokens
3. **API Calls**: Include `Authorization: Bearer <token>` header
4. **Token Refresh**: Use refresh token to get new access token
5. **Logout**: Clear all authentication cookies

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens for stateless authentication
- HttpOnly cookies for refresh tokens
- Secure cookie settings in production
- Input validation using Zod schemas
- Password confirmation during registration

## Database Seeding

To set up the system with default privileges and admin user:

```bash
npm run seed
```

This will create:
- Default user privileges (ADMIN, ORDER_PROCESSOR, CUSTOMER, EMPLOYEE)
- Default admin user (admin@edigitalindia.com / admin123)

## Environment Variables

Required environment variables:

```env
DATABASE_URL="mongodb://localhost:27017/erp"
BCRYPT_SALT_ROUNDS=10
ACCESS_TOKEN_JWT_SECRET="your-secret-key"
REFRESH_TOKEN_JWT_SECRET="your-refresh-secret-key"
ACCESS_TOKEN_JWT_EXPIRY=3600
REFRESH_TOKEN_JWT_EXPIRY=604800
ACCESS_TOKEN_COOKIE_EXPIRY=3600000
NODE_ENV="development"
FRONTEND_DOMAIN="http://localhost:3000"
```
