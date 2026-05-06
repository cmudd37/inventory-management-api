# Inventory Management API

A full-stack inventory management system built with Spring Boot, JWT authentication, and PostgreSQL. Features a deployed
REST API backend and a responsive vanilla JavaScript frontend.

🔗 **Live Demo:** [inventory-management-api-plum.vercel.app](https://inventory-management-api-plum.vercel.app)

---

## Features

- JWT-based stateless authentication (register, login, role-based access)
- BCrypt password hashing
- Full CRUD operations for products and categories
- Product search and filtering
- Role-based UI — admin controls visible only to admin users
- Global exception handling
- Deployed backend (Render) and frontend (Vercel)

---

## Tech Stack

**Backend**

- Java 17
- Spring Boot
- Spring Security
- JSON Web Tokens (JWT)
- PostgreSQL
- JPA / Hibernate

**Frontend**

- HTML, CSS, Vanilla JavaScript
- Deployed on Vercel

**Infrastructure**

- Backend hosted on Render
- Database hosted on Render (PostgreSQL)
- Frontend hosted on Vercel

---

## Architecture

The project follows a layered backend architecture:

```
Controller → Service → Repository → Database
```

- **Controller** — handles incoming HTTP requests and maps routes
- **Service** — contains business logic
- **Repository** — interfaces with PostgreSQL via JPA
- **DTO** — separates request/response shapes from internal entities
- **Security** — JWT filter, security config, BCrypt encoding

Frontend is structured as modular vanilla JS:

```
index.html        ← HTML structure only
css/styles.css    ← all styling
js/config.js      ← shared state and base URL
js/utils.js       ← shared helpers (toast, currency formatting, role decoding)
js/auth.js        ← login, logout, register
js/categories.js  ← category loading
js/products.js    ← product CRUD and rendering
```

---

## Authentication Flow

1. User registers via `POST /auth/register`
2. User logs in via `POST /auth/login`
3. Server validates credentials and returns a signed JWT
4. Client stores the token in `localStorage`
5. All protected requests include `Authorization: Bearer <token>`
6. `JwtFilter` validates the token on every request

---

## API Endpoints

### Auth

| Method | Endpoint         | Access | Description           |
|--------|------------------|--------|-----------------------|
| POST   | `/auth/register` | Public | Register a new user   |
| POST   | `/auth/login`    | Public | Login and receive JWT |

### Products

| Method | Endpoint                 | Access        | Description             |
|--------|--------------------------|---------------|-------------------------|
| GET    | `/products`              | Authenticated | Get all products        |
| GET    | `/products?name={query}` | Authenticated | Search products by name |
| POST   | `/products`              | Authenticated | Create a product        |
| PUT    | `/products/{id}`         | Authenticated | Update a product        |
| DELETE | `/products/{id}`         | Authenticated | Delete a product        |

### Categories

| Method | Endpoint           | Access        | Description        |
|--------|--------------------|---------------|--------------------|
| GET    | `/categories`      | Authenticated | Get all categories |
| POST   | `/categories`      | Authenticated | Create a category  |
| DELETE | `/categories/{id}` | Authenticated | Delete a category  |

---

## Screenshots

### Login

![Login](images/login.png)

### Products (Authenticated)

![Products](images/products.png)

---

## Running Locally

### Prerequisites

- Java 17+
- Maven
- PostgreSQL

### Steps

1. Clone the repo:

```bash
git clone https://github.com/cmudd37/inventory-management-api.git
cd inventory-management-api
```

2. Configure your database in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/your_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Run the backend:

```bash
mvn spring-boot:run
```

4. Open `inventory-frontend/index.html` in your browser or serve it locally.

5. Test endpoints using Postman or the live frontend.

---

## Project Structure

```
inventory-management-api/
├── src/main/java/com/cam/inventory/
│   ├── controller/        # AuthController, ProductController, CategoryController
│   ├── service/           # AuthService, ProductService, CategoryService
│   ├── repository/        # JPA repositories
│   ├── entity/            # User, Product, Category
│   ├── dto/               # Request/response DTOs
│   ├── security/          # JwtFilter, JwtUtil, SecurityConfig
│   └── exception/         # GlobalExceptionHandler
├── inventory-frontend/
│   ├── index.html
│   ├── css/styles.css
│   └── js/
│       ├── config.js
│       ├── utils.js
│       ├── auth.js
│       ├── categories.js
│       └── products.js
└── Dockerfile
```