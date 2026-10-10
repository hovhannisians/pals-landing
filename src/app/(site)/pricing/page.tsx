import type { Metadata } from "next";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Closing from "@/components/site/Closing";
import PlatformIcon from "@/components/PlatformIcon";
import { Faq, SecHead } from "@/components/site/Blocks";
import { SUBSCRIBE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Pals is free to start. A Robi Chat or Bleenk subscription lifts the daily limits.",
};

const FREE = ["50 messages a day", "10 voice minutes a day", "One voice call at a time", "1 GB of uploads a day"];
const PAID = ["Unlimited messages", "120 voice minutes a day", "Three voice calls at a time", "No daily upload cap"];

// Free vs paid, row by row. true/false draw a check or a dash.
const TABLE: { group: string; rows: [string, string | boolean, string | boolean][] }[] = [
  {
    group: "Usage",
    rows: [
      ["Messages", "50 a day", "Unlimited"],
      ["Voice minutes", "10 a day", "120 a day"],
      ["Voice calls at once", "1", "3"],
      ["Uploads", "1 GB a day", "No daily cap"],
    ],
  },
  {
    group: "Every plan",
    rows: [
      ["As many pals as you like", true, true],
      ["A cloud computer per pal, on E2B", true, true],
      ["1,500 apps through Composio", true, true],
      ["Rules, routines and triggers", true, true],
      ["Saved passwords", true, true],
      ["Mac, Windows, iPhone, Android and Robi Chat", true, true],
    ],
  },
];

const cell = (v: string | boolean) =>
  v === true ? <Check size={16} strokeWidth={2} className="pt-yes" aria-label="Included" /> : v === false ? <Minus size={16} strokeWidth={2} className="pt-no" aria-label="Not included" /> : v;

export default function PricingPage() {
  return (
    <>
      <PageHero label="Pricing" title="Free to start. Simple after that.">
        Every feature on every plan. Use Pals free, or get unlimited messages with a Robi Chat or Bleenk subscription.
      </PageHero>

      <section className="sec sec-flush">
        <div className="price-plans">
          <article className="surface price-card">
            <div className="price-top">
              <span className="eyebrow">Free</span>
            </div>
            <div className="price-amount">
              <b>$0</b>
              <span>forever</span>
            </div>
            <p className="price-note">For everyone, on every device.</p>
            <ul>
              {FREE.map((i) => (
                <li key={i}>
                  <Check size={15} strokeWidth={2} /> {i}
                </li>
              ))}
              <li>
                <Check size={15} strokeWidth={2} /> Every feature
              </li>
            </ul>
            <Link href="/download" className="btn btn-lg btn-secondary">
              Get Pals free
            </Link>
          </article>

          <article className="price-card price-card-dark">
            <div className="price-top">
              <span className="eyebrow">Paid</span>
              <span className="price-chip">Unlimited messages</span>
            </div>
            <div className="price-amount">
              <b>Included</b>
              <span>with your subscription</span>
            </div>
            <p className="price-note">With a Robi Chat or Bleenk subscription, trials too.</p>
            <ul>
              {PAID.map((i) => (
                <li key={i}>
                  <Check size={15} strokeWidth={2} /> {i}
                </li>
              ))}
              <li>
                <Check size={15} strokeWidth={2} /> Every feature
              </li>
            </ul>
            <div className="price-ctas">
              <Link href={SUBSCRIBE.robichat} className="btn btn-lg price-btn-light">
                Subscribe in Robi Chat
              </Link>
              <Link href={SUBSCRIBE.bleenk} className="btn btn-lg price-btn-ghost">
                Subscribe in Bleenk
              </Link>
            </div>
          </article>
        </div>
        <p className="price-fine">Voice limits are the planned limits at launch and may change.</p>
      </section>

      <section className="sec">
        <SecHead label="Compare" title="Free and paid, side by side." center />
        <div className="surface ptable">
          <div className="ptable-head">
            <span />
            <span>Free</span>
            <span>Paid</span>
          </div>
          {TABLE.map((g) => (
            <div key={g.group} className="ptable-group">
              <div className="ptable-group-name eyebrow">{g.group}</div>
              {g.rows.map(([label, free, paid]) => (
                <div key={label} className="ptable-row">
                  <span>{label}</span>
                  <span>{cell(free)}</span>
                  <span className="ptable-paid">{cell(paid)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <SecHead label="Your plan" title="Already subscribed? You're set." center>
          Pals doesn&apos;t sell anything itself. Sign in with the account you subscribed with, and Pals picks up your plan.
        </SecHead>
        <div className="price-sources">
          <a href={SUBSCRIBE.robichat} target="_blank" rel="noreferrer" className="surface price-source">
            <PlatformIcon platform="robichat" size={36} />
            <span>
              <b>Robi Chat</b>
              <span>Subscribe in Robi Chat, then use Pals there or sign in to the apps with it.</span>
            </span>
          </a>
          <a href={SUBSCRIBE.bleenk} target="_blank" rel="noreferrer" className="surface price-source">
            <span className="price-mono">B</span>
            <span>
              <b>Bleenk</b>
              <span>Subscribe to Bleenk, then sign in to Pals with your Bleenk account.</span>
            </span>
          </a>
        </div>
      </section>

      <section className="sec">
        <SecHead label="What counts" title="What uses a message." center>
          On the free plan, messages come back at midnight UTC. If something fails to start, it isn&apos;t counted.
        </SecHead>
        <div className="price-counts">
          <div className="surface price-count">
            <div className="price-count-head">
              <span className="eyebrow">Uses a message</span>
            </div>
            <ul>
              <li>Sending a message to a pal or a channel</li>
              <li>Answering a question card</li>
              <li>Each routine run</li>
              <li>Each time a trigger fires</li>
              <li>Asking for real work on a voice call</li>
            </ul>
          </div>
          <div className="surface price-count">
            <div className="price-count-head">
              <span className="eyebrow">Always free</span>
            </div>
            <ul className="is-free">
              <li>Approving or denying a card</li>
              <li>The pal&apos;s own replies and updates</li>
              <li>Hand-offs between pals</li>
              <li>The voice call itself</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sec">
        <SecHead label="Questions" title="Good to know." center />
        <div className="price-faq">
          <Faq
            items={[
              { q: "What happens when I run out?", a: "Sending shows when your messages come back and a link to subscribe. Routines and triggers due in the meantime are skipped." },
              { q: "My plan looks wrong.", a: "Sign out and back in. Pals reads your plan again at every sign-in." },
              { q: "Is a trial a paid plan?", a: "Yes, while it lasts." },
              { q: "Do I need a separate Pals subscription?", a: "No. Pals has no subscription of its own. A Robi Chat or Bleenk subscription is the paid plan." },
              {
                q: "Where can I read more?",
                a: (
                  <>
                    See <Link href="/docs/plans">Plans and limits</Link> in the docs.
                  </>
                ),
              },
            ]}
          />
        </div>
      </section>

      <Closing />
    </>
  );
}
