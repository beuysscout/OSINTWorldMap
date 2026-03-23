import { useMemo } from 'react';
import { Source, Layer } from 'react-map-gl/mapbox';
import type { LayerProps } from 'react-map-gl/mapbox';
import type { FeatureCollection, LineString, Point } from 'geojson';
import {
  shippingLanes,
  energyCorridors,
  briRoutes,
  chokepoints,
  commodityFlows,
  majorPorts,
  pipelines,
  submarineCables,
  LAYER_DEFS,
} from '../../data/tradeLanes';
import type { TradeLaneCategory } from '../../data/tradeLanes';

export const TRADE_LINE_LAYER_IDS = [
  'trade-lines-shipping',
  'trade-lines-energy',
  'trade-lines-bri',
  'trade-lines-commodity',
  'trade-lines-pipelines',
  'trade-lines-cables',
] as const;

export const TRADE_POINT_LAYER_IDS = [
  'trade-points-ports',
  'trade-points-chokepoints',
] as const;

export const ALL_TRADE_LAYER_IDS: string[] = [
  ...TRADE_LINE_LAYER_IDS,
  ...TRADE_POINT_LAYER_IDS,
];

interface TradeLanesLayerProps {
  activeLayers: Set<TradeLaneCategory>;
}

const COLORS = Object.fromEntries(
  LAYER_DEFS.map((d) => [d.id, d.color]),
) as Record<TradeLaneCategory, string>;

// Leaflet uses [lat, lng]; GeoJSON/Mapbox uses [lng, lat]
function toGeoCoord(coord: [number, number]): [number, number] {
  return [coord[1], coord[0]];
}

