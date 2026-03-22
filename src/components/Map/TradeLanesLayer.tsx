import { Polyline, CircleMarker, Tooltip } from 'react-leaflet';
import {
  shippingLanes,
  energyCorridors,
  briRoutes,
  chokepoints,
  LAYER_DEFS,
} from '../../data/tradeLanes';
import type { TradeLane, TradeLaneCategory } from '../../data/tradeLanes';

interface TradeLanesLayerProps {
  activeLayers: Set<TradeLaneCategory>;
}

const LAYER_COLORS: Record<TradeLaneCategory, string> = Object.fromEntries(
  LAYER_DEFS.map((d) => [d.id, d.color]),
) as Record<TradeLaneCategory, string>;

function RouteLine({ lane, color }: { lane: TradeLane; color: string }) {
  return (
    <Polyline
      positions={lane.coordinates}
      pathOptions={{
        color,
        weight: 1.5,
        opacity: 0.65,
        dashArray: lane.category === 'bri' ? '6 4' : undefined,
      }}
    >
      <Tooltip sticky>
        <strong style={{ fontSize: '0.8rem' }}>{lane.name}</strong>
        {lane.description && (
          <div style={{ marginTop: 4, fontSize: '0.72rem', maxWidth: 220 }}>
            {lane.description}
          </div>
        )}
      </Tooltip>
    </Polyline>
  );
}

export default function TradeLanesLayer({ activeLayers }: TradeLanesLayerProps) {
  const chokepointColor = LAYER_COLORS['chokepoints'];

  return (
    <>
      {activeLayers.has('shipping') &&
        shippingLanes.map((lane) => (
          <RouteLine key={lane.id} lane={lane} color={LAYER_COLORS['shipping']} />
        ))}

      {activeLayers.has('energy') &&
        energyCorridors.map((lane) => (
          <RouteLine key={lane.id} lane={lane} color={LAYER_COLORS['energy']} />
        ))}

      {activeLayers.has('bri') &&
        briRoutes.map((lane) => (
          <RouteLine key={lane.id} lane={lane} color={LAYER_COLORS['bri']} />
        ))}

      {activeLayers.has('chokepoints') &&
        chokepoints.map((cp) => (
          <CircleMarker
            key={cp.id}
            center={cp.coordinates}
            radius={6}
            pathOptions={{
              color: chokepointColor,
              fillColor: chokepointColor,
              fillOpacity: 0.9,
              weight: 1.5,
              opacity: 1,
            }}
          >
            <Tooltip>
              <strong style={{ fontSize: '0.8rem' }}>{cp.name}</strong>
              <div style={{ marginTop: 4, fontSize: '0.72rem', maxWidth: 220 }}>
                {cp.description}
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: '0.7rem',
                  color: chokepointColor,
                  fontWeight: 600,
                }}
              >
                {cp.throughput}
              </div>
            </Tooltip>
          </CircleMarker>
        ))}
    </>
  );
}
