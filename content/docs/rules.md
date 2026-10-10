Rules decide what a pal may do without asking you. You write them in plain language, and each one has one of three decisions.

| Decision | What happens |
|---|---|
| Allow | The pal goes ahead without asking |
| Ask first | The pal stops and shows you an approval card |
| Never | The pal isn't allowed to do it, even if you'd approve |

## Writing a rule

Each rule reads as "When it wants to *something*, it should *allow, ask first or never*". For example:

| When it wants to… | Decision |
|---|---|
| reply to an email | Ask first |
| reply to emails from my team | Allow |
| search the web | Allow |
| post anything in Slack | Ask first |
| pay for anything | Never |
| delete files in my Google Drive | Never |

You can also just tell a pal in the chat: "Don't ever post on my LinkedIn." Choosing **Always allow** on an approval card saves an Allow rule for that kind of action too.

## Where rules live

- **Rules for one pal** are in that pal's **Setup** tab, under **Approvals**.
- **Rules for all pals** are in **Settings**. They apply to every pal, on top of each pal's own rules.

## How a rule is checked

Every action a pal can take, web search included, goes through the same check. Safe actions, like reading a page, run straight away. For anything that matters, a small, fast model compares the exact action against your rules, like "send an email to dana@example.com titled Dinner on Thursday" against "reply to an email".

- If no rule applies, the pal uses its default. Sending, posting, paying, signing in with a saved password and clicking things like **Buy** or **Delete** ask first. Reading, searching and browsing are allowed.
- If several rules apply, the strictest wins: **Never** beats **Ask first**, which beats **Allow**.
- If the checker can't be reached, the pal asks you for anything that isn't plainly safe.

## Tips

- Start strict and loosen up. It's easier to choose **Always allow** on a few cards than to undo something a pal sent.
- Be specific about the thing, not the app. "Reply to emails from my team" is clearer than "use Gmail".
- Never rules are for hard limits. A pal won't even ask about those actions.
