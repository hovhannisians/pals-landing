"use client";

import { useMemo, useState } from "react";
import { Search, Zap } from "lucide-react";
import data from "@/data/integrations.json";

// Every app a pal can use, from the Pals app's own catalogue (Composio's toolkits): search it, filter it by category,
// or show only the Instant Apps (the six that work through Composio with no sign-in, as in the Pals app) and apps with triggers.

type App = { s: string; n: string; c: string; t: number; g: number; m: number };
const APPS = data.apps as App[];
const CATEGORIES = Object.entries(
  APPS.reduce<Record<string, number>>((acc, a) => {
    acc[a.c] = (acc[a.c] ?? 0) + 1;
    return acc;
  }, {}),
)
  .sort((a, b) => b[1] - a[1])
  .map(([c]) => c);

const PAGE = 48;

function Logo({ slug, name }: { slug: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="dir-letter">{name.slice(0, 1)}</span>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`https://logos.composio.dev/api/${slug}`} alt="" width={28} height={28} loading="lazy" onError={() => setFailed(true)} />;
}

export default function Directory() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [instant, setInstant] = useState(false);
  const [triggers, setTriggers] = useState(false);
  const [limit, setLimit] = useState(PAGE);

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return APPS.filter(
      (a) => (!query || a.n.toLowerCase().includes(query)) && (!cat || a.c === cat) && (!instant || a.m) && (!triggers || a.g > 0),
    );
  }, [q, cat, instant, triggers]);

  const reset = (fn: () => void) => {
    fn();
    setLimit(PAGE);
  };

  return (
    <div className="dir">
      <div className="dir-controls">
        <label className="dir-search">
          <Search size={15} strokeWidth={1.75} />
          <input value={q} onChange={(e) => reset(() => setQ(e.target.value))} placeholder={`Search ${APPS.length.toLocaleString("en-US")} apps`} aria-label="Search apps" />
        </label>
        <div className="dir-toggles">
          <button type="button" aria-pressed={instant} className={instant ? "is-on" : undefined} onClick={() => reset(() => setInstant((v) => !v))}>
            Instant Apps
          </button>
          <button type="button" aria-pressed={triggers} className={triggers ? "is-on" : undefined} onClick={() => reset(() => setTriggers((v) => !v))}>
            <Zap size={12} strokeWidth={2} /> With triggers
          </button>
        </div>
      </div>
      <div className="dir-cats" role="group" aria-label="Categories">
        <button type="button" aria-pressed={!cat} className={!cat ? "is-on" : undefined} onClick={() => reset(() => setCat(null))}>
          All apps
        </button>
        {CATEGORIES.map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} className={cat === c ? "is-on" : undefined} onClick={() => reset(() => setCat(cat === c ? null : c))}>
            {c}
          </button>
        ))}
      </div>

      <p className="dir-count" aria-live="polite">
        {list.length.toLocaleString("en-US")} {list.length === 1 ? "app" : "apps"}
      </p>

      {list.length === 0 ? (
        <div className="surface dir-empty">No apps match. Try a different name or category.</div>
      ) : (
        <div className="dir-grid">
          {list.slice(0, limit).map((a) => (
            <article key={a.s} className="surface dir-app">
              <span className="dir-logo">
                <Logo slug={a.s} name={a.n} />
              </span>
              <span className="dir-text">
                <b>{a.n}</b>
                <span>{a.c}</span>
              </span>
              <span className="dir-meta">
                {a.t > 0 && <span>{a.t} tools</span>}
                {a.g > 0 && (
                  <span className="dir-trig">
                    <Zap size={10} strokeWidth={2} /> {a.g}
                  </span>
                )}
                {a.m ? <span className="dir-instant">Instant</span> : null}
              </span>
            </article>
          ))}
        </div>
      )}
      {list.length > limit && (
        <button type="button" className="btn btn-secondary btn-lg dir-more" onClick={() => setLimit((l) => l + PAGE)}>
          Show more apps
        </button>
      )}
    </div>
  );
}
