# Traverse Ethiopia deployment notes

## Deployment topology

- Vercel serves the static website.
- Render runs `server.js` and exposes the `/api/*` endpoints.
- Supabase stores inquiries and managed content.

## Required Render environment variables

Set these in the Render service dashboard (do not commit secrets):

- `SUPABASE_URL=https://xyiatlqiwtxadrmvvyzn.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY=<the Supabase service-role key>`
- `FRONTEND_ORIGIN=https://traverseethiopia.vercel.app`
- `ADMIN_USERNAME=<strong admin username>`
- `ADMIN_PASSWORD=<strong admin password>`

The service-role key must only exist on Render. Never put it in HTML, browser JavaScript, Vercel environment variables exposed to the client, or Git.

## Database setup

In the Supabase SQL Editor, run these files in order:

1. `supabase/schema.sql`
2. `supabase/seed-settings.sql`
3. `supabase/seed-content.sql`

## Verification

- Render health: `https://traverseethiopia.onrender.com/api/health`
- Vercel health proxy: `https://traverseethiopia.vercel.app/api/health`
- Website: `https://traverseethiopia.vercel.app/`

The Vercel rewrite is important because the static Vercel deployment does not execute `server.js`; it forwards browser API requests to Render instead.
