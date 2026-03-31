import { useState } from 'react';
import { LAYER_DEFS } from '../../data/tradeLanes';
import type { TradeLaneCategory } from '../../data/tradeLanes';
import { NATURAL_LAYER_DEFS } from '../../data/naturalFeatures';
import type { NaturalFeatureCategory } from '../../data/naturalFeatures';
import { MILITARY_LAYER_DEFS } from '../../data/militaryFeatures';
import type { MilitaryFeatureCategory } from '../../data/militaryFeatures';
import { RC_LAYER_DEFS } from '../../data/resourcesClimate';
import type { ResourcesClimateCategory } from '../../data/resourcesClimate';
import { POWER_ALLIANCE_LAYER_DEFS } from '../../data/powerAlliances';
import type { PowerAllianceCategory } from '../../data/powerAlliances';
import { STORY_PRESETS } from '../../data/storyPresets';
import type { LayerPreset } from '../../data/storyPresets';

interface LayerControlProps {
  activeLayers: Set<TradeLaneCategory>;
  onToggle: (id: TradeLaneCategory) => void;
  activeNaturalLayers: Set<NaturalFeatureCategory>;
  onNaturalToggle: (id: NaturalFeatureCategory) => void;
  activeMilitaryLayers: Set<MilitaryFeatureCategory>;
  onMilitaryToggle: (id: MilitaryFeatureCategory) => void;
  activeResourcesLayers: Set<ResourcesClimateCategory>;
  onResourcesToggle: (id: ResourcesClimateCategory) => void;
  activePowerAllianceLayers: Set<PowerAllianceCategory>;
  onPowerAllianceToggle: (id: PowerAllianceCategory) => void;
  activePresetId: string | null;
  onApplyPreset: (preset: LayerPreset) => void;
}

// Fast id → def lookups
const LAYER_DEF_MAP = Object.fromEntries(LAYER_DEFS.map((d) => [d.id, d]));
const NATURAL_LAYER_DEF_MAP = Object.fromEntries(NATURAL_LAYER_DEFS.map((d) => [d.id, d]));
const MILITARY_LAYER_DEF_MAP = Object.fromEntries(MILITARY_LAYER_DEFS.map((d) => [d.id, d]));
const RC_LAYER_DEF_MAP = Object.fromEntries(RC_LAYER_DEFS.map((d) => [d.id, d]));
const POWER_ALLIANCE_DEF_MAP = Object.fromEntries(POWER_ALLIANCE_LAYER_DEFS.map((d) => [d.id, d]));

const DIPLOMATIC_GROUPS: { label: string; ids: PowerAllianceCategory[] }[] = [
  { label: 'Formal Alliances', ids: ['nato', 'csto', 'sco', 'aukus', 'quad'] },
  { label: 'Spheres of Influence', ids: ['sphereUS', 'sphereChina', 'sphereRussia'] },
  { label: 'UN Voting Blocs', ids: ['unWestern', 'unRussiaChinaBloc'] },
  { label: 'Sanctions', ids: ['sanctionsUS', 'sanctionsEU'] },
];

const LAYER_GROUPS: { label: string; ids: TradeLaneCategory[] }[] = [
  { label: 'Maritime', ids: ['shipping', 'energy', 'chokepoints', 'ports'] },
  { label: 'Land', ids: ['bri', 'commodity', 'pipelines', 'cables'] },
];

const NATURAL_GROUPS: { label: string; ids: NaturalFeatureCategory[] }[] = [
  { label: 'Natural', ids: ['mountains', 'rivers', 'deserts'] },
];

function getPresetLayerChips(preset: LayerPreset): { label: string; color: string }[] {
  const chips: { label: string; color: string }[] = [];
  preset.alliances.forEach((id) => {
    const def = POWER_ALLIANCE_DEF_MAP[id];
    if (def) chips.push({ label: def.label, color: def.color });
  });
  preset.trade.forEach((id) => {
    const def = LAYER_DEF_MAP[id];
    if (def) chips.push({ label: def.label, color: def.color });
  });
  preset.military.forEach((id) => {
    const def = MILITARY_LAYER_DEF_MAP[id];
    if (def) chips.push({ label: def.label, color: def.color });
  });
  preset.resources.forEach((id) => {
    const def = RC_LAYER_DEF_MAP[id];
    if (def) chips.push({ label: def.label, color: def.color });
  });
  preset.natural.forEach((id) => {
    const def = NATURAL_LAYER_DEF_MAP[id];
    if (def) chips.push({ label: def.label, color: def.color });
  });
  return chips;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`layer-chevron${open ? ' open' : ''}`}
      width="10" height="10" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

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

