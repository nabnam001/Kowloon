// Drinks & wine, transcribed from kowloon.dk

import type { Lang } from "@/data/i18n";

export interface DrinkLine {
  label: string;
  labelEn?: string;
  price: number;
}

export interface DrinkItem {
  img?: string; // key under /images/drinks
  name: string;
  nameEn?: string;
  price?: number;
  options?: string[];
  optionsEn?: string[];
  lines?: DrinkLine[];
}

/** Localized view of a drink. */
export function localizeDrink(d: DrinkItem, lang: Lang) {
  return {
    name: lang === "en" ? d.nameEn ?? d.name : d.name,
    options: lang === "en" ? d.optionsEn ?? d.options : d.options,
    lines: d.lines?.map((l) => ({
      label: lang === "en" ? l.labelEn ?? l.label : l.label,
      price: l.price,
    })),
  };
}

export const milkshake: DrinkItem = {
  img: "milkshake",
  name: "Milkshake",
  price: 60,
  options: [
    "Kiwi",
    "Jordbær",
    "Durian",
    "Blåbær",
    "Soursop",
    "Avokado",
    "Jackfruit",
    "Ananas/banan",
    "Blåbær/jordbær",
  ],
  optionsEn: [
    "Kiwi",
    "Strawberry",
    "Durian",
    "Blueberry",
    "Soursop",
    "Avocado",
    "Jackfruit",
    "Pineapple/banana",
    "Blueberry/strawberry",
  ],
};

export const sodavandStor: DrinkItem = {
  img: "cola-stor",
  name: "Sodavand (50 cl.)",
  nameEn: "Soft drink (50 cl.)",
  price: 40,
  options: ["Stor cola", "Stor cola zero"],
  optionsEn: ["Large cola", "Large cola zero"],
};

export const sodavandLille: DrinkItem = {
  img: "cola-lille",
  name: "Sodavand (25 cl.)",
  nameEn: "Soft drink (25 cl.)",
  price: 25,
  options: [
    "Lille cola",
    "Lille cola zero",
    "Sprite",
    "Fanta",
    "Danskvand med citrus",
    "Æblemost",
    "Appelsinjuice",
    "Cocio",
  ],
  optionsEn: [
    "Small cola",
    "Small cola zero",
    "Sprite",
    "Fanta",
    "Sparkling water w/ citrus",
    "Apple juice",
    "Orange juice",
    "Cocio (choc. milk)",
  ],
};

export const vand: DrinkItem = {
  img: "vand",
  name: "Vand",
  nameEn: "Water",
  lines: [
    { label: "Kildevand", labelEn: "Spring water", price: 20 },
    { label: "Glas isvand", labelEn: "Glass of iced water", price: 10 },
    { label: "Kande isvand", labelEn: "Jug of iced water", price: 30 },
  ],
};

export const ol: DrinkItem = {
  img: "ol-tuborg-pilsner",
  name: "Øl (33 cl.)",
  nameEn: "Beer (33 cl.)",
  price: 40,
  options: [
    "Saigon – vietnamesisk",
    "Singha – thailandsk",
    "Tsingtao – kinesisk",
    "Tuborg pilsner",
    "Tuborg classic",
  ],
  optionsEn: [
    "Saigon – Vietnamese",
    "Singha – Thai",
    "Tsingtao – Chinese",
    "Tuborg pilsner",
    "Tuborg classic",
  ],
};

export const kaffeTe: DrinkItem = {
  img: "kaffe-te",
  name: "Kaffe og te",
  nameEn: "Coffee & tea",
  lines: [
    { label: "Kop kaffe eller te", labelEn: "Cup of coffee or tea", price: 15 },
    { label: "Kande kaffe eller te", labelEn: "Pot of coffee or tea", price: 30 },
    { label: "Vietnamesisk iskaffe", labelEn: "Vietnamese iced coffee", price: 30 },
    { label: "Ingefær-iste", labelEn: "Ginger iced tea", price: 30 },
  ],
};

