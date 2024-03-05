import { pb } from './client';
import { YarnTypeRecord } from './yarnTypes.types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export function useYarnType(
  yarnTypeId: string,
  options?: Partial<UseQueryOptions<YarnTypeRecord, Error>>
) {
  return useQuery({
    queryKey: ['yarnTypes', yarnTypeId],
    queryFn: async () =>
      await pb.collection('yarn_types').getOne<YarnTypeRecord>(yarnTypeId),
    ...options,
  });
}
