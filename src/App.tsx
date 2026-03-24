import { useState, useMemo, useCallback } from 'react';
import WorldMap from './components/Map/WorldMap';
import InfoPanel from './components/Panel/InfoPanel';
import RelationshipCard from './components/Panel/RelationshipCard';
import AllianceDrag from './components/Simulation/AllianceDrag';
import { countriesData } from './data/countries';
import { useLiveData } from './hooks/useCountryData';
import { SCENARIOS, getActiveRoles } from './data/allianceDrag';

export default function App() {
  const [selectedCode, setSelectedCode] = useState<string | null>(null); // alpha-3
  const [compareCode, setCompareCode] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCountry = useMemo(() => {
    if (!selectedCode) return null;
    return countriesData[selectedCode] ?? null;
  }, [selectedCode]);

  const compareCountry = useMemo(() => {
    if (!compareCode) return null;
    return countriesData[compareCode] ?? null;
  }, [compareCode]);

  const { liveData, indicators, loading } = useLiveData(selectedCountry?.code ?? null);
  const { liveData: compareLiveData } = useLiveData(compareCode);

  const suggestions = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();
    return Object.values(countriesData)
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, 6)
      .map((c) => ({ code: c.code, name: c.name }));
  }, [searchQuery]);

  const handleSearchSelect = useCallback((code: string) => {
    setSelectedCode(code);
    setCompareCode(null);
    setSearchQuery('');
  }, []);

  const handleClose = useCallback(() => {
    setSelectedCode(null);
    setCompareCode(null);
  }, []);

  const handleCloseCompare = useCallback(() => {
    setCompareCode(null);
  }, []);

  const handleSwap = useCallback(() => {
    const prev = selectedCode;
    setSelectedCode(compareCode);
    setCompareCode(prev);
  }, [selectedCode, compareCode]);

  const handleCompareSelect = useCallback((alpha3: string | null) => {
    setCompareCode(alpha3);
  }, []);

  // ── Simulation state ────────────────────────────────────────────────────
  const [simScenarioId, setSimScenarioId] = useState<string | null>(null);
  const [simStep, setSimStep] = useState(0);

  const simulationRoles = useMemo(() => {
    if (!simScenarioId) return null;
    const scenario = SCENARIOS.find((s) => s.id === simScenarioId);
    if (!scenario) return null;
    return getActiveRoles(scenario, simStep);
  }, [simScenarioId, simStep]);

  const handleSimScenarioSelect = useCallback((id: string) => {
    setSimScenarioId(id);
    setSimStep(0);
    // Clear any active country selection when entering simulation
    setSelectedCode(null);
    setCompareCode(null);
  }, []);

  const handleSimClose = useCallback(() => {
    setSimScenarioId(null);
    setSimStep(0);
  }, []);

  const panelOpen = !!selectedCountry && !simScenarioId;

  return (
    <div className="app">
      <main className={`app-main${panelOpen ? ' panel-open' : ''}`}>
        {/* Map fills the entire viewport */}
        <WorldMap
          selectedCountry={selectedCode}
          onCountrySelect={setSelectedCode}
          compareCountry={compareCode}
          onCompareSelect={handleCompareSelect}
          simulationRoles={simulationRoles}
        />

        {/* Floating UI layer — pointer-events disabled on wrapper, enabled per child */}
        <div className="map-ui">
          <div className="search-overlay">
            {/* Brand + search card */}
            <div className="search-card">
              <div className="brand-mark">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>OSINT World Map</span>
              </div>

              <div className="search-row">
                <svg className="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search countries…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input input-ghost flex-1 min-w-0 h-auto py-0 px-0 text-sm focus:outline-none bg-transparent border-none"
                  aria-label="Search countries"
                />
                {searchQuery && (
                  <button
                    className="btn btn-ghost btn-xs btn-circle"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Suggestions dropdown */}
            {suggestions.length > 0 && searchQuery.length > 0 && (
              <ul className="search-suggestions">
                {suggestions.map((s) => (
                  <li key={s.code} onClick={() => handleSearchSelect(s.code)}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {s.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Country panels — hidden during simulation */}
        {!simScenarioId && (
          selectedCountry && compareCountry ? (
            <RelationshipCard
              countryA={selectedCountry}
              countryB={compareCountry}
              flagA={liveData?.flag}
              flagB={compareLiveData?.flag}
              onClose={handleCloseCompare}
              onSwap={handleSwap}
            />
          ) : selectedCountry ? (
            <InfoPanel
              country={selectedCountry}
              liveData={liveData}
              indicators={indicators}
              loading={loading}
              onClose={handleClose}
            />
          ) : null
        )}

        {/* Alliance Drag simulation — trigger button + picker + controls */}
        <AllianceDrag
          scenarioId={simScenarioId}
          step={simStep}
          onScenarioSelect={handleSimScenarioSelect}
          onStepChange={setSimStep}
          onClose={handleSimClose}
        />
      </main>
    </div>
  );
}
