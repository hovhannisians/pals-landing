"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useScene, type Scene } from "@/lib/useScene";
import { Check, Clock, Download, FileText, Lock, MousePointer2, Zap } from "lucide-react";
import PalAvatar from "@/components/PalAvatar";
import { CAST } from "@/lib/cast";

/** `bare` drops the caption, for pages that tell the story beside the scene. */
type SceneProps = { bare?: boolean };

function Card({ className, label, title, body, children, scene, bare = false }: { className: string; label: string; title: string; body: string; children: ReactNode; scene: Scene; bare?: boolean }) {
  return (
    <article className={`feat surface ${className} ${bare ? "feat-bare" : ""} ${scene.playing ? "is-playing" : ""}`} {...scene.bind}>
      <div className="feat-scene dot-grid" aria-hidden>
        {children}
      </div>
      {!bare && (
        <div className="feat-text">
          <div className="eyebrow">{label}</div>
          <h3 className="text-h2">{title}</h3>
          <p>{body}</p>
        </div>
      )}
    </article>
  );
}

/** The app's activity row: icon, mono capitals, then the detail in a lighter mono. */
function Activity({ icon, label, detail }: { icon: ReactNode; label: string; detail: string }) {
  return (
    <div className="act">
      {icon}
      <b>{label}</b>
      <span>{detail}</span>
    </div>
  );
}

/* 1. Saved passwords: open the login page, ask, fill without seeing it, sign in. */
export function SignIn({ bare }: SceneProps) {
  const scene = useScene(7, 1100);
  const s = scene.step;
  const scout = CAST.scout;
  const typedEmail = s >= 1;
  const asked = s >= 2 && s < 4;
  const approved = s >= 3;
  const filled = s >= 4;
  const signedIn = s >= 6;
  return (
    <Card
      className="feat-signin"
      scene={scene}
      bare={bare}
      label="Saved passwords"
      title="Signs in without ever seeing your password"
      body="Passwords are encrypted with a key in your Keychain and typed straight into the page by Pals. The model never reads them, and signing in asks you first."
    >
      <div className="mini-browser">
        <div className="mb-bar">
          <span className="mb-lights">
            <i />
            <i />
            <i />
          </span>
          <span className="mb-url">
            <Lock size={10} strokeWidth={2.2} /> {signedIn ? "united.com/my-trips" : "united.com/login"}
          </span>
          <span className="mb-live">
            <i /> Live
          </span>
        </div>
        <div className="mb-page">
          {signedIn ? (
            <div className="mb-trips" key="trips">
              <span className="mb-ok">
                <Check size={14} strokeWidth={2.5} />
              </span>
              <b>Welcome back, Sam</b>
              <span>2 upcoming trips · BER → LIS, Fri 7:40</span>
            </div>
          ) : (
            <div className="mb-form" key="form">
              <b>Sign in to MileagePlus</b>
              <label>
                <span>Email</span>
                <em className={typedEmail ? "is-typed" : ""}>{typedEmail ? "sam@hey.com" : ""}</em>
              </label>
              <label className={filled ? "is-secret" : ""}>
                <span>Password</span>
                <em>
                  {Array.from({ length: 12 }, (_, i) => (
                    <i key={i} style={{ transitionDelay: `${filled ? i * 45 : 0}ms` }} className={filled ? "on" : ""} />
                  ))}
                </em>
              </label>
              <span className={`mb-submit ${s === 5 ? "is-pressed" : ""}`}>Sign in</span>
              <span className={`mb-cursor step-${Math.min(s, 5)}`}>
                <MousePointer2 size={16} strokeWidth={1.5} fill="#0f0f0f" color="#fff" />
              </span>
            </div>
          )}
        </div>
      </div>

      <div className={`mini-card ${asked ? "is-up" : ""}`}>
        <div className="mc-head">
          <i className="dot-warn" /> <span className="eyebrow">Needs your approval</span>
        </div>
        <div className="mc-body">
          <b>Sign in to united.com with your saved password</b>
          <span className={`mc-btn ${approved ? "is-pressed" : ""}`}>{approved ? "Approved" : "Approve"}</span>
        </div>
      </div>

      <div className="scene-foot">
        <PalAvatar look={scout.look} status={signedIn ? "idle" : asked && !approved ? "waiting" : "working"} size={22} />
        <Activity
          icon={<Lock size={13} strokeWidth={1.5} />}
          label={signedIn ? "Signed in" : filled ? "Signing in" : asked ? "Waiting for you" : "Opening"}
          detail={signedIn ? "united.com · password never shown" : "united.com"}
        />
      </div>
    </Card>
  );
}

