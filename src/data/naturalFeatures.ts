// All coordinates are GeoJSON [lng, lat]

export type NaturalFeatureCategory = 'rivers' | 'mountains' | 'deserts';

export interface NaturalLinearFeature {
  id: string;
  name: string;
  category: 'rivers' | 'mountains';
  description?: string;
  coordinates: [number, number][]; // [lng, lat]
}

export interface NaturalAreaFeature {
  id: string;
  name: string;
  category: 'deserts';
  description?: string;
  polygon: [number, number][][]; // rings [lng, lat]
}

export interface NaturalLayerDef {
  id: NaturalFeatureCategory;
  label: string;
  color: string;
  description: string;
}

export const NATURAL_LAYER_DEFS: NaturalLayerDef[] = [
  {
    id: 'rivers',
    label: 'Major Rivers',
    color: '#4fc3f7',
    description: 'Major river systems that form natural borders and strategic waterways',
  },
  {
    id: 'mountains',
    label: 'Mountain Ranges',
    color: '#a1887f',
    description: 'Major mountain ranges that form natural barriers and borders',
  },
  {
    id: 'deserts',
    label: 'Deserts',
    color: '#d4a853',
    description: 'Major desert regions that form natural barriers',
  },
];

// ── Rivers ────────────────────────────────────────────────────────────────────

