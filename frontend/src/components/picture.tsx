import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { AspectRatio } from './ui/aspect-ratio';
import { PictureRecord } from '@/@data/pictures.type';
import { pb } from '@/@data/client';

interface PictureProps {
  picture?: PictureRecord;
  className?: string;
  thumb?: '200x200' | '300x300' | '1000x1000';
}

export function Picture({ picture, className, thumb }: PictureProps) {
  const src = useMemo(
    () =>
      picture &&
      pb.files.getUrl(picture, picture.file, {
        thumb: thumb,
      }),
    [picture, thumb]
  );

  return (
    <AspectRatio
      ratio={1 / 1}
      className={cn('flex justify-center overflow-hidden', className)}
    >
      <img
        src={src}
        alt={picture?.description}
        className="rounded-md object-cover"
      />
    </AspectRatio>
  );
}
