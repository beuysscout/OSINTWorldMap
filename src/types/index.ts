export interface HistoryEntry {
  period: string;
  title: string;
  description: string;
}

export interface EconomicsData {
  summary: string;
  keySectors: string[];
  tradePartners: string[];
  challenges: string[];
}

export interface GeopoliticsData {
  governmentType: string;
  alliances: string[];
  rivals: string[];
  strategicInterests: string[];
  summary: string;
}

export interface CultureData {
  languages: string[];
  religions: string[];
  highlights: string[];
  summary: string;
}

export interface CountryStaticData {
  code: string;
  numericCode: string;
  name: string;
  capital: string;
  region: string;
  overview: string;
  history: HistoryEntry[];
  economics: EconomicsData;
  geopolitics: GeopoliticsData;
  culture: CultureData;
}

export interface LiveCountryData {
  population: number;
  area: number;
  flag: string;
  currencies: Record<string, { name: string; symbol: string }>;
}

export interface WorldBankIndicator {
  gdp?: number;
  gdpPerCapita?: number;
  populationGrowth?: number;
}

export interface CountryData {
  static: CountryStaticData;
  live?: LiveCountryData;
  indicators?: WorldBankIndicator;
}

export type TabId = 'overview' | 'history' | 'economics' | 'geopolitics' | 'culture';
