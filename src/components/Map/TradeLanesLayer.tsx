import { Polyline, CircleMarker, Tooltip } from 'react-leaflet';
import {
  shippingLanes,
  energyCorridors,
  briRoutes,
  chokepoints,
  commodityFlows,
  majorPorts,
  pipelines,
  submarineCables,
  LAYER_DEFS,
} from '../../data/tradeLanes';
import type { TradeLane, TradeLaneCategory, Port } from '../../data/tradeLanes';

interface TradeLanesLayerProps {
  activeLayers: Set<TradeLaneCategory>;
}

const LAYER_COLORS: Record<TradeLaneCategory, string> = Object.fromEntries(
  LAYER_DEFS.map((d) => [d.id, d.color]),
) as Record<TradeLaneCategory, string>;

// ── Route polyline ────────────────────────────────────────────────────────

function dashArray(category: TradeLane['category']): string | undefined {
  if (category === 'bri') return '6 4';
  if (category === 'commodity') return '8 5';
  if (category === 'pipelines') return '4 3';
  if (category === 'cables') return '2 5';
  return undefined;
}

function RouteLine({ lane, color }: { lane: TradeLane; color: string }) {
  return (
    <Polyline
      positions={lane.coordinates}
      pathOptions={{
        color,
        weight: lane.category === 'cables' ? 1 : 1.5,
        opacity: lane.category === 'cables' ? 0.55 : 0.65,
        dashArray: dashArray(lane.category),
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

// ── Port marker ───────────────────────────────────────────────────────────

const PORT_TEU_MAX = 47.3; // Shanghai
const PORT_R_MIN = 4;
const PORT_R_MAX = 11;

function PortMarker({ port, color }: { port: Port; color: string }) {
  const radius = PORT_R_MIN + (port.teuCapacity / PORT_TEU_MAX) * (PORT_R_MAX - PORT_R_MIN);

  return (
    <CircleMarker
      center={port.coordinates}
      radius={radius}
      pathOptions={{ color, fillColor: color, fillOpacity: 0.75, weight: 1.5, opacity: 1 }}
    >
      <Tooltip>
        <strong style={{ fontSize: '0.8rem' }}>
          #{port.rank} {port.name}
        </strong>
        <div style={{ marginTop: 3, fontSize: '0.7rem', color, fontWeight: 700 }}>
          {port.teuCapacity}M TEU / year · {port.country}
        </div>
        {port.description && (
          <div style={{ marginTop: 4, fontSize: '0.72rem', maxWidth: 220 }}>
            {port.description}
          </div>
        )}
      </Tooltip>
    </CircleMarker>
  );
}

// ── Main layer component ──────────────────────────────────────────────────

export default function TradeLanesLayer({ activeLayers }: TradeLanesLayerProps) {
  const color = (cat: TradeLaneCategory) => LAYER_COLORS[cat];

  return (
    <>
      {/* ── Maritime group ──────────────────────────────────── */}
      {activeLayers.has('shipping') &&
        shippingLanes.map((l) => <RouteLine key={l.id} lane={l} color={color('shipping')} />)}

      {activeLayers.has('energy') &&
        energyCorridors.map((l) => <RouteLine key={l.id} lane={l} color={color('energy')} />)}

      {activeLayers.has('chokepoints') &&
        chokepoints.map((cp) => (
          <CircleMarker
            key={cp.id}
            center={cp.coordinates}
            radius={6}
            pathOptions={{
              color: color('chokepoints'),
              fillColor: color('chokepoints'),
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
              <div style={{ marginTop: 4, fontSize: '0.7rem', color: color('chokepoints'), fontWeight: 600 }}>
                {cp.throughput}
              </div>
            </Tooltip>
          </CircleMarker>
        ))}

      {activeLayers.has('ports') &&
        majorPorts.map((p) => <PortMarker key={p.id} port={p} color={color('ports')} />)}

      {/* ── Trade Corridors group ───────────────────────────── */}
      {activeLayers.has('bri') &&
        briRoutes.map((l) => <RouteLine key={l.id} lane={l} color={color('bri')} />)}

      {activeLayers.has('commodity') &&
        commodityFlows.map((l) => <RouteLine key={l.id} lane={l} color={color('commodity')} />)}

      {/* ── Infrastructure group ────────────────────────────── */}
      {activeLayers.has('pipelines') &&
        pipelines.map((l) => <RouteLine key={l.id} lane={l} color={color('pipelines')} />)}

      {activeLayers.has('cables') &&
        submarineCables.map((l) => <RouteLine key={l.id} lane={l} color={color('cables')} />)}
    </>
  );
}
