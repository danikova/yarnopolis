import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { YarnCodeRecord } from './yarnCodes.types';
import { pb } from './client';

export function useYarnCodes(
  options?: Partial<UseQueryOptions<YarnCodeRecord[], Error>>
) {
  return useQuery({
    queryKey: ['yarnCodes'],
    queryFn: async () =>
      await pb.collection('yarn_codes').getFullList<YarnCodeRecord>(),
    ...options,
  });
}
