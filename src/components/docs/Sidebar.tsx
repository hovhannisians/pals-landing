"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV, docHref } from "@/lib/docs-nav";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = NAV.flatMap((g) => g.pages).find((p) => docHref(p.slug) === pathname);

  // Close the menu on small screens after picking a page.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav className={`docs-nav ${open ? "is-open" : ""}`} aria-label="Docs">
      <button type="button" className="docs-nav-toggle" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span>{current?.title ?? "Docs"}</span>
        <svg viewBox="0 0 16 16" aria-hidden width="16" height="16">
          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="docs-nav-groups">
        {NAV.map((g) => (
          <div key={g.group} className="docs-nav-group">
            <h2>{g.group}</h2>
            <ul>
              {g.pages.map((p) => {
                const href = docHref(p.slug);
                const active = href === pathname;
                return (
                  <li key={href}>
                    <Link href={href} aria-current={active ? "page" : undefined} className={active ? "is-active" : undefined}>
                      {p.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