function SectionHeader({
  label,
  activeCount,
  open,
  onToggle,
}: {
  label: string;
  activeCount: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button className={`layer-section-header${open ? ' open' : ''}`} onClick={onToggle}>
      <span className="layer-section-label">{label}</span>
      {activeCount > 0 && !open && (
        <span className="layer-section-badge">{activeCount} on</span>
      )}
      <Chevron open={open} />
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
  activePowerAllianceLayers,
  onPowerAllianceToggle,
  activePresetId,
  onApplyPreset,
}: LayerControlProps) {
  const [activeTab, setActiveTab] = useState<'stories' | 'layers'>('stories');
  const [expandedPresetId, setExpandedPresetId] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  function toggleSection(id: string) {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  return (
    <div className="layer-control">
      {/* Tab bar */}
      <div className="layer-control-tabs">
        <button
          className={`layer-tab${activeTab === 'stories' ? ' active' : ''}`}
          onClick={() => setActiveTab('stories')}
        >
          Stories
        </button>
        <button
          className={`layer-tab${activeTab === 'layers' ? ' active' : ''}`}
          onClick={() => setActiveTab('layers')}
        >
          Layers
        </button>
      </div>

      {/* Stories tab */}
      {activeTab === 'stories' && (
        <ul className="preset-list">
          {STORY_PRESETS.map((preset) => {
            const isActive = activePresetId === preset.id;
            const isExpanded = isActive || expandedPresetId === preset.id;
            const chips = getPresetLayerChips(preset);
            return (
              <li key={preset.id}>
                <div
                  className={`preset-card${isActive ? ' active' : ''}`}
                  style={{ '--preset-accent': preset.accentColor } as React.CSSProperties}
                >
                  <button
                    className="preset-card-header"
                    onClick={() => setExpandedPresetId(isExpanded ? null : preset.id)}
                    aria-expanded={isExpanded}
                  >
                    <div className="preset-card-titles">
                      <span className="preset-card-title">{preset.title}</span>
                      <span className="preset-card-tagline">{preset.tagline}</span>
                    </div>
                    <Chevron open={isExpanded} />
                  </button>
                  <div className={`preset-card-body${isExpanded ? ' open' : ''}`}>
                    <p className="preset-card-desc">{preset.description}</p>
                    <div className="preset-card-chips">
                      {chips.map((chip) => (
                        <span
                          key={chip.label}
                          className="preset-chip"
                          style={{ borderColor: chip.color, color: chip.color }}
                        >
                          <span className="preset-chip-dot" style={{ background: chip.color }} />
                          {chip.label}
                        </span>
                      ))}
                    </div>
                    <button
                      className={`preset-activate-btn${isActive ? ' active' : ''}`}
                      style={isActive ? { backgroundColor: preset.accentColor, borderColor: preset.accentColor } : { borderColor: preset.accentColor, color: preset.accentColor }}
                      onClick={(e) => { e.stopPropagation(); onApplyPreset(preset); }}
                    >
                      {isActive ? (
                        <>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Active
                        </>
                      ) : 'Activate'}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Layers tab */}
      {activeTab === 'layers' && (
        <ul className="layer-control-list">

          {/* ── Diplomatic ───────────────────────────────────────────────────── */}
          <li className="layer-section">
            <SectionHeader
              label="Diplomatic"
              activeCount={activePowerAllianceLayers.size}
              open={expandedSections.has('diplomatic')}
              onToggle={() => toggleSection('diplomatic')}
            />
            {expandedSections.has('diplomatic') && (
              <ul className="layer-section-body">
                {DIPLOMATIC_GROUPS.map((group) => (
                  <li key={group.label} className="layer-group">
                    <span className="layer-group-label">{group.label}</span>
                    <ul className="layer-group-items">
                      {group.ids.map((id) => {
                        const def = POWER_ALLIANCE_DEF_MAP[id];
                        return (
                          <li key={id}>
                            <LayerBtn
                              active={activePowerAllianceLayers.has(id)}
                              color={def.color}
                              label={def.label}
                              description={def.description}
                              onToggle={() => onPowerAllianceToggle(id)}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* ── Trade & Routes ────────────────────────────────────────────────── */}
          <li className="layer-section">
            <SectionHeader
              label="Trade & Routes"
              activeCount={activeLayers.size}
              open={expandedSections.has('trade')}
              onToggle={() => toggleSection('trade')}
            />
            {expandedSections.has('trade') && (
              <ul className="layer-section-body">
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
              </ul>
            )}
          </li>

          {/* ── Military ─────────────────────────────────────────────────────── */}
          <li className="layer-section">
            <SectionHeader
              label="Military"
              activeCount={activeMilitaryLayers.size}
              open={expandedSections.has('military')}
              onToggle={() => toggleSection('military')}
            />
            {expandedSections.has('military') && (
              <ul className="layer-section-body">
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
            )}
          </li>

          {/* ── Natural Borders ───────────────────────────────────────────────── */}
          <li className="layer-section">
            <SectionHeader
              label="Natural Borders"
              activeCount={activeNaturalLayers.size}
              open={expandedSections.has('natural')}
              onToggle={() => toggleSection('natural')}
            />
            {expandedSections.has('natural') && (
              <ul className="layer-section-body">
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
            )}
          </li>

          {/* ── Resources & Climate ───────────────────────────────────────────── */}
          <li className="layer-section">
            <SectionHeader
              label="Resources & Climate"
              activeCount={activeResourcesLayers.size}
              open={expandedSections.has('resources')}
              onToggle={() => toggleSection('resources')}
            />
            {expandedSections.has('resources') && (
              <ul className="layer-section-body">
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
            )}
          </li>

        </ul>
      )}
    </div>
  );
}
