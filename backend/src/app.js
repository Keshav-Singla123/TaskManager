const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');
const { errorHandler } = require('./middleware/error.middleware');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many requests, try again later' }
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Friendly root route so visiting the backend URL shows useful info
app.get('/', (req, res) => {
  const frontend = process.env.FRONTEND_URL || 'https://task-manager-avgvmgxln-keshavs-projects-04a8f695.vercel.app/';
  res.send(`
    <html>
      <head><title>TaskFlow API</title></head>
      <body style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial;margin:2rem;color:#111;">
        <h1>TaskFlow API</h1>
        <p>This is the TaskFlow backend. Visit the frontend: <a href="${frontend}" target="_blank">${frontend}</a></p>
        <p>API endpoints:</p>
        <ul>
          <li>GET <code>/api/auth/me</code> - current user</li>
          <li>POST <code>/api/auth/login</code> - login</li>
          <li>POST <code>/api/auth/register</code> - register</li>
          <li>GET <code>/api/tasks</code> - list tasks (auth required)</li>
        </ul>
      </body>
    </html>
  `);
});

app.use(errorHandler);

module.exports = app;
