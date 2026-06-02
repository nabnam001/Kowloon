// Central site configuration — locations, hours, contact, prices.
// All data transcribed from kowloon.dk. No backend; everything is static.

export interface Location {
  id: string;
  name: string;
  tagline: { da: string; en: string };
  address: string;
  city: string;
  phone: string;
  phoneHref: string;
  mapsUrl: string;
  pageUrl: string;
  blurb: { da: string; en: string };
  /** signature traits shown as a comparison */
  features: { da: string; en: string; has: boolean }[];
  /** headline stats */
  stats: { value: string; label: { da: string; en: string } }[];
  photo: string;
}

export const locations: Location[] = [
  {
    id: "frederiksgade",
    name: "Restaurant Kowloon",
    tagline: {
      da: "Den store oplevelse",
      en: "The full experience",
    },
    address: "Frederiksgade 78",
    city: "8000 Aarhus C",
    phone: "86 19 19 98",
    phoneHref: "tel:+4586191998",
    mapsUrl: "https://maps.google.com/?q=Restaurant+Kowloon+Frederiksgade+78+Aarhus",
    pageUrl: "https://www.kowloon.dk/frederiksgade/frederiksgade.html",
    blurb: {
      da: "Vores flagskib nær Rema1000 og Karma Sushi. Sæt dig til rette i den livlige stemning — eller fyld en take-away box fra buffeten.",
      en: "Our flagship near Rema1000 and Karma Sushi. Settle into the lively atmosphere — or fill a take-away box from the buffet.",
    },
    features: [
      { da: "70 siddepladser", en: "70 seats", has: true },
      { da: "Fuld à la carte", en: "Full à la carte", has: true },
      { da: "Take-away buffet box", en: "Take-away buffet box", has: true },
      { da: "Vin & øl udvalg", en: "Wine & beer selection", has: true },
      { da: "Bordbestilling", en: "Table reservations", has: true },
    ],
    stats: [
      { value: "70", label: { da: "pladser", en: "seats" } },
      { value: "50+", label: { da: "retter", en: "dishes" } },
      { value: "3", label: { da: "køkkener", en: "kitchens" } },
    ],
    photo: "/images/venue/front.png",
  },
  {
    id: "banegaardsgade",
    name: "Den 'lille' Kowloon",
    tagline: {
      da: "Hurtigt & hyggeligt",
      en: "Quick & cosy",
    },
    address: "Banegårdsgade 33",
    city: "8000 Aarhus C",
    phone: "86 19 42 11",
    phoneHref: "tel:+4586194211",
    mapsUrl: "https://maps.google.com/?q=Kowloon+Banegaardsgade+33+Aarhus",
    pageUrl: "https://www.kowloon.dk/banegaardsgade/banegaardsgade.html",
    blurb: {
      da: "Nær Burger King og banegården. Et lille, intimt sted — perfekt til en hurtig asiatisk smagsoplevelse på farten.",
      en: "Near Burger King and the station. A small, intimate spot — perfect for a quick Asian taste experience on the go.",
    },
    features: [
      { da: "Intim størrelse", en: "Intimate size", has: true },
      { da: "Take-away & på farten", en: "Take-away & on the go", has: true },
      { da: "Klassiske favoritter", en: "Classic favourites", has: true },
      { da: "Tæt på banegården", en: "Next to the station", has: true },
      { da: "Stor restaurant-buffet", en: "Large dine-in buffet", has: false },
    ],
    stats: [
      { value: "2 min", label: { da: "fra banegård", en: "from station" } },
      { value: "🥡", label: { da: "take-away", en: "take-away" } },
      { value: "1999", label: { da: "siden", en: "since" } },
    ],
    photo: "/images/venue/banegaardsgade-front.jpg",
  },
];

export const hours = {
  da: [
    { day: "Mandag", value: "Lukket", closed: true },
    { day: "Tirsdag", value: "12.00 – 21.00" },
    { day: "Onsdag", value: "12.00 – 21.00" },
    { day: "Torsdag", value: "12.00 – 21.00" },
    { day: "Fredag", value: "12.00 – 21.00" },
    { day: "Lørdag", value: "12.00 – 21.00" },
    { day: "Søndag", value: "12.00 – 21.00" },
  ],
  en: [
    { day: "Monday", value: "Closed", closed: true },
    { day: "Tuesday", value: "12.00 – 21.00" },
    { day: "Wednesday", value: "12.00 – 21.00" },
    { day: "Thursday", value: "12.00 – 21.00" },
    { day: "Friday", value: "12.00 – 21.00" },
    { day: "Saturday", value: "12.00 – 21.00" },
    { day: "Sunday", value: "12.00 – 21.00" },
  ],
  notes: {
    da: ["Køkkenet lukker kl. 20.30", "Thaiboks lukker kl. 20.00"],
    en: ["Kitchen closes at 20.30", "Thai-box closes at 20.00"],
  },
};

export const contact = {
  email: "Mail@kowloon.dk",
  emailNote: "(Ingen bordbestillinger og takeaway over mail)",
  facebook: "https://www.facebook.com/KowloonAarhus/",
  eliteSmiley: "https://www.findsmiley.dk/508461",
  cvr: "21 65 98 94",
  since: 1999,
};

// Take-away boxes filled from the buffet (Frederiksgade)
export const takeawayBoxes = [
  { size: "Lille box", price: 70 },
  { size: "Mellem box", price: 80 },
  { size: "Stor box", price: 90 },
];

// Menu pricing structure
export const pricing = {
  forret: 65,
  hovedret: 120,
  dessert: 50,
  menu2: 165,
  menu3: 205,
  menuNote: "Bemærk: ret nr. 20, 21 og 22 koster 20 kr. ekstra.",
};
