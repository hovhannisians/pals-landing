import Link from "next/link";
import PlatformIcon from "@/components/PlatformIcon";
import { DOWNLOADS, PLATFORMS, type Platform } from "@/lib/site";

/** A card per app. `direct` links straight to the installer or store (the download page); otherwise to that section of it. */
export default function DownloadGrid({ only = PLATFORMS, direct = false }: { only?: Platform[]; direct?: boolean }) {
  return (
    <div className={`downloads downloads-${only.length}`}>
      {only.map((p) => (
        <article key={p} id={direct ? p : undefined} className="surface download">
          <span className="download-icon">
            <PlatformIcon platform={p} size={22} />
          </span>
          <h3 className="text-h2">{DOWNLOADS[p].name}</h3>
          <p>{DOWNLOADS[p].detail}</p>
          {direct && (
            <ul className="download-reqs">
              {DOWNLOADS[p].requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          )}
          {DOWNLOADS[p].soon ? (
            <span className="btn btn-secondary is-soon" aria-disabled="true">
              Coming soon
            </span>
          ) : (
            <Link href={direct ? DOWNLOADS[p].file : DOWNLOADS[p].url} className="btn btn-primary">
              {DOWNLOADS[p].label}
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
