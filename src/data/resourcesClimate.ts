// Resources & Climate layer data
// Sources: USGS Mineral Resources, IEA Critical Minerals 2023, WRI Aqueduct 4.0,
// FAO FAOSTAT 2021, IPCC AR6 WG2 (2022), ND-GAIN Country Index.
// All coordinates: GeoJSON [lng, lat].

export type ResourcesClimateCategory =
  | 'minerals'
  | 'waterStress'
  | 'foodImport'
  | 'climateDisplacement';

export type MineralType = 'lithium' | 'cobalt' | 'rareEarths' | 'uranium';

export interface CriticalMineral {
  id: string;
  name: string;
  mineralType: MineralType;
  country: string;
  coordinates: [number, number]; // [lng, lat]
  description?: string;
  scale: 'major' | 'significant';
}

export interface ResourcesClimateLayerDef {
  id: ResourcesClimateCategory;
  label: string;
  color: string;
  description: string;
}

export const RC_LAYER_DEFS: ResourcesClimateLayerDef[] = [
  {
    id: 'minerals',
    label: 'Critical Minerals',
    color: '#00bcd4',
    description: 'Major extraction sites for lithium, cobalt, rare earths, and uranium — the strategic materials underpinning the energy transition and modern technology.',
  },
  {
    id: 'waterStress',
    label: 'Water Stress',
    color: '#b71c1c',
    description: 'WRI Aqueduct 4.0 — ratio of water demand to available freshwater supply. Extreme stress is a major driver of conflict and migration.',
  },
  {
    id: 'foodImport',
    label: 'Wheat Import Dependency',
    color: '#ef6c00',
    description: 'Countries dependent on Russia + Ukraine for >20% of wheat imports — a strategic vulnerability exposed by the 2022 invasion. Net exporters shown in green.',
  },
  {
    id: 'climateDisplacement',
    label: 'Climate Displacement Risk',
    color: '#880e4f',
    description: 'IPCC AR6 2050 projected habitability risk — combined exposure to heat stress, sea level rise, crop failure, and extreme weather events.',
  },
];

// ── Mineral colors & labels ────────────────────────────────────────────────

export const MINERAL_COLORS: Record<MineralType, string> = {
  lithium:    '#00bcd4', // cyan
  cobalt:     '#9c27b0', // purple
  rareEarths: '#ff8f00', // amber
  uranium:    '#bf360c', // deep-orange
};

export const MINERAL_LABELS: Record<MineralType, string> = {
  lithium:    'Lithium',
  cobalt:     'Cobalt',
  rareEarths: 'Rare Earths',
  uranium:    'Uranium',
};

// ── Critical mineral deposit locations ────────────────────────────────────

