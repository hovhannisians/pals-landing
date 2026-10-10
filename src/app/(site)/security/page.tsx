import type { Metadata } from "next";
import Link from "next/link";
import { FolderLock, KeyRound, Link2, Lock, ShieldCheck, UserRoundCheck } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Closing from "@/components/site/Closing";
import { InfoGrid, RulesCard, SecHead, Story } from "@/components/site/Blocks";
import { SavedLogins } from "@/components/features/Visuals";

export const metadata: Metadata = {
  title: "Security",
  description: "How Pals keeps you in charge: approvals before anything important, passwords the model never sees, and data you control.",
};

export default function SecurityPage() {
  return (
    <>
      <PageHero label="Security" title="You stay in charge.">
        A pal can do a lot on its own. Here&apos;s how Pals makes sure it only does what you&apos;d want.
      </PageHero>

      <div className="stories">
        <Story
          label="Approvals"
          title="Nothing important happens without you."
          body="Sending, posting, paying, signing in and clicking things like Buy or Delete ask first by default. Never rules are hard limits: a pal won't even ask."
          points={[
            "A small model checks each risky action against your rules.",
            "When rules disagree, the strictest one wins.",
            "If the checker can't be reached, the pal asks you.",
          ]}
        >
          <RulesCard
            rules={[
              ["read my email or calendar", "Allow"],
              ["send an email", "Ask first"],
              ["sign in with a saved password", "Ask first"],
              ["delete anything in my inbox", "Never"],
              ["pay for anything", "Never"],
            ]}
          />
        </Story>

        <Story
          flip
          label="Passwords"
          title="The model never sees your passwords."
          body="Saved passwords are typed straight into the page by Pals itself. They never go to the model and never appear in a chat, and nobody can read one back out."
        >
          <SavedLogins />
        </Story>
      </div>

      <section className="sec">
        <SecHead label="Your data" title="Where everything lives." />
        <InfoGrid
          items={[
            {
              icon: <FolderLock size={18} strokeWidth={1.5} />,
              title: "Its own computer",
              body: "Each pal works on its own cloud computer, powered by E2B, apart from every other pal and from yours.",
            },
            {
              icon: <Lock size={18} strokeWidth={1.5} />,
              title: "Encrypted secrets",
              body: "Passwords and keys are encrypted with a key in your Keychain, or on the server with a key only the service holds.",
            },
            {
              icon: <UserRoundCheck size={18} strokeWidth={1.5} />,
              title: "Private by account",
              body: "On hosted Pals every query is scoped to your account. Nobody else sees your pals, chats or live updates.",
            },
            {
              icon: <KeyRound size={18} strokeWidth={1.5} />,
              title: "What leaves your computer",
              body: "Robi receives what the model needs to think. E2B runs each pal's computer, and Composio connects your apps.",
            },
            {
              icon: <Link2 size={18} strokeWidth={1.5} />,
              title: "Robi Chat on a leash",
              body: "Robi Chat never sees passwords or settings, and you can disconnect it from your Pals account at any time.",
            },
            {
              icon: <ShieldCheck size={18} strokeWidth={1.5} />,
              title: "Delete means delete",
              body: "Deleting a pal removes its chats, memory, routines, triggers and computer.",
            },
          ]}
        />
        <p className="plans-fine">
          Your data stays protected by default, with approvals for sensitive actions.
        </p>
      </section>

      <Closing />
    </>
  );
}
