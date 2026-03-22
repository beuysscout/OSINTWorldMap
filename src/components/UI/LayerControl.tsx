import { useState } from 'react';
import { LAYER_DEFS } from '../../data/tradeLanes';
import type { TradeLaneCategory } from '../../data/tradeLanes';

interface LayerControlProps {
  activeLayers: Set<TradeLaneCategory>;
  onToggle: (id: TradeLaneCategory) => void;
}

export default function LayerControl({ activeLayers, onToggle }: LayerControlProps) {
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
          {LAYER_DEFS.map((layer) => {
            const active = activeLayers.has(layer.id);
            return (
              <li key={layer.id}>
                <button
                  className={`layer-toggle ${active ? 'active' : ''}`}
                  onClick={() => onToggle(layer.id)}
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
                    className="layer-status"
                    style={{ color: active ? layer.color : 'var(--text-muted)' }}
                  >
                    {active ? 'ON' : 'OFF'}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
