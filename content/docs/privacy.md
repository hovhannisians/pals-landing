This page explains what Pals keeps, where it keeps it, and who can see it.

## On your Mac

The desktop app keeps everything on your Mac, in `~/Library/Application Support/Pals`:

- your pals, chats, rules, routines, memories and skills, in a local database;
- the password vault, encrypted with a key in your macOS Keychain;
- each pal's browser profile, with the logins you've given it;
- files you've attached and files pals have sent you.

Your API keys are stored encrypted on your Mac too.

Some things do leave your Mac, because that's how pals work:

- **Robi** receives what the model needs to think: your messages, the pal's instructions, rules and memories, and what it reads while working. Saved passwords are never sent.
- **E2B** runs every pal's cloud computer, so their workspaces and browsers live there.
- **Composio**, if you connected apps, handles the sign-in to your apps and the calls pals make to them.

## On hosted Pals

Everything belongs to your account and is stored on Robi's servers in Postgres. Every query is scoped to your account, so nobody else can see your pals, chats or live updates. Saved passwords and tokens are encrypted with a key only the service holds.

## Passwords

Saved passwords are typed straight into the page by Pals itself. They never go to the model and never appear in a chat. Nobody can read a password back out of Pals, including you.

## Deleting things

- Deleting a chat deletes its messages and stops any work on it.
- Deleting a pal removes its chats, memory, routines, triggers and computer.
- Deleting a file removes its contents. Messages keep the file's name, but it can no longer be opened.
- To remove everything from the desktop app, quit it and delete `~/Library/Application Support/Pals`.
