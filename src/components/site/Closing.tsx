import Link from "next/link";
import DownloadButton from "@/components/DownloadButton";
import { PALS_LAUNCHED } from "@/lib/site";

/** The pals render, full width, with the last call to action in its dark middle. */
export default function Closing({
  title = "Make your first pal.",
  body = "Give it a job in plain words. It takes about a minute.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="closing">
      <picture className="closing-art">
        <source media="(max-width: 720px)" srcSet="/art/hero-tall.webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/art/hero-wide.webp" alt="" />
      </picture>
      <div className="closing-copy">
        <h2 className="text-h1">{title}</h2>
        <p>{body}</p>
        <div className="hero-ctas">
          <DownloadButton />
          {PALS_LAUNCHED && (
            <Link href="/download" className="btn btn-secondary btn-lg">
              All downloads
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
