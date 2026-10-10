import Link from "next/link";
import Markdown from "./Markdown";
import Toc from "./Toc";
import PalAvatar from "@/components/PalAvatar";
import { CAST } from "@/lib/cast";
import { NAV, PAGES, docHref, findPage, loadDoc, neighbours } from "@/lib/docs";

const GREETERS = [CAST.opal, CAST.juniper, CAST.scout, CAST.atlas, CAST.bix];
// Every docs page has a pal of its own, so pages are easy to tell apart at a glance.
const GUIDES = [CAST.scout, CAST.juniper, CAST.atlas, CAST.bix, CAST.opal];

export default async function DocPage({ slug }: { slug: string }) {
  const page = findPage(slug)!;
  const group = NAV.find((g) => g.pages.includes(page))!.group;
  const { body, headings } = await loadDoc(slug);
  const { prev, next } = neighbours(slug);
  const index = PAGES.indexOf(page);
  const guide = GUIDES[index % GUIDES.length];

  return (
    <div className="doc-layout">
      <article className="doc">
        <header className={`doc-head ${slug === "" ? "doc-head-home" : ""}`}>
          {slug === "" ? (
            <div className="doc-greeters" aria-hidden>
              {GREETERS.map((p, i) => (
                <PalAvatar key={p.name} look={p.look} size={i === 2 ? 72 : 52} />
              ))}
            </div>
          ) : (
            <div className="doc-crumb">
              <PalAvatar look={guide.look} size={26} />
              <span>{group}</span>
            </div>
          )}
          <h1>{page.title}</h1>
          <p className="doc-lede">{page.description}</p>
        </header>

        <div className="doc-body">
          <Markdown>{body}</Markdown>
        </div>

        <nav className="doc-pager" aria-label="More docs">
          {prev ? (
            <Link href={docHref(prev.slug)} className="doc-pager-prev">
              <span>Previous</span>
              {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={docHref(next.slug)} className="doc-pager-next">
              <span>Next</span>
              {next.title}
            </Link>
          ) : null}
        </nav>
      </article>
      <Toc headings={headings} />
    </div>
  );
}
