"use client";

import { useState } from "react";
import { MoreHorizontal, Plus } from "lucide-react";
import PalAvatar from "@/components/PalAvatar";
import { CAST, type CastKey } from "@/lib/cast";

// Pals inside Robi Chat, copied from Robi Chat's own screen (chat-new: routes/(app)/pals/+page.svelte and
// components/pals/PalsApp.svelte) in its dark theme: Robi Chat's sidebar and header, then the native Pals view with
// the pals strip, every chat, and the open chat with its card.

type Status = "idle" | "working" | "waiting";

const PALS: { key: CastKey; status: Status }[] = [
  { key: "juniper", status: "waiting" },
  { key: "scout", status: "idle" },
  { key: "atlas", status: "waiting" },
  { key: "bix", status: "working" },
];

const CHATS: { key: CastKey; title: string; time: string; status: Status }[] = [
  { key: "juniper", title: "Reply to Dana about Thursday", time: "8m", status: "waiting" },
  { key: "bix", title: "Fix the flaky checkout test", time: "1m", status: "working" },
  { key: "atlas", title: "Weekend in Lisbon", time: "3m", status: "waiting" },
  { key: "scout", title: "Best commuter e-bikes under €2k", time: "25m", status: "idle" },
  { key: "juniper", title: "Morning inbox summary", time: "1d", status: "idle" },
];

// Robi Chat's own sidebar icons, from chat-new (icons/EditPencil, Sidebar/icons/Search, Notes, Workspace, icons/Sparkles,
// icons/Sidebar), drawn at stroke 1.5 like the sidebar does.
const ICON = {
  pencil: ["M14.3632 5.65156L15.8431 4.17157C16.6242 3.39052 17.8905 3.39052 18.6716 4.17157L20.0858 5.58579C20.8668 6.36683 20.8668 7.63316 20.0858 8.41421L18.6058 9.8942M14.3632 5.65156L4.74749 15.2672C4.41542 15.5993 4.21079 16.0376 4.16947 16.5054L3.92738 19.2459C3.87261 19.8659 4.39148 20.3848 5.0115 20.33L7.75191 20.0879C8.21972 20.0466 8.65806 19.8419 8.99013 19.5099L18.6058 9.8942M14.3632 5.65156L18.6058 9.8942"],
  search: ["M17 17L21 21", "M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z"],
  notes: ["M4 19V5C4 3.89543 4.89543 3 6 3H19.4C19.7314 3 20 3.26863 20 3.6V16.7143", "M6 17L20 17", "M6 21L20 21", "M6 21C4.89543 21 4 20.1046 4 19C4 17.8954 4.89543 17 6 17", "M9 7L15 7"],
  workspace: [
    "M13.9922 17H16.9922M19.9922 17H16.9922M16.9922 17V14M16.9922 17V20",
    "M4 9.4V4.6C4 4.26863 4.26863 4 4.6 4H9.4C9.73137 4 10 4.26863 10 4.6V9.4C10 9.73137 9.73137 10 9.4 10H4.6C4.26863 10 4 9.73137 4 9.4Z",
    "M4 19.4V14.6C4 14.2686 4.26863 14 4.6 14H9.4C9.73137 14 10 14.2686 10 14.6V19.4C10 19.7314 9.73137 20 9.4 20H4.6C4.26863 20 4 19.7314 4 19.4Z",
    "M14 9.4V4.6C14 4.26863 14.2686 4 14.6 4H19.4C19.7314 4 20 4.26863 20 4.6V9.4C20 9.73137 19.7314 10 19.4 10H14.6C14.2686 10 14 9.73137 14 9.4Z",
  ],
  sparkles: ["M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"],
  sidebar: ["M19 21L5 21C3.89543 21 3 20.1046 3 19L3 5C3 3.89543 3.89543 3 5 3L19 3C20.1046 3 21 3.89543 21 5L21 19C21 20.1046 20.1046 21 19 21Z", "M9.5 21V3", "M5.5 10L7.25 12L5.5 14"],
};

function Icon({ d }: { d: string[] }) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {d.map((p) => (
        <path key={p} d={p} />
      ))}
    </svg>
  );
}

const DOT: Record<Status, string> = { working: "rcp-dot-working", waiting: "rcp-dot-waiting", idle: "rcp-dot-idle" };