export const criticalMinerals: CriticalMineral[] = [
  // ── LITHIUM ──────────────────────────────────────────────────────────────
  {
    id: 'li-atacama',
    name: 'Salar de Atacama',
    mineralType: 'lithium',
    country: 'Chile',
    coordinates: [-68.25, -23.50],
    description: "World's largest lithium brine operation. SQM & Albemarle mines supply ~40% of global lithium.",
    scale: 'major',
  },
  {
    id: 'li-uyuni',
    name: 'Salar de Uyuni',
    mineralType: 'lithium',
    country: 'Bolivia',
    coordinates: [-67.70, -20.20],
    description: 'Largest known lithium reserves (~21 Mt LCE). State-controlled; limited extraction despite enormous scale.',
    scale: 'major',
  },
  {
    id: 'li-argentina',
    name: 'Salta / Jujuy Lithium Triangle',
    mineralType: 'lithium',
    country: 'Argentina',
    coordinates: [-66.50, -24.00],
    description: 'Multiple brine projects including Cauchari-Olaroz. China (Ganfeng) and Western firms both active.',
    scale: 'major',
  },
  {
    id: 'li-pilgangoora',
    name: 'Pilgangoora Mine',
    mineralType: 'lithium',
    country: 'Australia',
    coordinates: [118.47, -21.58],
    description: 'Pilbara Minerals hard-rock spodumene mine. Among the largest lithium mines in Australia.',
    scale: 'major',
  },
  {
    id: 'li-greenbushes',
    name: 'Greenbushes Mine',
    mineralType: 'lithium',
    country: 'Australia',
    coordinates: [116.07, -33.85],
    description: "World's largest hard-rock lithium mine. Albemarle-Tianqi JV. Key Western supply anchor.",
    scale: 'major',
  },
  {
    id: 'li-tibet',
    name: 'Qinghai-Tibet Plateau Salars',
    mineralType: 'lithium',
    country: 'China',
    coordinates: [91.00, 33.00],
    description: "Major brine deposits in Qinghai province. China controls >70% of global lithium refining regardless of origin.",
    scale: 'major',
  },
  {
    id: 'li-zimbabwe',
    name: 'Arcadia / Bikita Mine',
    mineralType: 'lithium',
    country: 'Zimbabwe',
    coordinates: [31.20, -20.00],
    description: 'Significant spodumene-petalite deposit. Chinese companies (Huayou, Chengxin) have acquired major stakes.',
    scale: 'significant',
  },
  {
    id: 'li-barroso',
    name: 'Barroso Lithium Project',
    mineralType: 'lithium',
    country: 'Portugal',
    coordinates: [-7.48, 41.72],
    description: "Europe's largest lithium deposit. Central to EU battery sovereignty strategy; under development by Savannah Resources.",
    scale: 'significant',
  },

  // ── COBALT ───────────────────────────────────────────────────────────────
  {
    id: 'co-katanga',
    name: 'Katanga Copperbelt',
    mineralType: 'cobalt',
    country: 'DRC',
    coordinates: [26.00, -10.50],
    description: '>70% of global cobalt mined here. Glencore Mutanda & Kamoto operations. Artisanal (ASM) mining documented. Chinese firms control most processing.',
    scale: 'major',
  },
  {
    id: 'co-zambia',
    name: 'Zambia Copperbelt',
    mineralType: 'cobalt',
    country: 'Zambia',
    coordinates: [28.20, -12.80],
    description: 'Second-largest cobalt source alongside copper. CNMC-operated Chambishi and Nchanga mines.',
    scale: 'major',
  },
  {
    id: 'co-norilsk',
    name: 'Norilsk Complex',
    mineralType: 'cobalt',
    country: 'Russia',
    coordinates: [88.20, 69.35],
    description: "Nornickel produces ~9% of global cobalt. World's largest nickel-cobalt-palladium complex. Under Western sanctions.",
    scale: 'major',
  },
  {
    id: 'co-philippines',
    name: 'Palawan Nickel-Cobalt Laterites',
    mineralType: 'cobalt',
    country: 'Philippines',
    coordinates: [118.50, 9.80],
    description: 'Coral Bay and Taganito HPAL plants recover cobalt from laterite ores. Philippines is top-5 cobalt producer.',
    scale: 'significant',
  },
  {
    id: 'co-bou-azzer',
    name: 'Bou Azzer Mine',
    mineralType: 'cobalt',
    country: 'Morocco',
    coordinates: [-6.55, 30.53],
    description: "Africa's oldest dedicated cobalt mine. Operated by CTT/Managem Group. Small but strategic for European supply chains.",
    scale: 'significant',
  },
  {
    id: 'co-australia',
    name: 'Murrin Murrin / Ravensthorpe',
    mineralType: 'cobalt',
    country: 'Australia',
    coordinates: [121.80, -28.70],
    description: 'Nickel-cobalt laterite operations in Western Australia. Glencore and First Quantum projects.',
    scale: 'significant',
  },

  // ── RARE EARTHS ──────────────────────────────────────────────────────────
  {
    id: 're-bayan-obo',
    name: 'Bayan Obo',
    mineralType: 'rareEarths',
    country: 'China',
    coordinates: [109.97, 41.78],
    description: "World's largest REE deposit. China Northern Rare Earth controls ~60% of global light REE supply from this single complex.",
    scale: 'major',
  },
  {
    id: 're-jiangxi',
    name: 'Jiangxi Ion-Adsorption Clays',
    mineralType: 'rareEarths',
    country: 'China',
    coordinates: [115.00, 25.50],
    description: 'Primary global source of heavy REEs (dysprosium, terbium) essential for permanent magnets in EV motors and wind turbines.',
    scale: 'major',
  },
  {
    id: 're-mountain-pass',
    name: 'Mountain Pass Mine',
    mineralType: 'rareEarths',
    country: 'USA',
    coordinates: [-115.53, 35.48],
    description: 'Only active US REE mine. MP Materials produces ~15% of global supply but ore still sent to China for separation.',
    scale: 'major',
  },
  {
    id: 're-mount-weld',
    name: 'Mount Weld',
    mineralType: 'rareEarths',
    country: 'Australia',
    coordinates: [122.65, -27.38],
    description: "Highest-grade REE deposit outside China. Lynas Rare Earths — the only significant non-Chinese vertically integrated REE producer.",
    scale: 'major',
  },
  {
    id: 're-kvanefjeld',
    name: 'Kvanefjeld (Kuannersuit)',
    mineralType: 'rareEarths',
    country: 'Greenland',
    coordinates: [-45.40, 60.98],
    description: "World's 2nd largest REE deposit. Development blocked by Greenland parliament in 2021 due to uranium concerns.",
    scale: 'significant',
  },
  {
    id: 're-india',
    name: 'Odisha Beach Placer Sands',
    mineralType: 'rareEarths',
    country: 'India',
    coordinates: [85.00, 20.50],
    description: 'Monazite-bearing beach sands. Indian Rare Earths Ltd (state monopoly). India declared REEs a strategic sector in 2023.',
    scale: 'significant',
  },
  {
    id: 're-kola',
    name: 'Lovozero (Kola Peninsula)',
    mineralType: 'rareEarths',
    country: 'Russia',
    coordinates: [35.05, 67.97],
    description: 'Loparite ore complex. Russia is 3rd largest global REE producer. Supply disrupted by 2022 sanctions.',
    scale: 'significant',
  },
  {
    id: 're-brazil',
    name: 'Araxa / Catalão Complex',
    mineralType: 'rareEarths',
    country: 'Brazil',
    coordinates: [-46.95, -19.60],
    description: 'CBMM pyrochlore (niobium) with REE co-production. Brazil holds 2nd-largest global reserves but limited extraction.',
    scale: 'significant',
  },

  // ── URANIUM ──────────────────────────────────────────────────────────────
  {
    id: 'ur-athabasca',
    name: 'Athabasca Basin',
    mineralType: 'uranium',
    country: 'Canada',
    coordinates: [-108.50, 58.50],
    description: "World's highest-grade uranium deposits. Cameco's Cigar Lake & McArthur River mines. ~18% of global production.",
    scale: 'major',
  },
  {
    id: 'ur-kazakhstan',
    name: 'Chu-Sarysu & Syrdarya Basins',
    mineralType: 'uranium',
    country: 'Kazakhstan',
    coordinates: [66.50, 44.00],
    description: "World's largest uranium producer (~43% of global supply). Kazatomprom in-situ leaching. Critical for global nuclear fuel supply chains.",
    scale: 'major',
  },
  {
    id: 'ur-olympic-dam',
    name: 'Olympic Dam',
    mineralType: 'uranium',
    country: 'Australia',
    coordinates: [136.87, -30.44],
    description: "World's largest known uranium deposit. BHP Olympic Dam polymetallic mine — uranium co-produced with copper, gold, silver.",
    scale: 'major',
  },
  {
    id: 'ur-niger',
    name: 'Arlit Uranium Mines',
    mineralType: 'uranium',
    country: 'Niger',
    coordinates: [7.39, 18.74],
    description: "SOMAÏR / Orano operations supply ~5% of global uranium. 2023 coup ended French access; Russia positioning for influence.",
    scale: 'major',
  },
  {
    id: 'ur-namibia',
    name: 'Rössing & Husab Mines',
    mineralType: 'uranium',
    country: 'Namibia',
    coordinates: [15.06, -22.45],
    description: "Two major open-pit mines. CGNPC-controlled Husab is among the world's largest uranium operations. China secured long-term supply.",
    scale: 'major',
  },
  {
    id: 'ur-russia',
    name: 'Priargunsky Mine (Zabaykalsk)',
    mineralType: 'uranium',
    country: 'Russia',
    coordinates: [119.00, 51.00],
    description: "ARMZ/Rosatom underground mine. Russia controls ~46% of global uranium enrichment capacity (TVEL). Major geopolitical leverage.",
    scale: 'significant',
  },
  {
    id: 'ur-uzbekistan',
    name: 'Navoi Mining & Metallurgy',
    mineralType: 'uranium',
    country: 'Uzbekistan',
    coordinates: [65.38, 40.10],
    description: 'NMMC state enterprise. ~5% global uranium supply. Uzbekistan positioned itself as alternative to Russian/Kazakh supply.',
    scale: 'significant',
  },
];

