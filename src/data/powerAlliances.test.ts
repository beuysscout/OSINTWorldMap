import { describe, it, expect } from 'vitest';
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
} from './powerAlliances';
import type { PowerAllianceCategory } from './powerAlliances';

// All member lists in one place for shared assertions
const ALL_LISTS: Record<PowerAllianceCategory, string[]> = {
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

// ── Layer definitions ────────────────────────────────────────────────────────

describe('POWER_ALLIANCE_LAYER_DEFS', () => {
  it('has a def for every PowerAllianceCategory', () => {
    const defIds = POWER_ALLIANCE_LAYER_DEFS.map((d) => d.id);
    const expectedIds = Object.keys(ALL_LISTS) as PowerAllianceCategory[];
    expect(defIds.sort()).toEqual(expectedIds.sort());
  });

  it('every def has a non-empty label, description, color, and group', () => {
    for (const def of POWER_ALLIANCE_LAYER_DEFS) {
      expect(def.label, `${def.id}: label`).toBeTruthy();
      expect(def.description, `${def.id}: description`).toBeTruthy();
      expect(def.color, `${def.id}: color`).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(['alliances', 'spheres', 'unVoting', 'sanctions'], `${def.id}: group`).toContain(def.group);
    }
  });

  it('no duplicate ids', () => {
    const ids = POWER_ALLIANCE_LAYER_DEFS.map((d) => d.id);
    expect(ids).toHaveLength(new Set(ids).size);
  });
});

// ── Alpha-3 code format ──────────────────────────────────────────────────────

describe('alpha-3 code format', () => {
  const ALPHA3_RE = /^[A-Z]{3}$/;

  for (const [category, members] of Object.entries(ALL_LISTS)) {
    it(`all codes in ${category} are valid ISO alpha-3 format`, () => {
      for (const code of members) {
        expect(code, `"${code}" in ${category}`).toMatch(ALPHA3_RE);
      }
    });
  }
});

// ── No duplicates within a list ───────────────────────────────────────────────

describe('no duplicate codes within a list', () => {
  for (const [category, members] of Object.entries(ALL_LISTS)) {
    it(`${category} has no duplicates`, () => {
      const seen = new Set<string>();
      const dupes: string[] = [];
      for (const code of members) {
        if (seen.has(code)) dupes.push(code);
        seen.add(code);
      }
      expect(dupes, `duplicates: ${dupes.join(', ')}`).toHaveLength(0);
    });
  }
});

// ── Known membership counts ───────────────────────────────────────────────────

describe('formal alliance membership counts', () => {
  it('NATO has 32 members', () => expect(NATO_MEMBERS).toHaveLength(32));
  it('CSTO has 6 members',  () => expect(CSTO_MEMBERS).toHaveLength(6));
  it('SCO has 10 members',  () => expect(SCO_MEMBERS).toHaveLength(10));
  it('AUKUS has 3 members', () => expect(AUKUS_MEMBERS).toHaveLength(3));
  it('QUAD has 4 members',  () => expect(QUAD_MEMBERS).toHaveLength(4));
});

// ── Spot-check key memberships ────────────────────────────────────────────────

describe('spot-check memberships', () => {
  it('USA is in NATO',    () => expect(NATO_MEMBERS).toContain('USA'));
  it('GBR is in NATO',    () => expect(NATO_MEMBERS).toContain('GBR'));
  it('SWE is in NATO',    () => expect(NATO_MEMBERS).toContain('SWE'));
  it('RUS is in CSTO',    () => expect(CSTO_MEMBERS).toContain('RUS'));
  it('CHN is in SCO',     () => expect(SCO_MEMBERS).toContain('CHN'));
  it('IRN is in SCO',     () => expect(SCO_MEMBERS).toContain('IRN'));
  it('IND is in QUAD',    () => expect(QUAD_MEMBERS).toContain('IND'));
  it('AUS is in AUKUS',   () => expect(AUKUS_MEMBERS).toContain('AUS'));

  // Non-members
  it('RUS is not in NATO', () => expect(NATO_MEMBERS).not.toContain('RUS'));
  it('USA is not in CSTO', () => expect(CSTO_MEMBERS).not.toContain('USA'));
  it('CHN is not in NATO', () => expect(NATO_MEMBERS).not.toContain('CHN'));

  // Sanctions
  it('IRN is under US sanctions', () => expect(US_SANCTIONS_COUNTRIES).toContain('IRN'));
  it('RUS is under EU sanctions', () => expect(EU_SANCTIONS_COUNTRIES).toContain('RUS'));
  it('BLR is under EU sanctions', () => expect(EU_SANCTIONS_COUNTRIES).toContain('BLR'));
});

// ── Non-empty lists ───────────────────────────────────────────────────────────

describe('all member lists are non-empty', () => {
  for (const [category, members] of Object.entries(ALL_LISTS)) {
    it(`${category} has at least one member`, () => {
      expect(members.length).toBeGreaterThan(0);
    });
  }
});
