# 🚀 Task Manager API

A secure and scalable RESTful API for managing tasks with user authentication built using **Node.js, Express.js, and MongoDB Atlas**.

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [MongoDB Atlas Setup](#mongodb-atlas-setup)
- [API Endpoints](#api-endpoints)
- [Query Parameters](#query-parameters)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Testing](#testing)
- [Author](#author)

---

## 📖 About the Project

This **Task Manager API** allows users to:

- Register and login securely
- Create, update, delete, and retrieve tasks
- Filter, sort, and paginate tasks
- Access protected routes using JWT authentication

The application is deployed on **Render** and uses **MongoDB Atlas** as the cloud database.

---

## ✨ Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Token Generation
- Password Hashing using bcryptjs

### 📋 Task Management
- Create Task
- Get All Tasks
- Get Single Task
- Update Task
- Delete Task

### ⚡ Advanced Functionalities
- Pagination
- Filtering (completed, priority, category)
- Sorting (createdAt, priority, dueDate)

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|----------|
| Node.js | Runtime environment |
| Express.js | Backend framework |
| MongoDB Atlas | Cloud database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Render | Cloud hosting |

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/Task_Manager_API.git
cd Task_Manager_API
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create .env File

Create a `.env` file in the root directory and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Run Server

```bash
npm run dev
```

Server will start at:

```
http://localhost:5000
```

---

## 🗄 MongoDB Atlas Setup

This project uses **MongoDB Atlas (Free Tier M0)**.

### Steps Used in This Project:

1. Created MongoDB Atlas Account
2. Created Free Tier Cluster (M0)
3. Added Database User (Read & Write access)
4. Configured Network Access (0.0.0.0/0 for development)
5. Copied connection string
6. Added connection string to `.env` file

---

## 📌 API Endpoints

### 👤 Authentication Routes

| Method | Endpoint              | Description   | Auth  |
| ------ | --------------------- | ------------- | ----  |
| POST   | `/api/users/register` | Register user | ❌    |
| POST   | `/api/users/login`    | Login user    | ❌    |

---

### 📋 Task Routes (Protected)

| Method | Endpoint         | Description     | Auth   |
| ------ | ---------------- | --------------- | ----   |
| POST   | `/api/tasks`     | Create task     | ✅    |
| GET    | `/api/tasks`     | Get all tasks   | ✅    |
| GET    | `/api/tasks/:id` | Get single task | ✅    |
| PUT    | `/api/tasks/:id` | Update task     | ✅    |
| DELETE | `/api/tasks/:id` | Delete task     | ✅    |

---

## 🔎 Query Parameters

### Pagination

| Parameter | Description    |
| --------- | -------------- |
| `page`    | Page number    |
| `limit`   | Items per page |

Example:

```
GET /api/tasks?page=1&limit=5
```

### Filtering

| Parameter | Example             |
| --------- | ------------------- |
| completed | true / false        |
| priority  | low / medium / high |
| category  | work / personal     |

Example:

```
GET /api/tasks?priority=high&completed=false
```

### Sorting

| Parameter | Description                    |
| --------- | ------------------------------ |
| sortBy    | createdAt / priority / dueDate |
| order     | asc / desc                     |

Example:

```
GET /api/tasks?sortBy=createdAt&order=desc
```

---

## 🗃 Database Schema

### 👤 User Schema

| Field     | Type            | Required |
| --------- | --------------- | -------- |
| username  | String          | Yes      |
| email     | String (Unique) | Yes      |
| password  | String (Hashed) | Yes      |
| createdAt | Date            | Auto     |
| updatedAt | Date            | Auto     |

---

### 📋 Task Schema

| Field       | Type                | Required |
| ----------- | ------------------- | -------- |
| title       | String              | Yes      |
| description | String              | No       |
| completed   | Boolean             | No       |
| priority    | String              | No       |
| category    | String              | No       |
| dueDate     | Date                | No       |
| user        | ObjectId (ref User) | Yes      |
| createdAt   | Date                | Auto     |
| updatedAt   | Date                | Auto     |

---

### 🔗 Entity Relationship

```
USER (1) ───────────► (N) TASK

• One User can have Multiple Tasks
• Each Task belongs to One User
```

---

## 📂 Project Structure

```
task-manager-api/
│
├── server.js
├── package.json
├── .env
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── userController.js
│   └── taskController.js
│
├── middleware/
│   └── auth.js
│
├── models/
│   ├── User.js
│   └── Task.js
│
└── routes/
    ├── userRoutes.js
    └── taskRoutes.js
```

---

## 🚀 Deployment (Render)

### Steps Used:

1. Pushed code to GitHub
2. Created Web Service on Render
3. Connected GitHub repository
4. Set:

   * Build Command: `npm install`
   * Start Command: `npm start`
5. Added Environment Variables
6. Deployed successfully

---

## 🧪 Testing

Tested using:

* Postman
* cURL
* Manual validation

### Test Checklist

* ✅ User Registration
* ✅ User Login
* ✅ Create Task
* ✅ Update Task
* ✅ Delete Task
* ✅ Filtering
* ✅ Pagination
* ✅ Sorting
* ✅ Unauthorized Access (401)

---

## 👩‍💻 Author

**Saranya**
GitHub: [https://github.com/SARANYAVENGATESHWARAN](https://github.com/SARANYAVENGATESHWARAN)
Documentation Link:https://docs.google.com/document/d/1KqBxy-0XF68JydHTnZ56u4DCosSiXiU7qaRugV-lHwY/edit?usp=sharing
---

