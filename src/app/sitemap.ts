import type { MetadataRoute } from "next";
import { PALS_DOCS_ENABLED } from "@/lib/site";
import { NAV as DOC_GROUPS, docHref } from "@/lib/docs-nav";

const SITE_URL = "https://pals.robiai.com";
const routes = [
  "/",
  "/features",
  "/alternatives",
  "/desktop",
  "/mobile",
  "/robi-chat",
  "/download",
  "/integrations",
  "/pricing",
  "/security",
  "/about",
  "/blog",
  "/waitlist",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = PALS_DOCS_ENABLED ? DOC_GROUPS.flatMap((group) => group.pages.map((page) => docHref(page.slug))) : [];
  return [...new Set([...routes, ...docs])].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path.startsWith("/docs") || path.startsWith("/blog") ? "monthly" : "weekly",
    priority: path === "/" ? 1 : path === "/docs" || path === "/features" ? 0.9 : 0.7,
  }));
}
