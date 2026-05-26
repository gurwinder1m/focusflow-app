import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDatabase() {
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(env.mongoUri, {
      autoIndex: env.nodeEnv !== 'production',
      serverSelectionTimeoutMS: 8000
    });
    console.log(`[database] Connected to ${mongoose.connection.name}`);
  } catch (error) {
    console.error('[database] Connection failed:', error.message);
    process.exit(1);
  }
}
