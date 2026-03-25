import { Source, Layer } from 'react-map-gl/mapbox';
import type { HistoricalSnapshot } from '../../data/historicalBorders';

export const HISTORICAL_FILL_ID = 'historical-empires-fill';
export const HISTORICAL_LINE_ID = 'historical-empires-line';

interface Props {
  snapshot: HistoricalSnapshot;
}

export default function HistoricalBordersLayer({ snapshot }: Props) {
  return (
    <Source id="historical-empires" type="geojson" data={snapshot.geojson}>
      <Layer
        id={HISTORICAL_FILL_ID}
        type="fill"
        paint={{
          'fill-color': ['get', 'color'],
          'fill-opacity': 0.38,
        }}
      />
      <Layer
        id={HISTORICAL_LINE_ID}
        type="line"
        paint={{
          'line-color': ['get', 'color'],
          'line-width': 1.8,
          'line-opacity': 0.9,
        }}
      />
    </Source>
  );
}
