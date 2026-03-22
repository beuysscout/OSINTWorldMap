export type TradeLaneCategory = 'shipping' | 'energy' | 'chokepoints' | 'bri';

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
