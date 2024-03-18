import { pb } from './client';
import { PictureRecord } from './pictures.type';
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';

export function usePicture(
  pictureId: string,
  options?: Partial<UseQueryOptions<PictureRecord, Error>>
) {
  return useQuery({
    queryKey: ['pictures', pictureId],
    queryFn: async () =>
      await pb.collection('pictures').getOne<PictureRecord>(pictureId),
    ...options,
  });
}

export interface CreatePictureInput {
  file: File;
}

export function useCreatePicture(
  options?: Partial<
    UseMutationOptions<PictureRecord, Error, CreatePictureInput>
  >
) {
  return useMutation({
    mutationKey: ['createNewPicture'],
    mutationFn: async ({ file }) =>
      await pb.collection('pictures').create({ file }),
    ...options,
  });
}

export interface UpdatePictureInput extends CreatePictureInput {
  pictureId: string;
}

export function useUpdatePicture(
  options?: Partial<
    UseMutationOptions<PictureRecord, Error, UpdatePictureInput>
  >
) {
  return useMutation({
    mutationKey: ['updatePicture'],
    mutationFn: async ({ pictureId, file }) =>
      await pb.collection('pictures').update(pictureId, { file }),
    ...options,
  });
}
