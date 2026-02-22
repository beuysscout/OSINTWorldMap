import { MapContainer, TileLayer, GeoJSON, ZoomControl } from 'react-leaflet';
import { useMemo, useCallback } from 'react';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { FeatureCollection, Geometry } from 'geojson';
import type { Layer, PathOptions } from 'leaflet';
import topology from 'world-atlas/countries-110m.json';
import { supportedCountryCodes, getCountryByNumericCode } from '../../data/countries';

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

export default function WorldMap({ selectedCountry, onCountrySelect }: WorldMapProps) {
  const geoData = useMemo(() => {
    const topo = topology as unknown as Topology;
    return feature(topo, topo.objects.countries) as FeatureCollection<Geometry>;
  }, []);

  const style = useCallback(
    (feat: GeoJSON.Feature | undefined): PathOptions => {
      const id = String(feat?.id || '');
      const isSupported = supportedCountryCodes.has(id);
      const isSelected = id === selectedCountry;

      if (isSelected) {
        return {
          fillColor: '#fff',
          fillOpacity: 0.35,
          color: '#fff',
          weight: 2.5,
        };
      }

      if (isSupported) {
        return {
          fillColor: getRegionColor(id),
          fillOpacity: 0.55,
          color: '#263238',
          weight: 0.8,
        };
      }

      return {
        fillColor: '#37474f',
        fillOpacity: 0.3,
        color: '#263238',
        weight: 0.5,
      };
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
          if (id !== selectedCountry) {
            target.setStyle({ fillOpacity: 0.8, weight: 1.5 });
          }
          target.bringToFront();
        },
        mouseout: (e) => {
          if (!isSupported) return;
          const target = e.target;
          if (id !== selectedCountry) {
            target.setStyle({ fillOpacity: 0.55, weight: 0.8 });
          }
        },
        click: () => {
          if (isSupported) {
            onCountrySelect(id === selectedCountry ? null : id);
          }
        },
      });
    },
    [selectedCountry, onCountrySelect],
  );

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2.5}
      minZoom={2}
      maxZoom={7}
      zoomControl={false}
      className="world-map"
      maxBounds={[[-85, -200], [85, 200]]}
      maxBoundsViscosity={1.0}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
      />
      <GeoJSON key={selectedCountry || 'none'} data={geoData} style={style} onEachFeature={onEachFeature} />
    </MapContainer>
  );
}
