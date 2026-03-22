export type TradeLaneCategory =
  | 'shipping'
  | 'energy'
  | 'chokepoints'
  | 'bri'
  | 'commodity'
  | 'ports'
  | 'pipelines'
  | 'cables';

export interface TradeLane {
  id: string;
  name: string;
  category: TradeLaneCategory;
  coordinates: [number, number][]; // [lat, lng]
  description?: string;
}

export interface Chokepoint {
  id: string;
  name: string;
  coordinates: [number, number]; // [lat, lng]
  description: string;
  throughput: string;
}

export interface TradeLaneLayerDef {
  id: TradeLaneCategory;
  label: string;
  color: string;
  description: string;
}

export interface Port {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number]; // [lat, lng]
  teuCapacity: number;           // millions TEU/year — used to scale marker radius
  rank: number;
  description?: string;
}

export const LAYER_DEFS: TradeLaneLayerDef[] = [
  {
    id: 'shipping',
    label: 'Maritime Shipping',
    color: '#4fc3f7',
    description: 'Major container & cargo shipping routes',
  },
  {
    id: 'energy',
    label: 'Energy Corridors',
    color: '#ffb74d',
    description: 'Oil & gas tanker routes and pipeline corridors',
  },
  {
    id: 'chokepoints',
    label: 'Chokepoints',
    color: '#ef5350',
    description: 'Strategic maritime chokepoints',
  },
  {
    id: 'bri',
    label: 'Belt & Road',
    color: '#ffd54f',
    description: "China's Belt and Road Initiative corridors",
  },
  // ── Trade Corridors group ──────────────────────────────────────────────
  {
    id: 'commodity',
    label: 'Commodity Flows',
    color: '#a5d6a7',
    description: 'Grain corridors, rare earth minerals, critical minerals, and LNG flows',
  },
  // ── Infrastructure group ───────────────────────────────────────────────
  {
    id: 'ports',
    label: 'Major Ports',
    color: '#80cbc4',
    description: 'Top 20 global container ports scaled by TEU capacity',
  },
  {
    id: 'pipelines',
    label: 'Pipelines',
    color: '#ffcc80',
    description: 'Major overland oil and gas pipeline infrastructure',
  },
  {
    id: 'cables',
    label: 'Submarine Cables',
    color: '#ce93d8',
    description: 'Major undersea fiber optic cable systems',
  },
];

// ── Maritime Shipping Routes ───────────────────────────────────────────────

export const shippingLanes: TradeLane[] = [
  {
    id: 'trans-pacific-north',
    name: 'Trans-Pacific (Asia → US West Coast)',
    category: 'shipping',
    coordinates: [
      [31.2, 121.5],  // Shanghai
      [34.7, 137],    // Japanese coast
      [45, 165],      // North Pacific
      [50, -178],     // Aleutian arc
      [45, -155],     // NE Pacific
      [33.7, -118.2], // Los Angeles
    ],
    description: 'The world\'s busiest trade corridor by value. ~$600B in annual trade.',
  },
  {
    id: 'asia-europe-suez',
    name: 'Asia–Europe (via Suez Canal)',
    category: 'shipping',
    coordinates: [
      [31.2, 121.5],  // Shanghai
      [22.3, 114.2],  // Hong Kong
      [1.3, 103.8],   // Singapore / Malacca
      [12.6, 43.4],   // Bab-el-Mandeb
      [29.9, 32.3],   // Suez Canal
      [37.0, 15.0],   // Mediterranean
      [36.1, -5.4],   // Gibraltar
      [44.0, -10.0],  // Bay of Biscay
      [51.9, 4.5],    // Rotterdam
    ],
    description: 'The primary container artery between Asia and Europe (~20,000 km).',
  },
  {
    id: 'trans-atlantic',
    name: 'Trans-Atlantic (US–Europe)',
    category: 'shipping',
    coordinates: [
      [40.7, -74.0],  // New York
      [44.0, -50.0],  // Mid-Atlantic
      [48.0, -20.0],  // East Atlantic
      [51.9, 4.5],    // Rotterdam
    ],
    description: 'Core North Atlantic route connecting US and European markets.',
  },
  {
    id: 'south-atlantic',
    name: 'South Atlantic (South America–Europe)',
    category: 'shipping',
    coordinates: [
      [-23.9, -46.3], // Santos
      [-10.0, -35.0], // Brazil coast
      [0.0, -20.0],   // Equatorial Atlantic
      [14.0, -18.0],  // West Africa waypoint
      [36.1, -5.4],   // Gibraltar
      [51.9, 4.5],    // Rotterdam
    ],
    description: 'Major route for Brazilian agriculture and South American exports.',
  },
  {
    id: 'cape-route',
    name: 'Cape of Good Hope Route',
    category: 'shipping',
    coordinates: [
      [31.2, 121.5],  // Shanghai
      [1.3, 103.8],   // Singapore
      [-8.0, 115.0],  // Java Sea
      [-34.4, 18.5],  // Cape of Good Hope
      [0.0, -10.0],   // South Atlantic
      [36.1, -5.4],   // Gibraltar
      [51.9, 4.5],    // Rotterdam
    ],
    description: 'Alternative to Suez; used during canal disruptions.',
  },
  {
    id: 'intra-asia',
    name: 'Intra-Asia (Shanghai–Singapore)',
    category: 'shipping',
    coordinates: [
      [31.2, 121.5],  // Shanghai
      [22.3, 114.2],  // Hong Kong
      [15.0, 109.0],  // South China Sea
      [10.8, 106.7],  // Ho Chi Minh
      [1.3, 103.8],   // Singapore
    ],
    description: 'One of the highest-frequency container routes globally.',
  },
  {
    id: 'asia-australia',
    name: 'Asia–Australia',
    category: 'shipping',
    coordinates: [
      [1.3, 103.8],   // Singapore
      [-8.0, 115.0],  // Lombok Strait
      [-18.0, 132.0], // Timor Sea
      [-27.5, 153.0], // Brisbane
      [-33.9, 151.2], // Sydney
    ],
    description: 'Key route for Australian resource exports and Asian manufactured goods.',
  },
  {
    id: 'us-east-europe-med',
    name: 'US East Coast–Mediterranean',
    category: 'shipping',
    coordinates: [
      [40.7, -74.0],  // New York
      [36.0, -60.0],  // Bermuda area
      [36.1, -5.4],   // Gibraltar
      [37.0, 15.0],   // Central Med
      [37.9, 23.7],   // Piraeus (Athens)
    ],
    description: 'Connects US with Southern European and Mediterranean markets.',
  },
];

