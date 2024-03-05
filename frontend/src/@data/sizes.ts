import { pb } from './client';
import { SizeRecord } from './sizes.types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export function useSizes(
  options?: Partial<UseQueryOptions<SizeRecord[], Error>>
) {
  return useQuery({
    queryKey: ['sizes'],
    queryFn: async () => await pb.collection('sizes').getFullList<SizeRecord>(),
    ...options,
  });
}
