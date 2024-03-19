import { CreateRecordInput } from './base.types';
import { pb } from './client';
import { YarnTypeRecord } from './yarnTypes.types';
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

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

export type CreateYarnTypeInput = CreateRecordInput<YarnTypeRecord>;

export function useCreateYarnType(
  options?: Partial<
    UseMutationOptions<YarnTypeRecord, Error, CreateYarnTypeInput>
  >
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createYarnType'],
    mutationFn: async input => await pb.collection('yarn_types').create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['yarnTypes'] });
    },
    ...options,
  });
}
