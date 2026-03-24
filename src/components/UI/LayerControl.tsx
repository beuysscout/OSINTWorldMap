import { LAYER_DEFS } from '../../data/tradeLanes';
import type { TradeLaneCategory } from '../../data/tradeLanes';
import { NATURAL_LAYER_DEFS } from '../../data/naturalFeatures';
import type { NaturalFeatureCategory } from '../../data/naturalFeatures';
import { MILITARY_LAYER_DEFS } from '../../data/militaryFeatures';
import type { MilitaryFeatureCategory } from '../../data/militaryFeatures';
import { RC_LAYER_DEFS } from '../../data/resourcesClimate';
import type { ResourcesClimateCategory } from '../../data/resourcesClimate';

interface LayerControlProps {
  activeLayers: Set<TradeLaneCategory>;
  onToggle: (id: TradeLaneCategory) => void;
  activeNaturalLayers: Set<NaturalFeatureCategory>;
  onNaturalToggle: (id: NaturalFeatureCategory) => void;
  activeMilitaryLayers: Set<MilitaryFeatureCategory>;
  onMilitaryToggle: (id: MilitaryFeatureCategory) => void;
  activeResourcesLayers: Set<ResourcesClimateCategory>;
  onResourcesToggle: (id: ResourcesClimateCategory) => void;
}

// Build fast id → def lookups
const LAYER_DEF_MAP = Object.fromEntries(LAYER_DEFS.map((d) => [d.id, d]));
const NATURAL_LAYER_DEF_MAP = Object.fromEntries(NATURAL_LAYER_DEFS.map((d) => [d.id, d]));

const LAYER_GROUPS: { label: string; ids: TradeLaneCategory[] }[] = [
  {
    label: 'Maritime',
    ids: ['shipping', 'energy', 'chokepoints', 'ports'],
  },
  {
    label: 'Land',
    ids: ['bri', 'commodity', 'pipelines', 'cables'],
  },
];

const NATURAL_GROUPS: { label: string; ids: NaturalFeatureCategory[] }[] = [
  { label: 'Natural', ids: ['mountains', 'rivers', 'deserts'] },
];

function LayerBtn({
  active,
  color,
  label,
  description,
  onToggle,
}: {
  active: boolean;
  color: string;
  label: string;
  description: string;
  onToggle: () => void;
}) {
  return (
    <button
      className={`layer-toggle ${active ? 'active' : ''}`}
      onClick={onToggle}
      title={description}
    >
      <span
        className="layer-swatch"
        style={{ background: active ? color : 'transparent', borderColor: color }}
      />
      <span className="layer-label">{label}</span>
      <span
        className={`badge badge-xs font-bold ${active ? '' : 'opacity-40'}`}
        style={active ? { backgroundColor: color, borderColor: color, color: '#fff' } : { borderColor: 'currentColor' }}
      >
        {active ? 'ON' : 'OFF'}
      </span>
    </button>
  );
}

export default function LayerControl({
  activeLayers,
  onToggle,
  activeNaturalLayers,
  onNaturalToggle,
  activeMilitaryLayers,
  onMilitaryToggle,
  activeResourcesLayers,
  onResourcesToggle,
}: LayerControlProps) {
  return (
    <div className="layer-control">
      <ul className="layer-control-list">
        {LAYER_GROUPS.map((group) => (
          <li key={group.label} className="layer-group">
            <span className="layer-group-label">{group.label}</span>
            <ul className="layer-group-items">
              {group.ids.map((id) => {
                const layer = LAYER_DEF_MAP[id];
                return (
                  <li key={id}>
                    <LayerBtn
                      active={activeLayers.has(id)}
                      color={layer.color}
                      label={layer.label}
                      description={layer.description}
                      onToggle={() => onToggle(id)}
                    />
                  </li>
                );
              })}
            </ul>
          </li>
        ))}

        <li className="layer-group">
          <span className="layer-group-label">Military</span>
          <ul className="layer-group-items">
            {MILITARY_LAYER_DEFS.map((def) => (
              <li key={def.id}>
                <LayerBtn
                  active={activeMilitaryLayers.has(def.id)}
                  color={def.color}
                  label={def.label}
                  description={def.description}
                  onToggle={() => onMilitaryToggle(def.id)}
                />
              </li>
            ))}
          </ul>
        </li>

        <li className="layer-group">
          <span className="layer-group-label">Natural Borders</span>
          <ul className="layer-group-items">
            {NATURAL_GROUPS.flatMap((g) =>
              g.ids.map((id) => {
                const def = NATURAL_LAYER_DEF_MAP[id];
                return (
                  <li key={id}>
                    <LayerBtn
                      active={activeNaturalLayers.has(id)}
                      color={def.color}
                      label={def.label}
                      description={def.description}
                      onToggle={() => onNaturalToggle(id)}
                    />
                  </li>
                );
              }),
            )}
          </ul>
        </li>

        <li className="layer-group">
          <span className="layer-group-label">Resources &amp; Climate</span>
          <ul className="layer-group-items">
            {RC_LAYER_DEFS.map((def) => (
              <li key={def.id}>
                <LayerBtn
                  active={activeResourcesLayers.has(def.id)}
                  color={def.color}
                  label={def.label}
                  description={def.description}
                  onToggle={() => onResourcesToggle(def.id)}
                />
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
