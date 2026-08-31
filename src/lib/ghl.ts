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

const CATEGORY_ORDER: Record<string, number> = {
  entree: 1,
  masterclass: 2,
  warehouse: 3,
  tram: 4,
  trail: 5,
  vatenmaken: 6,
  botteling: 7
};

const DAY_ORDER: Record<string, number> = {
  vrijdag: 1,
  zaterdag: 2,
  zondag: 3,
  all: 4
};

function sortTickets(ticketsList: TicketItem[]): TicketItem[] {
  return ticketsList.sort((a, b) => {
    // 1. Sort by category (Entree always 1st)
    const catA = CATEGORY_ORDER[a.category] || 99;
    const catB = CATEGORY_ORDER[b.category] || 99;
    if (catA !== catB) return catA - catB;

    // For entree: VIP session is always first
    if (a.category === 'entree' && b.category === 'entree') {
      const isVipA = a.title.toLowerCase().includes('vip') ? 0 : 1;
      const isVipB = b.title.toLowerCase().includes('vip') ? 0 : 1;
      if (isVipA !== isVipB) return isVipA - isVipB;
    }

    // 2. Sort by day (vrijdag -> zaterdag -> zondag)
    const dayA = DAY_ORDER[a.day] || 99;
    const dayB = DAY_ORDER[b.day] || 99;
    if (dayA !== dayB) return dayA - dayB;

    // 3. Sort by start time if available
    const timeA = a.time ? (a.time.match(/(\d{1,2}:\d{2})/) ? a.time.match(/(\d{1,2}:\d{2})/)![1] : a.time) : '';
    const timeB = b.time ? (b.time.match(/(\d{1,2}:\d{2})/) ? b.time.match(/(\d{1,2}:\d{2})/)![1] : b.time) : '';
    if (timeA && timeB && timeA !== timeB) return timeA.localeCompare(timeB);

    // 4. Sort by title
    return a.title.localeCompare(b.title);
  });
}

function sortStandhouders(standsList: ExhibitorItem[]): ExhibitorItem[] {
  return standsList.sort((a, b) => {
    const numA = parseInt(a.id, 10);
    const numB = parseInt(b.id, 10);
    if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
    if (!isNaN(numA)) return -1;
    if (!isNaN(numB)) return 1;
    return a.id.localeCompare(b.id);
  });
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

  const citySearchQuery = normalizedCity === 'den_haag' ? 'Den Haag' : (normalizedCity === 'gent' ? 'Gent' : (normalizedCity === 'amsterdam' ? 'Amsterdam' : normalizedCity));

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
        pageLimit: 250,
        query: citySearchQuery,
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
        price: typeof p.price === 'number' ? p.price : (parseFloat(p.price) || parseFloat(p.ticket_price) || 0),
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
        description: p.ticket_description || p.description || '',
        extra: p.ticket_description || p.description || '',
        ambassadorName: p.ambassador_name || undefined,
        ambassadorTitle: p.ambassador_title || undefined,
        ambassadorBio: p.ambassador_bio || undefined,
        tastingLineup: p.tasting_lineup
          ? (Array.isArray(p.tasting_lineup) ? p.tasting_lineup : String(p.tasting_lineup).split(/[\n,]+/).map((s: string) => s.trim()).filter(Boolean))
          : undefined
      };
    });

    const sortedTickets = sortTickets(parsedTickets);
    ticketsCache[normalizedCity] = { data: sortedTickets, timestamp: now };
    return sortedTickets;
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
  const citySearchQuery = normalizedCity === 'den_haag' ? 'Den Haag' : (normalizedCity === 'gent' ? 'Gent' : (normalizedCity === 'amsterdam' ? 'Amsterdam' : normalizedCity));
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
        pageLimit: 250,
        query: citySearchQuery,
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
        description: p.stand_description || p.description || '',
        isNotOnMap: parseGhlBoolean(p.is_not_on_map)
      };
    });

    const sortedStandhouders = sortStandhouders(parsedStandhouders);
    standsCache[normalizedCity] = { data: sortedStandhouders, timestamp: now };
    return sortedStandhouders;
  } catch (err) {
    console.error(`[GHL API] Error fetching standhouders for ${city}:`, err);
    return EXHIBITORS_DEN_HAAG;
  }
}
