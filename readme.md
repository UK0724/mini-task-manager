# Mini Task Manager

A full-stack task management application built with React (Vite + TypeScript) for the frontend and Node.js/Express with MySQL for the backend.

## Demo

[![Demo Video](https://img.youtube.com/vi/_g5t3iRl8x4/0.jpg)](https://youtu.be/_g5t3iRl8x4)

## Features

- User authentication (signup/login)
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite as build tool
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests
- React Icons for UI icons

### Backend
- Node.js with Express.js
- MySQL for database
- JWT for authentication
- Bcrypt for password hashing
- CORS for cross-origin requests
- Dotenv for environment variables

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MySQL server running locally or accessible remotely

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=localhost
   MYSQL_DATABASE=task_manager
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following variable:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
mini-task-manager/
├── backend/
│   ├── controllers/    # Route controllers
│   ├── middlewares/    # Custom middleware
│   ├── services/       # business logic
│   ├── routes/         # API routes
│   ├── utils/          # utilities
│   ├── .env            # Environment variables
│   ├── package.json    # Backend dependencies
│   └── server.js       # Entry point
└── frontend/
    ├── public/         # Static files
    ├── src/
    │   ├── components/ # Reusable components
    │   ├── pages/      # Page components
    │   ├── hooks/      # Custom React hooks
    │   ├── services/   # API services
    │   ├── App.tsx     # Main App component
    │   └── main.tsx    # Entry point
    ├── .env            # Frontend environment variables
    ├── package.json    # Frontend dependencies
    └── vite.config.ts  # Vite configuration
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Tasks
- `GET /api/tasks` - Get all tasks for the authenticated user
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a single task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
