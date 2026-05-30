# TaskFlow — Task Manager App

A full-stack task management application built with the MERN stack.

## 🔗 Repository

- **GitHub:** this repository contains the source code for the project
- **Deployment:** not deployed yet

## ✨ Features

- Secure JWT authentication via httpOnly cookies
- Kanban board — Todo, In Progress, Done
- Create, edit, delete tasks with priority & due dates
- Responsive design (desktop, tablet, mobile)
- Skeleton loaders, toast notifications, confirm dialogs
- Dark theme with smooth animations

## 🛠 Tech Stack

| Layer    | Tech                           |
| -------- | ------------------------------ |
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend  | Node.js + Express              |
| Database | MongoDB Atlas + Mongoose       |
| Auth     | JWT in httpOnly cookies        |
| Hosting  | Not deployed yet               |

## ⚙️ Running Locally

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (free)

### Backend

```
cd backend
cp .env.example .env
# Fill in MONGODB_URI, JWT_SECRET, FRONTEND_URL
npm install
npm run dev
# Runs on http://localhost:3001
```

### Frontend

```
cd frontend
cp .env.example .env
# Set VITE_API_URL=http://localhost:3001
npm install
npm run dev
# Runs on http://localhost:5173
```

## 📐 Assumptions & Technical Decisions

### Why httpOnly cookies instead of localStorage?

localStorage is accessible by JavaScript and vulnerable to XSS attacks.
httpOnly cookies cannot be read by JavaScript at all, making token theft
significantly harder. This is the recommended production approach.

### Why MongoDB + Mongoose over SQL?

Task data is simple and document-shaped. Mongoose schemas still enforce
structure and validation while keeping setup quick for an assignment scope.
In a production system with complex relational data, PostgreSQL would be
the better choice.

### Why React Context instead of Redux?

For an app this size, Context + useState/useReducer gives all needed
state management without the boilerplate of Redux. Redux would be
appropriate at a larger scale.

### Why Vite instead of Create React App?

Vite starts in milliseconds vs 30+ seconds for CRA, has better HMR,
and is the current industry standard for new React projects.

### Tradeoffs

- No drag-and-drop (would use @dnd-kit/core in a real product)
- No task search/filter (would add with a debounced search input)
- No pagination (acceptable at this data scale; would add at 100+ tasks)
- Single JWT token, no refresh token rotation (would add in production)