export default function RobiChatWindow() {
  const [outcome, setOutcome] = useState<"pending" | "approved" | "denied" | "always">("pending");
  const juniper = CAST.juniper;
  const status: Status = outcome === "pending" ? "waiting" : "idle";
  const statusOf = (key: CastKey, s: Status) => (key === "juniper" ? status : s);

  return (
    <div className="rc" role="group" aria-label="Pals open inside Robi Chat">
      {/* Robi Chat's sidebar (chat-new components/layout/Sidebar.svelte) */}
      <aside className="rc-side">
        <div className="rc-brand">
          <span className="rc-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/art/robichat.png" alt="" width={20} height={20} />
          </span>
          <span className="rc-name">Robi Chat</span>
          <span className="rc-toggle">
            <Icon d={ICON.sidebar} />
          </span>
        </div>
        <nav className="rc-nav">
          <span>
            <Icon d={ICON.pencil} /> New Chat
          </span>
          <span>
            <Icon d={ICON.search} /> Search
          </span>
          <span className="is-on">
            <Icon d={ICON.sparkles} /> Pals
          </span>
          <span>
            <Icon d={ICON.notes} /> Notes
          </span>
          <span>
            <Icon d={ICON.workspace} /> Workspace
          </span>
        </nav>
        <div className="rc-section">Models</div>
        <span className="rc-model">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/art/robichat.png" alt="" width={16} height={16} /> Vera
        </span>
        <div className="rc-section">
          Channels <Plus size={12} strokeWidth={2.5} />
        </div>
        <div className="rc-section">
          Folders <Plus size={12} strokeWidth={2.5} />
        </div>
        <div className="rc-section">
          Chats <MoreHorizontal size={14} strokeWidth={2} />
        </div>
        <div className="rc-user">
          <span className="rc-me">
            S<i />
          </span>
          Sam Rivera
        </div>
      </aside>

      {/* The Pals tab */}
      <section className="rc-main">
        <header className="rc-top">
          <b>Pals</b>
          <span>Reload</span>
          <span>Open in new tab ↗</span>
        </header>

        <div className="rcp">
          <aside className="rcp-side">
            <div className="rcp-strip">
              {PALS.map((p) => {
                const s = statusOf(p.key, p.status);
                return (
                  <span key={p.key} className={`rcp-pal ${p.key === "juniper" ? "is-on" : ""}`}>
                    <span className="rcp-face">
                      <PalAvatar look={CAST[p.key].look} status={s} size={40} />
                      {s !== "idle" && <i className={`rcp-badge ${DOT[s]}`} />}
                    </span>
                    <span className="rcp-name">{CAST[p.key].name}</span>
                  </span>
                );
              })}
              <span className="rcp-pal">
                <span className="rcp-plus">+</span>
                <span className="rcp-name">New</span>
              </span>
            </div>
            <div className="rcp-chats">
              {CHATS.map((c, i) => {
                const s = i === 0 ? status : c.status;
                return (
                  <div key={c.title} className={`rcp-chat ${i === 0 ? "is-on" : ""}`}>
                    <PalAvatar look={CAST[c.key].look} status={s} size={42} />
                    <span className="rcp-chat-text">
                      <span className="rcp-chat-top">
                        <b>{c.title}</b>
                        <time>{c.time}</time>
                      </span>
                      <span className="rcp-chat-line">
                        {CAST[c.key].name}
                        {s === "waiting" ? " · Needs you" : ""}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </aside>

          <section className="rcp-main">
            <div className="rcp-head">
              <span className="rcp-pill">
                <PalAvatar look={juniper.look} status={status} size={26} />
                <b>Juniper</b>
                {status !== "idle" && (
                  <>
                    <i className={`rcp-dot ${DOT[status]}`} />
                    <span>Waiting for you</span>
                  </>
                )}
              </span>
              <span className="rcp-tools">
                <span className="rcp-quiet">New chat</span>
                <span className="rcp-quiet">Pause</span>
              </span>
            </div>

            <div className="rcp-scroll">
              <div className="rcp-thread">
                <div className="rcp-user">
                  <span>Dana asked if we can move Thursday&apos;s call. Reply that 3pm works and suggest Friday as a backup.</span>
                </div>
                <div className="rcp-act">
                  <i /> <b>Reading email</b> <span>From Dana Whitfield: “Thursday call?”</span>
                </div>
                <div className="rcp-act">
                  <i /> <b>Checking your calendar</b> <span>Thursday 3pm is free · Friday 10am is free</span>
                </div>
                <div className="rcp-palmsg">
                  <div className="rcp-bubble">
                    <p>I drafted a reply in your voice. Here it is:</p>
                    <p>Hi Dana, 3pm Thursday works for me. If that slips, Friday at 10am is open too. Best, Sam</p>
                  </div>
                </div>

                {outcome === "pending" ? (
                  <div className="rcp-card">
                    <div className="rcp-card-head">
                      <i /> <span>Needs your approval</span>
                    </div>
                    <div className="rcp-card-body">
                      <b>Send email to Dana Whitfield</b>
                      <p>Subject: Re: Thursday call? Hi Dana, 3pm Thursday works for me. If that slips, Friday at 10am is open too.</p>
                      <div className="rcp-actions">
                        <button type="button" className="rcp-btn rcp-btn-primary" onClick={() => setOutcome("approved")}>
                          Approve
                        </button>
                        <button type="button" className="rcp-btn rcp-btn-secondary" onClick={() => setOutcome("denied")}>
                          Deny
                        </button>
                        <button
                          type="button"
                          className="rcp-btn rcp-quiet rcp-always"
                          onClick={() => setOutcome("always")}
                          title="Adds a rule: always allow when it wants to send an email"
                        >
                          Always allow
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="rcp-done">
                      <span className={outcome === "denied" ? "is-no" : "is-yes"}>{outcome === "denied" ? "✕" : "✓"}</span>
                      <span className="rcp-done-title">Send email to Dana Whitfield</span>
                      <em>{outcome === "denied" ? "denied" : "approved"}</em>
                    </div>
                    <div className="rcp-palmsg rcp-new">
                      <div className="rcp-bubble">
                        <p>
                          {outcome === "denied"
                            ? "Okay, I won't send it. Tell me what to change and I'll draft it again."
                            : outcome === "always"
                              ? "Sent. I've added a rule, so I'll send emails like this without asking from now on."
                              : "Sent. I'll let you know when Dana replies."}
                        </p>
                      </div>
                    </div>
                    <button type="button" className="rcp-replay" onClick={() => setOutcome("pending")}>
                      Show the card again
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="rcp-foot">
              <div className="rcp-composer">
                <span>Message Juniper…</span>
                <span className="rcp-send">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.25">
                    <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
