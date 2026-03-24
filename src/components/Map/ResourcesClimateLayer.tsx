import { useMemo } from 'react';
import { Source, Layer } from 'react-map-gl/mapbox';
import type { FeatureCollection, Point } from 'geojson';
import {
  criticalMinerals,
  RC_LAYER_DEFS,
  MINERAL_COLORS,
  WATER_STRESS_DATA,
  WATER_STRESS_COLORS,
  FOOD_DEPENDENCY_DATA,
  FOOD_DEPENDENCY_COLORS,
  CLIMATE_RISK_DATA,
  CLIMATE_RISK_COLORS,
} from '../../data/resourcesClimate';
import type {
  ResourcesClimateCategory,
  WaterStressLevel,
  FoodDependencyLevel,
  ClimateRiskLevel,
} from '../../data/resourcesClimate';

// Matches WorldMap — one geometry per country, no stacked duplicates
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WORLDVIEW_FILTER: any = ['==', ['get', 'worldview'], 'all'];

// Layer IDs that should receive pointer interactivity (minerals only)
export const RESOURCE_INTERACTIVE_LAYER_IDS: string[] = ['rc-minerals'];

interface ResourcesClimateLayerProps {
  activeLayers: Set<ResourcesClimateCategory>;
}

const _COLORS = Object.fromEntries(RC_LAYER_DEFS.map((d) => [d.id, d.color])) as Record<
  ResourcesClimateCategory,
  string
>;

function vis(active: boolean): { visibility: 'visible' | 'none' } {
  return { visibility: active ? 'visible' : 'none' };
}

// Expands a data map + color map into a flat Mapbox match expression on ['id']
function buildMatchById<L extends string>(
  data: Record<string, L>,
  colorMap: Record<L, string>,
  fallback = 'transparent',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  const pairs = Object.entries(data).flatMap(([code, level]) => [code, colorMap[level]]);
  return ['match', ['id'], ...pairs, fallback];
}

// match expression on the 'mineralType' feature property
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildMineralColorExpr(fallback: string): any {
  const pairs = Object.entries(MINERAL_COLORS).flatMap(([type, color]) => [type, color]);
  return ['match', ['get', 'mineralType'], ...pairs, fallback];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MINERAL_RADIUS_EXPR: any = ['match', ['get', 'scale'], 'major', 7, 5];

export default function ResourcesClimateLayer({ activeLayers }: ResourcesClimateLayerProps) {
  const mineralsGeoJSON = useMemo<FeatureCollection<Point>>(
    () => ({
      type: 'FeatureCollection',
      features: criticalMinerals.map((m) => ({
        type: 'Feature' as const,
        id: m.id,
        geometry: { type: 'Point' as const, coordinates: m.coordinates },
        properties: {
          mineralType: m.mineralType,
          name: m.name,
          country: m.country,
          description: m.description ?? null,
          scale: m.scale,
        },
      })),
    }),
    [],
  );

  // Pre-compute paint expressions (stable references)
  const waterStressColor = useMemo(
    () => buildMatchById<WaterStressLevel>(WATER_STRESS_DATA, WATER_STRESS_COLORS),
    [],
  );
  const foodDepColor = useMemo(
    () => buildMatchById<FoodDependencyLevel>(FOOD_DEPENDENCY_DATA, FOOD_DEPENDENCY_COLORS),
    [],
  );
  const climateRiskColor = useMemo(
    () => buildMatchById<ClimateRiskLevel>(CLIMATE_RISK_DATA, CLIMATE_RISK_COLORS),
    [],
  );
  const mineralColorExpr = useMemo(() => buildMineralColorExpr(_COLORS.minerals), []);

  const mineralsActive  = activeLayers.has('minerals');
  const waterActive     = activeLayers.has('waterStress');
  const foodActive      = activeLayers.has('foodImport');
  const climateActive   = activeLayers.has('climateDisplacement');

  return (
    <>
      {/* ── Critical Minerals — point GeoJSON source ─────────────────────── */}
      <Source id="rc-minerals-source" type="geojson" data={mineralsGeoJSON}>
        {/* White halo for legibility against basemap */}
        <Layer
          id="rc-minerals-halo"
          type="circle"
          layout={vis(mineralsActive)}
          paint={{
            'circle-color': '#ffffff',
            'circle-radius': ['+', MINERAL_RADIUS_EXPR, 3],
            'circle-opacity': 0.55,
          }}
        />
        {/* Colored deposit marker */}
        <Layer
          id="rc-minerals"
          type="circle"
          layout={vis(mineralsActive)}
          paint={{
            'circle-color': mineralColorExpr,
            'circle-radius': MINERAL_RADIUS_EXPR,
            'circle-opacity': 0.9,
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 1.5,
          }}
        />
      </Source>

      {/* ── Water Stress — choropleth on existing countries vector source ── */}
      {/* beforeId inserts this fill below the country border lines */}
      <Layer
        id="rc-water-stress"
        type="fill"
        source="countries"
        source-layer="country_boundaries"
        beforeId="countries-line"
        filter={WORLDVIEW_FILTER}
        layout={vis(waterActive)}
        paint={{
          'fill-color': waterStressColor,
          'fill-opacity': 0.65,
        }}
      />

      {/* ── Wheat Import Dependency — choropleth ────────────────────────── */}
      <Layer
        id="rc-food-import"
        type="fill"
        source="countries"
        source-layer="country_boundaries"
        beforeId="countries-line"
        filter={WORLDVIEW_FILTER}
        layout={vis(foodActive)}
        paint={{
          'fill-color': foodDepColor,
          'fill-opacity': 0.65,
        }}
      />

      {/* ── Climate Displacement Risk — choropleth ───────────────────────── */}
      <Layer
        id="rc-climate-risk"
        type="fill"
        source="countries"
        source-layer="country_boundaries"
        beforeId="countries-line"
        filter={WORLDVIEW_FILTER}
        layout={vis(climateActive)}
        paint={{
          'fill-color': climateRiskColor,
          'fill-opacity': 0.65,
        }}
      />
    </>
  );
}
