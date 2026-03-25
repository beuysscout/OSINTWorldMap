import Map, {
  Source,
  Layer,
  NavigationControl,
  type MapRef,
  type MapMouseEvent,
} from 'react-map-gl/mapbox';
import { useMemo, useCallback, useState, useRef, useEffect, type ReactNode } from 'react';
import TradeLanesLayer, { ALL_TRADE_LAYER_IDS } from './TradeLanesLayer';
import NaturalFeaturesLayer, { NATURAL_INTERACTIVE_LAYER_IDS } from './NaturalFeaturesLayer';
import MilitaryLayer, { MILITARY_INTERACTIVE_LAYER_IDS } from './MilitaryLayer';
import ResourcesClimateLayer, { RESOURCE_INTERACTIVE_LAYER_IDS } from './ResourcesClimateLayer';
import GeoLabels from './GeoLabels';
import LayerControl from '../UI/LayerControl';
import HistoricalBordersLayer, { HISTORICAL_FILL_ID } from './HistoricalBordersLayer';
import TimeSlider from '../UI/TimeSlider';
import { HISTORICAL_SNAPSHOTS } from '../../data/historicalBorders';
import type { TradeLaneCategory } from '../../data/tradeLanes';
import type { NaturalFeatureCategory } from '../../data/naturalFeatures';
import type { MilitaryFeatureCategory } from '../../data/militaryFeatures';
import { NATION_LABELS } from '../../data/militaryFeatures';
import type { ActiveRole } from '../../data/allianceDrag';
import type { ResourcesClimateCategory } from '../../data/resourcesClimate';
import { MINERAL_LABELS, MINERAL_COLORS } from '../../data/resourcesClimate';

const ROLE_COLORS: Record<string, string> = {
  'aggressor':         '#dc2626',
  'target':            '#d97706',
  'defending':         '#1d4ed8',
  'defending-allied':  '#60a5fa',
  'aggressor-aligned': '#f97316',
  'contested':         '#7c3aed',
  'neutral':           '#94a3b8',
};

const ROLE_LABELS: Record<string, string> = {
  'aggressor':         'Aggressor',
  'target':            'Target',
  'defending':         'Defending',
  'defending-allied':  'Allied Support',
  'aggressor-aligned': 'Aligned w/ Aggressor',
  'contested':         'Contested',
  'neutral':           'Neutral',
};

