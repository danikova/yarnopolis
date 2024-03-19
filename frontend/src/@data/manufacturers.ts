import { CreateRecordInput } from './base.types';
import { pb } from './client';
import { ManufacturerRecord } from './manufacturers.types';
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export function useManufacturers(
  options?: Partial<UseQueryOptions<ManufacturerRecord[], Error>>
) {
  return useQuery({
    queryKey: ['manufacturers'],
    queryFn: async () =>
      await pb
        .collection('manufacturers')
        .getFullList<ManufacturerRecord>({ sort: 'name' }),
    ...options,
  });
}

export type CreateManufacturerInput = CreateRecordInput<ManufacturerRecord>;

export function useCreateManufacturer(
  options?: Partial<
    UseMutationOptions<ManufacturerRecord, Error, CreateManufacturerInput>
  >
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createManufacturer'],
    mutationFn: async input =>
      await pb.collection('manufacturers').create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manufacturers'] });
    },
    ...options,
  });
}
