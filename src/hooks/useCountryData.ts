import { useState, useEffect } from 'react';
import type { LiveCountryData, WorldBankIndicator } from '../types';
import { fetchCountryLiveData, fetchWorldBankIndicators } from '../utils/api';

const liveCache = new Map<string, LiveCountryData>();
const indicatorCache = new Map<string, WorldBankIndicator>();

export function useLiveData(countryCode: string | null) {
  const [liveData, setLiveData] = useState<LiveCountryData | null>(null);
  const [indicators, setIndicators] = useState<WorldBankIndicator | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!countryCode) {
      setLiveData(null);
      setIndicators(null);
      return;
    }

    let cancelled = false;
    setLoading(true);

    const load = async () => {
      // REST Countries
      if (liveCache.has(countryCode)) {
        setLiveData(liveCache.get(countryCode)!);
      } else {
        const data = await fetchCountryLiveData(countryCode);
        if (!cancelled && data) {
          liveCache.set(countryCode, data);
          setLiveData(data);
        }
      }

      // World Bank
      if (indicatorCache.has(countryCode)) {
        setIndicators(indicatorCache.get(countryCode)!);
      } else {
        const data = await fetchWorldBankIndicators(countryCode);
        if (!cancelled) {
          indicatorCache.set(countryCode, data);
          setIndicators(data);
        }
      }

      if (!cancelled) setLoading(false);
    };

    load();
    return () => { cancelled = true; };
  }, [countryCode]);

  return { liveData, indicators, loading };
}
