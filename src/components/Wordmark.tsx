import Link from "next/link";

/** The Pals logo with "by Robi", exactly as the app's sidebar shows it. */
export default function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="wordmark" aria-label="Pals home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/art/logo.png" alt="Pals" width={340} height={105} />
      <span>by Robi</span>
    </Link>
  );
}
