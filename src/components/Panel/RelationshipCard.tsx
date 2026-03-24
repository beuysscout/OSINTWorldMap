import { useMemo } from 'react';
import type { CountryStaticData, LiveCountryData } from '../../types';
import { computeRelationship, type RelationshipLevel } from '../../data/relationships';

interface RelationshipCardProps {
  countryA: CountryStaticData;
  countryB: CountryStaticData;
  flagA?: string | null;
  flagB?: string | null;
  onClose: () => void;
  onSwap: () => void;
}

const LEVEL_STYLES: Record<RelationshipLevel, { color: string; bg: string; dot: string }> = {
  ally:    { color: '#1a7f4b', bg: 'rgba(26,127,75,0.1)',   dot: '#1a7f4b' },
  partner: { color: '#1d6fa8', bg: 'rgba(29,111,168,0.1)',  dot: '#1d6fa8' },
  neutral: { color: '#7a6a30', bg: 'rgba(122,106,48,0.1)',  dot: '#9a8840' },
  rival:   { color: '#b5371a', bg: 'rgba(181,55,26,0.1)',   dot: '#c94124' },
};

export default function RelationshipCard({
  countryA,
  countryB,
  flagA,
  flagB,
  onClose,
  onSwap,
}: RelationshipCardProps) {
  const rel = useMemo(() => computeRelationship(countryA, countryB), [countryA, countryB]);
  const style = LEVEL_STYLES[rel.level];

  const hasTrade = rel.tradeLink.aListsB || rel.tradeLink.bListsA;
  const hasTension = rel.tension.aListsB || rel.tension.bListsA;
  const hasCultural = rel.sharedLanguages.length > 0 || rel.sharedReligions.length > 0;

  return (
    <div className="rel-card">
      {/* Header */}
      <div className="rel-header">
        <div className="rel-countries">
          <div className="rel-country-a">
            {flagA && (
              <img src={flagA} alt={countryA.name} className="rel-flag rel-flag-a" />
            )}
            <span className="rel-country-name">{countryA.name}</span>
          </div>

          <button
            className="rel-swap-btn"
            onClick={onSwap}
            title="Swap countries"
            aria-label="Swap countries"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 16V4m0 0L3 8m4-4l4 4" />
              <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>

          <div className="rel-country-b">
            <span className="rel-country-name">{countryB.name}</span>
            {flagB && (
              <img src={flagB} alt={countryB.name} className="rel-flag rel-flag-b" />
            )}
          </div>
        </div>

        <button
          className="btn btn-ghost btn-sm btn-circle text-base-content/50"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Relationship level badge */}
      <div className="rel-level-bar" style={{ background: style.bg }}>
        <span className="rel-level-dot" style={{ background: style.dot }} />
        <span className="rel-level-label" style={{ color: style.color }}>{rel.levelLabel}</span>
        <span className="rel-level-sub" style={{ color: style.color }}>
          {rel.level === 'rival' && 'Designated rivals'}
          {rel.level === 'ally' && 'Formal alliance members'}
          {rel.level === 'partner' && 'Bilateral trade relationship'}
          {rel.level === 'neutral' && rel.sharedAlliances.length > 0 && 'Rivals with shared memberships'}
          {rel.level === 'neutral' && rel.sharedAlliances.length === 0 && 'Limited documented ties'}
        </span>
      </div>

      <div className="rel-body">
        {/* Shared organizations */}
        {rel.sharedAlliances.length > 0 && (
          <div className="rel-section">
            <div className="rel-section-label">Shared Organizations</div>
            <div className="tag-list">
              {rel.sharedAlliances.map((a) => (
                <span key={a} className="badge badge-outline badge-info badge-sm">{a}</span>
              ))}
            </div>
          </div>
        )}

        {/* Trade */}
        {hasTrade && (
          <div className="rel-section">
            <div className="rel-section-label">Trade Relationship</div>
            <ul className="rel-list">
              {rel.tradeLink.aListsB && (
                <li className="rel-list-item rel-list-item--trade">
                  {countryA.name} lists {countryB.name} as a major trade partner
                </li>
              )}
              {rel.tradeLink.bListsA && (
                <li className="rel-list-item rel-list-item--trade">
                  {countryB.name} lists {countryA.name} as a major trade partner
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Tensions */}
        {hasTension && (
          <div className="rel-section">
            <div className="rel-section-label">Tensions &amp; Disputes</div>
            <ul className="rel-list">
              {rel.tension.aListsB && (
                <li className="rel-list-item rel-list-item--tension">
                  {countryA.name} designates {countryB.name} as a rival or adversary
                </li>
              )}
              {rel.tension.bListsA && (
                <li className="rel-list-item rel-list-item--tension">
                  {countryB.name} designates {countryA.name} as a rival or adversary
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Cultural links */}
        {hasCultural ? (
          <div className="rel-section">
            <div className="rel-section-label">Cultural Links</div>
            {rel.sharedLanguages.length > 0 && (
              <div className="rel-sub-row">
                <span className="rel-sub-label">Languages</span>
                <div className="tag-list">
                  {rel.sharedLanguages.map((l) => (
                    <span key={l} className="badge badge-outline badge-primary badge-sm">{l}</span>
                  ))}
                </div>
              </div>
            )}
            {rel.sharedReligions.length > 0 && (
              <div className="rel-sub-row">
                <span className="rel-sub-label">Religions</span>
                <div className="tag-list">
                  {rel.sharedReligions.map((r) => (
                    <span key={r} className="badge badge-outline badge-primary badge-sm">{r}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="rel-section">
            <div className="rel-section-label">Cultural Links</div>
            <p className="rel-empty">No shared official languages or religions on record.</p>
          </div>
        )}

        {/* Strategic interests overlap */}
        <div className="rel-section">
          <div className="rel-section-label">Individual Strategic Interests</div>
          <div className="rel-interests-grid">
            <div className="rel-interests-col">
              <div className="rel-interests-country">{countryA.name}</div>
              <ul className="rel-list">
                {countryA.geopolitics.strategicInterests.map((s) => (
                  <li key={s} className="rel-list-item rel-list-item--neutral">{s}</li>
                ))}
              </ul>
            </div>
            <div className="rel-interests-col">
              <div className="rel-interests-country">{countryB.name}</div>
              <ul className="rel-list">
                {countryB.geopolitics.strategicInterests.map((s) => (
                  <li key={s} className="rel-list-item rel-list-item--neutral">{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
