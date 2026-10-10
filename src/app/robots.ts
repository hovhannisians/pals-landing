import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://pals.robiai.com/sitemap.xml",
    host: "https://pals.robiai.com",
  };
}
