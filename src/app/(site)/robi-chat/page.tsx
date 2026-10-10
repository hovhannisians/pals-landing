import type { Metadata } from "next";
import Link from "next/link";
import AppButton from "@/components/AppButton";
import { CreditCard, Link2, UserRound } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import RobiChatWindow from "@/components/landing/RobiChatWindow";
import Closing from "@/components/site/Closing";
import { Faq, InfoGrid, SecHead } from "@/components/site/Blocks";

export const metadata: Metadata = {
  title: "Pals in Robi Chat",
  description: "Pals is built into Robi Chat. Open it from the sidebar: same account, same pals, nothing to install.",
};

const IN_CHAT = [
  "Talk to your pals and start new chats",
  "Approve, deny and answer their cards",
  "Make pals and change their name, job and instructions",
  "Send files and download what they make",
  "See and edit rules, memories and skills",
  "See routines and triggers",
];
const IN_APPS = [
  "Create and edit routines and triggers",
  "Connect apps",
  "Watch or take over a pal's computer",
  "Saved passwords",
  "Settings",
];

export default function RobiChatPage() {
  return (
    <>
      <PageHero
        label="Robi Chat"
        title="Already inside Robi Chat."
        actions={
          <>
            <AppButton platform="robichat" direct />
            <Link href="/docs/robichat" className="btn btn-secondary btn-lg">
              How it works
            </Link>
          </>
        }
      >
        Open Pals from the Robi Chat sidebar. Same account, same pals, nothing to install.
      </PageHero>

      <section className="sec sec-flush">
        <RobiChatWindow />
      </section>

      <section className="sec">
        <SecHead label="One account" title="The same pals everywhere." />
        <InfoGrid
          items={[
            {
              icon: <UserRound size={18} strokeWidth={1.5} />,
              title: "Shared with the apps",
              body: "Sign in to the Pals apps with Login with RobiChat and you'll find the same pals and chats.",
            },
            {
              icon: <CreditCard size={18} strokeWidth={1.5} />,
              title: "Your plan carries over",
              body: "Subscribe to Robi Chat and you're on the paid plan in Pals too. Upgrading happens in Robi Chat.",
            },
            {
              icon: <Link2 size={18} strokeWidth={1.5} />,
              title: "You can cut it off",
              body: "Disconnect Robi Chat from Account in the Pals app. Its access ends at once, and you can allow it again later.",
            },
          ]}
        />
      </section>

      <section className="sec">
        <SecHead label="What's where" title="Most of Pals, right in the chat." />
        <div className="compare">
          <div className="surface compare-col">
            <div className="eyebrow">In Robi Chat</div>
            <ul>
              {IN_CHAT.map((i) => (
                <li key={i} className="is-yes">
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div className="surface compare-col">
            <div className="eyebrow">In the Pals apps for now</div>
            <ul>
              {IN_APPS.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="sec">
        <SecHead label="Questions" title="Good to know." />
        <Faq
          items={[
            { q: "Can Robi Chat see my saved passwords?", a: "No. Saved passwords and settings never leave the Pals apps." },
            { q: "Do I need to install anything?", a: "No. If your Robi Chat account has Pals, it's in the sidebar." },
            {
              q: "How does Robi Chat talk to Pals?",
              a: (
                <>
                  Through the Pals API, as you, with short-lived tokens. See <Link href="/docs/api">the API</Link>.
                </>
              ),
            },
          ]}
        />
      </section>

      <Closing />
    </>
  );
}
