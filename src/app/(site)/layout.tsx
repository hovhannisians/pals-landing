import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import "../landing.css";

// Every marketing page shares the same frame: the top bar, the railed page, the footer.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="page rails">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
