# Inventory Management API

A secure RESTful API for managing products and categories with JWT-based authentication.

## Features
- User registration and login
- JWT authentication (stateless)
- Secure password hashing (BCrypt)
- CRUD operations for products and categories
- Search and filtering
- Global exception handling

## Tech Stack
- Java
- Spring Boot
- Spring Security
- PostgreSQL
- JPA / Hibernate

## Endpoints
- POST /auth/register
- POST /auth/login
- GET /products
- POST /products
- GET /categories

## How to Run
1. Clone the repo
2. Configure PostgreSQL in `application.properties`
3. Run the application: mvn spring-boot:run

## Notes
- Uses statless authentication via JWT instad of session-based login.
