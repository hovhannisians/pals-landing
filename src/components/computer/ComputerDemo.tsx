"use client";

import { Check, Globe, Lock, MousePointer2, ShieldAlert } from "lucide-react";
import PalAvatar from "@/components/PalAvatar";
import { CAST } from "@/lib/cast";
import { useAutoScene } from "@/lib/useScene";

// A pal's Computer tab, live: Scout changes a seat on an airline site, stops at a verification step it can't do,
// you take over to type the code, hand it back, and Scout finishes. The log on the right is the chat's activity rows.

const LOG = [
  { at: 0, label: "Opening", detail: "united.com/my-trips" },
  { at: 1, label: "Reading the page", detail: "2 upcoming trips" },
  { at: 2, label: "Clicking", detail: "“Change seat” · BER → LIS" },
  { at: 4, label: "Needs you", detail: "Code sent to Sam's phone", warn: true },
  { at: 5, label: "You took over", detail: "Typing the code" },
  { at: 6, label: "Handed back", detail: "Scout carries on" },
  { at: 7, label: "Clicking", detail: "“Confirm seat 12C”" },
  { at: 8, label: "Done", detail: "Seat 12C, aisle", ok: true },
];

const SEATS = ["A", "B", "C", "", "D", "E", "F"];

export default function ComputerDemo() {
  const scene = useAutoScene(9, 1100, 4);
  const s = scene.step;
  const scout = CAST.scout;
  const verify = s === 4 || s === 5;
  const you = s === 5;
  const status = s >= 8 ? "idle" : s === 4 ? "waiting" : "working";
  const url = s <= 1 ? "united.com/my-trips" : verify ? "united.com/verify" : s >= 8 ? "united.com/my-trips/LIS" : "united.com/seats/UA941";

  return (
    <div ref={scene.ref} className={`surface cdemo ${scene.playing ? "is-playing" : ""}`} aria-label="A pal changing a seat on an airline site, with you taking over for the verification code">
      <div className="cdemo-head">
        <div>
          <div className="eyebrow">Computer</div>
          <h3>Scout&apos;s computer</h3>
        </div>
        <span className={`cdemo-take ${you ? "is-you" : ""} ${s === 4 ? "is-call" : ""}`}>{you ? "Hand back to Scout" : "Take over"}</span>
      </div>

      <div className="cdemo-body">
        <div className="cdemo-browser">
          <div className="cdemo-bar">
            <span className="mb-lights">
              <i />
              <i />
              <i />
            </span>
            <span className="cdemo-url">
              <Lock size={11} strokeWidth={2} /> {url}
            </span>
            <span className={`cdemo-live ${you ? "is-you" : ""}`}>
              <i /> {you ? "You're in control" : "Live"}
            </span>
          </div>

          <div className="cdemo-screen">
            {s <= 1 && (
              <div className="ua ua-trips" key="trips">
                <div className="ua-brand">MileagePlus</div>
                <b className="ua-h">My trips</b>
                <div className={`ua-trip ${s === 1 ? "is-read" : ""}`}>
                  <div>
                    <b>Berlin → Lisbon</b>
                    <span>Fri, Oct 17 · UA941 · Seat 23B</span>
                  </div>
                  <span className="ua-btn">Change seat</span>
                </div>
                <div className="ua-trip">
                  <div>
                    <b>Lisbon → Berlin</b>
                    <span>Sun, Oct 19 · UA940 · Seat 24E</span>
                  </div>
                  <span className="ua-btn ua-btn-ghost">Change seat</span>
                </div>
              </div>
            )}

            {(s === 2 || s === 3 || s === 6 || s === 7) && (
              <div className="ua ua-seats" key="seats">
                <b className="ua-h">Choose a seat · UA941</b>
                <div className="ua-map">
                  {[10, 11, 12, 13, 14].map((row) => (
                    <div key={row} className="ua-row">
                      <span className="ua-n">{row}</span>
                      {SEATS.map((c, i) =>
                        c ? (
                          <span
                            key={i}
                            className={`ua-seat ${(row + i) % 3 === 0 ? "is-taken" : ""} ${row === 12 && c === "C" && s >= 3 ? "is-picked" : ""}`}
                          />
                        ) : (
                          <span key={i} className="ua-aisle" />
                        ),
                      )}
                    </div>
                  ))}
                </div>
                <span className={`ua-btn ua-confirm ${s === 7 ? "is-pressed" : ""}`}>{s >= 3 ? "Confirm seat 12C" : "Select a seat"}</span>
              </div>
            )}

            {verify && (
              <div className="ua ua-verify" key="verify">
                <ShieldAlert size={22} strokeWidth={1.5} />
                <b className="ua-h">Verify it&apos;s you</b>
                <span>We sent a 6-digit code to your phone.</span>
                <div className="ua-code">
                  {Array.from({ length: 6 }, (_, i) => (
                    <span key={i} className={you ? "is-filled" : undefined} style={{ transitionDelay: `${i * 90}ms` }}>
                      {you ? "•" : ""}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {s >= 8 && (
              <div className="ua ua-done" key="done">
                <span className="ua-ok">
                  <Check size={18} strokeWidth={2.5} />
                </span>
                <b className="ua-h">Seat changed</b>
                <span>UA941 · Berlin → Lisbon · Seat 12C, aisle</span>
              </div>
            )}

            {!verify && s < 8 && (
              <span className={`cdemo-cursor at-${s}`}>
                <MousePointer2 size={18} strokeWidth={1.5} fill="#0f0f0f" color="#fff" />
                <span className="cdemo-tag">
                  <PalAvatar look={scout.look} status="working" size={14} /> Scout
                </span>
              </span>
            )}
          </div>
        </div>

        <div className="cdemo-log">
          <div className="cdemo-pal">
            <PalAvatar look={scout.look} status={status} size={30} />
            <span>
              <b>Scout</b>
              <span className={status === "waiting" ? "is-warn" : undefined}>
                {status === "waiting" ? "Waiting for you" : status === "working" ? "Changing your seat" : "Done"}
              </span>
            </span>
          </div>
          <div className="cdemo-rows">
            {LOG.filter((l) => s >= l.at).map((l) => (
              <div key={l.label + l.at} className={`cdemo-row ${l.warn ? "is-warn" : ""} ${l.ok ? "is-ok" : ""}`}>
                <i />
                <b>{l.label}</b>
                <span>{l.detail}</span>
              </div>
            ))}
          </div>
          <div className="cdemo-where">
            <Globe size={12} strokeWidth={1.75} /> Cloud computer, powered by E2B
          </div>
        </div>
      </div>
    </div>
  );
}