// ── Energy Corridors ──────────────────────────────────────────────────────

export const energyCorridors: TradeLane[] = [
  {
    id: 'persian-gulf-asia',
    name: 'Persian Gulf → East Asia (Oil)',
    category: 'energy',
    coordinates: [
      [26.5, 56.5],   // Strait of Hormuz
      [12.6, 43.4],   // Bab-el-Mandeb (some bypass)
      [8.0, 73.0],    // Indian Ocean
      [1.3, 103.8],   // Strait of Malacca
      [22.3, 114.2],  // South China Sea
      [31.2, 121.5],  // China
      [35.7, 139.7],  // Japan
    ],
    description: '~20 million bpd; the world\'s most critical energy corridor.',
  },
  {
    id: 'persian-gulf-europe',
    name: 'Persian Gulf → Europe (Oil)',
    category: 'energy',
    coordinates: [
      [26.5, 56.5],   // Strait of Hormuz
      [12.6, 43.4],   // Bab-el-Mandeb
      [29.9, 32.3],   // Suez Canal
      [37.0, 15.0],   // Mediterranean
      [43.0, 10.0],   // Italy
      [51.9, 4.5],    // Northwest Europe
    ],
    description: 'Middle Eastern crude to European refineries via Suez.',
  },
  {
    id: 'russian-pipeline-west',
    name: 'Russian Energy Corridor (West)',
    category: 'energy',
    coordinates: [
      [60.0, 56.0],   // Urals
      [55.8, 37.6],   // Moscow hub
      [52.0, 23.0],   // Belarus
      [52.0, 15.0],   // Poland
      [51.5, 7.0],    // Germany
      [51.9, 4.5],    // Netherlands
    ],
    description: 'Former dominant gas/oil pipeline network supplying Europe (Druzhba).',
  },
  {
    id: 'north-sea',
    name: 'North Sea Oil Routes',
    category: 'energy',
    coordinates: [
      [61.0, 2.0],    // North Sea fields
      [57.2, 2.0],    // Scotland area
      [53.5, 0.0],    // UK east coast
      [51.9, 4.5],    // Rotterdam
    ],
    description: 'Norwegian and UK North Sea oil production distribution.',
  },
  {
    id: 'west-africa-europe',
    name: 'West Africa → Europe (Oil)',
    category: 'energy',
    coordinates: [
      [4.3, 3.4],     // Lagos / Niger Delta
      [0.0, 0.0],     // Gulf of Guinea
      [14.0, -18.0],  // West Africa coast
      [36.1, -5.4],   // Gibraltar
      [51.9, 4.5],    // Europe
    ],
    description: 'Nigerian and Angolan crude to European and US markets.',
  },
  {
    id: 'us-gulf-exports',
    name: 'US Gulf Coast LNG Exports',
    category: 'energy',
    coordinates: [
      [29.7, -90.0],  // US Gulf Coast
      [22.0, -80.0],  // Caribbean
      [36.1, -5.4],   // Gibraltar
      [44.0, -10.0],  // Bay of Biscay
      [51.9, 4.5],    // Europe
    ],
    description: 'Growing US LNG exports filling European energy demand.',
  },
];

