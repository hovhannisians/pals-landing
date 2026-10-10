Pals runs on Mac, Windows, iPhone and Android, and it's built into [Robi Chat](/docs/robichat). The Mac and Windows apps run your pals right on your computer, with no account to make. Setup takes about a minute.

## What you need

- A Mac with Apple silicon or an Intel chip, or a PC with Windows 10 or 11.
- A Robi API key. Pals think with Robi models, and nothing works without one.
- Optional: a [Composio](https://platform.composio.dev) project key, if you want [triggers](/docs/triggers).

## Install the app

### Mac

1. Download `Pals-<version>-universal.dmg` and drag Pals into Applications.
2. The build isn't notarized yet, so the first time you open it, right-click the app and choose **Open**. After that it opens normally.

> **Building it yourself?** From the Pals source folder run `pnpm install` and then `pnpm desktop:build`. The disk image lands in `dist/`.

### Windows

Download the Pals installer, run it, and open Pals from the Start menu.

### iPhone and Android

Get Pals from the App Store or Google Play and sign in with your Robi account. The phone apps show your pals, their chats and their cards, so you can answer a pal wherever you are.

## First run

The app opens on a short onboarding.

1. **Give your pals a brain.** Paste your Robi API key and choose **Wake them up**. The key is stored encrypted on your Mac.
2. **Connect your apps.** Optionally sign in with Composio to connect your apps. The sign-in opens in your normal browser, and you can do it later in **Settings**.
3. **Make your first pal.** Pick a starter, like Scout for research or Juniper for your inbox, or describe what you want help with. It gets its own cloud computer, powered by E2B. You can change everything later.

Your new pal greets you in a chat. Ask it for something.

## Things worth trying first

- "Every weekday at 8, give me a brief of my inbox and calendar." It creates a [routine](/docs/routines).
- "Log in to my airline account and check my upcoming trips." It opens its [browser](/docs/computer) and asks you to take over for the login.
- "When you want to reply to an email, ask me first." It saves a [rule](/docs/rules).

## Closing the window

Closing the window doesn't stop your pals. They keep working in the background, and routines and triggers keep firing, until you quit the app (**⌘Q** on a Mac).

Routines and triggers only run while the app is open. If your computer is asleep when a routine is due, that run is skipped.

## Where your data is

On a Mac, everything stays in `~/Library/Application Support/Pals`: chats, the password vault, browser profiles and workspaces. See [Your data](/docs/privacy) for details.
