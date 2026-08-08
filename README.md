# Labbani Branches Dashboard

A production-style implementation of the Frontend Technical Challenge using Next.js 16, React 19, TypeScript, Tailwind CSS, TanStack Table, TanStack Query, Axios, NextAuth v5, React Hook Form, Zod, Radix/shadcn-style dialogs, and Google Maps-ready location fields.

## Run locally

```bash
cp .env.example .env.local
npm install --legacy-peer-deps
npm run dev
```

Open `http://localhost:3000`. Demo credentials are pre-filled on the login page.

## Implemented

- NextAuth v5 credentials flow with JWT-based token storage hooks
- Responsive branches dashboard with table and card views
- Search, active/inactive filter, reset, reload, column sorting
- Pagination with 5/10/15/20 rows per page
- Reusable create/update form with React Hook Form + Zod
- Delete confirmation dialog
- Success/error toasts and automatic TanStack Query invalidation
- Axios API layer and functional local CRUD API
- Loading, empty, and error states
- Latitude/longitude selection UI ready for a Google Maps API key

## API integration notes

The challenge PDF refers to API screenshots, but those screenshots were not embedded in the supplied file. For immediate testing, `/api/branches` provides an in-memory CRUD API. When the real endpoint contract is available:

1. Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local`.
2. Adjust paths/payload mapping only in `lib/api.ts`.
3. Replace the demo `authorize` body and token-refresh placeholder in `auth.ts` with the real authentication and refresh calls.
4. Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` to enable the production map picker.

## Validation

`npm run build` completes successfully with strict TypeScript checks.
