import { pb } from './client';
import { ManufacturerRecord } from './manufacturers.types';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export function useManufacturer(
  manufacturerId: string,
  options?: Partial<UseQueryOptions<ManufacturerRecord, Error>>
) {
  return useQuery({
    queryKey: ['manufacturers', manufacturerId],
    queryFn: async () =>
      await pb
        .collection('manufacturers')
        .getOne<ManufacturerRecord>(manufacturerId),
    ...options,
  });
}
