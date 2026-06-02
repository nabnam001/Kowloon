export type Lang = "da" | "en";

export const translations = {
  da: {
    nav: {
      home: "Forside",
      menu: "Menukort",
      about: "Om os",
      locations: "Find os",
      contact: "Kontakt",
    },
    hero: {
      kicker: "Asiatisk køkken i Aarhus C siden 1999",
      title: "En smagsrejse gennem Asien",
      subtitle:
        "Autentiske retter fra Kina, Thailand og Vietnam — friske råvarer, wokken i fuld fart og over 50 retter à la carte.",
      ctaMenu: "Se menukortet",
      ctaBook: "Ring og book bord",
      scroll: "Rul ned",
    },
    highlights: {
      title: "Hvorfor Kowloon?",
      subtitle: "Tre køkkener. Én livlig restaurant. Ægte håndværk.",
      items: [
        {
          title: "Over 25 års erfaring",
          text: "Vi har serveret asiatisk mad i Aarhus siden 1999 og kender vores håndværk.",
        },
        {
          title: "3 køkkener i ét",
          text: "Kinesisk, thailandsk og vietnamesisk — mere end 50 retter à la carte.",
        },
        {
          title: "Elite Smiley",
          text: "Fødevarestyrelsens Elite Smiley — kvalitet og hygiejne i top.",
        },
        {
          title: "Take-away box",
          text: "Fyld en box fra buffeten og tag smagene med på farten.",
        },
      ],
    },
    menu: {
      kicker: "Menukort",
      title: "Udforsk menuen",
      subtitle: "Filtrér efter køkken, vegetarisk eller styrke. Tryk på en ret for detaljer.",
      filters: {
        all: "Alle",
        veg: "Vegetar",
        vegan: "Vegansk",
        new: "Nyheder",
        spicy: "Stærk",
      },
      search: "Søg i menuen…",
      empty: "Ingen retter matcher dit valg.",
      allergens: "Allergener",
      spice: "Styrke",
      vegLabel: "Vegetarmulig",
      veganLabel: "Vegansk mulig",
      newLabel: "Nyhed",
      noImage: "Foto følger snart",
      count: (n: number) => `${n} retter`,
    },
    deals: {
      kicker: "Menutilbud",
      title: "Sæt din egen menu",
      two: "2-retters menu",
      three: "3-retters menu",
      forret: "Forret",
      hovedret: "Hovedret",
      dessert: "Dessert",
      single: { forret: "Forret", hovedret: "Hovedret", dessert: "Dessert" },
      takeaway: "Take-away box fra buffeten",
      extras: "Ekstra tilbehør",
    },
    about: {
      kicker: "Om Kowloon",
      title: "Navnet kommer fra Hong Kong",
      p1: "Kowloon er en bydel i Hong Kong. Den er multietnisk, summer altid af liv og byder på et hav af spisesteder med masser af spændende madoplevelser — mest med oprindelse i det asiatiske køkken.",
      p2: "Det har givet inspiration til Restaurant Kowloon på Frederiksgade, som også summer af liv. Der er altid fart på i restauranten, og den er altid fyldt med mennesker.",
      p3: "Vi har serveret asiatisk mad siden 1999 og tilbyder i dag mere end 50 velsmagende à la carte retter fra det kinesiske, thailandske og vietnamesiske køkken. Kom forbi og få en asiatisk smagsoplevelse!",
    },
    locations: {
      kicker: "Find os",
      title: "To restauranter i Aarhus centrum",
      subtitle: "Tæt på biografer, rådhuset, Aros, Ridehuset og Musikhuset.",
      call: "Ring",
      directions: "Vis rute",
      visit: "Besøg siden",
    },
    contact: {
      kicker: "Kontakt & åbningstider",
      title: "Vi glæder os til at se dig",
      hours: "Åbningstider",
      reach: "Kontakt",
      follow: "Følg os",
      bookTitle: "Bordbestilling & take-away",
      bookText:
        "Bordbestilling og take-away klares nemmest over telefonen eller i restauranten. Vi tager ikke imod bestillinger via mail.",
    },
    footer: {
      tagline: "Smag på det asiatiske køkken",
      rights: "Alle rettigheder forbeholdes",
      built: "Genopbygget med kærlighed til det asiatiske køkken",
    },
  },
  en: {
    nav: {
      home: "Home",
      menu: "Menu",
      about: "About",
      locations: "Find us",
      contact: "Contact",
    },
    hero: {
      kicker: "Asian cuisine in Aarhus C since 1999",
      title: "A flavour journey through Asia",
      subtitle:
        "Authentic dishes from China, Thailand and Vietnam — fresh produce, woks at full blast and 50+ à la carte dishes.",
      ctaMenu: "See the menu",
      ctaBook: "Call to book a table",
      scroll: "Scroll down",
    },
    highlights: {
      title: "Why Kowloon?",
      subtitle: "Three kitchens. One lively restaurant. Real craft.",
      items: [
        {
          title: "25+ years of experience",
          text: "Serving Asian food in Aarhus since 1999 — we know our craft.",
        },
        {
          title: "3 kitchens in one",
          text: "Chinese, Thai and Vietnamese — more than 50 à la carte dishes.",
        },
        {
          title: "Elite Smiley",
          text: "The Danish food authority's Elite Smiley — top quality and hygiene.",
        },
        {
          title: "Take-away box",
          text: "Fill a box from the buffet and take the flavours with you.",
        },
      ],
    },
    menu: {
      kicker: "Menu",
      title: "Explore the menu",
      subtitle: "Filter by cuisine, vegetarian or heat. Tap a dish for details.",
      filters: {
        all: "All",
        veg: "Vegetarian",
        vegan: "Vegan",
        new: "New",
        spicy: "Spicy",
      },
      search: "Search the menu…",
      empty: "No dishes match your selection.",
      allergens: "Allergens",
      spice: "Heat",
      vegLabel: "Vegetarian option",
      veganLabel: "Vegan option",
      newLabel: "New",
      noImage: "Photo coming soon",
      count: (n: number) => `${n} dishes`,
    },
    deals: {
      kicker: "Set menus",
      title: "Build your own menu",
      two: "2-course menu",
      three: "3-course menu",
      forret: "Starter",
      hovedret: "Main",
      dessert: "Dessert",
      single: { forret: "Starter", hovedret: "Main", dessert: "Dessert" },
      takeaway: "Take-away box from the buffet",
      extras: "Extra sides",
    },
    about: {
      kicker: "About Kowloon",
      title: "The name comes from Hong Kong",
      p1: "Kowloon is a district of Hong Kong. It is multi-ethnic, always buzzing with life and home to countless eateries full of exciting food experiences — mostly rooted in Asian cuisine.",
      p2: "That inspired Restaurant Kowloon on Frederiksgade, which also buzzes with life. There's always something going on, and the place is always full of people.",
      p3: "We've served Asian food since 1999 and today offer more than 50 delicious à la carte dishes from Chinese, Thai and Vietnamese kitchens. Drop by for an Asian taste experience!",
    },
    locations: {
      kicker: "Find us",
      title: "Two restaurants in central Aarhus",
      subtitle: "Close to cinemas, the city hall, Aros, Ridehuset and Musikhuset.",
      call: "Call",
      directions: "Directions",
      visit: "Visit page",
    },
    contact: {
      kicker: "Contact & hours",
      title: "We look forward to seeing you",
      hours: "Opening hours",
      reach: "Contact",
      follow: "Follow us",
      bookTitle: "Table booking & take-away",
      bookText:
        "Table bookings and take-away are easiest by phone or in the restaurant. We don't take orders by email.",
    },
    footer: {
      tagline: "Taste the Asian kitchen",
      rights: "All rights reserved",
      built: "Rebuilt with love for Asian cuisine",
    },
  },
} as const;

export type Dict = (typeof translations)["da"];
