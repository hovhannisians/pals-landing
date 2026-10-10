import type { Metadata } from "next";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description: "Be first to know when Pals is ready.",
};

export default function WaitlistPage() {
  return (
    <main className="waitlist-page">
      <section className="page waitlist-card surface">
        <div className="eyebrow">Pals by Robi</div>
        <h1 className="text-h1">Your pals are almost ready.</h1>
        <p>Leave your email and we’ll let you know when Pals is available.</p>
        <WaitlistForm />
      </section>
    </main>
  );
}
