import type { Metadata } from "next";
import Link from "next/link";
import { Zap } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Closing from "@/components/site/Closing";
import Directory from "@/components/integrations/Directory";
import { InfoGrid, SecHead, Steps } from "@/components/site/Blocks";
import data from "@/data/integrations.json";
import popular from "@/data/integrations-popular.json";
import instant from "@/data/integrations-instant.json";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Pals works in Gmail, Calendar, Slack, Notion, GitHub and 1,500 more apps through Composio, and asks before it changes anything.",
};

const apps = data.apps as { c: string; m: number; g: number }[];
const STATS = [
  [apps.length.toLocaleString("en-US"), "apps"],
  [String(new Set(apps.map((a) => a.c)).size), "categories"],
  [String(apps.filter((a) => a.m).length), "instant apps, no sign-in needed"],
  [String(apps.filter((a) => a.g > 0).length), "apps with triggers"],
];

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        label="Integrations"
        title="Your apps, all 1,500 of them."
        actions={
          <>
            <Link href="/download" className="btn btn-primary btn-lg">
              Get Pals
            </Link>
          </>
        }
      >
        Pals connects to your apps through{" "}
        <a href="https://composio.dev" target="_blank" rel="noreferrer" className="phero-link">
          Composio
        </a>
        . It reads on its own, and asks before it sends, posts or changes anything.
      </PageHero>

      <section className="sec sec-flush">
        <div className="stats">
          {STATS.map(([n, l]) => (
            <div key={l} className="stat">
              <b>{n}</b>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <SecHead label="Instant Apps" title="Ready the moment you are.">
          These work right away through Composio, with no sign-in. Your pals can search the web, read pages, find people and
          make audio from the start.
        </SecHead>
        <div className="popular instant">
          {instant.map((a) => (
            <article key={a.slug} className="surface pop">
              <span className="pop-top">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://logos.composio.dev/api/${a.slug}`} alt="" width={36} height={36} loading="lazy" />
                <span className="pop-instant">
                  <Zap size={11} strokeWidth={2} /> Instant
                </span>
              </span>
              <h3 className="text-h2">{a.name}</h3>
              <p>{a.description}</p>
              <span className="pop-meta">{a.tools} tools</span>
            </article>
          ))}
        </div>
      </section>

      <section className="sec">
        <SecHead label="Most used" title="The apps people connect first." />
        <div className="popular">
          {popular.map((a) => (
            <article key={a.slug} className="surface pop">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://logos.composio.dev/api/${a.slug}`} alt="" width={36} height={36} loading="lazy" />
              <h3 className="text-h2">{a.name}</h3>
              <p>{a.description}</p>
              <span className="pop-meta">
                {a.tools} tools
                {a.triggers > 0 && (
                  <>
                    {" · "}
                    <Zap size={11} strokeWidth={2} /> {a.triggers} triggers
                  </>
                )}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="sec" id="directory">
        <SecHead label="Directory" title="Find your apps." />
        <Directory />
      </section>

      <section className="sec">
        <SecHead label="Connecting" title="Connect as you go." />
        <Steps
          items={[
            { title: "Sign in with Composio", body: "One sign-in in Settings. It opens in your normal browser." },
            { title: "Connect when it's needed", body: "When a pal needs an app you haven't connected, it shows a card with a sign-in link." },
            { title: "Your rules apply", body: "Reading is free. Sending, posting, creating and deleting ask you first, unless your rules say otherwise." },
          ]}
        />
      </section>

      <section className="sec">
        <SecHead label="Built on" title="What Pals works with." />
        <InfoGrid
          cols={4}
          items={[
            { title: "Robi models", body: "Every pal thinks with Robi. A smaller model checks actions against your rules." },
            { title: "Composio", body: "Sign-in and tools for 1,500 apps, and the triggers that wake a pal up." },
            { title: "E2B", body: "A cloud computer for every pal, so it never borrows yours." },
            { title: "Robi Chat", body: "Pals is built in. Same account, same pals, through the Pals API." },
          ]}
        />
      </section>

      <Closing />
    </>
  );
}
