import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import DownloadButton from "@/components/DownloadButton";
import DownloadGrid from "@/components/site/DownloadGrid";
import { Faq, SecHead } from "@/components/site/Blocks";

export const metadata: Metadata = {
  title: "Download",
  description: "Get Pals for Mac, Windows, iPhone and Android, or open it in Robi Chat.",
};

export default function DownloadPage() {
  return (
    <>
      <PageHero
        label="Download"
        title="Get Pals."
        actions={<DownloadButton direct />}
      >
        For your computer, your phone, or right inside Robi Chat. Your pals come with you.
      </PageHero>

      <section className="sec sec-flush">
        <DownloadGrid direct />
      </section>

      <section className="sec">
        <SecHead label="After you install" title="A few things to know." />
        <Faq
          items={[
            {
              q: "The Mac app says it can't be opened.",
              a: "The build isn't notarized yet. The first time, right-click the app and choose Open. After that it opens normally.",
            },
            {
              q: "Which one should I get?",
              a: "Get the Mac or Windows app for the full Pals app on your desktop. Get the phone app to answer your pals wherever you are. Or open Pals in Robi Chat.",
            },
            {
              q: "What do I need to get started?",
              a: (
                <>
                  A Robi API key for the desktop apps, or a Robi account.
                </>
              ),
            },
            {
              q: "Can I build it myself?",
              a: (
                <>
                  Yes, you can run it yourself.
                </>
              ),
            },
          ]}
        />
      </section>
    </>
  );
}
