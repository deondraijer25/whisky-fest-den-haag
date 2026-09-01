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
  - Den Haag Groen: `#006448`, `#004D37`, `#0E3823`, `rgba(0, 100, 72)`
  - Gent Royal Blue: `#1E3A8A`, `#172554`, `rgba(30, 58, 138)`
  - Gent Oranje: `#FF6500`, `#FF8A00`
  - Amsterdam: Specifieke Amsterdamse hex-waarden

## 2. Logo Invarianten per Achtergrond
- **Lichte achtergronden** (bijv. `#FAF7F2` beige parchment, Coin-Flip Preloader, Header Navbar):
  - Gebruik ALTIJD het officiële full-color logo (`src/assets/Logo/Logo.svg` / `Logo_navbar.svg`).
  - Nooit monochrome witte logo's op lichte achtergronden plaatsen.
- **Donkere achtergronden** (bijv. Hero video overlay, donkere banners):
  - Gebruik het witte monochrome stempel-logo (`src/assets/LogosAll/logo-wit-<city>.svg`).

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
