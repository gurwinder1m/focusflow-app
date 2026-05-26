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
app.use(helmet({ crossOriginEmbedderPolicy: false }));
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true
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

app.use('/api/auth', authRouter);
app.use('/api/habits', habitRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/goals', goalRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/achievements', achievementRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/settings', settingsRouter);

if (env.nodeEnv === 'production') {
  const clientDist = path.resolve(__dirname, '../../client/dist');
  app.use(express.static(clientDist));
  app.get('*', (_req, res) => res.sendFile(path.join(clientDist, 'index.html')));
}

app.use(notFound);
app.use(errorHandler);
