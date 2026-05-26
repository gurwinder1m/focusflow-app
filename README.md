# FocusFlow

FocusFlow is a production-ready full-stack productivity and life gamification app built with React, Express, MongoDB, JWT auth, Tailwind CSS, and Framer Motion.

## Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- React Router
- Recharts
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Bcrypt password hashing

## Folder Structure

```txt
focusflow/
  client/              React app, routes, reusable UI, dashboard modules
  server/              Express API, Mongo models, controllers, services
  .env.example         Environment variable template
  package.json         Workspace scripts
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
cp server/.env.example server/.env
cp client/.env.example client/.env
```

3. Start MongoDB locally or set `MONGODB_URI` to your Atlas connection string.

4. Start the full app:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173` and the API runs on `http://localhost:5050`.

## Optional Seed

```bash
npm run seed
```

This creates a demo account:

- Email: `demo@focusflow.app`
- Password: `FocusFlow123!`

## Production

```bash
npm run build
npm start
```

The Express server serves the built frontend from `client/dist` when `NODE_ENV=production`.
