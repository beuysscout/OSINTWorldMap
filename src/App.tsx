import { useState, useMemo, useCallback } from 'react';
import WorldMap from './components/Map/WorldMap';
import InfoPanel from './components/Panel/InfoPanel';
import Header from './components/UI/Header';
import { countriesData, getCountryByNumericCode } from './data/countries';
import { useLiveData } from './hooks/useCountryData';

export default function App() {
  const [selectedNumericCode, setSelectedNumericCode] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCountry = useMemo(() => {
    if (!selectedNumericCode) return null;
    return getCountryByNumericCode(selectedNumericCode) ?? null;
  }, [selectedNumericCode]);

  const { liveData, indicators, loading } = useLiveData(selectedCountry?.code ?? null);

  const suggestions = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();
    return Object.values(countriesData)
      .filter((c) => c.name.toLowerCase().includes(q))
      .slice(0, 6)
      .map((c) => ({ code: c.code, numericCode: c.numericCode, name: c.name }));
  }, [searchQuery]);

  const handleSearchSelect = useCallback((numericCode: string) => {
    setSelectedNumericCode(numericCode);
    setSearchQuery('');
  }, []);

  const handleClose = useCallback(() => {
    setSelectedNumericCode(null);
  }, []);

  return (
    <div className="app">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSelect={handleSearchSelect}
        suggestions={suggestions}
      />
      <main className={`app-main ${selectedCountry ? 'panel-open' : ''}`}>
        <div className="map-container">
          <WorldMap
            selectedCountry={selectedNumericCode}
            onCountrySelect={setSelectedNumericCode}
          />
        </div>
        {selectedCountry && (
          <InfoPanel
            country={selectedCountry}
            liveData={liveData}
            indicators={indicators}
            loading={loading}
            onClose={handleClose}
          />
        )}
      </main>
    </div>
  );
}
