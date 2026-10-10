A trigger wakes a pal when something happens in one of your apps, and the pal does what you told it to for that trigger. For example: "When I get an email from my bank, file the statement in Drive and tell me about any charge over $100."

## Turning triggers on

- **On hosted Pals,** triggers just work. Each account gets its own Composio user.
- **On the desktop app,** triggers need a Composio project key. Create a project at [platform.composio.dev](https://platform.composio.dev), copy its API key, and paste it in **Settings**.

## Adding a trigger

1. Open the pal's **Setup** tab and find **Triggers**.
2. Pick the app, then the event, like **New Gmail message** or **New GitHub issue**.
3. Connect the app if asked. On the desktop app, you connect apps for triggers again here, because triggers run in your own Composio project, not through your Composio sign-in from **Settings**.
4. Fill in any options for the event, like which sender or which repository.
5. Write what the pal should do each time it fires.

## Examples

| Event | What to tell the pal |
|---|---|
| New Gmail message from your bank | File the statement in Drive and flag anything unusual |
| New GitHub issue on your repo | Label it, and draft a first reply if it's a question |
| New Calendar event | Look up the people I'm meeting and send me a short brief the night before |
| New Slack message in #support | Summarize it and tell me if a customer is upset |

## Good to know

- Most triggers fire within seconds. Ones with an interval setting, like Gmail's, can take up to that many minutes.
- On the desktop app, triggers only run while the app is open. Events that arrive while your Mac is asleep are missed.
- A paused pal ignores its triggers.
- If a trigger stops working, its last error shows in **Setup**.
- On the hosted free plan, each time a trigger fires it uses one of your daily messages.
