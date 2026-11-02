// src/data/boekjeDenHaagData.ts
// Exacte data uit het Google Sheets werkbestand voor het Festivalboekje Den Haag 2026 (8 pagina's - HelloPrint A5 Wikkelvouw)

export interface BoekjeStandhouder {
  id: string;
  name: string;
  note?: string;
}

export interface BoekjeMasterclass {
  sessie: 'Vrijdagmiddag' | 'Vrijdagavond' | 'Zaterdagmiddag' | 'Zaterdagavond' | 'Zondagmiddag';
  dagKort: string;
  tijd: string;
  code: string;
  titel: string;
  prijs: string;
  locatie: string;
  importeur: string;
}

// Uit tabblad: "Standh. lijs 2026"
export const STANDHOUDERS_BOEKJE_2026: BoekjeStandhouder[] = [
  { id: '01', name: "Demi's Chocolade" },
  { id: '02', name: 'De Kiltshop' },
  { id: '03', name: 'Bresser & Timmer' },
  { id: '04', name: 'Bresser & Timmer' },
  { id: '05', name: "Cley's Warehouse" },
  { id: '06', name: 'SMWS' },
  { id: '10', name: 'Craft Spirits' },
  { id: '11', name: 'Koninklijke de Kuyper (Bowmore, Laphroaig, Suntory)' },
  { id: '12', name: 'Van Wees Holland' },
  { id: '13', name: 'Malt Stock' },
  { id: '14', name: 'Moët Hennessy' },
  { id: '15', name: 'Brouwer2Import' },
  { id: '16', name: 'International Whisky Society (IWS/Club)' },
  { id: '17', name: 'Rampur Indian Single Malt' },
  { id: '18', name: 'The Whisky Fact' },
  { id: '19', name: 'Whisky Import Nederland' },
  { id: '20', name: 'BUS whisky' },
  { id: '21', name: 'The Chamberick' },
  { id: '22', name: 'Whisky Hammer' },
  { id: '23', name: 'Van Weringhs Whisky World' },
  { id: '24', name: 'Helvetia Spirits' },
  { id: '25', name: 'Cane & Grain' },
  { id: '26', name: 'Barrel Atelier' },
  { id: '27', name: 'Whisky Passion (boeken)' },
  { id: '28', name: 'Mitra' },
  { id: '29', name: 'Trade in Spirits' },
  { id: '30', name: 'Bacardi' },
  { id: '31', name: 'Remy Cointreau - Bruichladdich' },
  { id: '32', name: 'La Martiniquaise Benelux' },
  { id: '33', name: 'Distilleerderij de Bronckhorst' },
  { id: '34', name: 'Het Anker België' },
  { id: '35', name: "Willem's Whisky" },
  { id: '36', name: 'Brugse Whisky Company' },
  { id: '37', name: 'Dutch Whisky Teers' },
  { id: '38', name: 'Barrel Tea' },
  { id: '39', name: 'Absolutely Nuts Spirits' },
  { id: '40', name: 'Perfect Dram' },
  { id: '41', name: 'Worstenstand - Afhalen worstenplateau VIP' },
  { id: '42', name: 'WhiskyBozz' },
  { id: '43', name: 'Branderij de Buncker' },
  { id: '44', name: 'De Monnik Dranken' },
  { id: '45', name: 'Bosman Wijnkopers' },
  { id: '46', name: 'Alexanderhoeve Kaas - Afhalen kaasplateau VIP' },
  { id: '47', name: 'Whisky Base' },
  { id: '48', name: 'Maple&More' },
];

export const FACILITEITEN_BOEKJE_2026: BoekjeStandhouder[] = [
  { id: 'S', name: 'Festival Whisky Shop / Slijterij (Kapel)' },
  { id: 'U', name: 'Uitgifte glazen & festivalbottelingen' },
  { id: 'G', name: 'Garderobe & Uitgang' },
  { id: 'C', name: 'Catering & Snacks' },
  { id: 'O', name: 'Organisatie & Informatiestand' },
  { id: 'B', name: 'Buitenterrein: Vatenmaker & Foodtrucks' },
];

