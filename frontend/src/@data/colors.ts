import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { ColorRecord } from './colors.types';
import { pb } from './client';

export function useColor(
  colorId: string,
  options?: Partial<UseQueryOptions<ColorRecord, Error>>
) {
  return useQuery({
    queryKey: ['colors', colorId],
    queryFn: async () =>
      await pb.collection('colors').getOne<ColorRecord>(colorId),
    ...options,
  });
}