export const rivers: NaturalLinearFeature[] = [
  {
    id: 'river-amazon',
    name: 'Amazon',
    category: 'rivers',
    description: 'Largest river by discharge; forms border segments between Peru, Colombia, and Brazil',
    coordinates: [
      [-76.0, -10.0], [-74.5, -8.5], [-72.0, -7.0], [-70.0, -4.5], [-68.0, -3.5],
      [-65.0, -3.0], [-62.0, -3.2], [-60.0, -3.0], [-58.0, -3.5], [-56.0, -2.5],
      [-54.0, -2.0], [-52.0, -1.8], [-50.5, -0.5],
    ],
  },
  {
    id: 'river-nile',
    name: 'Nile',
    category: 'rivers',
    description: 'Longest river; shapes the border between Sudan and Ethiopia, and defines Egypt',
    coordinates: [
      [32.5, -1.0], [31.8, 4.0], [32.5, 9.0], [33.0, 14.0],
      [33.5, 18.0], [32.5, 22.0], [32.0, 26.0], [31.2, 30.0],
    ],
  },
  {
    id: 'river-congo',
    name: 'Congo',
    category: 'rivers',
    description: 'Forms much of the border between DRC and Republic of Congo',
    coordinates: [
      [26.5, -6.0], [25.0, -4.5], [23.5, -2.5], [21.0, -1.0], [19.0, 0.5],
      [17.5, 1.5], [16.5, 1.0], [15.5, -1.5], [13.0, -4.0], [12.3, -5.8],
    ],
  },
  {
    id: 'river-niger',
    name: 'Niger',
    category: 'rivers',
    description: 'Defines borders of Mali, Niger, Benin, and Nigeria',
    coordinates: [
      [-10.5, 12.0], [-5.0, 14.5], [0.0, 16.0], [3.5, 17.0],
      [4.5, 15.5], [6.0, 14.0], [7.5, 11.5], [8.0, 9.5], [6.0, 7.0], [4.5, 5.5],
    ],
  },
  {
    id: 'river-zambezi',
    name: 'Zambezi',
    category: 'rivers',
    description: 'Forms borders between Zambia, Zimbabwe, Namibia, and Botswana',
    coordinates: [
      [22.0, -11.5], [24.5, -14.0], [26.5, -14.5], [28.0, -15.5],
      [30.0, -17.0], [32.5, -17.5], [34.5, -17.8], [35.8, -17.0],
    ],
  },
  {
    id: 'river-yangtze',
    name: 'Yangtze',
    category: 'rivers',
    description: 'Longest river in Asia; historical cultural and strategic divide in China',
    coordinates: [
      [91.0, 32.5], [96.0, 33.0], [100.0, 30.0], [103.5, 29.0],
      [106.5, 29.5], [109.5, 30.5], [112.5, 30.0], [114.5, 30.5],
      [117.0, 30.8], [119.5, 30.5], [121.5, 31.3],
    ],
  },
  {
    id: 'river-mekong',
    name: 'Mekong',
    category: 'rivers',
    description: 'Forms the border between Myanmar/Laos and Thailand/China',
    coordinates: [
      [94.5, 28.0], [98.0, 24.5], [100.0, 22.0], [101.5, 19.5],
      [102.5, 18.0], [104.0, 16.5], [105.0, 14.0], [106.0, 12.0],
      [106.8, 10.5],
    ],
  },
  {
    id: 'river-danube',
    name: 'Danube',
    category: 'rivers',
    description: 'Forms borders between 10 European countries including Romania, Bulgaria, and Serbia',
    coordinates: [
      [8.5, 48.0], [13.0, 48.5], [17.0, 48.0], [19.5, 47.5],
      [22.0, 46.5], [24.5, 45.5], [27.0, 45.2], [29.0, 46.5], [30.5, 46.0],
    ],
  },
  {
    id: 'river-rhine',
    name: 'Rhine',
    category: 'rivers',
    description: 'Forms the border between Germany and France; historically contested',
    coordinates: [
      [9.0, 47.0], [8.5, 47.8], [7.5, 48.5], [7.8, 49.5],
      [7.5, 50.5], [7.0, 51.0], [6.5, 51.8], [4.5, 52.5],
    ],
  },
  {
    id: 'river-rio-grande',
    name: 'Rio Grande',
    category: 'rivers',
    description: 'Forms the entire US–Mexico border from El Paso to the Gulf of Mexico',
    coordinates: [
      [-106.5, 31.8], [-104.0, 30.0], [-103.0, 29.5], [-100.5, 29.0],
      [-99.0, 28.0], [-97.5, 26.5], [-97.0, 25.8],
    ],
  },
  {
    id: 'river-mississippi',
    name: 'Mississippi',
    category: 'rivers',
    description: 'Major North American river system; historical US interior waterway',
    coordinates: [
      [-95.0, 47.0], [-93.0, 44.5], [-91.5, 42.0], [-91.0, 40.0],
      [-90.5, 38.0], [-89.5, 36.0], [-90.0, 33.5], [-90.5, 31.0], [-89.5, 29.0],
    ],
  },
  {
    id: 'river-amur',
    name: 'Amur',
    category: 'rivers',
    description: 'Forms the border between Russia and China (Manchuria)',
    coordinates: [
      [112.0, 53.5], [116.0, 53.0], [120.0, 52.5], [124.0, 52.0],
      [127.5, 50.5], [130.5, 48.5], [133.5, 47.5], [134.5, 48.4],
    ],
  },
  {
    id: 'river-jordan',
    name: 'Jordan',
    category: 'rivers',
    description: 'Forms the border between Israel/West Bank and Jordan',
    coordinates: [
      [35.7, 33.2], [35.5, 32.5], [35.5, 31.8], [35.6, 31.0], [35.6, 31.5],
    ],
  },
  {
    id: 'river-ganges',
    name: 'Ganges',
    category: 'rivers',
    description: 'Sacred river of the Indian subcontinent; culturally divides northern India',
    coordinates: [
      [78.5, 30.5], [79.5, 29.0], [80.5, 27.5], [82.0, 26.5],
      [84.5, 26.0], [86.5, 25.5], [88.5, 24.5], [89.5, 24.0], [90.5, 23.5],
    ],
  },
];

// ── Mountain ranges ───────────────────────────────────────────────────────────

