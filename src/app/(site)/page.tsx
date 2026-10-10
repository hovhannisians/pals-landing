import Link from "next/link";
import AppButton from "@/components/AppButton";
import PlatformIcon from "@/components/PlatformIcon";
import DownloadButton from "@/components/DownloadButton";
import AppWindow from "@/components/landing/AppWindow";
import Phones from "@/components/landing/Phones";
import Features from "@/components/landing/Features";
import RobiChatWindow from "@/components/landing/RobiChatWindow";
import DayNotes from "@/components/site/DayNotes";
import DownloadGrid from "@/components/site/DownloadGrid";
import Closing from "@/components/site/Closing";
import { DOWNLOADS, PALS_LAUNCHED, PLATFORMS } from "@/lib/site";

export default function Home() {
  return (
    <>
        {/* Hero */}
        <section className="hero">
          <div className="hero-dots" aria-hidden />
          <h1 className="text-display hero-title">Your pals keep working when you don&apos;t.</h1>
          <p className="hero-sub">
            Personal agents with their own computers. They run your errands in the background, remember how you like things,
            and ask before they send, post or pay for anything.
          </p>
          <div className="hero-ctas">
            <DownloadButton />
            {PALS_LAUNCHED && (
              <Link href="/download" className="btn btn-secondary btn-lg">
                All downloads
              </Link>
            )}
          </div>
          {!PALS_LAUNCHED && <p className="hero-soon">Be first to know when Pals is ready.</p>}
          {PALS_LAUNCHED && (
            <ul className="hero-platforms" aria-label="Coming to">
              {PLATFORMS.map((p) => (
                <li key={p}>
                  <PlatformIcon platform={p} size={14} /> {DOWNLOADS[p].name}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section id="app" className="sec">
          <header className="sec-head">
            <div className="eyebrow">Mac and Windows</div>
            <h2 className="text-h1">One place for all your pals.</h2>
            <p>Your pals across the top, every chat below, and each pal&apos;s chat, computer and setup one click away.</p>
            <Link href="/desktop" className="sec-link">
              More about the desktop app
            </Link>
          </header>
          <AppWindow />
        </section>

        {/* Mobile app */}
        <section id="phone" className="sec">
          <div className="phone-row">
            <header className="sec-head">
              <div className="eyebrow">iPhone and Android</div>
              <h2 className="text-h1">Answer from anywhere.</h2>
              <p>
                When a pal needs a yes, a date or a login, you get a notification and answer it right there. Answer once, and
                it&apos;s answered on every device.
              </p>
              <div className="store-row">
                <AppButton platform="ios" label="App Store" />
                <AppButton platform="android" label="Google Play" />
              </div>
              <Link href="/mobile" className="sec-link">
                More about the mobile apps
              </Link>
            </header>
            <div className="phone-stage">
              <Phones />
            </div>
          </div>
        </section>

        {/* Robi Chat */}
        <section id="robichat" className="sec">
          <header className="sec-head">
            <div className="eyebrow">Robi Chat</div>
            <h2 className="text-h1">Already inside Robi Chat.</h2>
            <p>
              Open Pals from the Robi Chat sidebar. It&apos;s the same account, so your pals, chats and cards are the same as in
              the apps, and your Robi Chat plan carries over.
            </p>
            <div className="store-row">
              <Link href="/robi-chat" className="btn btn-primary btn-lg">
                <PlatformIcon platform="robichat" size={18} /> Pals in Robi Chat
              </Link>
            </div>
          </header>
          <RobiChatWindow />
        </section>

        {/* What pals can do */}
        <section id="features" className="sec">
          <header className="sec-head">
            <div className="eyebrow">What pals can do</div>
            <h2 className="text-h1">Everything a helpful person at a desk would have.</h2>
            <p>So a pal can finish the job instead of telling you how.</p>
            <Link href="/features" className="sec-link">
              See every feature
            </Link>
          </header>

          <Features />
        </section>

        {/* A day */}
        <section className="sec">
          <div className="day">
            <header className="sec-head">
              <div className="eyebrow">A day with pals</div>
              <h2 className="text-h1">A Tuesday, from your lock screen.</h2>
              <p>
                You set them up once. After that, most of what you hear from them is a short note when something is done, or
                needs you.
              </p>
            </header>
            <DayNotes />
          </div>
        </section>

        {/* Downloads */}
        <section id="download" className="sec">
          <header className="sec-head">
            <div className="eyebrow">Download</div>
            <h2 className="text-h1">Pals on every device you use.</h2>
            <p>
              The Mac and Windows apps run your pals right on your computer, with no account needed. The phone apps keep you in
              touch with them wherever you are, and in Robi Chat they&apos;re already built in.
            </p>
          </header>
          <DownloadGrid />
        </section>

        <Closing />
    </>
  );
}
