interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSelect: (numericCode: string) => void;
  suggestions: { code: string; numericCode: string; name: string }[];
}

export default function Header({ searchQuery, onSearchChange, onSearchSelect, suggestions }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4fc3f7" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <h1>OSINT World Map</h1>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search countries..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {suggestions.length > 0 && searchQuery.length > 0 && (
          <ul className="search-suggestions">
            {suggestions.map((s) => (
              <li key={s.code} onClick={() => onSearchSelect(s.numericCode)}>
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="header-legend">
        <span className="legend-item"><span className="legend-dot" style={{ background: '#4fc3f7' }} />Americas</span>
        <span className="legend-item"><span className="legend-dot" style={{ background: '#81c784' }} />Europe</span>
        <span className="legend-item"><span className="legend-dot" style={{ background: '#ffb74d' }} />Asia</span>
        <span className="legend-item"><span className="legend-dot" style={{ background: '#f06292' }} />Africa</span>
        <span className="legend-item"><span className="legend-dot" style={{ background: '#ba68c8' }} />Oceania</span>
      </div>
    </header>
  );
}
