/* eslint-disable @next/next/no-img-element */

// Real screens from the Pals mobile app (its web preview, running on its built-in sample data).
const SHOTS = [
  { src: "/app/notifications.webp", alt: "Pals mobile app: notifications from Atlas, Juniper and Scout" },
  { src: "/app/home.webp", alt: "Pals mobile app home: two cards waiting for you, and your four pals with what each is doing" },
  { src: "/app/chat-juniper.webp", alt: "Pals mobile app: Juniper drafted an email to Dana and is waiting for approval" },
];

export default function Phones() {
  return (
    <div className="phones">
      {SHOTS.map((s, i) => (
        <figure key={s.src} className={`phone phone-${i}`}>
          <div className="phone-screen">
            <img src={s.src} alt={s.alt} width={393} height={852} />
          </div>
          <span className="phone-island" aria-hidden />
        </figure>
      ))}
    </div>
  );
}
