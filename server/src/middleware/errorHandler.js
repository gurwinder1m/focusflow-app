import { ZodError } from 'zod';
import { env } from '../config/env.js';

export function notFound(req, _res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

export function errorHandler(error, _req, res, _next) {
  if (error instanceof ZodError) {
    return res.status(422).json({
      message: 'Validation failed.',
      errors: error.flatten()
    });
  }

  const statusCode = error.statusCode || 500;
  const response = {
    message: statusCode === 500 ? 'Something went wrong.' : error.message
  };

  if (error.details) response.details = error.details;
  if (env.nodeEnv !== 'production') response.stack = error.stack;

  return res.status(statusCode).json(response);
}
