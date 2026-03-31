import { Source, Layer } from 'react-map-gl/mapbox';
import type { FeatureCollection, LineString } from 'geojson';

function buildGraticule(): FeatureCollection<LineString> {
  const features: Array<GeoJSON.Feature<LineString>> = [];
  // Meridians at every 30° longitude
  for (let lng = -180; lng <= 180; lng += 30) {
    features.push({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: Array.from({ length: 181 }, (_, i) => [lng, i - 90]),
      },
      properties: {},
    });
  }
  // Parallels at every 30° latitude (excluding poles)
  for (let lat = -60; lat <= 60; lat += 30) {
    features.push({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: Array.from({ length: 361 }, (_, i) => [i - 180, lat]),
      },
      properties: {},
    });
  }
  return { type: 'FeatureCollection', features };
}

const GRATICULE_DATA = buildGraticule();

export default function GraticuleLayer({ visible = true }: { visible?: boolean }) {
  if (!visible) return null;
  return (
    <Source id="graticule" type="geojson" data={GRATICULE_DATA}>
      <Layer
        id="graticule-lines"
        type="line"
        paint={{
          'line-color': '#a09880',
          'line-width': 0.4,
          'line-opacity': 0.5,
        }}
      />
    </Source>
  );
}
