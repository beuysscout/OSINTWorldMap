import { Marker, useMap, useMapEvents } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { useState, useMemo } from 'react';
import { geoLabels } from '../../data/geoLabels';

// Icons are stable — create once and reuse
const icons = new Map(
  geoLabels.map((l) => [
    l.id,
    divIcon({
      html: `<span class="geo-label geo-label--${l.category}">${l.name}</span>`,
      className: 'geo-label-marker',
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    }),
  ]),
);

export default function GeoLabels() {
  const map = useMap();
  const [zoom, setZoom] = useState(() => map.getZoom());

  useMapEvents({
    zoomend: () => setZoom(map.getZoom()),
  });

  const visible = useMemo(
    () => geoLabels.filter((l) => zoom >= l.minZoom && (!l.maxZoom || zoom <= l.maxZoom)),
    [zoom],
  );

  return (
    <>
      {visible.map((label) => (
        <Marker
          key={label.id}
          position={label.coordinates}
          icon={icons.get(label.id)!}
          interactive={false}
          keyboard={false}
          zIndexOffset={-1000}
        />
      ))}
    </>
  );
}
