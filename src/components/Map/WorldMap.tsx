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
import GraticuleLayer from './GraticuleLayer';
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
import {
  MINERAL_LABELS, MINERAL_COLORS,
  WATER_STRESS_DATA, WATER_STRESS_COLORS, WATER_STRESS_LABELS,
  FOOD_DEPENDENCY_DATA, FOOD_DEPENDENCY_COLORS, FOOD_DEPENDENCY_LABELS,
  CLIMATE_RISK_DATA, CLIMATE_RISK_COLORS, CLIMATE_RISK_LABELS,
} from '../../data/resourcesClimate';
import PowerAlliancesLayer from './PowerAlliancesLayer';
import type { PowerAllianceCategory } from '../../data/powerAlliances';
import type { LayerPreset } from '../../data/storyPresets';

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
// Include every worldview variant emitted by the tileset so no countries are
// dropped from rendering/interactivity due to an incomplete worldview list.
const WORLDVIEW_FILTER = ['has', 'worldview'];
const BORDER_WORLDVIEW_FILTER = ['has', 'worldview'];

const COUNTRY_INTERACTIVE_LAYER_IDS = ['countries-fill', 'countries-sim-fill', 'countries-line'] as const;

function resolveCountryFeature(
  features: MapMouseEvent['features'],
): NonNullable<MapMouseEvent['features']>[number] | undefined {
  if (!features?.length) return undefined;
  // Prefer polygon fills for accurate country interior hit-testing.
  const fill = features.find((f) => f.layer?.id === 'countries-fill');
  if (fill) return fill;
  const simFill = features.find((f) => f.layer?.id === 'countries-sim-fill');
  if (simFill) return simFill;
  return features.find((f) => f.layer?.id === 'countries-line');
}

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
  // Tracks current viewport so it can be restored when the Map remounts on projection switch
  const viewStateRef = useRef({ latitude: 20, longitude: 0, zoom: 2.5, bearing: 0, pitch: 0 });
  // Refs so mouse callbacks always see current values without re-creating
  const selectedCountryRef = useRef(selectedCountry);
  const onCompareSelectRef = useRef(onCompareSelect);
  const simulationRolesRef = useRef(simulationRoles);
  selectedCountryRef.current = selectedCountry;
  onCompareSelectRef.current = onCompareSelect;
  simulationRolesRef.current = simulationRoles;

  const [isGlobe, setIsGlobe] = useState(true);
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [layerPanelOpen, setLayerPanelOpen] = useState(false);
  const [activeLayers, setActiveLayers] = useState<Set<TradeLaneCategory>>(new Set());
  const [activeNaturalLayers, setActiveNaturalLayers] = useState<Set<NaturalFeatureCategory>>(new Set());
  const [activeMilitaryLayers, setActiveMilitaryLayers] = useState<Set<MilitaryFeatureCategory>>(new Set());
  const [activeResourcesLayers, setActiveResourcesLayers] = useState<Set<ResourcesClimateCategory>>(new Set());
  const activeResourcesLayersRef = useRef(activeResourcesLayers);
  activeResourcesLayersRef.current = activeResourcesLayers;
  const [activePowerAllianceLayers, setActivePowerAllianceLayers] = useState<Set<PowerAllianceCategory>>(new Set());
  const [activePresetId, setActivePresetId] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: ReactNode } | null>(null);

  const handleLayerToggle = useCallback((id: TradeLaneCategory) => {
    setActivePresetId(null);
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const handleNaturalLayerToggle = useCallback((id: NaturalFeatureCategory) => {
    setActivePresetId(null);
    setActiveNaturalLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const handleMilitaryLayerToggle = useCallback((id: MilitaryFeatureCategory) => {
    setActivePresetId(null);
    setActiveMilitaryLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const handleResourcesLayerToggle = useCallback((id: ResourcesClimateCategory) => {
    setActivePresetId(null);
    setActiveResourcesLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const handlePowerAllianceToggle = useCallback((id: PowerAllianceCategory) => {
    setActivePresetId(null);
    setActivePowerAllianceLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const handleApplyPreset = useCallback((preset: LayerPreset) => {
    if (activePresetId === preset.id) {
      // Toggle off: clear all layers
      setActivePresetId(null);
      setActiveLayers(new Set());
      setActiveNaturalLayers(new Set());
      setActiveMilitaryLayers(new Set());
      setActiveResourcesLayers(new Set());
      setActivePowerAllianceLayers(new Set());
    } else {
      setActivePresetId(preset.id);
      setActiveLayers(new Set(preset.trade));
      setActiveNaturalLayers(new Set(preset.natural));
      setActiveMilitaryLayers(new Set(preset.military));
      setActiveResourcesLayers(new Set(preset.resources));
      setActivePowerAllianceLayers(new Set(preset.alliances));
    }
  }, [activePresetId]);

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
      const countryFeat = resolveCountryFeature(features);
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
        const rcLayers = activeResourcesLayersRef.current;
        const waterLevel = rcLayers.has('waterStress') ? (WATER_STRESS_DATA[alpha3] ?? null) : null;
        const foodLevel = rcLayers.has('foodImport') ? (FOOD_DEPENDENCY_DATA[alpha3] ?? null) : null;
        const climateLevel = rcLayers.has('climateDisplacement') ? (CLIMATE_RISK_DATA[alpha3] ?? null) : null;
        const hasResourceData = waterLevel || foodLevel || climateLevel;
        setTooltip({
          x: e.point.x,
          y: e.point.y,
          content: (
            <>
              <strong>{name}</strong>
              {hasResourceData && (
                <>
                  <hr className="tooltip-divider" />
                  {waterLevel && (
                    <div className="tooltip-row">
                      <span className="tooltip-row-label">Water</span>
                      <span className="tooltip-row-value" style={{ color: WATER_STRESS_COLORS[waterLevel] }}>
                        {WATER_STRESS_LABELS[waterLevel]}
                      </span>
                    </div>
                  )}
                  {foodLevel && (
                    <div className="tooltip-row">
                      <span className="tooltip-row-label">Wheat</span>
                      <span className="tooltip-row-value" style={{ color: FOOD_DEPENDENCY_COLORS[foodLevel] }}>
                        {FOOD_DEPENDENCY_LABELS[foodLevel]}
                      </span>
                    </div>
                  )}
                  {climateLevel && (
                    <div className="tooltip-row">
                      <span className="tooltip-row-label">Climate</span>
                      <span className="tooltip-row-value" style={{ color: CLIMATE_RISK_COLORS[climateLevel] }}>
                        {CLIMATE_RISK_LABELS[climateLevel]}
                      </span>
                    </div>
                  )}
                </>
              )}
              {showCompareHint && (
                <div className="tooltip-sub" style={{ color: 'rgba(204,85,0,0.9)', marginTop: hasResourceData ? 5 : 3 }}>↔ Click to compare</div>
              )}
            </>
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

  const onMove = useCallback((e: { viewState: { latitude: number; longitude: number; zoom: number; bearing: number; pitch: number } }) => {
    viewStateRef.current = e.viewState;
  }, []);

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
      const countryFeat = resolveCountryFeature(features);
      if (countryFeat) {
        const promoted = countryFeat.id;
        const alpha3 = (promoted != null && String(promoted) !== 'null' && String(promoted) !== 'undefined')
          ? String(promoted)
          : (countryFeat.properties as Record<string, unknown>)?.iso_3166_1_alpha_3 as string ?? '';
        if (alpha3) {
          const current = selectedCountryRef.current;
          if (!current) {
            onCountrySelect(alpha3);
            // Center map on the selected country
            const geom = countryFeat.geometry;
            if (geom && mapRef.current) {
              const coords: number[][] = geom.type === 'Polygon'
                ? (geom as GeoJSON.Polygon).coordinates.flat()
                : geom.type === 'MultiPolygon'
                  ? (geom as GeoJSON.MultiPolygon).coordinates.flat(2)
                  : [];
              if (coords.length) {
                const lngs = coords.map((c) => c[0]);
                const lats = coords.map((c) => c[1]);
                mapRef.current.fitBounds(
                  [[Math.min(...lngs), Math.min(...lats)], [Math.max(...lngs), Math.max(...lats)]],
                  { padding: 80, maxZoom: 6, duration: 800 },
                );
              }
            }
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
      ...COUNTRY_INTERACTIVE_LAYER_IDS,
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
        key={isGlobe ? 'globe' : 'flat'}
        ref={mapRef}
        initialViewState={viewStateRef.current}
        minZoom={isGlobe ? 0.5 : 2}
        maxZoom={7}
        mapStyle="mapbox://styles/mapbox/empty-v9"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        interactiveLayerIds={interactiveLayerIds}
        onLoad={() => {
          const map = mapRef.current?.getMap();
          if (!map) return;
          map.setProjection({ name: isGlobe ? 'globe' : 'mercator' });
          map.setFog({
            'space-color': '#f0ece3',
            'star-intensity': 0,
            color: '#f0ece3',
            'high-color': '#f0ece3',
            'horizon-blend': 0,
          });
        }}
        onMove={onMove}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseLeave}
        onClick={onClick}
      >
        {/* Parchment background — paints ocean and any uncovered areas */}
        <Layer
          id="background"
          type="background"
          paint={{ 'background-color': '#f0ece3' }}
        />

        {/* Graticule grid — lat/lng lines at 30° intervals */}
        <GraticuleLayer />

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
              'fill-color': '#6b6b3a',
              'fill-opacity': historicalYear !== null ? 0 : [
                'case',
                ['boolean', ['feature-state', 'selected'], false], 0.001,
                ['boolean', ['feature-state', 'compared'], false], 0.001,
                ['boolean', ['feature-state', 'hovered'], false], 0.10,
                0.001,
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
            filter={BORDER_WORLDVIEW_FILTER}
            paint={{
              'line-color': [
                'case',
                ['boolean', ['feature-state', 'selected'], false], '#6b6b3a',
                ['boolean', ['feature-state', 'compared'], false], '#8b5e2a',
                ['boolean', ['feature-state', 'hovered'], false], '#6b6b3a',
                '#9c9080',
              ],
              'line-width': [
                'case',
                ['boolean', ['feature-state', 'selected'], false], 1.8,
                ['boolean', ['feature-state', 'compared'], false], 1.8,
                ['boolean', ['feature-state', 'hovered'], false], 1.0,
                0.5,
              ],
            }}
          />
        </Source>

        {/* Country labels from Mapbox Streets */}
        <Source id="mapbox-streets" type="vector" url="mapbox://mapbox.mapbox-streets-v8">
          <Layer
            id="country-labels"
            type="symbol"
            source-layer="place_label"
            filter={['==', ['get', 'type'], 'country']}
            layout={{
              'text-field': ['coalesce', ['get', 'name_en'], ['get', 'name']],
              'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Regular'],
              'text-size': ['interpolate', ['linear'], ['zoom'], 1, 8, 4, 11, 7, 13],
              'text-transform': 'uppercase',
              'text-letter-spacing': 0.08,
              'text-max-width': 6,
              'text-anchor': 'center',
            }}
            paint={{
              'text-color': '#6b6050',
              'text-opacity': 0.65,
              'text-halo-color': '#f0ece3',
              'text-halo-width': 1.2,
            }}
          />
        </Source>

        <PowerAlliancesLayer activeLayers={activePowerAllianceLayers} />
        <TradeLanesLayer activeLayers={activeLayers} />
        <NaturalFeaturesLayer activeLayers={activeNaturalLayers} />
        <MilitaryLayer activeLayers={activeMilitaryLayers} />
        <ResourcesClimateLayer activeLayers={activeResourcesLayers} />
        <GeoLabels />

        <NavigationControl position="bottom-right" />
      </Map>

      {/* Overlay — sits above Mapbox canvas; pointer-events: none so map stays interactive */}
      <div className="map-overlay">

      {/* Projection toggle — above zoom controls, bottom-right */}
      <button
        className="projection-toggle"
        onClick={() => {
          if (isGlobe && viewStateRef.current.zoom < 2) {
            viewStateRef.current = { ...viewStateRef.current, zoom: 2 };
          }
          setIsGlobe((v) => !v);
        }}
        title={isGlobe ? 'Switch to flat map' : 'Switch to globe'}
      >
        {isGlobe ? (
          // Flat map icon (grid/mercator)
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="18" rx="2" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <line x1="12" y1="3" x2="12" y2="21" />
          </svg>
        ) : (
          // Globe icon
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        )}
      </button>

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
          activePowerAllianceLayers={activePowerAllianceLayers}
          onPowerAllianceToggle={handlePowerAllianceToggle}
          activePresetId={activePresetId}
          onApplyPreset={handleApplyPreset}
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
            Visualise
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

      </div>{/* end .map-overlay */}
    </div>
  );
}
