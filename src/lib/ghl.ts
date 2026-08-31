// src/lib/ghl.ts
// GoHighLevel (GHL) API Client & Cache Layer for Festival Websites
import { TICKETS_DEN_HAAG, type TicketItem } from '../data/ticketsDenHaag';
import { EXHIBITORS_DEN_HAAG, type ExhibitorItem } from '../data/standhouders';

const GHL_API_BASE = 'https://services.leadconnectorhq.com';
const GHL_API_KEY = process.env.GHL_API_KEY || import.meta.env?.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || import.meta.env?.GHL_LOCATION_ID || '1OZ9uxIBFoxwbheVC5iN';

// Custom Object Schema Keys as registered in GHL
const GHL_TICKETS_OBJECT_KEY = 'custom_objects.festival_tickets';
const GHL_STANDS_OBJECT_KEY = 'custom_objects.festival_standhouders';

// In-memory Cache per city (60 seconds TTL)
const ticketsCache: Record<string, { data: TicketItem[]; timestamp: number }> = {};
const standsCache: Record<string, { data: ExhibitorItem[]; timestamp: number }> = {};
const CACHE_TTL_MS = 60 * 1000;

export function invalidateGhlCache(city?: string) {
  if (city) {
    delete ticketsCache[city];
    delete standsCache[city];
  } else {
    Object.keys(ticketsCache).forEach(k => delete ticketsCache[k]);
    Object.keys(standsCache).forEach(k => delete standsCache[k]);
  }
}

/**
 * Helper to parse boolean from GHL (supports boolean or "Ja"/"Nee" / "true"/"false")
 */
function parseGhlBoolean(val: any): boolean {
  if (typeof val === 'boolean') return val;
  if (typeof val === 'string') {
    const s = val.trim().toLowerCase();
    return s === 'ja' || s === 'true' || s === '1' || s === 'yes';
  }
  return Boolean(val);
}

/**
 * Fetch tickets from GHL Custom Object with automatic fallback to local dataset.
 * @param city - 'den_haag' | 'gent' | 'amsterdam'
 */
export async function getTickets(city: string = 'den_haag'): Promise<TicketItem[]> {
  const normalizedCity = city.toLowerCase().replace('-', '_');
  const now = Date.now();
  const cached = ticketsCache[normalizedCity];

  if (cached && (now - cached.timestamp < CACHE_TTL_MS)) {
    return cached.data;
  }

  // Fallback if no API key is set
  if (!GHL_API_KEY) {
    return TICKETS_DEN_HAAG;
  }

  try {
    const url = `${GHL_API_BASE}/objects/${GHL_TICKETS_OBJECT_KEY}/records/search`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        page: 1,
        pageLimit: 100,
        query: `festival_city:${normalizedCity}`,
        searchAfter: []
      })
    });

    if (!response.ok) {
      console.warn(`[GHL API] Tickets fetch for ${city} failed with status ${response.status}. Using fallback dataset.`);
      return TICKETS_DEN_HAAG;
    }

    const json = await response.json();
    const records = json.customObjectRecords || json.records || [];
    
    if (!Array.isArray(records) || records.length === 0) {
      console.info(`[GHL API] No ticket records found in GHL for ${city}. Using fallback dataset.`);
      return TICKETS_DEN_HAAG;
    }

    const parsedTickets: TicketItem[] = records.map((r: any, idx: number) => {
      const p = r.properties || r;
      const isSoldOut = parseGhlBoolean(p.is_sold_out);
      const capacity = parseInt(p.capacity, 10) || 0;
      const sold = parseInt(p.sold, 10) || 0;
      const effectiveSoldOut = isSoldOut || (capacity > 0 && sold >= capacity);

      let statusBadge: 'sold-out' | 'limited' | 'popular' | 'selling-fast' | undefined = undefined;
      if (effectiveSoldOut) {
        statusBadge = 'sold-out';
      } else if (p.status_badge && p.status_badge !== 'none') {
        statusBadge = p.status_badge;
      }

      return {
        id: r.id || `ghl-ticket-${idx}`,
        row: idx + 1,
        title: p.title || 'Ticket',
        price: typeof p.price === 'number' ? p.price : (parseFloat(p.price) || 0),
        date: p.date_label || 'Datum volgt',
        time: p.time_label || 'Tijd volgt',
        day: p.day || 'all',
        daypart: p.daypart || 'all',
        category: p.category || 'entree',
        categoryName: p.category ? (p.category.charAt(0).toUpperCase() + p.category.slice(1)) : 'Entreeticket',
        bookingType: p.booking_type || 'Vrij te boeken voor iedereen',
        location: p.location || '',
        capacity: capacity,
        sold: sold,
        isSoldOut: effectiveSoldOut,
        isLowStock: capacity > 0 && (capacity - sold <= 10) && !effectiveSoldOut,
        status: statusBadge,
        statusText: effectiveSoldOut ? 'Uitverkocht' : undefined,
        description: p.description || '',
        extra: p.description || ''
      };
    });

    ticketsCache[normalizedCity] = { data: parsedTickets, timestamp: now };
    return parsedTickets;
  } catch (err) {
    console.error(`[GHL API] Error fetching tickets for ${city}:`, err);
    return TICKETS_DEN_HAAG;
  }
}

/**
 * Fetch standhouders from GHL Custom Object with automatic fallback to local dataset.
 * @param city - 'den_haag' | 'gent' | 'amsterdam'
 */
export async function getStandhouders(city: string = 'den_haag'): Promise<ExhibitorItem[]> {
  const normalizedCity = city.toLowerCase().replace('-', '_');
  const now = Date.now();
  const cached = standsCache[normalizedCity];

  if (cached && (now - cached.timestamp < CACHE_TTL_MS)) {
    return cached.data;
  }

  // Fallback if no API key is set
  if (!GHL_API_KEY) {
    return EXHIBITORS_DEN_HAAG;
  }

  try {
    const url = `${GHL_API_BASE}/objects/${GHL_STANDS_OBJECT_KEY}/records/search`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        page: 1,
        pageLimit: 100,
        query: `festival_city:${normalizedCity}`,
        searchAfter: []
      })
    });

    if (!response.ok) {
      console.warn(`[GHL API] Standhouders fetch for ${city} failed with status ${response.status}. Using fallback dataset.`);
      return EXHIBITORS_DEN_HAAG;
    }

    const json = await response.json();
    const records = json.customObjectRecords || json.records || [];

    if (!Array.isArray(records) || records.length === 0) {
      console.info(`[GHL API] No standhouder records found in GHL for ${city}. Using fallback dataset.`);
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
        isNotOnMap: parseGhlBoolean(p.is_not_on_map)
      };
    });

    standsCache[normalizedCity] = { data: parsedStandhouders, timestamp: now };
    return parsedStandhouders;
  } catch (err) {
    console.error(`[GHL API] Error fetching standhouders for ${city}:`, err);
    return EXHIBITORS_DEN_HAAG;
  }
}
