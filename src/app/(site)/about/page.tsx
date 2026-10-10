import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import PalAvatar from "@/components/PalAvatar";
import Closing from "@/components/site/Closing";
import { InfoGrid, SecHead } from "@/components/site/Blocks";
import { LAUNCH_CAST } from "@/lib/look";
import { ROBI_LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Pals are personal agents with computers of their own, made by Robi Labs.",
};

// The services Pals is built on, with their own logos.
const CREDITS = [
  { name: "E2B", body: "The cloud computer every pal runs on.", href: "https://e2b.dev", logo: "/brands/e2b.png" },
  { name: "Playwright", body: "Driving each pal's own browser.", href: "https://playwright.dev", logo: "/brands/playwright.svg" },
  { name: "Composio", body: "Sign-in, tools and triggers for 1,500 apps.", href: "https://composio.dev", logo: "/brands/composio.svg" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero label="About" title="About Pals.">
        Pals are personal agents with computers of their own. They take a job off your hands, keep working while you get on
        with your day, and ask before they do anything that matters.
      </PageHero>

      <section className="sec sec-flush">
        <div className="about-cast dot-grid" aria-hidden>
          {LAUNCH_CAST.map((look, i) => (
            <PalAvatar key={i} look={look} size={i === 2 ? 104 : 64} />
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="about-story">
          <SecHead label="Why we built it" title="Answers are nice. Done is better." />
          <div className="about-story-text">
            <p>
              Most AI waits for your next question. We wanted one you could hand a job to, like keeping an eye on your inbox or
              watching flight prices, and then stop thinking about it.
            </p>
            <p>
              That needed a few things chat doesn&apos;t have: a computer of its own, your apps, a memory, and a clear line
              between what it may do alone and what it has to ask you about. Pals is what we built.
            </p>
          </div>
        </div>
      </section>

      <section className="sec">
        <SecHead label="What we believe" title="How we build Pals." />
        <InfoGrid
          cols={2}
          items={[
            {
              title: "An agent should ask",
              body: "Pals read and look things up on their own, and stop before they send, post, pay for or change anything.",
            },
            {
              title: "Your words are the settings",
              body: "You give a pal its job and its rules in plain language, and it remembers what you tell it.",
            },
            {
              title: "Secrets stay secret",
              body: "Saved passwords are typed into pages by Pals itself and never reach the model.",
            },
            {
              title: "Work where you are",
              body: "On your computer, on your phone, or inside Robi Chat. The same pals, wherever you open them.",
            },
          ]}
        />
      </section>

      <section className="sec">
        <div className="about-story">
          <SecHead label="Robi Labs" title="Made by Robi Labs." />
          <div className="about-story-text">
            <p>
              Robi Labs is an independent AI research company building models, tools and technologies that make intelligence
              accessible to everyone, from Armenia to the world. Pals thinks with Robi&apos;s models, and lives alongside Robi
              Chat and Bleenk.
            </p>
            <p>
              <a href={ROBI_LINKS.site} target="_blank" rel="noreferrer" className="sec-link">
                Visit robiai.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="sec">
        <SecHead label="Thanks" title="Built with help from." />
        <div className="credits">
          {CREDITS.map((c) => (
            <a key={c.name} href={c.href} target="_blank" rel="noreferrer" className="surface credit credit-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.logo} alt="" width={40} height={40} />
              <span>
                <b>{c.name}</b>
                <span>{c.body}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <Closing />
    </>
  );
}
