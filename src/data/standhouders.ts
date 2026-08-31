// src/data/standhouders.ts
// Centrale dataset voor standhouders / exposanten

export interface ExhibitorItem {
  id: string;
  name: string;
  category: 'scotch' | 'dutch' | 'independent' | 'world' | 'catering' | 'organisation';
  brands: string[];
  description: string;
  isNotOnMap?: boolean;
}

export const EXHIBITORS_DEN_HAAG: ExhibitorItem[] = [
  { id: "1", name: "Distilleerderij de Bronckhorst", category: "dutch", brands: ["Nederlandse Whisky"], description: "Ambachtelijke Nederlandse single malt whisky, ter plaatse gedistilleerd in de Achterhoek." },
  { id: "2", name: "Mitra", category: "world", brands: ["Merken volgen later"], description: "Mitra slijterijen presenteert een gevarieerde selectie van bekende en zeldzame whisky's." },
  { id: "3", name: "Bresser en Timmer", category: "scotch", brands: ["Craft Spirits", "Merken volgen later"], description: "Toonaangevende importeur van craft spirits. Is 1 stand geworden (stand 3 & 4) t.o.v. 2025." },
  { id: "4", name: "Bresser en Timmer", category: "scotch", brands: ["Craft Spirits", "Merken volgen later"], description: "Toonaangevende importeur van craft spirits. Is 1 stand geworden (stand 3 & 4) t.o.v. 2025." },
  { id: "5", name: "Cley Whisky + Cley Warehouse", category: "dutch", brands: ["Nederlandse Whisky (Rotterdam)"], description: "Rotterdamse craft distilleerderij die eigentijdse single malt en rye whisky's maakt met lokaal graan." },
  { id: "6", name: "SMWS (Scotch Malt Whisky Society)", category: "world", brands: ["Whisky Club"], description: "De Schotse Malt Whisky Society biedt exclusieve single cask bottelingen voor clubleden." },
  { id: "7", name: "De Monnik Dranken", category: "scotch", brands: ["Merken volgen later"], description: "Familiebedrijf en importeur met een prachtig portfolio aan Schotse single malts." },
  { id: "8", name: "Whisky Import Nederland (WIN)", category: "independent", brands: ["Merken volgen later"], description: "Importeur van exclusieve onafhankelijke bottelingen." },
  { id: "9", name: "Cane & Grain", category: "independent", brands: ["Merken volgen later"], description: "Onafhankelijke bottelingen en unieke single casks." },
  { id: "10", name: "Anker Amsterdam Spirits", category: "world", brands: ["Merken volgen later"], description: "Groothandel en importeur van diverse dranken en spirits." },
  { id: "11", name: "Diageo", category: "scotch", brands: ["Singleton", "Talisker", "Lagavulin"], description: "Klassieke Schotse single malts, van de zachte Singleton tot de intens rokerige Lagavulin en maritieme Talisker." },
  { id: "12", name: "Van Wees Holland", category: "independent", brands: ["Merken volgen later"], description: "Bekende importeur uit Amersfoort met een rijk aanbod aan onafhankelijke bottelingen." },
  { id: "13", name: "Maltstock", category: "world", brands: ["Whisky Club", "Trail begeleiders"], description: "Het gezelligste whisky-weekend ter wereld, met proeverijen en trail-begeleiding." },
  { id: "14", name: "Brouwers2Import", category: "world", brands: ["Merken volgen later", "Ardbeg", "Glenmorangie"], description: "Importeur van diverse internationale whisky's en gedistilleerd." },
  { id: "15", name: "Moët Hennessy", category: "scotch", brands: ["Ardbeg", "Glenmorangie"], description: "De ultieme Islay malts Ardbeg en de verfijnde Glenmorangie uit de hoogste ketels van Schotland." },
  { id: "16", name: "Trade in Spirits", category: "world", brands: ["Merken volgen later"], description: "Importeur van diverse premium spirits." },
  { id: "17", name: "International Whisky Society (IWS)", category: "world", brands: ["Whisky Club", "Festival Bottelings door de jaren heen", "NIEUW en speciaal voor het 25-jarig jubileum", "Gifts", "Glazen"], description: "De International Whisky Society viert het 25-jarig jubileum met exclusieve festivalbottelingen door de jaren heen, glazen en gifts!" },
  { id: "18", name: "BUS Whisky", category: "dutch", brands: ["Nederlandse Whisky"], description: "Duurzame Nederlandse single malt whisky, lokaal verbouwd op de BUS boerderij." },
  { id: "19", name: "Stand 19 (Centraal Eiland)", category: "organisation", brands: ["Proeftafel / Eiland"], description: "Centrale eiland standruimte." },
  { id: "20", name: "Helvetia Spirits", category: "world", brands: ["Zwitserse Whisky"], description: "Ambachtelijke single malt whisky uit Zwitserland." },
  { id: "21", name: "The Chamberick", category: "dutch", brands: ["Nederlandse Whisky"], description: "Lokale Nederlandse whisky uit Kamerik." },
  { id: "22", name: "Ben Becula Distillery", category: "scotch", brands: ["Ben Becula"], description: "Nieuwe distilleerderij van de Schotse Outer Hebrides." },
  { id: "23", name: "Willem’s Whisky", category: "dutch", brands: ["Merken volgen later"], description: "Ambachtelijke Nederlandse whisky." },
  { id: "24", name: "Het Anker België", category: "world", brands: ["Merken volgen later"], description: "Belgische whisky en bieren van stokerij Het Anker." },
  { id: "25", name: "Bresser en Timmer (Proeftafel)", category: "scotch", brands: ["Merken volgen later"], description: "Extra proeftafel van Bresser en Timmer." },
  { id: "27", name: "Nog te VERKOPEN als stand", category: "organisation", brands: ["Volgt asap"], description: "Standruimte beschikbaar." },
  { id: "28", name: "Bacardi", category: "world", brands: ["Teeling", "Meer merken volgen later"], description: "Importeur van Teeling Irish Whiskey en andere premium merken." },
  { id: "29", name: "Remy Cointreau", category: "scotch", brands: ["Bruichladdich"], description: "Progressieve Islay distilleerderij, producent van Bruichladdich, Port Charlotte en Octomore." },
  { id: "30", name: "Well of Wine", category: "world", brands: ["Wijnen & Proeverij"], description: "Wijnen en proeverij selectie op het festival." },
  { id: "31", name: "La Martiniquaise Benelux", category: "scotch", brands: ["Merken volgen later"], description: "Toegankelijke Speyside single malts met rijping op diverse vaten." },
  { id: "32", name: "Dutch Whisky Teers", category: "independent", brands: ["Merken volgen later"], description: "Onafhankelijke bottelaars van bijzondere en zeldzame whisky's." },
  { id: "34", name: "Barrel Tea", category: "catering", brands: ["Alcohol vrije whisky – Thee", "Gifts"], description: "Alcoholvrije whisky-thee en diverse whisky-gerelateerde gifts." },
  { id: "35", name: "Brugse Whisky Company", category: "world", brands: ["Belgische Whisky uit Brugge"], description: "Belgische single malt en rye whisky uit Brugge." },
  { id: "36", name: "Perfect Dram", category: "independent", brands: ["Merken volgen later"], description: "Standruimte voor Perfect Dram." },
  { id: "37", name: "Absolutely Nuts Spirits", category: "independent", brands: ["Craft Spirits"], description: "Ambachtelijke gedistilleerde dranken en whisky." },
  { id: "38", name: "Nog te VERKOPEN als stand", category: "organisation", brands: ["Volgt asap"], description: "Standruimte beschikbaar." },
  { id: "39", name: "Worsten-stand", category: "catering", brands: ["Afhalen worstenplateau tijden VIP sessie", "Verkoop Worsten", "Verkoop hapjes"], description: "Uitgifte van worstenplateaus tijdens VIP sessies, verkoop van worsten en hapjes." },
  { id: "40", name: "Barrel Atelier", category: "catering", brands: ["Gifts"], description: "Ambachtelijke meubels en accessoires gemaakt van gebruikte eikenhouten whiskyvaten." },
  { id: "41", name: "Whisky Boeken – Whisky Passion", category: "catering", brands: ["Gifts en boeken"], description: "Het bekende tijdschrift Whisky Passion en diverse whiskyboeken & gifts." },
  { id: "42", name: "Kapel Noord (Tasting Room)", category: "organisation", brands: ["Exclusieve Tasting Room"], description: "Exclusieve tasting room in Kapel Noord." },
  { id: "43", name: "Stokerij Sculte", category: "dutch", brands: ["Nederlandse Whisky"], description: "Bekroonde Nederlandse single malt whisky, gerijpt op Twents eiken." },
  { id: "44", name: "De Monnik Dranken (Tafel B)", category: "scotch", brands: ["Merken volgen later"], description: "Extra tasting proeftafel van De Monnik Dranken." },
  { id: "45", name: "Disaronno International", category: "world", brands: ["The Irishman", "Cotswolds", "Meer merken volgen later"], description: "Importeur van The Irishman Irish Whiskey en Cotswolds single malt." },
  { id: "46", name: "Maple & More", category: "world", brands: ["Whisky Likeur uit Canada"], description: "Canadian Whisky Liqueur." },
  { id: "47", name: "Koninklijke De Kuyper", category: "world", brands: ["Bowmore", "Laphroaig", "House of Suntory"], description: "De Kuyper Royal Distillers toont legendarische turfwhisky's (Bowmore, Laphroaig) en Japanse whisky's van House of Suntory." },
  { id: "48", name: "Perfect Dram (Stand 48)", category: "independent", brands: ["Merken volgen later"], description: "Tasting stand van Perfect Dram." },
  { id: "O", name: "Organisatie & Infobalie", category: "organisation", brands: ["Algemene Vragen", "Muntinname", "Plattegronden"], description: "De centrale organisatiebalie voor al uw praktische vragen over het festival, muntinname en programmaonderdelen." },
  { id: "S", name: "S: Slijterij", category: "organisation", brands: ["Selectie flessen die te koop is"], description: "De officiële festivalslijterij waar u geselecteerde flessen kunt kopen." },
  { id: "C", name: "C: Catering", category: "catering", brands: ["Afhalen bitterballen plateau tijdens VIP sessie", "Food"], description: "Afhalen bitterballen plateau tijdens VIP sessie, snacks en catering." },
  { id: "U", name: "U: Uitgifte glazen & bottelingen", category: "organisation", brands: ["Uitgifte glazen in het begin", "Uitgifte festival botteling aan het einde van de sessie"], description: "Uitgifte van festivalproefglazen bij de entree en uitgifte van festivalbottelingen aan het einde van de sessie." },
  
  // Niet op de plattegrond
  { id: "NP1", name: "Demi’s Chocolaterie", category: "catering", brands: ["Food", "Gifts", "Whisky Bonbons"], description: "Ambachtelijke chocolade, gifts en whisky bonbons.", isNotOnMap: true },
  { id: "NP2", name: "Kiltshop", category: "catering", brands: ["Gifts", "Kleding"], description: "Traditionele Schotse kilts, kleding en accessoires.", isNotOnMap: true },
  { id: "NP3", name: "Van Weringhs Whisky World", category: "independent", brands: ["Oude Whisky’s", "Specials"], description: "Zeldzame en oude whisky specials.", isNotOnMap: true },
  { id: "NP4", name: "Kaas Ad Rehorst", category: "catering", brands: ["Uitgifte kaas-plateau’s tijden VIP sessie", "Gifts", "Verkoop kaas-plateau"], description: "Uitgifte kaas-plateaus tijdens VIP sessies, gifts en verkoop van kaasplateaus.", isNotOnMap: true },
  { id: "NP5", name: "Whisky Base", category: "world", brands: ["Whisky Database & Community"], description: "De grootste online whisky database en community ter wereld.", isNotOnMap: true }
];
