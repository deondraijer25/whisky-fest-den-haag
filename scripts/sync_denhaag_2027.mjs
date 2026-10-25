/**
 * Master Synchronisatie Script: Den Haag 2027 (12, 13 & 14 November 2027)
 * Bron: Google Sheets 'Items voor 2027 livegang' (Rijen 4 t/m 134 - 130 items)
 *
 * Dit script synchroniseert in één keer:
 * 1. GoHighLevel Custom Objects (`custom_objects.festival_tickets`) - verwijdert oude DH 2026 records & plaatst alle 130 DH 2027 records
 * 2. `tickets_den_haag_ghl_import.csv` (volledige CSV export van alle 130 items)
 * 3. `src/data/ticketsDenHaag.ts` (lokale TypeScript fallback met alle publieke live items)
 * 4. `c:\Users\deon_\Projecten\whiskytix\src\client\data\festivalCatalog.ts` (Whiskytix client fallback voor Den Haag 2027)
 */

import fs from 'fs';
import path from 'path';

const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || '1OZ9uxIBFoxwbheVC5iN';
const GHL_OBJECT_KEY = 'custom_objects.festival_tickets';

const GUIDE_INFO = {
  klaas: {
    key: 'klaas',
    name: 'Klaas',
    specialty: 'Schotse Eilanden & Turf',
    bio: 'Gecertificeerd whisky-kenner en ervaren festivalgids die u meeneemt langs zijn persoonlijke hoogtepunten op de beursvloer.',
  },
  stanley: {
    key: 'stanley',
    name: 'Stanley',
    specialty: 'Single Cask & Onafhankelijke Bottelaars',
    bio: 'Gecertificeerd whisky-kenner en ervaren festivalgids die u meeneemt langs zijn persoonlijke hoogtepunten op de beursvloer.',
  },
  ernst: {
    key: 'ernst',
    name: 'Ernst',
    specialty: 'Sherry Casks & Speyside Klassiekers',
    bio: 'Gecertificeerd whisky-kenner en ervaren festivalgids die u meeneemt langs zijn persoonlijke hoogtepunten op de beursvloer.',
  },
  marly: {
    key: 'marlie',
    name: 'Marly',
    specialty: 'Verborgen Parels & Wereldwhisky',
    bio: 'Gecertificeerd whisky-kenner en ervaren festivalgids die u meeneemt langs haar persoonlijke hoogtepunten op de beursvloer.',
  },
  sebastiaan: {
    key: 'sebastiaan',
    name: 'Sebastiaan',
    specialty: 'Cask Strength & Distilleerderij Geschiedenis',
    bio: 'Gecertificeerd whisky-kenner en ervaren festivalgids die u meeneemt langs zijn persoonlijke hoogtepunten op de beursvloer.',
  },
};

