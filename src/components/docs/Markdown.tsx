import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const DECISIONS: Record<string, string> = { Allow: "allow", "Ask first": "ask", Never: "never" };

const components: Components = {
  // A table cell that is just a rule decision gets the same pill as in the app.
  td: ({ children }) =>
    typeof children === "string" && DECISIONS[children] ? (
      <td>
        <span className={`rule-pill rule-${DECISIONS[children]}`}>{children}</span>
      </td>
    ) : (
      <td>{children}</td>
    ),
  a: ({ href = "", children }) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    ),
  // Wide tables scroll sideways on small screens instead of squashing.
  table: ({ children }) => (
    <div className="doc-table">
      <table>{children}</table>
    </div>
  ),
  // A blockquote in the docs is always a note: "Coming soon", "Preview", a warning.
  blockquote: ({ children }) => <aside className="doc-note">{children}</aside>,
  h2: ({ id, children }) => (
    <h2 id={id}>
      <a href={`#${id}`} className="doc-anchor">
        {children}
      </a>
    </h2>
  ),
  h3: ({ id, children }) => (
    <h3 id={id}>
      <a href={`#${id}`} className="doc-anchor">
        {children}
      </a>
    </h3>
  ),
};

export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