// ── Strategic Chokepoints ─────────────────────────────────────────────────

export const chokepoints: Chokepoint[] = [
  {
    id: 'malacca',
    name: 'Strait of Malacca',
    coordinates: [2.0, 101.5],
    description: 'Narrowest major shipping lane (~2.8 km at Phillips Channel). Links Indian and Pacific Oceans.',
    throughput: '~90,000 vessels/year; 40% of global trade',
  },
  {
    id: 'suez',
    name: 'Suez Canal',
    coordinates: [30.5, 32.3],
    description: 'Connects Red Sea and Mediterranean. Opened 1869; expanded 2015.',
    throughput: '~20,000 ships/year; 12% of global trade',
  },
  {
    id: 'hormuz',
    name: 'Strait of Hormuz',
    coordinates: [26.5, 56.8],
    description: 'Only sea route out of the Persian Gulf. Critical for global oil supply.',
    throughput: '~21 million bpd (~21% of global oil)',
  },
  {
    id: 'bab-el-mandeb',
    name: 'Bab-el-Mandeb',
    coordinates: [12.6, 43.4],
    description: 'Strait between Yemen, Djibouti, and Eritrea. Gateway to Red Sea.',
    throughput: '~6 million bpd; ~10% of global trade',
  },
  {
    id: 'gibraltar',
    name: 'Strait of Gibraltar',
    coordinates: [35.9, -5.6],
    description: 'Gateway between Atlantic Ocean and Mediterranean Sea.',
    throughput: '~100 vessels/day; gateway for Suez-bound traffic',
  },
  {
    id: 'panama',
    name: 'Panama Canal',
    coordinates: [9.1, -79.7],
    description: 'Connects Atlantic and Pacific Oceans. Expanded 2016 for neo-Panamax ships.',
    throughput: '~14,000 vessels/year; ~5% of global trade',
  },
  {
    id: 'bosphorus',
    name: 'Turkish Straits (Bosphorus)',
    coordinates: [41.1, 29.0],
    description: 'Links Black Sea and Mediterranean. Critical for Russian Black Sea Fleet and Caspian oil exports.',
    throughput: '~50,000 vessels/year; ~3 million bpd oil',
  },
  {
    id: 'danish-straits',
    name: 'Danish Straits',
    coordinates: [56.0, 10.5],
    description: 'Access routes into the Baltic Sea. Controls access for Russian Baltic Fleet.',
    throughput: '~60,000 vessels/year; key for Baltic trade',
  },
  {
    id: 'lombok',
    name: 'Lombok Strait',
    coordinates: [-8.7, 115.8],
    description: 'Alternative to Malacca for large vessels unable to transit. Between Bali and Lombok.',
    throughput: 'Alternative deep-water route for supertankers',
  },
  {
    id: 'cape-good-hope',
    name: 'Cape of Good Hope',
    coordinates: [-34.4, 18.5],
    description: 'Southern tip of Africa. Alternative route bypassing Suez and Bab-el-Mandeb.',
    throughput: 'Critical Suez alternative; ~6,000+ vessels/year',
  },
];

// ── Belt & Road Initiative ────────────────────────────────────────────────