export const mountains: NaturalLinearFeature[] = [
  {
    id: 'mt-himalayas',
    name: 'Himalayas',
    category: 'mountains',
    description: 'World\'s highest range; forms the border between India, Nepal, Bhutan, and China',
    coordinates: [
      [72.5, 34.0], [75.0, 33.5], [78.0, 33.0], [80.5, 32.0],
      [84.0, 28.5], [86.5, 28.0], [89.0, 27.5], [92.0, 28.0], [96.0, 28.5],
    ],
  },
  {
    id: 'mt-karakoram',
    name: 'Karakoram',
    category: 'mountains',
    description: 'Contains K2; borders Pakistan, China, and the disputed Kashmir region',
    coordinates: [
      [73.5, 36.5], [75.5, 36.8], [77.5, 36.5], [78.5, 35.5],
    ],
  },
  {
    id: 'mt-hindu-kush',
    name: 'Hindu Kush',
    category: 'mountains',
    description: 'Separates Central Asia from the South Asian subcontinent; spans Afghanistan and Pakistan',
    coordinates: [
      [62.0, 36.5], [65.0, 36.5], [67.5, 36.0], [70.0, 36.0], [72.5, 36.5],
    ],
  },
  {
    id: 'mt-alps',
    name: 'Alps',
    category: 'mountains',
    description: 'Forms borders between France, Switzerland, Italy, and Austria',
    coordinates: [
      [6.5, 45.0], [8.0, 46.0], [9.5, 46.5], [11.0, 47.0],
      [12.5, 47.5], [14.0, 47.5], [15.5, 47.0],
    ],
  },
  {
    id: 'mt-caucasus',
    name: 'Caucasus',
    category: 'mountains',
    description: 'Forms the border between Russia and Georgia/Azerbaijan; divides Europe and Asia',
    coordinates: [
      [37.5, 43.5], [40.0, 43.5], [42.5, 43.2], [45.0, 42.5], [47.0, 41.5],
    ],
  },
  {
    id: 'mt-andes',
    name: 'Andes',
    category: 'mountains',
    description: 'Forms the spine of South America and borders between Chile, Argentina, Bolivia, Peru, Colombia',
    coordinates: [
      [-73.0, 10.5], [-76.0, 5.0], [-78.5, 0.0], [-79.0, -5.0],
      [-79.0, -10.0], [-75.5, -15.0], [-72.0, -20.0], [-68.0, -25.0],
      [-67.5, -30.0], [-70.0, -35.0], [-71.5, -40.0], [-72.5, -45.0],
      [-73.5, -50.0], [-74.5, -55.0],
    ],
  },
  {
    id: 'mt-rockies',
    name: 'Rocky Mountains',
    category: 'mountains',
    description: 'North American cordillera; forms the continental divide',
    coordinates: [
      [-136.0, 60.0], [-130.0, 56.0], [-122.0, 50.0], [-116.0, 46.0],
      [-112.0, 42.0], [-107.0, 38.0], [-105.5, 34.0], [-104.0, 31.5],
    ],
  },
  {
    id: 'mt-atlas',
    name: 'Atlas Mountains',
    category: 'mountains',
    description: 'Separates the Mediterranean coast from the Sahara in Morocco, Algeria, and Tunisia',
    coordinates: [
      [-6.0, 35.5], [-3.0, 34.5], [0.5, 33.5], [3.0, 33.5], [6.0, 34.0], [9.5, 37.0],
    ],
  },
  {
    id: 'mt-urals',
    name: 'Ural Mountains',
    category: 'mountains',
    description: 'Traditional geographic boundary between Europe and Asia',
    coordinates: [
      [60.5, 69.0], [60.0, 64.0], [59.5, 60.0], [58.5, 56.0], [57.0, 52.0], [55.5, 51.0],
    ],
  },
  {
    id: 'mt-zagros',
    name: 'Zagros Mountains',
    category: 'mountains',
    description: 'Forms border between Iran, Iraq, and Turkey; shields the Iranian plateau',
    coordinates: [
      [38.5, 37.5], [42.0, 36.0], [44.0, 34.0], [46.0, 32.0], [48.5, 30.0], [50.0, 27.5],
    ],
  },
  {
    id: 'mt-great-dividing',
    name: 'Great Dividing Range',
    category: 'mountains',
    description: 'Australia\'s primary mountain range; divides coastal Australia from the interior',
    coordinates: [
      [145.0, -15.5], [144.5, -18.0], [144.0, -22.0], [148.0, -26.0],
      [151.0, -29.0], [151.5, -32.0], [150.0, -35.0], [148.5, -37.5], [148.0, -39.0],
    ],
  },
  {
    id: 'mt-pyrenees',
    name: 'Pyrenees',
    category: 'mountains',
    description: 'Forms the border between France and Spain',
    coordinates: [
      [-1.8, 43.5], [0.5, 43.0], [2.0, 42.5], [3.5, 42.5],
    ],
  },
  {
    id: 'mt-carpathians',
    name: 'Carpathians',
    category: 'mountains',
    description: 'Arc of mountains through Central Europe; bounds Hungary and forms Slovakia/Romania borders',
    coordinates: [
      [17.0, 49.5], [19.5, 49.5], [22.0, 49.0], [24.5, 49.5],
      [26.5, 48.5], [27.0, 47.5], [25.5, 46.0], [24.0, 45.5],
    ],
  },
  {
    id: 'mt-tian-shan',
    name: 'Tian Shan',
    category: 'mountains',
    description: 'Forms borders between Kazakhstan, Kyrgyzstan, and China',
    coordinates: [
      [70.0, 43.0], [74.0, 43.5], [77.5, 43.0], [80.0, 42.5],
      [82.5, 41.5], [85.5, 41.0], [88.5, 42.0],
    ],
  },
];

