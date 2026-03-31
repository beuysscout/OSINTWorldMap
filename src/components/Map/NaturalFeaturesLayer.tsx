import { useMemo } from 'react';
import { Source, Layer } from 'react-map-gl/mapbox';
import type { FeatureCollection, LineString, Polygon } from 'geojson';
import { rivers, mountains, deserts, NATURAL_LAYER_DEFS } from '../../data/naturalFeatures.generated';
import type { NaturalFeatureCategory } from '../../data/naturalFeatures.generated';

interface NaturalFeaturesLayerProps {
  activeLayers: Set<NaturalFeatureCategory>;
}

const COLORS = Object.fromEntries(
  NATURAL_LAYER_DEFS.map((d) => [d.id, d.color]),
) as Record<NaturalFeatureCategory, string>;

function vis(active: boolean) {
  return { visibility: active ? ('visible' as const) : ('none' as const) };
}

function lineVis(active: boolean) {
  return {
    visibility: active ? ('visible' as const) : ('none' as const),
    'line-join': 'round' as const,
    'line-cap': 'round' as const,
  };
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
        {/* Rivers — subtle casing improves readability over country fills */}
        <Layer
          id="natural-rivers-casing"
          type="line"
          filter={['==', ['get', 'category'], 'rivers']}
          layout={lineVis(activeLayers.has('rivers'))}
          paint={{
            'line-color': '#ffffff',
            'line-width': ['interpolate', ['linear'], ['zoom'], 1, 1.6, 3, 2.2, 6, 3.2],
            'line-opacity': ['interpolate', ['linear'], ['zoom'], 1, 0.28, 3, 0.34, 6, 0.4],
          }}
        />
        <Layer
          id="natural-rivers"
          type="line"
          filter={['==', ['get', 'category'], 'rivers']}
          layout={lineVis(activeLayers.has('rivers'))}
          paint={{
            'line-color': COLORS.rivers,
            'line-width': ['interpolate', ['linear'], ['zoom'], 1, 0.8, 3, 1.4, 6, 2.6],
            'line-opacity': ['interpolate', ['linear'], ['zoom'], 1, 0.62, 3, 0.75, 6, 0.88],
          }}
        />
        {/* Mountain ranges — wider with a subtle casing */}
        <Layer
          id="natural-mountains-casing"
          type="line"
          filter={['==', ['get', 'category'], 'mountains']}
          layout={lineVis(activeLayers.has('mountains'))}
          paint={{
            'line-color': '#fff',
            'line-width': ['interpolate', ['linear'], ['zoom'], 1, 2.6, 3, 3.8, 6, 5.4],
            'line-opacity': ['interpolate', ['linear'], ['zoom'], 1, 0.22, 3, 0.32, 6, 0.42],
          }}
        />
        <Layer
          id="natural-mountains"
          type="line"
          filter={['==', ['get', 'category'], 'mountains']}
          layout={lineVis(activeLayers.has('mountains'))}
          paint={{
            'line-color': COLORS.mountains,
            'line-width': ['interpolate', ['linear'], ['zoom'], 1, 1.2, 3, 1.9, 6, 2.8],
            'line-opacity': ['interpolate', ['linear'], ['zoom'], 1, 0.6, 3, 0.75, 6, 0.86],
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
            'fill-opacity': ['interpolate', ['linear'], ['zoom'], 1, 0.1, 3, 0.15, 6, 0.2],
          }}
        />
        <Layer
          id="natural-deserts-outline"
          type="line"
          layout={lineVis(activeLayers.has('deserts'))}
          paint={{
            'line-color': COLORS.deserts,
            'line-width': ['interpolate', ['linear'], ['zoom'], 1, 0.6, 3, 1, 6, 1.4],
            'line-opacity': ['interpolate', ['linear'], ['zoom'], 1, 0.28, 3, 0.4, 6, 0.52],
            'line-dasharray': [3, 4],
          }}
        />
      </Source>
    </>
  );
}

export const ALL_NATURAL_LAYER_IDS: string[] = [
  'natural-rivers-casing',
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
