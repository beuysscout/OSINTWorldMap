export type ConflictRole =
  | 'aggressor'
  | 'target'
  | 'defending'
  | 'defending-allied'
  | 'aggressor-aligned'
  | 'contested'
  | 'neutral';

export interface WaveEntry {
  code: string; // ISO alpha-3
  role: ConflictRole;
  rationale: string;
}

export interface SimulationWave {
  label: string;
  timeframe: string;
  entries: WaveEntry[];
}

export interface SimulationScenario {
  id: string;
  title: string;
  subtitle: string;
  conflictType: string;
  description: string;
  waves: SimulationWave[];
}

export interface ActiveRole {
  role: ConflictRole;
  rationale: string;
  wave: number;
}

// Returns cumulative role map up to and including waveIndex
export function getActiveRoles(
  scenario: SimulationScenario,
  waveIndex: number,
): Record<string, ActiveRole> {
  const result: Record<string, ActiveRole> = {};
  for (let i = 0; i <= waveIndex && i < scenario.waves.length; i++) {
    for (const entry of scenario.waves[i].entries) {
      result[entry.code] = { role: entry.role, rationale: entry.rationale, wave: i };
    }
  }
  return result;
}

// ── Scenarios ──────────────────────────────────────────────────────────────

export const SCENARIOS: SimulationScenario[] = [

  // ── 1. Russia invades Estonia ───────────────────────────────────────────
  {
    id: 'russia-estonia',
    title: 'Russia invades Estonia',
    subtitle: 'NATO Article 5 stress test',
    conflictType: 'Land Invasion',
    description:
      'Russia launches a coordinated land and cyber attack across the Estonian border. NATO Article 5 is invoked for the first time against a nuclear-armed adversary.',
    waves: [
      {
        label: 'The Spark',
        timeframe: 'T+0',
        entries: [
          { code: 'RUS', role: 'aggressor', rationale: 'Russia launches coordinated ground assault and cyber attack across the Estonian border. Emergency Kremlin communiqué frames it as "de-Nazification" operation.' },
          { code: 'EST', role: 'target', rationale: 'Estonia under full-scale invasion. Article 5 invoked. NATO emergency session called. Tallinn communications disrupted by simultaneous cyber attack.' },
        ],
      },
      {
        label: 'Immediate Response',
        timeframe: '24–72 hours',
        entries: [
          { code: 'USA', role: 'defending', rationale: 'Article 5 obligated. US European Command activates rapid reinforcement plan. B-52s deploy to RAF Fairford. 82nd Airborne on standby.' },
          { code: 'POL', role: 'defending', rationale: 'Article 5. Poland deploys forces to its north-east border. Geographic exposure and historical memory make commitment immediate and total.' },
          { code: 'LVA', role: 'defending', rationale: 'Article 5. Latvia directly threatened as adjacent Baltic state. Full national mobilisation declared.' },
          { code: 'LTU', role: 'defending', rationale: 'Article 5. Lithuania moves to close the Suwalki Corridor, severing Russian land access to Kaliningrad.' },
          { code: 'FIN', role: 'defending', rationale: 'Article 5 (joined 2023). Finnish Defence Forces mobilise along 1,340 km Russian border. F-35s and coastal missile batteries activated.' },
          { code: 'GBR', role: 'defending', rationale: 'Article 5. UK commits air and naval assets. Pre-positioned battlegroup in Estonia moves to contact positions.' },
          { code: 'FRA', role: 'defending', rationale: 'Article 5. France deploys Rapid Reaction Corps HQ. Macron invokes collective defence in address to the nation.' },
          { code: 'NOR', role: 'defending', rationale: 'Article 5. Norway provides Arctic warfare expertise and naval coverage of the Baltic approaches.' },
          { code: 'DEU', role: 'defending-allied', rationale: 'Article 5 obligated but coalition politics constrain troop deployment. Provides Leopard tanks, IRIS-T air defence, and logistical depth.' },
          { code: 'TUR', role: 'contested', rationale: 'NATO Article 5 member but sustains energy imports from Russia and maintains Erdoğan-Putin back-channel. Likely delays commitment and blocks some sanctions.' },
        ],
      },
      {
        label: 'Alliance Pull',
        timeframe: '3–7 days',
        entries: [
          { code: 'CAN', role: 'defending', rationale: 'Article 5. Canada leads NATO battlegroup in Latvia; reinforcements deployed to theatre.' },
          { code: 'NLD', role: 'defending', rationale: 'Article 5. Netherlands deploys F-35 squadron and frigate to Baltic Sea.' },
          { code: 'SWE', role: 'defending-allied', rationale: 'NATO member (joined 2024). Sweden provides Gripen fighters, Gotland Island as logistics hub, and naval assets in the Baltic.' },
          { code: 'BEL', role: 'defending-allied', rationale: 'NATO HQ host nation. Commits politically; coalition government slows military deployment authority.' },
          { code: 'ITA', role: 'defending-allied', rationale: 'Article 5 member. Provides air policing assets but domestic politics and energy dependency complicate full ground commitment.' },
          { code: 'BLR', role: 'aggressor-aligned', rationale: 'Lukashenko provides staging ground for Russian forces and unrestricted airspace access. Belarus serves as second front.' },
          { code: 'SRB', role: 'aggressor-aligned', rationale: 'Pro-Russian sentiment. Refuses to join EU sanctions regime. Potential covert arms pipeline to Russia.' },
          { code: 'KAZ', role: 'neutral', rationale: 'CSTO member but maintains strategic ambiguity. Declines Russian requests for troops, citing domestic opposition. Abstains at UN.' },
          { code: 'CHN', role: 'neutral', rationale: 'Issues "restraint" statement. Privately opposes Western sanctions architecture. Will not intervene militarily but monitors NATO response closely.' },
          { code: 'UKR', role: 'defending-allied', rationale: 'Shares real-time battlefield intelligence, conducts cross-border operations inside Russia, and provides ISR data to NATO.' },
        ],
      },
      {
        label: 'Opportunists',
        timeframe: '1–2 weeks',
        entries: [
          { code: 'IRN', role: 'aggressor-aligned', rationale: 'Accelerates Shahed drone and artillery shell transfers to Russia. Deepens military-industrial partnership under cover of conflict.' },
          { code: 'PRK', role: 'aggressor-aligned', rationale: 'Ships additional artillery rounds and ballistic missile components. Pyongyang watches NATO response to calibrate its own deterrence.' },
          { code: 'GEO', role: 'defending-allied', rationale: 'Provides intelligence access and uses crisis to press NATO membership application. Increases pressure on Russia\'s southern flank.' },
          { code: 'MDA', role: 'defending-allied', rationale: 'Transnistria situation escalates. Moldova seeks emergency EU association and NATO security guarantees.' },
          { code: 'AZE', role: 'neutral', rationale: 'Balances Russia relationship with EU energy supply agreements. Refuses Russian corridor requests; quietly increases energy exports to Europe.' },
        ],
      },
    ],
  },

  // ── 2. China blockades Taiwan ───────────────────────────────────────────
  {
    id: 'china-taiwan',
    title: 'China blockades Taiwan',
    subtitle: 'The ambiguity stress test',
    conflictType: 'Naval Blockade',
    description:
      'The PLA Navy declares a maritime exclusion zone around Taiwan. A full naval and air blockade begins. The Taiwan Relations Act\'s deliberate ambiguity is tested in real time.',
    waves: [
      {
        label: 'The Spark',
        timeframe: 'T+0',
        entries: [
          { code: 'CHN', role: 'aggressor', rationale: 'PLA Navy declares maritime exclusion zone. Air and naval blockade begins. PLA Rocket Force places nuclear forces on elevated alert.' },
          { code: 'TWN', role: 'target', rationale: 'Taiwan under full naval and air blockade. Reserves mobilised. Emergency session of the legislature. TSMC activates continuity protocols.' },
        ],
      },
      {
        label: 'Immediate Response',
        timeframe: '24–72 hours',
        entries: [
          { code: 'USA', role: 'defending', rationale: 'Taiwan Relations Act triggers formal "grave concern." Two carrier strike groups deploy to Philippine Sea. INDOPACOM at DEFCON 3.' },
          { code: 'JPN', role: 'defending-allied', rationale: 'US bases on Okinawa — 85 km from Taiwan — activated. JSDF raises readiness. Taiwan Strait disruption is an existential shipping threat to Japan.' },
          { code: 'AUS', role: 'defending-allied', rationale: 'AUKUS partner. Australia deploys naval assets to join US carrier group. Full Five Eyes intelligence integration activated.' },
          { code: 'PHL', role: 'defending-allied', rationale: 'US-Philippines Mutual Defence Treaty. Manila provides basing access for US forces. Directly exposed to PLA maritime expansion.' },
        ],
      },
      {
        label: 'Alliance Pull',
        timeframe: '3–7 days',
        entries: [
          { code: 'GBR', role: 'defending-allied', rationale: 'Five Eyes, AUKUS. UK deploys carrier strike group to Pacific. Joins US-led sanctions architecture.' },
          { code: 'CAN', role: 'defending-allied', rationale: 'Five Eyes. Canada joins intelligence sharing and freedom of navigation patrols. No combat commitment yet.' },
          { code: 'KOR', role: 'contested', rationale: 'US ally with 28,500 US troops in-country. China receives 25% of Korean exports. Seoul seeks diplomatic resolution; delays any military commitment.' },
          { code: 'IND', role: 'contested', rationale: 'Opposes Chinese expansionism but will not join Western coalition. Increases own naval patrols in Indian Ocean. Strategic autonomy maintained.' },
          { code: 'SGP', role: 'neutral', rationale: 'Critical financial and shipping hub for both powers. Refuses to choose sides. Calls for de-escalation and freedom of navigation.' },
          { code: 'IDN', role: 'neutral', rationale: 'Largest ASEAN economy. Will not join either coalition. Concerned about South China Sea precedent but economic ties with China dominate.' },
        ],
      },
      {
        label: 'Opportunists',
        timeframe: '1–2 weeks',
        entries: [
          { code: 'PRK', role: 'aggressor-aligned', rationale: 'Fires ballistic missiles over Japan to split US attention and strain alliance response capacity.' },
          { code: 'RUS', role: 'aggressor-aligned', rationale: 'Diplomatic support at UN Security Council veto. Provides alternative supply routes circumventing sanctions. Watches NATO bandwidth.' },
          { code: 'PAK', role: 'aggressor-aligned', rationale: 'China\'s "iron brother." Quietly provides logistics and diplomatic cover. Rejects Western sanctions.' },
          { code: 'MYS', role: 'neutral', rationale: 'ASEAN solidarity. Won\'t join sanctions. Has own South China Sea disputes but trade dependency on China dominates.' },
          { code: 'VNM', role: 'neutral', rationale: 'Deep historical mistrust of both China and the US. Quietly boosts military readiness. Will not join either coalition.' },
        ],
      },
    ],
  },

  // ── 3. North Korea strikes South Korea ─────────────────────────────────
  {
    id: 'north-korea-south-korea',
    title: 'North Korea strikes South Korea',
    subtitle: 'The tripwire activated',
    conflictType: 'Artillery Strike',
    description:
      'North Korea conducts a massive artillery barrage on the Seoul metropolitan area and launches an ICBM over Japan. 28,500 US troops already in-country mean the US is in the war from minute one.',
    waves: [
      {
        label: 'The Spark',
        timeframe: 'T+0',
        entries: [
          { code: 'PRK', role: 'aggressor', rationale: 'North Korea opens with mass artillery targeting Seoul metro area (25 million people within range). Simultaneous ICBM test over Japan signals nuclear readiness.' },
          { code: 'KOR', role: 'target', rationale: 'South Korea under coordinated attack. US-ROK Combined Forces Command activates. President declares national emergency. Civil defence sirens across Seoul.' },
        ],
      },
      {
        label: 'Immediate Response',
        timeframe: '24–72 hours',
        entries: [
          { code: 'USA', role: 'defending', rationale: '28,500 US troops already in-country mean the US is at war from minute one. USFK activates. Strategic bombers deploy from Guam. B-2s on standby.' },
          { code: 'JPN', role: 'defending-allied', rationale: 'US bases on Okinawa and Misawa activated for strike missions. JSDF raises highest readiness. Patriot and Aegis systems intercept ICBM debris.' },
        ],
      },
      {
        label: 'Alliance Pull',
        timeframe: '3–7 days',
        entries: [
          { code: 'AUS', role: 'defending-allied', rationale: 'ANZUS commitment and Five Eyes. Australia provides ISR assets and pre-positions logistics support in Japan.' },
          { code: 'GBR', role: 'defending-allied', rationale: 'Five Eyes. UK provides intelligence and signals support. Naval presence in Pacific increased.' },
          { code: 'CHN', role: 'contested', rationale: 'Wants DPRK as buffer state but cannot allow a US-dominated Korea on its border. Calls for immediate ceasefire while privately pressuring Pyongyang to halt.' },
          { code: 'RUS', role: 'neutral', rationale: 'Watches carefully. Concerned about US forces consolidating closer to its borders. Calls for negotiation. No military support to DPRK.' },
        ],
      },
      {
        label: 'Opportunists',
        timeframe: '1–2 weeks',
        entries: [
          { code: 'TWN', role: 'defending-allied', rationale: 'Increased readiness given US military focus on peninsula. Quietly reinforces defensive positions while US carrier groups are tied down.' },
          { code: 'IRN', role: 'neutral', rationale: 'Studies US military response patterns, reaction times, and weapons effectiveness. Shares intelligence with Russia on US force generation.' },
          { code: 'IND', role: 'neutral', rationale: 'Evacuates nationals from Korea. Calls for UN resolution. Uses crisis to advance its own Security Council reform agenda.' },
        ],
      },
    ],
  },

  // ── 4. Iran closes Strait of Hormuz ────────────────────────────────────
  {
    id: 'iran-hormuz',
    title: 'Iran closes Strait of Hormuz',
    subtitle: '21% of world oil supply at risk',
    conflictType: 'Naval Blockade',
    description:
      'IRGC Navy mines the Strait of Hormuz and seizes two tankers. 21% of global oil supply is immediately at risk. The crisis is economic before it is military.',
    waves: [
      {
        label: 'The Spark',
        timeframe: 'T+0',
        entries: [
          { code: 'IRN', role: 'aggressor', rationale: 'IRGC Navy mines the Strait of Hormuz and seizes two oil tankers. Iranian state media declares a response to "illegal sanctions." Oil price spikes 40% in hours.' },
          { code: 'SAU', role: 'target', rationale: 'Saudi oil exports immediately blocked. Emergency OPEC+ meeting called. Aramco activates contingency plans for Red Sea routing.' },
          { code: 'ARE', role: 'defending-allied', rationale: 'UAE ports directly threatened. Al Dhafra Air Base made available to US coalition forces. Fujairah terminal outside Strait remains accessible.' },
        ],
      },
      {
        label: 'Immediate Response',
        timeframe: '24–72 hours',
        entries: [
          { code: 'USA', role: 'defending', rationale: 'US 5th Fleet activates from Bahrain. Mine countermeasure vessels deploy. Freedom of Navigation operation launched. CENTCOM raises force posture.' },
          { code: 'GBR', role: 'defending-allied', rationale: 'Royal Navy Gulf-based assets activated. HMS Montrose joins coalition. UK coordinates European response.' },
        ],
      },
      {
        label: 'Alliance Pull',
        timeframe: '3–7 days',
        entries: [
          { code: 'JPN', role: 'defending-allied', rationale: '80% of Japanese oil imports transit the Strait. Japan Maritime Self-Defense Force deploys escort vessels. Economic survival at stake.' },
          { code: 'KOR', role: 'defending-allied', rationale: '70% Gulf oil dependency. Korea joins naval escort coalition. Strategic petroleum reserves activated. Critical economic threat.' },
          { code: 'FRA', role: 'defending-allied', rationale: 'France has Indian Ocean naval presence. Joins escort coalition. Leads EU sanctions push against Iran.' },
          { code: 'DEU', role: 'defending-allied', rationale: 'EU coordinates with Germany on Iran sanctions package. Berlin avoids military deployment but provides diplomatic and financial weight.' },
          { code: 'CHN', role: 'contested', rationale: 'Largest Gulf oil importer. Privately pressures Iran to reopen the Strait but will not join Western coalition. Seeks a separate bilateral access deal.' },
          { code: 'IND', role: 'contested', rationale: 'Major Iran trading partner AND Gulf oil importer. Attempts to mediate. Will not join military coalition. Tries to exploit both sides for discounted oil.' },
          { code: 'IRQ', role: 'contested', rationale: 'Deep Iranian political influence in Baghdad. Cannot oppose Tehran publicly. But Iraqi oil exports also depend on the open Strait — impossible position.' },
        ],
      },
      {
        label: 'Opportunists',
        timeframe: '1–2 weeks',
        entries: [
          { code: 'RUS', role: 'aggressor-aligned', rationale: 'Profits from $40/barrel oil spike. Provides diplomatic cover at UN Security Council veto. Does not actively help Iran but gains from the chaos.' },
          { code: 'EGY', role: 'defending-allied', rationale: 'Suez Canal traffic surges as alternative route. Egypt gains leverage and joins US-led diplomatic coalition in exchange for debt relief.' },
          { code: 'ISR', role: 'defending-allied', rationale: 'Shares intelligence on Iranian naval capabilities. Presses for broader Iran containment coalition. Eyes opportunity to degrade IRGC.' },
          { code: 'TUR', role: 'neutral', rationale: 'Major energy transit hub. Calls for negotiation. Won\'t join military action but offers alternative pipeline routes — at a price.' },
          { code: 'OMN', role: 'contested', rationale: 'The Strait runs through Omani territorial waters. Historical mediator between US and Iran. Serves as back-channel for ceasefire negotiations.' },
        ],
      },
    ],
  },
];
