# 🚀 TaskFlow

A full-stack MERN task manager for organizing work across Todo, In Progress, and Done with secure cookie-based authentication.

## 🔗 Live Link

- **App:** https://task-manager-avgvmgxln-keshavs-projects-04a8f695.vercel.app/

## ✨ Features

- 🔐 JWT authentication with `httpOnly` cookies instead of `localStorage`
- 🧩 Kanban workflow with three stages: Todo, In Progress, Done
- 📝 Create, edit, and delete tasks with priority and due dates
- 📱 Responsive UI for desktop, tablet, and mobile
- ⏳ Skeleton loaders, toast notifications, and confirm-before-delete dialog
- 🌙 Dark theme with smooth animations

## 🛠 Tech Stack

| Layer    | Tech                           | Reason                                                            |
| -------- | ------------------------------ | ----------------------------------------------------------------- |
| Frontend | React 18 + Vite + Tailwind CSS | Fast UI development with modern tooling and utility-first styling |
| Backend  | Node.js + Express              | Lightweight API layer with clean routing and middleware support   |
| Database | MongoDB Atlas + Mongoose       | Flexible document model with schema validation                    |
| Auth     | JWT in `httpOnly` cookies      | Safer token storage than `localStorage`                           |
| State    | React Context                  | Simple shared state for auth and tasks without Redux overhead     |
| Hosting  | Vercel + Render                | Easy frontend/backend deployment for internship projects          |

## ⚙️ Running Locally

### 1) Clone the repo

```bash
git clone <your-repo-url>
cd TaskManager
```

### 2) Backend setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Create `backend/.env` with:

```env
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
PORT=3001
NODE_ENV=development
```

These values are for local development. For deployment, use the live frontend and backend URLs instead of `localhost`.

### 3) Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Create `frontend/.env` with:

```env
VITE_API_URL=http://localhost:3001
```

This is the local API URL. In production, point `VITE_API_URL` to the deployed backend URL.

## 📁 Project Structure

```text
TaskManager/
├─ backend/
│  ├─ server.js
│  └─ src/
│     ├─ controllers/
│     ├─ middleware/
│     ├─ models/
│     ├─ routes/
│     └─ utils/
└─ frontend/
	└─ src/
		├─ api/
		├─ components/
		├─ context/
		└─ pages/
```

## 🔌 API Endpoints

### Auth Routes

| Method | Endpoint             | Description                                 | Auth Required |
| ------ | -------------------- | ------------------------------------------- | ------------- |
| POST   | `/api/auth/register` | Register a new user and set auth cookie     | No            |
| POST   | `/api/auth/login`    | Log in an existing user and set auth cookie | No            |
| POST   | `/api/auth/logout`   | Clear the auth cookie                       | No            |
| GET    | `/api/auth/me`       | Get the currently authenticated user        | Yes           |

### Task Routes

| Method | Endpoint         | Description                      | Auth Required |
| ------ | ---------------- | -------------------------------- | ------------- |
| GET    | `/api/tasks`     | Get tasks for the logged-in user | Yes           |
| POST   | `/api/tasks`     | Create a new task                | Yes           |
| PUT    | `/api/tasks/:id` | Update an existing task          | Yes           |
| DELETE | `/api/tasks/:id` | Delete a task                    | Yes           |

## 🧠 Assumptions & Technical Decisions

I used `httpOnly` cookies for authentication instead of `localStorage` because cookies are not readable by JavaScript, which reduces token theft risk in XSS scenarios. That makes the auth flow safer for a production-style internship project while still keeping implementation straightforward.

MongoDB + Mongoose fits this app because task data is naturally document-shaped and the schema requirements are simple. Mongoose still gives validation, defaults, and a clean model layer without forcing a relational design that the project does not need.

React Context was a better fit than Redux because the app only needs shared auth and task state. Context keeps the codebase lighter, easier to review, and easier to explain in an assignment setting without adding Redux boilerplate.

Vite was chosen over Create React App because it starts faster, bundles faster, and gives a smoother development experience. For a modern React 18 app, Vite is the more practical default.

Separate `AuthContext` and `TaskContext` keep concerns isolated. Authentication state changes for login/register/logout should not be mixed with task fetching and mutations, so splitting them makes the app easier to maintain and debug.

## ⚖️ Tradeoffs

| Feature | Decision | What I'd do in production |
|---|---|---|
| Drag & drop | Out of scope — moving tasks between stages works via the edit modal | Integrate `@dnd-kit/core` — accessible, supports keyboard navigation, no full board re-render on drop |
| Search & filter | Out of scope — task count is small enough to scan visually | Debounced search input + server-side `$regex` on title/description, plus filter chips for priority and due date |
| Pagination | Out of scope — fetching all tasks is fine at this data scale | Cursor-based pagination using MongoDB's `_id` — more efficient than offset pagination as collection grows |
| Refresh tokens | Out of scope — single 7-day JWT keeps scope manageable | Short-lived access tokens (15 min) + long-lived refresh tokens (7 days) with rotation and revocation table |
| Testing | Manual only for this scope | Jest + React Testing Library for unit tests; Supertest for API routes; Playwright for E2E critical flows |             |

## 🔒 Security Measures

- Passwords are hashed with `bcrypt`
- Auth token is stored in an `httpOnly` cookie
- Rate limiting protects login and register endpoints
- `helmet` adds basic HTTP security headers
- CORS is restricted to the frontend origin
- Task ownership checks prevent users from editing other users' tasks

Built as part of an internship assignment.
