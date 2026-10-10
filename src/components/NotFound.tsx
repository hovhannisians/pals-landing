"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PalAvatar from "./PalAvatar";
import { LAUNCH_CAST } from "@/lib/look";
import type { AvatarState } from "@/lib/avatar";

// 4, a pal, 4. The pal is the logo's blue octagon, looking around for the page (its eyes follow the cursor).
// Poke it and it reacts with the app's own poses, a different one each time.
const REACTIONS: AvatarState[] = ["happy", "error1", "thinking2", "happy", "error2"];

export default function NotFound() {
  const router = useRouter();
  const [pokes, setPokes] = useState(0);
  const [reacting, setReacting] = useState(false);

  const poke = () => {
    setPokes((p) => p + 1);
    setReacting(true);
    setTimeout(() => setReacting(false), 1600);
  };

  return (
    <section className="nf">
      <h1 className="nf-code" aria-label="404">
        <span aria-hidden>4</span>
        <button type="button" className="nf-zero" onClick={poke} aria-label="Poke the pal" key={pokes}>
          <PalAvatar look={LAUNCH_CAST[2]} state={reacting ? REACTIONS[(pokes - 1) % REACTIONS.length] : "looking"} size={200} />
        </button>
        <span aria-hidden>4</span>
      </h1>
      <p className="nf-line">This page wandered off.</p>
      <p className="nf-sub">{pokes ? "Still not here. Thanks for checking, though." : "Even the pals couldn't find it."}</p>
      <div className="nf-actions">
        <Link href="/" className="btn btn-primary btn-lg">
          Take me home
        </Link>
        <button
          type="button"
          // A visitor who landed here straight from outside has nothing to go back to; send them home instead.
          onClick={() => (window.history.length > 1 ? router.back() : router.push("/"))}
          className="btn btn-quiet btn-lg"
        >
          Go back
        </button>
      </div>
    </section>
  );
}
