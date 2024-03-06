import { pb } from './client';
import { YarnRecord } from './yarns.types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export function useYarns(
  options?: Partial<UseQueryOptions<YarnRecord[], Error>>
) {
  return useQuery({
    queryKey: ['yarns'],
    queryFn: async () =>
      await pb.collection('yarns').getFullList<YarnRecord>({
        expand: 'size,pictures,type,manufacturer,color',
      }),
    ...options,
  });
}
