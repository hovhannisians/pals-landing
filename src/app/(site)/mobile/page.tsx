import type { Metadata } from "next";
import Link from "next/link";
import AppButton from "@/components/AppButton";
import { Bell, Camera, MessageSquare, SlidersHorizontal, UserRound, Zap } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Phones from "@/components/landing/Phones";
import DayNotes from "@/components/site/DayNotes";
import Closing from "@/components/site/Closing";
import DownloadGrid from "@/components/site/DownloadGrid";
import { InfoGrid, SecHead } from "@/components/site/Blocks";
import { PALS_LAUNCHED, WAITLIST_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pals for iPhone and Android",
  description: "Answer your pals from anywhere. The Pals mobile apps bring their chats, cards and notifications to your phone.",
};

export default function MobilePage() {
  return (
    <>
      <PageHero
        label="iPhone and Android"
        title="Answer your pals from anywhere."
        actions={
          PALS_LAUNCHED ? (
            <>
              <AppButton platform="ios" label="App Store" />
              <AppButton platform="android" label="Google Play" />
            </>
          ) : (
            <a href={WAITLIST_URL} className="btn btn-primary btn-lg">
              Join the waitlist
            </a>
          )
        }
      >
        When a pal needs a yes, a date or a login, your phone buzzes and you answer right there. Answer once, and it&apos;s
        answered everywhere.
      </PageHero>

      <section className="sec sec-flush">
        <div className="phone-stage phone-stage-wide">
          <Phones />
        </div>
      </section>

      <section className="sec">
        <SecHead label="In your pocket" title="Everything your pals need from you." />
        <InfoGrid
          items={[
            {
              icon: <Zap size={18} strokeWidth={1.5} />,
              title: "Waiting for you, up top",
              body: "Approvals and questions sit at the top of the home screen, with Approve, Deny and suggested answers right on the card.",
            },
            {
              icon: <Bell size={18} strokeWidth={1.5} />,
              title: "Notifications that matter",
              body: "Hear when a pal finishes, has a question or needs your approval. Choose which ones you get in settings.",
            },
            {
              icon: <MessageSquare size={18} strokeWidth={1.5} />,
              title: "Every chat",
              body: "Talk to any pal, start new chats and see what it's doing, step by step, as it works.",
            },
            {
              icon: <Camera size={18} strokeWidth={1.5} />,
              title: "Photos and files",
              body: "Snap a photo or attach one from your library, and download what your pals send back.",
            },
            {
              icon: <SlidersHorizontal size={18} strokeWidth={1.5} />,
              title: "Your pals, your way",
              body: "Make new pals, change their look, instructions and model, and see what each one remembers.",
            },
            {
              icon: <UserRound size={18} strokeWidth={1.5} />,
              title: "One account",
              body: "Sign in with your Robi account. Your pals and chats are the same on your phone, the web and Robi Chat.",
            },
          ]}
        />
      </section>

      <section className="sec">
        <div className="day">
          <SecHead label="A day with pals" title="A Tuesday, from your lock screen.">
            You set them up once. After that, most of what you hear from them is a short note when something is done, or needs
            you.
          </SecHead>
          <DayNotes />
        </div>
      </section>

      <section className="sec">
        <SecHead label="Download" title="Get the app." />
        <DownloadGrid only={["ios", "android"]} />
      </section>

      <Closing />
    </>
  );
}