// ── Water Stress Choropleth ────────────────────────────────────────────────
// Source: WRI Aqueduct 4.0 — national aggregate baseline water stress.

export type WaterStressLevel = 'extreme' | 'high' | 'medium-high';

export const WATER_STRESS_COLORS: Record<WaterStressLevel, string> = {
  'extreme':     '#b71c1c',
  'high':        '#e65100',
  'medium-high': '#f9a825',
};

export const WATER_STRESS_LABELS: Record<WaterStressLevel, string> = {
  'extreme':     'Extreme Stress',
  'high':        'High Stress',
  'medium-high': 'Medium-High Stress',
};

export const WATER_STRESS_DATA: Record<string, WaterStressLevel> = {
  // Extreme water stress (>80% baseline withdrawal ratio)
  BHR: 'extreme', KWT: 'extreme', QAT: 'extreme', ARE: 'extreme',
  SAU: 'extreme', OMN: 'extreme', JOR: 'extreme', ISR: 'extreme',
  PSE: 'extreme', SYR: 'extreme', IRQ: 'extreme',
  IRN: 'extreme', AFG: 'extreme', PAK: 'extreme', IND: 'extreme',
  EGY: 'extreme', LBY: 'extreme', TUN: 'extreme', DZA: 'extreme',
  MAR: 'extreme', ESP: 'extreme', PRT: 'extreme', DJI: 'extreme',
  ERI: 'extreme', YEM: 'extreme', SOM: 'extreme', TKM: 'extreme',
  UZB: 'extreme',
  // High water stress (40–80%)
  LBN: 'high', GRC: 'high', ITA: 'high', TUR: 'high',
  ZAF: 'high', BWA: 'high', ZWE: 'high', NAM: 'high',
  CHL: 'high', PER: 'high', MEX: 'high', USA: 'high',
  AUS: 'high', CHN: 'high', KAZ: 'high', MNG: 'high',
  SDN: 'high', ETH: 'high', KEN: 'high', TZA: 'high',
  NER: 'high', MLI: 'high', TJK: 'high', KGZ: 'high',
  AZE: 'high', ARM: 'high', GEO: 'high',
  // Medium-high water stress (20–40%)
  FRA: 'medium-high', DEU: 'medium-high', POL: 'medium-high',
  GBR: 'medium-high', UKR: 'medium-high', NGA: 'medium-high',
  AGO: 'medium-high', MOZ: 'medium-high', ARG: 'medium-high',
  BRA: 'medium-high', VNM: 'medium-high', THA: 'medium-high',
  MMR: 'medium-high', BGD: 'medium-high', NPL: 'medium-high',
  UGA: 'medium-high', CMR: 'medium-high', CIV: 'medium-high',
};

