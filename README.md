# Secure Inventory Management API

A RESTful backend system for managing products and categories with secure JWT-based authentication.

## Screenshots

### Login
![Login](images/login.png)

### Products (Authenticated)
![Products](images/products.png)

## Features
- User registration and login
- JWT authentication (stateless)
- Password hashing using BCrypt
- CRUD operations for products and categories
- Search and filtering functionality
- Global exception handling

## Tech Stack
- Java
- Spring Boot
- Spring Security
- PostgreSQL
- JPA / Hibernate

## Architecture
This project follows a layered architecture:

- Controller → Handles HTTP requests
- Service → Business logic
- Repository → Database access
- DTO → Data transfer
- Security → JWT authentication

## Authentication Flow
1. User registers
2. User logs in → receives JWT
3. Token is sent in Authorization header
4. Protected endpoints validate token

## Example Request

GET /products

Authorization: Bearer <token>

## How to Run
1. Clone repo
2. Configure database in application.properties
3. Run:
   mvn spring-boot:run
