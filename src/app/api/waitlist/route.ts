import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const endpoint = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json({ error: "Waitlist is not configured." }, { status: 503 });
  }

  let body: { email?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, submittedAt: new Date().toISOString() }),
      cache: "no-store",
    });
    if (!response.ok) {
      return NextResponse.json({ error: "Could not join the waitlist." }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "Could not join the waitlist." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
