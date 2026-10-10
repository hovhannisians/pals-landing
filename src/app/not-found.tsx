import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import NotFound from "@/components/NotFound";
import "./landing.css";

export const metadata: Metadata = { title: "Not found" };

// Every unknown URL, including docs pages that don't exist, lands here inside the site's own frame.
export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="page rails nf-page">
        <NotFound />
      </main>
    </>
  );
}
