# Task Management Application

## Overview
This is a **Task Management Application** where users can add, edit, delete, and reorder tasks using a drag-and-drop interface. The app categorizes tasks into three sections: **To-Do, In Progress, and Done**, ensuring instant synchronization with the database.

## Live Demo
[https://task-management-applicat-6e6b6.web.app/](#)

## Features
- **Authentication**
  - Firebase Authentication (Google sign-in)
  - User details stored in MongoDB (User ID, email, display name)
- **Task Management System**
  - Add, edit, delete, and reorder tasks
  - Drag and drop tasks between categories
  - Tasks saved instantly in the database
  - Each task includes: 
    - Title (max 50 characters, required)
    - Description (max 200 characters, optional)
    - Timestamp (auto-generated)
    - Category (To-Do, In Progress, Done)
- **Database & Persistence**
  - MongoDB for task storage
  - Real-time updates with one of the following approaches:
    - MongoDB Change Streams
    - WebSockets
    - Optimistic UI Updates
    - Polling (fallback method)
- **Frontend UI**
  - Built with Vite.js + React
  - Uses a drag-and-drop library (e.g., react-beautiful-dnd)
  - Modern, clean, and responsive UI (maximum of four colors used)
- **Responsiveness**
  - Works smoothly on desktop and mobile devices
  - Mobile-friendly drag-and-drop experience
- **Backend**
  - Express.js API with MongoDB integration
  - API Endpoints:
    - `POST /tasks` - Add a new task
    - `GET /tasks` - Retrieve all tasks for the logged-in user
    - `PUT /tasks/:id` - Update task details (title, description, category)
    - `DELETE /tasks/:id` - Delete a task
- **Bonus Features (Optional but Recommended)**
  - Dark mode toggle
  - Task due dates with color indicators (e.g., overdue tasks in red)
  - Simple activity log to track changes (e.g., "Task moved to Done")

## Technologies Used
- **Frontend:** React.js, Vite.js, Firebase Authentication, react-beautiful-dnd
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Real-Time Sync Options:** WebSockets / Change Streams / Optimistic UI
- **Styling:** Tailwind CSS

## Installation Guide
1. **Clone the Repository**
   ```bash
   git clone https://github.com/imtiazahmadtanvir/Task-Management-Web
   cd task-manager
