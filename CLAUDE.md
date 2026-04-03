# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Identity

Professional personal portfolio site and internal business platform. Public content (`/`) is brand-sensitive and shared on LinkedIn, CV, and social profiles. The same codebase also powers private admin/client workflows for lead and project management.

## Commands

```bash
npm run dev        # Dev server with Turbopack
npm run build      # prisma generate + next build
npm run lint       # ESLint
npm run start      # Production server
```

No test framework is configured. Validate changes with `npm run lint` and `npm run build`.

**Runtime**: Node.js 22 (`nvm use 22`), package manager: `npm`.

## Architecture Overview

This is a Next.js 15 App Router project with TypeScript, Prisma (PostgreSQL), and Tailwind CSS.

### Route Structure

| Path | Purpose |
|------|---------|
| `app/page.tsx` | Public landing page |
| `app/login/page.tsx` | Admin login |
| `app/admin/*` | Protected admin dashboard pages |
| `app/client-portal/[projectId]/` | Client-facing project portal |
| `app/api/admin/*` | Admin API endpoints |
| `app/api/client-portal/[projectId]/` | Client portal data API |

**Middleware** (`middleware.ts`): Protects all `/admin/*` routes via `admin-authenticated` cookie check.

### Admin API Endpoints

- `POST /api/admin/login` — verifies `ADMIN_PASSWORD`, sets cookie
- `POST /api/admin/upload` — Vercel Blob upload (PDF, Word, PPT, JPG, PNG; max 10MB; path: `proposals/<timestamp>_<filename>`)
- `/api/admin/leads/[id]/convert` — promotes Lead → Client + Project
- CRUD endpoints for leads, clients, projects, brand-assets

### Prisma Domain Model

One-to-one lifecycle chain:

```
Lead → Client (leadId) → Project (clientId) → BrandAsset (projectId)
```

Key enums: `LeadStatus`, `LeadSource`, `ProjectType`, `ProjectStatus`, `PlanType`.

After schema changes: run `prisma generate` and include migration/db-push instructions.

### Internationalization

Client-side i18n via React Context (not Next.js built-in i18n). Locale files at `locales/en/common.json` and `locales/es/common.json`. Language preference persists to `localStorage`.

- **Provider**: `providers/LanguageProvider.tsx` — wraps the app in `app/layout.tsx`
- **Hook**: `hooks/useTranslation.ts` — returns `t('namespace.key')` with dot-notation support

### Styling

Tailwind CSS with class-based dark mode. Custom fonts: `outfit` (sans) and `ovo` (serif). Custom theme colors: `darkTheme`, `lightHover`, `darkHover`. Animation via `tailwindcss-animate` and `motion`.

## Infrastructure

- **Hosting**: Vercel
- **Database**: Neon PostgreSQL (`DATABASE_URL`)
- **Storage**: Vercel Blob (`BLOB_READ_WRITE_TOKEN`)

**Required env vars**: `DATABASE_URL`, `ADMIN_PASSWORD`, `ENCRYPTION_KEY`, `NEXT_PUBLIC_HOST`, `BLOB_READ_WRITE_TOKEN`.

## Working Rules

1. Do not break the public landing page, branding, or SEO metadata.
2. Prefer minimal, targeted changes over broad refactors.
3. Preserve existing route structure unless explicitly required to change it.
4. Keep TypeScript types explicit on API boundaries and Prisma operations.
5. Preserve admin auth behavior — do not loosen route protection.
6. Preserve upload validation and security checks.

## Before Finishing Any Change

- Public page (`/`) renders correctly.
- Admin auth flow works (`/login` → `/admin/*`).
- Affected API routes return expected status codes and JSON shape.
- Prisma client compiles without type errors.
- `robots`/`sitemap`/metadata still uses correct host from `NEXT_PUBLIC_HOST`.
