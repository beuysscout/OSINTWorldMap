import type { TradeLaneCategory } from './tradeLanes';
import type { NaturalFeatureCategory } from './naturalFeatures';
import type { MilitaryFeatureCategory } from './militaryFeatures';
import type { ResourcesClimateCategory } from './resourcesClimate';
import type { PowerAllianceCategory } from './powerAlliances';

export interface LayerPreset {
  id: string;
  title: string;
  tagline: string;
  description: string;
  accentColor: string;
  trade: TradeLaneCategory[];
  natural: NaturalFeatureCategory[];
  military: MilitaryFeatureCategory[];
  resources: ResourcesClimateCategory[];
  alliances: PowerAllianceCategory[];
}

export const STORY_PRESETS: LayerPreset[] = [
  {
    id: 'china-reach',
    title: "China's Reach",
    tagline: 'Belt & Road to global influence',
    description:
      "BRI routes, port investments, China's sphere of influence, SCO alliances, and rare earth mineral dominance paint the full picture of Beijing's global strategy.",
    accentColor: '#dc2626',
    trade: ['bri', 'shipping', 'ports'],
    natural: [],
    military: [],
    resources: ['minerals'],
    alliances: ['sco', 'sphereChina'],
  },
  {
    id: 'energy-chokepoints',
    title: 'Energy Chokepoints',
    tagline: 'Where oil flows can be cut',
    description:
      'Energy corridors, pipelines, maritime chokepoints, and naval bases reveal the fragile arteries of the global energy system — and who can sever them.',
    accentColor: '#d97706',
    trade: ['energy', 'shipping', 'chokepoints', 'pipelines'],
    natural: [],
    military: ['naval'],
    resources: [],
    alliances: [],
  },
  {
    id: 'new-cold-war',
    title: 'New Cold War',
    tagline: 'The world is splitting into blocs',
    description:
      'NATO, CSTO, and SCO alliances alongside US, Chinese, and Russian spheres of influence, nuclear arsenals, and sanction networks map the emerging multipolar divide.',
    accentColor: '#2563eb',
    trade: [],
    natural: [],
    military: ['nuclear', 'bases'],
    resources: [],
    alliances: ['nato', 'csto', 'sco', 'sphereUS', 'sphereChina', 'sphereRussia', 'sanctionsUS', 'sanctionsEU'],
  },
  {
    id: 'maritime-dominance',
    title: 'Maritime Dominance',
    tagline: 'Control the seas, control the world',
    description:
      'Shipping lanes, naval bases, major ports, submarine cables, and chokepoints reveal who controls the infrastructure that moves 90% of world trade.',
    accentColor: '#0891b2',
    trade: ['shipping', 'chokepoints', 'ports', 'cables'],
    natural: [],
    military: ['naval'],
    resources: [],
    alliances: [],
  },
  {
    id: 'climate-flashpoints',
    title: 'Climate Flashpoints',
    tagline: 'Where the next conflicts will ignite',
    description:
      'Water stress, food import dependency, and climate displacement risk converge on the same unstable regions — showing where environmental pressure will trigger the next crises.',
    accentColor: '#16a34a',
    trade: [],
    natural: ['rivers'],
    military: [],
    resources: ['waterStress', 'foodImport', 'climateDisplacement'],
    alliances: [],
  },
  {
    id: 'resource-wars',
    title: 'Resource Wars',
    tagline: 'The scramble for critical materials',
    description:
      'Critical minerals, energy pipelines, commodity flows, and military bases near resource deposits show where the next great-power competition will be fought over materials.',
    accentColor: '#7c3aed',
    trade: ['energy', 'pipelines', 'commodity'],
    natural: [],
    military: ['bases'],
    resources: ['minerals', 'waterStress'],
    alliances: [],
  },
];
