import type { FeatureCollection, Feature, Polygon } from 'geojson';

export interface EmpireProperties {
  id: string;
  name: string;
  color: string;
}

export interface HistoricalSnapshot {
  year: number; // negative = BC
  label: string;
  era: string;
  description: string;
  geojson: FeatureCollection<Polygon, EmpireProperties>;
}

function feat(
  id: string,
  name: string,
  color: string,
  coords: [number, number][],
): Feature<Polygon, EmpireProperties> {
  const ring: [number, number][] = [...coords];
  // Close ring if open
  if (ring[0][0] !== ring[ring.length - 1][0] || ring[0][1] !== ring[ring.length - 1][1]) {
    ring.push(ring[0]);
  }
  return {
    type: 'Feature',
    properties: { id, name, color },
    geometry: { type: 'Polygon', coordinates: [ring] },
  };
}

function fc(
  features: Feature<Polygon, EmpireProperties>[],
): FeatureCollection<Polygon, EmpireProperties> {
  return { type: 'FeatureCollection', features };
}

export const HISTORICAL_SNAPSHOTS: HistoricalSnapshot[] = [
  {
    year: -500,
    label: '500 BC',
    era: 'Ancient Empires',
    description:
      'The Achaemenid Persian Empire spans from Egypt to India — the first world empire. Rome is a small republic in Italy, while Carthage dominates the western Mediterranean.',
    geojson: fc([
      feat('achaemenid', 'Achaemenid Persian Empire', '#DAA520', [
        [26, 38], [28, 41], [36, 42], [44, 42], [52, 44], [60, 42],
        [68, 38], [72, 28], [66, 22], [58, 22], [50, 26], [44, 30],
        [38, 30], [34, 28], [32, 30], [28, 31], [26, 22], [24, 28],
        [25, 32], [28, 36],
      ]),
      feat('roman_republic', 'Roman Republic', '#8B0000', [
        [8, 44], [14, 45], [14, 43], [18, 41], [16, 38],
        [15, 37], [12, 37], [11, 38], [10, 44],
      ]),
      feat('carthage', 'Carthage', '#CD5C5C', [
        [-6, 36], [-2, 35], [4, 36], [9, 37], [13, 33],
        [12, 32], [9, 33], [6, 37], [2, 36],
      ]),
      feat('zhou', 'Zhou Dynasty', '#FF8C00', [
        [102, 26], [110, 20], [120, 28], [122, 38],
        [116, 42], [106, 40], [102, 32], [100, 26],
      ]),
    ]),
  },

  {
    year: 1,
    label: '1 AD',
    era: 'Roman Zenith',
    description:
      'The Roman Empire encircles the entire Mediterranean — its greatest extent. The Han Dynasty rules a unified China. The Parthians hold Persia and Mesopotamia.',
    geojson: fc([
      feat('roman', 'Roman Empire', '#B22222', [
        [4, 53], [8, 51], [10, 48], [14, 47], [18, 46], [20, 45],
        [28, 44], [30, 41], [38, 38], [40, 36], [36, 32], [35, 30],
        [32, 31], [26, 22], [22, 27], [13, 33], [9, 37], [4, 37],
        [-2, 35], [-5, 36], [-9, 39], [-9, 44], [2, 44], [5, 47], [4, 52],
      ]),
      feat('han', 'Han Dynasty', '#FF6B35', [
        [100, 22], [110, 18], [122, 30], [122, 38], [128, 42],
        [126, 44], [116, 42], [106, 40], [100, 40], [98, 34], [100, 26],
      ]),
      feat('parthian', 'Parthian Empire', '#B8860B', [
        [40, 38], [44, 42], [52, 44], [62, 42], [66, 36], [66, 26],
        [62, 22], [56, 22], [50, 26], [46, 30], [42, 32], [38, 34],
      ]),
    ]),
  },

  {
    year: 500,
    label: '500 AD',
    era: 'Fall of Rome',
    description:
      'The Western Roman Empire has collapsed. The Byzantine Empire survives in the east, while Sassanid Persia dominates the Middle East. Germanic kingdoms fragment Western Europe.',
    geojson: fc([
      feat('byzantine_500', 'Byzantine Empire', '#6A0DAD', [
        [14, 43], [22, 46], [28, 46], [30, 42], [38, 38],
        [40, 36], [36, 32], [35, 29], [32, 30], [26, 22],
        [24, 30], [22, 36], [16, 40],
      ]),
      feat('sassanid', 'Sassanid Persian Empire', '#DAA520', [
        [40, 38], [44, 42], [52, 44], [62, 40], [66, 36],
        [68, 28], [62, 22], [56, 22], [50, 26], [44, 30], [38, 32],
      ]),
      feat('germanic', 'Germanic Kingdoms', '#795548', [
        [-8, 37], [-8, 44], [-4, 44], [2, 51], [8, 51], [14, 54],
        [20, 54], [20, 46], [14, 44], [8, 44], [3, 44],
      ]),
      feat('gupta', 'Gupta Empire', '#FF8C00', [
        [68, 26], [74, 32], [80, 28], [88, 26], [86, 20],
        [78, 14], [74, 12], [68, 20],
      ]),
    ]),
  },

  {
    year: 1000,
    label: '1000 AD',
    era: 'Medieval World',
    description:
      'The Islamic world stretches from Spain to Central Asia. Byzantine Emperor Basil II reconquers Bulgaria. Song China is a center of innovation. The Holy Roman Empire dominates central Europe.',
    geojson: fc([
      feat('byzantine_1000', 'Byzantine Empire', '#6A0DAD', [
        [14, 42], [16, 42], [22, 46], [28, 46], [36, 44],
        [40, 38], [38, 36], [36, 36], [30, 38], [28, 42], [22, 44],
      ]),
      feat('abbasid', 'Abbasid Caliphate', '#228B22', [
        [40, 38], [44, 42], [52, 44], [62, 40], [66, 34], [68, 24],
        [58, 22], [44, 12], [38, 16], [38, 22], [44, 30], [40, 34],
      ]),
      feat('fatimid', 'Fatimid Caliphate', '#4CAF50', [
        [-5, 36], [4, 37], [10, 34], [20, 32], [26, 22], [32, 30],
        [36, 32], [34, 30], [30, 31], [22, 27], [12, 33], [8, 38],
      ]),
      feat('song', 'Song Dynasty', '#FF6B35', [
        [100, 24], [110, 18], [122, 28], [122, 38],
        [116, 42], [108, 38], [102, 30],
      ]),
      feat('holy_roman', 'Holy Roman Empire', '#607D8B', [
        [-4, 48], [4, 51], [14, 54], [20, 52], [18, 47],
        [14, 44], [14, 42], [8, 44], [4, 46],
      ]),
      feat('kievan_rus', 'Kievan Rus', '#5C6BC0', [
        [20, 60], [38, 65], [42, 58], [42, 52], [38, 48],
        [30, 46], [22, 48], [18, 52],
      ]),
    ]),
  },

  {
    year: 1280,
    label: '1280 AD',
    era: 'Mongol World Empire',
    description:
      'The Mongol Empire is the largest contiguous land empire in history — from the Pacific to Eastern Europe. It destroyed old worlds and created new trade routes across Eurasia.',
    geojson: fc([
      feat('mongol', 'Mongol Empire', '#1E90FF', [
        [126, 36], [130, 44], [140, 52], [128, 60], [80, 64],
        [40, 60], [20, 50], [24, 46], [28, 44], [34, 42],
        [44, 40], [52, 34], [58, 24], [62, 24], [68, 22],
        [76, 28], [80, 28], [92, 26], [100, 22], [104, 18],
        [110, 20], [120, 24], [122, 32], [122, 38],
      ]),
      feat('mali', 'Mali Empire', '#8B6914', [
        [-18, 8], [-18, 16], [-10, 20], [0, 20], [8, 16],
        [4, 10], [-2, 6], [-8, 6], [-14, 10],
      ]),
      feat('delhi_1280', 'Delhi Sultanate', '#FF8C00', [
        [62, 30], [72, 36], [78, 30], [88, 26], [88, 20],
        [80, 14], [74, 14], [68, 22], [62, 26],
      ]),
    ]),
  },

  {
    year: 1500,
    label: '1500 AD',
    era: 'Age of Discovery',
    description:
      'The Ottomans have taken Constantinople. Ming China flourishes behind the Great Wall. The Aztec and Inca empires peak in the Americas. Spanish and Portuguese ships are about to connect the world.',
    geojson: fc([
      feat('ottoman_1500', 'Ottoman Empire', '#2E8B57', [
        [16, 44], [22, 48], [28, 46], [32, 46], [38, 44],
        [42, 40], [40, 36], [36, 30], [35, 30], [30, 42],
        [28, 42], [24, 42], [18, 40],
      ]),
      feat('ming', 'Ming Dynasty', '#FF6B35', [
        [100, 22], [110, 18], [122, 24], [122, 32], [122, 40],
        [120, 44], [110, 42], [100, 40], [98, 32], [100, 26],
      ]),
      feat('safavid', 'Safavid Persia', '#DAA520', [
        [44, 40], [50, 44], [62, 40], [66, 34], [66, 26],
        [58, 22], [50, 26], [44, 30], [40, 34],
      ]),
      feat('delhi_1500', 'Delhi Sultanate', '#FF8C00', [
        [62, 28], [70, 36], [78, 32], [88, 26], [86, 20],
        [78, 14], [72, 12], [68, 22], [62, 24],
      ]),
      feat('aztec', 'Aztec Empire', '#9C27B0', [
        [-100, 22], [-92, 22], [-88, 18], [-92, 16], [-98, 16], [-104, 20],
      ]),
      feat('inca', 'Inca Empire', '#673AB7', [
        [-82, 0], [-76, -8], [-76, -16], [-68, -22], [-66, -28],
        [-70, -38], [-74, -40], [-78, -32], [-82, -16],
      ]),
      feat('spain_1500', 'Spanish Crown', '#C41E3A', [
        [-9, 36], [-9, 44], [-2, 44], [3, 44], [4, 42],
        [2, 38], [0, 37], [-6, 36],
      ]),
    ]),
  },

  {
    year: 1800,
    label: '1800 AD',
    era: 'Colonial Empires',
    description:
      'Napoleon reshapes Europe. Britain dominates India. The Qing Dynasty rules the largest empire in Chinese history. Russia expands across Eurasia. The Ottoman Empire enters slow decline.',
    geojson: fc([
      feat('british_india_1800', 'British Empire (India)', '#C2185B', [
        [62, 28], [72, 34], [78, 30], [88, 26], [92, 22],
        [92, 16], [80, 10], [74, 8], [68, 20], [62, 24],
      ]),
      feat('french_1800', 'French Empire', '#003087', [
        [-5, 44], [-2, 48], [2, 51], [8, 48], [8, 44],
        [2, 43], [-2, 44],
      ]),
      feat('russian_1800', 'Russian Empire', '#1565C0', [
        [20, 60], [30, 70], [80, 68], [140, 60], [168, 62],
        [140, 44], [58, 38], [42, 44], [38, 46], [28, 48], [20, 56],
      ]),
      feat('qing', 'Qing Dynasty', '#FF6B35', [
        [80, 44], [90, 50], [100, 52], [130, 52], [130, 44],
        [122, 32], [110, 18], [100, 22], [90, 28], [80, 30], [78, 36],
      ]),
      feat('ottoman_1800', 'Ottoman Empire', '#2E8B57', [
        [16, 44], [26, 48], [36, 46], [42, 42], [44, 38],
        [48, 30], [50, 26], [36, 22], [30, 30], [24, 32],
        [10, 32], [8, 38], [4, 37],
      ]),
      feat('usa_1800', 'United States', '#3F51B5', [
        [-66, 44], [-70, 48], [-84, 46], [-90, 46],
        [-84, 38], [-82, 30], [-76, 26], [-72, 40],
      ]),
    ]),
  },

  {
    year: 1914,
    label: '1914 AD',
    era: 'Eve of World War I',
    description:
      'European empires dominate the globe. Imperial rivalry and nationalism are building toward catastrophe. The Ottoman Empire crumbles while new industrial powers challenge the old order.',
    geojson: fc([
      feat('british_1914', 'British Empire (India)', '#C2185B', [
        [60, 28], [72, 36], [78, 32], [92, 24], [98, 22],
        [100, 10], [80, 8], [68, 20], [60, 24],
      ]),
      feat('german_1914', 'German Empire', '#78909C', [
        [6, 47], [8, 47], [14, 50], [20, 56], [16, 55],
        [10, 55], [8, 55], [6, 52],
      ]),
      feat('russian_1914', 'Russian Empire', '#1565C0', [
        [20, 60], [30, 70], [80, 68], [140, 60], [168, 62],
        [132, 44], [60, 40], [50, 36], [38, 44], [28, 46], [22, 54],
      ]),
      feat('ottoman_1914', 'Ottoman Empire', '#2E8B57', [
        [26, 42], [36, 42], [44, 38], [48, 32], [50, 26],
        [42, 14], [36, 14], [36, 22], [32, 30], [28, 36],
      ]),
      feat('austro_hungarian', 'Austro-Hungarian Empire', '#FF7043', [
        [10, 48], [14, 50], [18, 50], [26, 50], [24, 44],
        [22, 42], [14, 44],
      ]),
      feat('french_1914', 'French Republic', '#003087', [
        [-5, 44], [-2, 48], [2, 51], [6, 49], [7, 46],
        [8, 44], [2, 43], [-2, 44],
      ]),
    ]),
  },
];