export const briRoutes: TradeLane[] = [
  {
    id: 'bri-silk-road-rail',
    name: 'New Silk Road (Rail)',
    category: 'bri',
    coordinates: [
      [31.2, 121.5],  // Shanghai
      [34.0, 108.9],  // Xi'an
      [39.5, 75.5],   // Kashgar
      [41.3, 69.3],   // Tashkent
      [51.2, 51.4],   // Aktobe
      [52.0, 37.0],   // Russia/Ukraine border
      [52.0, 23.0],   // Belarus
      [52.5, 13.4],   // Berlin
      [51.9, 4.5],    // Rotterdam
    ],
    description: 'China-Europe freight rail — up to 50% faster than sea freight.',
  },
  {
    id: 'bri-maritime-silk-road',
    name: 'Maritime Silk Road',
    category: 'bri',
    coordinates: [
      [22.3, 114.2],  // Hong Kong
      [1.3, 103.8],   // Singapore
      [6.9, 79.8],    // Colombo (Sri Lanka)
      [11.6, 43.1],   // Djibouti
      [29.9, 32.3],   // Suez Canal
      [37.0, 15.0],   // Mediterranean
      [36.1, -5.4],   // Gibraltar
      [38.7, -9.1],   // Lisbon
      [51.9, 4.5],    // Rotterdam
    ],
    description: 'Modern maritime equivalent of the ancient Silk Road sea route.',
  },
  {
    id: 'bri-cpec',
    name: 'China-Pakistan Economic Corridor (CPEC)',
    category: 'bri',
    coordinates: [
      [31.2, 121.5],  // Shanghai
      [34.0, 108.9],  // Xi'an
      [39.5, 75.5],   // Kashgar
      [36.7, 73.0],   // Gilgit
      [30.0, 71.0],   // Punjab Pakistan
      [24.9, 67.0],   // Gwadar / Karachi
    ],
    description: '$62B+ infrastructure corridor linking Xinjiang to Gwadar port.',
  },
  {
    id: 'bri-china-russia',
    name: 'China–Russia Corridor',
    category: 'bri',
    coordinates: [
      [31.2, 121.5],  // Shanghai
      [39.9, 116.4],  // Beijing
      [47.9, 106.9],  // Ulaanbaatar
      [52.3, 104.3],  // Irkutsk
      [56.0, 92.0],   // Krasnoyarsk
      [56.9, 60.6],   // Yekaterinburg
      [55.8, 37.6],   // Moscow
    ],
    description: 'China-Russia rail and road connectivity under BRI framework.',
  },
  {
    id: 'bri-china-africa',
    name: 'China–Africa Links',
    category: 'bri',
    coordinates: [
      [22.3, 114.2],  // Hong Kong
      [1.3, 103.8],   // Singapore
      [-8.0, 73.0],   // Indian Ocean
      [-4.3, 39.7],   // Mombasa
      [0.0, 32.6],    // Kampala
      [-25.9, 32.6],  // Maputo
    ],
    description: 'Maritime and rail links connecting China with East African ports and corridors.',
  },
];

// ── Commodity Flows ───────────────────────────────────────────────────────

export const commodityFlows: TradeLane[] = [
  {
    id: 'grain-black-sea',
    name: 'Black Sea Grain Corridor',
    category: 'commodity',
    coordinates: [
      [46.5, 30.7],   // Odesa
      [41.0, 29.0],   // Bosphorus
      [37.0, 25.0],   // Aegean
      [36.1, -5.4],   // Gibraltar
      [14.0, -18.0],  // West Africa (MENA)
      [51.9, 4.5],    // Rotterdam
    ],
    description: 'Ukrainian & Russian wheat, corn, and sunflower oil exports — ~25% of global wheat trade.',
  },
  {
    id: 'grain-us-gulf',
    name: 'US Gulf Grain Exports',
    category: 'commodity',
    coordinates: [
      [29.7, -90.0],  // US Gulf Coast
      [22.0, -70.0],  // Caribbean
      [8.0, -40.0],   // Equatorial Atlantic
      [36.1, -5.4],   // Gibraltar (MENA / Europe)
    ],
    description: 'US corn, soy, and wheat — primary supplier to MENA and East Africa.',
  },
  {
    id: 'grain-brazil',
    name: 'Brazilian Soy & Corn Corridor',
    category: 'commodity',
    coordinates: [
      [-23.9, -46.3], // Santos
      [-10.0, -35.0], // Brazilian coast
      [0.0, -20.0],   // South Atlantic
      [-34.4, 18.5],  // Cape of Good Hope
      [1.3, 103.8],   // Singapore
      [31.2, 121.5],  // China (primary buyer, ~70%)
    ],
    description: 'Brazil is the world\'s largest soy exporter. China buys ~70% of its exports.',
  },
  {
    id: 'rare-earth-china',
    name: 'Rare Earth Minerals (China → World)',
    category: 'commodity',
    coordinates: [
      [41.0, 111.0],  // Inner Mongolia mines
      [31.2, 121.5],  // Shanghai export hub
      [1.3, 103.8],   // Singapore
      [22.0, 80.0],   // Indian Ocean
      [29.9, 32.3],   // Suez Canal
      [51.9, 4.5],    // Europe
    ],
    description: 'China controls ~60% of rare earth mining and ~85% of processing. Critical for EVs, semiconductors, and defense.',
  },
  {
    id: 'critical-minerals-drc',
    name: 'Critical Minerals (DRC → Asia)',
    category: 'commodity',
    coordinates: [
      [-11.7, 27.5],  // DRC Copperbelt (cobalt, coltan)
      [-25.9, 32.6],  // Maputo
      [-34.4, 18.5],  // Cape of Good Hope
      [0.0, 60.0],    // Indian Ocean
      [1.3, 103.8],   // Singapore
      [31.2, 121.5],  // China
    ],
    description: 'DRC cobalt (~70% of global supply) and coltan — essential for battery and semiconductor supply chains.',
  },
  {
    id: 'lng-australia',
    name: 'Australian LNG Exports',
    category: 'commodity',
    coordinates: [
      [-20.3, 118.6], // Karratha / Pilbara (NW Shelf)
      [1.3, 103.8],   // Singapore
      [22.3, 114.2],  // South China Sea
      [31.2, 121.5],  // China
      [35.7, 139.7],  // Japan
    ],
    description: 'Australia is the world\'s largest LNG exporter (~80 MT/year), supplying Japan, China, and South Korea.',
  },
  {
    id: 'lng-qatar',
    name: 'Qatari LNG → Asia',
    category: 'commodity',
    coordinates: [
      [25.3, 51.5],   // Ras Laffan
      [26.5, 56.5],   // Strait of Hormuz
      [8.0, 73.0],    // Indian Ocean
      [1.3, 103.8],   // Singapore
      [35.7, 139.7],  // Japan / South Korea
    ],
    description: 'Qatar exports ~77 MT LNG/year from Ras Laffan — the world\'s largest single LNG complex.',
  },
  {
    id: 'lithium-triangle',
    name: 'Lithium Triangle Corridor',
    category: 'commodity',
    coordinates: [
      [-22.9, -68.2], // Atacama (Chile / Bolivia / Argentina)
      [-33.0, -71.6], // Valparaíso
      [-10.0, -85.0], // Pacific
      [1.3, 103.8],   // Singapore
      [31.2, 121.5],  // China (dominant buyer)
    ],
    description: 'Chile, Bolivia, and Argentina hold >50% of world lithium reserves — critical for EV battery supply chains.',
  },
  {
    id: 'iron-ore-australia',
    name: 'Australian Iron Ore → China',
    category: 'commodity',
    coordinates: [
      [-22.0, 114.1], // Port Hedland (world\'s largest bulk port)
      [1.3, 103.8],   // Singapore / Malacca
      [22.3, 114.2],  // South China Sea
      [31.2, 121.5],  // China (mills)
    ],
    description: 'Australia supplies ~60% of China\'s iron ore imports. Port Hedland exports ~500 MT/year.',
  },
];

