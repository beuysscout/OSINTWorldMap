import type { CountryStaticData } from '../types';

export type RelationshipLevel = 'ally' | 'partner' | 'neutral' | 'rival';

export interface CountryRelationship {
  level: RelationshipLevel;
  levelLabel: string;
  sharedAlliances: string[];
  tradeLink: { aListsB: boolean; bListsA: boolean };
  tension: { aListsB: boolean; bListsA: boolean };
  sharedLanguages: string[];
  sharedReligions: string[];
}

function nameMatch(entry: string, target: string): boolean {
  const e = entry.toLowerCase().trim();
  const t = target.toLowerCase().trim();
  return e.includes(t) || t.includes(e);
}

export function computeRelationship(a: CountryStaticData, b: CountryStaticData): CountryRelationship {
  const sharedAlliances = a.geopolitics.alliances.filter((al) =>
    b.geopolitics.alliances.some((bl) => al.toLowerCase() === bl.toLowerCase()),
  );

  const aListsBAsRival = a.geopolitics.rivals.some((r) => nameMatch(r, b.name));
  const bListsAAsRival = b.geopolitics.rivals.some((r) => nameMatch(r, a.name));

  const aListsBAsTradePartner = a.economics.tradePartners.some((p) => nameMatch(p, b.name));
  const bListsAAsTradePartner = b.economics.tradePartners.some((p) => nameMatch(p, a.name));

  const sharedLanguages = a.culture.languages.filter((l) =>
    b.culture.languages.some((bl) => l.toLowerCase() === bl.toLowerCase()),
  );

  const sharedReligions = a.culture.religions.filter((r) =>
    b.culture.religions.some((br) => r.toLowerCase() === br.toLowerCase()),
  );

  const hasTension = aListsBAsRival || bListsAAsRival;
  const hasTradeLink = aListsBAsTradePartner || bListsAAsTradePartner;
  const hasAlliances = sharedAlliances.length > 0;

  let level: RelationshipLevel;
  let levelLabel: string;

  if (hasTension && hasAlliances) {
    level = 'neutral';
    levelLabel = 'Complex';
  } else if (hasTension) {
    level = 'rival';
    levelLabel = 'Rivals';
  } else if (hasAlliances) {
    level = 'ally';
    levelLabel = 'Allied';
  } else if (hasTradeLink) {
    level = 'partner';
    levelLabel = 'Trade Partners';
  } else {
    level = 'neutral';
    levelLabel = 'No Significant Ties';
  }

  return {
    level,
    levelLabel,
    sharedAlliances,
    tradeLink: { aListsB: aListsBAsTradePartner, bListsA: bListsAAsTradePartner },
    tension: { aListsB: aListsBAsRival, bListsA: bListsAAsRival },
    sharedLanguages,
    sharedReligions,
  };
}
