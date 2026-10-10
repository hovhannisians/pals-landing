import "server-only";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

// Blog posts are Markdown files in content/blog, each starting with a small frontmatter block:
// title, description, date (YYYY-MM-DD) and tag.
export type Post = { slug: string; title: string; description: string; date: string; tag: string; body: string };

const DIR = path.join(process.cwd(), "content/blog");

function parse(slug: string, raw: string): Post {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(raw);
  const meta: Record<string, string> = {};
  for (const line of (m?.[1] ?? "").split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { slug, title: meta.title ?? slug, description: meta.description ?? "", date: meta.date ?? "", tag: meta.tag ?? "", body: (m?.[2] ?? raw).trim() };
}

/** Every post, newest first. */
export function posts(): Post[] {
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parse(f.slice(0, -3), readFileSync(path.join(DIR, f), "utf8")))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
}

export function post(slug: string): Post | undefined {
  return posts().find((p) => p.slug === slug);
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
