// The docs sidebar, in reading order. Each page's Markdown lives in content/docs/<slug>.md ("" is index.md).
export type DocPage = { slug: string; title: string; description: string };

export const NAV: { group: string; pages: DocPage[] }[] = [
  {
    group: "Getting started",
    pages: [
      { slug: "", title: "What are pals?", description: "How Pals works, from your first pal to rules, routines, apps and the API." },
      { slug: "quickstart", title: "Get started", description: "Install Pals on Mac, Windows, iPhone or Android and make your first pal." },
      { slug: "hosted", title: "Hosted Pals", description: "Sign in with your Robi account and run your pals in the cloud." },
      { slug: "robichat", title: "Pals in Robi Chat", description: "Your pals, built into Robi Chat. Same account, nothing to install." },
    ],
  },
  {
    group: "Using pals",
    pages: [
      { slug: "pals", title: "Making a pal", description: "Names, jobs, instructions, looks and what a pal's status means." },
      { slug: "chat", title: "Chats and cards", description: "Talking to a pal, and answering its approvals and questions." },
      { slug: "computer", title: "The computer", description: "Where a pal's computer runs, its browser, and taking over." },
      { slug: "passwords", title: "Saved passwords", description: "Let a pal sign in to sites without ever seeing your password." },
      { slug: "apps", title: "Connected apps", description: "Gmail, Calendar, Slack, Notion, GitHub and 1,500 more." },
      { slug: "rules", title: "Rules", description: "Decide what a pal may do on its own, and what it must ask about." },
      { slug: "routines", title: "Routines", description: "Put a pal on a schedule, like a brief every weekday at 8." },
      { slug: "triggers", title: "Triggers", description: "Wake a pal when something happens in your apps." },
      { slug: "channels", title: "Pals working together", description: "Hand-offs between pals, and group channels with a lead." },
      { slug: "memory", title: "Memory and skills", description: "What a pal remembers about you, and the know-how it saves." },
      { slug: "files", title: "Files and code", description: "Sending files, getting files back, and the pal's workspace." },
      { slug: "voice", title: "Voice calls", description: "Talk to a pal out loud while it works." },
    ],
  },
  {
    group: "Reference",
    pages: [
      { slug: "plans", title: "Plans and limits", description: "The free allowance, the paid plan, and what uses a message." },
      { slug: "privacy", title: "Your data", description: "What Pals keeps, where it keeps it, and who can see it." },
      { slug: "self-hosting", title: "Run it yourself", description: "Run from source, build the Mac app, or host it for many people." },
      { slug: "api", title: "API", description: "The HTTP API behind the Pals app, for partners like RobiChat." },
      { slug: "faq", title: "Questions", description: "Short answers to the things people ask most." },
    ],
  },
];

export const docHref = (slug: string) => (slug ? `/docs/${slug}` : "/docs");
