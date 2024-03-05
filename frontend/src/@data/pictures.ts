import { pb } from './client';
import { PictureRecord } from './pictures.type';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

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
