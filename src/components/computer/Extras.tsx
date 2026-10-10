"use client";

import { Check, FileText } from "lucide-react";
import PalAvatar from "@/components/PalAvatar";
import { CAST } from "@/lib/cast";
import { useAutoScene } from "@/lib/useScene";

/* The desktop app, with access to your computer: the pal asks before every command it runs there. */
export function LocalApproval() {
  const scene = useAutoScene(5, 1100, 4);
  const s = scene.step;
  const approved = s >= 3;
  return (
    <div ref={scene.ref} className={`surface lapp ${scene.playing ? "is-playing" : ""}`} aria-hidden>
      <div className="lapp-msg">
        <PalAvatar look={CAST.bix.look} status={approved ? "working" : s >= 1 ? "waiting" : "working"} size={28} />
        <div className="lapp-bubble">The interview is on your Mac, not my computer. I&apos;ll convert it there.</div>
      </div>
      {s >= 1 && !approved && (
        <div className="lapp-card" key="card">
          <div className="lapp-head">
            <i /> <span className="eyebrow">Needs your approval</span>
            <span className="lapp-where">On your computer</span>
          </div>
          <div className="lapp-body">
            <b>Run a command on your computer</b>
            <code>ffmpeg -i ~/Desktop/interview.mov ~/Desktop/interview.mp3</code>
            <div className="lapp-actions">
              <span className={`lapp-btn lapp-main ${s === 2 ? "is-pressed" : ""}`}>Approve</span>
              <span className="lapp-btn">Deny</span>
            </div>
          </div>
        </div>
      )}
      {approved && (
        <>
          <div className="lapp-done" key="done">
            <Check size={14} strokeWidth={2} /> <span>Run a command on your computer</span>
            <em>Approved</em>
          </div>
          {s >= 4 && (
            <div className="lapp-msg" key="sent">
              <PalAvatar look={CAST.bix.look} size={28} />
              <div className="lapp-bubble">
                Done. <span className="lapp-file">interview.mp3</span> is on your Desktop.
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* A session in the pal's workspace: it installs what it needs, runs the script, and keeps the result. */
const LINES = [
  { c: "$ pip install yt-dlp pandas", out: "Successfully installed yt-dlp pandas" },
  { c: "$ python fetch_prices.py --route BER-LIS", out: "30 days of fares saved to fares.csv" },
  { c: "$ python chart.py fares.csv", out: "Saved lisbon-fares.png" },
];

export function Terminal() {
  const scene = useAutoScene(7, 900, 4);
  const s = scene.step;
  return (
    <div ref={scene.ref} className={`surface tsess ${scene.playing ? "is-playing" : ""}`} aria-hidden>
      <div className="tsess-bar">
        <span className="mb-lights">
          <i />
          <i />
          <i />
        </span>
        <span>atlas@workspace ~</span>
      </div>
      <div className="tsess-body">
        {LINES.map((l, i) => {
          const shownCmd = s >= i * 2;
          const shownOut = s >= i * 2 + 1;
          return (
            <div key={l.c}>
              {shownCmd && <div className={`tsess-cmd ${s === i * 2 ? "is-typing" : ""}`}>{l.c}</div>}
              {shownOut && <div className="tsess-out">{l.out}</div>}
            </div>
          );
        })}
        {s >= 6 ? (
          <div className="tsess-file">
            <FileText size={14} strokeWidth={1.5} /> lisbon-fares.png <span>sent to your chat</span>
          </div>
        ) : (
          <span className="tsess-caret" />
        )}
      </div>
    </div>
  );
}
