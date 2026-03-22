export type GeoLabelCategory = 'ocean' | 'sea' | 'region' | 'feature';

export interface GeoLabel {
  id: string;
  name: string;
  coordinates: [number, number]; // [lat, lng]
  category: GeoLabelCategory;
  minZoom: number;
  maxZoom?: number;
}

// ── Oceans — visible at zoom 2+ ───────────────────────────────────────────
const oceans: GeoLabel[] = [
  { id: 'pacific-n',   name: 'Pacific Ocean',   coordinates: [25, -155],   category: 'ocean', minZoom: 2 },
  { id: 'pacific-s',   name: 'Pacific Ocean',   coordinates: [-30, -135],  category: 'ocean', minZoom: 3.5 },
  { id: 'atlantic-n',  name: 'Atlantic Ocean',  coordinates: [30, -40],    category: 'ocean', minZoom: 2 },
  { id: 'atlantic-s',  name: 'Atlantic Ocean',  coordinates: [-30, -20],   category: 'ocean', minZoom: 3.5 },
  { id: 'indian',      name: 'Indian Ocean',    coordinates: [-22, 80],    category: 'ocean', minZoom: 2 },
  { id: 'arctic',      name: 'Arctic Ocean',    coordinates: [82, 20],     category: 'ocean', minZoom: 2.5 },
  { id: 'southern',    name: 'Southern Ocean',  coordinates: [-62, 20],    category: 'ocean', minZoom: 2.5 },
];

// ── Major seas & gulfs — visible at zoom 3.5+ ────────────────────────────
const seas: GeoLabel[] = [
  { id: 'south-china-sea',  name: 'South China Sea',   coordinates: [12,  114],   category: 'sea', minZoom: 3.5 },
  { id: 'caribbean',        name: 'Caribbean Sea',     coordinates: [15,  -76],   category: 'sea', minZoom: 3.5 },
  { id: 'mediterranean',    name: 'Mediterranean Sea', coordinates: [36,  14],    category: 'sea', minZoom: 3.5 },
  { id: 'arabian-sea',      name: 'Arabian Sea',       coordinates: [17,  63],    category: 'sea', minZoom: 3.5 },
  { id: 'bay-bengal',       name: 'Bay of Bengal',     coordinates: [13,  88],    category: 'sea', minZoom: 3.5 },
  { id: 'gulf-mexico',      name: 'Gulf of Mexico',    coordinates: [24,  -91],   category: 'sea', minZoom: 3.5 },
  { id: 'bering-sea',       name: 'Bering Sea',        coordinates: [58, -178],   category: 'sea', minZoom: 3.5 },
  { id: 'barents-sea',      name: 'Barents Sea',       coordinates: [75,  40],    category: 'sea', minZoom: 3.5 },
  { id: 'red-sea',          name: 'Red Sea',           coordinates: [22,  38],    category: 'sea', minZoom: 4   },
  { id: 'persian-gulf',     name: 'Persian Gulf',      coordinates: [27,  51],    category: 'sea', minZoom: 4   },
  { id: 'north-sea',        name: 'North Sea',         coordinates: [56,   4],    category: 'sea', minZoom: 4   },
  { id: 'black-sea',        name: 'Black Sea',         coordinates: [43,  33],    category: 'sea', minZoom: 4   },
  { id: 'caspian',          name: 'Caspian Sea',       coordinates: [42,  52],    category: 'sea', minZoom: 4   },
  { id: 'east-china-sea',   name: 'East China Sea',    coordinates: [29, 125],    category: 'sea', minZoom: 4   },
  { id: 'sea-of-japan',     name: 'Sea of Japan',      coordinates: [40, 135],    category: 'sea', minZoom: 4   },
  { id: 'philippine-sea',   name: 'Philippine Sea',    coordinates: [17, 134],    category: 'sea', minZoom: 4   },
  { id: 'coral-sea',        name: 'Coral Sea',         coordinates: [-17, 155],   category: 'sea', minZoom: 4   },
  { id: 'gulf-guinea',      name: 'Gulf of Guinea',    coordinates: [2,    3],    category: 'sea', minZoom: 4   },
  { id: 'hudson-bay',       name: 'Hudson Bay',        coordinates: [60,  -86],   category: 'sea', minZoom: 4   },
  { id: 'tasman-sea',       name: 'Tasman Sea',        coordinates: [-38, 159],   category: 'sea', minZoom: 4.5 },
  { id: 'gulf-aden',        name: 'Gulf of Aden',      coordinates: [12,  47],    category: 'sea', minZoom: 4.5 },
  { id: 'andaman-sea',      name: 'Andaman Sea',       coordinates: [11,  96],    category: 'sea', minZoom: 4.5 },
  { id: 'java-sea',         name: 'Java Sea',          coordinates: [-5,  110],   category: 'sea', minZoom: 4.5 },
  { id: 'celebes-sea',      name: 'Celebes Sea',       coordinates: [4,   122],   category: 'sea', minZoom: 5   },
];

