import type { CountryStaticData } from '../types';

export const countriesData: Record<string, CountryStaticData> = {
  USA: {
    code: 'USA',
    numericCode: '840',
    name: 'United States',
    capital: 'Washington, D.C.',
    region: 'Americas',
    overview:
      'The United States is the world\'s largest economy and most powerful military force, wielding enormous influence over global politics, finance, and culture. As a federal republic of 50 states, it has shaped the post-WWII international order through institutions like NATO, the UN, and the Bretton Woods system.',
    history: [
      { period: '1776', title: 'Declaration of Independence', description: 'The thirteen colonies declared independence from Britain, establishing the foundational principles of liberty and self-governance that would define the nation.' },
      { period: '1861–1865', title: 'Civil War', description: 'A devastating conflict between the Union and Confederacy over slavery and states\' rights that resulted in the abolition of slavery and preservation of the Union.' },
      { period: '1941–1945', title: 'World War II', description: 'The U.S. emerged as a global superpower after playing a decisive role in defeating the Axis powers in both the European and Pacific theaters.' },
      { period: '1991', title: 'End of the Cold War', description: 'The collapse of the Soviet Union left the U.S. as the world\'s sole superpower, ushering in an era of American-led liberal international order.' },
    ],
    economics: {
      summary: 'The U.S. has the world\'s largest nominal GDP, driven by a highly diversified economy with strengths in technology, finance, healthcare, and energy. The dollar serves as the global reserve currency.',
      keySectors: ['Technology', 'Financial Services', 'Healthcare', 'Energy', 'Defense'],
      tradePartners: ['Canada', 'Mexico', 'China', 'European Union'],
      challenges: ['National debt exceeding $30 trillion', 'Income inequality and wealth gap', 'Infrastructure modernization needs'],
    },
    geopolitics: {
      governmentType: 'Federal Presidential Constitutional Republic',
      alliances: ['NATO', 'Five Eyes', 'AUKUS', 'USMCA'],
      rivals: ['China', 'Russia', 'Iran'],
      strategicInterests: ['Freedom of navigation in Indo-Pacific', 'Energy independence', 'Technology supremacy', 'Counter-terrorism'],
      summary: 'The U.S. maintains a global network of military bases and alliances, projecting power across every continent. Its strategic competition with China defines the current geopolitical era.',
    },
    culture: {
      languages: ['English', 'Spanish'],
      religions: ['Christianity', 'Judaism', 'Islam', 'Unaffiliated'],
      highlights: ['Hollywood and global entertainment industry', 'Silicon Valley tech innovation culture', 'Jazz, blues, hip-hop, and rock music origins', 'National parks system spanning diverse landscapes'],
      summary: 'American culture is a melting pot of influences from around the world, exported globally through media, technology, and popular culture. Its emphasis on individualism, entrepreneurship, and freedom of expression has shaped modern global culture.',
    },
  },

  CHN: {
    code: 'CHN',
    numericCode: '156',
    name: 'China',
    capital: 'Beijing',
    region: 'Asia',
    overview:
      'China is the world\'s most populous country and second-largest economy, with a civilization stretching back over 5,000 years. Under the Chinese Communist Party, it has undergone rapid industrialization and now challenges American hegemony as a rising superpower.',
    history: [
      { period: '221 BC', title: 'Qin Unification', description: 'Qin Shi Huang unified China for the first time, establishing centralized imperial rule, standardized writing, and beginning construction of the Great Wall.' },
      { period: '1949', title: 'People\'s Republic Founded', description: 'Mao Zedong proclaimed the People\'s Republic after the Communist victory in the civil war, fundamentally reshaping Chinese society and governance.' },
      { period: '1978', title: 'Reform and Opening Up', description: 'Deng Xiaoping launched market reforms that transformed China from an agrarian economy into the world\'s manufacturing powerhouse.' },
      { period: '2001', title: 'WTO Accession', description: 'China\'s entry into the World Trade Organization accelerated its integration into the global economy, fueling decades of double-digit GDP growth.' },
    ],
    economics: {
      summary: 'China is the world\'s largest manufacturer and exporter, with a GDP exceeding $17 trillion. Its economy blends state-directed planning with market dynamics, and it leads globally in renewable energy investment.',
      keySectors: ['Manufacturing', 'Technology', 'Renewable Energy', 'E-commerce', 'Infrastructure'],
      tradePartners: ['United States', 'European Union', 'ASEAN', 'Japan'],
      challenges: ['Aging population and demographic decline', 'Property sector debt crisis', 'US-China tech decoupling'],
    },
    geopolitics: {
      governmentType: 'Unitary One-Party Socialist Republic',
      alliances: ['Shanghai Cooperation Organisation', 'BRICS', 'Belt and Road Initiative'],
      rivals: ['United States', 'India', 'Taiwan tensions'],
      strategicInterests: ['Taiwan reunification', 'South China Sea dominance', 'Belt and Road global infrastructure', 'Semiconductor self-sufficiency'],
      summary: 'China pursues a multipolar world order challenging Western dominance, using economic leverage, military modernization, and diplomatic initiatives to expand its sphere of influence across Asia, Africa, and beyond.',
    },
    culture: {
      languages: ['Mandarin Chinese', 'Cantonese', 'Wu', 'Min'],
      religions: ['Buddhism', 'Taoism', 'Folk religions', 'Atheism/Agnosticism'],
      highlights: ['Great Wall and Forbidden City', 'Chinese cuisine with eight major regional traditions', 'Traditional Chinese medicine and martial arts', 'Rapid tech culture including WeChat and TikTok'],
      summary: 'Chinese culture is one of the world\'s oldest continuous civilizations, deeply rooted in Confucian values, family, and harmony. Modern China blends ancient traditions with cutting-edge technology and rapid urbanization.',
    },
  },

  RUS: {
    code: 'RUS',
    numericCode: '643',
    name: 'Russia',
    capital: 'Moscow',
    region: 'Europe',
    overview:
      'Russia is the world\'s largest country by area, spanning 11 time zones from Eastern Europe to the Pacific. A nuclear superpower and major energy exporter, it plays a pivotal role in global geopolitics despite economic challenges.',
    history: [
      { period: '862–1547', title: 'Kievan Rus to Tsardom', description: 'From Viking-founded Kievan Rus through Mongol domination to the rise of Muscovy, Russia consolidated into a vast Eurasian state under the Tsars.' },
      { period: '1917', title: 'Russian Revolution', description: 'The Bolshevik Revolution overthrew the Tsar and established the Soviet Union, the world\'s first communist state and a 20th-century superpower.' },
      { period: '1991', title: 'Soviet Collapse', description: 'The dissolution of the USSR created 15 independent states and ended the Cold War, leading to a turbulent transition period for Russia.' },
      { period: '2000–present', title: 'Putin Era', description: 'Vladimir Putin\'s leadership restored centralized authority and reasserted Russian influence globally, culminating in military interventions in Georgia, Crimea, and Ukraine.' },
    ],
    economics: {
      summary: 'Russia\'s economy is heavily dependent on oil and natural gas exports, making it vulnerable to commodity price swings. It possesses vast natural resources but struggles with diversification and Western sanctions.',
      keySectors: ['Oil & Gas', 'Mining', 'Defense Industry', 'Agriculture', 'Nuclear Energy'],
      tradePartners: ['China', 'India', 'Turkey', 'Belarus'],
      challenges: ['Western sanctions and economic isolation', 'Over-dependence on hydrocarbons', 'Brain drain and demographic decline'],
    },
    geopolitics: {
      governmentType: 'Federal Semi-Presidential Republic',
      alliances: ['CSTO', 'BRICS', 'Shanghai Cooperation Organisation', 'Eurasian Economic Union'],
      rivals: ['NATO/United States', 'Ukraine', 'European Union'],
      strategicInterests: ['Near-abroad influence over former Soviet states', 'Arctic resource access', 'Energy leverage over Europe', 'Military modernization'],
      summary: 'Russia seeks to maintain its status as a great power and counterbalance Western influence, leveraging its nuclear arsenal, energy exports, and strategic partnerships with China and other non-Western nations.',
    },
    culture: {
      languages: ['Russian'],
      religions: ['Russian Orthodox Christianity', 'Islam', 'Buddhism'],
      highlights: ['Literary giants: Tolstoy, Dostoevsky, Chekhov', 'Bolshoi Ballet and classical music tradition', 'Space exploration legacy (Sputnik, Gagarin)', 'Distinctive architecture from onion domes to Soviet brutalism'],
      summary: 'Russian culture has produced some of the world\'s greatest literature, music, and art. Its identity is shaped by a blend of European and Asian influences, Orthodox Christian heritage, and a deep sense of historical resilience.',
    },
  },

  GBR: {
    code: 'GBR',
    numericCode: '826',
    name: 'United Kingdom',
    capital: 'London',
    region: 'Europe',
    overview:
      'The United Kingdom, comprising England, Scotland, Wales, and Northern Ireland, was once the center of the largest empire in history. Today it remains a major global financial center, nuclear power, and permanent member of the UN Security Council.',
    history: [
      { period: '1066', title: 'Norman Conquest', description: 'William the Conqueror\'s invasion of England reshaped the island\'s culture, language, and governance, establishing a feudal system and connecting Britain to continental Europe.' },
      { period: '1688–1815', title: 'Rise of Empire', description: 'From the Glorious Revolution through the defeat of Napoleon, Britain established parliamentary democracy and built a global maritime empire spanning every continent.' },
      { period: '1939–1945', title: 'World War II', description: 'Britain stood alone against Nazi Germany in 1940 before the Allied coalition achieved victory, though the war exhausted the empire and accelerated decolonization.' },
      { period: '2016–2020', title: 'Brexit', description: 'The UK voted to leave the European Union in a historic referendum, fundamentally altering its economic and political relationship with Europe.' },
    ],
    economics: {
      summary: 'The UK has the world\'s sixth-largest economy, anchored by London\'s role as a global financial hub. Post-Brexit, it is recalibrating trade relationships while maintaining strengths in services, technology, and creative industries.',
      keySectors: ['Financial Services', 'Technology', 'Pharmaceuticals', 'Creative Industries', 'Aerospace'],
      tradePartners: ['European Union', 'United States', 'China'],
      challenges: ['Post-Brexit trade friction', 'Regional inequality (North-South divide)', 'National Health Service funding pressures'],
    },
    geopolitics: {
      governmentType: 'Unitary Parliamentary Constitutional Monarchy',
      alliances: ['NATO', 'Five Eyes', 'AUKUS', 'Commonwealth of Nations', 'UN Security Council (P5)'],
      rivals: ['Russia'],
      strategicInterests: ['Transatlantic alliance with the US', 'Indo-Pacific tilt', 'Global Britain trade agenda', 'Northern Ireland stability'],
      summary: 'The UK leverages its diplomatic network, intelligence capabilities, and military strength to maintain outsized global influence relative to its size, balancing its special relationship with the US against independent foreign policy goals.',
    },
    culture: {
      languages: ['English', 'Welsh', 'Scottish Gaelic'],
      religions: ['Christianity (Anglican)', 'Islam', 'Hinduism', 'Sikhism'],
      highlights: ['Shakespeare and the English literary canon', 'The BBC and global media influence', 'Premier League football', 'Royal traditions and pageantry'],
      summary: 'British culture has shaped the modern world through language, law, literature, and sport. The English language, common law tradition, and parliamentary democracy have been adopted worldwide, making the UK\'s cultural legacy arguably its greatest export.',
    },
  },

  FRA: {
    code: 'FRA',
    numericCode: '250',
    name: 'France',
    capital: 'Paris',
    region: 'Europe',
    overview:
      'France is Western Europe\'s largest country and a founding member of the EU. A nuclear power and UN Security Council permanent member, it wields significant soft power through its language, culture, cuisine, and diplomatic tradition.',
    history: [
      { period: '1789', title: 'French Revolution', description: 'The revolution overthrew the monarchy and established principles of liberty, equality, and fraternity that became foundational to modern democratic thought worldwide.' },
      { period: '1804–1815', title: 'Napoleonic Era', description: 'Napoleon Bonaparte reshaped the map of Europe through military conquest and spread revolutionary ideals, codifying French civil law that influenced legal systems globally.' },
      { period: '1958', title: 'Fifth Republic', description: 'Charles de Gaulle established the Fifth Republic, creating a strong presidential system and asserting French independence in foreign policy during the Cold War.' },
      { period: '1957–present', title: 'European Integration', description: 'France has been a driving force behind European unity, from the Treaty of Rome to the Eurozone, partnering with Germany as the EU\'s core leadership tandem.' },
    ],
    economics: {
      summary: 'France has the world\'s seventh-largest economy with strengths in luxury goods, aerospace, agriculture, and tourism. It receives more international tourists than any other country.',
      keySectors: ['Luxury Goods', 'Aerospace & Defense', 'Agriculture & Wine', 'Tourism', 'Nuclear Energy'],
      tradePartners: ['Germany', 'European Union', 'United States', 'China'],
      challenges: ['High public debt and fiscal reform needs', 'Labor market rigidity', 'Social cohesion and integration challenges'],
    },
    geopolitics: {
      governmentType: 'Unitary Semi-Presidential Republic',
      alliances: ['NATO', 'European Union', 'UN Security Council (P5)', 'La Francophonie'],
      rivals: ['Russia'],
      strategicInterests: ['European strategic autonomy', 'Influence in Africa (Françafrique)', 'Nuclear deterrence', 'Mediterranean security'],
      summary: 'France pursues an independent foreign policy emphasizing European sovereignty, maintains a nuclear arsenal, and retains significant military and cultural influence across Africa and the Indo-Pacific through overseas territories.',
    },
    culture: {
      languages: ['French'],
      religions: ['Christianity (Catholic)', 'Islam', 'Judaism', 'Secularism (Laïcité)'],
      highlights: ['Cuisine recognized as UNESCO Intangible Heritage', 'Louvre, Versailles, and world-class museums', 'Fashion capital: Chanel, Dior, Louis Vuitton', 'Philosophical tradition from Descartes to Foucault'],
      summary: 'France is synonymous with art, philosophy, gastronomy, and fashion. Its cultural contributions — from Impressionism to existentialism, from haute cuisine to haute couture — have profoundly shaped Western civilization.',
    },
  },

  DEU: {
    code: 'DEU',
    numericCode: '276',
    name: 'Germany',
    capital: 'Berlin',
    region: 'Europe',
    overview:
      'Germany is Europe\'s largest economy and the de facto leader of the European Union. Rebuilt from the devastation of World War II and reunified in 1990, it is a manufacturing powerhouse known for engineering excellence and export-driven growth.',
    history: [
      { period: '1871', title: 'Unification', description: 'Otto von Bismarck unified the German states into a single empire under Prussian leadership, creating a new European great power.' },
      { period: '1933–1945', title: 'Nazi Era & WWII', description: 'The Nazi regime under Hitler led to the Holocaust, World War II, and the near-total destruction of Germany, leaving deep scars on European and global memory.' },
      { period: '1949–1989', title: 'Division', description: 'Germany was split into West (democratic, capitalist) and East (communist), with the Berlin Wall becoming the defining symbol of the Cold War.' },
      { period: '1990', title: 'Reunification', description: 'The fall of the Berlin Wall in 1989 led to German reunification, integrating East Germany and reestablishing Berlin as the capital of a united nation.' },
    ],
    economics: {
      summary: 'Germany is the world\'s third-largest exporter and Europe\'s economic engine, renowned for its Mittelstand (mid-sized companies), automotive industry, and precision manufacturing.',
      keySectors: ['Automotive', 'Mechanical Engineering', 'Chemicals', 'Pharmaceuticals', 'Renewable Energy'],
      tradePartners: ['European Union', 'United States', 'China', 'United Kingdom'],
      challenges: ['Energy transition post-Russian gas dependency', 'Digital infrastructure lag', 'Aging workforce and skilled labor shortage'],
    },
    geopolitics: {
      governmentType: 'Federal Parliamentary Republic',
      alliances: ['NATO', 'European Union', 'G7', 'OSCE'],
      rivals: ['Russia'],
      strategicInterests: ['European integration and EU leadership', 'Energy security (Energiewende)', 'Defense spending modernization', 'Transatlantic partnership'],
      summary: 'Germany anchors European stability through economic leadership and multilateral diplomacy. Post-2022, it has undergone a historic defense awakening (Zeitenwende), increasing military spending in response to Russian aggression.',
    },
    culture: {
      languages: ['German'],
      religions: ['Christianity (Protestant/Catholic)', 'Islam', 'Unaffiliated'],
      highlights: ['Oktoberfest and beer-brewing tradition', 'Classical music: Bach, Beethoven, Brahms', 'Bauhaus design movement', 'World-leading automotive culture (Autobahn)'],
      summary: 'German culture combines a deep tradition of philosophy, music, and engineering with a modern commitment to environmental consciousness and social welfare. The country\'s reckoning with its past has made it a model for historical accountability.',
    },
  },

  JPN: {
    code: 'JPN',
    numericCode: '392',
    name: 'Japan',
    capital: 'Tokyo',
    region: 'Asia',
    overview:
      'Japan is the world\'s third-largest economy and a technological leader known for innovation, manufacturing excellence, and a unique blend of ancient tradition and ultra-modernity. It is a key U.S. ally in the Indo-Pacific.',
    history: [
      { period: '1603–1868', title: 'Edo Period', description: 'Under Tokugawa shogunate rule, Japan experienced 250 years of peace and isolation, developing distinctive arts, culture, and a sophisticated urban society.' },
      { period: '1868', title: 'Meiji Restoration', description: 'Japan rapidly industrialized and modernized by adopting Western technology and institutions while preserving its cultural identity, becoming Asia\'s first industrial power.' },
      { period: '1945', title: 'Post-War Reconstruction', description: 'After devastating defeat in WWII and atomic bombings, Japan rebuilt as a pacifist democracy and achieved an "economic miracle" becoming the world\'s second-largest economy.' },
      { period: '1990s–present', title: 'Lost Decades & Revival', description: 'Asset bubble collapse led to prolonged stagnation, but Japan remains a top-tier economy pivoting toward robotics, AI, and defense normalization.' },
    ],
    economics: {
      summary: 'Japan maintains the world\'s third-largest GDP through advanced manufacturing, robotics, and automotive excellence. Despite decades of low growth, it leads in technology patents and quality manufacturing.',
      keySectors: ['Automotive', 'Electronics', 'Robotics', 'Precision Manufacturing', 'Gaming & Entertainment'],
      tradePartners: ['United States', 'China', 'South Korea', 'ASEAN'],
      challenges: ['Severe demographic decline and aging society', 'Massive government debt (over 250% of GDP)', 'Deflation and economic stagnation'],
    },
    geopolitics: {
      governmentType: 'Unitary Parliamentary Constitutional Monarchy',
      alliances: ['US-Japan Security Alliance', 'Quad (US, India, Australia)', 'G7', 'CPTPP'],
      rivals: ['China', 'North Korea', 'Russia (Kuril Islands dispute)'],
      strategicInterests: ['Free and open Indo-Pacific', 'Defense normalization', 'Taiwan Strait stability', 'Technology leadership'],
      summary: 'Japan is pivoting from its post-war pacifism toward a more assertive security posture, driven by rising threats from China and North Korea. It maintains the US-Japan alliance as the cornerstone of its security strategy.',
    },
    culture: {
      languages: ['Japanese'],
      religions: ['Shinto', 'Buddhism'],
      highlights: ['Anime, manga, and global pop culture influence', 'Traditional arts: tea ceremony, ikebana, kabuki', 'Cuisine: sushi, ramen — UNESCO-recognized washoku', 'Cherry blossom (hanami) tradition and seasonal aesthetics'],
      summary: 'Japanese culture is renowned for its meticulous craftsmanship, aesthetic sensibility, and seamless integration of ancient traditions with futuristic innovation. From samurai heritage to anime, Japan\'s cultural exports captivate the world.',
    },
  },

  IND: {
    code: 'IND',
    numericCode: '356',
    name: 'India',
    capital: 'New Delhi',
    region: 'Asia',
    overview:
      'India is the world\'s most populous country and its fastest-growing major economy. The birthplace of Hinduism and Buddhism, it is the world\'s largest democracy and an emerging great power with a young, dynamic workforce.',
    history: [
      { period: '2500 BC', title: 'Indus Valley Civilization', description: 'One of the world\'s oldest urban civilizations flourished in the Indian subcontinent, featuring advanced city planning, sanitation, and trade networks.' },
      { period: '1526–1857', title: 'Mughal Empire', description: 'The Mughal dynasty ruled much of the subcontinent, creating architectural marvels like the Taj Mahal and fostering a rich synthesis of Hindu and Islamic cultures.' },
      { period: '1947', title: 'Independence & Partition', description: 'India gained independence from British colonial rule through a largely nonviolent movement led by Gandhi, but partition into India and Pakistan caused massive displacement.' },
      { period: '1991', title: 'Economic Liberalization', description: 'India opened its economy to global markets, sparking rapid growth in IT services, manufacturing, and a burgeoning middle class.' },
    ],
    economics: {
      summary: 'India is the world\'s fifth-largest economy, powered by IT services, a massive domestic market, and a young population. It aims to become a $10 trillion economy by the mid-2030s.',
      keySectors: ['Information Technology', 'Pharmaceuticals', 'Agriculture', 'Textiles', 'Space Technology'],
      tradePartners: ['United States', 'China', 'UAE', 'European Union'],
      challenges: ['Income inequality and poverty reduction', 'Infrastructure development needs', 'Air pollution and environmental challenges'],
    },
    geopolitics: {
      governmentType: 'Federal Parliamentary Democratic Republic',
      alliances: ['Quad', 'BRICS', 'Non-Aligned Movement heritage', 'G20'],
      rivals: ['Pakistan', 'China (border disputes)'],
      strategicInterests: ['Strategic autonomy (multi-alignment)', 'Indian Ocean security', 'Kashmir sovereignty', 'Technology and manufacturing self-reliance (Make in India)'],
      summary: 'India practices strategic autonomy, maintaining relationships with both Western and non-Western blocs. Its rivalry with Pakistan and border tensions with China shape its security calculus, while its democratic model offers an alternative to China\'s rise.',
    },
    culture: {
      languages: ['Hindi', 'English', '21 other official languages'],
      religions: ['Hinduism', 'Islam', 'Christianity', 'Sikhism', 'Buddhism'],
      highlights: ['Bollywood — world\'s largest film industry by output', 'Yoga and meditation as global wellness practices', 'Diverse cuisine varying dramatically by region', 'Ancient architectural heritage: temples, forts, and palaces'],
      summary: 'India\'s culture is extraordinarily diverse, encompassing thousands of languages, cuisines, and traditions across its vast geography. From classical dance and music to Bollywood and cricket, India\'s cultural vitality reflects the dynamism of over a billion people.',
    },
  },

  BRA: {
    code: 'BRA',
    numericCode: '076',
    name: 'Brazil',
    capital: 'Brasília',
    region: 'Americas',
    overview:
      'Brazil is South America\'s largest country and the world\'s ninth-largest economy. Home to most of the Amazon rainforest and extraordinary biodiversity, it is a regional powerhouse and major agricultural exporter.',
    history: [
      { period: '1500', title: 'Portuguese Colonization', description: 'Pedro Álvares Cabral claimed Brazil for Portugal, beginning three centuries of colonial rule that shaped the country\'s language, religion, and demographics through slavery and immigration.' },
      { period: '1822', title: 'Independence', description: 'Prince Pedro declared Brazilian independence from Portugal, establishing the Empire of Brazil — the only monarchy in the Americas at the time.' },
      { period: '1964–1985', title: 'Military Dictatorship', description: 'A military coup led to two decades of authoritarian rule that combined economic growth with political repression and human rights abuses.' },
      { period: '2003–2010', title: 'Economic Boom', description: 'Under President Lula, Brazil experienced rapid growth and poverty reduction, earning recognition as a rising BRICS power and winning bids for the 2014 World Cup and 2016 Olympics.' },
    ],
    economics: {
      summary: 'Brazil has a diversified economy driven by agriculture, mining, and a large domestic market. It is the world\'s largest exporter of soybeans, coffee, sugar, and orange juice.',
      keySectors: ['Agriculture & Agribusiness', 'Mining', 'Oil & Gas (Pre-salt)', 'Aviation (Embraer)', 'Financial Services'],
      tradePartners: ['China', 'United States', 'Argentina', 'European Union'],
      challenges: ['Deforestation and environmental sustainability', 'Political polarization', 'Infrastructure and logistics bottlenecks'],
    },
    geopolitics: {
      governmentType: 'Federal Presidential Constitutional Republic',
      alliances: ['BRICS', 'Mercosur', 'G20', 'Community of Portuguese Language Countries'],
      rivals: [],
      strategicInterests: ['Amazon sovereignty', 'South American leadership', 'UN Security Council permanent seat bid', 'South-South cooperation'],
      summary: 'Brazil seeks to position itself as a leader of the Global South, leveraging its size, resources, and diplomatic tradition to advocate for multilateralism and developing-world interests on the global stage.',
    },
    culture: {
      languages: ['Portuguese'],
      religions: ['Christianity (Catholic)', 'Evangelicalism', 'Afro-Brazilian religions'],
      highlights: ['Carnival — world\'s largest festival', 'Football: five World Cup titles, global passion', 'Bossa nova, samba, and MPB music', 'Amazon rainforest and biodiversity'],
      summary: 'Brazilian culture is a vibrant fusion of Indigenous, African, and Portuguese influences, expressed through music, dance, sport, and celebration. Its warmth, creativity, and love of life make it one of the world\'s most culturally magnetic nations.',
    },
  },

  SAU: {
    code: 'SAU',
    numericCode: '682',
    name: 'Saudi Arabia',
    capital: 'Riyadh',
    region: 'Asia',
    overview:
      'Saudi Arabia is the world\'s largest oil exporter and custodian of Islam\'s two holiest cities, Mecca and Medina. It wields enormous influence in global energy markets and the Muslim world while undergoing ambitious modernization under Vision 2030.',
    history: [
      { period: '622', title: 'Birth of Islam', description: 'The Prophet Muhammad\'s migration to Medina and the subsequent spread of Islam from the Arabian Peninsula transformed world history and created a civilization spanning three continents.' },
      { period: '1932', title: 'Kingdom Founded', description: 'Abdulaziz ibn Saud unified the Arabian Peninsula and established the Kingdom of Saudi Arabia, creating a state built on the alliance between the House of Saud and Wahhabi religious establishment.' },
      { period: '1938', title: 'Oil Discovery', description: 'The discovery of massive oil reserves transformed Saudi Arabia from a desert kingdom into one of the wealthiest nations on Earth.' },
      { period: '2016–present', title: 'Vision 2030', description: 'Crown Prince Mohammed bin Salman launched sweeping social and economic reforms to diversify the economy beyond oil, including entertainment, tourism, and mega-projects like NEOM.' },
    ],
    economics: {
      summary: 'Saudi Arabia has the largest economy in the Middle East, dominated by oil but rapidly diversifying under Vision 2030. It is the world\'s largest crude oil exporter and a major sovereign wealth fund operator (PIF).',
      keySectors: ['Oil & Gas', 'Petrochemicals', 'Tourism (religious & leisure)', 'Construction & Mega-projects', 'Sovereign Investment'],
      tradePartners: ['China', 'India', 'Japan', 'United States'],
      challenges: ['Economic diversification away from oil', 'Youth unemployment', 'Social reform pace management'],
    },
    geopolitics: {
      governmentType: 'Unitary Islamic Absolute Monarchy',
      alliances: ['GCC', 'OPEC/OPEC+', 'Arab League', 'Islamic Cooperation Organisation'],
      rivals: ['Iran'],
      strategicInterests: ['Oil market stability and pricing power', 'Regional dominance over Iran', 'Custodianship of Holy Mosques', 'Vision 2030 transformation'],
      summary: 'Saudi Arabia leverages its oil wealth, religious authority, and strategic location to project influence across the Middle East. Its rivalry with Iran and evolving relationship with the US define regional dynamics.',
    },
    culture: {
      languages: ['Arabic'],
      religions: ['Islam (Sunni — official state religion)'],
      highlights: ['Hajj pilgrimage — world\'s largest annual gathering', 'Rapidly emerging entertainment and arts scene', 'Traditional Bedouin heritage and hospitality', 'Modern mega-projects: NEOM, The Line, AlUla'],
      summary: 'Saudi culture is deeply rooted in Islamic tradition, Arabian hospitality, and Bedouin heritage. The country is experiencing a cultural renaissance under Vision 2030, opening cinemas, hosting concerts, and welcoming global tourism for the first time.',
    },
  },

  KOR: {
    code: 'KOR',
    numericCode: '410',
    name: 'South Korea',
    capital: 'Seoul',
    region: 'Asia',
    overview:
      'South Korea has transformed from a war-ravaged agrarian nation into one of the world\'s most technologically advanced economies in just decades — the "Miracle on the Han River." Its cultural exports (K-pop, K-drama) now command global audiences.',
    history: [
      { period: '1392–1897', title: 'Joseon Dynasty', description: 'Korea\'s longest-ruling dynasty fostered Confucian scholarship, created the Hangul alphabet, and maintained a distinctive Korean cultural identity for over 500 years.' },
      { period: '1950–1953', title: 'Korean War', description: 'The devastating conflict between North and South Korea ended in an armistice but no peace treaty, leaving the peninsula divided at the 38th parallel to this day.' },
      { period: '1960s–1990s', title: 'Economic Miracle', description: 'South Korea industrialized at breakneck speed under state-directed capitalism, transforming from one of the world\'s poorest nations to a high-income economy in a single generation.' },
      { period: '2010s–present', title: 'Korean Wave (Hallyu)', description: 'South Korean culture exploded globally through K-pop (BTS, BLACKPINK), K-drama, and cinema (Parasite), making it a cultural superpower.' },
    ],
    economics: {
      summary: 'South Korea is the world\'s 10th-largest economy, driven by major conglomerates (chaebols) like Samsung, Hyundai, and LG. It leads in semiconductors, shipbuilding, and consumer electronics.',
      keySectors: ['Semiconductors', 'Automotive', 'Shipbuilding', 'Electronics', 'Entertainment & Media'],
      tradePartners: ['China', 'United States', 'Japan', 'Vietnam'],
      challenges: ['World\'s lowest birth rate and demographic crisis', 'Chaebol economic concentration', 'North Korean security threat'],
    },
    geopolitics: {
      governmentType: 'Unitary Presidential Constitutional Republic',
      alliances: ['US-ROK Alliance', 'G20', 'OECD', 'CPTPP (aspirant)'],
      rivals: ['North Korea', 'Japan (historical tensions)'],
      strategicInterests: ['North Korean denuclearization', 'Semiconductor supply chain leadership', 'Indo-Pacific security', 'Reunification prospects'],
      summary: 'South Korea balances its critical security alliance with the US against its economic dependence on China, all while managing the existential threat of a nuclear-armed North Korea across the DMZ.',
    },
    culture: {
      languages: ['Korean'],
      religions: ['Christianity', 'Buddhism', 'No affiliation'],
      highlights: ['K-pop global phenomenon (BTS, BLACKPINK)', 'Korean cuisine: kimchi, bibimbap, Korean BBQ', 'Award-winning cinema (Parasite, Squid Game)', 'PC gaming and esports culture'],
      summary: 'South Korean culture blends Confucian tradition with hyper-modern innovation, producing a globally influential pop culture phenomenon. The Korean Wave demonstrates how a mid-sized nation can achieve cultural superpower status through creativity and digital platforms.',
    },
  },

  AUS: {
    code: 'AUS',
    numericCode: '036',
    name: 'Australia',
    capital: 'Canberra',
    region: 'Oceania',
    overview:
      'Australia is a vast island continent and one of the world\'s most prosperous nations, combining abundant natural resources with a highly educated workforce. It is a key Western ally in the Indo-Pacific and a major minerals and energy exporter.',
    history: [
      { period: '65,000+ years ago', title: 'Indigenous Heritage', description: 'Aboriginal and Torres Strait Islander peoples have the world\'s oldest continuous living culture, with deep connections to the land spanning tens of thousands of years.' },
      { period: '1788', title: 'British Colonization', description: 'The First Fleet established a British penal colony at Sydney Cove, beginning the colonization that devastated Indigenous populations and reshaped the continent.' },
      { period: '1901', title: 'Federation', description: 'Six colonies federated into the Commonwealth of Australia, establishing a parliamentary democracy while maintaining ties to the British Crown.' },
      { period: '1970s–present', title: 'Multicultural Pivot to Asia', description: 'Australia abandoned the White Australia policy, embraced multiculturalism, and reoriented its economy toward Asian markets, particularly China and Japan.' },
    ],
    economics: {
      summary: 'Australia achieved over 30 years of consecutive growth before 2020, driven by mining exports (iron ore, coal, LNG) and a strong services sector. It has one of the world\'s highest per-capita incomes.',
      keySectors: ['Mining & Resources', 'Education (international students)', 'Financial Services', 'Agriculture', 'Tourism'],
      tradePartners: ['China', 'Japan', 'South Korea', 'United States'],
      challenges: ['Economic dependence on China', 'Climate change impacts (bushfires, drought)', 'Housing affordability crisis'],
    },
    geopolitics: {
      governmentType: 'Federal Parliamentary Constitutional Monarchy',
      alliances: ['AUKUS', 'Five Eyes', 'Quad', 'ANZUS'],
      rivals: ['China (strategic competition)'],
      strategicInterests: ['Indo-Pacific security', 'Nuclear submarine acquisition (AUKUS)', 'Pacific Islands influence', 'Supply chain diversification from China'],
      summary: 'Australia is navigating a difficult balance between its largest trading partner (China) and its principal security ally (the US). AUKUS nuclear submarine deal signals a decisive tilt toward security over trade interests.',
    },
    culture: {
      languages: ['English', 'Indigenous languages'],
      religions: ['Christianity', 'No religion (growing)', 'Islam', 'Buddhism'],
      highlights: ['Unique wildlife: kangaroos, koalas, platypus', 'Great Barrier Reef and vast Outback', 'Surf and beach culture', 'Indigenous art and Dreamtime cultural heritage'],
      summary: 'Australian culture blends British colonial heritage with Indigenous traditions and a modern multicultural identity. Known for its laid-back outdoor lifestyle, sporting passion, and egalitarian "fair go" ethos.',
    },
  },

  CAN: {
    code: 'CAN',
    numericCode: '124',
    name: 'Canada',
    capital: 'Ottawa',
    region: 'Americas',
    overview:
      'Canada is the world\'s second-largest country by area, known for its vast wilderness, multicultural society, and high quality of life. It is a major energy producer, G7 member, and close ally of the United States.',
    history: [
      { period: '1534', title: 'French Exploration', description: 'Jacques Cartier claimed the St. Lawrence region for France, beginning centuries of French and British colonial competition that shaped Canada\'s bilingual character.' },
      { period: '1867', title: 'Confederation', description: 'The British North America Act created the Dominion of Canada, unifying provinces into a self-governing federation while maintaining ties to the British Crown.' },
      { period: '1982', title: 'Constitutional Patriation', description: 'Canada patriated its constitution from Britain and adopted the Charter of Rights and Freedoms, fully establishing its sovereign independence and protecting individual liberties.' },
      { period: '1988–present', title: 'Free Trade & Multiculturalism', description: 'The Canada-US Free Trade Agreement and official multiculturalism policy defined modern Canada as an open, trade-oriented, and diverse society.' },
    ],
    economics: {
      summary: 'Canada has the world\'s ninth-largest economy, with vast natural resources, a strong banking sector, and deep integration with the US economy through USMCA. Oil sands make it one of the world\'s top energy producers.',
      keySectors: ['Oil & Gas', 'Mining', 'Financial Services', 'Technology', 'Agriculture & Forestry'],
      tradePartners: ['United States', 'China', 'European Union', 'Mexico'],
      challenges: ['Housing affordability in major cities', 'Over-dependence on US trade', 'Indigenous reconciliation'],
    },
    geopolitics: {
      governmentType: 'Federal Parliamentary Constitutional Monarchy',
      alliances: ['NATO', 'Five Eyes', 'G7', 'USMCA', 'Commonwealth'],
      rivals: [],
      strategicInterests: ['Arctic sovereignty and Northwest Passage', 'Energy export diversification', 'NORAD continental defense', 'Indigenous rights and reconciliation'],
      summary: 'Canada\'s foreign policy balances its deep integration with the US against its commitment to multilateralism, peacekeeping, and human rights. Arctic sovereignty is growing in strategic importance as climate change opens new shipping routes.',
    },
    culture: {
      languages: ['English', 'French'],
      religions: ['Christianity', 'No religion', 'Islam', 'Hinduism', 'Sikhism'],
      highlights: ['Official bilingualism and multiculturalism', 'Hockey as national passion', 'Vast national parks and wilderness', 'Universal healthcare system'],
      summary: 'Canadian culture emphasizes tolerance, diversity, and inclusivity, shaped by its bilingual heritage and waves of immigration. Known for politeness, hockey, and maple syrup, Canada offers a distinct North American identity that values community and the natural world.',
    },
  },

  MEX: {
    code: 'MEX',
    numericCode: '484',
    name: 'Mexico',
    capital: 'Mexico City',
    region: 'Americas',
    overview:
      'Mexico is Latin America\'s second-largest economy and the U.S.\'s largest trading partner. It bridges North and Central America with a rich cultural heritage blending Indigenous and Spanish traditions and a rapidly growing manufacturing sector.',
    history: [
      { period: '1325–1521', title: 'Aztec Empire', description: 'The Aztec Empire built the magnificent city of Tenochtitlán (modern Mexico City) and dominated central Mexico before the Spanish conquest under Hernán Cortés.' },
      { period: '1810–1821', title: 'War of Independence', description: 'Mexico fought an eleven-year struggle for independence from Spain, inspired by the American and French revolutions, establishing a sovereign republic.' },
      { period: '1910–1920', title: 'Mexican Revolution', description: 'A decade of civil war against the Díaz dictatorship resulted in a new constitution and land reform, shaping modern Mexican politics and national identity.' },
      { period: '1994', title: 'NAFTA Era', description: 'The North American Free Trade Agreement transformed Mexico into a major manufacturing hub, deepening economic integration with the US and Canada.' },
    ],
    economics: {
      summary: 'Mexico is the world\'s 12th-largest economy with a massive manufacturing base, especially in automotive, aerospace, and electronics. Nearshoring trends are boosting its attractiveness as companies shift supply chains from Asia.',
      keySectors: ['Automotive Manufacturing', 'Aerospace', 'Oil & Gas (Pemex)', 'Agriculture', 'Tourism'],
      tradePartners: ['United States', 'China', 'Canada', 'European Union'],
      challenges: ['Cartel violence and security', 'Income inequality between north and south', 'Energy sector reform needs'],
    },
    geopolitics: {
      governmentType: 'Federal Presidential Constitutional Republic',
      alliances: ['USMCA', 'Pacific Alliance', 'G20', 'OECD'],
      rivals: [],
      strategicInterests: ['US-Mexico border management', 'Nearshoring investment attraction', 'Central American migration flows', 'Energy sovereignty'],
      summary: 'Mexico\'s geopolitics are dominated by its relationship with the United States — its largest trading partner, source of remittances, and neighbor with a 3,000 km shared border. It balances sovereignty concerns with deep economic interdependence.',
    },
    culture: {
      languages: ['Spanish', '68 Indigenous languages'],
      religions: ['Christianity (Catholic)', 'Evangelicalism'],
      highlights: ['Day of the Dead (Día de los Muertos)', 'Ancient ruins: Teotihuacán, Chichén Itzá', 'World-renowned cuisine: tacos, mole, mezcal', 'Muralism art movement: Rivera, Orozco, Siqueiros'],
      summary: 'Mexican culture is a vibrant synthesis of Indigenous and Spanish heritage, celebrated through food, music, art, and festivals. Its cuisine is UNESCO-recognized, and its cultural identity — from mariachi to Day of the Dead — resonates worldwide.',
    },
  },

  IDN: {
    code: 'IDN',
    numericCode: '360',
    name: 'Indonesia',
    capital: 'Jakarta',
    region: 'Asia',
    overview:
      'Indonesia is the world\'s largest archipelago nation with over 17,000 islands, the fourth-most populous country, and the world\'s largest Muslim-majority democracy. It is Southeast Asia\'s biggest economy and a rising G20 power.',
    history: [
      { period: '7th–14th c.', title: 'Maritime Empires', description: 'The Srivijaya and Majapahit empires controlled maritime trade across Southeast Asia, creating a cosmopolitan civilization at the crossroads of Indian and Chinese influence.' },
      { period: '1602–1945', title: 'Dutch Colonial Rule', description: 'The Dutch East India Company and later the colonial government exploited the archipelago\'s resources for 350 years, leaving deep economic and social legacies.' },
      { period: '1945', title: 'Independence', description: 'Sukarno declared Indonesian independence after the Japanese occupation, establishing a unified republic across a diverse archipelago of hundreds of ethnic groups.' },
      { period: '1998', title: 'Democratic Transition', description: 'The fall of Suharto\'s 32-year authoritarian New Order regime ushered in democratic reforms and decentralization, transforming Indonesia into a vibrant democracy.' },
    ],
    economics: {
      summary: 'Indonesia is Southeast Asia\'s largest economy, driven by a massive domestic market, commodity exports, and a growing digital economy. It aims to become a top-five global economy by 2045.',
      keySectors: ['Palm Oil & Agriculture', 'Mining (nickel, coal)', 'Digital Economy', 'Manufacturing', 'Tourism'],
      tradePartners: ['China', 'United States', 'Japan', 'India'],
      challenges: ['Deforestation and sustainability', 'Infrastructure gaps across islands', 'Income inequality between Java and outer islands'],
    },
    geopolitics: {
      governmentType: 'Unitary Presidential Constitutional Republic',
      alliances: ['ASEAN (founding member)', 'G20', 'Non-Aligned Movement', 'APEC'],
      rivals: ['China (South China Sea overlaps)'],
      strategicInterests: ['ASEAN centrality and leadership', 'Maritime sovereignty in South China Sea', 'New capital city (Nusantara) development', 'Nickel-based EV supply chain dominance'],
      summary: 'Indonesia pursues an independent foreign policy rooted in ASEAN centrality and non-alignment. Its control of critical nickel reserves and strategic location along major shipping lanes give it growing geopolitical leverage.',
    },
    culture: {
      languages: ['Indonesian (Bahasa Indonesia)', '700+ regional languages'],
      religions: ['Islam', 'Christianity', 'Hinduism (Bali)', 'Buddhism'],
      highlights: ['Bali — world-renowned cultural and tourist destination', 'Batik textile art (UNESCO Heritage)', 'Gamelan music and traditional dance', 'Extraordinary biodiversity: orangutans, Komodo dragons'],
      summary: 'Indonesian culture is a tapestry of hundreds of ethnic groups, languages, and traditions united by the national motto "Bhinneka Tunggal Ika" (Unity in Diversity). From Balinese temples to Javanese gamelan, it showcases remarkable cultural richness.',
    },
  },

  TUR: {
    code: 'TUR',
    numericCode: '792',
    name: 'Turkey',
    capital: 'Ankara',
    region: 'Asia',
    overview:
      'Turkey straddles Europe and Asia, making it a unique geopolitical bridge between civilizations. A NATO member and regional power, it controls the strategic Bosphorus and Dardanelles straits and has the largest economy in the Middle East-North Africa region.',
    history: [
      { period: '330–1453', title: 'Byzantine Constantinople', description: 'Istanbul (Constantinople) served as the capital of the Byzantine Empire for over a millennium, preserving Roman and Christian traditions as the Roman Empire\'s eastern successor.' },
      { period: '1299–1922', title: 'Ottoman Empire', description: 'One of history\'s longest-lasting empires, the Ottomans ruled vast territories across three continents and served as the seat of the Islamic Caliphate.' },
      { period: '1923', title: 'Republic Founded', description: 'Mustafa Kemal Atatürk established the secular Turkish Republic from the Ottoman remnants, implementing sweeping modernization reforms and Western-oriented nationalism.' },
      { period: '2002–present', title: 'AKP Era', description: 'Under Erdogan\'s AKP party, Turkey experienced economic growth and increased regional assertiveness while shifting toward a more religious and presidential governance model.' },
    ],
    economics: {
      summary: 'Turkey has a diversified emerging economy with strengths in automotive, textiles, construction, and agriculture. It serves as a key manufacturing and logistics hub bridging European and Asian markets.',
      keySectors: ['Automotive', 'Textiles & Apparel', 'Construction', 'Tourism', 'Defense Industry'],
      tradePartners: ['European Union', 'Russia', 'China', 'United States'],
      challenges: ['Currency volatility and high inflation', 'Political uncertainty affecting investment', 'Current account deficit'],
    },
    geopolitics: {
      governmentType: 'Unitary Presidential Constitutional Republic',
      alliances: ['NATO', 'G20', 'Organisation of Turkic States'],
      rivals: ['Greece (Aegean disputes)', 'Kurdish groups', 'Syria tensions'],
      strategicInterests: ['Control of Bosphorus/Dardanelles straits', 'Turkic world leadership', 'EU accession (stalled)', 'Regional influence in Middle East and Central Asia'],
      summary: 'Turkey plays multiple sides as a NATO member that also maintains relations with Russia, a EU aspirant that charts an independent course. Its control of vital waterways and large military give it unique geopolitical leverage.',
    },
    culture: {
      languages: ['Turkish', 'Kurdish'],
      religions: ['Islam (Sunni majority)', 'Alevism'],
      highlights: ['Hagia Sophia — architectural wonder bridging empires', 'Turkish cuisine: kebab, baklava, Turkish coffee', 'Historic bazaars: Grand Bazaar, Spice Market', 'Cappadocia\'s fairy chimneys and cave dwellings'],
      summary: 'Turkish culture is a rich blend of Central Asian, Middle Eastern, Mediterranean, and European influences, forged at the crossroads of civilizations. From Ottoman imperial grandeur to modern Istanbul\'s cosmopolitan energy, Turkey embodies cultural fusion.',
    },
  },

  ITA: {
    code: 'ITA',
    numericCode: '380',
    name: 'Italy',
    capital: 'Rome',
    region: 'Europe',
    overview:
      'Italy is the cradle of Western civilization, birthplace of the Roman Empire and the Renaissance, and home to more UNESCO World Heritage Sites than any other country. It is the EU\'s third-largest economy and a G7 member.',
    history: [
      { period: '753 BC–476 AD', title: 'Roman Civilization', description: 'From a small city-state to a vast empire, Rome created foundational systems of law, governance, engineering, and culture that underpin Western civilization to this day.' },
      { period: '14th–16th c.', title: 'Renaissance', description: 'The Italian Renaissance produced an unparalleled flowering of art, science, and humanism, with masters like Leonardo, Michelangelo, and Galileo transforming European thought.' },
      { period: '1861', title: 'Unification (Risorgimento)', description: 'Decades of nationalist struggle unified the Italian peninsula into a single kingdom, ending centuries of fragmentation into city-states and foreign-ruled territories.' },
      { period: '1957', title: 'Treaty of Rome', description: 'Italy was a founding member of the European Economic Community, helping launch the European integration project that evolved into today\'s European Union.' },
    ],
    economics: {
      summary: 'Italy has the world\'s eighth-largest economy, renowned for luxury goods, fashion, automotive, and food & wine. Its industrial north contrasts sharply with the less-developed south (Mezzogiorno).',
      keySectors: ['Fashion & Luxury Goods', 'Automotive (Ferrari, Fiat)', 'Food & Wine', 'Tourism', 'Machinery & Manufacturing'],
      tradePartners: ['Germany', 'France', 'United States', 'China'],
      challenges: ['High public debt (over 140% of GDP)', 'North-South economic divide', 'Low economic growth and bureaucratic inefficiency'],
    },
    geopolitics: {
      governmentType: 'Unitary Parliamentary Republic',
      alliances: ['NATO', 'European Union', 'G7', 'Mediterranean partnerships'],
      rivals: [],
      strategicInterests: ['Mediterranean migration management', 'European integration', 'Energy security and diversification', 'Libya and North Africa stability'],
      summary: 'Italy leverages its Mediterranean position, cultural prestige, and EU membership to influence European and global affairs. It faces unique challenges as a frontline state for migration from Africa and the Middle East.',
    },
    culture: {
      languages: ['Italian'],
      religions: ['Christianity (Catholic)'],
      highlights: ['Renaissance art: Sistine Chapel, David, The Last Supper', 'Cuisine: pasta, pizza, espresso, gelato (global influence)', 'Fashion capital Milan: Gucci, Prada, Versace', 'La dolce vita lifestyle and family-centered values'],
      summary: 'Italian culture has shaped the modern world through art, architecture, cuisine, and fashion. From ancient Roman engineering to Renaissance masterpieces to contemporary design, Italy\'s creative legacy is unmatched in its breadth and enduring influence.',
    },
  },

  ARG: {
    code: 'ARG',
    numericCode: '032',
    name: 'Argentina',
    capital: 'Buenos Aires',
    region: 'Americas',
    overview:
      'Argentina is South America\'s second-largest country with vast agricultural resources and a rich cultural heritage. Once one of the world\'s wealthiest nations, it has experienced cycles of economic boom and crisis that define its modern trajectory.',
    history: [
      { period: '1816', title: 'Independence', description: 'Argentina declared independence from Spain, with José de San Martín leading liberation campaigns that also freed Chile and Peru from colonial rule.' },
      { period: '1880–1930', title: 'Golden Age', description: 'Massive European immigration and agricultural exports made Argentina one of the world\'s ten richest nations, with Buenos Aires rivaling Paris in grandeur.' },
      { period: '1946–1955', title: 'Perón Era', description: 'Juan and Eva Perón\'s populist government transformed Argentine politics with workers\' rights, industrialization, and a political movement (Peronism) that endures today.' },
      { period: '2001', title: 'Economic Crisis', description: 'Argentina\'s worst economic crisis brought sovereign debt default, currency collapse, and social upheaval, becoming a cautionary tale in international finance.' },
    ],
    economics: {
      summary: 'Argentina has Latin America\'s third-largest economy with enormous agricultural potential (Pampas), lithium reserves, and shale energy (Vaca Muerta). Chronic inflation and debt cycles remain persistent challenges.',
      keySectors: ['Agriculture (soybeans, beef, wine)', 'Lithium Mining', 'Shale Energy (Vaca Muerta)', 'Automotive', 'Software & Tech'],
      tradePartners: ['Brazil', 'China', 'United States', 'European Union'],
      challenges: ['Chronic inflation and currency instability', 'Sovereign debt sustainability', 'Capital controls and economic volatility'],
    },
    geopolitics: {
      governmentType: 'Federal Presidential Constitutional Republic',
      alliances: ['Mercosur', 'G20', 'BRICS (newest member)'],
      rivals: ['United Kingdom (Falklands/Malvinas dispute)'],
      strategicInterests: ['Falklands/Malvinas sovereignty claim', 'Antarctic territory claims', 'Lithium triangle leadership', 'Regional integration'],
      summary: 'Argentina balances regional partnerships in South America with its Falklands dispute with Britain and growing ties to China. Its vast natural resources and strategic Antarctic position give it geopolitical significance beyond its economic weight.',
    },
    culture: {
      languages: ['Spanish'],
      religions: ['Christianity (Catholic)'],
      highlights: ['Tango — passionate dance born in Buenos Aires', 'Football: Maradona, Messi, and national obsession', 'World-class beef and Malbec wine', 'Literary tradition: Borges, Cortázar'],
      summary: 'Argentine culture is passionate, expressive, and deeply European-influenced, with a distinctive Latin American flavor. From the melancholy of tango to the euphoria of football, Argentina\'s cultural identity is defined by intense emotion and artistic flair.',
    },
  },

  ZAF: {
    code: 'ZAF',
    numericCode: '710',
    name: 'South Africa',
    capital: 'Pretoria',
    region: 'Africa',
    overview:
      'South Africa is the continent\'s most industrialized economy and a beacon of post-apartheid democratic transition. It holds vast mineral wealth, a sophisticated financial sector, and serves as the gateway to investment in sub-Saharan Africa.',
    history: [
      { period: '1652', title: 'Dutch Settlement', description: 'The Dutch East India Company established a supply station at the Cape, beginning European colonization that would displace indigenous Khoisan and Bantu peoples.' },
      { period: '1948–1991', title: 'Apartheid', description: 'The white-minority government institutionalized racial segregation through the apartheid system, creating profound inequality that drew international condemnation and sanctions.' },
      { period: '1990–1994', title: 'Democratic Transition', description: 'Nelson Mandela\'s release from prison and the first democratic elections peacefully ended apartheid, establishing a multiracial democracy celebrated worldwide.' },
      { period: '2010', title: 'FIFA World Cup', description: 'South Africa hosted Africa\'s first World Cup, showcasing the nation\'s progress and potential to a global audience of billions.' },
    ],
    economics: {
      summary: 'South Africa has Africa\'s most diversified economy with strengths in mining, financial services, and manufacturing. However, extreme inequality, high unemployment, and infrastructure challenges persist.',
      keySectors: ['Mining (gold, platinum, diamonds)', 'Financial Services', 'Automotive Manufacturing', 'Agriculture', 'Tourism'],
      tradePartners: ['China', 'European Union', 'United States', 'India'],
      challenges: ['Extreme inequality (highest Gini coefficient globally)', 'Unemployment exceeding 30%', 'Energy crisis and load-shedding (Eskom)'],
    },
    geopolitics: {
      governmentType: 'Unitary Parliamentary Constitutional Republic',
      alliances: ['BRICS', 'African Union', 'SADC', 'G20'],
      rivals: [],
      strategicInterests: ['African continental leadership', 'BRICS engagement for Global South', 'Energy transition (coal to renewables)', 'Regional stability in Southern Africa'],
      summary: 'South Africa positions itself as Africa\'s leading voice in global forums, leveraging BRICS membership and AU influence. It advocates for Global South interests while navigating domestic challenges of inequality and governance.',
    },
    culture: {
      languages: ['11 official languages including Zulu, Xhosa, Afrikaans, English'],
      religions: ['Christianity', 'Traditional African religions', 'Islam', 'Hinduism'],
      highlights: ['Rainbow Nation diversity and reconciliation legacy', 'Rich music scene: jazz, kwaito, amapiano', 'Safari wildlife and Kruger National Park', 'Ubuntu philosophy of communal humanity'],
      summary: 'South Africa\'s "Rainbow Nation" identity celebrates extraordinary diversity across language, ethnicity, and religion. The Ubuntu philosophy — "I am because we are" — and the reconciliation legacy of Mandela define a culture of resilience and hope.',
    },
  },

  EGY: {
    code: 'EGY',
    numericCode: '818',
    name: 'Egypt',
    capital: 'Cairo',
    region: 'Africa',
    overview:
      'Egypt is the Arab world\'s most populous nation and the cradle of one of humanity\'s earliest civilizations. Controlling the Suez Canal — one of the world\'s most vital trade chokepoints — it remains a pivotal player in Middle Eastern and African geopolitics.',
    history: [
      { period: '3100 BC', title: 'Ancient Egyptian Civilization', description: 'The unification of Upper and Lower Egypt created one of history\'s greatest civilizations, producing the pyramids, hieroglyphics, and advances in medicine, astronomy, and engineering.' },
      { period: '641 AD', title: 'Arab Conquest', description: 'The Arab-Muslim conquest transformed Egypt\'s language, religion, and culture, making it a center of Islamic learning and governance for over a millennium.' },
      { period: '1869', title: 'Suez Canal Opens', description: 'The canal connecting the Mediterranean and Red Seas transformed global trade and made Egypt a strategic prize for colonial powers, notably Britain.' },
      { period: '2011', title: 'Egyptian Revolution', description: 'The Arab Spring uprising toppled President Mubarak after 30 years, leading to a turbulent transition that ultimately brought the military back to political dominance.' },
    ],
    economics: {
      summary: 'Egypt has the second-largest economy in Africa, powered by Suez Canal revenues, tourism, remittances, and natural gas. A young population of over 100 million presents both opportunities and challenges.',
      keySectors: ['Suez Canal Transit Fees', 'Tourism', 'Natural Gas', 'Agriculture (Nile Delta)', 'Textiles'],
      tradePartners: ['European Union', 'Saudi Arabia', 'United States', 'China'],
      challenges: ['Population growth straining resources', 'Foreign debt and currency pressures', 'Water scarcity and Nile dam disputes (GERD)'],
    },
    geopolitics: {
      governmentType: 'Unitary Semi-Presidential Republic',
      alliances: ['Arab League', 'African Union', 'US strategic partner'],
      rivals: ['Ethiopia (GERD water dispute)', 'Muslim Brotherhood'],
      strategicInterests: ['Suez Canal security and revenue', 'Nile water rights', 'Sinai Peninsula security', 'Libya and Gaza border stability'],
      summary: 'Egypt\'s control of the Suez Canal and its role as a mediator in Israeli-Palestinian affairs make it indispensable to regional stability. US military aid and Gulf investment sustain its strategic position.',
    },
    culture: {
      languages: ['Arabic'],
      religions: ['Islam (Sunni)', 'Coptic Christianity'],
      highlights: ['Pyramids of Giza — last surviving Ancient Wonder', 'Pharaonic heritage spanning 3,000 years', 'Al-Azhar — oldest center of Islamic learning', 'Vibrant music, cinema, and literary tradition (Mahfouz)'],
      summary: 'Egyptian culture bridges the ancient and modern worlds, from the awe-inspiring legacy of the pharaohs to the vibrant street life of Cairo. As the historical center of Arab culture, Egypt\'s influence on language, music, cinema, and religion extends across the entire region.',
    },
  },
};

export const getCountryByNumericCode = (numericCode: string): CountryStaticData | undefined => {
  return Object.values(countriesData).find((c) => c.numericCode === numericCode);
};

export const supportedCountryCodes = new Set(
  Object.values(countriesData).map((c) => c.numericCode),
);

// Alpha-3 based lookups for Mapbox vector tileset integration
export const supportedAlpha3Codes = new Set(Object.keys(countriesData));
