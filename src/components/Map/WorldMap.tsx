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
  Americas: '#4fc3f7',
  Europe: '#81c784',
  Asia: '#ffb74d',
  Africa: '#f06292',
  Oceania: '#ba68c8',
  'Middle East': '#4dd0e1',
};

function getRegionColor(numericCode: string): string {
  const country = getCountryByNumericCode(numericCode);
  if (!country) return '#455a64';
  return REGION_COLORS[country.region] || '#78909c';
}

// ── Antimeridian fix ──────────────────────────────────────────────────────
// world-atlas encodes Russia's Chukchi Peninsula with longitude > 180,
// causing Leaflet to render a horizontal fill band across the entire map.
// Clamping to [-180, 180] keeps polygons self-consistent and removes the artifact.

function clampPos(pos: Position): Position {
  return [Math.max(-180, Math.min(180, pos[0])), pos[1], ...pos.slice(2)];
}

function clampGeometry(geom: Geometry): Geometry {
  switch (geom.type) {
    case 'Polygon':
      return { ...geom, coordinates: geom.coordinates.map((ring) => ring.map(clampPos)) };
    case 'MultiPolygon':
      return {
        ...geom,
        coordinates: geom.coordinates.map((poly) => poly.map((ring) => ring.map(clampPos))),
      };
    default:
      return geom;
  }
}

function clampFeatureCollection(fc: FeatureCollection<Geometry>): FeatureCollection<Geometry> {
  return {
    ...fc,
    features: fc.features.map((f) => ({
      ...f,
      geometry: f.geometry ? clampGeometry(f.geometry) : f.geometry,
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
    return clampFeatureCollection(raw);
  }, []);

  const style = useCallback(
    (feat: GeoJSON.Feature | undefined): PathOptions => {
      const id = String(feat?.id || '');
      const isSupported = supportedCountryCodes.has(id);
      const isSelected = id === selectedCountry;

      if (isSelected) {
        return { fillColor: '#fff', fillOpacity: 0.35, color: '#fff', weight: 2.5 };
      }
      if (isSupported) {
        return {
          fillColor: getRegionColor(id),
          fillOpacity: 0.55,
          color: '#263238',
          weight: 0.8,
        };
      }
      return { fillColor: '#37474f', fillOpacity: 0.3, color: '#263238', weight: 0.5 };
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
          if (id !== selectedCountry) target.setStyle({ fillOpacity: 0.8, weight: 1.5 });
          target.bringToFront();
        },
        mouseout: (e) => {
          if (!isSupported) return;
          const target = e.target;
          if (id !== selectedCountry) target.setStyle({ fillOpacity: 0.55, weight: 0.8 });
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
        minZoom={2.5}
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
