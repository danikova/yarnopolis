import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { YarnCodesRecord } from './yarnCodes.types';
import { pb } from './client';

export function useYarnCodes(
  options?: Partial<UseQueryOptions<YarnCodesRecord[], Error>>
) {
  return useQuery({
    queryKey: ['yarnCodes'],
    queryFn: async () =>
      await pb.collection('yarn_codes').getFullList<YarnCodesRecord>(),
    ...options,
  });
}
