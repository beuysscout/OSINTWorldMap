import Map, {
  Source,
  Layer,
  NavigationControl,
  type MapRef,
  type MapMouseEvent,
} from 'react-map-gl/mapbox';
import { useMemo, useCallback, useState, useRef, useEffect, type ReactNode } from 'react';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { FeatureCollection, Geometry, Position } from 'geojson';
import topology from 'world-atlas/countries-110m.json';
import { supportedCountryCodes, getCountryByNumericCode } from '../../data/countries';
import TradeLanesLayer, { ALL_TRADE_LAYER_IDS } from './TradeLanesLayer';
import GeoLabels from './GeoLabels';
import LayerControl from '../UI/LayerControl';
import type { TradeLaneCategory } from '../../data/tradeLanes';

interface WorldMapProps {
  selectedCountry: string | null;
  onCountrySelect: (numericCode: string | null) => void;
}

// ── Antimeridian fix ──────────────────────────────────────────────────────
// Mapbox GL handles coordinates outside ±180° correctly. Normalize each ring
// so consecutive longitude jumps never exceed 180°, keeping the ring
// continuous rather than splitting it into disconnected fragments.

function normalizeRingLongitudes(ring: Position[]): Position[] {
  if (ring.length === 0) return ring;
  const result: Position[] = [ring[0]];
  for (let i = 1; i < ring.length; i++) {
    let lng = ring[i][0];
    const diff = lng - result[i - 1][0];
    if (diff > 180) lng -= 360;
    else if (diff < -180) lng += 360;
    result.push(ring[i].length > 2 ? [lng, ring[i][1], ...ring[i].slice(2)] : [lng, ring[i][1]]);
  }
  return result;
}

function fixAntimeridian(geom: Geometry): Geometry {
  if (geom.type === 'Polygon') {
    return { ...geom, coordinates: geom.coordinates.map(normalizeRingLongitudes) };
  }
  if (geom.type === 'MultiPolygon') {
    return { ...geom, coordinates: geom.coordinates.map((poly) => poly.map(normalizeRingLongitudes)) };
  }
  return geom;
}

// ── Tooltip builder ───────────────────────────────────────────────────────

function buildTradeTooltip(
  props: Record<string, unknown>,
  layerId: string,
): ReactNode {
  if (layerId === 'trade-points-ports') {
    return (
      <>
        <strong>#{props.rank as number} {props.name as string}</strong>
        <div className="tooltip-stat" style={{ color: props.color as string }}>
          {props.teuCapacity as number}M TEU / year · {props.country as string}
        </div>
        {props.description && (
          <div className="tooltip-desc">{props.description as string}</div>
        )}
      </>
    );
  }
  if (layerId === 'trade-points-chokepoints') {
    return (
      <>
        <strong>{props.name as string}</strong>
        <div className="tooltip-desc">{props.description as string}</div>
        <div className="tooltip-stat" style={{ color: '#ef5350' }}>
          {props.throughput as string}
        </div>
      </>
    );
  }
  // Line features
  return (
    <>
      <strong>{props.name as string}</strong>
      {props.description && (
        <div className="tooltip-desc">{props.description as string}</div>
      )}
    </>
  );
}

// ── Component ─────────────────────────────────────────────────────────────

