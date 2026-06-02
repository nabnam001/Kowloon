// Central site configuration — locations, hours, contact, prices.
// All data transcribed from kowloon.dk. No backend; everything is static.

export interface Location {
  id: string;
  name: string;
  tagline: string;
  address: string;
  city: string;
  phone: string;
  phoneHref: string;
  mapsUrl: string;
  pageUrl: string;
  blurb: string;
}

export const locations: Location[] = [
  {
    id: "frederiksgade",
    name: "Restaurant Kowloon",
    tagline: "Vores store restaurant med ~70 pladser",
    address: "Frederiksgade 78",
    city: "8000 Aarhus C",
    phone: "86 19 19 98",
    phoneHref: "tel:+4586191998",
    mapsUrl: "https://maps.google.com/?q=Restaurant+Kowloon+Frederiksgade+78+Aarhus",
    pageUrl: "https://www.kowloon.dk/frederiksgade/frederiksgade.html",
    blurb:
      "Nær Rema1000 og Karma Sushi. Sæt dig til rette i en livlig atmosfære, eller fyld en take-away box fra buffeten.",
  },
  {
    id: "banegaardsgade",
    name: "Den 'lille' Kowloon",
    tagline: "Hyggeligt spisested nær banegården",
    address: "Banegårdsgade 33",
    city: "8000 Aarhus C",
    phone: "86 19 42 11",
    phoneHref: "tel:+4586194211",
    mapsUrl: "https://maps.google.com/?q=Kowloon+Banegaardsgade+33+Aarhus",
    pageUrl: "https://www.kowloon.dk/banegaardsgade/banegaardsgade.html",
    blurb:
      "Nær Burger King og banegården. Et lille, intimt sted — perfekt til en hurtig asiatisk smagsoplevelse på farten.",
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
  notes: {
    da: [
      "Køkkenet lukker kl. 20.30",
      "Thaiboks lukker kl. 20.00",
    ],
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
