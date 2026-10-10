import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import Closing from "@/components/site/Closing";
import { Story } from "@/components/site/Blocks";
import { AppsDirectory, ChannelChat, RoutineEditor, RuleEditor, SavedLogins, SkillDoc, WorkspaceFiles } from "@/components/features/Visuals";

export const metadata: Metadata = {
  title: "Features",
  description: "What a pal can do: its own computer and browser, your apps, saved passwords, rules, routines, triggers, memory and teamwork.",
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        label="Features"
        title="Everything a pal needs to finish the job."
        actions={
          <Link href="/download" className="btn btn-primary btn-lg">
            Get Pals
          </Link>
        }
      >
        A computer, a browser, your apps and a memory, with you deciding what it may do on its own.
      </PageHero>

      <div className="stories">
        <Story
          id="rules"
          label="Rules and approvals"
          title="It asks before it acts."
          body="Pals read, search and look things up on their own. Before one sends, posts, pays for or changes anything, it stops and shows you a card, unless your rules say it doesn't have to."
          points={[
            "Write rules in plain words: allow, ask first, or never.",
            "A small model checks each risky action against them. The strictest rule wins.",
            "Choose Always allow on a card and it won't ask about that again.",
          ]}
          more={{ href: "/docs/rules", label: "How rules work" }}
        >
          <RuleEditor />
        </Story>

        <Story
          flip
          id="passwords"
          label="Saved passwords"
          title="Signs in without seeing your password."
          body="Save a password once. When a pal needs to sign in, it asks you, and Pals types the password straight into the page. It never goes to the model or into the chat."
          points={[
            "Encrypted with a key in your macOS Keychain, or on the server for hosted Pals.",
            "Nobody can read a password back out of Pals, including you.",
            "For codes from your phone, the pal asks you to take over.",
          ]}
          more={{ href: "/docs/passwords", label: "About saved passwords" }}
        >
          <SavedLogins />
        </Story>

        <Story
          id="apps"
          label="Connected apps"
          title="Works in 1,500 of your apps."
          body="Gmail, Calendar, Slack, Notion, GitHub and the rest, connected through Composio. When a pal needs an app you haven't connected, it shows you a card with a sign-in link."
          points={["Reads on its own: email, calendar, docs, issues.", "Asks before it sends, posts, creates or deletes.", "Connect apps as you go, not all up front."]}
          more={{ href: "/integrations", label: "Browse all integrations" }}
        >
          <AppsDirectory />
        </Story>

        <Story
          flip
          id="routines"
          label="Routines and triggers"
          title="On a schedule, or on a signal."
          body="Ask for a brief every weekday at 8 and the pal sets up a routine. Add a trigger and it wakes up when something happens in your apps, like an email from your bank."
          points={["Each run posts to the pal's chat and sends you a notification.", "Routines use plain cron schedules, with presets for the usual ones.", "Runs still follow your rules."]}
          more={{ href: "/docs/routines", label: "About routines and triggers" }}
        >
          <RoutineEditor />
        </Story>

        <Story
          id="teams"
          label="Pals working together"
          title="A team, not one assistant."
          body="Make a few pals with different jobs. They pass work to each other, and in a channel you can talk to several at once while a lead pal hands out the work."
          points={["Scout researches, Juniper writes the email, you approve it.", "Channels hold up to 20 pals.", "Hand-offs stop after two steps, so work never bounces around."]}
          more={{ href: "/docs/channels", label: "About channels and hand-offs" }}
        >
          <ChannelChat />
        </Story>

        <Story
          flip
          id="memory"
          label="Memory and skills"
          title="It remembers you."
          body="Mention something once and it sticks. Pals keep notes about you and how you like things done, and save step-by-step skills for the tasks they repeat."
          points={["See and edit everything it knows in its Setup tab.", "Ask it to forget something and it does.", "Skills make repeat jobs faster and more reliable."]}
          more={{ href: "/docs/memory", label: "About memory and skills" }}
        >
          <SkillDoc />
        </Story>

        <Story
          id="computer"
          label="Its own computer"
          title="Runs code, then hands you the file."
          body="Every pal has a cloud computer of its own, powered by E2B, with a workspace for files and code. It installs what it needs and sends you what it made."
          points={["Watch its browser live and take over any time.", "Images you send go to the model; other files go to its workspace.", "On the desktop app, it can use your computer too, if you allow it."]}
          more={{ href: "/computer", label: "More about the computer" }}
        >
          <WorkspaceFiles />
        </Story>
      </div>

      <Closing />
    </>
  );
}
