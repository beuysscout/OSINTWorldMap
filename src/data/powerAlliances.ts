// ─── Power & Alliances data ──────────────────────────────────────────────────
// All country codes are ISO 3166-1 alpha-3, matching Mapbox country_boundaries
// promoteId. Each sub-layer is an independent toggle with a single fill color.

export type PowerAllianceCategory =
  // Formal alliances
  | 'nato'
  | 'csto'
  | 'sco'
  | 'aukus'
  | 'quad'
  // Spheres of influence
  | 'sphereUS'
  | 'sphereChina'
  | 'sphereRussia'
  // UN General Assembly voting clusters
  | 'unWestern'
  | 'unRussiaChinaBloc'
  // Sanctions regimes
  | 'sanctionsUS'
  | 'sanctionsEU';

export type PowerAllianceGroup = 'alliances' | 'spheres' | 'unVoting' | 'sanctions';

export interface PowerAllianceLayerDef {
  id: PowerAllianceCategory;
  label: string;
  color: string;
  description: string;
  group: PowerAllianceGroup;
}

export const POWER_ALLIANCE_LAYER_DEFS: PowerAllianceLayerDef[] = [
  // ── Formal Alliances ──────────────────────────────────────────────────────
  {
    id: 'nato',
    label: 'NATO',
    color: '#1565C0',
    description: 'North Atlantic Treaty Organization — 32 members (as of 2024)',
    group: 'alliances',
  },
  {
    id: 'csto',
    label: 'CSTO',
    color: '#B71C1C',
    description: 'Collective Security Treaty Organization — Russian-led mutual defense pact',
    group: 'alliances',
  },
  {
    id: 'sco',
    label: 'SCO',
    color: '#E65100',
    description: 'Shanghai Cooperation Organisation — Eurasian security and economic bloc',
    group: 'alliances',
  },
  {
    id: 'aukus',
    label: 'AUKUS',
    color: '#0277BD',
    description: 'AUKUS — Australia, UK, US trilateral security pact (nuclear submarine partnership)',
    group: 'alliances',
  },
  {
    id: 'quad',
    label: 'QUAD',
    color: '#00695C',
    description: 'Quadrilateral Security Dialogue — Indo-Pacific strategic forum',
    group: 'alliances',
  },

  // ── Spheres of Influence ─────────────────────────────────────────────────
  {
    id: 'sphereUS',
    label: 'US Sphere',
    color: '#1976D2',
    description: 'Countries within the US-led security and economic order (treaty allies, close partners)',
    group: 'spheres',
  },
  {
    id: 'sphereChina',
    label: 'China Sphere',
    color: '#C62828',
    description: 'Countries with strong Chinese economic dependency or diplomatic alignment (BRI, debt, trade)',
    group: 'spheres',
  },
  {
    id: 'sphereRussia',
    label: 'Russia Sphere',
    color: '#6A1B9A',
    description: 'Former Soviet states and partners under significant Russian political and military influence',
    group: 'spheres',
  },

  // ── UN Voting Clusters ────────────────────────────────────────────────────
  {
    id: 'unWestern',
    label: 'UN Western Bloc',
    color: '#1565C0',
    description: 'Countries that consistently vote with Western positions in the UN General Assembly',
    group: 'unVoting',
  },
  {
    id: 'unRussiaChinaBloc',
    label: 'UN Russia-China Bloc',
    color: '#B71C1C',
    description: 'Countries that consistently vote against Western resolutions in the UNGA',
    group: 'unVoting',
  },

  // ── Sanctions Regimes ─────────────────────────────────────────────────────
  {
    id: 'sanctionsUS',
    label: 'US Sanctions',
    color: '#E65100',
    description: 'Countries under active US (OFAC) comprehensive or sectoral sanctions programs',
    group: 'sanctions',
  },
  {
    id: 'sanctionsEU',
    label: 'EU Sanctions',
    color: '#F57F17',
    description: 'Countries under active EU comprehensive sanctions regimes',
    group: 'sanctions',
  },
];

// ─── Formal Alliance Members ──────────────────────────────────────────────────

// NATO — 32 members (Sweden joined March 2024)
export const NATO_MEMBERS: string[] = [
  'ALB', // Albania
  'BEL', // Belgium
  'BGR', // Bulgaria
  'CAN', // Canada
  'HRV', // Croatia
  'CZE', // Czech Republic
  'DNK', // Denmark
  'EST', // Estonia
  'FIN', // Finland
  'FRA', // France
  'DEU', // Germany
  'GRC', // Greece
  'HUN', // Hungary
  'ISL', // Iceland
  'ITA', // Italy
  'LVA', // Latvia
  'LTU', // Lithuania
  'LUX', // Luxembourg
  'MNE', // Montenegro
  'NLD', // Netherlands
  'MKD', // North Macedonia
  'NOR', // Norway
  'POL', // Poland
  'PRT', // Portugal
  'ROU', // Romania
  'SVK', // Slovakia
  'SVN', // Slovenia
  'ESP', // Spain
  'SWE', // Sweden
  'TUR', // Turkey
  'GBR', // United Kingdom
  'USA', // United States
];