/* 2. Apps: one pal working through your apps in turn. */
const APPS = [
  { name: "Gmail", slug: "gmail", glyph: "M", color: "#EA4335", label: "Reading email", detail: "3 unread from Dana Whitfield" },
  { name: "Calendar", slug: "googlecalendar", glyph: "31", color: "#4285F4", label: "Checking your calendar", detail: "Thursday 3pm is free" },
  { name: "Slack", slug: "slack", glyph: "#", color: "#611F69", label: "Reading Slack", detail: "#launch · 12 new messages" },
  { name: "Notion", slug: "notion", glyph: "N", color: "#0F0F0F", label: "Searching Notion", detail: "“Q3 planning” doc" },
  { name: "GitHub", slug: "github", glyph: "GH", color: "#24292F", label: "Reading issue", detail: "sam/shop #142 checkout test" },
  { name: "Drive", slug: "googledrive", glyph: "▲", color: "#0F9D58", label: "Saving to Drive", detail: "Statements / September.pdf" },
];

function AppLogo({ app }: { app: (typeof APPS)[number] }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span>{app.glyph}</span>;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`https://logos.composio.dev/api/${app.slug}`} alt="" width={28} height={28} loading="lazy" onError={() => setFailed(true)} />
  );
}

export function Apps({ bare }: SceneProps) {
  const scene = useScene(APPS.length, 1500);
  const s = scene.step;
  const app = APPS[s];
  return (
    <Card
      className="feat-apps"
      scene={scene}
      bare={bare}
      label="Connected apps"
      title="Works in 1,500 of your apps"
      body="Gmail, Calendar, Slack, Notion, GitHub and the rest. It reads on its own, and asks before it sends, posts or changes anything."
    >
      <div className="orbit">
        <svg className="orbit-ring" viewBox="0 0 240 240">
          <circle cx="120" cy="120" r="92" />
        </svg>
        {APPS.map((a, i) => {
          const angle = (i / APPS.length) * Math.PI * 2 - Math.PI / 2;
          const on = i === s;
          return (
            <span
              key={a.name}
              className={`app-tile ${on ? "is-on" : ""}`}
              style={{ left: `calc(50% + ${Math.cos(angle) * 92}px)`, top: `calc(50% + ${Math.sin(angle) * 92}px)`, ["--c" as string]: a.color }}
            >
              <span className="app-glyph"><AppLogo app={a} /></span>
            </span>
          );
        })}
        <svg className="orbit-beam" viewBox="0 0 240 240">
          {APPS.map((a, i) => {
            const angle = (i / APPS.length) * Math.PI * 2 - Math.PI / 2;
            return <line key={a.name} className={i === s ? "is-on" : ""} x1="120" y1="120" x2={120 + Math.cos(angle) * 74} y2={120 + Math.sin(angle) * 74} />;
          })}
        </svg>
        <span className="orbit-core">
          <PalAvatar look={CAST.juniper.look} status={scene.playing ? "working" : "idle"} size={56} />
        </span>
      </div>
      <div className="scene-foot">
        <span key={s} className="scene-swap">
          <Activity icon={<span className="act-glyph" style={{ color: app.color }}><AppLogo app={app} /></span>} label={app.label} detail={app.detail} />
        </span>
      </div>
    </Card>
  );
}

