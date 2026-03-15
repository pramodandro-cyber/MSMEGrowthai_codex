# Deployment Guide

## Frontend (Vercel)
1. Import repository and set root to `apps/web`.
2. Set env vars from `apps/web/.env.example`.
3. Deploy with `next build`.

## Backend (Railway or AWS)
1. Deploy `apps/api` as Node.js service.
2. Set env vars from `apps/api/.env.example`.
3. Run migrations:
   ```bash
   npm --workspace apps/api run prisma:migrate
   ```
4. Start command: `npm --workspace apps/api run start`.

## Database (Supabase/PostgreSQL)
1. Provision PostgreSQL.
2. Update `DATABASE_URL`.
3. Seed schemes table with public government programs.

## Production Hardening
- Use managed Redis for distributed rate limit.
- Add WAF + CDN.
- Enable secure cookies and trusted proxy settings.
- Add observability (Sentry + OpenTelemetry + Prometheus).
