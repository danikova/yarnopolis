import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { YarnCodeRecord } from './yarnCodes.types';
import { pb } from './client';
import { CreateRecordInput } from './base.types';

export function useYarnCodes(
  options?: Partial<UseQueryOptions<YarnCodeRecord[], Error>>
) {
  return useQuery({
    queryKey: ['yarnCodes'],
    queryFn: async () =>
      await pb.collection('yarn_codes').getFullList<YarnCodeRecord>(),
    ...options,
  });
}

export type CreateYarnCodeInput = CreateRecordInput<YarnCodeRecord>;

export function useCreateYarnCode(
  options?: Partial<
    UseMutationOptions<YarnCodeRecord, Error, CreateYarnCodeInput>
  >
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createYarnCode'],
    mutationFn: async input => await pb.collection('yarn_codes').create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['yarnCodes'] });
    },
    ...options,
  });
}
