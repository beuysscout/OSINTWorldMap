import { useState } from 'react';
import { SCENARIOS, type ConflictRole } from '../../data/allianceDrag';

interface AllianceDragProps {
  scenarioId: string | null;
  step: number;
  onScenarioSelect: (id: string) => void;
  onStepChange: (step: number) => void;
  onClose: () => void;
}

const ROLE_META: Record<ConflictRole, { label: string; color: string }> = {
  'aggressor':         { label: 'Aggressor',      color: '#dc2626' },
  'target':            { label: 'Target',          color: '#d97706' },
  'defending':         { label: 'Defending',       color: '#1d4ed8' },
  'defending-allied':  { label: 'Allied Support',  color: '#60a5fa' },
  'aggressor-aligned': { label: 'Aligned w/ Aggressor', color: '#f97316' },
  'contested':         { label: 'Contested',       color: '#7c3aed' },
  'neutral':           { label: 'Neutral',         color: '#94a3b8' },
};

const CONFLICT_TYPE_ICON: Record<string, string> = {
  'Land Invasion':   '⚔',
  'Naval Blockade':  '⚓',
  'Artillery Strike': '💥',
};

export default function AllianceDrag({
  scenarioId,
  step,
  onScenarioSelect,
  onStepChange,
  onClose,
}: AllianceDragProps) {
  const [picking, setPicking] = useState(false);

  const scenario = SCENARIOS.find((s) => s.id === scenarioId) ?? null;
  const maxStep = scenario ? scenario.waves.length - 1 : 0;
  const currentWave = scenario?.waves[step];

  // ── Trigger button (no active simulation) ────────────────────────────────
  if (!scenarioId && !picking) {
    return (
      <button className="sim-trigger" onClick={() => setPicking(true)}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
        Simulate
      </button>
    );
  }

  // ── Scenario picker ───────────────────────────────────────────────────────
  if (!scenarioId && picking) {
    return (
      <div className="sim-picker-backdrop" onClick={() => setPicking(false)}>
        <div className="sim-picker-modal" onClick={(e) => e.stopPropagation()}>
          <div className="sim-picker-header">
            <div className="sim-picker-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              Alliance Drag Simulator
            </div>
            <p className="sim-picker-desc">
              Choose a conflict scenario to watch alliance obligations cascade across the map — wave by wave.
            </p>
          </div>

          <div className="sim-picker-grid">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                className="sim-scenario-card"
                onClick={() => {
                  onScenarioSelect(s.id);
                  setPicking(false);
                }}
              >
                <div className="sim-scenario-top">
                  <span className="sim-scenario-type">
                    {CONFLICT_TYPE_ICON[s.conflictType] ?? '⚡'} {s.conflictType}
                  </span>
                  <span className="sim-scenario-waves">{s.waves.length} waves</span>
                </div>
                <div className="sim-scenario-title">{s.title}</div>
                <div className="sim-scenario-subtitle">{s.subtitle}</div>
                <p className="sim-scenario-desc">{s.description}</p>
              </button>
            ))}
          </div>

          <div className="sim-picker-footer">
            <button className="btn btn-ghost btn-sm" onClick={() => setPicking(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Active simulation controls ────────────────────────────────────────────
  return (
    <>
      {/* Legend */}
      <div className="sim-legend">
        {(Object.entries(ROLE_META) as [ConflictRole, { label: string; color: string }][]).map(
          ([role, meta]) => (
            <div key={role} className="sim-legend-row">
              <span className="sim-legend-swatch" style={{ background: meta.color }} />
              <span className="sim-legend-label">{meta.label}</span>
            </div>
          ),
        )}
      </div>

      {/* Controls bar */}
      <div className="sim-controls">
        <div className="sim-controls-scenario">
          <span className="sim-controls-icon">
            {CONFLICT_TYPE_ICON[scenario?.conflictType ?? ''] ?? '⚡'}
          </span>
          <span className="sim-controls-title">{scenario?.title}</span>
        </div>

        <div className="sim-controls-wave">
          <span className="sim-wave-label">{currentWave?.label}</span>
          <span className="sim-wave-timeframe">{currentWave?.timeframe}</span>
          <div className="sim-wave-pips">
            {scenario?.waves.map((_, i) => (
              <button
                key={i}
                className={`sim-wave-pip${i <= step ? ' active' : ''}`}
                onClick={() => onStepChange(i)}
                aria-label={`Jump to wave ${i}`}
              />
            ))}
          </div>
        </div>

        <div className="sim-controls-nav">
          <button
            className="sim-nav-btn"
            onClick={() => onStepChange(Math.max(0, step - 1))}
            disabled={step === 0}
            aria-label="Previous wave"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="sim-nav-btn"
            onClick={() => onStepChange(Math.min(maxStep, step + 1))}
            disabled={step === maxStep}
            aria-label="Next wave"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <button
          className="sim-close-btn"
          onClick={onClose}
          aria-label="Close simulation"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </>
  );
}
