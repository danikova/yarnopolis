import { CreateRecordInput } from './base.types';
import { pb } from './client';
import { YarnRecord } from './yarns.types';
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export function useYarns(
  sort?: string,
  options?: Partial<UseQueryOptions<YarnRecord[], Error>>
) {
  return useQuery({
    queryKey: ['yarns', sort],
    queryFn: async () =>
      await pb.collection('yarns').getFullList<YarnRecord>({
        expand: 'pictures,type,manufacturer,color',
        sort: sort ?? '-created',
      }),
    ...options,
  });
}

export type CreateYarnInput = CreateRecordInput<YarnRecord>;

export function useCreateYarn(
  options?: Partial<UseMutationOptions<YarnRecord, Error, CreateYarnInput>>
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createYarn'],
    mutationFn: async input => await pb.collection('yarns').create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['yarns'] });
    },
    ...options,
  });
}

export function useUpdateYarn(
  yarnId: string,
  options?: Partial<UseMutationOptions<YarnRecord, Error, CreateYarnInput>>
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateYarn', yarnId],
    mutationFn: async input =>
      await pb.collection('yarns').update(yarnId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['yarns'] });
    },
    ...options,
  });
}

export function useDeleteYarn(
  options?: Partial<UseMutationOptions<boolean, Error, string>>
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteYarn'],
    mutationFn: async yarnId => await pb.collection('yarns').delete(yarnId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['yarns'] });
    },
    ...options,
  });
}
