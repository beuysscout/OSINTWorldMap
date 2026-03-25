import { HISTORICAL_SNAPSHOTS } from '../../data/historicalBorders';

interface TimeSliderProps {
  selectedYear: number | null;
  onChange: (year: number | null) => void;
  onClose: () => void;
}

export default function TimeSlider({ selectedYear, onChange, onClose }: TimeSliderProps) {
  const activeSnapshot =
    selectedYear !== null ? HISTORICAL_SNAPSHOTS.find((s) => s.year === selectedYear) ?? null : null;

  return (
    <div className="time-slider">
      {/* Panel header */}
      <div className="time-panel-header">
        <div className="time-panel-title">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Timeline
          {activeSnapshot && (
            <span className="time-panel-era">· {activeSnapshot.era}</span>
          )}
        </div>
        <button className="time-close" onClick={onClose} title="Close timeline">×</button>
      </div>

      {/* Year nodes */}
      <div className="time-track">
        <div className="time-line" />
        {HISTORICAL_SNAPSHOTS.map((snapshot) => (
          <button
            key={snapshot.year}
            className={`time-node${selectedYear === snapshot.year ? ' active' : ''}`}
            onClick={() => onChange(selectedYear === snapshot.year ? null : snapshot.year)}
            title={snapshot.era}
          >
            <div className="time-dot" />
            <span className="time-label">{snapshot.label}</span>
          </button>
        ))}
      </div>

      {/* Era details */}
      {activeSnapshot && (
        <div className="time-info">
          <p className="time-desc">{activeSnapshot.description}</p>
          <div className="time-legend">
            {activeSnapshot.geojson.features.map((f) => (
              <span key={f.properties.id} className="legend-item">
                <span className="legend-swatch" style={{ background: f.properties.color }} />
                {f.properties.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