// ── Deserts ───────────────────────────────────────────────────────────────────

export const deserts: NaturalAreaFeature[] = [
  {
    id: 'desert-sahara',
    name: 'Sahara',
    category: 'deserts',
    description: 'World\'s largest hot desert; defines North Africa and separates Sub-Saharan Africa',
    polygon: [[
      [-17.0, 20.5], [-5.0, 17.5], [0.0, 16.0], [5.0, 17.5], [10.0, 20.0],
      [15.0, 23.5], [20.0, 25.0], [25.0, 28.5], [30.0, 29.0], [34.0, 27.5],
      [37.0, 24.0], [36.0, 20.5], [33.0, 18.5], [28.0, 17.5], [20.0, 16.5],
      [12.0, 16.0], [5.0, 15.5], [0.0, 14.0], [-5.0, 15.0], [-10.0, 17.0],
      [-15.0, 19.5], [-17.0, 20.5],
    ]],
  },
  {
    id: 'desert-arabian',
    name: 'Arabian Desert',
    category: 'deserts',
    description: 'Covers most of the Arabian Peninsula; strategic energy region',
    polygon: [[
      [36.5, 29.5], [40.5, 28.0], [45.0, 22.5], [50.0, 20.0],
      [55.0, 22.5], [59.0, 23.5], [60.5, 24.5], [60.0, 28.0],
      [57.5, 30.0], [55.0, 32.0], [50.0, 30.5], [46.0, 30.5],
      [42.0, 31.5], [38.5, 31.5], [36.5, 29.5],
    ]],
  },
  {
    id: 'desert-gobi',
    name: 'Gobi',
    category: 'deserts',
    description: 'Cold desert spanning northern China and southern Mongolia',
    polygon: [[
      [90.0, 42.0], [96.0, 42.5], [102.0, 42.0], [107.0, 44.0],
      [112.0, 46.5], [117.0, 48.5], [120.0, 48.0], [122.0, 46.5],
      [120.0, 43.0], [116.0, 40.5], [111.0, 39.0], [106.0, 38.5],
      [100.0, 38.0], [94.0, 38.5], [90.0, 40.0], [90.0, 42.0],
    ]],
  },
  {
    id: 'desert-kalahari',
    name: 'Kalahari',
    category: 'deserts',
    description: 'Semi-arid desert spanning Botswana, Namibia, and South Africa',
    polygon: [[
      [18.5, -18.0], [22.0, -18.0], [25.0, -19.0], [27.5, -20.5],
      [28.0, -24.0], [27.0, -27.5], [24.0, -29.5], [21.0, -29.0],
      [18.5, -27.5], [17.0, -24.0], [18.0, -20.0], [18.5, -18.0],
    ]],
  },
  {
    id: 'desert-namib',
    name: 'Namib',
    category: 'deserts',
    description: 'Coastal desert along the Atlantic shore of Namibia and Angola',
    polygon: [[
      [12.5, -17.5], [14.0, -17.5], [16.5, -19.0], [17.5, -22.0],
      [17.5, -26.0], [16.5, -29.0], [15.5, -30.5], [14.5, -30.0],
      [13.0, -27.0], [12.0, -23.0], [12.0, -19.0], [12.5, -17.5],
    ]],
  },
  {
    id: 'desert-atacama',
    name: 'Atacama',
    category: 'deserts',
    description: 'World\'s driest non-polar desert; coastal Chile and Peru',
    polygon: [[
      [-70.5, -18.0], [-68.5, -17.5], [-67.0, -19.0], [-67.0, -23.0],
      [-68.0, -26.5], [-70.5, -28.5], [-71.0, -26.0], [-70.5, -22.0], [-70.5, -18.0],
    ]],
  },
  {
    id: 'desert-great-victoria',
    name: 'Australian Desert',
    category: 'deserts',
    description: 'Includes the Great Victoria, Gibson, and Great Sandy deserts',
    polygon: [[
      [116.0, -24.0], [121.0, -23.5], [126.0, -23.5], [130.0, -25.0],
      [134.0, -26.5], [136.5, -30.0], [133.0, -32.0], [129.0, -32.0],
      [124.5, -32.0], [120.0, -30.5], [117.0, -27.5], [116.0, -24.0],
    ]],
  },
  {
    id: 'desert-taklamakan',
    name: 'Taklamakan',
    category: 'deserts',
    description: 'Large desert in China\'s Xinjiang region; a historic barrier along the Silk Road',
    polygon: [[
      [76.0, 40.5], [80.0, 40.5], [84.0, 40.0], [88.0, 40.5],
      [90.0, 40.5], [91.5, 39.5], [90.5, 37.5], [88.0, 37.0],
      [84.0, 37.0], [80.0, 37.5], [77.5, 38.5], [76.0, 39.5], [76.0, 40.5],
    ]],
  },
  {
    id: 'desert-iranian',
    name: 'Iranian Plateau Deserts',
    category: 'deserts',
    description: 'Dasht-e Kavir and Dasht-e Lut; central Iran\'s salt deserts',
    polygon: [[
      [51.0, 36.5], [54.0, 36.0], [57.5, 36.0], [60.0, 35.0],
      [61.0, 33.0], [60.5, 30.5], [58.0, 28.5], [55.0, 29.5],
      [52.0, 30.5], [50.0, 32.5], [50.5, 34.5], [51.0, 36.5],
    ]],
  },
  {
    id: 'desert-patagonian',
    name: 'Patagonian Desert',
    category: 'deserts',
    description: 'Cold desert in southern Argentina; sits in rain shadow of the Andes',
    polygon: [[
      [-68.5, -38.5], [-66.0, -38.0], [-64.0, -38.5], [-63.5, -41.0],
      [-64.0, -44.0], [-65.0, -47.0], [-66.0, -50.0], [-67.5, -51.5],
      [-69.0, -50.0], [-70.0, -47.0], [-70.5, -44.0], [-70.0, -41.0],
      [-68.5, -38.5],
    ]],
  },
];