export const drinks: DrinkItem[] = [
  milkshake,
  sodavandStor,
  sodavandLille,
  vand,
  ol,
  kaffeTe,
];

export type WineType =
  | "Hvidvin"
  | "Rødvin"
  | "Rosévin"
  | "Mousserende vin"
  | "Husets vin";

export const WINE_TYPE_EN: Record<WineType, string> = {
  Hvidvin: "White wine",
  Rødvin: "Red wine",
  Rosévin: "Rosé wine",
  "Mousserende vin": "Sparkling wine",
  "Husets vin": "House wine",
};

export interface Wine {
  id: string;
  img?: string;
  ext?: string; // file extension, defaults to "png"
  name: string;
  type: WineType;
  price: number;
  desc: string;
  descEn?: string;
}

/** Localized view of a wine. */
export function localizeWine(w: Wine, lang: Lang) {
  return {
    name: w.name,
    type: lang === "en" ? WINE_TYPE_EN[w.type] : w.type,
    desc: lang === "en" ? w.descEn ?? w.desc : w.desc,
  };
}

export const houseWine: Wine = {
  id: "vin-lille",
  img: "vin-lille",
  name: "Lille 25 cl. flaske vin",
  type: "Husets vin",
  price: 60,
  desc:
    "Vælg mellem rød, hvid eller rosévin. Der følger 1 glas isvand med 1 lille flaske vin. Der følger 1 kande isvand med 1 flaske vin.",
  descEn:
    "Choose red, white or rosé. A glass of iced water is included with a small bottle; a jug of iced water with a full bottle.",
};

