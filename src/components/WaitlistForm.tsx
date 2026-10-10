"use client";

import { FormEvent, useState } from "react";
import { WAITLIST_ENDPOINT } from "@/lib/site";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          email: String(data.get("email") ?? "").trim(),
          company: String(data.get("company") ?? ""),
          page: window.location.href,
          userAgent: navigator.userAgent,
        }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok || result.error) throw new Error("Could not join the waitlist.");
      setStatus("success");
      setMessage("You’re on the list. We’ll let you know when Pals is ready.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not join the waitlist.");
    }
  }

  return (
    <form className="waitlist-form" onSubmit={submit}>
      <label htmlFor="waitlist-email">Email address</label>
      <div className="waitlist-form-row">
        <input
          id="waitlist-email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
          disabled={status === "sending" || status === "success"}
        />
        <input name="company" type="text" tabIndex={-1} autoComplete="off" className="waitlist-honeypot" aria-hidden />
        <button type="submit" className="btn btn-primary btn-lg" disabled={status === "sending" || status === "success"}>
          {status === "sending" ? "Joining…" : status === "success" ? "Joined" : "Join the waitlist"}
        </button>
      </div>
      {message && <p className={`waitlist-message is-${status}`} aria-live="polite">{message}</p>}
    </form>
  );
}
