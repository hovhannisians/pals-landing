import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import GithubSlugger from "github-slugger";
import { NAV, docHref, type DocPage } from "./docs-nav";

export { NAV, docHref, type DocPage };

export const PAGES: DocPage[] = NAV.flatMap((g) => g.pages);

export function findPage(slug: string): DocPage | undefined {
  return PAGES.find((p) => p.slug === slug);
}

/** The page before and after this one, in sidebar order. */
export function neighbours(slug: string): { prev: DocPage | null; next: DocPage | null } {
  const i = PAGES.findIndex((p) => p.slug === slug);
  return { prev: PAGES[i - 1] ?? null, next: PAGES[i + 1] ?? null };
}

export type Heading = { depth: 2 | 3; text: string; id: string };

/** Markdown for a page, plus its h2/h3 headings with the same ids rehype-slug gives them. */
export async function loadDoc(slug: string): Promise<{ body: string; headings: Heading[] }> {
  const body = await readFile(path.join(process.cwd(), "content/docs", `${slug || "index"}.md`), "utf8");
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let fenced = false;
  for (const line of body.split("\n")) {
    if (line.startsWith("```")) fenced = !fenced;
    const m = !fenced && /^(##|###)\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[*_`]/g, "");
    headings.push({ depth: m[1].length as 2 | 3, text, id: slugger.slug(text) });
  }
  return { body, headings };
}