function buildDenHaag2027Items() {
  const items = [];

  // =========================================================================
  // 1. ENTREETICKETS (5 items - Rijen 4 t/m 8)
  // =========================================================================
  items.push(
    {
      slugId: 'dh-entree-vrijdag-vip',
      title: 'VIP Sessie - Vrijdagmiddag',
      category: 'entree',
      price: 79.5,
      date_label: 'Vrijdag 12 Nov 2027',
      time_label: '13:00 - 17:00 uur',
      day: 'vrijdag',
      daypart: 'middag',
      location: 'Grote Kerk Den Haag',
      booking_type: 'vrij_te_boeken',
      capacity: 850,
      sold: 0,
      is_sold_out: 'false',
      status_badge: 'popular',
      ticket_description:
        'Exclusieve VIP-openingssessie van het International Whisky Festival Den Haag 2027 met ruimere opzet, toegang tot de VIP Lounge en bijzondere drams.',
      ambassador_name: 'International Whisky Festival Team',
      ambassador_title: 'VIP Festival Host',
      ambassador_bio:
        'Het officiële festivalteam verwelkomt u tijdens de exclusieve openingssessie in de Grote Kerk Den Haag.',
      tasting_lineup:
        'Exclusieve toegang tot de VIP-sessie (max. 850 bezoekers), Officieel Glencairn festival proefglas, Compleet festivalboekje met plattegrond, 4 uur onbeperkt toegang tot de beursvloer',
      guide_name: 'geen',
      guide_specialty: '',
    },
    {
      slugId: 'dh-entree-vrijdagavond',
      title: 'Entree Vrijdagavond',
      category: 'entree',
      price: 55.0,
      date_label: 'Vrijdag 12 Nov 2027',
      time_label: '19:00 - 23:00 uur',
      day: 'vrijdag',
      daypart: 'avond',
      location: 'Grote Kerk Den Haag',
      booking_type: 'vrij_te_boeken',
      capacity: 1250,
      sold: 0,
      is_sold_out: 'false',
      status_badge: 'none',
      ticket_description:
        "Beleef de magie van het meest toonaangevende whiskyfestival van Nederland in de historische Grote Kerk van Den Haag. Ontdek meer dan 40 standhouders en honderden verschillende Schotse single malts, wereldwhisky's en Nederlandse distilleerderijen.",
      ambassador_name: 'International Whisky Festival Team',
      ambassador_title: 'Festival Host',
      ambassador_bio:
        'Het officiële festivalteam staat klaar om u te verwelkomen in de historische ambiance van de Grote Kerk.',
      tasting_lineup:
        'Officieel Glencairn festival proefglas, Talloze gratis te proeven drams op de beursvloer, Compleet festivalboekje met alle standhouders en plattegrond, 4 uur onbeperkt toegang tot alle beurseilanden en stands',
      guide_name: 'geen',
      guide_specialty: '',
    },
    {
      slugId: 'dh-entree-zaterdagmiddag',
      title: 'Entree Zaterdagmiddag',
      category: 'entree',
      price: 55.0,
      date_label: 'Zaterdag 13 Nov 2027',
      time_label: '13:00 - 17:00 uur',
      day: 'zaterdag',
      daypart: 'middag',
      location: 'Grote Kerk Den Haag',
      booking_type: 'vrij_te_boeken',
      capacity: 1250,
      sold: 0,
      is_sold_out: 'false',
      status_badge: 'popular',
      ticket_description:
        "Beleef de magie van het meest toonaangevende whiskyfestival van Nederland in de historische Grote Kerk van Den Haag. Ontdek meer dan 40 standhouders en honderden verschillende Schotse single malts, wereldwhisky's en Nederlandse distilleerderijen.",
      ambassador_name: 'International Whisky Festival Team',
      ambassador_title: 'Festival Host',
      ambassador_bio:
        'Het officiële festivalteam staat klaar om u te verwelkomen in de historische ambiance van de Grote Kerk.',
      tasting_lineup:
        'Officieel Glencairn festival proefglas, Talloze gratis te proeven drams op de beursvloer, Compleet festivalboekje met alle standhouders en plattegrond, 4 uur onbeperkt toegang tot alle beurseilanden en stands',
      guide_name: 'geen',
      guide_specialty: '',
    },
    {
      slugId: 'dh-entree-zaterdagavond',
      title: 'Entree Zaterdagavond',
      category: 'entree',
      price: 55.0,
      date_label: 'Zaterdag 13 Nov 2027',
      time_label: '19:00 - 23:00 uur',
      day: 'zaterdag',
      daypart: 'avond',
      location: 'Grote Kerk Den Haag',
      booking_type: 'vrij_te_boeken',
      capacity: 1250,
      sold: 0,
      is_sold_out: 'false',
      status_badge: 'popular',
      ticket_description:
        "Beleef de magie van het meest toonaangevende whiskyfestival van Nederland in de historische Grote Kerk van Den Haag. Ontdek meer dan 40 standhouders en honderden verschillende Schotse single malts, wereldwhisky's en Nederlandse distilleerderijen.",
      ambassador_name: 'International Whisky Festival Team',
      ambassador_title: 'Festival Host',
      ambassador_bio:
        'Het officiële festivalteam staat klaar om u te verwelkomen in de historische ambiance van de Grote Kerk.',
      tasting_lineup:
        'Officieel Glencairn festival proefglas, Talloze gratis te proeven drams op de beursvloer, Compleet festivalboekje met alle standhouders en plattegrond, 4 uur onbeperkt toegang tot alle beurseilanden en stands',
      guide_name: 'geen',
      guide_specialty: '',
    },
    {
      slugId: 'dh-entree-zondagmiddag',
      title: 'Entree Zondagmiddag',
      category: 'entree',
      price: 55.0,
      date_label: 'Zondag 14 Nov 2027',
      time_label: '13:00 - 17:00 uur',
      day: 'zondag',
      daypart: 'middag',
      location: 'Grote Kerk Den Haag',
      booking_type: 'vrij_te_boeken',
      capacity: 1250,
      sold: 0,
      is_sold_out: 'false',
      status_badge: 'none',
      ticket_description:
        "Beleef de magie van het meest toonaangevende whiskyfestival van Nederland in de historische Grote Kerk van Den Haag. Ontdek meer dan 40 standhouders en honderden verschillende Schotse single malts, wereldwhisky's en Nederlandse distilleerderijen.",
      ambassador_name: 'International Whisky Festival Team',
      ambassador_title: 'Festival Host',
      ambassador_bio:
        'Het officiële festivalteam staat klaar om u te verwelkomen in de historische ambiance van de Grote Kerk.',
      tasting_lineup:
        'Officieel Glencairn festival proefglas, Talloze gratis te proeven drams op de beursvloer, Compleet festivalboekje met alle standhouders en plattegrond, 4 uur onbeperkt toegang tot alle beurseilanden en stands',
      guide_name: 'geen',
      guide_specialty: '',
    }
  );

  // =========================================================================
  // 2. FESTIVAL BOTTELINGEN (2 items - Rijen 9 & 10 - Direct boekbaar € 79,00)
  // =========================================================================
  items.push(
    {
      slugId: 'dh-botteling-lindores-vat-a',
      title: 'Festival Botteling: Lindores Abbey - Vat A',
      category: 'botteling',
      price: 79.0,
      date_label: '12-14 Nov 2027',
      time_label: 'Afhalen tijdens festival',
      day: 'all',
      daypart: 'all',
      location: 'Festival Slijterij (Grote Kerk)',
      booking_type: 'vrij_te_boeken',
      capacity: 125,
      sold: 0,
      is_sold_out: 'false',
      status_badge: 'limited',
      ticket_description:
        'Officiële exclusieve festivalbotteling (Lindores Abbey - Vat A) voor het International Whisky Festival Den Haag 2027. Gelimiteerde oplage van slechts 125 genummerde flessen. Specifieke vatdetails volgen binnenkort.',
      ambassador_name: 'Lindores Abbey Distillery',
      ambassador_title: 'Cask Selection Committee',
      ambassador_bio:
        'Speciaal geselecteerd single cask van het historische Lindores Abbey (het spirituele thuis van Schotse whisky sinds 1494) voor de 2027 editie in Den Haag.',
      tasting_lineup:
        '70cl Volledige Fles (Single Cask), Gelimiteerde oplage van 125 flessen, Af te halen bij de Festival Slijterij op vertoon van uw voucher',
      guide_name: 'geen',
      guide_specialty: '',
    },
    {
      slugId: 'dh-botteling-lindores-vat-b',
      title: 'Festival Botteling: Lindores Abbey - Vat B',
      category: 'botteling',
      price: 79.0,
      date_label: '12-14 Nov 2027',
      time_label: 'Afhalen tijdens festival',
      day: 'all',
      daypart: 'all',
      location: 'Festival Slijterij (Grote Kerk)',
      booking_type: 'vrij_te_boeken',
      capacity: 125,
      sold: 0,
      is_sold_out: 'false',
      status_badge: 'limited',
      ticket_description:
        'Officiële exclusieve festivalbotteling (Lindores Abbey - Vat B) voor het International Whisky Festival Den Haag 2027. Gelimiteerde oplage van slechts 125 genummerde flessen. Specifieke vatdetails volgen binnenkort.',
      ambassador_name: 'Lindores Abbey Distillery',
      ambassador_title: 'Cask Selection Committee',
      ambassador_bio:
        'Speciaal geselecteerd single cask van het historische Lindores Abbey (het spirituele thuis van Schotse whisky sinds 1494) voor de 2027 editie in Den Haag.',
      tasting_lineup:
        '70cl Volledige Fles (Single Cask), Gelimiteerde oplage van 125 flessen, Af te halen bij de Festival Slijterij op vertoon van uw voucher',
      guide_name: 'geen',
      guide_specialty: '',
    }
  );

  // =========================================================================
  // 3. WAREHOUSE TASTINGS CLEY (15 items - Rijen 12 t/m 26 - Concept/Hidden)
  // =========================================================================
  const warehouseSlots = [
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', time: '14:00 - 14:30 uur', daypart: 'middag' },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', time: '15:00 - 15:30 uur', daypart: 'middag' },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', time: '16:00 - 16:30 uur', daypart: 'middag' },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', time: '20:00 - 20:30 uur', daypart: 'avond' },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', time: '21:00 - 21:30 uur', daypart: 'avond' },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', time: '22:00 - 22:30 uur', daypart: 'avond' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time: '14:00 - 14:30 uur', daypart: 'middag' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time: '15:00 - 15:30 uur', daypart: 'middag' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time: '16:00 - 16:30 uur', daypart: 'middag' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time: '20:00 - 20:30 uur', daypart: 'avond' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time: '21:00 - 21:30 uur', daypart: 'avond' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time: '22:00 - 22:30 uur', daypart: 'avond' },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', time: '14:00 - 14:30 uur', daypart: 'middag' },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', time: '15:00 - 15:30 uur', daypart: 'middag' },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', time: '16:00 - 16:30 uur', daypart: 'middag' },
  ];

  warehouseSlots.forEach((slot, idx) => {
    items.push({
      slugId: `dh-warehouse-cley-${idx + 1}`,
      title: 'Warehouse Tasting Cley Distillery',
      category: 'warehouse',
      price: 20.0,
      date_label: slot.date_label,
      time_label: slot.time,
      day: slot.day,
      daypart: slot.daypart,
      location: 'Kerk - Stand Cley',
      booking_type: 'enkel_met_entree',
      capacity: 6,
      sold: 0,
      is_sold_out: 'false',
      status_badge: 'hidden',
      ticket_description:
        'Intieme Warehouse Tasting voor maximaal 6 deelnemers bij de stand van Cley Distillery. Rechtstreeks uit het vat proeven met Paul en Maria.',
      ambassador_name: 'Paul & Maria (Cley Distillery)',
      ambassador_title: 'Master Distillers Rotterdam',
      ambassador_bio:
        'Oprichters van de bekroonde Rotterdamse Cley Distillery, gespecialiseerd in biologische Nederlandse single malt en rye whisky.',
      tasting_lineup: 'Exclusieve Cask Strength Warehouse Samples rechtstreeks uit het vat (30 minuten)',
      guide_name: 'geen',
      guide_specialty: '',
    });
  });

  // =========================================================================
  // 4. MASTERCLASSES & TORENTASTINGS (48 items - Rijen 27 t/m 74)
  // =========================================================================
  const masterclassRows = [
    // Vrijdag 12 Nov 2027 (17 rows: 27..43)
    {
      slugId: 'dh-mc-tor-01',
      title: 'TOR-01: Ardbeg Torentasting (Incl. Beklimming)',
      price: 85.0,
      date_label: 'Vrijdag 12 Nov 2027',
      time_label: '11:15 - 13:00 uur',
      day: 'vrijdag',
      daypart: 'ochtend',
      location: 'Toren-Zolder',
      capacity: 20,
      status_badge: 'limited',
      ticket_description:
        'Exclusieve Ardbeg Torentasting in de Haagse Toren inclusief beklimming onder leiding van een gids van het Gilde. Verzamelen om 11:00 uur.',
      ambassador_name: 'Ardbeg Brand Ambassador',
      ambassador_title: 'Islay Single Malt Specialist',
      tasting_lineup:
        'Torenbeklimming met gids van het Gilde (30 min), Ardbeg Masterclass op de Toren-Zolder (45 min), Zeldzame Islay expressies',
    },
    {
      slugId: 'dh-mc-tor-02',
      title: 'TOR-02: Ardbeg Torentasting (Zonder Beklimming)',
      price: 75.0,
      date_label: 'Vrijdag 12 Nov 2027',
      time_label: '12:00 - 13:00 uur',
      day: 'vrijdag',
      daypart: 'middag',
      location: 'Toren-Zolder',
      capacity: 15,
      status_badge: 'limited',
      ticket_description:
        'Exclusieve Ardbeg Torentasting op de eerste zolder van de Haagse Toren (zonder volledige beklimming, ca. 80 treden). Verzamelen om 12:00 uur.',
      ambassador_name: 'Ardbeg Brand Ambassador',
      ambassador_title: 'Islay Single Malt Specialist',
      tasting_lineup: 'Ardbeg Masterclass op de Toren-Zolder (45 min), Zeldzame Islay expressies',
    },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', time_label: '12:15 - 13:00 uur', daypart: 'middag', location: 'Spaarkamer', capacity: 21, placeholder: true },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', time_label: '12:15 - 13:00 uur', daypart: 'middag', location: 'Telkamer', capacity: 30, placeholder: true },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', time_label: '12:15 - 13:00 uur', daypart: 'middag', location: 'Foyer', capacity: 30, placeholder: true },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', time_label: '14:00 - 14:45 uur', daypart: 'middag', location: 'Spaarkamer', capacity: 21, placeholder: true },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', time_label: '14:00 - 14:45 uur', daypart: 'middag', location: 'Telkamer', capacity: 30, placeholder: true },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', time_label: '14:00 - 14:45 uur', daypart: 'middag', location: 'Foyer', capacity: 30, placeholder: true },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', time_label: '15:30 - 16:15 uur', daypart: 'middag', location: 'Spaarkamer', capacity: 21, placeholder: true },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', time_label: '15:30 - 16:15 uur', daypart: 'middag', location: 'Telkamer', capacity: 30, placeholder: true },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', time_label: '15:30 - 16:15 uur', daypart: 'middag', location: 'Foyer', capacity: 30, placeholder: true },
    {
      slugId: 'dh-mc-intro-vrijdagavond',
      title: 'Whisky Introductie Masterclass',
      price: 7.5,
      date_label: 'Vrijdag 12 Nov 2027',
      time_label: '18:30 - 19:00 uur',
      day: 'vrijdag',
      daypart: 'avond',
      location: 'Spaarkamer',
      capacity: 21,
      status_badge: 'popular',
      ticket_description:
        'Korte, laagdrempelige introductieproeverij van een half uur voorafgaand aan de avond-sessie. Ontdek hoe whisky wordt gemaakt en leer optimaal proeven.',
      ambassador_name: 'International Whisky Festival',
      ambassador_title: 'Whisky Docent',
      tasting_lineup: '2 Contrasterende introductie-drams, Uitleg over het proefproces en productie',
    },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', time_label: '18:30 - 19:15 uur', daypart: 'avond', location: 'Foyer', capacity: 30, placeholder: true },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', time_label: '20:00 - 20:45 uur', daypart: 'avond', location: 'Spaarkamer', capacity: 21, placeholder: true },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', time_label: '20:00 - 20:45 uur', daypart: 'avond', location: 'Telkamer', capacity: 30, placeholder: true },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', time_label: '21:30 - 22:15 uur', daypart: 'avond', location: 'Telkamer', capacity: 30, placeholder: true },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', time_label: '21:30 - 22:15 uur', daypart: 'avond', location: 'Foyer', capacity: 30, placeholder: true },

    // Zaterdag 13 Nov 2027 (20 rows: 44..63)
    {
      slugId: 'dh-mc-tor-03',
      title: 'TOR-03: Torentasting (Incl. Beklimming) - Nog niet bekend',
      price: 85.0,
      date_label: 'Zaterdag 13 Nov 2027',
      time_label: '11:15 - 13:00 uur',
      day: 'zaterdag',
      daypart: 'ochtend',
      location: 'Toren-Zolder',
      capacity: 20,
      status_badge: 'hidden',
      ticket_description:
        'Exclusieve Torentasting in de Haagse Toren inclusief beklimming onder leiding van een gids van het Gilde. Verzamelen om 11:00 uur.',
    },
    {
      slugId: 'dh-mc-tor-04',
      title: 'TOR-04: Torentasting (Zonder Beklimming) - Nog niet bekend',
      price: 75.0,
      date_label: 'Zaterdag 13 Nov 2027',
      time_label: '12:00 - 13:00 uur',
      day: 'zaterdag',
      daypart: 'middag',
      location: 'Toren-Zolder',
      capacity: 15,
      status_badge: 'hidden',
      ticket_description:
        'Exclusieve Torentasting op de eerste zolder van de Haagse Toren (zonder volledige beklimming, ca. 80 treden). Verzamelen om 12:00 uur.',
    },
    {
      slugId: 'dh-mc-intro-zaterdagmiddag',
      title: 'Whisky Introductie Masterclass',
      price: 7.5,
      date_label: 'Zaterdag 13 Nov 2027',
      time_label: '12:30 - 13:00 uur',
      day: 'zaterdag',
      daypart: 'middag',
      location: 'Spaarkamer',
      capacity: 21,
      status_badge: 'popular',
      ticket_description:
        'Korte, laagdrempelige introductieproeverij van een half uur voorafgaand aan de middagsessie. Ontdek hoe whisky wordt gemaakt en leer optimaal proeven.',
      ambassador_name: 'International Whisky Festival',
      ambassador_title: 'Whisky Docent',
      tasting_lineup: '2 Contrasterende introductie-drams, Uitleg over het proefproces en productie',
    },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time_label: '12:30 - 13:15 uur', daypart: 'middag', location: 'Telkamer', capacity: 30, placeholder: true },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time_label: '12:30 - 13:15 uur', daypart: 'middag', location: 'Foyer', capacity: 30, placeholder: true },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time_label: '14:00 - 14:45 uur', daypart: 'middag', location: 'Spaarkamer', capacity: 21, placeholder: true },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time_label: '14:00 - 14:45 uur', daypart: 'middag', location: 'Telkamer', capacity: 30, placeholder: true },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time_label: '14:00 - 14:45 uur', daypart: 'middag', location: 'Foyer', capacity: 30, placeholder: true },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time_label: '15:30 - 16:15 uur', daypart: 'middag', location: 'Spaarkamer', capacity: 21, placeholder: true },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time_label: '15:30 - 16:15 uur', daypart: 'middag', location: 'Telkamer', capacity: 30, placeholder: true },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time_label: '15:30 - 16:15 uur', daypart: 'middag', location: 'Foyer', capacity: 30, placeholder: true },
    {
      slugId: 'dh-mc-intro-zaterdagavond',
      title: 'Whisky Introductie Masterclass',
      price: 7.5,
      date_label: 'Zaterdag 13 Nov 2027',
      time_label: '18:30 - 19:00 uur',
      day: 'zaterdag',
      daypart: 'avond',
      location: 'Spaarkamer',
      capacity: 21,
      status_badge: 'popular',
      ticket_description:
        'Korte, laagdrempelige introductieproeverij van een half uur voorafgaand aan de avond-sessie. Ontdek hoe whisky wordt gemaakt en leer optimaal proeven.',
      ambassador_name: 'International Whisky Festival',
      ambassador_title: 'Whisky Docent',
      tasting_lineup: '2 Contrasterende introductie-drams, Uitleg over het proefproces en productie',
    },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time_label: '18:30 - 19:15 uur', daypart: 'avond', location: 'Telkamer', capacity: 30, placeholder: true },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time_label: '18:30 - 19:15 uur', daypart: 'avond', location: 'Foyer', capacity: 30, placeholder: true },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time_label: '20:00 - 20:45 uur', daypart: 'avond', location: 'Spaarkamer', capacity: 21, placeholder: true },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time_label: '20:00 - 20:45 uur', daypart: 'avond', location: 'Telkamer', capacity: 30, placeholder: true },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time_label: '20:00 - 20:45 uur', daypart: 'avond', location: 'Foyer', capacity: 30, placeholder: true },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time_label: '21:30 - 22:15 uur', daypart: 'avond', location: 'Spaarkamer', capacity: 21, placeholder: true },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time_label: '21:30 - 22:15 uur', daypart: 'avond', location: 'Telkamer', capacity: 30, placeholder: true },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', time_label: '21:30 - 22:15 uur', daypart: 'avond', location: 'Foyer', capacity: 30, placeholder: true },

    // Zondag 14 Nov 2027 (11 rows: 64..74)
    {
      slugId: 'dh-mc-tor-05',
      title: 'TOR-05: Torentasting (Incl. Beklimming) - Nog niet bekend',
      price: 85.0,
      date_label: 'Zondag 14 Nov 2027',
      time_label: '11:15 - 13:00 uur',
      day: 'zondag',
      daypart: 'ochtend',
      location: 'Toren-Zolder',
      capacity: 20,
      status_badge: 'hidden',
      ticket_description:
        'Exclusieve Torentasting in de Haagse Toren inclusief beklimming onder leiding van een gids van het Gilde. Verzamelen om 11:00 uur.',
    },
    {
      slugId: 'dh-mc-tor-06',
      title: 'TOR-06: Torentasting (Zonder Beklimming) - Nog niet bekend',
      price: 75.0,
      date_label: 'Zondag 14 Nov 2027',
      time_label: '12:00 - 13:00 uur',
      day: 'zondag',
      daypart: 'middag',
      location: 'Toren-Zolder',
      capacity: 15,
      status_badge: 'hidden',
      ticket_description:
        'Exclusieve Torentasting op de eerste zolder van de Haagse Toren (zonder volledige beklimming, ca. 80 treden). Verzamelen om 12:00 uur.',
    },
    {
      slugId: 'dh-mc-intro-zondagmiddag',
      title: 'Whisky Introductie Masterclass',
      price: 7.5,
      date_label: 'Zondag 14 Nov 2027',
      time_label: '12:30 - 13:00 uur',
      day: 'zondag',
      daypart: 'middag',
      location: 'Spaarkamer',
      capacity: 21,
      status_badge: 'popular',
      ticket_description:
        'Korte, laagdrempelige introductieproeverij van een half uur voorafgaand aan de middagsessie. Ontdek hoe whisky wordt gemaakt en leer optimaal proeven.',
      ambassador_name: 'International Whisky Festival',
      ambassador_title: 'Whisky Docent',
      tasting_lineup: '2 Contrasterende introductie-drams, Uitleg over het proefproces en productie',
    },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', time_label: '12:30 - 13:15 uur', daypart: 'middag', location: 'Telkamer', capacity: 30, placeholder: true },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', time_label: '12:30 - 13:15 uur', daypart: 'middag', location: 'Foyer', capacity: 30, placeholder: true },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', time_label: '14:00 - 14:45 uur', daypart: 'middag', location: 'Spaarkamer', capacity: 21, placeholder: true },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', time_label: '14:00 - 14:45 uur', daypart: 'middag', location: 'Telkamer', capacity: 30, placeholder: true },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', time_label: '14:00 - 14:45 uur', daypart: 'middag', location: 'Foyer', capacity: 30, placeholder: true },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', time_label: '15:30 - 16:15 uur', daypart: 'middag', location: 'Spaarkamer', capacity: 21, placeholder: true },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', time_label: '15:30 - 16:15 uur', daypart: 'middag', location: 'Telkamer', capacity: 30, placeholder: true },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', time_label: '15:30 - 16:15 uur', daypart: 'middag', location: 'Foyer', capacity: 30, placeholder: true },
  ];

  let placeholderIdx = 1;
  masterclassRows.forEach((mc) => {
    if (mc.placeholder) {
      items.push({
        slugId: `dh-mc-placeholder-${placeholderIdx++}`,
        title: `Nog niet bekend - Masterclass (${mc.location})`,
        category: 'masterclass',
        price: 25.0,
        date_label: mc.date_label,
        time_label: mc.time_label,
        day: mc.day,
        daypart: mc.daypart,
        location: mc.location,
        booking_type: 'vrij_te_boeken',
        capacity: mc.capacity,
        sold: 0,
        is_sold_out: 'false',
        status_badge: 'hidden',
        ticket_description: 'Nog niet bekend - voeg ik later 1 voor 1 toe.',
        ambassador_name: 'Brand Ambassador',
        ambassador_title: 'Master of Malt',
        ambassador_bio: 'Wordt binnenkort bekendgemaakt.',
        tasting_lineup: 'Wordt binnenkort bekendgemaakt',
        guide_name: 'geen',
        guide_specialty: '',
      });
    } else {
      items.push({
        slugId: mc.slugId,
        title: mc.title,
        category: 'masterclass',
        price: mc.price,
        date_label: mc.date_label,
        time_label: mc.time_label,
        day: mc.day,
        daypart: mc.daypart,
        location: mc.location,
        booking_type: 'vrij_te_boeken',
        capacity: mc.capacity,
        sold: 0,
        is_sold_out: 'false',
        status_badge: mc.status_badge,
        ticket_description: mc.ticket_description,
        ambassador_name: mc.ambassador_name || 'Brand Ambassador',
        ambassador_title: mc.ambassador_title || 'Senior Brand Ambassador',
        ambassador_bio:
          'Internationaal expert met diepgaande kennis over distillatietechnieken, vatselecties en de unieke smaakprofielen van deze distilleerderij.',
        tasting_lineup: mc.tasting_lineup || 'Exclusieve Masterclass Line-up',
        guide_name: 'geen',
        guide_specialty: '',
      });
    }
  });

  // =========================================================================
  // 5. WHISKY TRAILS (40 items - Rijen 75 t/m 114 - € 5,00)
  // =========================================================================
  const trailSchedule = [
    // Vrijdag 12 Nov 2027 (10 trails)
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', daypart: 'avond', time: '20:00 - 20:30 uur', guide: 'klaas' },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', daypart: 'avond', time: '20:00 - 20:30 uur', guide: 'stanley' },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', daypart: 'avond', time: '20:30 - 21:00 uur', guide: 'ernst' },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', daypart: 'avond', time: '20:30 - 21:00 uur', guide: 'marly' },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', daypart: 'avond', time: '20:30 - 21:00 uur', guide: 'sebastiaan' },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', daypart: 'avond', time: '21:00 - 21:30 uur', guide: 'klaas' },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', daypart: 'avond', time: '21:00 - 21:30 uur', guide: 'stanley' },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', daypart: 'avond', time: '21:30 - 22:00 uur', guide: 'ernst' },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', daypart: 'avond', time: '21:30 - 22:00 uur', guide: 'marly' },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', daypart: 'avond', time: '21:30 - 22:00 uur', guide: 'sebastiaan' },

    // Zaterdagmiddag 13 Nov 2027 (10 trails)
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'middag', time: '14:00 - 14:30 uur', guide: 'ernst' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'middag', time: '14:00 - 14:30 uur', guide: 'marly' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'middag', time: '14:00 - 14:30 uur', guide: 'sebastiaan' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'middag', time: '14:30 - 15:00 uur', guide: 'stanley' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'middag', time: '14:30 - 15:00 uur', guide: 'klaas' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'middag', time: '15:00 - 15:30 uur', guide: 'ernst' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'middag', time: '15:00 - 15:30 uur', guide: 'marly' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'middag', time: '15:00 - 15:30 uur', guide: 'sebastiaan' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'middag', time: '15:30 - 16:00 uur', guide: 'stanley' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'middag', time: '15:30 - 16:00 uur', guide: 'klaas' },

    // Zaterdagavond 13 Nov 2027 (10 trails)
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'avond', time: '20:00 - 20:30 uur', guide: 'klaas' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'avond', time: '20:00 - 20:30 uur', guide: 'stanley' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'avond', time: '20:30 - 21:00 uur', guide: 'ernst' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'avond', time: '20:30 - 21:00 uur', guide: 'marly' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'avond', time: '20:30 - 21:00 uur', guide: 'sebastiaan' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'avond', time: '21:00 - 21:30 uur', guide: 'klaas' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'avond', time: '21:00 - 21:30 uur', guide: 'stanley' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'avond', time: '21:30 - 22:00 uur', guide: 'ernst' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'avond', time: '21:30 - 22:00 uur', guide: 'marly' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'avond', time: '21:30 - 22:00 uur', guide: 'sebastiaan' },

    // Zondagmiddag 14 Nov 2027 (10 trails)
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', daypart: 'middag', time: '14:00 - 14:30 uur', guide: 'ernst' },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', daypart: 'middag', time: '14:00 - 14:30 uur', guide: 'marly' },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', daypart: 'middag', time: '14:00 - 14:30 uur', guide: 'sebastiaan' },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', daypart: 'middag', time: '14:30 - 15:00 uur', guide: 'klaas' },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', daypart: 'middag', time: '14:30 - 15:00 uur', guide: 'stanley' },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', daypart: 'middag', time: '15:00 - 15:30 uur', guide: 'ernst' },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', daypart: 'middag', time: '15:00 - 15:30 uur', guide: 'marly' },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', daypart: 'middag', time: '15:00 - 15:30 uur', guide: 'sebastiaan' },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', daypart: 'middag', time: '15:30 - 16:00 uur', guide: 'klaas' },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', daypart: 'middag', time: '15:30 - 16:00 uur', guide: 'stanley' },
  ];

  trailSchedule.forEach((tr, idx) => {
    const g = GUIDE_INFO[tr.guide];
    items.push({
      slugId: `dh-trail-${idx + 1}`,
      title: `Whisky Trail met Gids ${g.name}`,
      category: 'trail',
      price: 5.0,
      date_label: tr.date_label,
      time_label: tr.time,
      day: tr.day,
      daypart: tr.daypart,
      location: 'Informatie-stand',
      booking_type: 'enkel_met_entree',
      capacity: 6,
      sold: 0,
      is_sold_out: 'false',
      status_badge: 'none',
      ticket_description: `Ga 30 minuten op pad over de festivalvloer in een intieme groep van maximaal 6 personen onder begeleiding van whiskygids ${g.name}. Ontdek verborgen parels en verhalen bij diverse stands.`,
      ambassador_name: `Gids ${g.name}`,
      ambassador_title: 'Festival Whisky Gids',
      ambassador_bio: g.bio,
      tasting_lineup: 'Begeleide wandeling van 30 minuten langs 3 geselecteerde stands, Inclusief 3 verrassende drams onderweg',
      guide_name: g.key,
      guide_specialty: g.specialty,
    });
  });

  // =========================================================================
  // 6. HAAGSCHE WHISKY TRAM (10 items - Rijen 115 t/m 124 - € 39,50)
  // =========================================================================
  const tramSlots = [
    { num: 1, day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', daypart: 'middag', time: '17:15 - 18:15 uur' },
    { num: 2, day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', daypart: 'avond', time: '18:45 - 19:45 uur' },
    { num: 3, day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', daypart: 'avond', time: '20:15 - 21:15 uur' },
    { num: 4, day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'middag', time: '12:00 - 13:00 uur' },
    { num: 5, day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'middag', time: '13:30 - 14:30 uur' },
    { num: 6, day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'avond', time: '18:45 - 19:45 uur' },
    { num: 7, day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'avond', time: '20:15 - 21:15 uur' },
    { num: 8, day: 'zondag', date_label: 'Zondag 14 Nov 2027', daypart: 'ochtend', time: '11:00 - 12:00 uur' },
    { num: 9, day: 'zondag', date_label: 'Zondag 14 Nov 2027', daypart: 'middag', time: '12:30 - 13:30 uur' },
    { num: 10, day: 'zondag', date_label: 'Zondag 14 Nov 2027', daypart: 'middag', time: '14:00 - 15:00 uur' },
  ];

  tramSlots.forEach((t) => {
    items.push({
      slugId: `dh-tram-${t.num}`,
      title: `Haagsche Whisky Tram - Rit ${t.num}`,
      category: 'tram',
      price: 39.5,
      date_label: t.date_label,
      time_label: t.time,
      day: t.day,
      daypart: t.daypart,
      location: 'Opstelplaats Tram buiten (Grote Kerk)',
      booking_type: 'vrij_te_boeken',
      capacity: 26,
      sold: 0,
      is_sold_out: 'false',
      status_badge: 'limited',
      ticket_description:
        'Stap aan boord van een historische Haagse museumtram voor een nostalgische stadsrondrit van 60 minuten door Den Haag terwijl u onderweg geniet van een exclusieve whiskyproeverij. Los te boeken (ook zonder festival-entreeticket).',
      ambassador_name: 'Haagsche Whisky Tram Sommelier',
      ambassador_title: 'Rijdende Proeverij Host',
      ambassador_bio:
        'Combineert de rijke historie van het Haagse tramnetwerk met prachtige verhalen over de geschonken Schotse malts.',
      tasting_lineup:
        '60 minuten rondrit in een historische PCC museumtram, 4 zorgvuldig geselecteerde drams tijdens de rit, Deskundige toelichting aan boord',
      guide_name: 'geen',
      guide_specialty: '',
    });
  });

  // =========================================================================
  // 7. VATENMAKER WORKSHOP / COOPERCLASS (10 items - Rijen 125 t/m 134 - € 5,00)
  // =========================================================================
  const cooperSlots = [
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', daypart: 'middag', time: '14:30 - 15:00 uur' },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', daypart: 'middag', time: '15:30 - 16:00 uur' },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', daypart: 'avond', time: '20:30 - 21:00 uur' },
    { day: 'vrijdag', date_label: 'Vrijdag 12 Nov 2027', daypart: 'avond', time: '21:30 - 22:00 uur' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'middag', time: '14:30 - 15:00 uur' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'middag', time: '15:30 - 16:00 uur' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'avond', time: '20:30 - 21:00 uur' },
    { day: 'zaterdag', date_label: 'Zaterdag 13 Nov 2027', daypart: 'avond', time: '21:30 - 22:00 uur' },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', daypart: 'middag', time: '14:30 - 15:00 uur' },
    { day: 'zondag', date_label: 'Zondag 14 Nov 2027', daypart: 'middag', time: '15:30 - 16:00 uur' },
  ];

  cooperSlots.forEach((c, idx) => {
    items.push({
      slugId: `dh-cooperclass-${idx + 1}`,
      title: 'Cooperclass - Workshop Vatenmaken met Mini-Tasting',
      category: 'vatenmaken',
      price: 5.0,
      date_label: c.date_label,
      time_label: c.time,
      day: c.day,
      daypart: c.daypart,
      location: 'Buitenterrein',
      booking_type: 'enkel_met_entree',
      capacity: 20,
      sold: 0,
      is_sold_out: 'false',
      status_badge: 'none',
      ticket_description:
        'Steek de handen uit de mouwen tijdens deze interactieve Cooperclass op het buitenterrein! Leer van een meester-kuiper hoe een eikenhouten whiskyvat uit duigen en hoepels wordt opgebouwd, inclusief mini-tasting.',
      ambassador_name: 'Master Cooper',
      ambassador_title: 'Ambachtelijk Kuiper',
      ambassador_bio:
        'Meester-kuiper die het eeuwenoude ambacht van het vatenmaken en het effect van houtrijping op whisky demonstreert.',
      tasting_lineup:
        'Interactieve demonstratie & zelf een vat opbouwen (30 min), Mini-tasting met focus op houtinvloed (Wood Finish)',
      guide_name: 'geen',
      guide_specialty: '',
    });
  });

  return items;
}

function escapeCsv(val) {
  const s = String(val ?? '');
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

async function fetchAllGhlRecords() {
  const all = [];
  let page = 1;
  while (true) {
    const res = await fetch(`${GHL_API_BASE}/objects/${GHL_OBJECT_KEY}/records/search`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GHL_API_KEY}`,
        Version: '2021-07-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        page,
        pageLimit: 100,
        searchAfter: [],
      }),
    });
    if (!res.ok) {
      throw new Error(`Failed to search GHL records page ${page}: ${res.status} ${await res.text()}`);
    }
    const data = await res.json();
    const recs = data.customObjectRecords || data.records || [];
    all.push(...recs);
    if (recs.length < 100 || all.length >= (data.total || 0)) break;
    page++;
  }
  return all;
}

async function run() {
  const items = buildDenHaag2027Items();
  console.log(`Geconfigureerde Den Haag 2027 items: ${items.length}`);

  // 1. Schrijf tickets_den_haag_ghl_import.csv
  const csvHeaders = [
    'title',
    'category',
    'price',
    'date_label',
    'time_label',
    'day',
    'daypart',
    'location',
    'booking_type',
    'capacity',
    'sold',
    'is_sold_out',
    'status_badge',
    'festival_city',
    'festival_slug',
    'ticket_description',
    'ambassador_name',
    'ambassador_title',
    'ambassador_bio',
    'tasting_lineup',
    'guide_name',
    'guide_specialty',
  ];

  const csvRows = [csvHeaders.join(',')];
  for (const item of items) {
    const row = [
      item.title,
      item.category,
      item.price,
      item.date_label,
      item.time_label,
      item.day,
      item.daypart,
      item.location,
      item.booking_type,
      item.capacity,
      item.sold,
      item.is_sold_out === 'true' ? 'Ja' : 'Nee',
      item.status_badge,
      'den_haag',
      'den-haag',
      item.ticket_description,
      item.ambassador_name,
      item.ambassador_title,
      item.ambassador_bio,
      item.tasting_lineup,
      item.guide_name,
      item.guide_specialty,
    ].map(escapeCsv);
    csvRows.push(row.join(','));
  }

  const csvPath = path.resolve('c:/Users/deon_/Projecten/Whisky Fest/tickets_den_haag_ghl_import.csv');
  fs.writeFileSync(csvPath, csvRows.join('\n'), 'utf8');
  console.log(`CSV bijgewerkt: ${csvPath} (${items.length} rijen)`);

  // 2. Synchroniseer met GoHighLevel Custom Objects (`custom_objects.festival_tickets`)
  console.log('Ophalen van bestaande GHL Custom Object records...');
  const existingRecords = await fetchAllGhlRecords();
  const dhRecords = existingRecords.filter((r) => {
    const city = (r.properties?.festival_city || r.properties?.festival_slug || '').toLowerCase();
    return city.includes('haag');
  });

  console.log(`Gevonden in GHL: ${existingRecords.length} totaal, waarvan ${dhRecords.length} Den Haag records.`);
  console.log(`Verwijderen van ${dhRecords.length} oude Den Haag 2026 records uit GHL...`);

  // Delete in batches of 5 to respect rate limits
  for (let i = 0; i < dhRecords.length; i += 5) {
    const batch = dhRecords.slice(i, i + 5);
    await Promise.all(
      batch.map(async (rec) => {
        const delRes = await fetch(`${GHL_API_BASE}/objects/${GHL_OBJECT_KEY}/records/${rec.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${GHL_API_KEY}`,
            Version: '2021-07-28',
          },
        });
        if (!delRes.ok) {
          console.warn(`Kon record ${rec.id} niet verwijderen: ${delRes.status}`);
        }
      })
    );
  }
  console.log('Oude Den Haag records verwijderd.');

  // Create new 130 Den Haag 2027 records in GHL and capture their new GHL record IDs
  console.log(`Aanmaken van ${items.length} nieuwe Den Haag 2027 records in GHL...`);
  const createdItems = [];

  for (let i = 0; i < items.length; i += 5) {
    const batch = items.slice(i, i + 5);
    const results = await Promise.all(
      batch.map(async (item) => {
        const payload = {
          locationId: GHL_LOCATION_ID,
          properties: {
            title: item.title,
            category: item.category,
            price: item.price,
            date_label: item.date_label,
            time_label: item.time_label,
            day: item.day,
            daypart: item.daypart,
            location: item.location,
            booking_type: item.booking_type,
            capacity: item.capacity,
            sold: item.sold,
            is_sold_out: item.is_sold_out,
            status_badge: item.status_badge,
            festival_city: 'den_haag',
            festival_slug: 'den-haag',
            ticket_description: item.ticket_description,
            ambassador_name: item.ambassador_name,
            ambassador_title: item.ambassador_title,
            ambassador_bio: item.ambassador_bio,
            tasting_lineup: item.tasting_lineup,
            guide_name: item.guide_name,
            ...(item.guide_specialty ? { guide_specialty: item.guide_specialty } : {}),
          },
        };

        const createRes = await fetch(`${GHL_API_BASE}/objects/${GHL_OBJECT_KEY}/records`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${GHL_API_KEY}`,
            Version: '2021-07-28',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!createRes.ok) {
          const errTxt = await createRes.text();
          console.error(`Fout bij aanmaken GHL record "${item.title}": ${createRes.status} - ${errTxt}`);
          return { ...item, ghlId: item.slugId };
        }
        const json = await createRes.json();
        const ghlId = json?.record?.id || json?.customObjectRecord?.id || json?.id || item.slugId;
        return { ...item, ghlId };
      })
    );
    createdItems.push(...results);
    process.stdout.write(`\rGHL Sync voortgang: ${createdItems.length}/${items.length}`);
  }
  console.log('\nAlle 130 Den Haag 2027 records succesvol aangemaakt in GHL!');

  // 3. Schrijf `src/data/ticketsDenHaag.ts` (Alleen publieke items zonder status_badge === 'hidden')
  const visibleItems = createdItems.filter((i) => i.status_badge !== 'hidden');
  const tsItems = visibleItems.map((i, idx) => ({
    id: i.ghlId,
    row: idx + 1,
    title: i.title,
    price: i.price,
    date: i.date_label,
    time: i.time_label,
    day: i.day,
    daypart: i.daypart,
    category: i.category,
    categoryName: i.category ? i.category.charAt(0).toUpperCase() + i.category.slice(1) : 'Entreeticket',
    bookingType: i.booking_type === 'enkel_met_entree' ? 'enkel i.c.m. entreeticket' : 'Vrij te boeken voor iedereen',
    location: i.location,
    capacity: i.capacity,
    sold: i.sold,
    isSoldOut: i.is_sold_out === 'true',
    isLowStock: false,
    ...(i.status_badge && i.status_badge !== 'none' ? { status: i.status_badge.replace('_', '-') } : {}),
    description: i.ticket_description,
    extra: i.ticket_description,
    ambassadorName: i.ambassador_name,
    ambassadorTitle: i.ambassador_title,
    ambassadorBio: i.ambassador_bio,
    tastingLineup: i.tasting_lineup ? i.tasting_lineup.split(',').map((s) => s.trim()) : [],
  }));

  const tsFileContent = `// src/data/ticketsDenHaag.ts
// Automatisch gegenereerd uit "Items voor 2027 livegang" (Den Haag 12, 13 & 14 November 2027)

export interface TicketItem {
  id: string;
  row: number;
  title: string;
  price: number;
  date: string;
  time: string;
  day: 'vrijdag' | 'zaterdag' | 'zondag' | 'all';
  daypart: 'ochtend' | 'middag' | 'avond' | 'all';
  category: 'entree' | 'botteling' | 'warehouse' | 'masterclass' | 'trail' | 'tram' | 'vatenmaken';
  categoryName: string;
  bookingType: string;
  location: string;
  capacity: number;
  sold: number;
  isSoldOut: boolean;
  isLowStock: boolean;
  status?: 'sold-out' | 'limited' | 'popular' | 'selling-fast';
  statusText?: string;
  extra?: string;
  description?: string;
  ambassadorName?: string;
  ambassadorTitle?: string;
  ambassadorBio?: string;
  tastingLineup?: string[];
}

export const TICKETS_DEN_HAAG: TicketItem[] = ${JSON.stringify(tsItems, null, 2)};\n`;
  const tsPath = path.resolve('c:/Users/deon_/Projecten/Whisky Fest/src/data/ticketsDenHaag.ts');
  fs.writeFileSync(tsPath, tsFileContent, 'utf8');
  console.log(`Fallback dataset bijgewerkt: ${tsPath} (${tsItems.length} zichtbare live items)`);
}

run().catch((err) => {
  console.error('Fatal error during Den Haag 2027 sync:', err);
  process.exit(1);
});
