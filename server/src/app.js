import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from './config/env.js';
import { achievementRouter } from './routes/achievement.routes.js';
import { analyticsRouter } from './routes/analytics.routes.js';
import { authRouter } from './routes/auth.routes.js';
import { goalRouter } from './routes/goal.routes.js';
import { habitRouter } from './routes/habit.routes.js';
import { notificationRouter } from './routes/notification.routes.js';
import { settingsRouter } from './routes/settings.routes.js';
import { taskRouter } from './routes/task.routes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

app.set('trust proxy', 1);

// Helmet production configuration to allow Cross-Origin Requests
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);

// SURE-SHOT CORS FIX: Explicitly allow your Vercel domains
const allowedOrigins = [
  'http://localhost:5173',
  'https://focusflow-app-client-6yzvgzfgu-gurwinder1ms-projects.vercel.app',
  'https://focusflow-app-client.vercel.app' // 👈 Agar tera koi permanent domain hai toh wo bhi yahan daal de
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || env.nodeEnv !== 'production') {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
  })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 500,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'focusflow-api', timestamp: new Date().toISOString() });
});

// ... baaki saare upar ke routes same rahenge

app.use('/api/auth', authRouter);
app.use('/api/habits', habitRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/goals', goalRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/achievements', achievementRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/settings', settingsRouter);

// 🔥 SURE-SHOT FIX: Purana static files wala if-block yahan se hata diya hai!

app.use(notFound);
app.use(errorHandler);