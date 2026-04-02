# TASKS — Precision Todo

A full-stack todo application with an industrial precision aesthetic.

**Stack**: React + React Router + HeroUI · Fastify · PostgreSQL

## Project Structure

```
todo-app/
├── client/   # React + Vite + HeroUI + Tailwind CSS
└── server/   # Fastify + pg (PostgreSQL driver)
```

## Prerequisites

- Node.js 18+
- PostgreSQL running locally (or a connection string)

## Setup

### 1. Create the database

```sql
createdb todos
```

### 2. Configure the server

```bash
cp server/.env.example server/.env
# Edit server/.env with your DATABASE_URL
```

Default `.env`:
```
DATABASE_URL=postgres://postgres:password@localhost:5432/todos
PORT=3001
CLIENT_ORIGIN=http://localhost:5173
```

### 3. Install dependencies

```bash
npm install          # root (concurrently)
npm install --prefix client
npm install --prefix server
```

### 4. Run in development

```bash
npm run dev          # starts both client (5173) and server (3001)
```

Or separately:
```bash
npm run dev:server   # Fastify on :3001
npm run dev:client   # Vite on :5173
```

The server runs `migrate()` on startup — it creates the `todos` table automatically.

## API

| Method | Path             | Description        |
|--------|------------------|--------------------|
| GET    | /api/todos       | List all todos     |
| GET    | /api/todos/:id   | Get a single todo  |
| POST   | /api/todos       | Create a todo      |
| PATCH  | /api/todos/:id   | Update a todo      |
| DELETE | /api/todos/:id   | Delete a todo      |

### Todo shape

```json
{
  "id": 1,
  "title": "Ship it",
  "description": "Optional notes",
  "priority": "high",
  "completed": false,
  "created_at": "2026-04-02T00:00:00Z",
  "updated_at": "2026-04-02T00:00:00Z"
}
```

## Routes

| Path          | Description                    |
|---------------|--------------------------------|
| `/todos`      | Main list with filters         |
| `/todos/:id`  | Edit / detail view             |
