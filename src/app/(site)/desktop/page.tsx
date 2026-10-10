import type { Metadata } from "next";
import Link from "next/link";
import AppButton from "@/components/AppButton";
import { Cloud, KeyRound, MonitorSmartphone, MoonStar, Power, ShieldCheck } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import AppWindow from "@/components/landing/AppWindow";
import Closing from "@/components/site/Closing";
import DownloadGrid from "@/components/site/DownloadGrid";
import { Faq, InfoGrid, SecHead, Steps } from "@/components/site/Blocks";
import { PALS_LAUNCHED, WAITLIST_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pals for Mac and Windows",
  description: "The Pals desktop app for Mac and Windows. Every pal gets a cloud computer of its own, and keeps working after you close the window.",
};

export default function DesktopPage() {
  return (
    <>
      <PageHero
        label="Mac and Windows"
        title="Your pals, on your desktop."
        actions={
          PALS_LAUNCHED ? (
            <>
              <AppButton platform="mac" label="Mac" />
              <AppButton platform="windows" label="Windows" />
            </>
          ) : (
            <a href={WAITLIST_URL} className="btn btn-primary btn-lg">
              Join the waitlist
            </a>
          )
        }
      >
        The desktop app runs its own little server, so there&apos;s no account to make. Close the window and your pals keep
        working in the background.
      </PageHero>

      <section className="sec sec-flush">
        <AppWindow />
      </section>

      <section className="sec">
        <SecHead label="How it runs" title="Yours, start to finish." />
        <InfoGrid
          items={[
            {
              icon: <KeyRound size={18} strokeWidth={1.5} />,
              title: "No account needed",
              body: "Paste your Robi API key and you're set up. Keys are stored encrypted on your computer.",
            },
            {
              icon: <Power size={18} strokeWidth={1.5} />,
              title: "Keeps going when you close it",
              body: "Closing the window doesn't stop your pals. Routines and triggers keep firing until you quit the app.",
            },
            {
              icon: <ShieldCheck size={18} strokeWidth={1.5} />,
              title: "Asks before it acts",
              body: "Approvals pop up right in the chat, and a notification tells you when a pal needs you.",
            },
          ]}
        />
      </section>

      <section className="sec">
        <SecHead label="Where pals work" title="A cloud computer for every pal.">
          Every pal runs on its own computer in the cloud, powered by E2B. On the desktop app you can also let it use yours.
        </SecHead>
        <InfoGrid
          items={[
            {
              icon: <Cloud size={18} strokeWidth={1.5} />,
              title: "Powered by E2B",
              body: "Each pal gets its own Linux machine with a real Chrome, kept apart from every other pal.",
            },
            {
              icon: <MonitorSmartphone size={18} strokeWidth={1.5} />,
              title: "Watch it from the app",
              body: "Open a pal's Computer tab to see its browser live, and take over for a login or a captcha.",
            },
            {
              icon: <MoonStar size={18} strokeWidth={1.5} />,
              title: "Your computer, if you allow it",
              body: "Give a pal access and it can run commands on your own computer too, asking before each one. Off until you turn it on.",
            },
          ]}
        />
        <Link href="/computer" className="sec-link sec-link-after">
          More about the computer
        </Link>
      </section>

      <section className="sec">
        <SecHead label="Set up" title="About a minute, start to finish." />
        <Steps
          items={[
            { title: "Give your pals a brain", body: "Paste your Robi API key and choose Wake them up." },
            { title: "Connect your apps", body: "Sign in with Composio to connect Gmail, Calendar, Slack and the rest. You can do this later." },
            { title: "Make your first pal", body: "Pick a starter like Scout or Juniper, or describe what you want help with." },
          ]}
        />
      </section>

      <section className="sec">
        <SecHead label="Download" title="Get the desktop app." />
        <DownloadGrid only={["mac", "windows"]} />
      </section>

      <section className="sec">
        <SecHead label="Questions" title="Good to know." />
        <Faq
          items={[
            {
              q: "The Mac app says it can't be opened.",
              a: "The build isn't notarized yet. The first time, right-click the app and choose Open. After that it opens normally.",
            },
            {
              q: "Can I use it without a Robi API key?",
              a: "No. Pals think with Robi models, so the app needs a key. You can paste it during setup or later in Settings.",
            },
            {
              q: "Can I run it from source?",
              a: (
                <>
                  Yes. You can run it yourself.
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