/* 3. Routines and triggers: the clock reaches 9:00, then the bank emails. */
export function Schedule({ bare }: SceneProps) {
  const scene = useScene(7, 1200);
  const s = scene.step;
  const time = ["8:58", "8:59", "9:00", "9:00", "9:14", "9:14", "9:15"][s];
  const routineRunning = s === 2;
  const brief = s >= 3 && s < 5;
  const mail = s >= 4;
  const triggerRunning = s === 5;
  const filed = s >= 6;
  return (
    <Card
      className="feat-time"
      scene={scene}
      bare={bare}
      label="Routines and triggers"
      title="On a schedule, or on a signal"
      body="A brief every weekday at 9. A nudge the moment your bank emails. Each run lands in the pal's chat with a notification."
    >
      <div className="sched">
        <div className="sched-clock">
          <Clock size={13} strokeWidth={1.75} /> <span key={time}>{time} AM</span>
        </div>
        <div className={`sched-row ${routineRunning ? "is-running" : ""} ${s >= 3 ? "is-done" : ""}`}>
          <i />
          <div>
            <b>Brief me on my inbox and calendar</b>
            <span>Weekdays 9am</span>
          </div>
          <em>{routineRunning ? "Running" : s >= 3 ? "Done" : "Next 9:00"}</em>
        </div>
        <div className={`sched-row ${triggerRunning ? "is-running" : ""} ${filed ? "is-done" : ""}`}>
          <i />
          <div>
            <b>When my bank emails</b>
            <span>Gmail · new message</span>
          </div>
          <em>{triggerRunning ? "Running" : filed ? "Done" : "Listening"}</em>
          <span className={`sched-mail ${mail && !filed ? "is-in" : ""}`}>
            <Zap size={11} strokeWidth={2} /> Bank of Bits: Your statement is ready
          </span>
        </div>
      </div>
      <div className={`toast ${brief || filed ? "is-up" : ""}`}>
        <span className="toast-face">
          <PalAvatar look={(filed ? CAST.opal : CAST.juniper).look} size={30} />
          <i>
            <Check size={8} strokeWidth={3.5} />
          </i>
        </span>
        <span className="toast-text">
          <b>{filed ? "Opal finished" : "Juniper finished"}</b>
          <span>{filed ? "Statement filed. One charge looks odd" : "Your morning brief is ready"}</span>
        </span>
        <time>now</time>
      </div>
    </Card>
  );
}

/* 4. Pals working together: Scout hands its research to Juniper. */
export function Handoff({ bare }: SceneProps) {
  const scene = useScene(6, 1300);
  const s = scene.step;
  const scoutStatus = s < 2 ? "working" : "idle";
  const juniperStatus = s < 3 ? "idle" : s < 5 ? "working" : "waiting";
  return (
    <Card
      className="feat-team"
      scene={scene}
      bare={bare}
      label="Pals working together"
      title="A team, not one assistant"
      body="Pals pass work to each other. Scout researches, Juniper writes the email, and you only hear about it when it's ready."
    >
      <div className="team">
        <svg className="team-path" viewBox="0 0 300 120" preserveAspectRatio="none">
          <path d="M50 78 C 110 8, 190 8, 250 78" />
        </svg>
        <span className={`team-doc ${s >= 2 && s < 4 ? "is-moving" : ""} ${s >= 4 ? "is-there" : ""}`}>
          <FileText size={11} strokeWidth={1.75} /> venues.md
        </span>
        <div className="team-pal">
          <PalAvatar look={CAST.scout.look} status={scoutStatus} size={50} />
          <b>Scout</b>
          <span key={scoutStatus}>{s < 2 ? "Researching 3 venues" : "Handed to Juniper"}</span>
        </div>
        <div className="team-pal">
          <PalAvatar look={CAST.juniper.look} status={juniperStatus} size={50} />
          <b>Juniper</b>
          <span key={juniperStatus} className={juniperStatus === "waiting" ? "is-warn" : ""}>
            {juniperStatus === "idle" ? "Ready" : juniperStatus === "working" ? "Drafting the email" : "Needs your approval"}
          </span>
        </div>
      </div>
    </Card>
  );
}

