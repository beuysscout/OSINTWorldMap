import { useState } from 'react';
import type { CountryStaticData, LiveCountryData, WorldBankIndicator, TabId } from '../../types';

interface InfoPanelProps {
  country: CountryStaticData;
  liveData: LiveCountryData | null;
  indicators: WorldBankIndicator | null;
  loading: boolean;
  onClose: () => void;
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'history', label: 'History' },
  { id: 'economics', label: 'Economics' },
  { id: 'geopolitics', label: 'Geopolitics' },
  { id: 'culture', label: 'Culture' },
];

function formatNumber(n: number | undefined): string {
  if (n === undefined) return 'N/A';
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return n.toLocaleString();
}

function formatPopulation(n: number | undefined): string {
  if (n === undefined) return 'N/A';
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)} billion`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)} million`;
  return n.toLocaleString();
}

export default function InfoPanel({ country, liveData, indicators, loading, onClose }: InfoPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  return (
    <div className="info-panel">
      <div className="panel-header">
        <div className="panel-title-row">
          {liveData?.flag && <img src={liveData.flag} alt={`${country.name} flag`} className="country-flag" />}
          <div>
            <h2>{country.name}</h2>
            <span className="capital">{country.capital} &middot; {country.region}</span>
          </div>
        </div>
        <button className="close-btn" onClick={onClose} aria-label="Close panel">&times;</button>
      </div>

      <div className="tab-bar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <OverviewTab country={country} liveData={liveData} indicators={indicators} loading={loading} />
        )}
        {activeTab === 'history' && <HistoryTab country={country} />}
        {activeTab === 'economics' && <EconomicsTab country={country} indicators={indicators} loading={loading} />}
        {activeTab === 'geopolitics' && <GeopoliticsTab country={country} />}
        {activeTab === 'culture' && <CultureTab country={country} />}
      </div>
    </div>
  );
}

function OverviewTab({
  country,
  liveData,
  indicators,
  loading,
}: {
  country: CountryStaticData;
  liveData: LiveCountryData | null;
  indicators: WorldBankIndicator | null;
  loading: boolean;
}) {
  return (
    <div className="tab-overview">
      <p className="overview-text">{country.overview}</p>

      {loading && <div className="loading-indicator">Loading live data...</div>}

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Population</span>
          <span className="stat-value">{formatPopulation(liveData?.population)}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Area</span>
          <span className="stat-value">{liveData?.area ? `${liveData.area.toLocaleString()} km²` : 'N/A'}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">GDP</span>
          <span className="stat-value">{formatNumber(indicators?.gdp)}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">GDP per Capita</span>
          <span className="stat-value">{formatNumber(indicators?.gdpPerCapita)}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Government</span>
          <span className="stat-value">{country.geopolitics.governmentType}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Pop. Growth</span>
          <span className="stat-value">
            {indicators?.populationGrowth !== undefined ? `${indicators.populationGrowth.toFixed(2)}%` : 'N/A'}
          </span>
        </div>
      </div>

      {liveData?.currencies && (
        <div className="currency-info">
          <strong>Currencies: </strong>
          {Object.values(liveData.currencies)
            .map((c) => `${c.name} (${c.symbol})`)
            .join(', ')}
        </div>
      )}
    </div>
  );
}

function HistoryTab({ country }: { country: CountryStaticData }) {
  return (
    <div className="tab-history">
      <div className="timeline">
        {country.history.map((entry, i) => (
          <div key={i} className="timeline-entry">
            <div className="timeline-marker" />
            <div className="timeline-content">
              <span className="timeline-period">{entry.period}</span>
              <h4>{entry.title}</h4>
              <p>{entry.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EconomicsTab({
  country,
  indicators,
  loading,
}: {
  country: CountryStaticData;
  indicators: WorldBankIndicator | null;
  loading: boolean;
}) {
  return (
    <div className="tab-economics">
      <p>{country.economics.summary}</p>

      {loading && <div className="loading-indicator">Loading indicators...</div>}

      {indicators && (
        <div className="stats-grid" style={{ marginBottom: '1rem' }}>
          <div className="stat-card">
            <span className="stat-label">GDP</span>
            <span className="stat-value">{formatNumber(indicators.gdp)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">GDP/Capita</span>
            <span className="stat-value">{formatNumber(indicators.gdpPerCapita)}</span>
          </div>
        </div>
      )}

      <div className="info-section">
        <h4>Key Sectors</h4>
        <div className="tag-list">
          {country.economics.keySectors.map((s) => (
            <span key={s} className="tag">{s}</span>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h4>Major Trade Partners</h4>
        <div className="tag-list">
          {country.economics.tradePartners.map((p) => (
            <span key={p} className="tag tag-partner">{p}</span>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h4>Challenges</h4>
        <ul>
          {country.economics.challenges.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function GeopoliticsTab({ country }: { country: CountryStaticData }) {
  return (
    <div className="tab-geopolitics">
      <p>{country.geopolitics.summary}</p>

      <div className="info-section">
        <h4>Government Type</h4>
        <p className="highlight-text">{country.geopolitics.governmentType}</p>
      </div>

      <div className="info-section">
        <h4>Alliances &amp; Organizations</h4>
        <div className="tag-list">
          {country.geopolitics.alliances.map((a) => (
            <span key={a} className="tag tag-alliance">{a}</span>
          ))}
        </div>
      </div>

      {country.geopolitics.rivals.length > 0 && (
        <div className="info-section">
          <h4>Tensions &amp; Rivals</h4>
          <div className="tag-list">
            {country.geopolitics.rivals.map((r) => (
              <span key={r} className="tag tag-rival">{r}</span>
            ))}
          </div>
        </div>
      )}

      <div className="info-section">
        <h4>Strategic Interests</h4>
        <ul>
          {country.geopolitics.strategicInterests.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CultureTab({ country }: { country: CountryStaticData }) {
  return (
    <div className="tab-culture">
      <p>{country.culture.summary}</p>

      <div className="info-section">
        <h4>Languages</h4>
        <div className="tag-list">
          {country.culture.languages.map((l) => (
            <span key={l} className="tag">{l}</span>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h4>Religions</h4>
        <div className="tag-list">
          {country.culture.religions.map((r) => (
            <span key={r} className="tag">{r}</span>
          ))}
        </div>
      </div>

      <div className="info-section">
        <h4>Cultural Highlights</h4>
        <ul>
          {country.culture.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
