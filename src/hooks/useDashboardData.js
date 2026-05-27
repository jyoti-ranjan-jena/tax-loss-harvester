import { useQuery } from '@tanstack/react-query';
import { fetchHoldings, fetchCapitalGains } from '../api/apiService';
import { useHarvestStore } from '../store/useHarvestStore';
import { calculateHarvesting } from '../utils/calculations';
import { useMemo } from 'react';

export function useDashboardData() {
  const { selectedHoldings, toggleHolding, toggleAll } = useHarvestStore();

  const holdingsQuery = useQuery({
    queryKey: ['holdings'],
    queryFn: fetchHoldings,
  });

  const capitalGainsQuery = useQuery({
    queryKey: ['capitalGains'],
    queryFn: fetchCapitalGains,
  });

  const isLoading = holdingsQuery.isLoading || capitalGainsQuery.isLoading;
  const isError = holdingsQuery.isError || capitalGainsQuery.isError;
  const rawCapitalGains = capitalGainsQuery.data?.capitalGains;

  // Enrich raw holdings data with guaranteed unique composite IDs
  const holdings = useMemo(() => {
    const data = holdingsQuery.data || [];
    return data.map((item, index) => ({
      ...item,
      id: `${item.coin}-${index}` // Unique ID example: "USDC-0", "USDC-7"
    }));
  }, [holdingsQuery.data]);

  const metrics = useMemo(() => {
    return calculateHarvesting(rawCapitalGains, holdings, selectedHoldings);
  }, [rawCapitalGains, holdings, selectedHoldings]);

  return {
    isLoading,
    isError,
    holdings,
    metrics,
    selectedHoldings,
    toggleHolding,
    toggleAll
  };
}