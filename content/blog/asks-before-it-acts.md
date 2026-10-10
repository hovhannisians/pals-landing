---
title: Why your pal asks before it acts
description: How Pals decides what a pal may do on its own, and why the strictest rule always wins.
date: 2026-10-03
tag: Product
---

An agent that can send email, post in Slack and click Buy is only useful if you trust it. So every pal works within one simple promise: it reads and looks things up on its own, and it asks before it sends, posts, pays for or changes anything.

## Every action goes through the same check

Inside Pals, everything a pal can do is a tool: opening a page, clicking a button, searching the web, sending an email through Gmail, running a command. Safe tools, like reading a page, just run. Everything else goes through a check before it happens.

That check compares the exact action with your rules. Not "use Gmail", but something like "send an email to dana@example.com titled Dinner on Thursday".

## Rules in plain words

You write rules the way you'd say them: "When it wants to reply to an email, ask first." Each rule has one of three decisions:

| Decision | What happens |
|---|---|
| Allow | The pal goes ahead |
| Ask first | The pal stops and shows you a card |
| Never | The pal isn't allowed to, even if you'd approve |

A small, fast model reads the pending action and your rules, and says which rules apply. If none do, the pal falls back to a sensible default: sending, posting, paying and signing in ask first, and reading is allowed.

## The strictest rule wins

Rules overlap. "Reply to emails from my team" might be Allow while "reply to an email" is Ask first. When several rules apply, Pals picks the strictest: Never beats Ask first, which beats Allow.

And if the checker can't be reached at all, the pal asks you for anything that isn't plainly safe. Failing closed is the whole point.

## One tap to loosen up

Starting strict doesn't mean being nagged forever. Every approval card has **Always allow**, which approves the action and saves an Allow rule for that kind of thing. Over a week or two, your pal learns exactly where your lines are.

Read more in [Rules](/docs/rules).
