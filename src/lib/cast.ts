import type { Look } from "./look";

// The pals on the site. Scout, Juniper, Atlas and Bix are the app's starters, with the same looks as in the app,
// so they match the screenshots of the mobile app.
export type CastMember = { name: string; look: Look; job: string; purpose: string; says: string };

export const CAST = {
  scout: {
    name: "Scout",
    look: { surface: "rounded", color: "#00CFFB", eyeColor: "#ffffff", seed: 11 },
    job: "Research",
    purpose: "Research anything I ask and deliver clear, sourced briefs",
    says: "Ask me anything. I'll read around, check the sources, and come back with a brief you can trust.",
  },
  juniper: {
    name: "Juniper",
    look: { surface: "octagon", color: "#53B4AA", eyeColor: "#ffffff", seed: 23 },
    job: "Inbox",
    purpose: "Keep an eye on my inbox and draft replies in my voice",
    says: "I watch your email, draft replies that sound like you, and ask before anything goes out.",
  },
  atlas: {
    name: "Atlas",
    look: { surface: "diagonal", color: "#F49724", eyeColor: "#ffffff", seed: 37 },
    job: "Travel",
    purpose: "Plan trips and track prices for flights and hotels",
    says: "I plan trips and watch prices. When a fare drops, you'll hear from me before it's gone.",
  },
  bix: {
    name: "Bix",
    look: { surface: "burst", color: "#A959AB", eyeColor: "#ffffff", seed: 41 },
    job: "Code",
    purpose: "Write and run code and scripts on its computer",
    says: "I write and run scripts on my own computer, so reports, charts and clean-ups just show up.",
  },
  opal: {
    name: "Opal",
    look: { surface: "diamond", color: "#F29CC2", eyeColor: "#ffffff", seed: 9 },
    job: "Home",
    purpose: "Keep track of bills, renewals and deliveries",
    says: "Bills, renewals, deliveries, the dentist. I keep the small things from slipping.",
  },
} satisfies Record<string, CastMember>;

export type CastKey = keyof typeof CAST;