// CSTO — 6 members (Armenia suspended active participation 2024 but remains formal member)
export const CSTO_MEMBERS: string[] = [
  'ARM', // Armenia
  'BLR', // Belarus
  'KAZ', // Kazakhstan
  'KGZ', // Kyrgyzstan
  'RUS', // Russia
  'TJK', // Tajikistan
];

// SCO — 10 full members (Iran joined 2023, Belarus joined 2024)
export const SCO_MEMBERS: string[] = [
  'BLR', // Belarus (joined 2024)
  'CHN', // China
  'IND', // India
  'IRN', // Iran (joined 2023)
  'KAZ', // Kazakhstan
  'KGZ', // Kyrgyzstan
  'PAK', // Pakistan
  'RUS', // Russia
  'TJK', // Tajikistan
  'UZB', // Uzbekistan
];

// AUKUS — 3 members
export const AUKUS_MEMBERS: string[] = [
  'AUS', // Australia
  'GBR', // United Kingdom
  'USA', // United States
];

// QUAD — 4 members
export const QUAD_MEMBERS: string[] = [
  'AUS', // Australia
  'IND', // India
  'JPN', // Japan
  'USA', // United States
];

// ─── Spheres of Influence ─────────────────────────────────────────────────────
// These are analytical categories — weighted toward military treaty partners,
// economic dependency, and diplomatic alignment rather than strict membership.

// US Sphere — treaty allies and close security partners
export const US_SPHERE_COUNTRIES: string[] = [
  // NATO (all included above, repeated here for sphere completeness)
  'ALB', 'BEL', 'BGR', 'CAN', 'HRV', 'CZE', 'DNK', 'EST', 'FIN', 'FRA',
  'DEU', 'GRC', 'HUN', 'ISL', 'ITA', 'LVA', 'LTU', 'LUX', 'MNE', 'NLD',
  'MKD', 'NOR', 'POL', 'PRT', 'ROU', 'SVK', 'SVN', 'ESP', 'SWE', 'TUR',
  'GBR', 'USA',
  // Indo-Pacific treaty allies & partners
  'AUS', // ANZUS, AUKUS, QUAD
  'NZL', // ANZUS
  'JPN', // US-Japan Security Treaty
  'KOR', // US-Korea Mutual Defense Treaty
  'PHL', // US-Philippines Mutual Defense Treaty
  'THA', // Major non-NATO ally
  'SGP', // Key security partner
  // Middle East partners
  'ISR', // Major non-NATO ally
  'SAU', // Defense partner
  'ARE', // Major non-NATO ally
  'QAT', // Hosts Al Udeid Air Base
  'KWT', // Hosts US forces
  'BHR', // Hosts US 5th Fleet
  'JOR', // Major non-NATO ally
  'EGY', // Major non-NATO ally
  // Latin America
  'COL', // Major non-NATO ally
  'CHL', // Strong economic and diplomatic ties
];

// China Sphere — BRI strategic partners, economic dependency, diplomatic alignment
export const CHINA_SPHERE_COUNTRIES: string[] = [
  // Central/South Asia
  'PAK', // CPEC flagship, deep military ties
  'KAZ', // Major BRI partner, energy trade
  'UZB', // BRI connectivity hub
  'TJK', // Military base, BRI
  'KGZ', // Heavy Chinese debt
  'NPL', // BRI projects, growing ties
  'LKA', // Hambantota Port debt diplomacy
  'BGD', // Major Chinese investment
  // Southeast Asia
  'KHM', // Strong political alignment, Chinese investment
  'LAO', // High-speed rail debt, BRI
  'MMR', // CMEC pipeline, military ties
  // Africa (clear alignment)
  'ETH', // Major BRI/infrastructure partner
  'ZMB', // Heavy Chinese debt
  'ZWE', // Diplomatic and economic lifeline
  'COD', // Cobalt mining investment
  'SDN', // Oil infrastructure, arms
  'AGO', // Oil and infrastructure
  'NGA', // Infrastructure loans
  // Latin America
  'VEN', // Oil-for-loans, political alignment
  'CUB', // Diplomatic alignment
  'NIC', // Diplomatic ties (Taiwan switch)
  'ECU', // Chinese dam projects, debt
  // Europe (partial alignment)
  'SRB', // Huawei, BRI, arms
  'HUN', // BRI member in EU, Fudan campus
];

// Russia Sphere — former Soviet states + close partners under strong Russian influence
export const RUSSIA_SPHERE_COUNTRIES: string[] = [
  'BLR', // Effectively integrated — Union State
  'ARM', // CSTO, deep Russian military presence
  'KAZ', // CSTO, large Russian minority, economic ties
  'KGZ', // CSTO, Russian base at Kant
  'TJK', // CSTO, Russian 201st base
  'UZB', // Historical ties, energy dependency
  'GEO', // Occupied territories (Abkhazia, S. Ossetia)
  'MDA', // Transnistria occupation
  'SYR', // Military intervention, Tartus base
  'IRN', // Deep defense and energy partnership
  'SRB', // Energy dependency, historical alignment (also in China sphere)
  'NIC', // Diplomatic alignment
  'CUB', // Historical alignment (also China sphere)
  'VEN', // Military ties, oil (also China sphere)
  'ETH', // Arms sales (also China sphere)
  'MLI', // Wagner Group presence
  'CAF', // Wagner Group presence
  'BFA', // Wagner Group / AES
  'NER', // Post-coup Russian alignment
  'LBY', // Wagner forces in east
];

