import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { usePicture } from '@/@data/pictures';
import { AspectRatio } from './ui/aspect-ratio';
import { PictureRecord } from '@/@data/pictures.type';
import { pb } from '@/@data/client';

interface PictureProps {
  pictureId?: PictureRecord['id'];
  className?: string;
  thumb?: '200x200' | '300x300' | '1000x1000';
}

export function Picture({ pictureId, className, thumb }: PictureProps) {
  const { data } = usePicture(pictureId ?? '', { enabled: !!pictureId });
  const src = useMemo(
    () =>
      data &&
      pb.files.getUrl(data, data.file, {
        thumb: thumb,
      }),
    [data, thumb]
  );

  return (
    <AspectRatio
      ratio={1 / 1}
      className={cn('flex justify-center overflow-hidden', className)}
    >
      <img
        src={src}
        alt={data?.description}
        className="rounded-md object-cover"
      />
    </AspectRatio>
  );
}
