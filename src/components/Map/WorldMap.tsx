import Map, {
  Source,
  Layer,
  NavigationControl,
  type MapRef,
  type MapMouseEvent,
} from 'react-map-gl/mapbox';
import { useMemo, useCallback, useState, useRef, useEffect, type ReactNode } from 'react';
import { supportedAlpha3Codes } from '../../data/countries';
import TradeLanesLayer, { ALL_TRADE_LAYER_IDS } from './TradeLanesLayer';
import NaturalFeaturesLayer, { NATURAL_INTERACTIVE_LAYER_IDS } from './NaturalFeaturesLayer';
import MilitaryLayer, { MILITARY_INTERACTIVE_LAYER_IDS } from './MilitaryLayer';
import GeoLabels from './GeoLabels';
import LayerControl from '../UI/LayerControl';
import type { TradeLaneCategory } from '../../data/tradeLanes';
import type { NaturalFeatureCategory } from '../../data/naturalFeatures';
import type { MilitaryFeatureCategory } from '../../data/militaryFeatures';
import { NATION_LABELS } from '../../data/militaryFeatures';

interface WorldMapProps {
  selectedCountry: string | null; // alpha-3 ISO code
  onCountrySelect: (alpha3: string | null) => void;
  compareCountry?: string | null;
  onCompareSelect?: (alpha3: string | null) => void;
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
  return (
    <>
      <strong>{props.name as string}</strong>
      {props.description && (
        <div className="tooltip-desc">{props.description as string}</div>
      )}
    </>
  );
}

// ── Worldview filter — one geometry per country ───────────────────────────
// Undisputed countries have worldview 'all'; disputed areas have specific
// worldview values (US, CN, IN, …). Show 'all' + 'US' to get one geometry
// per country without duplicates.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WORLDVIEW_FILTER: any = ['match', ['get', 'worldview'], ['all', 'US'], true, false];

// ── Component ─────────────────────────────────────────────────────────────

