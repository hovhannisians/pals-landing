import type { ReactNode } from "react";
import Link from "next/link";

/** A section heading: small label, title, one paragraph. */
export function SecHead({ label, title, children, center = false }: { label: string; title: ReactNode; children?: ReactNode; center?: boolean }) {
  return (
    <header className={`sec-head ${center ? "sec-head-center" : ""}`}>
      <div className="eyebrow">{label}</div>
      <h2 className="text-h1">{title}</h2>
      {children ? <p>{children}</p> : null}
    </header>
  );
}

/** Text on one side, the thing itself on the other. `flip` puts the visual first. */
export function Story({
  id,
  label,
  title,
  body,
  points,
  more,
  children,
  flip = false,
}: {
  id?: string;
  label: string;
  title: string;
  body: string;
  points?: string[];
  more?: { href: string; label: string };
  children: ReactNode;
  flip?: boolean;
}) {
  return (
    <section id={id} className={`story ${flip ? "story-flip" : ""}`}>
      <div className="story-text">
        <div className="eyebrow">{label}</div>
        <h2 className="text-h1 story-title">{title}</h2>
        <p className="story-body">{body}</p>
        {points && (
          <ul className="story-points">
            {points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
        {more && (
          <Link href={more.href} className="sec-link">
            {more.label}
          </Link>
        )}
      </div>
      <div className="story-visual">{children}</div>
    </section>
  );
}

/** Small white cards in a row: an icon, a title, a sentence or two. */
export function InfoGrid({ items, cols = 3 }: { items: { icon?: ReactNode; title: string; body: string }[]; cols?: 2 | 3 | 4 }) {
  return (
    <div className={`info-grid info-${cols}`}>
      {items.map((i) => (
        <article key={i.title} className="surface info">
          {i.icon ? <span className="info-icon">{i.icon}</span> : null}
          <h3 className="text-h2">{i.title}</h3>
          <p>{i.body}</p>
        </article>
      ))}
    </div>
  );
}

/** A real sequence, numbered. */
export function Steps({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ol className="steps">
      {items.map((s, i) => (
        <li key={s.title} className="surface step">
          <span className="step-n">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="text-h2">{s.title}</h3>
          <p>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Questions that open on click, no script needed. */
export function Faq({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <div className="faq surface">
      {items.map((i) => (
        <details key={i.q}>
          <summary>{i.q}</summary>
          <div className="faq-a">{i.a}</div>
        </details>
      ))}
    </div>
  );
}

/** Rules as the app's Setup tab shows them. */
export function RulesCard({ rules }: { rules: [string, "Allow" | "Ask first" | "Never"][] }) {
  return (
    <div className="surface rules-card">
      <div className="eyebrow">Approvals</div>
      <h3 className="rules-title">When your pal wants to…</h3>
      {rules.map(([action, decision]) => (
        <div key={action} className="rules-row">
          <span>{action}</span>
          <span className={`rule-pill rule-${decision === "Ask first" ? "ask" : decision.toLowerCase()}`}>{decision}</span>
        </div>
      ))}
    </div>
  );
}
