import type { Metadata } from "next";
import Link from "next/link";
import { Cloud, Eye, Hand, KeyRound, Package, ShieldCheck } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Closing from "@/components/site/Closing";
import ComputerDemo from "@/components/computer/ComputerDemo";
import { LocalApproval, Terminal } from "@/components/computer/Extras";
import { Faq, InfoGrid, SecHead, Story } from "@/components/site/Blocks";

export const metadata: Metadata = {
  title: "The computer",
  description: "Every pal has a cloud computer of its own, powered by E2B: a browser that stays logged in, a workspace for code, and a live view you can take over.",
};

export default function ComputerPage() {
  return (
    <>
      <PageHero
        label="The computer"
        title="Every pal gets a computer of its own."
        actions={
          <>
            <Link href="/download" className="btn btn-primary btn-lg">
              Get Pals
            </Link>
            <Link href="/docs/computer" className="btn btn-secondary btn-lg">
              Read the docs
            </Link>
          </>
        }
      >
        A cloud computer for every pal, powered by E2B, with a real browser that stays logged in and a workspace for files and
        code. It never borrows your screen, so it works while you do something else.
      </PageHero>

      <section className="sec sec-flush">
        <ComputerDemo />
      </section>

      <section className="sec">
        <SecHead label="The browser" title="Watch it. Step in. Hand it back." />
        <InfoGrid
          items={[
            {
              icon: <Eye size={18} strokeWidth={1.5} />,
              title: "Watch it live",
              body: "Open a pal's Computer tab to see its browser as it works, click by click.",
            },
            {
              icon: <Hand size={18} strokeWidth={1.5} />,
              title: "Take over any time",
              body: "For a login, a captcha or a payment step, choose Take over, do it yourself, then hand it back.",
            },
            {
              icon: <KeyRound size={18} strokeWidth={1.5} />,
              title: "Stays signed in",
              body: "Each pal has its own Chrome profile, so sites you sign it in to remember it next time.",
            },
          ]}
        />
      </section>

      <section className="sec">
        <SecHead label="Powered by E2B" title="A cloud computer for every pal.">
          Every pal runs on its own computer in the cloud, built on{" "}
          <a href="https://e2b.dev" target="_blank" rel="noreferrer" className="phero-link">
            E2B
          </a>
          . It never borrows yours.
        </SecHead>
        <InfoGrid
          items={[
            {
              icon: <Cloud size={18} strokeWidth={1.5} />,
              title: "One machine per pal",
              body: "Each pal gets a Linux machine of its own with a real Chrome, kept apart from every other pal.",
            },
            {
              icon: <Package size={18} strokeWidth={1.5} />,
              title: "Installs what it needs",
              body: "It can add packages and tools to its own machine without touching anything of yours.",
            },
            {
              icon: <ShieldCheck size={18} strokeWidth={1.5} />,
              title: "Your computer, only if you say so",
              body: "Close the lid and its computer carries on in the cloud. It only touches yours if you give the desktop app access.",
            },
          ]}
        />
      </section>

      <div className="stories">
        <Story
          label="The workspace"
          title="A place to write and run code."
          body="Each pal has a workspace that lasts between chats. It installs the packages it needs, runs scripts, and sends you what it made: reports, charts, exports."
          points={["Images you send go to the model; other files land in its workspace.", "Download anything from the Files panel.", "It all happens on its cloud computer, not on yours."]}
          more={{ href: "/docs/files", label: "About files and code" }}
        >
          <Terminal />
        </Story>
        <Story
          flip
          label="Your own computer"
          title="On the desktop app, yours too, if you allow it."
          body="Some jobs live on your own machine, like a video on your Desktop. In the Mac and Windows apps you can give a pal access to your computer, and it asks before every command it runs there."
          points={["Off until you turn it on, for each pal.", "Every command needs your approval by default.", "Turn the access off again at any time."]}
          more={{ href: "/docs/computer", label: "About access to your computer" }}
        >
          <LocalApproval />
        </Story>
      </div>

      <section className="sec">
        <SecHead label="Questions" title="Good to know." />
        <Faq
          items={[
            { q: "Can a pal click anything?", a: "Pals find buttons, links and fields by their text, which works on most sites. Things drawn on a canvas, like some maps and games, have no text to find." },
            { q: "What about payments?", a: "The site needs a card saved in your account there, or you take over for the payment step. Buying anything asks for your approval first." },
            { q: "Where does a pal's computer run?", a: "In the cloud, on E2B. Every pal gets its own machine. On the desktop app you can also give a pal access to your own computer, and it asks before each command." },
          ]}
        />
      </section>

      <Closing />
    </>
  );
}
