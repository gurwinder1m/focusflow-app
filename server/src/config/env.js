import dotenv from 'dotenv';

dotenv.config();

const required = ['JWT_SECRET'];

required.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`[config] Missing ${key}. Set it in .env before production deploys.`);
  }
});

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5050),

  clientUrl:
    process.env.CLIENT_URL ||
    'https://focusflow-app-client-avk3a5ko8-gurwinder1ms-projects.vercel.app',

  mongoUri:
    process.env.MONGODB_URI ||
    'mongodb://127.0.0.1:27017/focusflow',

  jwtSecret:
    process.env.JWT_SECRET ||
    'development-only-change-me',

  jwtExpiresIn:
    process.env.JWT_EXPIRES_IN || '7d'
};