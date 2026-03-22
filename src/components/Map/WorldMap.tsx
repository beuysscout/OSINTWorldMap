import { MapContainer, TileLayer, GeoJSON, ZoomControl } from 'react-leaflet';
import { useMemo, useCallback, useState } from 'react';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { FeatureCollection, Geometry, Position } from 'geojson';
import type { Layer, PathOptions } from 'leaflet';
import topology from 'world-atlas/countries-110m.json';
import { supportedCountryCodes, getCountryByNumericCode } from '../../data/countries';
import TradeLanesLayer from './TradeLanesLayer';
import GeoLabels from './GeoLabels';
import LayerControl from '../UI/LayerControl';
import type { TradeLaneCategory } from '../../data/tradeLanes';

interface WorldMapProps {
  selectedCountry: string | null;
  onCountrySelect: (numericCode: string | null) => void;
}

const REGION_COLORS: Record<string, string> = {
  Americas: '#5ab4e8',
  Europe: '#6cb86c',
  Asia: '#e8a854',
  Africa: '#e87070',
  Oceania: '#c084d4',
  'Middle East': '#56c7d0',
};

function getRegionColor(numericCode: string): string {
  const country = getCountryByNumericCode(numericCode);
  if (!country) return '#455a64';
  return REGION_COLORS[country.region] || '#78909c';
}

// ── Antimeridian fix ──────────────────────────────────────────────────────
// world-atlas pre-splits Russia at the antimeridian, leaving "seam edges"
// where consecutive vertices jump ~358° in longitude (e.g. 178.6° → -180°).
// Leaflet renders each seam edge as a line spanning the full map width,
// producing the horizontal green band. Fix: split every ring at seam edges
// and close each resulting segment as its own valid polygon ring.

function splitRingAtSeams(ring: Position[]): Position[][] {
  const n = ring.length - 1; // unique vertex count (ring is closed: last === first)
  if (n < 3) return [ring];

  let hasSeam = false;
  for (let i = 0; i < n; i++) {
    if (Math.abs(ring[(i + 1) % n][0] - ring[i][0]) > 180) { hasSeam = true; break; }
  }
  if (!hasSeam) return [ring];

  const results: Position[][] = [];
  let current: Position[] = [];

  for (let i = 0; i < n; i++) {
    current.push(ring[i]);
    const nextLng = ring[(i + 1) % n][0];
    if (Math.abs(nextLng - ring[i][0]) > 180) {
      // Seam edge — close the current segment as its own polygon
      if (current.length >= 3) results.push([...current, current[0]]);
      current = [];
    }
  }
  if (current.length >= 3) results.push([...current, current[0]]);

  return results.length > 0 ? results : [ring];
}

function fixAntimeridian(geom: Geometry): Geometry {
  if (geom.type === 'Polygon') {
    const rings = geom.coordinates.flatMap(splitRingAtSeams);
    if (rings.length === geom.coordinates.length) return { ...geom, coordinates: rings };
    return { type: 'MultiPolygon', coordinates: rings.map((r) => [r]) };
  }
  if (geom.type === 'MultiPolygon') {
    const polys = geom.coordinates.flatMap((poly) =>
      poly.flatMap((ring) => splitRingAtSeams(ring).map((r) => [r])),
    );
    return { ...geom, coordinates: polys };
  }
  return geom;
}

function fixFeatureCollection(fc: FeatureCollection<Geometry>): FeatureCollection<Geometry> {
  return {
    ...fc,
    features: fc.features.map((f) => ({
      ...f,
      geometry: f.geometry ? fixAntimeridian(f.geometry) : f.geometry,
    })),
  };
}

export default function WorldMap({ selectedCountry, onCountrySelect }: WorldMapProps) {
  const [activeLayers, setActiveLayers] = useState<Set<TradeLaneCategory>>(new Set());

  const handleLayerToggle = useCallback((id: TradeLaneCategory) => {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const geoData = useMemo(() => {
    const topo = topology as unknown as Topology;
    const raw = feature(topo, topo.objects.countries) as FeatureCollection<Geometry>;
    return fixFeatureCollection(raw);
  }, []);

  const style = useCallback(
    (feat: GeoJSON.Feature | undefined): PathOptions => {
      const id = String(feat?.id || '');
      const isSupported = supportedCountryCodes.has(id);
      const isSelected = id === selectedCountry;

      if (isSelected) {
        return { fillColor: '#5ab4e8', fillOpacity: 0.42, color: '#90d4f8', weight: 2 };
      }
      if (isSupported) {
        return {
          fillColor: getRegionColor(id),
          fillOpacity: 0.26,
          color: 'rgba(255, 255, 255, 0.18)',
          weight: 0.8,
        };
      }
      return { fillColor: '#3a5070', fillOpacity: 0.14, color: 'rgba(255, 255, 255, 0.08)', weight: 0.5 };
    },
    [selectedCountry],
  );

  const onEachFeature = useCallback(
    (feature: GeoJSON.Feature, layer: Layer) => {
      const id = String(feature.id || '');
      const country = getCountryByNumericCode(id);
      const name = country?.name || (feature.properties as { name?: string })?.name || 'Unknown';
      const isSupported = supportedCountryCodes.has(id);

      layer.bindTooltip(isSupported ? name : `${name} (coming soon)`, {
        sticky: true,
        className: 'country-tooltip',
      });

      layer.on({
        mouseover: (e) => {
          if (!isSupported) return;
          const target = e.target;
          if (id !== selectedCountry) target.setStyle({ fillOpacity: 0.5, weight: 1.5 });
          target.bringToFront();
        },
        mouseout: (e) => {
          if (!isSupported) return;
          const target = e.target;
          if (id !== selectedCountry) target.setStyle({ fillOpacity: 0.26, weight: 0.8 });
        },
        click: () => {
          if (isSupported) onCountrySelect(id === selectedCountry ? null : id);
        },
      });
    },
    [selectedCountry, onCountrySelect],
  );

  return (
    <div className="map-wrapper">
      <MapContainer
        center={[20, 0]}
        zoom={2.5}
        minZoom={2}
        maxZoom={7}
        zoomControl={false}
        className="world-map"
        maxBounds={[[-85, -180], [85, 180]]}
        maxBoundsViscosity={1.0}
        worldCopyJump={false}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          noWrap={true}
        />
        <GeoJSON
          key={selectedCountry || 'none'}
          data={geoData}
          style={style}
          onEachFeature={onEachFeature}
        />
        <TradeLanesLayer activeLayers={activeLayers} />
        <GeoLabels />
      </MapContainer>

      <LayerControl activeLayers={activeLayers} onToggle={handleLayerToggle} />
    </div>
  );
}
