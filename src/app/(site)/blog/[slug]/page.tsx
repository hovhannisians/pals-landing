import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "@/components/docs/Markdown";
import Closing from "@/components/site/Closing";
import { formatDate, post, posts } from "@/lib/blog";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = post((await params).slug);
  return p ? { title: p.title, description: p.description } : {};
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = post(slug);
  if (!p) notFound();
  const others = posts().filter((x) => x.slug !== slug).slice(0, 2);

  return (
    <>
      <article className="post">
        <header className="post-head">
          <Link href="/blog" className="post-back">
            Blog
          </Link>
          <div className="post-meta">
            <span className="eyebrow">{p.tag}</span>
            <time dateTime={p.date}>{formatDate(p.date)}</time>
            <span>Robi Labs</span>
          </div>
          <h1 className="text-display post-title">{p.title}</h1>
          <p className="post-lede">{p.description}</p>
        </header>
        <div className="prose">
          <Markdown>{p.body}</Markdown>
        </div>
      </article>

      {others.length > 0 && (
        <section className="sec">
          <div className="eyebrow post-more-label">More from the blog</div>
          <div className="post-grid">
            {others.map((o) => (
              <Link key={o.slug} href={`/blog/${o.slug}`} className="surface post-card">
                <div className="post-meta">
                  <span className="eyebrow">{o.tag}</span>
                  <time dateTime={o.date}>{formatDate(o.date)}</time>
                </div>
                <h3 className="text-h2">{o.title}</h3>
                <p>{o.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Closing />
    </>
  );
}