export default function WorldMap({ selectedCountry, onCountrySelect, compareCountry, onCompareSelect }: WorldMapProps) {
  const mapRef = useRef<MapRef>(null);
  const hoveredIdRef = useRef<string | null>(null);
  const prevSelectedRef = useRef<string | null>(null);
  const prevComparedRef = useRef<string | null>(null);
  // Refs so mouse callbacks always see current values without re-creating
  const selectedCountryRef = useRef(selectedCountry);
  const onCompareSelectRef = useRef(onCompareSelect);
  selectedCountryRef.current = selectedCountry;
  onCompareSelectRef.current = onCompareSelect;

  const [activeLayers, setActiveLayers] = useState<Set<TradeLaneCategory>>(new Set());
  const [activeNaturalLayers, setActiveNaturalLayers] = useState<Set<NaturalFeatureCategory>>(new Set());
  const [activeMilitaryLayers, setActiveMilitaryLayers] = useState<Set<MilitaryFeatureCategory>>(new Set());
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: ReactNode } | null>(null);

  const handleLayerToggle = useCallback((id: TradeLaneCategory) => {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const handleNaturalLayerToggle = useCallback((id: NaturalFeatureCategory) => {
    setActiveNaturalLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const handleMilitaryLayerToggle = useCallback((id: MilitaryFeatureCategory) => {
    setActiveMilitaryLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  // Sync Mapbox feature state when selectedCountry prop changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (prevSelectedRef.current !== null) {
      map.setFeatureState(
        { source: 'countries', sourceLayer: 'country_boundaries', id: prevSelectedRef.current },
        { selected: false },
      );
    }

    if (selectedCountry !== null) {
      map.setFeatureState(
        { source: 'countries', sourceLayer: 'country_boundaries', id: selectedCountry },
        { selected: true },
      );
    }
    prevSelectedRef.current = selectedCountry;
  }, [selectedCountry]);

  // Sync compareCountry feature state
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (prevComparedRef.current !== null) {
      map.setFeatureState(
        { source: 'countries', sourceLayer: 'country_boundaries', id: prevComparedRef.current },
        { compared: false },
      );
    }

    if (compareCountry !== null && compareCountry !== undefined) {
      map.setFeatureState(
        { source: 'countries', sourceLayer: 'country_boundaries', id: compareCountry },
        { compared: true },
      );
    }
    prevComparedRef.current = compareCountry ?? null;
  }, [compareCountry]);

  const onMouseMove = useCallback(
    (e: MapMouseEvent) => {
      const map = mapRef.current;
      if (!map) return;

      const features = e.features ?? [];
      const countryFeat = features.find((f) => f.layer?.id === 'countries-fill');
      const tradeFeat = features.find((f) => f.layer?.id && ALL_TRADE_LAYER_IDS.includes(f.layer.id));
      const naturalFeat = features.find((f) => f.layer?.id && NATURAL_INTERACTIVE_LAYER_IDS.includes(f.layer.id));
      const militaryFeat = features.find((f) => f.layer?.id && MILITARY_INTERACTIVE_LAYER_IDS.includes(f.layer.id));

      // Update country hover feature state
      const newHoverId = countryFeat ? String(countryFeat.id) : null;
      if (hoveredIdRef.current !== newHoverId) {
        if (hoveredIdRef.current !== null) {
          map.setFeatureState(
            { source: 'countries', sourceLayer: 'country_boundaries', id: hoveredIdRef.current },
            { hovered: false },
          );
        }
        if (newHoverId !== null) {
          map.setFeatureState(
            { source: 'countries', sourceLayer: 'country_boundaries', id: newHoverId },
            { hovered: true },
          );
        }
        hoveredIdRef.current = newHoverId;
      }

      // Cursor
      const canvas = map.getCanvas();
      if (countryFeat && supportedAlpha3Codes.has(String(countryFeat.id))) {
        canvas.style.cursor = 'pointer';
      } else if (tradeFeat || naturalFeat || militaryFeat) {
        canvas.style.cursor = 'default';
      } else {
        canvas.style.cursor = '';
      }

      // Tooltip
      if (countryFeat) {
        const alpha3 = String(countryFeat.id);
        const name = (countryFeat.properties as { name_en?: string })?.name_en ?? alpha3;
        const isSupported = supportedAlpha3Codes.has(alpha3);
        const displayName = isSupported ? name : `${name} (coming soon)`;
        const currentSelected = selectedCountryRef.current;
        const showCompareHint = isSupported && currentSelected && alpha3 !== currentSelected;
        setTooltip({
          x: e.point.x,
          y: e.point.y,
          content: showCompareHint ? (
            <>
              <strong>{displayName}</strong>
              <div className="tooltip-sub" style={{ color: 'rgba(204,85,0,0.9)' }}>↔ Click to compare</div>
            </>
          ) : (
            <span>{displayName}</span>
          ),
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
      } else if (naturalFeat) {
        const props = naturalFeat.properties as { name?: string; description?: string };
        setTooltip({
          x: e.point.x,
          y: e.point.y,
          content: (
            <>
              <strong>{props.name}</strong>
              {props.description && (
                <div className="tooltip-desc">{props.description}</div>
              )}
            </>
          ),
        });
      } else if (militaryFeat) {
        const props = militaryFeat.properties as {
          name?: string;
          nation?: string;
          description?: string;
          facilityType?: string;
        };
        const nationLabel = props.nation ? NATION_LABELS[props.nation as keyof typeof NATION_LABELS] ?? props.nation : '';
        setTooltip({
          x: e.point.x,
          y: e.point.y,
          content: (
            <>
              <strong>{props.name}</strong>
              {props.facilityType && (
                <div className="tooltip-stat" style={{ color: '#ff9800' }}>{props.facilityType}</div>
              )}
              {nationLabel && (
                <div className="tooltip-stat">{nationLabel}</div>
              )}
              {props.description && (
                <div className="tooltip-desc">{props.description}</div>
              )}
            </>
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
        { source: 'countries', sourceLayer: 'country_boundaries', id: hoveredIdRef.current },
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
      if (countryFeat) {
        const alpha3 = String(countryFeat.id);
        if (supportedAlpha3Codes.has(alpha3)) {
          const current = selectedCountryRef.current;
          if (!current) {
            onCountrySelect(alpha3);
          } else if (alpha3 === current) {
            // Click primary again → deselect all
            onCountrySelect(null);
            onCompareSelectRef.current?.(null);
          } else {
            // Different country while one is selected → compare
            onCompareSelectRef.current?.(alpha3);
          }
        }
      }
    },
    [onCountrySelect],
  );

  const interactiveLayerIds = useMemo(
    () => ['countries-fill', ...ALL_TRADE_LAYER_IDS, ...NATURAL_INTERACTIVE_LAYER_IDS, ...MILITARY_INTERACTIVE_LAYER_IDS],
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
        {/* Country polygons from Mapbox vector tileset — exact border alignment */}
        <Source
          id="countries"
          type="vector"
          url="mapbox://mapbox.country-boundaries-v1"
          promoteId={{ country_boundaries: 'iso_3166_1_alpha_3' }}
        >
          <Layer
            id="countries-fill"
            type="fill"
            source-layer="country_boundaries"
            filter={WORLDVIEW_FILTER}
            paint={{
              'fill-color': '#c8dff0',
              'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'selected'], false], 0,
                ['boolean', ['feature-state', 'compared'], false], 0,
                ['boolean', ['feature-state', 'hovered'], false], 0.22,
                0.07,
              ],
            }}
          />
          <Layer
            id="countries-line"
            type="line"
            source-layer="country_boundaries"
            filter={WORLDVIEW_FILTER}
            paint={{
              'line-color': [
                'case',
                ['boolean', ['feature-state', 'selected'], false], 'rgba(30,30,30,0.9)',
                ['boolean', ['feature-state', 'compared'], false], 'rgba(204,85,0,0.85)',
                ['boolean', ['feature-state', 'hovered'], false], 'rgba(60,60,60,0.45)',
                'rgba(0,0,0,0.18)',
              ],
              'line-width': [
                'case',
                ['boolean', ['feature-state', 'selected'], false], 2,
                ['boolean', ['feature-state', 'compared'], false], 2,
                ['boolean', ['feature-state', 'hovered'], false], 1.2,
                0.5,
              ],
            }}
          />
        </Source>

        <TradeLanesLayer activeLayers={activeLayers} />
        <NaturalFeaturesLayer activeLayers={activeNaturalLayers} />
        <MilitaryLayer activeLayers={activeMilitaryLayers} />
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

      <LayerControl
        activeLayers={activeLayers}
        onToggle={handleLayerToggle}
        activeNaturalLayers={activeNaturalLayers}
        onNaturalToggle={handleNaturalLayerToggle}
        activeMilitaryLayers={activeMilitaryLayers}
        onMilitaryToggle={handleMilitaryLayerToggle}
      />
    </div>
  );
}
