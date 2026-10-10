"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PlatformIcon from "./PlatformIcon";
import { DOWNLOADS, PALS_LAUNCHED, WAITLIST_URL, type Platform } from "@/lib/site";

/** Which app to offer first, from the visitor's device. Mac until we know better. */
function detect(): Platform {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) return "ios";
  if (/windows/i.test(ua)) return "windows";
  return "mac";
}

/** The main download button: the visitor's own platform, with every other app one row below. */
/** `direct` links straight to the installer or store, for the download page itself. */
export default function DownloadButton({ className = "btn btn-primary btn-lg", direct = false }: { className?: string; direct?: boolean }) {
  const [platform, setPlatform] = useState<Platform>("mac");

  if (!PALS_LAUNCHED)
    return (
      <a href={WAITLIST_URL} className={className}>
        Join the waitlist
      </a>
    );

  useEffect(() => setPlatform(detect()), []);
  const d = DOWNLOADS[platform];
  if (d.soon)
    return (
      <span className={`${className} is-soon`} aria-disabled="true">
        <PlatformIcon platform={platform} /> Coming soon to {d.name}
      </span>
    );
  return (
    <Link href={direct ? d.file : d.url} className={className}>
      <PlatformIcon platform={platform} /> {platform === "mac" || platform === "windows" ? d.label : `Get Pals for ${d.name}`}
    </Link>
  );
}
