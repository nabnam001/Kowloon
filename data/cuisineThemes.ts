// Theming for the "Culinary Journey" — each cuisine is its own immersive world.
// Colors, gradients, cultural motifs and a curated set of signature dishes.

export type JourneyKey = "kina" | "thailand" | "vietnam";

export interface CuisineTheme {
  key: JourneyKey;
  /** ISO-ish label for the boarding-pass feel */
  code: string;
  country: { da: string; en: string };
  flag: string;
  tagline: { da: string; en: string };
  intro: { da: string; en: string };
  /** primary accent + glow used across the scene */
  accent: string;
  accentSoft: string;
  glow: string;
  /** full-bleed background gradient for the scene */
  bg: string;
  /** position of the destination on the stylised Asia map (viewBox 0 0 400 300) */
  mapPoint: { x: number; y: number };
  /** curated, photogenic signature dish ids (must have images) */
  signatures: string[];
}

export const cuisineThemes: CuisineTheme[] = [
  {
    key: "kina",
    code: "CN",
    country: { da: "Kina", en: "China" },
    flag: "🇨🇳",
    tagline: {
      da: "Wokken i fuld fart",
      en: "Woks at full blast",
    },
    intro: {
      da: "Sprøde ænder, røget østerssauce og glaserede klassikere fra Hong Kongs travle gader.",
      en: "Crispy ducks, smoky oyster sauce and glazed classics from Hong Kong's bustling streets.",
    },
    accent: "#B23A2E",
    accentSoft: "#D8D0C0",
    glow: "rgba(178,58,46,0.30)",
    bg: "radial-gradient(ellipse at 30% 18%, rgba(236,230,218,0.05), transparent 55%), radial-gradient(ellipse at 80% 85%, rgba(178,58,46,0.12), transparent 55%), linear-gradient(160deg, #121214 0%, #0B0B0C 60%, #060607 100%)",
    mapPoint: { x: 300, y: 150 },
    signatures: ["21", "22", "19", "13", "5", "6", "15", "12"],
  },
  {
    key: "thailand",
    code: "TH",
    country: { da: "Thailand", en: "Thailand" },
    flag: "🇹🇭",
    tagline: {
      da: "Karry, kokos & krydderier",
      en: "Curry, coconut & spice",
    },
    intro: {
      da: "Cremede karryretter, friske krydderurter og syrlig balance fra det thailandske køkken.",
      en: "Creamy curries, fresh herbs and that sour-sweet balance from the Thai kitchen.",
    },
    accent: "#B23A2E",
    accentSoft: "#D8D0C0",
    glow: "rgba(178,58,46,0.26)",
    bg: "radial-gradient(ellipse at 25% 22%, rgba(236,230,218,0.06), transparent 55%), radial-gradient(ellipse at 82% 80%, rgba(178,58,46,0.10), transparent 55%), linear-gradient(160deg, #131314 0%, #0B0B0C 58%, #060607 100%)",
    mapPoint: { x: 300, y: 286 },
    signatures: ["47", "46", "32", "37", "59", "60", "62", "42"],
  },
  {
    key: "vietnam",
    code: "VN",
    country: { da: "Vietnam", en: "Vietnam" },
    flag: "🇻🇳",
    tagline: {
      da: "Dampende nudelsupper",
      en: "Steaming noodle soups",
    },
    intro: {
      da: "Aromatiske phở, hjemmelavede nudler og friske urter — sjælen i det vietnamesiske køkken.",
      en: "Aromatic phở, house-made noodles and fresh herbs — the soul of Vietnamese cooking.",
    },
    accent: "#B23A2E",
    accentSoft: "#D8D0C0",
    glow: "rgba(178,58,46,0.28)",
    bg: "radial-gradient(ellipse at 30% 20%, rgba(236,230,218,0.05), transparent 55%), radial-gradient(ellipse at 78% 82%, rgba(178,58,46,0.11), transparent 55%), linear-gradient(160deg, #121213 0%, #0B0B0C 60%, #060607 100%)",
    mapPoint: { x: 342, y: 300 },
    signatures: ["34", "74", "89", "81", "87", "82", "36", "29"],
  },
];
