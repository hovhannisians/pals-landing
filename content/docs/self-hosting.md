Pals is one codebase that runs as the desktop app, as a development server, or as a multi-user hosted service. This page is for people running it from source.

## Run it from source

You'll need Node 22 or newer, pnpm and Google Chrome. Playwright's Chromium works if Chrome isn't installed.

```bash
cp .env.example .env.local   # add ROBI_API_KEY, or paste it in Settings later
pnpm install
npx playwright install chromium
pnpm dev                     # http://localhost:3100
```

To open the desktop window on top of the development server, run `pnpm desktop:dev` in a second terminal.

In development everything is stored in `.data/` in the project folder, including an embedded Postgres in `.data/postgres`.

## Build the Mac app

```bash
pnpm install
pnpm desktop:build           # makes dist/Pals-<version>-universal.dmg
```

## Run it as a hosted service

Set `PALS_MODE=saas` and the same app becomes a multi-user service where people sign in with their Robi account.

```bash
cp .env.saas.example .env.saas   # fill it in
docker compose up --build        # the app on :3000, plus Postgres
```

Or build the image yourself with `docker build -t pals .` and run it anywhere that keeps a Node process running, with a Postgres connection string and a volume on `/data` for uploaded files.

- It needs a long-running server, not serverless functions. Agent runs, live updates, routines and trigger listeners live in the process.
- Run one instance for now. Several instances would each fire routines and triggers.
- Database migrations in `drizzle/` run automatically on start.
- The Robi sign-in needs an application on `auth.robiai.com` with the callback URL `<PALS_PUBLIC_URL>/api/auth/callback`.

> **Don't expose the desktop mode.** A local-mode server has no login screen. Never put one on the public internet; use `PALS_MODE=saas` for that.

## Environment variables

| Variable | Default | What it does |
|---|---|---|
| `ROBI_API_KEY` | none | Your Robi key, unless you paste it in Settings |
| `ROBI_BASE_URL` | Robi's API | Robi's OpenAI-compatible Chat Completions endpoint |
| `PALS_MODE` | `local` | `saas` for the hosted, multi-user app |
| `DATABASE_URL` | embedded Postgres | Postgres connection string. Required when hosted |
| `PALS_SECRET_KEY` | macOS Keychain | Encrypts saved secrets when hosted. 32+ characters, and never change it |
| `ROBI_OIDC_ISSUER` | `https://auth.robiai.com/` | Robi sign-in, when hosted |
| `ROBI_OIDC_CLIENT_ID`, `ROBI_OIDC_CLIENT_SECRET` | none | The Pals application on Robi's sign-in service, when hosted |
| `COMPOSIO_API_KEY` | none | A Composio project key for triggers, unless you paste it in Settings |
| `PALS_MODEL` | `lime` | The main model for pals |
| `PALS_REVIEW_MODEL` | `lime` | Checks actions against rules and names chats |
| `E2B_API_KEY` | none | Cloud computers, unless you paste the key in Settings |
| `PALS_COMPUTER` | picked automatically | Force `cloud`, `docker` or `local` |
| `PALS_BOX_IMAGE` | `node:22-bookworm` | The container image when pals run in Docker |
| `PALS_PUBLIC_URL` | `http://localhost:3100` | Where the app is served. Used for the Composio sign-in redirect |
| `PALS_DATA_DIR` | `.data/` | Where chats, the vault, browser profiles and workspaces are kept |
| `PALS_FREE_MESSAGES_PER_DAY` | `50` | The free plan's daily messages, when hosted |

## How it's put together

```text
electron/main.mjs      the Mac app: starts the server, opens the window
src/server/
  agent/runtime.ts     the agent loop, approval cards, pause and stop
  agent/tools.ts       the pal's tools and how risky each one is
  agent/review.ts      checks an action against your rules
  agent/prompt.ts      the system prompt, rebuilt every turn
  computer/            one interface over E2B, Docker and local folders
  computer/browser.ts  each pal's Chrome profile and the live view
  composio.ts          Composio sign-in and app connections
  triggers.ts          Composio triggers and their live event stream
  vault.ts             the encrypted password store
  scheduler.ts         routines
  schema.ts            the tables; drizzle/ holds the migrations
```

When you change `src/server/schema.ts`, run `pnpm db:generate` to add a migration.
