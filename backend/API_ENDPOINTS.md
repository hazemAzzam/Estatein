# Real Estate API Endpoints

This document provides a comprehensive overview of all available API endpoints in the Real Estate application.

## Base URL
All API endpoints are prefixed with `/api/v1`

## Authentication Endpoints

### POST `/api/v1/auth/login`
- **Description**: Sign in with email and password
- **Body**: 
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**: JWT token and user information

### POST `/api/v1/auth/register`
- **Description**: Sign up with username and password
- **Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**: JWT token and user information

## Properties Endpoints

### GET `/api/v1/properties`
- **Description**: Get all properties with optional filters and pagination
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10, max: 100)
  - `property_type` (optional): apartment, commercial, condo, house, land, townhouse
  - `status` (optional): for_rent, for_sale, pending, rented, sold
  - `city` (optional): Filter by city
  - `state` (optional): Filter by state
  - `min_price` (optional): Minimum price filter
  - `max_price` (optional): Maximum price filter
  - `min_rent` (optional): Minimum rent filter
  - `max_rent` (optional): Maximum rent filter
  - `bedrooms` (optional): Number of bedrooms
  - `bathrooms` (optional): Number of bathrooms
  - `min_sqft` (optional): Minimum square feet
  - `max_sqft` (optional): Maximum square feet
  - `search` (optional): Search in title, description, or address

### GET `/api/v1/properties/:id`
- **Description**: Get a specific property by ID
- **Path Parameters**:
  - `id`: Property ID

### POST `/api/v1/properties`
- **Description**: Create a new property
- **Body**:
  ```json
  {
    "title": "string",
    "description": "string (optional)",
    "property_type": "apartment|commercial|condo|house|land|townhouse",
    "status": "for_rent|for_sale|pending|rented|sold (optional)",
    "address": "string",
    "city": "string",
    "state": "string",
    "zip_code": "string",
    "country": "string (optional)",
    "latitude": "number (optional)",
    "longitude": "number (optional)",
    "bedrooms": "number (optional)",
    "bathrooms": "number (optional)",
    "square_feet": "number (optional)",
    "lot_size": "number (optional)",
    "year_built": "number (optional)",
    "price": "number (optional)",
    "rent_amount": "number (optional)",
    "price_per_sqft": "number (optional)",
    "features": "string[] (optional)"
  }
  ```

### PUT `/api/v1/properties/:id`
- **Description**: Update a property by ID
- **Path Parameters**:
  - `id`: Property ID
- **Body**: Same as POST, but all fields are optional

### DELETE `/api/v1/properties/:id`
- **Description**: Delete a property by ID
- **Path Parameters**:
  - `id`: Property ID

### GET `/api/v1/properties/owner/:ownerId`
- **Description**: Get all properties owned by a specific user
- **Path Parameters**:
  - `ownerId`: Owner user ID

### GET `/api/v1/properties/agent/:agentId`
- **Description**: Get all properties managed by a specific agent
- **Path Parameters**:
  - `agentId`: Agent user ID

## Favorites Endpoints

### GET `/api/v1/favorites`
- **Description**: Get all favorites with optional filters and pagination
- **Query Parameters**:
  - `user_id` (optional): Filter by user ID
  - `property_id` (optional): Filter by property ID
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10, max: 100)

### GET `/api/v1/favorites/:id`
- **Description**: Get a specific favorite by ID
- **Path Parameters**:
  - `id`: Favorite ID

### POST `/api/v1/favorites`
- **Description**: Add a property to favorites
- **Body**:
  ```json
  {
    "user_id": "string",
    "property_id": "string"
  }
  ```

### DELETE `/api/v1/favorites/:id`
- **Description**: Remove a favorite by ID
- **Path Parameters**:
  - `id`: Favorite ID

### GET `/api/v1/favorites/user/:userId`
- **Description**: Get all favorites for a specific user
- **Path Parameters**:
  - `userId`: User ID

### GET `/api/v1/favorites/check/:userId/:propertyId`
- **Description**: Check if a property is favorited by a user
- **Path Parameters**:
  - `userId`: User ID
  - `propertyId`: Property ID

