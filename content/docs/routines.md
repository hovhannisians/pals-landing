A routine is an instruction a pal runs on a schedule, on its own. Each run posts its result in the pal's chat and sends you a notification.

## Making a routine

The easiest way is to ask: "Every weekday at 8, give me a brief of my inbox and calendar." The pal creates the routine for you.

You can also add one in the pal's **Setup** tab, under **Routines**:

1. Write what to do each time, as if you were asking in the chat.
2. Pick a schedule: **Every morning**, **Weekdays 9am**, **Every hour**, **Mondays**, or your own.
3. Choose **Add routine**.

## Schedules

Schedules use cron expressions. The presets cover most needs, and you can type your own:

| Schedule | Cron |
|---|---|
| Every morning at 8 | `0 8 * * *` |
| Weekdays at 9 | `0 9 * * 1-5` |
| Every hour | `0 * * * *` |
| Mondays at 9 | `0 9 * * 1` |
| Every 15 minutes | `*/15 * * * *` |
| First day of the month at 10 | `0 10 1 * *` |

## Good routines

- "Brief me on my inbox and calendar. Only mention emails that need a reply from me."
- "Check the price of the Lisbon flights I'm watching and tell me only if it drops below €200."
- "Every Friday, summarize what got merged on my repo this week."
- "Each morning, read the news on the three companies in my notes and send me anything important."

A routine runs with the same rules as everything else, so it still asks before sending, posting or paying.

## Good to know

- On the desktop app, routines only run while the app is open. A routine that comes due while your Mac is asleep is skipped.
- A paused pal doesn't run its routines.
- On the hosted free plan, each run uses one of your daily messages.
- In **Setup** you can run a routine right away, pause and resume it, or delete it. Each routine shows when it runs next.
