// src/data/standhouders.ts
// Centrale dataset voor standhouders / exposanten (Gekoppeld aan Google Sheets & GoHighLevel Custom Objects)

export type ExhibitorCategory = 'scotch' | 'dutch' | 'independent' | 'world' | 'catering' | 'organisation';

export interface ExhibitorItem {
  id: string;
  mapSlot?: string;
  name: string;
  category: ExhibitorCategory;
  categories?: ExhibitorCategory[];
  brands: string[];
  description: string;
  isNotOnMap?: boolean;
}

export const EXHIBITORS_DEN_HAAG: ExhibitorItem[] = [
  {
    "id": "1",
    "name": "Demi's Chocolade",
    "category": "catering",
    "categories": [
      "catering"
    ],
    "brands": [
      "Whisky Bonbons",
      "Ambachtelijke Chocolade",
      "Gifts"
    ],
    "description": "Ambachtelijke chocolade, gifts en handgemaakte whiskybonbons.",
    "isNotOnMap": false
  },
  {
    "id": "2",
    "name": "De Kiltshop",
    "category": "catering",
    "categories": [
      "catering"
    ],
    "brands": [
      "Schotse Kilts",
      "Kleding",
      "Accessoires & Gifts"
    ],
    "description": "Traditionele Schotse kilts, kleding en authentieke Schotse accessoires.",
    "isNotOnMap": false
  },
  {
    "id": "3",
    "name": "Bresser & Timmer",
    "category": "scotch",
    "categories": [
      "scotch",
      "independent",
      "world"
    ],
    "brands": [
      "Springbank",
      "Kilchoman",
      "Glencadam",
      "Meikle Toir",
      "Craft Spirits"
    ],
    "description": "Toonaangevende importeur van karaktervolle Schotse single malts en onafhankelijke bottelingen (Stand 3 & 4).",
    "isNotOnMap": false
  },
  {
    "id": "4",
    "name": "Bresser & Timmer",
    "category": "scotch",
    "categories": [
      "scotch",
      "independent",
      "world"
    ],
    "brands": [
      "Springbank",
      "Kilchoman",
      "Glencadam",
      "Meikle Toir",
      "Craft Spirits"
    ],
    "description": "Toonaangevende importeur van karaktervolle Schotse single malts en onafhankelijke bottelingen (Stand 3 & 4).",
    "isNotOnMap": false
  },
  {
    "id": "5",
    "name": "Cley's Warehouse",
    "category": "dutch",
    "categories": [
      "dutch"
    ],
    "brands": [
      "Cley Single Malt",
      "Cley Rye",
      "Nederlandse Whisky (Rotterdam)"
    ],
    "description": "Rotterdamse craft distilleerderij die biologische single malt en rye whisky's stookt van lokaal graan, inclusief exclusieve Warehouse Tastings.",
    "isNotOnMap": false
  },
  {
    "id": "6",
    "name": "SMWS",
    "category": "independent",
    "categories": [
      "scotch",
      "independent"
    ],
    "brands": [
      "Scotch Malt Whisky Society",
      "Single Cask Bottelingen",
      "Whisky Club"
    ],
    "description": "De Scotch Malt Whisky Society biedt ’s werelds breedste selectie aan zeldzame en onafhankelijke single cask bottelingen op vatsterkte.",
    "isNotOnMap": false
  },
  {
    "id": "10",
    "name": "Craft Spirits",
    "category": "world",
    "categories": [
      "scotch",
      "independent",
      "world"
    ],
    "brands": [
      "Nc'nean",
      "Lindores Abbey",
      "Stauning",
      "Craft Spirits"
    ],
    "description": "Importeur van vernieuwende en duurzame distilleerderijen zoals Nc'nean, Lindores Abbey en Stauning.",
    "isNotOnMap": false
  },
  {
    "id": "11",
    "name": "Koninklijke de Kuyper (Bowmore, Laphroaig, Suntory)",
    "category": "scotch",
    "categories": [
      "scotch",
      "world"
    ],
    "brands": [
      "Bowmore",
      "Laphroaig",
      "House of Suntory"
    ],
    "description": "De Kuyper Royal Distillers presenteert legendarische Islay turfwhisky's (Bowmore, Laphroaig) en verfijnde Japanse whisky's van House of Suntory.",
    "isNotOnMap": false
  },
  {
    "id": "12",
    "name": "Van Wees Holland",
    "category": "independent",
    "categories": [
      "independent",
      "scotch",
      "world"
    ],
    "brands": [
      "The Ultimate",
      "Glenfarclas",
      "Amrut",
      "Onafhankelijke Bottelingen"
    ],
    "description": "Gerenommeerde importeur uit Amersfoort met een rijk aanbod aan Schotse single malts en hun eigen serie 'The Ultimate'.",
    "isNotOnMap": false
  },
  {
    "id": "13",
    "name": "Malt Stock",
    "category": "organisation",
    "categories": [
      "world",
      "organisation"
    ],
    "brands": [
      "Maltstock",
      "Whisky Community",
      "Trail Begeleiders"
    ],
    "description": "Het meest ontspannen whisky-weekend ter wereld, aanwezig voor een goed gesprek, een dram en informatie over de Whisky Trails.",
    "isNotOnMap": false
  },
  {
    "id": "14",
    "name": "Moët Hennessy",
    "category": "scotch",
    "categories": [
      "scotch"
    ],
    "brands": [
      "Ardbeg",
      "Glenmorangie"
    ],
    "description": "De rokerige Islay cult-malt Ardbeg en de elegante Highland single malt Glenmorangie uit de hoogste ketels van Schotland.",
    "isNotOnMap": false
  },
  {
    "id": "15",
    "name": "Brouwer2Import",
    "category": "world",
    "categories": [
      "scotch",
      "world"
    ],
    "brands": [
      "Internationale Whisky's",
      "Speciaalselectie"
    ],
    "description": "Importeur van bijzondere internationale en Schotse whisky's en gedistilleerde specialiteiten.",
    "isNotOnMap": false
  },
  {
    "id": "16",
    "name": "International Whisky Society (IWS/Club)",
    "category": "organisation",
    "categories": [
      "organisation",
      "scotch",
      "world"
    ],
    "brands": [
      "International Whisky Society",
      "Whisky Club",
      "Exclusieve Clubbottelingen"
    ],
    "description": "De International Whisky Society (IWS) ontvangt leden en geïnteresseerden met bijzondere clubbottelingen en verenigingsvoordelen.",
    "isNotOnMap": false
  },
  {
    "id": "17",
    "name": "Festival Botteling stand",
    "category": "organisation",
    "categories": [
      "organisation",
      "scotch"
    ],
    "brands": [
      "Festival Bottelingen",
      "Lindores Abbey Single Cask",
      "Glazen & Gifts"
    ],
    "description": "De officiële stand voor de exclusieve International Whisky Festival Den Haag bottelingen, festivalglazen en verzamelitems.",
    "isNotOnMap": false
  },
  {
    "id": "18",
    "name": "The Whisky Fact",
    "category": "independent",
    "categories": [
      "independent",
      "scotch",
      "world"
    ],
    "brands": [
      "Zeldzame Bottelingen",
      "Specials"
    ],
    "description": "Specialist in karaktervolle en bijzondere whiskybottelingen voor de liefhebber en verzamelaar.",
    "isNotOnMap": false
  },
  {
    "id": "19",
    "mapSlot": "X",
    "name": "Whisky Import Nederland",
    "category": "independent",
    "categories": [
      "scotch",
      "independent",
      "world"
    ],
    "brands": [
      "Adelphi",
      "Ardnamurchan",
      "Finn Thomson",
      "Kilchoman",
      "Blackadder"
    ],
    "description": "Gespecialiseerde importeur van topdistilleerderijen en onafhankelijke bottelaars zoals Adelphi, Ardnamurchan en Finn Thomson.",
    "isNotOnMap": false
  },
  {
    "id": "20",
    "name": "BUS whisky",
    "category": "dutch",
    "categories": [
      "dutch"
    ],
    "brands": [
      "BUS Single Malt",
      "Nederlandse Whisky (Brabant)"
    ],
    "description": "Duurzame Nederlandse single malt whisky uit Brabant, volledig van eigen gerst gedistilleerd op de boerderij.",
    "isNotOnMap": false
  },
  {
    "id": "21",
    "name": "The Chamberick",
    "category": "dutch",
    "categories": [
      "dutch"
    ],
    "brands": [
      "The Chamberick",
      "Nederlandse Whisky (Kamerik)"
    ],
    "description": "Ambachtelijke Nederlandse whisky uit Kamerik, met passie en lokale ingrediënten gestookt.",
    "isNotOnMap": false
  },
  {
    "id": "22",
    "name": "Whisky Hammer",
    "category": "independent",
    "categories": [
      "independent",
      "scotch",
      "world"
    ],
    "brands": [
      "Whisky Hammer",
      "Zeldzame & Exclusieve Whisky's"
    ],
    "description": "Internationaal toonaangevend whiskyplatform voor zeldzame, oude en verzamelwaardige whiskyflessen.",
    "isNotOnMap": false
  },
  {
    "id": "23",
    "name": "Van Weringhs Whisky World",
    "category": "independent",
    "categories": [
      "independent",
      "scotch"
    ],
    "brands": [
      "Oude Whisky's",
      "Zeldzame Specials"
    ],
    "description": "Gespecialiseerd in oude, zeldzame en moeilijk vindbare single malts en exclusieve specials.",
    "isNotOnMap": false
  },
  {
    "id": "24",
    "name": "Helvetia Spirits",
    "category": "world",
    "categories": [
      "world"
    ],
    "brands": [
      "Zwitserse Whisky",
      "Helvetia Spirits"
    ],
    "description": "Ambachtelijke Zwitserse single malt whisky's en hoogwaardige alpiene distillaten.",
    "isNotOnMap": false
  },
  {
    "id": "25",
    "name": "Cane & Grain",
    "category": "independent",
    "categories": [
      "independent",
      "scotch",
      "world"
    ],
    "brands": [
      "Single Cask Whisky's",
      "Onafhankelijke Bottelingen"
    ],
    "description": "Gespecialiseerd in zorgvuldig geselecteerde single cask bottelingen en authentieke distillaten.",
    "isNotOnMap": false
  },
  {
    "id": "26",
    "name": "Barrel Atelier",
    "category": "catering",
    "categories": [
      "catering"
    ],
    "brands": [
      "Whiskyvat Meubels",
      "Handgemaakte Accessoires",
      "Gifts"
    ],
    "description": "Handgemaakte meubels, proefplankjes en woonaccessoires vervaardigd uit authentieke eikenhouten whiskyvaten.",
    "isNotOnMap": false
  },
  {
    "id": "27",
    "name": "Whisky Passion (boeken)",
    "category": "catering",
    "categories": [
      "catering",
      "organisation"
    ],
    "brands": [
      "Whisky Passion Magazine",
      "Whiskyboeken",
      "Gifts"
    ],
    "description": "Het toonaangevende Nederlandstalige whiskymagazine Whisky Passion, met een ruime selectie aan whiskyboeken en cadeaus.",
    "isNotOnMap": false
  },
  {
    "id": "28",
    "name": "Mitra",
    "category": "world",
    "categories": [
      "scotch",
      "world",
      "dutch"
    ],
    "brands": [
      "Mitra Selectie",
      "Schotse & Wereldwhisky's"
    ],
    "description": "Mitra drankenspeciaalzaken presenteert een brede selectie van geliefde klassiekers en bijzondere festivalontdekkingen.",
    "isNotOnMap": false
  },
  {
    "id": "29",
    "name": "Trade in Spirits",
    "category": "world",
    "categories": [
      "world",
      "scotch",
      "independent"
    ],
    "brands": [
      "Premium Spirits",
      "Internationale Whisky's"
    ],
    "description": "Importeur van uiteenlopende premium spirits, Schotse malts en internationale whisky's.",
    "isNotOnMap": false
  },
  {
    "id": "30",
    "name": "Bacardi",
    "category": "world",
    "categories": [
      "world",
      "scotch"
    ],
    "brands": [
      "Teeling",
      "Aberfeldy",
      "Craigellachie",
      "Aultmore",
      "Royal Brackla"
    ],
    "description": "Bekend van onder meer Teeling Irish Whiskey en karaktervolle Schotse single malts zoals Aberfeldy en Craigellachie.",
    "isNotOnMap": false
  },
  {
    "id": "31",
    "name": "Remy Cointreau - Bruichladdich",
    "category": "scotch",
    "categories": [
      "scotch"
    ],
    "brands": [
      "Bruichladdich",
      "Port Charlotte",
      "Octomore"
    ],
    "description": "De progressieve Islay distilleerderij achter de ongeturfde Bruichladdich, zwaar geturfde Port Charlotte en de legendarische Octomore.",
    "isNotOnMap": false
  },
  {
    "id": "32",
    "name": "La Martiniquaise Benelux",
    "category": "scotch",
    "categories": [
      "scotch"
    ],
    "brands": [
      "Glen Moray",
      "Cutty Sark",
      "Glen Turner"
    ],
    "description": "Toegankelijke en veelzijdige Schotse single malts uit Speyside, waaronder de beroemde cask finishes van Glen Moray.",
    "isNotOnMap": false
  },
  {
    "id": "33",
    "name": "Distilleerderij de Bronckhorst",
    "category": "dutch",
    "categories": [
      "dutch"
    ],
    "brands": [
      "Bronckhorst Single Malt",
      "Grain Whisky",
      "Nederlandse Whisky (Achterhoek)"
    ],
    "description": "Ambachtelijke Nederlandse whisky uit de Achterhoek, met passie gestookt en gerijpt op bijzondere houtsoorten.",
    "isNotOnMap": false
  },
  {
    "id": "34",
    "name": "Het Anker België",
    "category": "world",
    "categories": [
      "world"
    ],
    "brands": [
      "Gouden Carolus Single Malt",
      "Belgische Whisky"
    ],
    "description": "Stokerij De Molenberg / Het Anker uit België met de meermaals bekroonde Gouden Carolus Single Malt whisky's.",
    "isNotOnMap": false
  },
  {
    "id": "35",
    "name": "Willem's Whisky",
    "category": "dutch",
    "categories": [
      "dutch",
      "independent"
    ],
    "brands": [
      "Willem's Whisky",
      "Nederlandse Specials"
    ],
    "description": "Eigenzinnige Nederlandse whiskyselecties en kleinschalige bottelingen.",
    "isNotOnMap": false
  },
  {
    "id": "36",
    "name": "Brugse Whisky Company",
    "category": "world",
    "categories": [
      "world",
      "independent"
    ],
    "brands": [
      "Belgische Whisky (Brugge)",
      "Single Cask Selecties"
    ],
    "description": "Ambachtelijke Belgische whisky en unieke vaten uit het historische Brugge.",
    "isNotOnMap": false
  },
  {
    "id": "37",
    "name": "Dutch Whisky Teers",
    "category": "independent",
    "categories": [
      "independent",
      "scotch"
    ],
    "brands": [
      "Dutch Whiskyteers",
      "Single Cask Bottelingen"
    ],
    "description": "Onafhankelijke Nederlandse bottelaars van eigenzinnige en zeldzame single cask whisky's.",
    "isNotOnMap": false
  },
  {
    "id": "38",
    "name": "Barrel Tea",
    "category": "catering",
    "categories": [
      "catering"
    ],
    "brands": [
      "Whisky Barrel Aged Tea",
      "Alcoholvrije Smaakbeleving",
      "Gifts"
    ],
    "description": "Bijzondere losse theeën die gerijpt zijn in echte gebruikte whiskyvaten, plus stijlvolle gifts.",
    "isNotOnMap": false
  },
  {
    "id": "39",
    "name": "Absolutely Nuts Spirits",
    "category": "independent",
    "categories": [
      "independent",
      "world"
    ],
    "brands": [
      "Craft Spirits",
      "Specialiteiten"
    ],
    "description": "Ambachtelijke gedistilleerde dranken, likeuren en verrassende smaakcombinaties.",
    "isNotOnMap": false
  },
  {
    "id": "40",
    "name": "Perfect Dram",
    "category": "independent",
    "categories": [
      "independent",
      "scotch"
    ],
    "brands": [
      "Perfect Dram",
      "Exclusieve Bottelingen"
    ],
    "description": "Selectie van bijzondere onafhankelijke bottelingen en exclusieve single casks.",
    "isNotOnMap": false
  },
  {
    "id": "41",
    "name": "Worstenstand - Afhalen worstenplateau VIP",
    "category": "catering",
    "categories": [
      "catering"
    ],
    "brands": [
      "Afhalen Worstenplateau VIP",
      "Ambachtelijke Droge Worsten",
      "Hapjes"
    ],
    "description": "Uitgiftepunt voor het worstenplateau tijdens de VIP-sessie en verkoop van ambachtelijke worsten die uitstekend passen bij een dram.",
    "isNotOnMap": false
  },
  {
    "id": "42",
    "name": "WhiskyBozz",
    "category": "independent",
    "categories": [
      "independent",
      "scotch"
    ],
    "brands": [
      "WhiskyBozz",
      "Single Cask & Vintage Whisky"
    ],
    "description": "Specialist in karaktervolle single casks en bijzondere bottelingen in Kapel Noord.",
    "isNotOnMap": false
  },
  {
    "id": "43",
    "name": "Nog in te vullen",
    "category": "organisation",
    "categories": [
      "organisation"
    ],
    "brands": [
      "Standhouder volgt"
    ],
    "description": "Deze standpositie wordt binnenkort bekendgemaakt.",
    "isNotOnMap": false
  },
  {
    "id": "44",
    "name": "De Monnik Dranken",
    "category": "scotch",
    "categories": [
      "scotch",
      "world",
      "independent"
    ],
    "brands": [
      "Glengoyne",
      "Tamdhu",
      "Smokehead",
      "Rosebank",
      "West Cork",
      "Filliers"
    ],
    "description": "Grote proefstand op het Hoogkoor van familiebedrijf De Monnik Dranken, met topmerken als Glengoyne, Tamdhu, Rosebank en Smokehead.",
    "isNotOnMap": false
  },
  {
    "id": "45",
    "name": "Well of Wine",
    "category": "world",
    "categories": [
      "world",
      "catering"
    ],
    "brands": [
      "Wijnen",
      "Versterkte Wijnen & Cask Finishes"
    ],
    "description": "Selectie van kwaliteitswijnen en proeverij voor liefhebbers van mooie vatrijpingen.",
    "isNotOnMap": false
  },
  {
    "id": "46",
    "name": "Alexanderhoeve Kaas - Afhalen kaasplateau VIP",
    "category": "catering",
    "categories": [
      "catering"
    ],
    "brands": [
      "Afhalen Kaasplateau VIP",
      "Oude & Rijpe Kazen",
      "Gifts"
    ],
    "description": "Uitgiftepunt voor het kaasplateau tijdens de VIP-sessie en verkoop van ambachtelijke kazen van Alexanderhoeve.",
    "isNotOnMap": false
  },
  {
    "id": "47",
    "name": "Whisky Base",
    "category": "world",
    "categories": [
      "world",
      "scotch",
      "independent"
    ],
    "brands": [
      "Whiskybase",
      "Archives Bottelingen",
      "Whisky Community"
    ],
    "description": "’s Werelds grootste whiskydatabase en community uit Rotterdam, met exclusieve eigen 'Archives' bottelingen.",
    "isNotOnMap": false
  },
  {
    "id": "48",
    "name": "Maple&More",
    "category": "world",
    "categories": [
      "world"
    ],
    "brands": [
      "Canadese Whisky & Maple Liqueur",
      "Sortilège"
    ],
    "description": "Canadese whisky-specialiteiten en authentieke ahornsiroop-whiskylikeuren.",
    "isNotOnMap": false
  },
  {
    "id": "S",
    "name": "Van Assendelft Kapel - Festival Whisky Shop / Slijterij",
    "category": "organisation",
    "categories": [
      "organisation"
    ],
    "brands": [
      "Festival Whisky Shop",
      "Slijterij",
      "Flessenverkoop"
    ],
    "description": "De officiële Festival Whisky Shop / Slijterij in de Van Assendelft Kapel waar u uw favoriete geproefde flessen direct kunt aanschaffen.",
    "isNotOnMap": false
  },
  {
    "id": "U",
    "name": "Uitgifte van de glazen, festival botteling, slijterij bottelingen",
    "category": "organisation",
    "categories": [
      "organisation"
    ],
    "brands": [
      "Uitgifte Proefglazen",
      "Uitgifte Festival Botteling",
      "Slijterij Bottelingen"
    ],
    "description": "Uitgifte van de officiële Glencairn proefglazen bij binnenkomst en afhaalpunt voor gekochte festival- en slijterijbottelingen bij vertrek.",
    "isNotOnMap": false
  },
  {
    "id": "G",
    "name": "Garderobe",
    "category": "organisation",
    "categories": [
      "organisation"
    ],
    "brands": [
      "Garderobe",
      "Jassen & Tassen"
    ],
    "description": "Bewaakte garderobe bij de hoofdentree van de Grote Kerk.",
    "isNotOnMap": false
  },
  {
    "id": "C",
    "name": "Catering",
    "category": "catering",
    "categories": [
      "catering"
    ],
    "brands": [
      "Afhalen Bitterballenplateau VIP",
      "Snacks & Catering"
    ],
    "description": "Cateringpunt in de kerk voor warme snacks en het afhalen van het bitterballenplateau tijdens de VIP-sessie.",
    "isNotOnMap": false
  },
  {
    "id": "O",
    "name": "Organisatie",
    "category": "organisation",
    "categories": [
      "organisation"
    ],
    "brands": [
      "Organisatie & Infobalie",
      "Drams / Munten",
      "Plattegronden & Vragen"
    ],
    "description": "De centrale organisatiebalie voor al uw vragen, drams (festivalmunten), programmaboekjes en last-minute masterclass-tickets.",
    "isNotOnMap": false
  },
  {
    "id": "B",
    "name": "Buitenruimte, Vatenmaker workshop, Foodtrucks, Drankjes",
    "category": "catering",
    "categories": [
      "catering",
      "organisation"
    ],
    "brands": [
      "Buitenruimte",
      "Vatenmaker Workshop (Cooperclass)",
      "Foodtrucks",
      "Drankjes"
    ],
    "description": "Het gezellige buitenterrein met foodtrucks, drankjes en de Cooperclass vatenmaker-workshops.",
    "isNotOnMap": false
  }
];
