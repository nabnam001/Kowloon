import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kowloon Aarhus",
    short_name: "Kowloon",
    description:
      "Autentisk kinesisk, thailandsk og vietnamesisk mad i hjertet af Aarhus siden 1999.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0A14",
    theme_color: "#0B0A14",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
