import Link from "next/link";
import PlatformIcon from "./PlatformIcon";
import { DOWNLOADS, PALS_LAUNCHED, WAITLIST_URL, type Platform } from "@/lib/site";

/**
 * A button for one app. While the app is marked `soon` in site.ts it's a disabled "Coming soon" button;
 * once it's out, it links to the download page (or straight to the installer/store with `direct`).
 */
export default function AppButton({
  platform,
  label,
  direct = false,
  size = "lg",
  variant = "primary",
  icon = true,
}: {
  platform: Platform;
  label?: string;
  direct?: boolean;
  size?: "md" | "lg";
  variant?: "primary" | "secondary";
  icon?: boolean;
}) {
  const app = DOWNLOADS[platform];
  const cls = `btn btn-${variant} ${size === "lg" ? "btn-lg" : ""}`;
  const text = label ?? app.label;
  if (!PALS_LAUNCHED)
    return (
      <a href={WAITLIST_URL} className={cls}>
        Join the waitlist
      </a>
    );

  if (app.soon)
    return (
      <span className={`${cls} is-soon`} aria-disabled="true" title={`${app.name}: coming soon`}>
        {icon && <PlatformIcon platform={platform} size={platform === "robichat" ? 18 : 16} />}
        {text}
        <em className="soon-tag">Soon</em>
      </span>
    );
  return (
    <Link href={direct ? app.file : app.url} className={cls}>
      {icon && <PlatformIcon platform={platform} size={platform === "robichat" ? 18 : 16} />}
      {text}
    </Link>
  );
}
