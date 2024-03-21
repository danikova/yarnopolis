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
  options?: Partial<UseQueryOptions<YarnRecord[], Error>>
) {
  return useQuery({
    queryKey: ['yarns'],
    queryFn: async () =>
      await pb.collection('yarns').getFullList<YarnRecord>({
        expand: 'pictures,type,manufacturer,color',
        sort: '-created',
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
