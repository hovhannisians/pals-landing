import { Check } from "lucide-react";
import PalAvatar from "@/components/PalAvatar";
import { CAST, type CastKey } from "@/lib/cast";

// A day of notifications, drawn like the mobile app's Notifications screen.
const DAY: { time: string; pal: CastKey; title: string; body: string; badge: "done" | "asks" | "approval" }[] = [
  { time: "7:58 AM", pal: "juniper", title: "Juniper finished", body: "Morning brief: three emails need you today", badge: "done" },
  { time: "10:14 AM", pal: "opal", title: "Opal finished", body: "Statement filed. One $42 charge doesn’t match anything you’ve bought", badge: "done" },
  { time: "12:30 PM", pal: "atlas", title: "Atlas has a question", body: "Friday flights to Lisbon dropped to €184. Hold a seat?", badge: "asks" },
  { time: "3:05 PM", pal: "bix", title: "Bix sent report.pdf", body: "The numbers are in. Four charts, attached", badge: "done" },
  { time: "6:40 PM", pal: "juniper", title: "Juniper needs your approval", body: "Send email to the team about the venue", badge: "approval" },
];

export default function DayNotes() {
  return (
    <div className="notes">
      <div className="eyebrow notes-label">Today</div>
      <ul className="surface notes-list">
        {DAY.map((d) => (
          <li key={d.time}>
            <span className="notes-face">
              <PalAvatar look={CAST[d.pal].look} status={d.badge === "done" ? "idle" : "waiting"} size={44} />
              <i className={`notes-badge is-${d.badge}`}>{d.badge === "done" ? <Check size={9} strokeWidth={3.5} /> : null}</i>
            </span>
            <span className="notes-text">
              <b>{d.title}</b>
              <span>{d.body}</span>
            </span>
            <time>{d.time}</time>
          </li>
        ))}
      </ul>
    </div>
  );
}
