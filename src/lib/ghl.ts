// src/lib/ghl.ts
// GoHighLevel (GHL) API Client & Cache Layer
import { TICKETS_DEN_HAAG, type TicketItem } from '../data/ticketsDenHaag';
import { EXHIBITORS_DEN_HAAG, type ExhibitorItem } from '../data/standhouders';

const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const GHL_API_KEY = process.env.GHL_API_KEY || import.meta.env?.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || import.meta.env?.GHL_LOCATION_ID || '';
const GHL_TICKETS_SCHEMA = process.env.GHL_TICKETS_SCHEMA_ID || import.meta.env?.GHL_TICKETS_SCHEMA_ID || 'festival_tickets';
const GHL_STANDS_SCHEMA = process.env.GHL_STANDS_SCHEMA_ID || import.meta.env?.GHL_STANDS_SCHEMA_ID || 'festival_standhouders';

// In-memory Cache (60 seconds TTL)
let cachedTickets: { data: TicketItem[]; timestamp: number } | null = null;
let cachedStandhouders: { data: ExhibitorItem[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 60 * 1000;

export function invalidateGhlCache() {
  cachedTickets = null;
  cachedStandhouders = null;
}

/**
 * Fetch all tickets from GHL Custom Object with automatic fallback to local TS data.
 */
export async function getTickets(): Promise<TicketItem[]> {
  const now = Date.now();
  if (cachedTickets && (now - cachedTickets.timestamp < CACHE_TTL_MS)) {
    return cachedTickets.data;
  }

  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    return TICKETS_DEN_HAAG;
  }

  try {
    const url = `${GHL_API_BASE}/objects/custom_objects/${GHL_TICKETS_SCHEMA}/records?locationId=${GHL_LOCATION_ID}&limit=100`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn(`[GHL API] Tickets fetch failed with status ${response.status}. Using fallback dataset.`);
      return TICKETS_DEN_HAAG;
    }

    const json = await response.json();
    const records = json.customObjectRecords || json.records || [];
    if (!Array.isArray(records) || records.length === 0) {
      return TICKETS_DEN_HAAG;
    }

    const parsedTickets: TicketItem[] = records.map((r: any, idx: number) => {
      const p = r.properties || r;
      return {
        id: r.id || `ghl-ticket-${idx}`,
        row: idx + 1,
        title: p.title || 'Ticket',
        price: typeof p.price === 'number' ? p.price : parseFloat(p.price) || 0,
        date: p.date_label || 'Datum volgt',
        time: p.time_label || 'Tijd volgt',
        day: p.day || 'all',
        daypart: p.daypart || 'all',
        category: p.category || 'entree',
        categoryName: p.category || 'Entreeticket',
        bookingType: p.booking_type || 'Vrij te boeken voor iedereen',
        location: p.location || '',
        capacity: parseInt(p.capacity, 10) || 0,
        sold: parseInt(p.sold, 10) || 0,
        isSoldOut: Boolean(p.is_sold_out),
        isLowStock: Boolean(p.is_low_stock),
        status: p.status_badge || (p.is_sold_out ? 'sold-out' : undefined),
        statusText: p.status_text || (p.is_sold_out ? 'Uitverkocht' : undefined),
        extra: p.description || p.extra || ''
      };
    });

    cachedTickets = { data: parsedTickets, timestamp: now };
    return parsedTickets;
  } catch (err) {
    console.error('[GHL API] Error fetching tickets:', err);
    return TICKETS_DEN_HAAG;
  }
}

/**
 * Fetch all standhouders from GHL Custom Object with automatic fallback to local TS data.
 */
export async function getStandhouders(): Promise<ExhibitorItem[]> {
  const now = Date.now();
  if (cachedStandhouders && (now - cachedStandhouders.timestamp < CACHE_TTL_MS)) {
    return cachedStandhouders.data;
  }

  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    return EXHIBITORS_DEN_HAAG;
  }

  try {
    const url = `${GHL_API_BASE}/objects/custom_objects/${GHL_STANDS_SCHEMA}/records?locationId=${GHL_LOCATION_ID}&limit=100`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn(`[GHL API] Standhouders fetch failed with status ${response.status}. Using fallback dataset.`);
      return EXHIBITORS_DEN_HAAG;
    }

    const json = await response.json();
    const records = json.customObjectRecords || json.records || [];
    if (!Array.isArray(records) || records.length === 0) {
      return EXHIBITORS_DEN_HAAG;
    }

    const parsedStandhouders: ExhibitorItem[] = records.map((r: any) => {
      const p = r.properties || r;
      const rawBrands = p.brands || '';
      const brandsList = Array.isArray(rawBrands)
        ? rawBrands
        : String(rawBrands).split(',').map(b => b.trim()).filter(Boolean);

      return {
        id: String(p.stand_id || r.id),
        name: p.name || 'Standhouder',
        category: p.category || 'world',
        brands: brandsList,
        description: p.description || '',
        isNotOnMap: Boolean(p.is_not_on_map)
      };
    });

    cachedStandhouders = { data: parsedStandhouders, timestamp: now };
    return parsedStandhouders;
  } catch (err) {
    console.error('[GHL API] Error fetching standhouders:', err);
    return EXHIBITORS_DEN_HAAG;
  }
}
