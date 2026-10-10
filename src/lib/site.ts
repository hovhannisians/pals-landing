// Every place Pals runs. `file` is the real installer or store link: replace each "#" once the link exists.
// `page` is the site's own page for that app, and everything else on the site links to /download.
export type Platform = "mac" | "windows" | "ios" | "android" | "robichat";

export type App = {
  name: string;
  /** What the button that gets it says. */
  label: string;
  detail: string;
  /** The installer, store listing or Robi Chat link. */
  file: string;
  /** The site page about this app. */
  page: string;
  /** Where download buttons across the site go. */
  url: string;
  /** Not out yet: every button for it shows "Coming soon" and goes nowhere. Set to false at launch. */
  soon: boolean;
  requirements: string[];
};

export const DOWNLOADS: Record<Platform, App> = {
  mac: {
    name: "Mac",
    label: "Download for Mac",
    detail: "macOS, Apple silicon and Intel",
    file: "#",
    page: "/desktop",
    url: "/download#mac",
    soon: true,
    requirements: ["Apple silicon or Intel Mac", "A Robi API key, or sign in with your Robi account"],
  },
  windows: {
    name: "Windows",
    label: "Download for Windows",
    detail: "Windows 10 and 11",
    file: "#",
    page: "/desktop",
    url: "/download#windows",
    soon: true,
    requirements: ["Windows 10 or 11, 64-bit", "A Robi API key, or sign in with your Robi account"],
  },
  ios: {
    name: "iPhone",
    label: "Download on the App Store",
    detail: "iPhone and iPad",
    file: "#",
    page: "/mobile",
    url: "/download#ios",
    soon: true,
    requirements: ["iPhone or iPad", "A Robi account"],
  },
  android: {
    name: "Android",
    label: "Get it on Google Play",
    detail: "Android phones and tablets",
    file: "#",
    page: "/mobile",
    url: "/download#android",
    soon: true,
    requirements: ["Android phone or tablet", "A Robi account"],
  },
  robichat: {
    name: "Robi Chat",
    label: "Open Robi Chat",
    detail: "Built in, nothing to install",
    file: "https://chat.robiai.com/",
    page: "/robi-chat",
    url: "/download#robichat",
    soon: true,
    requirements: ["A Robi Chat account", "Any modern browser"],
  },
};

export const PLATFORMS: Platform[] = ["mac", "windows", "ios", "android", "robichat"];
export const ROBI_URL = "https://robiai.com";
/** Product release gate. Only the literal value "true" enables download and login links. */
export const PALS_LAUNCHED = process.env.NEXT_PUBLIC_PALS_LAUNCHED === "true";
export const WAITLIST_URL = "/waitlist";
/** Public Google Apps Script web app used by the Robi Labs Pals waitlist. */
export const WAITLIST_ENDPOINT = "https://script.google.com/macros/s/AKfycbyDCssCa1huQnC43-OIn80cBMFB8f0UfKP7Vv-XpcR1n894ftPVVlp7W-jHvatTkQJg/exec";

/** Sign in to the Pals web app. pals.robiai.com is the planned domain (Pals API doc); change it here if it moves. */
export const LOGIN_URL = "https://pals.robiai.com/login";
/** Sign-in isn't open yet: the Log in button shows "Coming soon". Set to false when it opens. */
export const LOGIN_SOON = true;

/** Where people subscribe. Pals sells nothing itself: a Robi Chat or Bleenk subscription is the paid plan. */
export const SUBSCRIBE = {
  robichat: "https://chat.robiai.com/",
  bleenk: "https://www.bleenk.app/",
};

/** Pals on social media. */
export const PALS_SOCIAL = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/palsbyrobi" },
  { name: "X", href: "https://x.com/palsbyrobi" },
];

/** Robi Labs elsewhere, from robiai.com. */
export const ROBI_LINKS = {
  site: "https://www.robiai.com/",
  chat: "https://chat.robiai.com/",
  console: "https://console.robiai.com/",
  bleenk: "https://www.bleenk.app/",
  lime: "https://www.robiai.com/lime/",
  careers: "https://www.robiai.com/careers/",
  contact: "https://www.robiai.com/contact",
  github: "https://github.com/Robi-Labs",
  huggingface: "https://huggingface.co/RobiLabs",
  x: "https://x.com/RobiLabsAI",
  linkedin: "https://www.linkedin.com/company/robilabsai",
};

/** The top bar, after the Features menu. */
export const NAV = [
  { href: "/integrations", label: "Integrations" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/docs", label: "Docs" },
];

/** The Features menu: what a pal can do, and where to get it. */
export const FEATURE_MENU = [
  { href: "/computer", icon: "monitor", title: "Its own computer", body: "A browser that stays logged in, and a workspace for code." },
  { href: "/integrations", icon: "apps", title: "Integrations", body: "Gmail, Slack, Notion, GitHub and 1,500 more." },
  { href: "/features#rules", icon: "shield", title: "Rules and approvals", body: "It asks before it sends, posts or pays." },
  { href: "/features#routines", icon: "clock", title: "Routines and triggers", body: "On a schedule, or when something happens." },
  { href: "/features#passwords", icon: "key", title: "Saved passwords", body: "Signs in without ever seeing them." },
  { href: "/features#teams", icon: "users", title: "Pals working together", body: "Hand-offs and channels with a lead pal." },
  { href: "/features#memory", icon: "brain", title: "Memory and skills", body: "Remembers you, and how it did things." },
] as const;

export const APPS_MENU = [
  { href: "/desktop", label: "Mac and Windows" },
  { href: "/mobile", label: "iPhone and Android" },
  { href: "/robi-chat", label: "Robi Chat" },
  { href: "/download", label: "All downloads" },
];

export const COMPANY_MENU = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/security", label: "Security" },
];
