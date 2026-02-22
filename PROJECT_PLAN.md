# OSINT Interactive World Map - Project Plan

## Vision

An interactive world map application where users can explore countries and learn about their history, economics, geopolitics, and culture through rich, data-driven profiles powered by open-source intelligence (OSINT) data.

---

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | React 18 + TypeScript | Strong ecosystem, type safety, component model |
| Map Engine | React-Leaflet + Leaflet.js | Free, open-source, no API key required for base tiles |
| GeoJSON | Natural Earth Data | Public domain country boundaries |
| Styling | Tailwind CSS | Rapid UI development, responsive by default |
| State Management | Zustand | Lightweight, minimal boilerplate |
| Build Tool | Vite | Fast HMR, modern defaults for React+TS |
| Data Fetching | TanStack Query (React Query) | Caching, deduplication, background refresh for API data |
| Deployment | Vercel | Free tier, instant deploys from Git, edge CDN |

---

## Data Strategy (Hybrid Approach)

### Static Baseline Data
Curated JSON files shipped with the app, providing editorial control and offline fallback:
- Country metadata (name, capital, region, languages, currency)
- Historical summaries (key events, independence dates, formation)
- Cultural overviews (religions, traditions, notable facts)
- Geopolitical context (alliances, disputes, government type)

### Live API Enrichment
Real-time data fetched from open APIs for always-current indicators:

| Data Category | Source | API |
|--------------|--------|-----|
| Economic indicators | World Bank | `api.worldbank.org/v2` |
| Demographics | World Bank | `api.worldbank.org/v2` |
| Country basics | REST Countries | `restcountries.com/v3.1` |
| News/current events | GNews / MediaStack | Free tier APIs |
| Flag images | Flagpedia | `flagcdn.com` |
| Geographic data | Natural Earth | Static GeoJSON |

---

## MVP Scope - Phase 1: Major Powers

### Countries (Initial 20)
United States, China, Russia, United Kingdom, France, Germany, Japan, India, Brazil, Canada, Australia, South Korea, Mexico, Indonesia, Saudi Arabia, Turkey, Italy, South Africa, Argentina, Nigeria

### Core Features

#### 1. Interactive Map
- Zoomable, pannable world map with country boundaries
- Click/tap on a country to select it
- Hover tooltips showing country name and basic stats
- Color-coded choropleth layers (GDP, population, etc.)
- Zoom-to-fit when selecting a country

#### 2. Country Profile Panel
A slide-out or sidebar panel showing detailed country information organized in tabs:

**Overview Tab**
- Flag, official name, capital, population
- Region, subregion, continent
- Languages, currency, time zones
- Quick-stat cards (GDP, HDI, area)

**History Tab**
- Timeline of key historical events
- Independence/formation date
- Notable historical periods
- Curated editorial summaries

**Economics Tab**
- GDP (current + historical chart)
- GDP per capita
- Major industries and exports
- Trade partners
- Unemployment rate
- Inflation rate
- Data sourced live from World Bank API

**Geopolitics Tab**
- Government type and current leader
- International organization memberships (UN, NATO, EU, etc.)
- Active territorial disputes
- Key alliances and rivalries
- Military spending (% of GDP)

**Culture Tab**
- Major religions and demographics
- UNESCO World Heritage Sites
- Notable cultural practices
- National holidays
- Cuisine highlights

#### 3. Map Layer Controls
- Toggle between data visualization layers:
  - Political boundaries (default)
  - GDP heatmap
  - Population density
  - HDI (Human Development Index)
- Layer legend with scale

#### 4. Search and Navigation
- Country search bar with autocomplete
- Region quick-filters (continent selector)
- Keyboard navigation support

---

## Phase 2: Expansion (Post-MVP)

### Additional Countries
- Expand to all ~195 UN-recognized countries
- Prioritize by region: Europe > Middle East > Asia > Africa > Americas > Oceania

### New Features
- **Country Comparison Tool**: Side-by-side comparison of 2-3 countries
- **Timeline Slider**: Scrub through years to see how indicators change over time
- **Conflict Map Layer**: Active conflicts, peacekeeping missions
- **Trade Flow Visualization**: Animated lines showing import/export flows
- **User Bookmarks**: Save favorite countries or custom views
- **Data Export**: Download country profiles as PDF

---

## Phase 3: Advanced Features

- **Relationship Graph**: Interactive network showing diplomatic relations
- **News Feed Integration**: Live news filtered by selected country
- **Quiz Mode**: Test knowledge with geography/history questions
- **Community Contributions**: User-submitted corrections and additions
- **Mobile App**: React Native wrapper or PWA optimization
- **Multilingual Support**: i18n for the interface

---

## Project Structure

