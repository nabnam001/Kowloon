import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "404 — Siden blev ikke fundet",
};

export default function NotFound() {
  return (
    <main className="grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-deep via-indigo-deep to-ink" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(221,38,39,0.2),transparent_55%)]" />

      <Image
        src="/brand/logo.svg"
        alt="Kowloon"
        width={180}
        height={40}
        className="h-9 w-auto brightness-0 invert"
      />

      <p className="mt-12 font-display text-7xl font-bold text-gold-grad sm:text-8xl">
        404
      </p>
      <h1 className="heading-display mt-4 text-2xl text-cream sm:text-3xl">
        Retten findes ikke på menuen
      </h1>
      <p className="mt-3 max-w-md text-cream/60">
        Siden, du leder efter, er enten flyttet eller findes ikke. Lad os finde
        vej tilbage til bordet.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="btn-primary">
          Til forsiden
        </Link>
        <Link href="/#menu" className="btn-ghost">
          Se menukortet
        </Link>
      </div>
    </main>
  );
}