// Uit tabblad: "Alle MC voor F.boekje 2026" (Zonder Cley Warehouse Tastings conform instructie)
// Pagina 6: Vrijdagmiddag (7), Vrijdagavond (7) & Zaterdagmiddag (10) = 24 masterclasses
export const MASTERCLASSES_PAGINA_6: BoekjeMasterclass[] = [
  // Vrijdagmiddag (7)
  { sessie: 'Vrijdagmiddag', dagKort: 'Vr 13/11', tijd: '11:15–13:00', code: 'TOR-01', titel: 'Torentasting INCL. beklimming – Macallan', prijs: '€ 77,50', locatie: 'Toren-Zolder', importeur: 'Private bottelingen' },
  { sessie: 'Vrijdagmiddag', dagKort: 'Vr 13/11', tijd: '12:00–13:00', code: 'TOR-02', titel: 'Torentasting ZONDER beklimming – Macallan', prijs: '€ 70,00', locatie: 'Toren-Zolder', importeur: 'Private bottelingen' },
  { sessie: 'Vrijdagmiddag', dagKort: 'Vr 13/11', tijd: '12:15–13:00', code: 'VIP-01', titel: 'Teeling Irish Whiskey', prijs: '€ 20,00', locatie: 'Nutshuis - Spaarkamer', importeur: 'Bacardi' },
  { sessie: 'Vrijdagmiddag', dagKort: 'Vr 13/11', tijd: '12:15–13:00', code: 'VIP-03', titel: 'SMWS Single Casks', prijs: '€ 25,00', locatie: 'Nutshuis - Foyer', importeur: 'SMWS' },
  { sessie: 'Vrijdagmiddag', dagKort: 'Vr 13/11', tijd: '14:00–14:45', code: 'VIP-04', titel: 'Glenfiddich Old timers – Tony van Rooijen', prijs: '€ 55,00', locatie: 'Nutshuis - Telkamer', importeur: 'Private bottelingen' },
  { sessie: 'Vrijdagmiddag', dagKort: 'Vr 13/11', tijd: '14:00–14:45', code: 'VIP-06', titel: 'Glengoyne & Tamdhu', prijs: '€ 17,50', locatie: 'Nutshuis - Foyer', importeur: 'De Monnik Dranken' },
  { sessie: 'Vrijdagmiddag', dagKort: 'Vr 13/11', tijd: '15:30–16:15', code: 'VIP-09', titel: 'House of Suntory – Japanese Portfolio', prijs: '€ 20,00', locatie: 'Nutshuis - Foyer', importeur: 'De Kuyper' },

  // Vrijdagavond (7)
  { sessie: 'Vrijdagavond', dagKort: 'Vr 13/11', tijd: '18:30–19:15', code: 'VRIJ-AVOND-01', titel: 'Finn Thomson Single Casks', prijs: '€ 17,50', locatie: 'Nutshuis - Telkamer', importeur: 'Whisky Import NL' },
  { sessie: 'Vrijdagavond', dagKort: 'Vr 13/11', tijd: '18:30–19:15', code: 'VRIJ-AVOND-02', titel: 'Balvenie Old timers – Tony van Rooijen', prijs: '€ 65,00', locatie: 'Nutshuis - Foyer', importeur: 'Private bottelingen' },
  { sessie: 'Vrijdagavond', dagKort: 'Vr 13/11', tijd: '20:00–20:45', code: 'VRIJ-AVOND-03', titel: 'The Rise of Grain – De Bronckhorst', prijs: '€ 17,50', locatie: 'Nutshuis - Spaarkamer', importeur: 'De Bronckhorst' },
  { sessie: 'Vrijdagavond', dagKort: 'Vr 13/11', tijd: '20:00–20:45', code: 'VRIJ-AVOND-04', titel: 'NcNean Organic Distillery', prijs: '€ 25,00', locatie: 'Nutshuis - Telkamer', importeur: 'Craft Spirits' },
  { sessie: 'Vrijdagavond', dagKort: 'Vr 13/11', tijd: '20:00–20:45', code: 'VRIJ-AVOND-05', titel: 'Ardnamurchan – Adelphi', prijs: '€ 17,50', locatie: 'Nutshuis - Foyer', importeur: 'Whisky Import NL' },
  { sessie: 'Vrijdagavond', dagKort: 'Vr 13/11', tijd: '21:30–22:15', code: 'VRIJ-AVOND-07', titel: 'Filliers Distillery', prijs: '€ 17,50', locatie: 'Nutshuis - Telkamer', importeur: 'De Monnik Dranken' },
  { sessie: 'Vrijdagavond', dagKort: 'Vr 13/11', tijd: '21:30–22:15', code: 'VRIJ-AVOND-08', titel: 'Dram Mhor Single Casks', prijs: '€ 17,50', locatie: 'Nutshuis - Foyer', importeur: 'Whisky Import NL' },

  // Zaterdagmiddag (10)
  { sessie: 'Zaterdagmiddag', dagKort: 'Za 14/11', tijd: '11:15–13:00', code: 'TOR-03', titel: 'Torentasting INCL. beklimming – Bowmore', prijs: '€ 35,00', locatie: 'Toren-Zolder', importeur: 'De Kuyper' },
  { sessie: 'Zaterdagmiddag', dagKort: 'Za 14/11', tijd: '12:00–13:00', code: 'TOR-04', titel: 'Torentasting ZONDER beklimming – Bowmore', prijs: '€ 35,00', locatie: 'Toren-Zolder', importeur: 'De Kuyper' },
  { sessie: 'Zaterdagmiddag', dagKort: 'Za 14/11', tijd: '12:15–13:00', code: 'ZAT-MIDDAG-01', titel: 'Old-timers: Glenfiddich, Glen Grant, Port Ellen, Bunnahabhain', prijs: '€ 85,00', locatie: 'Nutshuis - Telkamer', importeur: 'Private bottelingen' },
  { sessie: 'Zaterdagmiddag', dagKort: 'Za 14/11', tijd: '12:15–13:00', code: 'ZAT-MIDDAG-02', titel: 'The Ultimate – Historische bottelingen', prijs: '€ 35,00', locatie: 'Nutshuis - Foyer', importeur: 'Van Wees' },
  { sessie: 'Zaterdagmiddag', dagKort: 'Za 14/11', tijd: '14:00–14:45', code: 'ZAT-MIDDAG-03', titel: 'Teeling Irish Whiskey', prijs: '€ 20,00', locatie: 'Nutshuis - Spaarkamer', importeur: 'Bacardi' },
  { sessie: 'Zaterdagmiddag', dagKort: 'Za 14/11', tijd: '14:00–14:45', code: 'ZAT-MIDDAG-04', titel: 'Currach Atlantic Seaweed Cask', prijs: '€ 17,50', locatie: 'Nutshuis - Telkamer', importeur: 'Whisky Import NL' },
  { sessie: 'Zaterdagmiddag', dagKort: 'Za 14/11', tijd: '14:00–14:45', code: 'ZAT-MIDDAG-05', titel: 'Brugs Heilig Water', prijs: '€ 25,00', locatie: 'Nutshuis - Foyer', importeur: 'Brugse Whisky Co.' },
  { sessie: 'Zaterdagmiddag', dagKort: 'Za 14/11', tijd: '15:30–16:15', code: 'ZAT-MIDDAG-06', titel: 'Ardnamurchan – Adelphi', prijs: '€ 17,50', locatie: 'Nutshuis - Spaarkamer', importeur: 'Whisky Import NL' },
  { sessie: 'Zaterdagmiddag', dagKort: 'Za 14/11', tijd: '15:30–16:15', code: 'ZAT-MIDDAG-07', titel: 'Benromach – Van Wees', prijs: '€ 25,00', locatie: 'Nutshuis - Telkamer', importeur: 'Van Wees' },
  { sessie: 'Zaterdagmiddag', dagKort: 'Za 14/11', tijd: '15:30–16:15', code: 'ZAT-MIDDAG-08', titel: 'Sakurao Japanese Distillery', prijs: '€ 20,00', locatie: 'Nutshuis - Foyer', importeur: 'Craft Spirits' },
];