// ── Major Ports ───────────────────────────────────────────────────────────

export const majorPorts: Port[] = [
  { id: 'shanghai',       name: 'Shanghai',           country: 'China',         coordinates: [31.2, 121.6],  teuCapacity: 47.3, rank: 1,  description: "World's busiest container port every year since 2010." },
  { id: 'singapore',      name: 'Singapore',           country: 'Singapore',     coordinates: [1.3, 103.8],   teuCapacity: 37.5, rank: 2,  description: 'Largest transshipment hub in Southeast Asia and Indian Ocean.' },
  { id: 'ningbo',         name: 'Ningbo-Zhoushan',     country: 'China',         coordinates: [29.9, 121.6],  teuCapacity: 33.4, rank: 3,  description: 'Largest cargo port by total tonnage; critical iron ore and oil import hub.' },
  { id: 'shenzhen',       name: 'Shenzhen',            country: 'China',         coordinates: [22.5, 114.1],  teuCapacity: 28.8, rank: 4,  description: 'Gateway for Guangdong electronics and manufacturing exports.' },
  { id: 'guangzhou',      name: 'Guangzhou',           country: 'China',         coordinates: [22.8, 113.6],  teuCapacity: 25.0, rank: 5,  description: 'Pearl River Delta hub serving southern China manufacturing.' },
  { id: 'qingdao',        name: 'Qingdao',             country: 'China',         coordinates: [36.1, 120.4],  teuCapacity: 25.7, rank: 6,  description: 'North China trade node; key BRI rail connectivity point to Central Asia.' },
  { id: 'busan',          name: 'Busan',               country: 'South Korea',   coordinates: [35.1, 129.0],  teuCapacity: 22.1, rank: 7,  description: "Korea's largest port and a major Northeast Asia transshipment hub." },
  { id: 'tianjin',        name: 'Tianjin',             country: 'China',         coordinates: [38.9, 117.7],  teuCapacity: 21.7, rank: 8,  description: 'Port serving Beijing and North China industrial corridor.' },
  { id: 'hongkong',       name: 'Hong Kong',           country: 'China (SAR)',   coordinates: [22.3, 114.2],  teuCapacity: 14.0, rank: 9,  description: 'Major finance and transshipment hub; share declining vs. mainland ports.' },
  { id: 'rotterdam',      name: 'Rotterdam',           country: 'Netherlands',   coordinates: [51.9, 4.5],    teuCapacity: 15.3, rank: 10, description: "Europe's largest port and primary gateway for Northern European trade." },
  { id: 'dubai',          name: 'Jebel Ali (Dubai)',   country: 'UAE',           coordinates: [24.9, 55.1],   teuCapacity: 14.8, rank: 11, description: 'Largest port in the Middle East; DP World flagship transshipment hub.' },
  { id: 'klang',          name: 'Port Klang',          country: 'Malaysia',      coordinates: [3.0, 101.4],   teuCapacity: 14.1, rank: 12, description: "Malaysia's primary port; growing role for Malacca Strait transshipment." },
  { id: 'antwerp',        name: 'Antwerp-Bruges',      country: 'Belgium',       coordinates: [51.2, 4.4],    teuCapacity: 13.5, rank: 13, description: "Europe's second largest port; world's largest chemical cluster." },
  { id: 'xiamen',         name: 'Xiamen',              country: 'China',         coordinates: [24.5, 118.1],  teuCapacity: 12.5, rank: 14, description: 'Key Fujian province port for cross-Strait Taiwan trade.' },
  { id: 'los-angeles',    name: 'LA / Long Beach',     country: 'USA',           coordinates: [33.7, -118.2], teuCapacity: 19.1, rank: 15, description: "USA's largest port complex; gateway for trans-Pacific imports." },
  { id: 'tanjung',        name: 'Tanjung Pelepas',     country: 'Malaysia',      coordinates: [1.4, 103.5],   teuCapacity: 10.8, rank: 16, description: 'Competing Singapore-adjacent transshipment hub; Maersk and MSC base.' },
  { id: 'kaohsiung',      name: 'Kaohsiung',           country: 'Taiwan',        coordinates: [22.6, 120.3],  teuCapacity: 10.4, rank: 17, description: "Taiwan's primary industrial port; critical semiconductor supply chain node." },
  { id: 'hamburg',        name: 'Hamburg',             country: 'Germany',       coordinates: [53.5, 10.0],   teuCapacity: 8.3,  rank: 18, description: "Germany's largest seaport; Baltic and Northern European trade gateway." },
  { id: 'colombo',        name: 'Colombo',             country: 'Sri Lanka',     coordinates: [6.9, 79.8],    teuCapacity: 7.2,  rank: 19, description: 'Key Indian Ocean transshipment hub; strategic BRI port investment site.' },
  { id: 'laem-chabang',   name: 'Laem Chabang',        country: 'Thailand',      coordinates: [13.1, 100.9],  teuCapacity: 7.1,  rank: 20, description: "Thailand's main deep-sea port; hub for ASEAN automotive and electronics exports." },
];

