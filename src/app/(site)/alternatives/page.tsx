import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import Closing from "@/components/site/Closing";
import { SecHead } from "@/components/site/Blocks";
import { ArrowUpRight, Brain, Check, Computer, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Pals and other personal AI agents",
  description:
    "Compare Pals with personal AI agents such as OpenAI Dots, Grokbot, Meta Muse and OpenMaus. Pals gives each agent a computer, app access, memory and approval rules.",
  keywords: [
    "personal AI agent comparison",
    "OpenAI Dots alternative",
    "Grokbot alternative",
    "Meta Muse alternative",
    "OpenMaus alternative",
  ],
  alternates: { canonical: "./" },
};

const SIGNALS = [
  {
    n: "01",
    icon: <Computer size={19} strokeWidth={1.5} />,
    title: "It can finish the task",
    body: "A real browser and workspace let a pal move through the apps where the work actually happens.",
  },
  {
    n: "02",
    icon: <ShieldCheck size={19} strokeWidth={1.5} />,
    title: "You stay in control",
    body: "Rules decide what happens quietly and what needs your approval before it goes out.",
  },
  {
    n: "03",
    icon: <Brain size={19} strokeWidth={1.5} />,
    title: "It gets better at your work",
    body: "Routines, triggers, memory and saved skills carry useful context into the next run.",
  },
];

export default function AlternativesPage() {
  return (
    <>
      <PageHero label="Personal AI agents" title="The difference is what happens after you leave.">
        Comparing Pals with OpenAI Dots, Grokbot, Meta Muse, OpenMaus or another personal AI agent? Look past the chat
        window. The useful question is whether the work keeps moving when you do.
      </PageHero>

      <section className="alt-signals">
        <div className="alt-signals-lede">
          <div className="eyebrow">Why Pals</div>
          <h2>From “here&apos;s how” to “done.”</h2>
          <p>
            Pals are built for the gap between an answer and an outcome: they open the site, use the app, follow your rules
            and check back when they need you.
          </p>
          <Link href="/features" className="sec-link">
            See the features <ArrowUpRight size={14} strokeWidth={1.75} />
          </Link>
        </div>
        <div className="alt-signal-list">
          {SIGNALS.map((signal) => (
            <article key={signal.n} className="alt-signal">
              <span className="alt-signal-n">{signal.n}</span>
              <span className="alt-signal-icon">{signal.icon}</span>
              <div>
                <h3>{signal.title}</h3>
                <p>{signal.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="alt-fit">
        <SecHead label="Find your fit" title="Choose by the work you want to hand off.">
          Models matter, but the experience is shaped by where an agent can act, what it remembers and how clearly it asks for
          permission.
        </SecHead>
        <div className="alt-fit-grid">
          <div className="alt-fit-panel">
            <span className="eyebrow">A good fit for Pals</span>
            <ul>
              {[
                "You want work to continue while you are away.",
                "The task lives in a browser or across several apps.",
                "You want approval before anything sensitive is sent or changed.",
                "You repeat the same kind of work and want it remembered.",
              ].map((item) => (
                <li key={item}>
                  <Check size={15} strokeWidth={2} /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="alt-fit-note">
            <span className="alt-note-mark">P</span>
            <p>
              Pals are not trying to be another chat tab. They are a small team of agents with computers, apps and a shared
              understanding of what you allow.
            </p>
          </div>
        </div>
      </section>

      <Closing title="Meet your first pal." body="Join the waitlist and be first to know when Pals is ready." />
    </>
  );
}
