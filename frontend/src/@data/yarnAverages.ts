import { pb } from './client';
import { YarnAverageRecord } from './yarnAverages.types';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export function useYarnAverages(
  options?: Partial<UseQueryOptions<YarnAverageRecord[], Error>>
) {
  return useQuery({
    queryKey: ['yarnAverages'],
    queryFn: async () =>
      await pb.collection('yarn_averages').getFullList<YarnAverageRecord>(),
    ...options,
  });
}