```
OSINTWorldMap/
├── public/
│   └── geojson/              # Country boundary GeoJSON files
├── src/
│   ├── components/
│   │   ├── Map/
│   │   │   ├── WorldMap.tsx          # Main Leaflet map component
│   │   │   ├── CountryLayer.tsx      # GeoJSON country polygons
│   │   │   ├── MapControls.tsx       # Zoom, layer toggles
│   │   │   └── ChoroplethLegend.tsx  # Color scale legend
│   │   ├── CountryPanel/
│   │   │   ├── CountryPanel.tsx      # Slide-out detail panel
│   │   │   ├── OverviewTab.tsx
│   │   │   ├── HistoryTab.tsx
│   │   │   ├── EconomicsTab.tsx
│   │   │   ├── GeopoliticsTab.tsx
│   │   │   └── CultureTab.tsx
│   │   ├── Search/
│   │   │   └── SearchBar.tsx         # Country search with autocomplete
│   │   ├── Layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── UI/
│   │       ├── StatCard.tsx          # Reusable stat display card
│   │       ├── Timeline.tsx          # Historical event timeline
│   │       └── Tabs.tsx              # Tab navigation component
│   ├── data/
│   │   ├── countries/                # Per-country static JSON files
│   │   │   ├── us.json
│   │   │   ├── cn.json
│   │   │   └── ...
│   │   ├── metadata.json             # Master country list and codes
│   │   └── layers.json               # Choropleth layer definitions
│   ├── hooks/
│   │   ├── useCountryData.ts         # Fetch and merge static + API data
│   │   ├── useWorldBankAPI.ts        # World Bank API integration
│   │   └── useMapInteraction.ts      # Map click/hover state
│   ├── services/
│   │   ├── worldbank.ts              # World Bank API client
│   │   ├── restcountries.ts          # REST Countries API client
│   │   └── cache.ts                  # API response caching utilities
│   ├── store/
│   │   └── appStore.ts               # Zustand global state
│   ├── types/
│   │   ├── country.ts                # Country data type definitions
│   │   └── api.ts                    # API response types
│   ├── utils/
│   │   ├── formatters.ts             # Number/date formatting
│   │   └── geo.ts                    # GeoJSON helper utilities
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                     # Tailwind directives
├── .env.example                      # API keys template (if any)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vite.config.ts
├── index.html
└── PROJECT_PLAN.md
```

---

## Implementation Milestones

### Milestone 1: Foundation
- [ ] Initialize Vite + React + TypeScript project
- [ ] Set up Tailwind CSS
- [ ] Set up ESLint + Prettier
- [ ] Render a basic Leaflet map with tile layer
- [ ] Load and display GeoJSON country boundaries
- [ ] Implement country click handler (log country code)

### Milestone 2: Country Data Layer
- [ ] Create static JSON data files for 20 MVP countries
- [ ] Define TypeScript interfaces for country data
- [ ] Build World Bank API service with caching
- [ ] Build REST Countries API service
- [ ] Create `useCountryData` hook that merges static + live data
- [ ] Set up Zustand store for selected country and active layer

### Milestone 3: Country Profile Panel
- [ ] Build the slide-out CountryPanel component
- [ ] Implement Overview tab with flag, stats, quick facts
- [ ] Implement History tab with timeline component
- [ ] Implement Economics tab with live World Bank data
- [ ] Implement Geopolitics tab
- [ ] Implement Culture tab
- [ ] Add tab navigation and transitions

### Milestone 4: Map Interactivity
- [ ] Add hover tooltips on countries
- [ ] Implement choropleth coloring for GDP layer
- [ ] Add layer toggle controls (GDP, population, HDI)
- [ ] Build choropleth legend component
- [ ] Implement zoom-to-fit on country selection
- [ ] Style selected country highlight

### Milestone 5: Search and Polish
- [ ] Build search bar with autocomplete
- [ ] Add region quick-filter buttons
- [ ] Implement responsive layout (mobile sidebar becomes bottom sheet)
- [ ] Add loading states and error handling
- [ ] Performance optimization (lazy loading, code splitting)
- [ ] Deploy to Vercel

---

## Data Schema

### Static Country Data (`data/countries/{code}.json`)

```typescript
interface CountryData {
  code: string;             // ISO 3166-1 alpha-2
  code3: string;            // ISO 3166-1 alpha-3
  name: string;
  officialName: string;
  capital: string;
  region: string;
  subregion: string;
  languages: string[];
  currency: { code: string; name: string; symbol: string };

  history: {
    summary: string;
    independenceDate: string | null;
    keyEvents: Array<{
      year: number;
      title: string;
      description: string;
    }>;
  };

  geopolitics: {
    governmentType: string;
    headOfState: string;
    organizations: string[];       // UN, NATO, EU, etc.
    disputes: string[];
    alliances: string[];
  };

  culture: {
    religions: Array<{ name: string; percentage: number }>;
    unescoSites: string[];
    nationalHolidays: Array<{ name: string; date: string }>;
    cuisineHighlights: string[];
    culturalNotes: string;
  };
}
```

### Live API Data (merged at runtime)

```typescript
interface LiveIndicators {
  population: number;
  gdp: number;
  gdpPerCapita: number;
  gdpGrowth: number;
  hdi: number;
  unemployment: number;
  inflation: number;
  militarySpendingPctGdp: number;
  lifeExpectancy: number;
  area: number;               // sq km
  gdpHistory: Array<{ year: number; value: number }>;
  populationHistory: Array<{ year: number; value: number }>;
}
```

---

## Open-Source Data Sources Reference

| Source | URL | License |
|--------|-----|---------|
| Natural Earth (GeoJSON) | naturalearthdata.com | Public Domain |
| World Bank Open Data | data.worldbank.org | CC BY 4.0 |
| REST Countries | restcountries.com | MPL 2.0 |
| CIA World Factbook | cia.gov/the-world-factbook | Public Domain |
| Flagpedia | flagpedia.net | Free for any use |
| UNDP HDI Data | hdr.undp.org | Open data |
| OpenStreetMap Tiles | openstreetmap.org | ODbL |

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| API rate limits on free tiers | Data loading failures | Aggressive caching, static fallbacks, request batching |
| GeoJSON file size (detailed boundaries) | Slow initial load | Use simplified geometries, lazy load detail on zoom |
| Data accuracy/freshness | Misleading information | Show data source and date, allow user to report issues |
| Scope creep beyond MVP | Delayed delivery | Strict phase gating, MVP-first mentality |
| World Bank API downtime | Empty economics tabs | Cache last-known values, show "data unavailable" gracefully |

---

## Non-Goals (Explicitly Out of Scope for MVP)

- User accounts or authentication
- Backend server or database (fully client-side)
- Real-time collaboration
- Custom map tile server
- Satellite/terrain imagery
- Street-level mapping
- Mobile native app
