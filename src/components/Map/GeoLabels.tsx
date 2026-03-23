import { Marker, useMap } from 'react-map-gl/mapbox';
import { useState, useEffect, useMemo } from 'react';
import { geoLabels } from '../../data/geoLabels';

export default function GeoLabels() {
  const { current: map } = useMap();
  const [zoom, setZoom] = useState(() => map?.getZoom() ?? 2.5);

  useEffect(() => {
    if (!map) return;
    const onZoom = () => setZoom(map.getZoom());
    map.on('zoom', onZoom);
    return () => { map.off('zoom', onZoom); };
  }, [map]);

  const visible = useMemo(
    () => geoLabels.filter((l) => zoom >= l.minZoom && (!l.maxZoom || zoom <= l.maxZoom)),
    [zoom],
  );

  return (
    <>
      {visible.map((label) => (
        <Marker
          key={label.id}
          longitude={label.coordinates[1]}
          latitude={label.coordinates[0]}
          style={{ pointerEvents: 'none' }}
        >
          <span className={`geo-label geo-label--${label.category}`}>
            {label.name}
          </span>
        </Marker>
      ))}
    </>
  );
}
