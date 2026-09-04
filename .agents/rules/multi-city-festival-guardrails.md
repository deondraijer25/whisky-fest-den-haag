---
trigger: always_on
description: Strikte richtlijnen en kwaliteitscontroles voor Multi-City festival codebases (Den Haag, Gent, Amsterdam).
---

# Multi-City Festival Branding & Codebase Guardrails

Bij het klonen, synchroniseren of aanpassen van festivalwebsites (Den Haag, Gent, Amsterdam) gelden de volgende verplichte regels:

## 1. Zero-Tolerance Kleurisolatie (Scoped Component CSS)
- Vertrouw NOOIT alleen op `global.css`; Astro componenten bevatten scoped `<style>` blokken en inline styling.
- Voer bij elke stadsmigratie een geautomatiseerde scan uit over álle `.astro`, `.css` en `.ts` bestanden.
- Controleer en borg dat er **0 hardcoded kleurcodes** van een andere stad achterblijven:
  - Den Haag Groen: `#006448`, `#004D37`, `#0E3823`, `#061A10`, `rgba(0, 100, 72)`, `rgba(6, 26, 16)`, `rgba(14, 56, 35)`
  - Gent Royal Blue: `#1E3A8A`, `#172554`, `rgba(30, 58, 138)`
  - Gent Oranje: `#FF6500`, `#FF8A00`
  - Amsterdam: Specifieke Amsterdamse hex-waarden

## 2. Logo Invarianten per Achtergrond
- **Lichte achtergronden** (bijv. `#FAF7F2` beige parchment, Coin-Flip Preloader, Header Navbar):
  - Gebruik ALTIJD het officiële full-color logo (`src/assets/Logo/Logo.svg` / `Logo_navbar.svg`).
  - Nooit monochrome witte logo's op lichte achtergronden plaatsen.
- **Donkere achtergronden** (bijv. Hero video overlay, donkere banners):
  - Gebruik het witte monochrome stempel-logo (`src/assets/LogosAll/logo-wit-<city>.svg`).
- **Strikte SVG Vector Onschendbaarheid:**
  - Officiële logo-bestanden (in `src/assets/Logo/` en `src/assets/LogosAll/`) mogen **NOOIT programmatisch worden bewerkt** of voorzien van geautomatiseerde color/text replaces. Ze worden 1-op-1 als onaantastbare bronbestanden behandeld. CSS kleuren worden ontleend aan de logo's, nooit andersom.

## 3. Data Integriteit & Single Source of Truth
- Data (data, locatie, sessies, masterclasses, prijzen) wordt ALTIJD direct ontleend aan:
  1. `src/config/brand.config.ts`
  2. Het officiële Excel-draaiboek (`Alle items per website voor Deon.xlsx`).
- Vervang alle stads- en locatiereferenties in één geautomatiseerde stap (*Grote Kerk* vs *De Oude Vismijn* vs *Zuiderkerk Amsterdam*).

## 4. Verplichte Pre-Flight Build & Scan Check
Voordat een stadswebsite als voltooid wordt gemarkeerd:
1. `npm run build` moet foutloos slagen.
2. Geautomatiseerde regex check moet bevestigen: `Total foreign city color occurrences: 0`.
3. Lokale poort check (Den Haag 4330, Gent 4332, Amsterdam 4331) moet 200 OK leveren met geverifieerde branding markers.

## 5. Absolute Layout & Design Invariantie (1-op-1 Blauwdruk)
- Het visuele ontwerp, de DOM-structuur, CSS-layout, componenthiërarchie, tabellen en interactieve elementen zijn **100% IDENTIEK** over alle festivalwebsites (Den Haag, Gent, Amsterdam).
- Het is ten strengste **VERBODEN** om bij een stadsmigratie een afwijkende layout, alternatieve card-grids of een eigen pagina-structuur te introduceren.
- **Den Haag is de master-blauwdruk:**
  - De tabellen, timetable-rijen, tabbladen, ticket-cards en pop-ups behouden exact dezelfde markup en styling.
  - Alleen de **data** (titels, sprekers, tijden, data, prijzen) en de **stadskleuren / media** worden dynamisch geladen.

