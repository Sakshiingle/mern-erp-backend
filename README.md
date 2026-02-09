# MERN ERP System – Internship Project

## Internship Context

This project is developed as part of a **1-Month Internship Program** at **Skybrisk**

- Internship Type: Self-paced  
- Duration: 1 Month  
- Task: ERP System (as per assigned internship PDF)  
- Submission: GitHub Repository with proper documentation  

The goal of this internship is independent learning, hands-on backend development, and real-world ERP system design.

---

## Project Description

This is a **backend-focused ERP (Enterprise Resource Planning) system** built using the **MERN stack**.

The system is designed to handle:
- Secure authentication
- Role-based access control (RBAC)
- Admin-controlled modules
- API-driven architecture (backend first)

Frontend is intentionally minimal and added **only after backend APIs are tested via Thunder Client**, following ERP best practices.

---

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)

### Frontend
- React.js
- Axios

### Tools
- Thunder Client (API testing)
- MongoDB Compass
- Git & GitHub

---

## Features Implemented

### ✅ Week-1 (Completed)
- Project setup & environment configuration
- MongoDB connection
- User registration & login
- JWT-based authentication
- Protected routes
- Role-Based Access Control (RBAC)
- Admin-only API access
- API testing with Thunder Client

### ✅ Week-2 (Completed)
- Product module (CRUD)
  - Create product (admin only)
  - List products with pagination & search
  - Get product by ID
  - Update product
  - Delete product
- Admin user management
  - Get all users (admin only)
  - Update user roles
  - Optional user activation/deactivation
- RBAC enforced on all sensitive routes
- Complete Thunder Client testing (200 vs 403 validation)
- Minimal frontend integration for products & admin users

### ✅ Week-3: Frontend Authentication & Route Control (Completed)

- Login & Signup UI
- Frontend user state management using Context API
- User persistence using `localStorage`
- Protected routes based on:
  - Logged-in state
  - Email verification state
- Auto-redirect logic:
  - Logged-in users cannot access Login / Signup
  - Verified users → `/home`
  - Unverified users → `/verify`
- ERP-correct frontend auth flow
- Backend-independent validation using controlled dummy auth (as per ERP phase)


### ⏳ Week-4 (In Progress)
-Focus: Frontend Authentication Integration & Session Handling


## API Modules Overview

### Auth Module
- Register user
- Login user
- JWT generation & verification

### User Module (Admin Only)
- Get all users (pagination & search)
- Update user roles
- Activate / deactivate users

### Product Module
- Create product (admin)
- List products (admin, inventory, sales)
- Get product by ID
- Update product
- Delete product

---

## Role-Based Access Control (RBAC)

Roles supported:
- admin
- user
- inventory
- sales
- purchase

Access is enforced using middleware:
- Authentication → JWT verification
- Authorization → Role validation

Example:
- Admin → full access
- Normal user → restricted access (403 Forbidden)

---

## How to Run the Project

### Backend Setup

1. Clone the repository
2. Navigate to backend folder
    ```bash
   cd backend
3. Install dependencies:
    npm install
4. Create a `.env` file in backend folder:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=4000
5. Start the backend server:
   npm run dev
Server will run at: http://localhost:4000


```md
## Testing

- All backend APIs are tested using Thunder Client
- Authentication and RBAC verified:
  - Admin token → 200 OK
  - User token → 403 Forbidden
- Product and user management APIs tested before frontend usage

## Author

Sakshi Ingle  
Intern – Skybrisk

