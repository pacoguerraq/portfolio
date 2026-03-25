# AGENTS.md

## Project Identity

This repository is a professional personal portfolio site and business-facing platform.

- Public-facing content (`/`) is shared on LinkedIn, CV, GitHub, and social profiles.
- The site also includes private admin/client workflows for lead and project management.
- Treat copy, SEO metadata, and public UX as high-impact and brand-sensitive.

## Required Runtime

- Node.js: `22` (use `nvm use 22`)
- Package manager: `npm`
- Framework: Next.js App Router (`next@15`)
- Language: TypeScript
- ORM: Prisma with PostgreSQL

## Core Commands

- Install deps: `npm install`
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build` (runs `prisma generate` first)
- Start production build: `npm run start`

## Deployment / Infrastructure

- Hosting: Vercel
- Database: Neon PostgreSQL (via `DATABASE_URL`)
- Object storage: Vercel Blob (`@vercel/blob`)

Assume production behavior and environment parity with Vercel when making backend changes.

## Environment Variables (Observed)

- `DATABASE_URL` - Prisma PostgreSQL connection string (Neon).
- `ADMIN_PASSWORD` - password used in admin login route.
- `ENCRYPTION_KEY` - used by password utility functions.
- `NEXT_PUBLIC_HOST` - canonical host used by metadata, robots, sitemap, resources.
- `BLOB_READ_WRITE_TOKEN` - required by Vercel Blob writes in API routes.

If a change requires new env vars, document them clearly and keep naming consistent.

## High-Level Architecture

- `app/page.tsx`: main public landing page.
- `components/*`: public portfolio sections (about, services, work, contact, navbar, footer).
- `app/admin/*`: authenticated admin dashboard pages.
- `app/client-portal/[projectId]/page.tsx`: client-facing project portal.
- `app/api/admin/*`: admin API endpoints (leads, clients, projects, uploads, auth).
- `app/api/client-portal/[projectId]/route.ts`: client portal data endpoint.
- `prisma/schema.prisma`: data model and enums.
- `middleware.ts`: route protection for `/admin/*` via cookie check.

## Prisma Domain Model (Current)

Primary one-to-one lifecycle:

1. `Lead`
2. `Client` (references a Lead, unique `leadId`)
3. `Project` (references a Client, unique `clientId`)
4. `BrandAsset` (references a Project, unique `projectId`)

Important enums include:

- `LeadStatus`, `LeadSource`
- `ProjectType`, `ProjectStatus`
- `PlanType`

When changing schema, preserve relation integrity and cascading behavior unless explicitly requested.

## Authentication and Access Notes

- Admin access is cookie-based (`admin-authenticated`) and guarded in `middleware.ts`.
- Login checks `ADMIN_PASSWORD` in `app/api/admin/login/route.ts`.
- Keep auth behavior predictable and conservative; do not loosen admin route protection.

## File Upload Behavior

- Admin upload route uses Vercel Blob.
- Allowed MIME types include PDF, Word, PowerPoint, JPG/JPEG, PNG.
- Max file size is 10MB.
- Uploaded paths currently use `proposals/<timestamp>_<filename>`.

Preserve validation and security checks when modifying upload flows.

## Agent Working Rules

1. Do not break the public landing page, branding, or SEO metadata.
2. Prefer minimal, targeted changes over broad refactors.
3. Preserve existing route structure unless task explicitly requires changes.
4. Keep TypeScript types explicit on API boundaries and Prisma operations.
5. Validate changes with `npm run lint` and, when relevant, `npm run build`.
6. For data-model edits, run `prisma generate` and include any required migration/db-push instructions.
7. Never commit secrets or hardcode credentials/tokens.

## Change Checklist for Agents

Before finishing, verify:

- Public page still renders correctly (`/`).
- Admin auth flow still works (`/login` -> `/admin/*`).
- Affected API routes return expected status codes and JSON shape.
- Prisma client usage compiles without type errors.
- `robots`/`sitemap`/metadata logic still uses the correct host assumptions.

## Notes for Future Agents

- This is both a portfolio and an operational internal tool; optimize for reliability and professionalism.
- If unsure about product intent, preserve current behavior and ask for clarification before altering UX or data flows.
