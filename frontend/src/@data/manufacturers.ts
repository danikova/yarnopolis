import { pb } from './client';
import { ManufacturerRecord } from './manufacturers.types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export function useManufacturers(
  options?: Partial<UseQueryOptions<ManufacturerRecord[], Error>>
) {
  return useQuery({
    queryKey: ['manufacturers'],
    queryFn: async () =>
      await pb.collection('manufacturers').getFullList<ManufacturerRecord>(),
    ...options,
  });
}