export default function WorldMap({ selectedCountry, onCountrySelect }: WorldMapProps) {
  const mapRef = useRef<MapRef>(null);
  const hoveredIdRef = useRef<number | null>(null);
  const prevSelectedRef = useRef<number | null>(null);

  const [activeLayers, setActiveLayers] = useState<Set<TradeLaneCategory>>(new Set());
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: ReactNode } | null>(null);

  const handleLayerToggle = useCallback((id: TradeLaneCategory) => {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  // Country GeoJSON with numeric IDs and enriched properties for Mapbox expressions
  const geoData = useMemo<FeatureCollection<Geometry>>(() => {
    const topo = topology as unknown as Topology;
    const raw = feature(topo, topo.objects.countries) as FeatureCollection<Geometry>;
    return {
      ...raw,
      features: raw.features.map((f) => {
        const idStr = String(f.id ?? '');
        const country = getCountryByNumericCode(idStr);
        const name = country?.name ?? (f.properties as { name?: string })?.name ?? 'Unknown';
        const isSupported = supportedCountryCodes.has(idStr);
        return {
          ...f,
          id: Number(f.id),
          geometry: f.geometry ? fixAntimeridian(f.geometry) : f.geometry,
          properties: {
            ...f.properties,
            supported: isSupported,
            displayName: isSupported ? name : `${name} (coming soon)`,
          },
        };
      }),
    };
  }, []);

  // Sync Mapbox feature state when selectedCountry prop changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (prevSelectedRef.current !== null) {
      map.setFeatureState(
        { source: 'countries', id: prevSelectedRef.current },
        { selected: false },
      );
    }

    const newId = selectedCountry !== null ? Number(selectedCountry) : null;
    if (newId !== null) {
      map.setFeatureState(
        { source: 'countries', id: newId },
        { selected: true },
      );
    }
    prevSelectedRef.current = newId;
  }, [selectedCountry]);

  const onMouseMove = useCallback(
    (e: MapMouseEvent) => {
      const map = mapRef.current;
      if (!map) return;

      const features = e.features ?? [];
      const countryFeat = features.find((f) => f.layer?.id === 'countries-fill');
      const tradeFeat = features.find((f) => f.layer?.id && ALL_TRADE_LAYER_IDS.includes(f.layer.id));

      // Update country hover feature state
      const newHoverId = countryFeat ? Number(countryFeat.id) : null;
      if (hoveredIdRef.current !== newHoverId) {
        if (hoveredIdRef.current !== null) {
          map.setFeatureState(
            { source: 'countries', id: hoveredIdRef.current },
            { hovered: false },
          );
        }
        if (newHoverId !== null) {
          map.setFeatureState(
            { source: 'countries', id: newHoverId },
            { hovered: true },
          );
        }
        hoveredIdRef.current = newHoverId;
      }

      // Cursor
      const canvas = map.getCanvas();
      if (countryFeat && countryFeat.properties?.supported) {
        canvas.style.cursor = 'pointer';
      } else if (tradeFeat) {
        canvas.style.cursor = 'default';
      } else {
        canvas.style.cursor = '';
      }

      // Tooltip
      if (countryFeat) {
        setTooltip({
          x: e.point.x,
          y: e.point.y,
          content: <span>{countryFeat.properties?.displayName}</span>,
        });
      } else if (tradeFeat) {
        setTooltip({
          x: e.point.x,
          y: e.point.y,
          content: buildTradeTooltip(
            tradeFeat.properties as Record<string, unknown>,
            tradeFeat.layer?.id ?? '',
          ),
        });
      } else {
        setTooltip(null);
      }
    },
    [],
  );

  const onMouseLeave = useCallback(() => {
    const map = mapRef.current;
    if (hoveredIdRef.current !== null && map) {
      map.setFeatureState(
        { source: 'countries', id: hoveredIdRef.current },
        { hovered: false },
      );
      hoveredIdRef.current = null;
    }
    setTooltip(null);
    if (map) map.getCanvas().style.cursor = '';
  }, []);

  const onClick = useCallback(
    (e: MapMouseEvent) => {
      const features = e.features ?? [];
      const countryFeat = features.find((f) => f.layer?.id === 'countries-fill');
      if (countryFeat && countryFeat.properties?.supported) {
        const id = String(countryFeat.id);
        onCountrySelect(id === selectedCountry ? null : id);
      }
    },
    [selectedCountry, onCountrySelect],
  );

  const interactiveLayerIds = useMemo(
    () => ['countries-fill', ...ALL_TRADE_LAYER_IDS],
    [],
  );

  return (
    <div className="map-wrapper">
      <Map
        ref={mapRef}
        initialViewState={{ latitude: 20, longitude: 0, zoom: 2.5 }}
        minZoom={2}
        maxZoom={7}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        maxBounds={[[-180, -85], [180, 85]]}
        style={{ width: '100%', height: '100%' }}
        interactiveLayerIds={interactiveLayerIds}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseLeave}
        onClick={onClick}
      >
        {/* Country polygons */}
        <Source id="countries" type="geojson" data={geoData} generateId={false}>
          <Layer
            id="countries-fill"
            type="fill"
            paint={{
              'fill-color': '#c8dff0',
              'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'selected'], false], 0,
                ['boolean', ['feature-state', 'hovered'], false], 0.22,
                ['==', ['get', 'supported'], true], 0.07,
                0,
              ],
            }}
          />
          <Layer
            id="countries-line"
            type="line"
            paint={{
              'line-color': [
                'case',
                ['boolean', ['feature-state', 'selected'], false], 'rgba(60,60,60,0.9)',
                ['boolean', ['feature-state', 'hovered'], false], 'rgba(60,60,60,0.45)',
                ['==', ['get', 'supported'], true], 'rgba(0,0,0,0.18)',
                'rgba(0,0,0,0.08)',
              ],
              'line-width': [
                'case',
                ['boolean', ['feature-state', 'selected'], false], 2,
                ['boolean', ['feature-state', 'hovered'], false], 1.2,
                0.5,
              ],
            }}
          />
        </Source>

        <TradeLanesLayer activeLayers={activeLayers} />
        <GeoLabels />

        <NavigationControl position="bottom-right" />
      </Map>

      {/* Floating tooltip */}
      {tooltip && (
        <div
          className="map-tooltip"
          style={{ left: tooltip.x + 14, top: tooltip.y - 14 }}
        >
          {tooltip.content}
        </div>
      )}

      <LayerControl activeLayers={activeLayers} onToggle={handleLayerToggle} />
    </div>
  );
}
