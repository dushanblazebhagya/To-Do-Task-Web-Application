# To-Do Task Web Application

A full-stack To-Do Task web application built with React, Node.js/Express, and PostgreSQL, fully containerized using Docker. Users can create tasks, view the latest 5 uncompleted tasks, and mark tasks as done.

---

## Table of Contents
1. Project Overview
2. Prerequisites
3. Docker Setup
4. Running the Application
5. Testing
6. API Endpoints
7. Project Structure

---

## Project Overview
- Backend: Node.js + Express + Sequelize (PostgreSQL ORM)  
- Frontend: React (Vite)  
- Database: PostgreSQL  
- Containerized with Docker & Docker Compose  

Features:  
- Create a task with title and description  
- View latest 5 uncompleted tasks  
- Mark tasks as done  
- Fully dockerized and ready for deployment

---

## Prerequisites
- Docker installed  
- Docker Compose installed  

---

## Docker Setup
Build the images:
docker-compose build

Run the containers:
docker-compose up

This will start three containers:  
1. Database: PostgreSQL  
2. Backend: Node.js + Express API  
3. Frontend: React UI served via Nginx  

The app should now be accessible at http://localhost:3000

---

## Testing
Backend:
npm test

Frontend (if implemented):
npm run test

---

## API Endpoints

### Create a Task
POST /tasks
Request Body: 
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread"
}
Response:
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "createdAt": "2025-10-03T09:00:00.000Z",
  "updatedAt": "2025-10-03T09:00:00.000Z"
}

### Get Latest 5 Uncompleted Tasks
GET /tasks
Response:
[
  {
    "id": 6,
    "title": "Task 6",
    "description": "Some description",
    "completed": false
  },
  ...
]

### Mark Task as Done
PUT /tasks/:id/done
Response:
{
  "id": 6,
  "title": "Task 6",
  "description": "Some description",
  "completed": true
}

---

## Notes
- All services run via Docker; no local setup needed.  
- Database connection uses Docker service hostname (`db`) inside docker-compose.yml.  
- Only the 5 most recent uncompleted tasks are displayed in the UI.