interface WorldMapProps {
  selectedCountry: string | null; // alpha-3 ISO code
  onCountrySelect: (alpha3: string | null) => void;
  compareCountry?: string | null;
  onCompareSelect?: (alpha3: string | null) => void;
  simulationRoles?: Record<string, ActiveRole> | null;
  historicalYear?: number | null;
  onHistoricalYearChange?: (year: number | null) => void;
  onSimulate?: () => void;
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

// ── Worldview filter ──────────────────────────────────────────────────────
// Include both 'all' (undisputed borders) and 'US' (US-recognised borders for
// disputed territories). This is Mapbox's recommended pattern and ensures
// countries like Russia and China — whose polygons only exist under 'US', not
// 'all' — are included and interactive. Countries that appear in both worldviews
// share the same promoteId (iso_3166_1_alpha_3), so feature-state is applied to
// all matching features consistently and `find()` in event handlers returns one.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WORLDVIEW_FILTER: any = ['match', ['get', 'worldview'], ['all', 'US'], true, false];

// ── Component ─────────────────────────────────────────────────────────────

export default function WorldMap({ selectedCountry, onCountrySelect, compareCountry, onCompareSelect, simulationRoles, historicalYear = null, onHistoricalYearChange, onSimulate }: WorldMapProps) {
  const historicalSnapshot = useMemo(
    () => (historicalYear !== null ? HISTORICAL_SNAPSHOTS.find((s) => s.year === historicalYear) ?? null : null),
    [historicalYear],
  );
  const mapRef = useRef<MapRef>(null);
  const hoveredIdRef = useRef<string | null>(null);
  const prevSelectedRef = useRef<string | null>(null);
  const prevComparedRef = useRef<string | null>(null);
  const simActiveCodesRef = useRef<Set<string>>(new Set());
  // Refs so mouse callbacks always see current values without re-creating
  const selectedCountryRef = useRef(selectedCountry);
  const onCompareSelectRef = useRef(onCompareSelect);
  const simulationRolesRef = useRef(simulationRoles);
  selectedCountryRef.current = selectedCountry;
  onCompareSelectRef.current = onCompareSelect;
  simulationRolesRef.current = simulationRoles;

  const [timelineOpen, setTimelineOpen] = useState(false);
  const [layerPanelOpen, setLayerPanelOpen] = useState(false);
  const [activeLayers, setActiveLayers] = useState<Set<TradeLaneCategory>>(new Set());
  const [activeNaturalLayers, setActiveNaturalLayers] = useState<Set<NaturalFeatureCategory>>(new Set());
  const [activeMilitaryLayers, setActiveMilitaryLayers] = useState<Set<MilitaryFeatureCategory>>(new Set());
  const [activeResourcesLayers, setActiveResourcesLayers] = useState<Set<ResourcesClimateCategory>>(new Set());
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

  const handleResourcesLayerToggle = useCallback((id: ResourcesClimateCategory) => {
    setActiveResourcesLayers((prev) => {
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

  // Sync simulation feature states (conflictRole) when simulationRoles changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear previous simulation roles
    simActiveCodesRef.current.forEach((code) => {
      map.setFeatureState(
        { source: 'countries', sourceLayer: 'country_boundaries', id: code },
        { conflictRole: null },
      );
    });
    simActiveCodesRef.current = new Set();

    if (simulationRoles) {
      Object.entries(simulationRoles).forEach(([code, entry]) => {
        map.setFeatureState(
          { source: 'countries', sourceLayer: 'country_boundaries', id: code },
          { conflictRole: entry.role },
        );
        simActiveCodesRef.current.add(code);
      });
    }
  }, [simulationRoles]);

  const onMouseMove = useCallback(
    (e: MapMouseEvent) => {
      const map = mapRef.current;
      if (!map) return;

      const features = e.features ?? [];
      const countryFeat = features.find((f) => f.layer?.id === 'countries-fill');
      const tradeFeat = features.find((f) => f.layer?.id && ALL_TRADE_LAYER_IDS.includes(f.layer.id));
      const naturalFeat = features.find((f) => f.layer?.id && NATURAL_INTERACTIVE_LAYER_IDS.includes(f.layer.id));
      const militaryFeat = features.find((f) => f.layer?.id && MILITARY_INTERACTIVE_LAYER_IDS.includes(f.layer.id));
      const mineralFeat = features.find((f) => f.layer?.id && RESOURCE_INTERACTIVE_LAYER_IDS.includes(f.layer.id));
      const empireFeat = features.find((f) => f.layer?.id === HISTORICAL_FILL_ID);

      // Resolve the alpha-3 code — promoteId should set it, but fall back to
      // the raw property if the promoted ID is null/undefined.
      const resolveAlpha3 = (feat: (typeof features)[0]) => {
        const promoted = feat.id;
        if (promoted != null && String(promoted) !== 'null' && String(promoted) !== 'undefined') {
          return String(promoted);
        }
        return (feat.properties as Record<string, unknown>)?.iso_3166_1_alpha_3 as string | null ?? null;
      };

      // Update country hover feature state
      const newHoverId = countryFeat ? resolveAlpha3(countryFeat) : null;
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
      const simRoles = simulationRolesRef.current;
      const simRole = newHoverId && simRoles ? simRoles[newHoverId] : null;

      if (simRoles) {
        // Simulation mode: pointer only on countries with a role
        canvas.style.cursor = simRole ? 'pointer' : '';
      } else if (countryFeat && newHoverId) {
        canvas.style.cursor = 'pointer';
      } else if (empireFeat) {
        canvas.style.cursor = 'default';
      } else if (tradeFeat || naturalFeat || militaryFeat || mineralFeat) {
        canvas.style.cursor = 'default';
      } else {
        canvas.style.cursor = '';
      }

      // Tooltip — empire takes priority in historical mode
      if (empireFeat) {
        const props = empireFeat.properties as { name?: string; color?: string };
        setTooltip({
          x: e.point.x,
          y: e.point.y,
          content: (
            <strong style={{ color: props.color }}>{props.name}</strong>
          ),
        });
      } else if (mineralFeat) {
        const props = mineralFeat.properties as {
          name?: string;
          mineralType?: string;
          country?: string;
          description?: string;
          scale?: string;
        };
        const mineralLabel = props.mineralType
          ? (MINERAL_LABELS[props.mineralType as keyof typeof MINERAL_LABELS] ?? props.mineralType)
          : '';
        const mineralColor = props.mineralType
          ? (MINERAL_COLORS[props.mineralType as keyof typeof MINERAL_COLORS] ?? '#aaa')
          : '#aaa';
        setTooltip({
          x: e.point.x,
          y: e.point.y,
          content: (
            <>
              <strong>{props.name}</strong>
              {mineralLabel && (
                <div className="tooltip-stat" style={{ color: mineralColor }}>{mineralLabel}</div>
              )}
              {props.country && (
                <div className="tooltip-stat">{props.country}</div>
              )}
              {props.description && (
                <div className="tooltip-desc">{props.description}</div>
              )}
            </>
          ),
        });
      } else if (countryFeat && simRoles) {
        // Simulation mode tooltip
        const alpha3 = newHoverId ?? resolveAlpha3(countryFeat) ?? '';
        const name = (countryFeat.properties as { name_en?: string })?.name_en ?? alpha3;
        const entry = simRoles[alpha3];
        if (entry) {
          const color = ROLE_COLORS[entry.role] ?? '#888';
          const label = ROLE_LABELS[entry.role] ?? entry.role;
          setTooltip({
            x: e.point.x,
            y: e.point.y,
            content: (
              <>
                <strong>{name}</strong>
                <div className="tooltip-stat" style={{ color }}>{label}</div>
                <div className="tooltip-desc">{entry.rationale}</div>
              </>
            ),
          });
        } else {
          setTooltip(null);
        }
      } else if (countryFeat) {
        const alpha3 = newHoverId ?? resolveAlpha3(countryFeat) ?? '';
        const name = (countryFeat.properties as { name_en?: string })?.name_en ?? alpha3;
        const currentSelected = selectedCountryRef.current;
        const showCompareHint = currentSelected && alpha3 !== currentSelected;
        setTooltip({
          x: e.point.x,
          y: e.point.y,
          content: showCompareHint ? (
            <>
              <strong>{name}</strong>
              <div className="tooltip-sub" style={{ color: 'rgba(204,85,0,0.9)' }}>↔ Click to compare</div>
            </>
          ) : (
            <span>{name}</span>
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
      // Simulation or historical mode: no country panel interaction
      if (simulationRolesRef.current) return;
      if (historicalYear !== null) return;

      const features = e.features ?? [];
      const countryFeat = features.find((f) => f.layer?.id === 'countries-fill');
      if (countryFeat) {
        const promoted = countryFeat.id;
        const alpha3 = (promoted != null && String(promoted) !== 'null' && String(promoted) !== 'undefined')
          ? String(promoted)
          : (countryFeat.properties as Record<string, unknown>)?.iso_3166_1_alpha_3 as string ?? '';
        if (alpha3) {
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
    [onCountrySelect, historicalYear],
  );

  const interactiveLayerIds = useMemo(
    () => [
      'countries-fill',
      HISTORICAL_FILL_ID,
      ...ALL_TRADE_LAYER_IDS,
      ...NATURAL_INTERACTIVE_LAYER_IDS,
      ...MILITARY_INTERACTIVE_LAYER_IDS,
      ...RESOURCE_INTERACTIVE_LAYER_IDS,
    ],
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
        {/* Historical empire layer — rendered below country outlines */}
        {historicalSnapshot && <HistoricalBordersLayer snapshot={historicalSnapshot} />}

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
              'fill-opacity': historicalYear !== null ? 0 : [
                'case',
                ['boolean', ['feature-state', 'selected'], false], 0,
                ['boolean', ['feature-state', 'compared'], false], 0,
                ['boolean', ['feature-state', 'hovered'], false], 0.22,
                0.07,
              ],
            }}
          />
          {/* Simulation fill — colored by conflictRole feature state; transparent when not in simulation */}
          <Layer
            id="countries-sim-fill"
            type="fill"
            source-layer="country_boundaries"
            filter={WORLDVIEW_FILTER}
            paint={{
              'fill-color': [
                'case',
                ['==', ['feature-state', 'conflictRole'], 'aggressor'],         '#dc2626',
                ['==', ['feature-state', 'conflictRole'], 'target'],            '#d97706',
                ['==', ['feature-state', 'conflictRole'], 'defending'],         '#1d4ed8',
                ['==', ['feature-state', 'conflictRole'], 'defending-allied'],  '#60a5fa',
                ['==', ['feature-state', 'conflictRole'], 'aggressor-aligned'], '#f97316',
                ['==', ['feature-state', 'conflictRole'], 'contested'],         '#7c3aed',
                ['==', ['feature-state', 'conflictRole'], 'neutral'],           '#94a3b8',
                'rgba(0,0,0,0)',
              ],
              'fill-opacity': 0.55,
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
        <ResourcesClimateLayer activeLayers={activeResourcesLayers} />
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

      {/* Layer panel — floats above the chips bar */}
      {layerPanelOpen && (
        <LayerControl
          activeLayers={activeLayers}
          onToggle={handleLayerToggle}
          activeNaturalLayers={activeNaturalLayers}
          onNaturalToggle={handleNaturalLayerToggle}
          activeMilitaryLayers={activeMilitaryLayers}
          onMilitaryToggle={handleMilitaryLayerToggle}
          activeResourcesLayers={activeResourcesLayers}
          onResourcesToggle={handleResourcesLayerToggle}
        />
      )}

      {/* Timeline panel */}
      {timelineOpen && (
        <TimeSlider
          selectedYear={historicalYear}
          onChange={onHistoricalYearChange ?? (() => {})}
          onClose={() => setTimelineOpen(false)}
        />
      )}

      {/* Unified chips bar — bottom-left */}
      {!timelineOpen && (
        <div className="map-chips-bar">
          <button
            className={`map-chip${layerPanelOpen ? ' active' : ''}`}
            onClick={() => setLayerPanelOpen((v) => !v)}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            Data Layers
          </button>

          {!simulationRoles && (
            <button className="map-chip" onClick={onSimulate}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              Simulate
            </button>
          )}

          <button
            className={`map-chip${historicalYear !== null ? ' active' : ''}`}
            onClick={() => setTimelineOpen(true)}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Timeline
            {historicalYear !== null && (() => {
              const snap = HISTORICAL_SNAPSHOTS.find((s) => s.year === historicalYear);
              return snap ? <span className="map-chip-badge">{snap.label}</span> : null;
            })()}
          </button>
        </div>
      )}
    </div>
  );
}