export default function TradeLanesLayer({ activeLayers }: TradeLanesLayerProps) {
  const linesGeoJSON = useMemo<FeatureCollection<LineString>>(() => ({
    type: 'FeatureCollection',
    features: [
      ...shippingLanes.map((l) => ({
        type: 'Feature' as const,
        id: l.id,
        geometry: {
          type: 'LineString' as const,
          coordinates: l.coordinates.map(toGeoCoord),
        },
        properties: { category: l.category, name: l.name, description: l.description ?? null },
      })),
      ...energyCorridors.map((l) => ({
        type: 'Feature' as const,
        id: l.id,
        geometry: {
          type: 'LineString' as const,
          coordinates: l.coordinates.map(toGeoCoord),
        },
        properties: { category: l.category, name: l.name, description: l.description ?? null },
      })),
      ...briRoutes.map((l) => ({
        type: 'Feature' as const,
        id: l.id,
        geometry: {
          type: 'LineString' as const,
          coordinates: l.coordinates.map(toGeoCoord),
        },
        properties: { category: l.category, name: l.name, description: l.description ?? null },
      })),
      ...commodityFlows.map((l) => ({
        type: 'Feature' as const,
        id: l.id,
        geometry: {
          type: 'LineString' as const,
          coordinates: l.coordinates.map(toGeoCoord),
        },
        properties: { category: l.category, name: l.name, description: l.description ?? null },
      })),
      ...pipelines.map((l) => ({
        type: 'Feature' as const,
        id: l.id,
        geometry: {
          type: 'LineString' as const,
          coordinates: l.coordinates.map(toGeoCoord),
        },
        properties: { category: l.category, name: l.name, description: l.description ?? null },
      })),
      ...submarineCables.map((l) => ({
        type: 'Feature' as const,
        id: l.id,
        geometry: {
          type: 'LineString' as const,
          coordinates: l.coordinates.map(toGeoCoord),
        },
        properties: { category: l.category, name: l.name, description: l.description ?? null },
      })),
    ],
  }), []);

  const pointsGeoJSON = useMemo<FeatureCollection<Point>>(() => ({
    type: 'FeatureCollection',
    features: [
      ...majorPorts.map((p) => ({
        type: 'Feature' as const,
        id: p.id,
        geometry: {
          type: 'Point' as const,
          coordinates: toGeoCoord(p.coordinates),
        },
        properties: {
          category: 'ports' as const,
          name: p.name,
          country: p.country,
          teuCapacity: p.teuCapacity,
          rank: p.rank,
          description: p.description ?? null,
          color: COLORS.ports,
        },
      })),
      ...chokepoints.map((cp) => ({
        type: 'Feature' as const,
        id: cp.id,
        geometry: {
          type: 'Point' as const,
          coordinates: toGeoCoord(cp.coordinates),
        },
        properties: {
          category: 'chokepoints' as const,
          name: cp.name,
          description: cp.description,
          throughput: cp.throughput,
          color: COLORS.chokepoints,
        },
      })),
    ],
  }), []);

  function vis(cat: TradeLaneCategory): LayerProps['layout'] {
    return { visibility: activeLayers.has(cat) ? 'visible' : 'none' };
  }

  return (
    <>
      <Source id="trade-lines" type="geojson" data={linesGeoJSON}>
        <Layer
          id="trade-lines-shipping"
          type="line"
          filter={['==', ['get', 'category'], 'shipping']}
          layout={vis('shipping')}
          paint={{ 'line-color': COLORS.shipping, 'line-width': 1.5, 'line-opacity': 0.65 }}
        />
        <Layer
          id="trade-lines-energy"
          type="line"
          filter={['==', ['get', 'category'], 'energy']}
          layout={vis('energy')}
          paint={{ 'line-color': COLORS.energy, 'line-width': 1.5, 'line-opacity': 0.65 }}
        />
        <Layer
          id="trade-lines-bri"
          type="line"
          filter={['==', ['get', 'category'], 'bri']}
          layout={vis('bri')}
          paint={{ 'line-color': COLORS.bri, 'line-width': 1.5, 'line-opacity': 0.65, 'line-dasharray': [6, 4] }}
        />
        <Layer
          id="trade-lines-commodity"
          type="line"
          filter={['==', ['get', 'category'], 'commodity']}
          layout={vis('commodity')}
          paint={{ 'line-color': COLORS.commodity, 'line-width': 1.5, 'line-opacity': 0.65, 'line-dasharray': [8, 5] }}
        />
        <Layer
          id="trade-lines-pipelines"
          type="line"
          filter={['==', ['get', 'category'], 'pipelines']}
          layout={vis('pipelines')}
          paint={{ 'line-color': COLORS.pipelines, 'line-width': 1.5, 'line-opacity': 0.65, 'line-dasharray': [4, 3] }}
        />
        <Layer
          id="trade-lines-cables"
          type="line"
          filter={['==', ['get', 'category'], 'cables']}
          layout={vis('cables')}
          paint={{ 'line-color': COLORS.cables, 'line-width': 1, 'line-opacity': 0.55, 'line-dasharray': [2, 5] }}
        />
      </Source>

      <Source id="trade-points" type="geojson" data={pointsGeoJSON}>
        <Layer
          id="trade-points-ports"
          type="circle"
          filter={['==', ['get', 'category'], 'ports']}
          layout={vis('ports')}
          paint={{
            'circle-color': COLORS.ports,
            'circle-opacity': 0.75,
            'circle-stroke-color': COLORS.ports,
            'circle-stroke-width': 1.5,
            'circle-stroke-opacity': 1,
            'circle-radius': [
              'interpolate', ['linear'],
              ['get', 'teuCapacity'],
              0, 4,
              47.3, 11,
            ],
          }}
        />
        <Layer
          id="trade-points-chokepoints"
          type="circle"
          filter={['==', ['get', 'category'], 'chokepoints']}
          layout={vis('chokepoints')}
          paint={{
            'circle-color': COLORS.chokepoints,
            'circle-opacity': 0.9,
            'circle-stroke-color': COLORS.chokepoints,
            'circle-stroke-width': 1.5,
            'circle-stroke-opacity': 1,
            'circle-radius': 6,
          }}
        />
      </Source>
    </>
  );
}
