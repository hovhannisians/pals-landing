"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, Clock, KeyRound, LayoutGrid, Monitor, ShieldCheck, UsersRound } from "lucide-react";
import Wordmark from "@/components/Wordmark";
import { APPS_MENU, COMPANY_MENU, FEATURE_MENU, LOGIN_URL, NAV, PALS_LAUNCHED, WAITLIST_URL } from "@/lib/site";

const ICONS = { monitor: Monitor, apps: LayoutGrid, shield: ShieldCheck, clock: Clock, key: KeyRound, users: UsersRound, brain: Brain };

/** The site's top bar: a Features menu, the main pages, a download button, and on phones a menu below the bar. */
export default function SiteHeader() {
  const path = usePathname();
  const [sheet, setSheet] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobileFeatures, setMobileFeatures] = useState(false);
  const [mobileApps, setMobileApps] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSheet(false);
    setMega(false);
    setMobileFeatures(false);
    setMobileApps(false);
  }, [path]);
  useEffect(() => {
    if (!mega) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMega(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mega]);

  // Hovering opens the menu; leaving closes it after a beat, so moving the mouse down into it doesn't snap it shut.
  const open = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMega(true);
  };
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setMega(false), 160);
  };

  const here = (href: string) => (href === "/docs" ? path.startsWith("/docs") : href === "/blog" ? path.startsWith("/blog") : path === href);
  const inFeatures = ["/features", "/computer", "/desktop", "/mobile", "/robi-chat", "/download"].includes(path);

  return (
    <header className={`nav ${sheet ? "is-open" : ""}`} onMouseLeave={closeSoon}>
      <div className="page nav-row">
        <Wordmark />
        <nav className="nav-links" aria-label="Main">
          <button
            type="button"
            className={`nav-mega-btn ${mega || inFeatures ? "is-on" : ""}`}
            aria-expanded={mega}
            aria-controls="features-menu"
            onMouseEnter={open}
            onClick={() => setMega((m) => !m)}
          >
            Features
            <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden>
              <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={here(n.href) ? "page" : undefined} onMouseEnter={closeSoon}>
              {n.label}
            </Link>
          ))}
        </nav>
        {!PALS_LAUNCHED ? (
          <a href={WAITLIST_URL} className="btn btn-primary nav-download">
            Join the waitlist
          </a>
        ) : (
          <a href={LOGIN_URL} className="btn btn-secondary nav-login">
            Log in
          </a>
        )}
        {PALS_LAUNCHED && (
          <Link href="/download" className="btn btn-primary nav-download">
            Download
          </Link>
        )}
        <button type="button" className="nav-menu" aria-expanded={sheet} aria-controls="site-menu" onClick={() => setSheet((o) => !o)}>
          <span className="sr-only">{sheet ? "Close menu" : "Menu"}</span>
          <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden>
            {sheet ? (
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M3 7h14M3 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {mega && (
        <div id="features-menu" className="mega" onMouseEnter={open}>
          <div className="page mega-inner">
            <div className="mega-features">
              {FEATURE_MENU.map((f) => {
                const Icon = ICONS[f.icon];
                return (
                  <Link key={f.href} href={f.href} className="mega-item">
                    <span className="mega-icon">
                      <Icon size={17} strokeWidth={1.5} />
                    </span>
                    <span>
                      <b>{f.title}</b>
                      <span>{f.body}</span>
                    </span>
                  </Link>
                );
              })}
              <Link href="/features" className="mega-item mega-all">
                <span>
                  <b>All features</b>
                  <span>See everything a pal can do.</span>
                </span>
              </Link>
            </div>
            <div className="mega-side">
              <div className="eyebrow">Get Pals on</div>
              {APPS_MENU.map((a) => (
                <Link key={a.href} href={a.href}>
                  {a.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {sheet && (
        <nav id="site-menu" className="nav-sheet" aria-label="Main">
          <button type="button" className="nav-sheet-toggle" aria-expanded={mobileFeatures} onClick={() => setMobileFeatures((open) => !open)}>
            Features
            <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden>
              <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {mobileFeatures && (
            <div className="nav-sheet-submenu">
              {FEATURE_MENU.map((f) => (
                <Link key={f.href} href={f.href}>
                  {f.title}
                </Link>
              ))}
              <Link href="/features">All features</Link>
            </div>
          )}
          <button type="button" className="nav-sheet-toggle" aria-expanded={mobileApps} onClick={() => setMobileApps((open) => !open)}>
            Get Pals on
            <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden>
              <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {mobileApps && (
            <div className="nav-sheet-submenu">
              {APPS_MENU.map((a) => (
                <Link key={a.href} href={a.href}>
                  {a.label}
                </Link>
              ))}
            </div>
          )}
          <div className="eyebrow">More</div>
          {[...NAV.filter((n) => n.href !== "/blog"), ...COMPANY_MENU].map((n) => (
            <Link key={n.href} href={n.href} aria-current={here(n.href) ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
          <div className="nav-sheet-ctas">
            {!PALS_LAUNCHED ? (
              <a href={WAITLIST_URL} className="btn btn-primary btn-lg">
                Join the waitlist
              </a>
            ) : (
              <a href={LOGIN_URL} className="btn btn-secondary btn-lg">
                Log in
              </a>
            )}
            {PALS_LAUNCHED && (
              <Link href="/download" className="btn btn-primary btn-lg">
                Download Pals
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