export const wines: Wine[] = [
  {
    id: "201",
    img: "201",
    name: "Les Grés, Chardonnay-Viognier",
    type: "Hvidvin",
    price: 200,
    desc:
      "Fra Languedoc Roussillon i Sydfrankrig. Druerne plukkes om natten for at bevare friskheden. Den fyldige smagskombination af Chardonnay og Viognier er perfekt til fisk og skaldyr.",
    descEn:
      "From Languedoc Roussillon in southern France. The grapes are picked at night to preserve freshness. The full-bodied blend of Chardonnay and Viognier pairs perfectly with fish and seafood.",
  },
  {
    id: "202",
    img: "202",
    name: "Le Versant Viognier",
    type: "Hvidvin",
    price: 200,
    desc:
      "Spændende sydfransk hvidvin lavet 100% på Viognier-druer med en stor, nærmest fed fylde og afrundede noter af modne eksotiske frugter.",
    descEn:
      "An exciting southern-French white made 100% from Viognier grapes, with a big, almost rich body and rounded notes of ripe exotic fruit.",
  },
  {
    id: "203",
    img: "203",
    name: "Oppenheimer Riesling Feinherb",
    type: "Hvidvin",
    price: 250,
    desc:
      "Forfriskende halvtør tysk hvidvin med perfekt balance mellem modne frugter, livlig syre og mild sødme. Særdeles anvendelig til fiskeretter og krydrede retter.",
    descEn:
      "A refreshing off-dry German white with a perfect balance of ripe fruit, lively acidity and mild sweetness. Wonderful with fish and spiced dishes.",
  },
  {
    id: "204",
    img: "204",
    name: "Extrait de Romarion Chardonnay",
    type: "Hvidvin",
    price: 200,
    desc:
      "Flot hvidvin fra det sydlige Frankrig, delvist lagret på nye fade. Masser af frisk æble og citrus med fedmefulde noter fra fadlagringen. En helstøbt Chardonnay.",
    descEn:
      "A handsome white from southern France, partly oak-aged. Plenty of fresh apple and citrus with richer notes from the barrel. A well-rounded Chardonnay.",
  },
  {
    id: "205",
    img: "205",
    ext: "webp",
    name: "Les Amours d'Haut Gleon Rosé",
    type: "Rosévin",
    price: 200,
    desc:
      "Flot og smagfuld rosévin fra Corbieres i Sydfrankrig. Tør, meget aromatisk og fyldt med noter af røde bær og modne frugter.",
    descEn:
      "A handsome, flavourful rosé from Corbières in southern France. Dry, very aromatic and full of red-berry and ripe-fruit notes.",
  },
  {
    id: "206",
    img: "206",
    name: "Le Versant Grenache Rosé",
    type: "Rosévin",
    price: 200,
    desc:
      "Skøn rosévin fra Sydfrankrig lavet på Grenache-druer. Dejlig fyldig med en lækker, afrundet smag. Velegnet til mange krydrede asiatiske retter.",
    descEn:
      "A lovely southern-French rosé made from Grenache. Pleasantly full-bodied with a smooth, rounded taste. Great with many spiced Asian dishes.",
  },
  {
    id: "207",
    img: "207",
    name: "Primitivo, Duca del Salento",
    type: "Rødvin",
    price: 200,
    desc:
      "Flot rødvin lavet på Primitivo-druer fra Puglia i Sydøstitalien. Nuanceret med en dejlig solmoden fylde, der passer godt til de krydrede asiatiske retter.",
    descEn:
      "A handsome red from Primitivo grapes in Puglia, south-eastern Italy. Nuanced with a lovely sun-ripened body that suits spiced Asian dishes well.",
  },
  {
    id: "208",
    img: "208",
    name: "Valpolicella Ripasso, Villa Mattielli",
    type: "Rødvin",
    price: 250,
    desc:
      "Nuanceret og kompleks ripasso. Den runde, frugtige fylde har nuancer af bl.a. kirsebær med fine tanniner, der giver vinen rygrad.",
    descEn:
      "A nuanced, complex ripasso. The round, fruity body has notes of cherry, with fine tannins that give the wine backbone.",
  },
  {
    id: "209",
    img: "209",
    name: "Pago de Araiz Roble",
    type: "Rødvin",
    price: 200,
    desc:
      "Mediumkraftig rødvin fra Navarra i Nordspanien. Kåret som 'The Best Red Oaked Wine' i Navarra. Fyldig og harmonisk med silkeblød tekstur og fine vaniljenoter.",
    descEn:
      "A medium-bodied red from Navarra in northern Spain. Named 'The Best Red Oaked Wine' in Navarra. Full and harmonious with a silky texture and fine vanilla notes.",
  },
  {
    id: "210",
    img: "210",
    ext: "webp",
    name: "Pas si vite Grande Reserve G.S.M.",
    type: "Rødvin",
    price: 200,
    desc:
      "Mørk og mediumkraftig rødvin med varme krydderier pakket ind i noter af modne bær som hindbær og brombær. Afstemt lagring på egefade.",
    descEn:
      "A dark, medium-bodied red with warm spices wrapped in notes of ripe berries like raspberry and blackberry. Balanced oak ageing.",
  },
  {
    id: "211",
    img: "211",
    name: "Contrada del Falco",
    type: "Rødvin",
    price: 250,
    desc:
      "Mellem krydret rødvin fra Salento i Syditalien. Husets enkeltmarksvin lavet på gamle vinstokke. Kompleks og frugtrig med en mild druesødme.",
    descEn:
      "A medium-spiced red from Salento in southern Italy. The house single-vineyard wine made from old vines. Complex and fruit-rich with a mild grape sweetness.",
  },
  {
    id: "212",
    img: "212",
    name: "Cava Nu allongé, Semi-Seco",
    type: "Mousserende vin",
    price: 200,
    desc:
      "Rigtig flot mousserende vin fra Spanien med blide bobler og en ganske svag sødme. Nyd den for sig selv eller til mildt krydrede asiatiske retter.",
    descEn:
      "A really handsome sparkling wine from Spain with gentle bubbles and a faint sweetness. Enjoy on its own or with mildly spiced Asian dishes.",
  },
];
