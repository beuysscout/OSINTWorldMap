import { useMemo } from 'react';
import { Source, Layer } from 'react-map-gl/mapbox';
import type { FeatureCollection, Point } from 'geojson';
import {
  militaryBases,
  navalBases,
  nuclearSites,
  MILITARY_LAYER_DEFS,
  NATION_COLORS,
} from '../../data/militaryFeatures';
import type { MilitaryFeatureCategory } from '../../data/militaryFeatures';

interface MilitaryLayerProps {
  activeLayers: Set<MilitaryFeatureCategory>;
}

const COLORS = Object.fromEntries(
  MILITARY_LAYER_DEFS.map((d) => [d.id, d.color]),
) as Record<MilitaryFeatureCategory, string>;

function vis(active: boolean) {
  return { visibility: active ? ('visible' as const) : ('none' as const) };
}

// Build a Mapbox match expression for nation → color
function nationColorExpression(fallback: string) {
  const pairs = Object.entries(NATION_COLORS).flatMap(([nation, color]) => [nation, color]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ['match', ['get', 'nation'], ...pairs, fallback] as any;
}

export default function MilitaryLayer({ activeLayers }: MilitaryLayerProps) {
  const pointsGeoJSON = useMemo<FeatureCollection<Point>>(() => ({
    type: 'FeatureCollection',
    features: [
      ...militaryBases.map((b) => ({
        type: 'Feature' as const,
        id: b.id,
        geometry: { type: 'Point' as const, coordinates: b.coordinates },
        properties: {
          category: b.category,
          name: b.name,
          nation: b.nation,
          description: b.description ?? null,
        },
      })),
      ...navalBases.map((b) => ({
        type: 'Feature' as const,
        id: b.id,
        geometry: { type: 'Point' as const, coordinates: b.coordinates },
        properties: {
          category: b.category,
          name: b.name,
          nation: b.nation,
          description: b.description ?? null,
        },
      })),
      ...nuclearSites.map((b) => ({
        type: 'Feature' as const,
        id: b.id,
        geometry: { type: 'Point' as const, coordinates: b.coordinates },
        properties: {
          category: b.category,
          name: b.name,
          nation: b.nation,
          description: b.description ?? null,
          facilityType: b.facilityType ?? null,
        },
      })),
    ],
  }), []);

  const basesActive = activeLayers.has('bases');
  const navalActive = activeLayers.has('naval');
  const nuclearActive = activeLayers.has('nuclear');

  return (
    <Source id="military-points" type="geojson" data={pointsGeoJSON}>
      {/* ── Military bases ── */}
      {/* White halo behind marker */}
      <Layer
        id="military-bases-halo"
        type="circle"
        filter={['==', ['get', 'category'], 'bases']}
        layout={vis(basesActive)}
        paint={{
          'circle-color': '#ffffff',
          'circle-radius': 7,
          'circle-opacity': 0.6,
        }}
      />
      <Layer
        id="military-bases"
        type="circle"
        filter={['==', ['get', 'category'], 'bases']}
        layout={vis(basesActive)}
        paint={{
          'circle-color': nationColorExpression(COLORS.bases),
          'circle-radius': 5,
          'circle-opacity': 0.85,
          'circle-stroke-color': '#fff',
          'circle-stroke-width': 1,
        }}
      />

      {/* ── Naval bases ── */}
      <Layer
        id="military-naval-halo"
        type="circle"
        filter={['==', ['get', 'category'], 'naval']}
        layout={vis(navalActive)}
        paint={{
          'circle-color': '#ffffff',
          'circle-radius': 8,
          'circle-opacity': 0.5,
        }}
      />
      <Layer
        id="military-naval"
        type="circle"
        filter={['==', ['get', 'category'], 'naval']}
        layout={vis(navalActive)}
        paint={{
          'circle-color': nationColorExpression(COLORS.naval),
          'circle-radius': 5,
          'circle-opacity': 0.85,
          'circle-stroke-color': COLORS.naval,
          'circle-stroke-width': 1.5,
        }}
      />

      {/* ── Nuclear sites — pulsing outer ring + inner dot ── */}
      <Layer
        id="military-nuclear-ring"
        type="circle"
        filter={['==', ['get', 'category'], 'nuclear']}
        layout={vis(nuclearActive)}
        paint={{
          'circle-color': 'transparent',
          'circle-radius': 9,
          'circle-stroke-color': COLORS.nuclear,
          'circle-stroke-width': 1.5,
          'circle-stroke-opacity': 0.55,
        }}
      />
      <Layer
        id="military-nuclear"
        type="circle"
        filter={['==', ['get', 'category'], 'nuclear']}
        layout={vis(nuclearActive)}
        paint={{
          'circle-color': COLORS.nuclear,
          'circle-radius': 4,
          'circle-opacity': 0.9,
          'circle-stroke-color': '#fff',
          'circle-stroke-width': 1,
        }}
      />
    </Source>
  );
}

export const MILITARY_INTERACTIVE_LAYER_IDS: string[] = [
  'military-bases',
  'military-naval',
  'military-nuclear',
];
