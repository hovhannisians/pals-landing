"use client";

import { useState } from "react";
import {
  ArrowUp,
  Check,
  Clock,
  Globe,
  LayoutGrid,
  Lock,
  Mail,
  MessageSquare,
  Monitor,
  MousePointer2,
  Pause,
  Plus,
  RotateCw,
  Search,
  Settings,
  SlidersHorizontal,
  SquarePen,
  X,
} from "lucide-react";
import PalAvatar from "@/components/PalAvatar";
import { CAST, type CastKey } from "@/lib/cast";

// A faithful, clickable copy of the Pals app (web and desktop share it): the sidebar from Sidebar.tsx, the pal header
// from PalView.tsx, and the Chat, Computer and Setup tabs. It reflows like the app: on narrow screens the sidebar
// folds away and the pal's view takes the whole window.

type Tab = "chat" | "computer" | "setup";
type Outcome = "pending" | "approved" | "denied" | "always";

const TABS: { id: Tab; label: string; title: string; body: string }[] = [
  {
    id: "chat",
    label: "Chat",
    title: "It asks before it acts",
    body: "Pals read and look things up on their own. Before one sends, posts or pays, it stops and shows you a card. Try it.",
  },
  {
    id: "computer",
    label: "Computer",
    title: "Watch it work, take over any time",
    body: "Every pal has its own computer and a browser that stays logged in. Step in for a login or a captcha, then hand it back.",
  },
  {
    id: "setup",
    label: "Setup",
    title: "Your rules, its routines, what it remembers",
    body: "Write rules in plain words, put a pal on a schedule, and see everything it has learned about you.",
  },
];

const PALS: { key: CastKey; status: "idle" | "working" | "waiting" }[] = [
  { key: "juniper", status: "waiting" },
  { key: "scout", status: "idle" },
  { key: "atlas", status: "waiting" },
  { key: "bix", status: "working" },
  { key: "opal", status: "idle" },
];

const CHATS: { key: CastKey; title: string; line: string; time: string; status: "idle" | "working" | "waiting"; active?: boolean; unread?: boolean }[] = [
  { key: "juniper", title: "Reply to Dana about Thursday", line: "Needs you: Send email to Dana Whitfield", time: "8m", status: "waiting", active: true },
  { key: "bix", title: "Fix the flaky checkout test", line: "Running the test suite", time: "1m", status: "working" },
  { key: "atlas", title: "Weekend in Lisbon", line: "Needs you: Which dates work best?", time: "3m", status: "waiting", unread: true },
  { key: "scout", title: "Best commuter e-bikes under €2k", line: "Here are the three that fit a 12 km hilly…", time: "25m", status: "idle", unread: true },
  { key: "juniper", title: "Morning inbox summary", line: "Three emails need you today…", time: "1d", status: "idle" },
  { key: "opal", title: "Car insurance renewal", line: "You: compare it with last year's", time: "2d", status: "idle" },
];

const DOT: Record<string, string> = { working: "app-dot-working", waiting: "app-dot-waiting", idle: "" };