// ── Geopolitical regions — zoom 4.5+ ─────────────────────────────────────
const regions: GeoLabel[] = [
  { id: 'r-sahara',        name: 'Sahara',             coordinates: [24,   12],   category: 'region', minZoom: 4   },
  { id: 'r-arabian-pen',   name: 'Arabian Peninsula',  coordinates: [21,   46],   category: 'region', minZoom: 4   },
  { id: 'r-horn-africa',   name: 'Horn of Africa',     coordinates: [7,    46],   category: 'region', minZoom: 4   },
  { id: 'r-central-asia',  name: 'Central Asia',       coordinates: [46,   62],   category: 'region', minZoom: 4   },
  { id: 'r-siberia',       name: 'Siberia',            coordinates: [62,  110],   category: 'region', minZoom: 4   },
  { id: 'r-sahel',         name: 'Sahel',              coordinates: [13,    8],   category: 'region', minZoom: 4.5 },
  { id: 'r-fertile',       name: 'Fertile Crescent',   coordinates: [34,   42],   category: 'region', minZoom: 4.5 },
  { id: 'r-caucasus',      name: 'Caucasus',           coordinates: [42,   44],   category: 'region', minZoom: 4.5 },
  { id: 'r-balkans',       name: 'Balkans',            coordinates: [43,   21],   category: 'region', minZoom: 4.5 },
  { id: 'r-indochina',     name: 'Indochina',          coordinates: [15,  104],   category: 'region', minZoom: 4.5 },
  { id: 'r-patagonia',     name: 'Patagonia',          coordinates: [-47,  -68],  category: 'region', minZoom: 4.5 },
  { id: 'r-amazon',        name: 'Amazonia',           coordinates: [-4,   -62],  category: 'region', minZoom: 4.5 },
  { id: 'r-scandinavia',   name: 'Scandinavia',        coordinates: [65,   16],   category: 'region', minZoom: 4.5 },
  { id: 'r-levant',        name: 'Levant',             coordinates: [33,   36],   category: 'region', minZoom: 5   },
  { id: 'r-iberian',       name: 'Iberian Peninsula',  coordinates: [40,   -4],   category: 'region', minZoom: 5   },
  { id: 'r-great-plains',  name: 'Great Plains',       coordinates: [42,  -101],  category: 'region', minZoom: 5   },
  { id: 'r-manchuria',     name: 'Manchuria',          coordinates: [46,  127],   category: 'region', minZoom: 5   },
  { id: 'r-sub-saharan',   name: 'Sub-Saharan Africa', coordinates: [-5,   20],   category: 'region', minZoom: 4   },
];

// ── Physical geographic features — zoom 5.5+ ─────────────────────────────
const features: GeoLabel[] = [
  { id: 'f-himalayas',   name: 'Himalayas',       coordinates: [29,   84],   category: 'feature', minZoom: 5   },
  { id: 'f-andes',       name: 'Andes',           coordinates: [-18,  -68],  category: 'feature', minZoom: 5   },
  { id: 'f-rockies',     name: 'Rocky Mountains', coordinates: [46,  -114],  category: 'feature', minZoom: 5   },
  { id: 'f-alps',        name: 'Alps',            coordinates: [46,   10],   category: 'feature', minZoom: 5.5 },
  { id: 'f-urals',       name: 'Ural Mountains',  coordinates: [56,   59],   category: 'feature', minZoom: 5.5 },
  { id: 'f-gobi',        name: 'Gobi Desert',     coordinates: [42,  104],   category: 'feature', minZoom: 5   },
  { id: 'f-congo-basin', name: 'Congo Basin',     coordinates: [-1,   24],   category: 'feature', minZoom: 5   },
  { id: 'f-great-rift',  name: 'Great Rift Valley', coordinates: [2,   36],  category: 'feature', minZoom: 5.5 },
  { id: 'f-tibetan',     name: 'Tibetan Plateau', coordinates: [32,   90],   category: 'feature', minZoom: 5   },
  { id: 'f-great-lakes', name: 'Great Lakes',     coordinates: [45,  -84],   category: 'feature', minZoom: 5.5 },
  { id: 'f-nile-valley', name: 'Nile Valley',     coordinates: [22,   31],   category: 'feature', minZoom: 5.5 },
];

export const geoLabels: GeoLabel[] = [
  ...oceans,
  ...seas,
  ...regions,
  ...features,
];
