"use client";

import Image from "next/image";
import { useLang } from "./LangProvider";

export function SpiceMeter({
  level,
  size = 16,
}: {
  level: number;
  size?: number;
}) {
  const { t } = useLang();
  if (!level) return null;
  const label = `${t.menu.spice} ${level}/3`;
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={label}
      title={label}
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <Image
          key={i}
          src={`/brand/chilli${Math.min(i + 1, 3)}.png`}
          alt=""
          width={size}
          height={size}
          className={`h-4 w-4 object-contain transition-opacity ${
            i < level ? "opacity-100" : "opacity-20 grayscale"
          }`}
        />
      ))}
    </span>
  );
}