export default function AppWindow() {
  const [tab, setTab] = useState<Tab>("chat");
  const [outcome, setOutcome] = useState<Outcome>("pending");
  const [taken, setTaken] = useState(false);

  const juniper = CAST.juniper;
  const status = outcome === "pending" ? "waiting" : "idle";
  const current = TABS.find((t) => t.id === tab)!;

  return (
    <div className="tour">
      <div className="tour-stage">
        <div className="mac" role="tabpanel" aria-label={`${current.label} tab of the Pals app`}>
          <div className="mac-bar">
            <i />
            <i />
            <i />
            <span>Pals</span>
          </div>

          <div className="app">
            {/* Sidebar */}
            <aside className="app-side">
              <div className="app-side-head">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/art/logo.png" alt="Pals" className="app-logo" />
                <span className="app-by">by Robi</span>
                <span className="app-round">
                  <Search size={15} strokeWidth={1.75} />
                </span>
                <span className="app-round">
                  <SquarePen size={15} strokeWidth={1.75} />
                </span>
              </div>
              <div className="app-pals">
                {PALS.map((p) => (
                  <span key={p.key} className={`app-pal ${p.key === "juniper" ? "is-on" : ""}`}>
                    <span className="app-pal-face">
                      <PalAvatar look={CAST[p.key].look} status={p.key === "juniper" ? status : p.status} size={40} />
                      {(p.key === "juniper" ? status : p.status) !== "idle" && <i className={`app-dot ${DOT[p.key === "juniper" ? status : p.status]}`} />}
                    </span>
                    <span>{CAST[p.key].name}</span>
                  </span>
                ))}
                <span className="app-pal app-pal-new">
                  <span className="app-pal-plus">
                    <Plus size={15} strokeWidth={1.75} />
                  </span>
                  <span>New</span>
                </span>
              </div>
              <div className="app-chats">
                {CHATS.map((c, i) => (
                  <div key={i} className={`app-chat ${c.active ? "is-on" : ""}`}>
                    <PalAvatar look={CAST[c.key].look} status={c.active ? status : c.status} size={42} />
                    <div className="app-chat-text">
                      <div className="app-chat-top">
                        <b>{c.title}</b>
                        {c.unread && <i className="app-unread" />}
                        <time>{c.time}</time>
                      </div>
                      <div className="app-chat-line">
                        <span>{CAST[c.key].name}</span> · {c.active && outcome !== "pending" ? (outcome === "denied" ? "Okay, I won't send it." : "Sent.") : c.line}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="app-side-foot">
                <span className="app-me">SR</span>
                <span className="app-apps">
                  <LayoutGrid size={15} strokeWidth={1.5} /> Apps
                </span>
                <span className="app-round app-settings">
                  <Settings size={15} strokeWidth={1.5} />
                  <i />
                </span>
              </div>
            </aside>

            {/* Main */}
            <section className="app-main">
              <header className="app-head">
                <span className="app-palpill">
                  <PalAvatar look={juniper.look} status={status} size={26} />
                  <b>Juniper</b>
                  {status === "waiting" && (
                    <span className="app-palstate">
                      <i className="app-dot-inline app-dot-waiting" /> Waiting for you
                    </span>
                  )}
                </span>
                <span className="app-head-tools">
                  <span className="app-model">lime</span>
                  <span className="app-sep" />
                  <button type="button" className="app-icon" onClick={() => setTab("chat")} aria-label="Chat">
                    {tab === "chat" ? <SquarePen size={16} strokeWidth={1.75} /> : <MessageSquare size={16} strokeWidth={1.75} />}
                  </button>
                  <button type="button" className={`app-icon ${tab === "computer" ? "is-on" : ""}`} onClick={() => setTab("computer")} aria-label="Computer">
                    <Monitor size={16} strokeWidth={1.75} />
                  </button>
                  <button type="button" className={`app-icon ${tab === "setup" ? "is-on" : ""}`} onClick={() => setTab("setup")} aria-label="Setup">
                    <SlidersHorizontal size={16} strokeWidth={1.75} />
                  </button>
                  <span className="app-icon">
                    <Pause size={16} strokeWidth={1.75} />
                  </span>
                </span>
              </header>

              {tab === "chat" && (
                <div className="app-chatview">
                  <div className="app-thread">
                    <div className="app-day">Today · 7:27 PM</div>
                    <div className="app-user">Dana asked if we can move Thursday&apos;s call. Reply that 3pm works and suggest Friday as a backup.</div>
                    <div className="app-act">
                      <Mail size={14} strokeWidth={1.5} />
                      <b>Reading email</b>
                      <span>From Dana Whitfield: “Thursday call?”</span>
                    </div>
                    <div className="app-act">
                      <Clock size={14} strokeWidth={1.5} />
                      <b>Checking your calendar</b>
                      <span>Thursday 3pm is free · Friday 10am is free</span>
                    </div>
                    <div className="app-pal-msg">
                      <PalAvatar look={juniper.look} status={status} size={28} />
                      <div className="app-bubble">
                        <p>I drafted a reply in your voice. Here it is:</p>
                        <blockquote>Hi Dana, 3pm Thursday works for me. If that slips, Friday at 10am is open too. Best, Sam</blockquote>
                      </div>
                    </div>

                    {outcome === "pending" ? (
                      <div className="app-card">
                        <div className="app-card-head">
                          <i className="app-dot-inline app-dot-waiting" />
                          <span className="app-eyebrow">Needs your approval</span>
                          <span className="app-card-tool">Gmail · Send email</span>
                        </div>
                        <div className="app-card-body">
                          <b>Send email to Dana Whitfield</b>
                          <p>Subject: Re: Thursday call? Hi Dana, 3pm Thursday works for me. If that slips, Friday at 10am is open too.</p>
                          <div className="app-card-actions">
                            <button type="button" className="app-btn app-btn-primary" onClick={() => setOutcome("approved")}>
                              Approve
                            </button>
                            <button type="button" className="app-btn app-btn-secondary" onClick={() => setOutcome("denied")}>
                              Deny
                            </button>
                            <button type="button" className="app-btn app-btn-quiet" onClick={() => setOutcome("always")} title="Adds a rule: always allow when it wants to send an email">
                              Always allow
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className={`app-card-done ${outcome === "denied" ? "is-no" : ""}`}>
                          {outcome === "denied" ? <X size={14} strokeWidth={2} /> : <Check size={14} strokeWidth={2} />}
                          <span>Send email to Dana Whitfield</span>
                          <em>{outcome === "denied" ? "Denied" : "Approved"}</em>
                        </div>
                        <div className="app-pal-msg app-new">
                          <PalAvatar look={juniper.look} size={28} />
                          <div className="app-bubble">
                            <p>
                              {outcome === "denied"
                                ? "Okay, I won't send it. Tell me what to change and I'll draft it again."
                                : outcome === "always"
                                  ? "Sent. I've added a rule, so I'll send emails like this without asking from now on."
                                  : "Sent. I'll let you know when Dana replies."}
                            </p>
                          </div>
                        </div>
                        <button type="button" className="app-replay" onClick={() => setOutcome("pending")}>
                          <RotateCw size={12} strokeWidth={2} /> Show the card again
                        </button>
                      </>
                    )}
                  </div>
                  <div className="app-composer">
                    <span className="app-plus">
                      <Plus size={19} strokeWidth={1.75} />
                    </span>
                    <span className="app-placeholder">Message Juniper…</span>
                    <span className="app-send">
                      <ArrowUp size={16} strokeWidth={2.25} />
                    </span>
                  </div>
                </div>
              )}

              {tab === "computer" && (
                <div className="app-pane">
                  <div className="app-pane-head">
                    <div>
                      <div className="app-eyebrow">Computer</div>
                      <h4>Juniper&apos;s computer</h4>
                      <p>A cloud computer of its own. Its browser stays logged in to the sites you sign it in to.</p>
                    </div>
                    <button type="button" className={`app-btn ${taken ? "app-btn-secondary" : "app-btn-primary"}`} onClick={() => setTaken((t) => !t)}>
                      {taken ? "Hand back to Juniper" : "Take over"}
                    </button>
                  </div>
                  <div className="app-browser">
                    <div className="app-browser-bar">
                      <span className="app-lights">
                        <i />
                        <i />
                        <i />
                      </span>
                      <span className="app-url">
                        <Lock size={11} strokeWidth={2} /> mail.google.com/mail/u/0/#inbox
                      </span>
                      <span className={`app-live ${taken ? "is-you" : ""}`}>
                        <i /> {taken ? "You're in control" : "Live"}
                      </span>
                    </div>
                    <div className="app-screen">
                      <div className="gm">
                        <div className="gm-side">
                          <span className="gm-compose">Compose</span>
                          <span className="gm-nav is-on">Inbox</span>
                          <span className="gm-nav">Starred</span>
                          <span className="gm-nav">Sent</span>
                          <span className="gm-nav">Drafts</span>
                        </div>
                        <div className="gm-list">
                          {[
                            ["Dana Whitfield", "Thursday call?", "Can we move it to the afternoon?", true],
                            ["Lisbon Air", "Your fare alert", "Fares to Lisbon dropped to €184", false],
                            ["Bank of Bits", "Your statement is ready", "September statement for account …4410", false],
                            ["GitHub", "[shop] Checkout test failing", "1 of 5 runs failed on main", false],
                            ["Mia", "Dinner Saturday?", "We're thinking 8 at the usual place", false],
                          ].map(([from, subj, snip, hot]) => (
                            <div key={String(subj)} className={`gm-row ${hot ? "is-hot" : ""}`}>
                              <b>{from}</b>
                              <span>
                                <em>{subj}</em> — {snip}
                              </span>
                            </div>
                          ))}
                        </div>
                        {!taken && (
                          <span className="gm-cursor">
                            <MousePointer2 size={18} strokeWidth={1.5} fill="#0f0f0f" color="#fff" />
                            <span className="gm-cursor-tag">
                              <PalAvatar look={juniper.look} status="working" size={16} /> Juniper
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="app-where">
                    <span className="app-eyebrow">Where it runs</span>
                    <span className="app-seg">
                      <span className="is-on">
                        <Globe size={13} strokeWidth={1.75} /> Cloud computer · E2B
                      </span>
                    </span>
                  </div>
                </div>
              )}

              {tab === "setup" && (
                <div className="app-pane app-setup">
                  <div className="app-block">
                    <div className="app-eyebrow">Approvals</div>
                    <h4>When Juniper wants to…</h4>
                    {[
                      ["send an email", outcome === "always" ? "Allow" : "Ask first"],
                      ["read my email or calendar", "Allow"],
                      ["reply to emails from my team", "Allow"],
                      ["delete anything in my inbox", "Never"],
                    ].map(([a, d]) => (
                      <div key={a} className="app-rule">
                        <span>{a}</span>
                        <em className={`app-decision is-${d === "Ask first" ? "ask" : d.toLowerCase()}`}>{d}</em>
                      </div>
                    ))}
                  </div>
                  <div className="app-block">
                    <div className="app-eyebrow">Routines</div>
                    <h4>On a schedule</h4>
                    <div className="app-routine">
                      <i className="app-on" />
                      <div>
                        <b>Brief me on my inbox and calendar</b>
                        <span>Weekdays 9am · Next Mon 9:00 AM</span>
                      </div>
                      <em>Run now</em>
                    </div>
                    <div className="app-routine">
                      <i className="app-on" />
                      <div>
                        <b>Chase anyone who hasn&apos;t replied in 3 days</b>
                        <span>Every morning · Next Tomorrow 8:00 AM</span>
                      </div>
                      <em>Run now</em>
                    </div>
                  </div>
                  <div className="app-block">
                    <div className="app-eyebrow">What it knows about you</div>
                    <h4>Memory</h4>
                    {["Signs emails “Best, Sam”", "Dana Whitfield is their manager", "Keeps mornings before 10 free for deep work", "Prefers short, warm replies"].map((m) => (
                      <div key={m} className="app-memory">
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      <div className="tour-tabs" role="tablist" aria-label="Parts of the app">
        {TABS.map((t) => {
          const Icon = t.id === "chat" ? MessageSquare : t.id === "computer" ? Monitor : SlidersHorizontal;
          return (
            <button key={t.id} role="tab" type="button" aria-selected={tab === t.id} className={tab === t.id ? "is-on" : undefined} onClick={() => setTab(t.id)}>
              <span className="tour-tab-head">
                <span className="tour-tab-icon">
                  <Icon size={15} strokeWidth={1.75} />
                </span>
                <span className="eyebrow">{t.label}</span>
              </span>
              <b>{t.title}</b>
              <span className="tour-tab-body">{t.body}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