// ── Food Import Dependency — Wheat from Russia + Ukraine ──────────────────
// Source: FAO FAOSTAT 2021 trade data; USDA FAS reports.
// Shows % of wheat imports sourced from Russia + Ukraine (pre-2022 baseline).

export type FoodDependencyLevel = 'exporter' | 'critical' | 'high' | 'moderate';

export const FOOD_DEPENDENCY_COLORS: Record<FoodDependencyLevel, string> = {
  'exporter': '#388e3c', // green — net wheat exporter
  'critical': '#c62828', // red — >40% wheat from RU+UA
  'high':     '#ef6c00', // orange — 20–40%
  'moderate': '#f9a825', // yellow — 10–20%
};

export const FOOD_DEPENDENCY_LABELS: Record<FoodDependencyLevel, string> = {
  'exporter': 'Net Exporter',
  'critical': 'Critical (>40%)',
  'high':     'High (20–40%)',
  'moderate': 'Moderate (10–20%)',
};

export const FOOD_DEPENDENCY_DATA: Record<string, FoodDependencyLevel> = {
  // Net wheat exporters (geopolitical context anchors)
  RUS: 'exporter', UKR: 'exporter', USA: 'exporter', CAN: 'exporter',
  AUS: 'exporter', ARG: 'exporter', FRA: 'exporter', DEU: 'exporter',
  KAZ: 'exporter', ROU: 'exporter', HUN: 'exporter', BGR: 'exporter',
  // Critical dependency (>40% of national wheat imports from RU+UA)
  EGY: 'critical', LBN: 'critical', TUN: 'critical', LBY: 'critical',
  YEM: 'critical', DJI: 'critical', SOM: 'critical', ERI: 'critical',
  MRT: 'critical', MNG: 'critical', AZE: 'critical', ARM: 'critical',
  GEO: 'critical', SDN: 'critical', SSD: 'critical', MDG: 'critical',
  // High dependency (20–40%)
  TUR: 'high', IDN: 'high', SAU: 'high', ARE: 'high',
  KWT: 'high', QAT: 'high', JOR: 'high', PAK: 'high',
  BGD: 'high', NGA: 'high', GHA: 'high', SEN: 'high',
  CIV: 'high', CMR: 'high', KEN: 'high', TZA: 'high',
  ETH: 'high', MOZ: 'high', SLE: 'high', GIN: 'high',
  BEN: 'high', TGO: 'high', NER: 'high', BFA: 'high',
  // Moderate dependency (10–20%, shown for regional context)
  CHN: 'moderate', IND: 'moderate', BRA: 'moderate', MEX: 'moderate',
  THA: 'moderate', VNM: 'moderate', PHL: 'moderate', MYS: 'moderate',
  ZAF: 'moderate', NAM: 'moderate', AGO: 'moderate', ZMB: 'moderate',
  COD: 'moderate', IRN: 'moderate', IRQ: 'moderate',
};