// ── Pipelines ─────────────────────────────────────────────────────────────

export const pipelines: TradeLane[] = [
  {
    id: 'tanap-tap',
    name: 'TANAP / TAP (Southern Gas Corridor)',
    category: 'pipelines',
    coordinates: [
      [40.5, 49.8],   // Sangachal Terminal (Azerbaijan)
      [41.0, 43.0],   // Georgia
      [39.8, 36.0],   // Central Turkey
      [40.9, 28.5],   // Istanbul area
      [41.7, 26.4],   // Turkey / Greece border
      [40.6, 22.9],   // Greece (Thessaloniki)
      [41.3, 19.8],   // Albania
      [41.1, 16.9],   // Melendugno (Italy)
    ],
    description: 'TANAP (Turkey) + TAP (Greece → Italy): 3,500 km Southern Gas Corridor. Carries Azerbaijani Shah Deniz gas to European markets. ~20 bcm/year capacity.',
  },
  {
    id: 'espo',
    name: 'ESPO Pipeline (East Siberia–Pacific Ocean)',
    category: 'pipelines',
    coordinates: [
      [56.0, 57.0],   // Ural oil fields
      [56.0, 80.0],   // Western Siberia
      [52.3, 104.3],  // Irkutsk
      [51.0, 120.0],  // Chita / Zabaykalsk
      [48.5, 134.8],  // Khabarovsk
      [43.1, 131.9],  // Kozmino (Pacific terminal)
    ],
    description: '4,200 km pipeline delivering Russian crude to the Pacific. Primary energy link to China and Japan. Capacity ~80 MT/year.',
  },
  {
    id: 'central-asia-china',
    name: 'Central Asia–China Gas Pipeline',
    category: 'pipelines',
    coordinates: [
      [37.9, 58.4],   // Dauletabad field (Turkmenistan)
      [41.3, 63.0],   // Uzbekistan
      [43.0, 74.0],   // Kyrgyzstan / Kazakhstan
      [39.5, 75.5],   // Kashgar (China entry)
      [34.0, 108.9],  // Xi'an
      [31.2, 121.5],  // Shanghai
    ],
    description: 'Four parallel lines (A–D) supplying ~55 bcm/year of Turkmen gas to China. One of the longest gas pipeline systems in the world.',
  },
  {
    id: 'power-of-siberia',
    name: 'Power of Siberia (Russia → China)',
    category: 'pipelines',
    coordinates: [
      [61.7, 130.6],  // Chayanda field (Yakutia)
      [52.3, 124.0],  // Skovorodino
      [48.4, 135.0],  // Khabarovsk
      [48.0, 131.5],  // Amur crossing
      [47.9, 131.3],  // Heihe (China entry)
      [39.9, 116.4],  // Beijing
    ],
    description: '3,000 km pipeline cornerstone of Russia–China energy pivot after 2022 sanctions. Capacity 38 bcm/year; ramp-up ongoing.',
  },
  {
    id: 'druzhba',
    name: 'Druzhba Pipeline (Russia → Europe)',
    category: 'pipelines',
    coordinates: [
      [54.0, 56.0],   // Bashkortostan
      [54.0, 50.0],   // Samara hub
      [52.0, 37.0],   // Kursk / Bryansk
      [52.0, 30.0],   // Belarus branch point
      [52.5, 13.4],   // Germany (Northern branch)
      [48.5, 21.0],   // Hungary (Southern branch)
    ],
    description: 'World\'s longest oil pipeline network (~4,000 km). Major Russian crude supply route to Central/Eastern Europe — significantly curtailed post-2022.',
  },
  {
    id: 'nordstream',
    name: 'Nord Stream Route (Baltic Sea)',
    category: 'pipelines',
    coordinates: [
      [59.9, 28.7],   // Vyborg (Russia)
      [56.5, 21.0],   // Central Baltic
      [54.7, 13.8],   // Lubmin (Germany)
    ],
    description: 'Nord Stream 1 (2011) sabotaged Sept 2022; Nord Stream 2 never commissioned. Represented peak Russia-Europe gas interdependence at 55 bcm/year.',
  },
  {
    id: 'eacop',
    name: 'EACOP (East Africa Crude Oil Pipeline)',
    category: 'pipelines',
    coordinates: [
      [1.4, 31.9],    // Kabaale (Uganda oilfields)
      [-0.3, 33.0],   // Lake Victoria corridor
      [-5.5, 35.0],   // Tanzania interior
      [-6.8, 39.3],   // Tanga / Dar es Salaam coast
    ],
    description: '1,445 km heated crude pipeline Uganda → Tanzania coast. World\'s longest electrically heated pipeline. Controversial for climate and displacement impacts.',
  },
  {
    id: 'trans-saharan',
    name: 'Trans-Saharan Gas Pipeline (Planned)',
    category: 'pipelines',
    coordinates: [
      [5.5, 5.5],     // Niger Delta (Nigeria)
      [13.5, 8.5],    // Agadez (Niger)
      [25.0, 5.0],    // Southern Algeria
      [36.7, 3.1],    // Algiers
      [37.0, 10.2],   // Tunisia / Mediterranean crossing
    ],
    description: '4,128 km proposed pipeline: Nigerian gas → Europe via Algeria. Geopolitical disruption and security challenges have stalled progress for decades.',
  },
];

