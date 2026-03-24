import { useState } from 'react';
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
    label: 'Trade Corridors',
    ids: ['bri', 'commodity'],
  },
  {
    label: 'Infrastructure',
    ids: ['pipelines', 'cables'],
  },
];

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
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="layer-control">
      <button
        className="layer-control-header"
        onClick={() => setCollapsed((c) => !c)}
        aria-expanded={!collapsed}
      >
        <span className="layer-control-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </span>
        <span>Data Layers</span>
        <span className="layer-control-caret">{collapsed ? '▲' : '▼'}</span>
      </button>

      {!collapsed && (
        <ul className="layer-control-list">
          {LAYER_GROUPS.map((group) => (
            <li key={group.label} className="layer-group">
              <span className="layer-group-label">{group.label}</span>
              <ul className="layer-group-items">
                {group.ids.map((id) => {
                  const layer = LAYER_DEF_MAP[id];
                  const active = activeLayers.has(id);
                  return (
                    <li key={id}>
                      <button
                        className={`layer-toggle ${active ? 'active' : ''}`}
                        onClick={() => onToggle(id)}
                        title={layer.description}
                      >
                        <span
                          className="layer-swatch"
                          style={{
                            background: active ? layer.color : 'transparent',
                            borderColor: layer.color,
                          }}
                        />
                        <span className="layer-label">{layer.label}</span>
                        <span
                          className={`badge badge-xs font-bold ${active ? '' : 'opacity-40'}`}
                          style={active ? { backgroundColor: layer.color, borderColor: layer.color, color: '#fff' } : { borderColor: 'currentColor' }}
                        >
                          {active ? 'ON' : 'OFF'}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}

          {/* Military group */}
          <li className="layer-group">
            <span className="layer-group-label">Military</span>
            <ul className="layer-group-items">
              {MILITARY_LAYER_DEFS.map((def) => {
                const active = activeMilitaryLayers.has(def.id);
                return (
                  <li key={def.id}>
                    <button
                      className={`layer-toggle ${active ? 'active' : ''}`}
                      onClick={() => onMilitaryToggle(def.id)}
                      title={def.description}
                    >
                      <span
                        className="layer-swatch"
                        style={{
                          background: active ? def.color : 'transparent',
                          borderColor: def.color,
                        }}
                      />
                      <span className="layer-label">{def.label}</span>
                      <span
                        className={`badge badge-xs font-bold ${active ? '' : 'opacity-40'}`}
                        style={active ? { backgroundColor: def.color, borderColor: def.color, color: '#fff' } : { borderColor: 'currentColor' }}
                      >
                        {active ? 'ON' : 'OFF'}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>

          {/* Natural Borders group */}
          <li className="layer-group">
            <span className="layer-group-label">Natural Borders</span>
            <ul className="layer-group-items">
              {NATURAL_LAYER_DEFS.map((def) => {
                const active = activeNaturalLayers.has(def.id);
                return (
                  <li key={def.id}>
                    <button
                      className={`layer-toggle ${active ? 'active' : ''}`}
                      onClick={() => onNaturalToggle(def.id)}
                      title={def.description}
                    >
                      <span
                        className="layer-swatch"
                        style={{
                          background: active ? def.color : 'transparent',
                          borderColor: def.color,
                        }}
                      />
                      <span className="layer-label">{def.label}</span>
                      <span
                        className={`badge badge-xs font-bold ${active ? '' : 'opacity-40'}`}
                        style={active ? { backgroundColor: def.color, borderColor: def.color, color: '#fff' } : { borderColor: 'currentColor' }}
                      >
                        {active ? 'ON' : 'OFF'}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>

          {/* Resources & Climate group */}
          <li className="layer-group">
            <span className="layer-group-label">Resources &amp; Climate</span>
            <ul className="layer-group-items">
              {RC_LAYER_DEFS.map((def) => {
                const active = activeResourcesLayers.has(def.id);
                return (
                  <li key={def.id}>
                    <button
                      className={`layer-toggle ${active ? 'active' : ''}`}
                      onClick={() => onResourcesToggle(def.id)}
                      title={def.description}
                    >
                      <span
                        className="layer-swatch"
                        style={{
                          background: active ? def.color : 'transparent',
                          borderColor: def.color,
                        }}
                      />
                      <span className="layer-label">{def.label}</span>
                      <span
                        className={`badge badge-xs font-bold ${active ? '' : 'opacity-40'}`}
                        style={active ? { backgroundColor: def.color, borderColor: def.color, color: '#fff' } : { borderColor: 'currentColor' }}
                      >
                        {active ? 'ON' : 'OFF'}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </li>
        </ul>
      )}
    </div>
  );
}
