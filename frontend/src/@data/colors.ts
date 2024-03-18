import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { ColorRecord } from './colors.types';
import { pb } from './client';
import { CreateRecordInput } from './base.types';

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

export type CreateColorInput = CreateRecordInput<ColorRecord>;

export function useCreateColor(
  options?: Partial<UseMutationOptions<ColorRecord, Error, CreateColorInput>>
) {
  return useMutation({
    mutationKey: ['createColor'],
    mutationFn: async input => await pb.collection('colors').create(input),
    ...options,
  });
}
