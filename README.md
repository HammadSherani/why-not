# why-not

Next.js 16 + TypeScript + Prisma + MongoDB starter, production-grade folder structure.

## Stack

- Next.js (App Router, TypeScript, Tailwind CSS v4)
- Prisma 6 (MongoDB provider)
- Zod for validation

## Getting started

1. Copy `.env.example` to `.env` and set `DATABASE_URL` to your MongoDB connection string
   (Atlas, or a local replica set — Prisma's MongoDB connector requires a replica set).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Push the Prisma schema to your database:
   ```bash
   npm run prisma:push
   ```
4. Run the dev server:
   ```bash
   npm run dev
   ```
5. Visit `http://localhost:3000`, `/api/health`, `/api/users`.

## Scripts

- `npm run dev` — start dev server
- `npm run build` / `npm run start` — production build/run
- `npm run lint` — lint
- `npm run prisma:generate` — regenerate Prisma client
- `npm run prisma:push` — sync schema to MongoDB (no migrations for MongoDB)
- `npm run prisma:studio` — open Prisma Studio

## Folder structure

```
src/
├── app/                     # Routes (App Router)
│   ├── api/
│   │   ├── health/route.ts
│   │   └── users/
│   │       ├── route.ts         # GET, POST
│   │       └── [id]/route.ts    # GET, PATCH, DELETE
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── ui/                  # Reusable presentational components
├── config/
│   ├── env.ts                # Validated environment variables (zod)
│   └── site.ts                # App-wide constants (name, url, ...)
├── constants/                 # Shared constant values
├── hooks/                     # Reusable React hooks
├── lib/
│   ├── prisma.ts              # Prisma client singleton
│   └── utils.ts                # Generic helpers (cn, ...)
├── server/
│   ├── services/               # Business logic / DB access, per domain
│   └── validations/             # Zod schemas for request input, per domain
└── types/                     # Shared TypeScript types
prisma/
└── schema.prisma
```

**Layering convention:** route handlers (`app/api/**/route.ts`) stay thin — they parse
input, call a `server/services/*` function, and shape the response. Validation schemas
live in `server/validations/*` and are reused by both API routes and services.