// ── Submarine Cables ──────────────────────────────────────────────────────

export const submarineCables: TradeLane[] = [
  {
    id: 'sea-me-we-5',
    name: 'SEA-ME-WE 5',
    category: 'cables',
    coordinates: [
      [31.2, 121.5],  // Shanghai
      [22.3, 114.2],  // Hong Kong
      [1.3, 103.8],   // Singapore
      [6.9, 79.8],    // Sri Lanka
      [12.6, 43.4],   // Djibouti
      [29.9, 32.3],   // Egypt / Suez
      [37.0, 15.0],   // Sicily
      [36.1, -5.4],   // Gibraltar
      [48.5, -4.6],   // Brest (France)
      [51.4, 0.0],    // UK
    ],
    description: 'Southeast Asia–Middle East–Western Europe 5. ~20,000 km; 24 Tbps. Connects 17 countries across 3 continents.',
  },
  {
    id: 'aae-1',
    name: 'AAE-1 (Asia–Africa–Europe 1)',
    category: 'cables',
    coordinates: [
      [35.7, 139.7],  // Japan
      [22.3, 114.2],  // Hong Kong
      [1.3, 103.8],   // Singapore
      [6.9, 79.8],    // Colombo
      [11.6, 43.1],   // Djibouti
      [29.9, 32.3],   // Egypt
      [31.2, 35.2],   // Israel
      [37.5, 15.1],   // Sicily
      [48.5, -4.6],   // France
    ],
    description: '25,000 km cable connecting Asia, Middle East, East Africa, and Europe. 40 Tbps design capacity.',
  },
  {
    id: 'marea',
    name: 'MAREA (Microsoft / Meta)',
    category: 'cables',
    coordinates: [
      [36.8, -76.0],  // Virginia Beach, USA
      [43.0, -45.0],  // North Atlantic
      [48.0, -18.0],  // Eastern Atlantic
      [43.3, -8.4],   // Bilbao, Spain
    ],
    description: '6,600 km Microsoft/Meta-owned trans-Atlantic cable. 200 Tbps capacity. One of the highest-capacity systems in the Atlantic.',
  },
  {
    id: 'dunant',
    name: 'Dunant (Google Trans-Atlantic)',
    category: 'cables',
    coordinates: [
      [36.8, -76.0],  // Virginia Beach, USA
      [44.5, -40.0],  // North Atlantic
      [47.5, -3.0],   // Saint-Hilaire-de-Riez, France
    ],
    description: 'Google-owned 6,400 km private trans-Atlantic cable. 250 Tbps capacity. Part of the growing hyperscaler private cable network.',
  },
  {
    id: 'jupiter',
    name: 'Jupiter (Amazon / Facebook Trans-Pacific)',
    category: 'cables',
    coordinates: [
      [33.7, -118.2], // Los Angeles
      [21.3, -157.8], // Hawaii
      [13.5, 144.8],  // Guam
      [1.3, 103.8],   // Singapore
      [35.7, 139.7],  // Japan
    ],
    description: '14,560 km cable (Amazon/Meta/PLDT). Connects US, Guam, Japan, and Singapore. 60 Tbps capacity.',
  },
  {
    id: 'echo',
    name: 'Echo (Google / Meta Trans-Pacific)',
    category: 'cables',
    coordinates: [
      [37.8, -122.4], // San Francisco
      [21.3, -157.8], // Hawaii
      [13.5, 144.8],  // Guam
      [1.3, 103.8],   // Singapore
    ],
    description: 'Google/Meta joint cable (~2023). ~16,000 km. Reflects accelerating hyperscaler investment in private submarine cable infrastructure.',
  },
  {
    id: 'ace',
    name: 'ACE (Africa Coast to Europe)',
    category: 'cables',
    coordinates: [
      [51.4, 0.0],    // UK
      [47.5, -3.0],   // France
      [36.1, -5.4],   // Gibraltar
      [14.7, -17.4],  // Dakar (Senegal)
      [5.3, -4.0],    // Abidjan (Ivory Coast)
      [4.3, 3.4],     // Lagos (Nigeria)
      [-6.1, 12.4],   // Angola
      [-33.9, 18.4],  // Cape Town
    ],
    description: '17,000 km cable connecting Europe to 24 African countries. Critical digital infrastructure for West and South African internet access.',
  },
  {
    id: '2africa',
    name: '2Africa (Meta)',
    category: 'cables',
    coordinates: [
      [51.9, 4.5],    // Netherlands
      [14.7, -17.4],  // Dakar
      [4.3, 3.4],     // Nigeria
      [-34.4, 18.5],  // Cape Town
      [-20.0, 57.5],  // Mauritius
      [11.6, 43.1],   // Djibouti
      [25.3, 51.5],   // Qatar
      [22.8, 70.1],   // India
      [1.3, 103.8],   // Singapore
    ],
    description: '~45,000 km Meta-led cable encircling Africa (2024–25). When complete, one of the longest submarine cable systems ever built.',
  },
  {
    id: 'tpe',
    name: 'Trans-Pacific Express (TPE)',
    category: 'cables',
    coordinates: [
      [35.7, 139.7],  // Japan
      [37.5, 126.7],  // South Korea
      [22.3, 114.2],  // China
      [35.0, -150.0], // Central Pacific
      [45.0, -124.0], // Oregon, USA
    ],
    description: '~17,700 km. Primary cable connecting China, South Korea, Japan, and the US West Coast. Significant geopolitical sensitivity.',
  },
  {
    id: 'seacom',
    name: 'SEACOM / EASSy (East Africa)',
    category: 'cables',
    coordinates: [
      [-33.9, 18.4],  // Cape Town
      [-25.9, 32.6],  // Mozambique
      [-4.0, 39.7],   // Mombasa (Kenya)
      [11.6, 43.1],   // Djibouti
      [12.9, 45.3],   // Aden
      [23.6, 57.7],   // Oman
      [29.9, 32.3],   // Egypt
      [37.5, 15.1],   // Sicily
      [51.9, 4.5],    // Europe
    ],
    description: 'SEACOM + EASSy cable system linking East African coastal countries to Europe and the Middle East. Transformed regional internet access from ~2010.',
  },
];