## 6. Strikt Verbod op Emojis en AI-gegenereerde Iconen
- Het gebruik van Unicode emojis (bijv. `🎟️`, `📅`, `🗺️`, `👤`, `🛒`, `💡`, `🇧🇪`, `🇳🇱`, etc.) of generieke AI-iconen is **strikt VERBODEN** door de gehele codebase (componenten, navigatie-drawers, cards, knoppen, alerts en checkout flows).
- **Verplichte Iconografie Standaard:**
  - Gebruik uitsluitend op maat gemaakte, minimalistische monochrome inline `<svg>` vector line-art met expliciete strokes (`stroke-width: 2` of `2.5`, `stroke: currentColor` of merkkleur).
  - Voor land- en stadsaanduidingen (zoals Gent / Amsterdam) worden strakke typografische badges (bijv. `BE`, `NL`) of officiële vectoren gebruikt.
  - Voer bij elke release een geautomatiseerde regex-scan uit om te borgen dat de Unicode emoji-telling exact **0** is.

## 7. Mobiele Bottom Sheet & Bestelflow Invarianten
- **Gefaseerde Bestelervaring:**
  - Bij het openen van de winkelwagen op mobiel (`<= 990px`) via de navbar of sticky bar wordt ALTIJD eerst de **Winkelwagen (Jouw Bestelling)** getoond.
  - De Add-ons (*"Maak uw Beleving Compleet"*) worden **uitsluitend** getoond nadat de gebruiker in de winkelwagen op **`Afrekenen →`** heeft geklikt.
- **View Isolatie & Class Toggling:**
  - Gebruik altijd actieve CSS-klassen (`.sheet-view.is-active`, `.sheet-empty-state.is-visible`) in plaats van pure inline `display: flex !important` om te voorkomen dat views over elkaar heen renderen.
- **Segmented Stepper Pill (`.sheet-stepper-pill`):**
  - Gebruik een compacte stepper met `height: 38px`, witte actieknoppen `32x34px`, en `min-width: 28px` gecentreerd aantal zodat knoppen nooit worden afgesneden aan de schermrand.

## 8. Horizontale Filters & Responsive Grids
- **Touch-Scroll Filters:**
  - Horizontale filterbalken (bijv. categorieën, sessies, standhouders) moeten voorzien zijn van `-webkit-overflow-scrolling: touch; scrollbar-width: none;` en `::-webkit-scrollbar { display: none; }` om native scrollbars te elimineren.
- **Compacte 3-in-a-rij Grids op Mobiel:**
  - Heritage USPs en Footer festival-logos worden op mobiele schermen altijd als 3-in-a-rij gerenderd (`grid-template-columns: repeat(3, 1fr) !important;`).
- **Paginakoppen & Header Spacing op Mobiel:**
  - Alle subpagina's (`/programma`, `/standhouders`, `/kaart`, `/account`, etc.) hebben een minimale bovenmarge van `padding-top: 7rem` tot `7.5rem` op mobiel om overlap met de fixed header te voorkomen.

## 9. Desktop Sticky Cart & Scroll Invarianten
- **Verplicht `overflow-x: clip`:**
  - Gebruik op `html` en `body` ALTIJD `overflow-x: clip;` in plaats van `overflow-x: hidden;`. `overflow-x: hidden` breekt browser `position: sticky` op child elementen zoals `.ticket-receipt-card`.
- **Top Offset & Alignment:**
  - `.ticket-receipt-card` heeft altijd `position: -webkit-sticky; position: sticky; top: 90px; align-self: start;` om soepel mee te glijden onder de vaste navigatiebalk.

## 10. Horizontale Tijdlijn & Preloader Invarianten
- **Tijdlijn Sectiehoogte:**
  - `.timeline-scroll-section` gebruikt een strak gekalibreerde hoogte van `185vh` op desktop. Vermijd `300vh` om dode witte scrollruimte na de laatste kaart te voorkomen.
- **Preloader Duur & Jaartal:**
  - De coin-flip preloader draait altijd exact 2.4s met zachte fade-out.
  - Het oprichtingsjaartal (`EST. <jaar>`) moet strikt overeenkomen met het stadslogo (Amsterdam: 2025, Den Haag: 2000, Gent: 2004).
