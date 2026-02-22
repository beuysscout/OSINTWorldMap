import type { LiveCountryData, WorldBankIndicator } from '../types';

const REST_COUNTRIES_BASE = 'https://restcountries.com/v3.1';
const WORLD_BANK_BASE = 'https://api.worldbank.org/v2';

export async function fetchCountryLiveData(code: string): Promise<LiveCountryData | null> {
  try {
    const res = await fetch(`${REST_COUNTRIES_BASE}/alpha/${code}?fields=population,area,flags,currencies`);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      population: data.population,
      area: data.area,
      flag: data.flags?.svg || data.flags?.png || '',
      currencies: data.currencies || {},
    };
  } catch {
    return null;
  }
}

export async function fetchWorldBankIndicators(code: string): Promise<WorldBankIndicator> {
  const indicators: WorldBankIndicator = {};
  const year = new Date().getFullYear() - 2; // most recent available is usually 2 years behind

  const fetchIndicator = async (indicator: string): Promise<number | undefined> => {
    try {
      const res = await fetch(
        `${WORLD_BANK_BASE}/country/${code}/indicator/${indicator}?date=${year - 2}:${year}&format=json&per_page=5`
      );
      if (!res.ok) return undefined;
      const data = await res.json();
      if (!data[1]) return undefined;
      const entry = data[1].find((d: { value: number | null }) => d.value !== null);
      return entry?.value ?? undefined;
    } catch {
      return undefined;
    }
  };

  const [gdp, gdpPerCapita, popGrowth] = await Promise.all([
    fetchIndicator('NY.GDP.MKTP.CD'),
    fetchIndicator('NY.GDP.PCAP.CD'),
    fetchIndicator('SP.POP.GROW'),
  ]);

  indicators.gdp = gdp;
  indicators.gdpPerCapita = gdpPerCapita;
  indicators.populationGrowth = popGrowth;

  return indicators;
}