// ─── UN General Assembly Voting Clusters ──────────────────────────────────────
// Based on votes on Ukraine sovereignty/territorial integrity resolutions (2022–2024)
// and broader pattern of alignment with Western vs. Russia-China positions.

// UN Western Bloc — consistently vote with US/EU majority on key resolutions
export const UN_WESTERN_BLOC: string[] = [
  // Europe
  'ALB', 'AND', 'AUT', 'BEL', 'BGR', 'HRV', 'CYP', 'CZE', 'DNK', 'EST',
  'FIN', 'FRA', 'DEU', 'GRC', 'HUN', 'ISL', 'IRL', 'ITA', 'LVA', 'LIE',
  'LTU', 'LUX', 'MLT', 'MCO', 'MNE', 'NLD', 'MKD', 'NOR', 'POL', 'PRT',
  'ROU', 'SMR', 'SVK', 'SVN', 'ESP', 'SWE', 'CHE', 'GBR', 'UKR', 'MDA',
  'GEO', 'ARM',
  // Americas
  'USA', 'CAN', 'MEX', 'COL', 'CHL', 'PER', 'BRA', 'ARG', 'URY', 'ECU',
  'PRY', 'GTM', 'SLV', 'HND', 'CRI', 'PAN', 'DOM', 'JAM', 'HTI',
  // Asia-Pacific
  'AUS', 'NZL', 'JPN', 'KOR', 'SGP', 'THA', 'PHL', 'IDN', 'MYS',
  // Middle East / Africa (selective)
  'ISR', 'JOR', 'TUN', 'MAR', 'SEN', 'GHA', 'KEN', 'RWA', 'BWA',
];

// UN Russia-China Bloc — consistently vote against Western majority resolutions
export const UN_RUSSIA_CHINA_BLOC: string[] = [
  'RUS', // Russia
  'CHN', // China
  'BLR', // Belarus
  'PRK', // North Korea
  'SYR', // Syria
  'CUB', // Cuba
  'NIC', // Nicaragua
  'ERI', // Eritrea
  'MLI', // Mali (post-coup)
  'NER', // Niger (post-coup)
  'BFA', // Burkina Faso (post-coup)
  'CAF', // Central African Republic
  'ZWE', // Zimbabwe
  'SDN', // Sudan
  'IRN', // Iran
  'VEN', // Venezuela
  'BOL', // Bolivia
  'LAO', // Laos
  'KHM', // Cambodia
  'PAK', // Pakistan (abstained on Ukraine but often aligned with bloc)
];

// ─── Sanctions Regimes ────────────────────────────────────────────────────────

// US Sanctions — active OFAC comprehensive or broad sectoral programs (2024)
export const US_SANCTIONS_COUNTRIES: string[] = [
  'CUB', // Cuba — embargo since 1962
  'IRN', // Iran — comprehensive sanctions
  'PRK', // North Korea — comprehensive sanctions
  'SYR', // Syria — comprehensive sanctions
  'RUS', // Russia — broad sectoral sanctions (post-2022)
  'BLR', // Belarus — broad sectoral sanctions
  'VEN', // Venezuela — senior officials, oil sector
  'MMR', // Myanmar — military junta sanctions
  'ZWE', // Zimbabwe — targeted sanctions
  'SDN', // Sudan — ongoing programs
  'YEM', // Yemen — Houthi/conflict related
  'LBY', // Libya — arms embargo, targeted
  'MLI', // Mali — Wagner/junta related
  'CAF', // Central African Republic — arms embargo
  'NIC', // Nicaragua — Magnitsky-style
  'HKG', // Hong Kong — autonomy-related (limited)
];

// EU Sanctions — active comprehensive EU sanctions regimes (2024)
export const EU_SANCTIONS_COUNTRIES: string[] = [
  'RUS', // Russia — comprehensive (post-2022, 14+ packages)
  'BLR', // Belarus — comprehensive
  'IRN', // Iran — IRGC, nuclear, drones
  'SYR', // Syria — comprehensive
  'PRK', // North Korea — comprehensive
  'MMR', // Myanmar — military junta
  'ZWE', // Zimbabwe — targeted
  'SDN', // Sudan — arms embargo
  'LBY', // Libya — arms embargo
  'YEM', // Yemen — Houthi
  'MLI', // Mali — junta, Wagner
  'CAF', // Central African Republic
  'NER', // Niger — post-coup
  'BFA', // Burkina Faso — post-coup
  'HTI', // Haiti — gang leaders
  'GNB', // Guinea-Bissau — targeted
];