/* 5. Memory: something you mention becomes something it knows. */
export function Memory({ bare }: SceneProps) {
  const scene = useScene(5, 1400);
  const s = scene.step;
  return (
    <Card
      className="feat-memory"
      scene={scene}
      bare={bare}
      label="Memory and skills"
      title="It remembers you"
      body="Mention something once and it sticks. Pals keep notes on how you like things, and save skills for tasks they repeat."
    >
      <div className="mem">
        <div className={`mem-user ${s >= 0 ? "is-in" : ""}`}>I&apos;m vegetarian, by the way.</div>
        <div className={`mem-act ${s >= 1 ? "is-in" : ""}`}>
          <PalAvatar look={CAST.atlas.look} status={s === 1 ? "working" : "idle"} size={20} />
          <Activity icon={<span />} label="Remembering" detail="Vegetarian" />
        </div>
        <div className="mem-list">
          <div className="eyebrow mem-label">What it knows about you</div>
          <div className={`mem-row mem-new ${s >= 2 ? "is-in" : ""}`}>
            Vegetarian <em>New</em>
          </div>
          <div className="mem-row">Prefers aisle seats</div>
          <div className="mem-row">Dana Whitfield is their manager</div>
        </div>
      </div>
    </Card>
  );
}

/* 6. Code: a script runs on its own computer, and the result lands in your chat. */
const LINES = [
  { t: "$ python report.py", cls: "" },
  { t: "Fetched 1,284 rows from Sheets", cls: "dim" },
  { t: "Built 4 charts", cls: "dim" },
  { t: "Saved report.pdf", cls: "ok" },
];

export function Code({ bare }: SceneProps) {
  const scene = useScene(7, 900);
  const s = scene.step;
  const shown = Math.min(s + 1, LINES.length);
  const sent = s >= 5;
  return (
    <Card
      className="feat-code"
      scene={scene}
      bare={bare}
      label="Its own computer"
      title="Runs code, then sends you what it made"
      body="Each pal has a cloud computer of its own, powered by E2B. It installs what it needs, runs the script, and hands you the file."
    >
      <div className="code">
        <div className="term">
          <div className="term-bar">
            <span className="mb-lights">
              <i />
              <i />
              <i />
            </span>
            <span>bix@workspace</span>
          </div>
          <div className="term-body">
            {LINES.slice(0, shown).map((l, i) => (
              <div key={i} className={`term-line ${l.cls} ${i === shown - 1 && s < LINES.length ? "is-typing" : ""}`}>
                {l.cls === "ok" ? (
                  <>
                    <span className="ok">Saved</span> report.pdf
                  </>
                ) : (
                  l.t
                )}
              </div>
            ))}
            {s < LINES.length && <span className="term-caret" />}
          </div>
        </div>
        <div className={`code-chat ${sent ? "is-in" : ""}`}>
          <div className="code-msg">
            <PalAvatar look={CAST.bix.look} status={sent ? "idle" : "working"} size={26} />
            <div className="code-bubble">
              <p>The numbers are in. Four charts, all in here.</p>
              <span className="code-file">
                <FileText size={16} strokeWidth={1.5} />
                <span>
                  <b>report.pdf</b>
                  <em>182 KB</em>
                </span>
                <Download size={14} strokeWidth={1.75} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function Features() {
  return (
    <div className="feats">
      <SignIn />
      <Apps />
      <Schedule />
      <Handoff />
      <Memory />
      <Code />
    </div>
  );
}
