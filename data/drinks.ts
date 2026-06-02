// Drinks & wine, transcribed from kowloon.dk

export interface DrinkItem {
  img?: string; // key under /images/drinks
  name: string;
  price?: number;
  options?: string[];
  lines?: { label: string; price: number }[];
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
};

export const sodavandStor: DrinkItem = {
  img: "cola-stor",
  name: "Sodavand (50 cl.)",
  price: 40,
  options: ["Stor cola", "Stor cola zero"],
};

export const sodavandLille: DrinkItem = {
  img: "cola-lille",
  name: "Sodavand (25 cl.)",
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
};

export const vand: DrinkItem = {
  img: "vand",
  name: "Vand",
  lines: [
    { label: "Kildevand", price: 20 },
    { label: "Glas isvand", price: 10 },
    { label: "Kande isvand", price: 30 },
  ],
};

export const ol: DrinkItem = {
  img: "ol-tuborg-pilsner",
  name: "Øl (33 cl.)",
  price: 40,
  options: [
    "Saigon – vietnamesisk",
    "Singha – thailandsk",
    "Tsingtao – kinesisk",
    "Tuborg pilsner",
    "Tuborg classic",
  ],
};

export const kaffeTe: DrinkItem = {
  img: "kaffe-te",
  name: "Kaffe og te",
  lines: [
    { label: "Kop kaffe eller te", price: 15 },
    { label: "Kande kaffe eller te", price: 30 },
    { label: "Vietnamesisk iskaffe", price: 30 },
    { label: "Ingefær-iste", price: 30 },
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

export interface Wine {
  id: string;
  img?: string;
  ext?: string; // file extension, defaults to "png"
  name: string;
  type: "Hvidvin" | "Rødvin" | "Rosévin" | "Mousserende vin" | "Husets vin";
  price: number;
  desc: string;
}

export const houseWine: Wine = {
  id: "vin-lille",
  img: "vin-lille",
  name: "Lille 25 cl. flaske vin",
  type: "Husets vin",
  price: 60,
  desc:
    "Vælg mellem rød, hvid eller rosévin. Der følger 1 glas isvand med 1 lille flaske vin. Der følger 1 kande isvand med 1 flaske vin.",
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
  },
  {
    id: "202",
    img: "202",
    name: "Le Versant Viognier",
    type: "Hvidvin",
    price: 200,
    desc:
      "Spændende sydfransk hvidvin lavet 100% på Viognier-druer med en stor, nærmest fed fylde og afrundede noter af modne eksotiske frugter.",
  },
  {
    id: "203",
    img: "203",
    name: "Oppenheimer Riesling Feinherb",
    type: "Hvidvin",
    price: 250,
    desc:
      "Forfriskende halvtør tysk hvidvin med perfekt balance mellem modne frugter, livlig syre og mild sødme. Særdeles anvendelig til fiskeretter og krydrede retter.",
  },
  {
    id: "204",
    img: "204",
    name: "Extrait de Romarion Chardonnay",
    type: "Hvidvin",
    price: 200,
    desc:
      "Flot hvidvin fra det sydlige Frankrig, delvist lagret på nye fade. Masser af frisk æble og citrus med fedmefulde noter fra fadlagringen. En helstøbt Chardonnay.",
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
  },
  {
    id: "206",
    img: "206",
    name: "Le Versant Grenache Rosé",
    type: "Rosévin",
    price: 200,
    desc:
      "Skøn rosévin fra Sydfrankrig lavet på Grenache-druer. Dejlig fyldig med en lækker, afrundet smag. Velegnet til mange krydrede asiatiske retter.",
  },
  {
    id: "207",
    img: "207",
    name: "Primitivo, Duca del Salento",
    type: "Rødvin",
    price: 200,
    desc:
      "Flot rødvin lavet på Primitivo-druer fra Puglia i Sydøstitalien. Nuanceret med en dejlig solmoden fylde, der passer godt til de krydrede asiatiske retter.",
  },
  {
    id: "208",
    img: "208",
    name: "Valpolicella Ripasso, Villa Mattielli",
    type: "Rødvin",
    price: 250,
    desc:
      "Nuanceret og kompleks ripasso. Den runde, frugtige fylde har nuancer af bl.a. kirsebær med fine tanniner, der giver vinen rygrad.",
  },
  {
    id: "209",
    img: "209",
    name: "Pago de Araiz Roble",
    type: "Rødvin",
    price: 200,
    desc:
      "Mediumkraftig rødvin fra Navarra i Nordspanien. Kåret som 'The Best Red Oaked Wine' i Navarra. Fyldig og harmonisk med silkeblød tekstur og fine vaniljenoter.",
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
  },
  {
    id: "211",
    img: "211",
    name: "Contrada del Falco",
    type: "Rødvin",
    price: 250,
    desc:
      "Mellem krydret rødvin fra Salento i Syditalien. Husets enkeltmarksvin lavet på gamle vinstokke. Kompleks og frugtrig med en mild druesødme.",
  },
  {
    id: "212",
    img: "212",
    name: "Cava Nu allongé, Semi-Seco",
    type: "Mousserende vin",
    price: 200,
    desc:
      "Rigtig flot mousserende vin fra Spanien med blide bobler og en ganske svag sødme. Nyd den for sig selv eller til mildt krydrede asiatiske retter.",
  },
];
