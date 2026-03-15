# MSMEGrowth AI Architecture

## Modules
- Authentication Service: Google OAuth (NextAuth) + JWT backend sessions.
- User Dashboard: Funding score, schemes, reports, roadmap.
- Business Profile Engine: Form capture and persistence.
- AI Company Research Engine: OpenAI JSON analysis.
- Funding Readiness Engine: Rule-based weighted scoring (0-100).
- Scheme Intelligence Engine: Prisma scheme matching by industry + turnover.
- Funding Report Generator: Structured report persisted in reports table.
- Subscription & Payment Engine: Plan selection + Razorpay scaffold.
- Admin Panel: Analytics overview + scheme CRUD endpoints.

## Flow
1. Login via Google OAuth.
2. Redirect to pricing plan selection.
3. Submit business profile.
4. Run AI company research and funding engine.
5. Generate report and present on dashboard.

## Security
- JWT authentication middleware.
- Request validation with Zod.
- Rate limiting with express-rate-limit.
- Secure upload filters (mime + size limit).
- Helmet + CORS hardening.