// ── Climate Displacement Risk — 2050 Projection ───────────────────────────
// Source: IPCC AR6 WG2 (2022), Internal Displacement Monitoring Centre,
// ND-GAIN Country Index. Composite of heat stress, sea level rise,
// crop failure risk, and extreme weather exposure.

export type ClimateRiskLevel = 'critical' | 'high' | 'medium';

export const CLIMATE_RISK_COLORS: Record<ClimateRiskLevel, string> = {
  'critical': '#880e4f',
  'high':     '#c62828',
  'medium':   '#f57f17',
};

export const CLIMATE_RISK_LABELS: Record<ClimateRiskLevel, string> = {
  'critical': 'Critical Risk',
  'high':     'High Risk',
  'medium':   'Medium Risk',
};

export const CLIMATE_RISK_DATA: Record<string, ClimateRiskLevel> = {
  // Critical — existential or near-existential habitability risk by 2050
  BGD: 'critical', VNM: 'critical', MMR: 'critical', MDV: 'critical',
  TUV: 'critical', KIR: 'critical', MHL: 'critical', FSM: 'critical',
  TLS: 'critical', HTI: 'critical', SSD: 'critical', CAF: 'critical',
  TCD: 'critical', MLI: 'critical', NER: 'critical', BFA: 'critical',
  SOM: 'critical', YEM: 'critical', SYR: 'critical', MOZ: 'critical',
  MWI: 'critical', ZWE: 'critical', DJI: 'critical', VUT: 'critical',
  SLB: 'critical', NPL: 'critical',
  // High — major displacement risk, large population exposure
  PAK: 'high', PHL: 'high', KHM: 'high', LAO: 'high',
  THA: 'high', LKA: 'high', BTN: 'high', ETH: 'high',
  KEN: 'high', TZA: 'high', UGA: 'high', RWA: 'high',
  BDI: 'high', SEN: 'high', GMB: 'high', GNB: 'high',
  SLE: 'high', LBR: 'high', CIV: 'high', GHA: 'high',
  NGA: 'high', BEN: 'high', TGO: 'high', CMR: 'high',
  EGY: 'high', SDN: 'high', ERI: 'high', MRT: 'high',
  GTM: 'high', HND: 'high', NIC: 'high', BOL: 'high',
  PRY: 'high', IRQ: 'high', AGO: 'high', MDG: 'high',
  ZMB: 'high', COD: 'high',
  // Medium — significant risk requiring major adaptation investment
  IND: 'medium', IDN: 'medium', CHN: 'medium', IRN: 'medium',
  TUR: 'medium', MEX: 'medium', BRA: 'medium', COL: 'medium',
  PER: 'medium', ECU: 'medium', VEN: 'medium',
  ZAF: 'medium', NAM: 'medium', BWA: 'medium', AUS: 'medium',
  SAU: 'medium', ARE: 'medium', KWT: 'medium', QAT: 'medium',
  JOR: 'medium', LBN: 'medium', AFG: 'medium', UZB: 'medium',
  TKM: 'medium', KGZ: 'medium', MNG: 'medium',
};
