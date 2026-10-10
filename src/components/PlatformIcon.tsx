import type { Platform } from "@/lib/site";

// Small platform marks for the download buttons.
export default function PlatformIcon({ platform, size = 16 }: { platform: Platform; size?: number }) {
  if (platform === "robichat")
    return (
      // Robi Chat's own app icon: the dot diamond in a white circle.
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/art/robichat.png" alt="" width={size} height={size} style={{ borderRadius: "50%", boxShadow: "0 0 0 1px rgba(0,0,0,0.08)" }} />
    );
  if (platform === "windows")
    return (
      <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden>
        <path d="M0 2.2 6.5 1.3v6.2H0zM7.3 1.2 16 0v7.5H7.3zM0 8.3h6.5v6.3L0 13.7zM7.3 8.3H16V16l-8.7-1.2z" />
      </svg>
    );
  if (platform === "android")
    return (
      <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden>
        <path d="M3.4 2.6 4.8 5M12.6 2.6 11.2 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path fillRule="evenodd" fill="currentColor" d="M1 13a7 7 0 0 1 14 0zM5.2 9.4a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Zm5.6 0a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 17 20" width={size} height={size} fill="currentColor" aria-hidden>
      <path d="M14.1 10.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.8 1.2 1.8 2.6 3.1 2.5 1.3 0 1.7-.8 3.3-.8 1.5 0 2 .8 3.3.8 1.4 0 2.3-1.2 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.5-1-2.5-4ZM11.6 3.1c.7-.9 1.2-2 1.1-3.1-1 0-2.2.7-2.9 1.6-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.8-1.5Z" />
    </svg>
  );
}