### DELETE `/api/v1/favorites/user/:userId/property/:propertyId`
- **Description**: Remove a favorite by user ID and property ID
- **Path Parameters**:
  - `userId`: User ID
  - `propertyId`: Property ID

## Inquiries Endpoints

### GET `/api/v1/inquiries`
- **Description**: Get all inquiries with optional filters and pagination
- **Query Parameters**:
  - `property_id` (optional): Filter by property ID
  - `from_user_id` (optional): Filter by sender user ID
  - `to_user_id` (optional): Filter by recipient user ID
  - `inquiry_type` (optional): general, offer, question, viewing_request
  - `status` (optional): pending, responded, closed
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10, max: 100)

### GET `/api/v1/inquiries/:id`
- **Description**: Get a specific inquiry by ID
- **Path Parameters**:
  - `id`: Inquiry ID

### POST `/api/v1/inquiries`
- **Description**: Create a new inquiry
- **Body**:
  ```json
  {
    "property_id": "string (optional)",
    "from_user_id": "string (optional)",
    "to_user_id": "string (optional)",
    "message": "string",
    "inquiry_type": "general|offer|question|viewing_request (optional)",
    "status": "pending|responded|closed (optional)"
  }
  ```

### PUT `/api/v1/inquiries/:id`
- **Description**: Update an inquiry by ID
- **Path Parameters**:
  - `id`: Inquiry ID
- **Body**: Same as POST, but all fields are optional

### DELETE `/api/v1/inquiries/:id`
- **Description**: Delete an inquiry by ID
- **Path Parameters**:
  - `id`: Inquiry ID

### GET `/api/v1/inquiries/property/:propertyId`
- **Description**: Get all inquiries for a specific property
- **Path Parameters**:
  - `propertyId`: Property ID

### GET `/api/v1/inquiries/user/:userId/:type`
- **Description**: Get all inquiries sent or received by a specific user
- **Path Parameters**:
  - `userId`: User ID
  - `type`: "sent" or "received"

### PATCH `/api/v1/inquiries/:id/status`
- **Description**: Update the status of an inquiry
- **Path Parameters**:
  - `id`: Inquiry ID
- **Body**:
  ```json
  {
    "status": "pending|responded|closed"
  }
  ```

## Saved Searches Endpoints

### GET `/api/v1/saved-searches`
- **Description**: Get all saved searches with optional filters and pagination
- **Query Parameters**:
  - `user_id` (optional): Filter by user ID
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10, max: 100)

### GET `/api/v1/saved-searches/:id`
- **Description**: Get a specific saved search by ID
- **Path Parameters**:
  - `id`: Saved search ID

### POST `/api/v1/saved-searches`
- **Description**: Create a new saved search
- **Body**:
  ```json
  {
    "user_id": "string",
    "name": "string",
    "search_criteria": "object"
  }
  ```

### PUT `/api/v1/saved-searches/:id`
- **Description**: Update a saved search by ID
- **Path Parameters**:
  - `id`: Saved search ID
- **Body**: Same as POST, but all fields are optional

### DELETE `/api/v1/saved-searches/:id`
- **Description**: Delete a saved search by ID
- **Path Parameters**:
  - `id`: Saved search ID

### GET `/api/v1/saved-searches/user/:userId`
- **Description**: Get all saved searches for a specific user
- **Path Parameters**:
  - `userId`: User ID

### DELETE `/api/v1/saved-searches/user/:userId`
- **Description**: Delete all saved searches for a specific user
- **Path Parameters**:
  - `userId`: User ID

## Response Format

All API responses follow this format:

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": {
    "properties": [...],
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

## Swagger Documentation

The API includes Swagger documentation available at `/swagger` when running the server. This provides an interactive interface to test all endpoints.

## Error Handling

The API includes comprehensive error handling with appropriate HTTP status codes:
- `200`: Success
- `400`: Bad Request (validation errors)
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error

All errors are logged using the application's logging system for debugging purposes.
