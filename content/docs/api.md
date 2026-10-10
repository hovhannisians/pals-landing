Pals has an HTTP API that does everything the Pals app does: pals, chats, cards, files, rules, memories, routines and live updates. Its first user is RobiChat, which uses it to let people talk to their pals from inside RobiChat.

> **Preview.** The API is a draft contract and isn't live yet. If anything changes before launch, integrators are told what and why. Once it's live, the machine-readable version is served at `GET /api/v1/openapi.json`.

## Basics

| | |
|---|---|
| Base URL | `https://pals.robiai.com/api/v1` |
| Format | JSON. File uploads use `multipart/form-data` |
| Timestamps | Milliseconds since the Unix epoch |
| IDs | Opaque prefixed strings like `pal_…` and `conv_…`. Don't parse them |
| Errors | RFC 9457 problem details with a stable `code` |
| Versioning | By path. Breaking changes go to `/api/v2` |

## Authentication

Partners call Pals server to server, as one of their users. The partner's backend exchanges proof of the user for a short-lived Pals access token using OAuth 2.0 Token Exchange (RFC 8693), then sends it as a bearer token.

```http
GET /api/v1/me HTTP/1.1
Host: pals.robiai.com
Authorization: Bearer pals_at_q8Zf…
Pals-Client: robichat/1.0.0
```

Access tokens last 15 minutes and always start with `pals_at_`. Never put a token in a URL, and never log it.

Each token carries scopes:

| Scope | Grants |
|---|---|
| `profile` | The account, usage and plan |
| `pals:read` | Reading pals, chats, channels, rules, memories, skills, routines and triggers |
| `pals:write` | Creating, changing and deleting pals, channels, rules, memories and skills |
| `chat` | Reading and sending messages, answering cards, the live event stream |
| `files` | Uploading and downloading files, reading a pal's workspace |
| `voice` | Starting voice calls |

Saved passwords and settings are never available through partner tokens.

## Sending a message

```http
POST /api/v1/conversations/conv_7Hk2/messages HTTP/1.1
Authorization: Bearer pals_at_q8Zf…
Content-Type: application/json
Idempotency-Key: 0b6f2c1e-3d4a-4f5b-8c9d-1e2f3a4b5c6d

{ "text": "Find me three flights to Lisbon next Friday" }
```

The response is `202 Accepted` with your saved message. The pal's reply arrives on the live event stream.

Every request that starts model work or uses quota needs an `Idempotency-Key`, so retrying is always safe.

## Live events

One Server-Sent Events stream per user carries everything that changes: pals starting and finishing work, replies streaming in, cards appearing, chats renamed.

1. Call `GET /api/v1/bootstrap` for everything needed to draw the app, plus a `cursor`.
2. Open `GET /api/v1/events` with `Last-Event-ID` set to that cursor.
3. Append `message_delta` events as they arrive, then replace them with the final `message`.
4. If the connection drops, reconnect with the last event id you saw. Missed events are replayed.

## Main endpoints

| Area | Endpoints |
|---|---|
| Account | `GET /me`, `GET /me/usage`, `GET /bootstrap`, `GET /models` |
| Pals | `GET` and `POST /pals`, `GET`, `PATCH` and `DELETE /pals/{id}`, `POST /pals/{id}/stop`, `/pause`, `/resume` |
| Chats | `GET` and `POST /pals/{id}/conversations`, `GET /conversations/{id}/messages`, `POST /conversations/{id}/messages` |
| Cards | `GET /pals/{id}/cards`, `POST /messages/{id}/resolve` |
| Channels | `GET` and `POST /channels`, `GET` and `POST /channels/{id}/messages` |
| Files | `POST /pals/{id}/files`, `GET /files/{id}/content`, `POST /files/{id}/link` |
| Rules and memory | `/rules`, `/pals/{id}/memories`, `/pals/{id}/skills` |
| Voice | `GET /voice`, `POST /pals/{id}/voice/sessions` |

## Limits

Requests are rate limited per user: 600 reads and 120 writes a minute, and 30 sends a minute. Plan limits, like the free plan's 50 messages a day, are separate and come back as `429` with `code: "limit_reached"` and an `upgradeUrl`.

To integrate with Pals, contact Robi Labs.
