"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/docs";

/** "On this page", highlighting the section you're reading. */
export default function Toc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter((e): e is HTMLElement => Boolean(e));
    const onScroll = () => {
      // The last heading that has scrolled past the top third of the screen.
      const line = window.innerHeight / 3;
      let id = els[0]?.id ?? null;
      for (const el of els) if (el.getBoundingClientRect().top < line) id = el.id;
      setActive(id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  if (headings.length < 2) return null;
  return (
    <nav className="doc-toc" aria-label="On this page">
      <h2>On this page</h2>
      <ul>
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? "is-sub" : undefined}>
            <a href={`#${h.id}`} className={active === h.id ? "is-active" : undefined}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
