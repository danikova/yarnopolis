import { pb } from './client';
import { YarnTypeRecord } from './yarnTypes.types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export function useYarnTypes(
  options?: Partial<UseQueryOptions<YarnTypeRecord[], Error>>
) {
  return useQuery({
    queryKey: ['yarnTypes'],
    queryFn: async () =>
      await pb.collection('yarn_types').getFullList<YarnTypeRecord>(),
    ...options,
  });
}