// Pagina 7 Bovenin: Zaterdagavond (6) & Zondagmiddag (6) = 12 masterclasses
export const MASTERCLASSES_PAGINA_7: BoekjeMasterclass[] = [
  // Zaterdagavond (6)
  { sessie: 'Zaterdagavond', dagKort: 'Za 14/11', tijd: '18:30–19:15', code: 'ZAT-AVOND-01', titel: 'Old timers: Glenfiddich, Balvenie, Macallan & Highland Park', prijs: '€ 65,00', locatie: 'Nutshuis - Telkamer', importeur: 'Private bottelingen' },
  { sessie: 'Zaterdagavond', dagKort: 'Za 14/11', tijd: '18:30–19:15', code: 'ZAT-AVOND-02', titel: 'Teeling Irish Whiskey', prijs: '€ 20,00', locatie: 'Nutshuis - Foyer', importeur: 'Bacardi' },
  { sessie: 'Zaterdagavond', dagKort: 'Za 14/11', tijd: '20:00–20:45', code: 'ZAT-AVOND-03', titel: 'Glenfarclas Highland Single Malt', prijs: '€ 25,00', locatie: 'Nutshuis - Telkamer', importeur: 'Van Wees' },
  { sessie: 'Zaterdagavond', dagKort: 'Za 14/11', tijd: '20:00–20:45', code: 'ZAT-AVOND-04', titel: 'Amrut Indian Single Malt', prijs: '€ 17,50', locatie: 'Nutshuis - Spaarkamer', importeur: 'De Monnik Dranken' },
  { sessie: 'Zaterdagavond', dagKort: 'Za 14/11', tijd: '21:30–22:15', code: 'ZAT-AVOND-07', titel: 'Finn Thomson Single Casks', prijs: '€ 17,50', locatie: 'Nutshuis - Telkamer', importeur: 'Whisky Import NL' },
  { sessie: 'Zaterdagavond', dagKort: 'Za 14/11', tijd: '21:30–22:15', code: 'ZAT-AVOND-08', titel: 'Arran Single Malt', prijs: '€ 25,00', locatie: 'Nutshuis - Foyer', importeur: 'Van Wees' },

  // Zondagmiddag (6)
  { sessie: 'Zondagmiddag', dagKort: 'Zo 15/11', tijd: '11:15–13:00', code: 'TOR-05', titel: 'Torentasting INCL. beklimming – The Glenturret', prijs: '€ 37,50', locatie: 'Toren-Zolder', importeur: 'De Monnik Dranken' },
  { sessie: 'Zondagmiddag', dagKort: 'Zo 15/11', tijd: '12:00–13:00', code: 'TOR-06', titel: 'Torentasting ZONDER beklimming – The Glenturret', prijs: '€ 37,50', locatie: 'Toren-Zolder', importeur: 'De Monnik Dranken' },
  { sessie: 'Zondagmiddag', dagKort: 'Zo 15/11', tijd: '12:15–13:00', code: 'ZON-MIDDAG-01', titel: 'Lagg Single Malt Distillery', prijs: '€ 25,00', locatie: 'Nutshuis - Telkamer', importeur: 'Van Wees' },
  { sessie: 'Zondagmiddag', dagKort: 'Zo 15/11', tijd: '12:15–13:00', code: 'ZON-MIDDAG-02', titel: 'SMWS Single Casks', prijs: '€ 25,00', locatie: 'Nutshuis - Foyer', importeur: 'SMWS' },
  { sessie: 'Zondagmiddag', dagKort: 'Zo 15/11', tijd: '14:00–14:45', code: 'ZON-MIDDAG-05', titel: 'Tomintoul, Glencadam & Old Ballantruan', prijs: '€ 17,50', locatie: 'Nutshuis - Foyer', importeur: 'De Monnik Dranken' },
  { sessie: 'Zondagmiddag', dagKort: 'Zo 15/11', tijd: '15:30–16:15', code: 'ZON-MIDDAG-07', titel: 'Dram Mhor Single Casks', prijs: '€ 17,50', locatie: 'Nutshuis - Telkamer', importeur: 'Whisky Import NL' },
];
