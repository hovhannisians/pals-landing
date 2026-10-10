"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { ArrowUp, Check, Clock, Download, EyeOff, FileCode2, FileSpreadsheet, FileText, Folder, Globe, Lock, Search, Trash2 } from "lucide-react";
import PalAvatar from "@/components/PalAvatar";
import { CAST } from "@/lib/cast";
import { useAutoScene } from "@/lib/useScene";

// The features page's own visuals: screens from the Pals app the homepage doesn't show (the rule editor, saved logins,
// the apps directory, the routine editor, a channel, a skill, the workspace files). Each plays a short scene of someone
// using it, by itself while it's on screen, and rests on its finished state when it isn't.

type AutoScene = ReturnType<typeof useAutoScene>;

/** A visual's frame: its scene plays by itself while it's on screen. */
function Frame({ scene, className, children }: { scene: AutoScene; className: string; children: ReactNode }) {
  return (
    <div ref={scene.ref} className={`surface fv ${className} ${scene.playing ? "is-playing" : ""}`} aria-hidden>
      {children}
    </div>
  );
}

/** Text that types itself in: shows the first `upTo` characters, with a caret while it's still typing. */
function Typed({ text, upTo, caret = true, placeholder }: { text: string; upTo: number; caret?: boolean; placeholder?: string }) {
  const shown = text.slice(0, upTo);
  if (!shown && placeholder) return <span className="fv-ph">{placeholder}</span>;
  return (
    <span className="fv-typed">
      {shown}
      {caret && upTo < text.length && <i className="fv-caret" />}
    </span>
  );
}

type Decision = "Allow" | "Ask first" | "Never";
const PILL: Record<Decision, string> = { Allow: "rule-allow", "Ask first": "rule-ask", Never: "rule-never" };

