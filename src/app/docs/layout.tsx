import Link from "next/link";
import Wordmark from "@/components/Wordmark";
import Sidebar from "@/components/docs/Sidebar";
import "./docs.css";

// The docs use the app's own shell: a sidebar on the background colour, and the page on a white card beside it.
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs">
      <a className="skip" href="#doc">
        Skip to content
      </a>
      <aside className="docs-side">
        <div className="docs-side-head">
          <Wordmark href="/" />
          <span className="docs-tag">Docs</span>
        </div>
        <Sidebar />
        <div className="docs-side-foot">
          <Link href="/download" className="btn btn-primary">
            Download Pals
          </Link>
          <Link href="/" className="btn btn-secondary">
            Home
          </Link>
        </div>
      </aside>
      <main id="doc" className="docs-main">
        {children}
      </main>
    </div>
  );
}
