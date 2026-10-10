import Link from "next/link";
import Wordmark from "@/components/Wordmark";
import { PALS_SOCIAL } from "@/lib/site";

const ICON: Record<string, React.ReactNode> = {
  LinkedIn: (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden>
      <path d="M3.6 5.7H1V15h2.6zM2.3 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM15 9.7c0-2.5-.5-4.2-3.4-4.2-1.4 0-2.3.7-2.7 1.4V5.7H6.4V15H9v-4.6c0-1.2.2-2.4 1.8-2.4 1.5 0 1.5 1.4 1.5 2.5V15H15z" />
    </svg>
  ),
  X: (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden>
      <path d="M12.2 1h2.3l-5 5.7L15.4 15h-4.6L7.2 10.3 3 15H.8l5.4-6.1L.5 1h4.7l3.3 4.3zm-.8 12.6h1.3L4.6 2.3H3.2z" />
    </svg>
  ),
};

const COLUMNS: { title: string; links: [string, string][] }[] = [
  {
    title: "Product",
    links: [
      ["Features", "/features"],
      ["Computer", "/computer"],
      ["Integrations", "/integrations"],
      ["Pricing", "/pricing"],
      ["Security", "/security"],
    ],
  },
  {
    title: "Get Pals",
    links: [
      ["Mac and Windows", "/desktop"],
      ["iPhone and Android", "/mobile"],
      ["Robi Chat", "/robi-chat"],
      ["All downloads", "/download"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About", "/about"],
      ["Blog", "/blog"],
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="page rails footer-grid">
        <div className="footer-brand">
          <Wordmark />
          <p>Personal agents with their own computers. A Robi Labs product.</p>
          <div className="footer-social">
            {PALS_SOCIAL.map((l) => (
              <a key={l.name} href={l.href} target="_blank" rel="noreferrer" aria-label={`Pals on ${l.name}`}>
                {ICON[l.name]}
              </a>
            ))}
          </div>
        </div>
        {COLUMNS.map((c) => (
          <nav key={c.title} className="footer-col" aria-label={c.title}>
            <div className="eyebrow">{c.title}</div>
            {c.links.map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
        ))}
        <p className="footer-copy">© 2026 Robi Labs</p>
      </div>
    </footer>
  );
}