/* Rules for all pals: type a new rule, pick Ask first, add it, and it joins the list. */
export function RuleEditor() {
  const scene = useAutoScene(8, 650);
  const s = scene.step;
  const action = "post in Slack";
  const typed = [0, 4, 8, 13, 13, 13, 13, 0][s];
  const decision: Decision = s >= 4 && s < 7 ? "Ask first" : "Allow";
  const added = s >= 6;
  return (
    <Frame scene={scene} className="fv-rules">
      <div className="fv-head">
        <div className="eyebrow">Approvals</div>
        <h3>Rules for all pals</h3>
        <p>These apply to every pal, on top of each pal&apos;s own rules.</p>
      </div>
      <div className="fv-rule-new">
        <span>When it wants to</span>
        <span className={`fv-field fv-grow ${s >= 1 && s <= 3 ? "is-focus" : ""}`}>
          <Typed text={action} upTo={typed} placeholder="send a message" />
        </span>
        <span>it should</span>
        <span className="fv-seg">
          {(["Allow", "Ask first", "Never"] as Decision[]).map((d) => (
            <span key={d} className={decision === d ? "is-on" : undefined}>
              {d}
            </span>
          ))}
        </span>
        <span className={`btn btn-primary fv-add ${s === 5 ? "is-pressed" : ""}`}>Add rule</span>
      </div>
      <div className="fv-list">
        {added && (
          <div className="fv-row fv-row-new" key="new">
            <span>When it wants to {action}</span>
            <span className={`rule-pill ${PILL["Ask first"]}`}>Ask first</span>
          </div>
        )}
        {(
          [
            ["reply to an email", "Ask first"],
            ["search the web", "Allow"],
            ["pay for anything", "Never"],
          ] as [string, Decision][]
        ).map(([a, d]) => (
          <div key={a} className="fv-row">
            <span>When it wants to {a}</span>
            <span className={`rule-pill ${PILL[d]}`}>{d}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* Saved logins: add one, save it, and a pal signs in with it without ever seeing it. */
export function SavedLogins() {
  const scene = useAutoScene(8, 650);
  const s = scene.step;
  const site = "airbnb.com";
  const user = "sam@hey.com";
  const saved = s >= 5;
  const used = s >= 6;
  const rows: [string, string, string][] = [
    ["github.com", "sam@hey.com", "Used 2 days ago"],
    ["united.com", "sam.rivera", "Used today"],
  ];
  return (
    <Frame scene={scene} className="fv-vault">
      <div className="fv-head">
        <div className="eyebrow">Passwords</div>
        <h3>Saved logins</h3>
        <p>Pals types these into the page itself. The model never sees them.</p>
      </div>
      <div className="fv-vault-new">
        <span className={`fv-field ${s === 1 ? "is-focus" : ""}`}>
          <Typed text={saved ? "" : site} upTo={s >= 1 ? 10 : 0} placeholder="Site, e.g. github.com" />
        </span>
        <span className={`fv-field ${s === 2 ? "is-focus" : ""}`}>
          <Typed text={saved ? "" : user} upTo={s >= 2 ? 11 : 0} placeholder="Username or email" />
        </span>
        <span className={`fv-field ${s === 3 ? "is-focus" : ""}`}>
          {s >= 3 && !saved ? (
            <span className="fv-dots">
              {Array.from({ length: 10 }, (_, i) => (
                <i key={i} style={{ animationDelay: `${i * 40}ms` }} />
              ))}
            </span>
          ) : (
            <span className="fv-ph">
              <Lock size={12} strokeWidth={1.75} /> Password
            </span>
          )}
        </span>
        <span className={`btn btn-primary fv-add ${s === 4 ? "is-pressed" : ""}`}>Save</span>
      </div>
      <div className="fv-list">
        {saved && (
          <div className={`fv-row fv-login fv-row-new ${used ? "is-used" : ""}`} key="new">
            <span className="fv-site">
              <Globe size={14} strokeWidth={1.5} />
            </span>
            <span className="fv-login-text">
              <b>{site}</b>
              <span>{user}</span>
            </span>
            <span className="fv-secret">
              ••••••••••
              <EyeOff size={13} strokeWidth={1.5} />
            </span>
            {used ? (
              <span className="fv-used fv-used-now" key="used">
                <PalAvatar look={CAST.scout.look} size={16} /> Scout signed in
              </span>
            ) : (
              <span className="fv-used">Just saved</span>
            )}
          </div>
        )}
        {rows.map(([site, user, when]) => (
          <div key={site} className="fv-row fv-login">
            <span className="fv-site">
              <Globe size={14} strokeWidth={1.5} />
            </span>
            <span className="fv-login-text">
              <b>{site}</b>
              <span>{user}</span>
            </span>
            <span className="fv-secret">
              ••••••••••
              <EyeOff size={13} strokeWidth={1.5} />
            </span>
            <span className="fv-used">{when}</span>
            <Trash2 size={14} strokeWidth={1.5} className="fv-trash" />
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* The apps directory: search for Slack, connect it, and it joins your connected apps. */
const DIRECTORY = [
  { name: "Gmail", slug: "gmail", glyph: "M", color: "#EA4335", tools: 61, connected: true },
  { name: "Google Calendar", slug: "googlecalendar", glyph: "31", color: "#4285F4", tools: 44, connected: true },
  { name: "Slack", slug: "slack", glyph: "#", color: "#611F69", tools: 132, connected: false },
  { name: "Notion", slug: "notion", glyph: "N", color: "#0F0F0F", tools: 39, connected: false },
  { name: "GitHub", slug: "github", glyph: "GH", color: "#24292F", tools: 812, connected: true },
  { name: "Linear", slug: "linear", glyph: "L", color: "#5E6AD2", tools: 28, connected: false },
];

function AppLogo({ app }: { app: (typeof DIRECTORY)[number] }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span>{app.glyph}</span>;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`https://logos.composio.dev/api/${app.slug}`} alt="" width={24} height={24} loading="lazy" onError={() => setFailed(true)} />
  );
}

export function AppsDirectory() {
  const scene = useAutoScene(8, 700);
  const s = scene.step;
  const query = ["", "S", "Sla", "Sla", "Sla", "Sla", "", ""][s];
  const slack: "idle" | "pressed" | "connecting" | "on" = s < 3 ? "idle" : s === 3 ? "pressed" : s === 4 ? "connecting" : "on";
  const apps = DIRECTORY.filter((a) => !query || a.name.toLowerCase().startsWith(query.toLowerCase()));
  return (
    <Frame scene={scene} className="fv-apps">
      <div className="fv-apps-top">
        <span className={`fv-field fv-search ${query ? "is-focus" : ""}`}>
          <Search size={13} strokeWidth={1.75} />
          {query ? <span className="fv-typed">{query}</span> : <span className="fv-ph">Search 1,500 apps</span>}
        </span>
        <span className="fv-chips">
          <span className="is-on">All apps</span>
          <span>Connected</span>
          <span>Instant Apps</span>
        </span>
      </div>
      <div className="fv-app-grid">
        {apps.map((a) => {
          const on = a.name === "Slack" ? slack === "on" : a.connected;
          return (
            <div key={a.name} className={`fv-app ${a.name === "Slack" && slack !== "idle" ? "is-focus" : ""}`}>
              <span className="fv-app-icon" style={{ color: a.color }}>
                <AppLogo app={a} />
              </span>
              <span className="fv-app-text">
                <b>{a.name}</b>
                <span>{a.tools} tools</span>
              </span>
              {on ? (
                <span className="fv-connected" key="on">
                  <Check size={12} strokeWidth={2.5} /> Connected
                </span>
              ) : a.name === "Slack" && slack === "connecting" ? (
                <span className="fv-connecting">
                  <i /> Connecting
                </span>
              ) : (
                <span className={`btn btn-secondary fv-connect ${a.name === "Slack" && slack === "pressed" ? "is-pressed" : ""}`}>Connect</span>
              )}
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

/* The routine editor: write the instruction, try presets, add it, and see when it runs next. */
const PRESETS = [
  { label: "Every morning", cron: "0 8 * * *", next: "Tomorrow 8:00 AM" },
  { label: "Weekdays 9am", cron: "0 9 * * 1-5", next: "Mon 9:00 AM" },
  { label: "Every hour", cron: "0 * * * *", next: "In 23 minutes" },
  { label: "Mondays", cron: "0 9 * * 1", next: "Mon 9:00 AM" },
];
const INSTRUCTION = "Brief me on my inbox and calendar. Only mention emails that need a reply from me.";

export function RoutineEditor() {
  const scene = useAutoScene(8, 650);
  const s = scene.step;
  const typed = [0, 28, 56, INSTRUCTION.length, INSTRUCTION.length, INSTRUCTION.length, 0, 0][s];
  const preset = s >= 4 ? 1 : s >= 3 ? 0 : -1;
  const added = s >= 6;
  const p = PRESETS[preset < 0 ? 1 : preset];
  return (
    <Frame scene={scene} className="fv-routine">
      <div className="fv-head">
        <div className="eyebrow">Automation</div>
        <h3>Routines</h3>
      </div>
      {added && (
        <div className="fv-row fv-routine-row fv-row-new" key="row">
          <i className="fv-on" />
          <span className="fv-login-text">
            <b>Brief me on my inbox and calendar</b>
            <span>Weekdays 9am · Next Mon 9:00 AM</span>
          </span>
          <span className="fv-quiet">Run now</span>
        </div>
      )}
      <div className="fv-routine-box">
        <span className="fv-label">What to do each time</span>
        <div className={`fv-textarea ${s >= 1 && s <= 2 ? "is-focus" : ""}`}>
          <Typed text={added ? "" : INSTRUCTION} upTo={typed} placeholder="Every weekday at 8, brief me on…" />
        </div>
        <div className="fv-presets">
          {PRESETS.map((x, i) => (
            <span key={x.label} className={i === preset && !added ? "is-on" : undefined}>
              {x.label}
            </span>
          ))}
        </div>
        <div className="fv-routine-foot">
          <span className="fv-field fv-cron">{preset >= 0 && !added ? p.cron : "0 9 * * 1-5"}</span>
          {preset >= 0 && !added && (
            <span className="fv-next" key={p.next}>
              <Clock size={13} strokeWidth={1.75} /> Next {p.next}
            </span>
          )}
          <span className={`btn btn-primary fv-add ${s === 5 ? "is-pressed" : ""}`}>Add routine</span>
        </div>
      </div>
    </Frame>
  );
}

/* A channel: you post once, the lead hands out the work, the others answer as they finish. */
export function ChannelChat() {
  const scene = useAutoScene(8, 800);
  const s = scene.step;
  const atlas = CAST.atlas;
  const scout = CAST.scout;
  const juniper = CAST.juniper;
  const typing = (who: string) => (
    <div className="fv-cmsg fv-cmsg-typing" key={`t-${who}`}>
      <PalAvatar look={CAST[who as "atlas"].look} status="working" size={26} />
      <div>
        <i />
        <i />
        <i />
      </div>
    </div>
  );
  return (
    <Frame scene={scene} className="fv-channel">
      <div className="fv-channel-head">
        <b># weekend-trip</b>
        <span className="fv-members">
          <PalAvatar look={atlas.look} status={s === 1 ? "working" : "idle"} size={22} />
          <PalAvatar look={scout.look} status={s >= 3 && s < 5 ? "working" : "idle"} size={22} />
          <PalAvatar look={juniper.look} status={s >= 5 && s < 7 ? "working" : s >= 7 ? "waiting" : "idle"} size={22} />
        </span>
        <span className="fv-lead">Lead: Atlas</span>
      </div>
      <div className="fv-channel-body">
        {s >= 0 && (
          <div className="fv-cmsg fv-cmsg-user" key="u">
            Plan a weekend in Lisbon for the four of us, under €600 each.
          </div>
        )}
        {s === 1 && typing("atlas")}
        {s >= 2 && (
          <div className="fv-cmsg" key="a">
            <PalAvatar look={atlas.look} size={26} />
            <div>
              <b>Atlas</b>
              <p>On it. Scout, find three places to stay in Alfama. Juniper, check everyone&apos;s calendars for the 16th to 19th.</p>
            </div>
          </div>
        )}
        {(s === 3 || s === 4) && typing("scout")}
        {s >= 5 && (
          <div className="fv-cmsg" key="s">
            <PalAvatar look={scout.look} size={26} />
            <div>
              <b>Scout</b>
              <p>Three options, all under €140 a night. Casa Amora has the best reviews.</p>
            </div>
          </div>
        )}
        {s === 6 && typing("juniper")}
        {s >= 7 && (
          <div className="fv-cmsg" key="j">
            <PalAvatar look={juniper.look} status="waiting" size={26} />
            <div>
              <b>Juniper</b>
              <p>All four are free. Want me to send the invite?</p>
            </div>
          </div>
        )}
      </div>
      <div className="fv-composer">
        Message #weekend-trip…
        <span>
          <ArrowUp size={14} strokeWidth={2.25} />
        </span>
      </div>
    </Frame>
  );
}

/* A skill: the pal writes down how it did the job, step by step, and saves it for next time. */
const SKILL = [
  "Open expenses.acme.com and sign in with the saved password.",
  "Choose New report, then Travel or Meals from the receipt.",
  "Attach the receipt and copy the total and date exactly.",
  "Ask Sam before submitting anything over €200.",
];

export function SkillDoc() {
  const scene = useAutoScene(7, 750);
  const s = scene.step;
  const lines = Math.min(s, SKILL.length);
  const saved = s >= 6;
  return (
    <Frame scene={scene} className="fv-skill">
      <div className="fv-head">
        <div className="fv-skill-top">
          <div className="eyebrow">Repeatable know-how</div>
          <span className={`fv-skill-state ${saved ? "is-saved" : ""}`} key={saved ? "saved" : "writing"}>
            {saved ? (
              <>
                <Check size={11} strokeWidth={2.5} /> Saved
              </>
            ) : (
              <>
                <PalAvatar look={CAST.opal.look} status="working" size={14} /> Opal is writing
              </>
            )}
          </span>
        </div>
        <h3>File an expense report</h3>
        <p>Use when Sam forwards a receipt.</p>
      </div>
      <ol className="fv-steps">
        {SKILL.slice(0, lines).map((l, i) => (
          <li key={l} className={i === lines - 1 && !saved ? "is-new" : undefined}>
            {l}
          </li>
        ))}
        {!saved && lines < SKILL.length && <li className="fv-step-ghost" />}
      </ol>
      <div className="fv-skill-foot">
        <span className="eyebrow">Learned from</span>
        <span>3 reports in September</span>
        <span className="fv-skill-pal">
          <PalAvatar look={CAST.opal.look} size={20} /> Opal
        </span>
      </div>
    </Frame>
  );
}

/* The workspace: the script installs what it needs, runs, and the files it makes appear. */
const FILES = [
  { name: "report.pdf", size: "182 KB", icon: FileText, at: 5 },
  { name: "charts", size: "4 files", icon: Folder, at: 4 },
  { name: "report.py", size: "3 KB", icon: FileCode2, at: 1 },
  { name: "transactions.csv", size: "1.1 MB", icon: FileSpreadsheet, at: 0 },
  { name: "requirements.txt", size: "120 B", icon: FileText, at: 0 },
];
const TERM = ["$ python report.py", "Installing pandas, matplotlib…", "Reading transactions.csv", "Built 4 charts", "Saved report.pdf"];

export function WorkspaceFiles() {
  const scene = useAutoScene(7, 750);
  const s = scene.step;
  const termLine = TERM[Math.min(Math.max(s - 1, 0), TERM.length - 1)];
  const done = s >= 6;
  return (
    <Frame scene={scene} className="fv-files">
      <div className="fv-files-head">
        <PalAvatar look={CAST.bix.look} status={done ? "idle" : "working"} size={24} />
        <b>Bix&apos;s workspace</b>
        <span className="fv-where">
          <Globe size={12} strokeWidth={1.75} /> Cloud
        </span>
      </div>
      <div className="fv-list">
        {FILES.filter((f) => s >= f.at).map((f) => (
          <div key={f.name} className={`fv-row fv-file ${f.at > 0 && s === f.at ? "fv-row-new" : ""}`}>
            <f.icon size={15} strokeWidth={1.5} />
            <span className="fv-file-name">{f.name}</span>
            {f.name === "report.pdf" && <span className="fv-new">New</span>}
            <span className="fv-file-size">{f.size}</span>
            <Download size={14} strokeWidth={1.75} className="fv-dl" />
          </div>
        ))}
      </div>
      <div className="fv-term">
        <span>~/workspace</span>{" "}
        <span key={termLine} className="fv-term-line">
          {done ? "Saved report.pdf" : termLine}
        </span>
      </div>
    </Frame>
  );
}
