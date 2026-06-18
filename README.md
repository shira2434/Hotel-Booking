# Hotel Management System

A full-stack hotel management application built with Spring Boot (Backend) and React (Frontend).

## Project Structure

```
our project/
├── firstproject/       # Backend - Spring Boot
└── hotel-client/       # Frontend - React
```

## Technologies

**Backend:**
- Java + Spring Boot
- Spring Data JPA
- H2 Database (file-based)
- ModelMapper

**Frontend:**
- React 19
- Axios
- React Scripts

## Getting Started

### Prerequisites
- Java 17+
- Maven
- Node.js + npm

### Run the Backend

```bash
cd firstproject
mvn spring-boot:run
```

The server will start at: `http://localhost:8080`

H2 Database console: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:file:./myDB`

### Run the Frontend

```bash
cd hotel-client
npm install
npm start
```

The app will open at: `http://localhost:3000`

## Features

- Dashboard
- Room management
- Customer management
- Booking management
- Category management
- Product management

## API Endpoints

| Resource   | Base URL             |
|------------|----------------------|
| Rooms      | `/api/rooms`         |
| Customers  | `/api/customers`     |
| Bookings   | `/api/bookings`      |
| Categories | `/api/categories`    |
| Products   | `/api/products`      |
