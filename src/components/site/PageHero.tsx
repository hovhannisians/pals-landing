import type { ReactNode } from "react";

/** The top of an inner page: a small label, the headline, one line under it, and its buttons. */
export default function PageHero({ label, title, children, actions }: { label: string; title: ReactNode; children?: ReactNode; actions?: ReactNode }) {
  return (
    <section className="phero">
      <div className="hero-dots" aria-hidden />
      <div className="eyebrow">{label}</div>
      <h1 className="text-display phero-title">{title}</h1>
      {children ? <p className="phero-sub">{children}</p> : null}
      {actions ? <div className="hero-ctas">{actions}</div> : null}
    </section>
  );
}
