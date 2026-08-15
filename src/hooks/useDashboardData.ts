import { useQuery } from '@tanstack/react-query';
import { mockApi, type DashboardData } from '../services/mockApi';

export const DASHBOARD_QUERY_KEY = ['dashboard'] as const;

export function useDashboardData() {
  return useQuery<DashboardData, Error>({
    queryKey: DASHBOARD_QUERY_KEY,
    queryFn: mockApi.fetchDashboard,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
