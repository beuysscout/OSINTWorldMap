import { useMemo } from 'react';
import { Source, Layer } from 'react-map-gl/mapbox';
import type { FeatureCollection, LineString, Polygon } from 'geojson';
import { rivers, mountains, deserts, NATURAL_LAYER_DEFS } from '../../data/naturalFeatures';
import type { NaturalFeatureCategory } from '../../data/naturalFeatures';

interface NaturalFeaturesLayerProps {
  activeLayers: Set<NaturalFeatureCategory>;
}

const COLORS = Object.fromEntries(
  NATURAL_LAYER_DEFS.map((d) => [d.id, d.color]),
) as Record<NaturalFeatureCategory, string>;

function vis(active: boolean) {
  return { visibility: active ? ('visible' as const) : ('none' as const) };
}

export default function NaturalFeaturesLayer({ activeLayers }: NaturalFeaturesLayerProps) {
  const linesGeoJSON = useMemo<FeatureCollection<LineString>>(() => ({
    type: 'FeatureCollection',
    features: [
      ...rivers.map((r) => ({
        type: 'Feature' as const,
        id: r.id,
        geometry: { type: 'LineString' as const, coordinates: r.coordinates },
        properties: { category: r.category, name: r.name, description: r.description ?? null },
      })),
      ...mountains.map((m) => ({
        type: 'Feature' as const,
        id: m.id,
        geometry: { type: 'LineString' as const, coordinates: m.coordinates },
        properties: { category: m.category, name: m.name, description: m.description ?? null },
      })),
    ],
  }), []);

  const polygonsGeoJSON = useMemo<FeatureCollection<Polygon>>(() => ({
    type: 'FeatureCollection',
    features: deserts.map((d) => ({
      type: 'Feature' as const,
      id: d.id,
      geometry: { type: 'Polygon' as const, coordinates: d.polygon },
      properties: { category: d.category, name: d.name, description: d.description ?? null },
    })),
  }), []);

  return (
    <>
      <Source id="natural-lines" type="geojson" data={linesGeoJSON}>
        {/* Rivers */}
        <Layer
          id="natural-rivers"
          type="line"
          filter={['==', ['get', 'category'], 'rivers']}
          layout={vis(activeLayers.has('rivers'))}
          paint={{
            'line-color': COLORS.rivers,
            'line-width': 1.5,
            'line-opacity': 0.75,
          }}
        />
        {/* Mountain ranges — wider with a subtle casing */}
        <Layer
          id="natural-mountains-casing"
          type="line"
          filter={['==', ['get', 'category'], 'mountains']}
          layout={vis(activeLayers.has('mountains'))}
          paint={{
            'line-color': '#fff',
            'line-width': 4,
            'line-opacity': 0.35,
          }}
        />
        <Layer
          id="natural-mountains"
          type="line"
          filter={['==', ['get', 'category'], 'mountains']}
          layout={vis(activeLayers.has('mountains'))}
          paint={{
            'line-color': COLORS.mountains,
            'line-width': 2,
            'line-opacity': 0.75,
            'line-dasharray': [4, 2],
          }}
        />
      </Source>

      <Source id="natural-polygons" type="geojson" data={polygonsGeoJSON}>
        <Layer
          id="natural-deserts-fill"
          type="fill"
          layout={vis(activeLayers.has('deserts'))}
          paint={{
            'fill-color': COLORS.deserts,
            'fill-opacity': 0.18,
          }}
        />
        <Layer
          id="natural-deserts-outline"
          type="line"
          layout={vis(activeLayers.has('deserts'))}
          paint={{
            'line-color': COLORS.deserts,
            'line-width': 1,
            'line-opacity': 0.4,
            'line-dasharray': [3, 4],
          }}
        />
      </Source>
    </>
  );
}

export const ALL_NATURAL_LAYER_IDS: string[] = [
  'natural-rivers',
  'natural-mountains',
  'natural-mountains-casing',
  'natural-deserts-fill',
  'natural-deserts-outline',
];

// Interactive layer ids (exclude casing layer)
export const NATURAL_INTERACTIVE_LAYER_IDS: string[] = [
  'natural-rivers',
  'natural-mountains',
  'natural-deserts-fill',
];
