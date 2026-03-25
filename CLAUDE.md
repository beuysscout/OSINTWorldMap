## Project Context

This is a Mapbox-based interactive geopolitical map application built with TypeScript and React. When modifying map layers, always consider Mapbox worldview filters — they can silently exclude countries (e.g., Russia, China) and break interactivity.

## Stack

- React 18 + TypeScript + Vite
- react-map-gl v8 / mapbox-gl (migrated from react-leaflet — no Leaflet remains)
- Map style: `mapbox://styles/mapbox/light-v11`
- Token: `VITE_MAPBOX_TOKEN` in `.env`

## Critical: react-map-gl Import Pattern

Always import from the subpath — bare `'react-map-gl'` resolves to nothing and fails silently:

```ts
import Map, { Source, Layer, NavigationControl, Marker, useMap } from 'react-map-gl/mapbox';
```

## Critical: Worldview Filter

Every layer that uses the `country_boundaries` source-layer **must** include this filter:

```ts
const WORLDVIEW_FILTER = ['==', ['get', 'worldview'], 'all'];
```

Without it, certain countries (Russia, China, others) are silently excluded or duplicated, breaking interactivity and feature state.

## Country Feature IDs

The `countries` source uses:
```ts
promoteId={{ country_boundaries: 'iso_3166_1_alpha_3' }}
```
Feature IDs are **alpha-3 strings** (e.g. `"RUS"`, `"CHN"`), not numeric. All `setFeatureState` and `removeFeatureState` calls use alpha-3 codes.

## Coordinate Convention

- Data files (`tradeLanes.ts`, etc.) store coordinates as `[lat, lng]`
- GeoJSON / Mapbox requires `[lng, lat]`
- Use the `toGeoCoord([lat, lng]) → [lng, lat]` helper in `TradeLanesLayer.tsx`

## State Ownership

**`App.tsx`** owns all cross-cutting state:
- `selectedCode` / `compareCode` — alpha-3 codes for selected and compared countries
- `simScenarioId` / `simStep` — Alliance Drag simulation scenario and step
- `historicalYear` — active year for historical borders mode

**`WorldMap.tsx`** owns local map state:
- Layer visibility sets (`activeLayers`, `activeNaturalLayers`, `activeMilitaryLayers`, `activeResourcesLayers`)
- Tooltip content and position
- Panel/chip open flags (`layerPanelOpen`, `timelineOpen`)

## Three Interaction Modes

Click behavior changes based on active mode — do not break these exclusions:

| Mode | Trigger | Click behavior |
|------|---------|----------------|
| Normal | default | First click selects; second click on different country compares |
| Historical | `historicalYear !== null` | Click disabled; empire tooltip shown |
| Simulation | `simulationRoles != null` | Click disabled; countries colored by conflict role |

## Adding New Overlay Layers

Follow this pattern for every new data layer:

1. Create `src/components/Map/FooLayer.tsx` — export `FOO_INTERACTIVE_LAYER_IDS`
2. Apply `WORLDVIEW_FILTER` to any layer on `country_boundaries`
3. Import and spread `FOO_INTERACTIVE_LAYER_IDS` into `interactiveLayerIds` in `WorldMap.tsx`
4. Add a toggle state (`Set<FooCategory>`) and handler in `WorldMap.tsx`
5. Add the toggle UI to `LayerControl.tsx`

## Key Files

- `src/App.tsx` — top-level state, search, panel routing
- `src/components/Map/WorldMap.tsx` — map container, feature state, tooltip, chips bar
- `src/components/Map/TradeLanesLayer.tsx` — exports `ALL_TRADE_LAYER_IDS`
- `src/components/Map/NaturalFeaturesLayer.tsx` — exports `NATURAL_INTERACTIVE_LAYER_IDS`
- `src/components/Map/MilitaryLayer.tsx` — exports `MILITARY_INTERACTIVE_LAYER_IDS`
- `src/components/Map/ResourcesClimateLayer.tsx` — exports `RESOURCE_INTERACTIVE_LAYER_IDS`
- `src/components/Map/HistoricalBordersLayer.tsx` — exports `HISTORICAL_FILL_ID`
- `src/components/UI/LayerControl.tsx` — layer toggle panel
- `src/data/countries.ts` — static country data keyed by alpha-3; exports `supportedAlpha3Codes` Set
- `src/hooks/useCountryData.ts` — fetches live data from restcountries API + World Bank
- `src/types/index.ts` — shared TypeScript interfaces
- `src/App.css` — all styles (no Leaflet selectors)

## Workflow

Before committing any changes:

1. Run `npm run build` and confirm it exits with no errors (warnings about chunk size are acceptable).
2. Check any modified data files (`countries.ts`, `historicalBorders.ts`, etc.) for duplicate keys or codes — TypeScript won't catch duplicate object keys at compile time.

## Feature State Keys

Managed on `{ source: 'countries', sourceLayer: 'country_boundaries', id: alpha3 }`:

- `hovered` — boolean, set on mousemove
- `selected` — boolean, primary selected country
- `compared` — boolean, comparison country
- `conflictRole` — string (`'aggressor'`, `'target'`, `'defending'`, etc.) or null
