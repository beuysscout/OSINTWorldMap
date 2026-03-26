import { Layer } from 'react-map-gl/mapbox';
import {
  POWER_ALLIANCE_LAYER_DEFS,
  NATO_MEMBERS,
  CSTO_MEMBERS,
  SCO_MEMBERS,
  AUKUS_MEMBERS,
  QUAD_MEMBERS,
  US_SPHERE_COUNTRIES,
  CHINA_SPHERE_COUNTRIES,
  RUSSIA_SPHERE_COUNTRIES,
  UN_WESTERN_BLOC,
  UN_RUSSIA_CHINA_BLOC,
  US_SANCTIONS_COUNTRIES,
  EU_SANCTIONS_COUNTRIES,
} from '../../data/powerAlliances';
import type { PowerAllianceCategory, PowerAllianceGroup } from '../../data/powerAlliances';

// Include both 'all' and 'US' worldviews — same pattern as WorldMap.tsx.
// Using only 'all' silently excludes Russia, China, and others.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WORLDVIEW_FILTER: any = ['match', ['get', 'worldview'], ['all', 'US'], true, false];

// Alliance fills are visual-only; country hover/click is handled by the base
// 'countries-fill' layer in WorldMap, so no interactive IDs are needed here.
export const POWER_ALLIANCE_INTERACTIVE_LAYER_IDS: string[] = [];

interface PowerAlliancesLayerProps {
  activeLayers: Set<PowerAllianceCategory>;
}

const MEMBER_MAP: Record<PowerAllianceCategory, string[]> = {
  nato:              NATO_MEMBERS,
  csto:              CSTO_MEMBERS,
  sco:               SCO_MEMBERS,
  aukus:             AUKUS_MEMBERS,
  quad:              QUAD_MEMBERS,
  sphereUS:          US_SPHERE_COUNTRIES,
  sphereChina:       CHINA_SPHERE_COUNTRIES,
  sphereRussia:      RUSSIA_SPHERE_COUNTRIES,
  unWestern:         UN_WESTERN_BLOC,
  unRussiaChinaBloc: UN_RUSSIA_CHINA_BLOC,
  sanctionsUS:       US_SANCTIONS_COUNTRIES,
  sanctionsEU:       EU_SANCTIONS_COUNTRIES,
};

const COLOR_MAP = Object.fromEntries(
  POWER_ALLIANCE_LAYER_DEFS.map((d) => [d.id, d.color]),
) as Record<PowerAllianceCategory, string>;

// Opacity by group: interpretive layers are more transparent so formal
// alliance colors dominate when multiple layers are active simultaneously.
const GROUP_OPACITY: Record<PowerAllianceGroup, number> = {
  spheres:   0.4,
  unVoting:  0.45,
  sanctions: 0.65,
  alliances: 0.65,
};

// Render order: broader/interpretive layers first (bottom), specific/definitive
// last (top). When NATO + US Sphere are both active, NATO color wins.
const GROUP_RENDER_ORDER: Record<PowerAllianceGroup, number> = {
  spheres:   0,
  unVoting:  1,
  sanctions: 2,
  alliances: 3,
};

const SORTED_DEFS = [...POWER_ALLIANCE_LAYER_DEFS].sort(
  (a, b) => GROUP_RENDER_ORDER[a.group] - GROUP_RENDER_ORDER[b.group],
);

// Builds a match expression that colors member countries and falls back to
// transparent for non-members — same proven approach as ResourcesClimateLayer.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function memberFill(members: string[], color: string): any {
  return ['match', ['id'], ...members.flatMap((code) => [code, color]), 'transparent'];
}

export default function PowerAlliancesLayer({ activeLayers }: PowerAlliancesLayerProps) {
  return (
    <>
      {SORTED_DEFS.map((def) => (
        <Layer
          key={def.id}
          id={`pa-${def.id}`}
          type="fill"
          source="countries"
          source-layer="country_boundaries"
          beforeId="countries-line"
          filter={WORLDVIEW_FILTER}
          layout={{ visibility: activeLayers.has(def.id) ? 'visible' : 'none' }}
          paint={{
            'fill-color': memberFill(MEMBER_MAP[def.id], COLOR_MAP[def.id]),
            'fill-opacity': GROUP_OPACITY[def.group],
          }}
        />
      ))}
    </>
  );
}
