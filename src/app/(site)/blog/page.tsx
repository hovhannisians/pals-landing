import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import { formatDate, posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "News and notes from the team building Pals.",
};

export default function BlogPage() {
  const all = posts();
  const [first, ...rest] = all;
  return (
    <>
      <PageHero label="Blog" title="News and notes.">
        What&apos;s new in Pals, how it works, and why we built it the way we did.
      </PageHero>

      <section className="sec sec-flush">
        {first && (
          <Link href={`/blog/${first.slug}`} className="surface post-lead">
            <div className="post-meta">
              <span className="eyebrow">{first.tag}</span>
              <time dateTime={first.date}>{formatDate(first.date)}</time>
            </div>
            <h2 className="text-h1">{first.title}</h2>
            <p>{first.description}</p>
            <span className="sec-link">Read the post</span>
          </Link>
        )}
        <div className="post-grid">
          {rest.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="surface post-card">
              <div className="post-meta">
                <span className="eyebrow">{p.tag}</span>
                <time dateTime={p.date}>{formatDate(p.date)}</time>
              </div>
              <h3 className="text-h2">{p.title}</h3>
              <p>{p.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
