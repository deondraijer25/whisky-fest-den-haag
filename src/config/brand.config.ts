// src/config/brand.config.ts
// Centrale merk- en thema-inrichting voor Whisky Fest Den Haag

export interface BrandConfig {
  id: 'denhaag' | 'amsterdam' | 'gent';
  name: string;
  shortName: string;
  city: string;
  country: string;
  venue: string;
  venueShort: string;
  foundingYear: number;
  edition: string;
  datesText: string;
  datesShort: string;
  domain: string;
  localPort: number;
  
  colors: {
    primary: string;
    primaryHover: string;
    accent: string;
    accentLight: string;
    bgParchment: string;
    bgSand: string;
    bgPaperCard: string;
    textCharcoal: string;
    textMuted: string;
    border: string;
    borderDark: string;
    heroGradient: string;
    heroTintRadial: string;
  };

  copy: {
    heroTitleLine1: string;
    heroTitleLine2: string;
    heroTitleLine3: string;
    heroSubtitle: string;
    preloaderTitle: string;
    preloaderSubtitle: string;
    announcementBar: string;
    tramTitle: string;
    tramDesc: string;
    floorplanTitle: string;
    metaTitle: string;
    metaDescription: string;
  };
}

export const BRAND: BrandConfig = {
  id: 'denhaag',
  name: 'International Whisky Festival',
  shortName: 'Whisky Fest Den Haag',
  city: 'Den Haag',
  country: 'Nederland',
  venue: 'Grote Kerk Den Haag',
  venueShort: 'Grote Kerk',
  foundingYear: 2000,
  edition: '25e Jubileum Editie',
  datesText: '13, 14 en 15 November 2026',
  datesShort: '13-15 Nov 2026',
  domain: 'https://whisky-fest-den-haag.vercel.app',
  localPort: 4330,

  colors: {
    primary: '#006448',         // Festival Pine Green
    primaryHover: '#004d37',
    accent: '#caac8e',          // Champagne Gold
    accentLight: '#e4d5c4',
    bgParchment: '#FAF7F2',     // Warm vintage cotton paper
    bgSand: '#F4EFE6',          // Warm sand paper
    bgPaperCard: '#FCFAF7',
    textCharcoal: '#171614',    // Charred oak cask black
    textMuted: '#5A524A',
    border: '#c1d4ce',
    borderDark: '#8ba198',
    heroGradient: 'linear-gradient(135deg, #061A10 0%, #0E3823 35%, #165636 65%, #082114 100%)',
    heroTintRadial: 'radial-gradient(circle at 70% 50%, rgba(22, 86, 54, 0.15) 0%, rgba(6, 26, 16, 0.45) 100%)'
  },

  copy: {
    heroTitleLine1: 'Het meest geliefde',
    heroTitleLine2: 'whisky festival',
    heroTitleLine3: 'van Nederland.',
    heroSubtitle: 'Beleef de magie van het meest toonaangevende whiskyfestival in de historische Grote Kerk van Den Haag. Of u nu een beginnend proever bent of een doorgewinterde kenner, wij bieden een onvergetelijke ervaring.',
    preloaderTitle: 'INTERNATIONAL WHISKY FESTIVAL',
    preloaderSubtitle: 'EST. 2000 • DEN HAAG',
    announcementBar: 'Sluit je aan bij duizenden whiskyliefhebbers in Den Haag – Bestel vandaag nog je tickets!',
    tramTitle: 'Haagsche Whiskytram',
    tramDesc: 'Rondrit door historisch Den Haag in een klassieke tram inclusief deskundig geleide proeverij van 4 topdrams.',
    floorplanTitle: 'Plattegrond Grote Kerk Den Haag',
    metaTitle: 'International Whisky Festival Den Haag | 13-15 Nov 2026',
    metaDescription: 'Bezoek het meest sfeervolle en toonaangevende whiskyfestival van Nederland in de Grote Kerk Den Haag. Bestel nu direct uw entreekaarten.'
  }
};
