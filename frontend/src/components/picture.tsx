import { useMemo } from 'react';
import { pb } from '@/@data/client';
import { PictureRecord } from '@/@data/pictures.type';
import { cn } from '@/lib/utils';

function usePictureUrl(picture: PictureRecord, thumb?: string) {
  return useMemo(
    () =>
      picture &&
      pb.files.getUrl(picture, picture.file, {
        thumb: thumb,
      }),
    [picture, thumb]
  );
}

interface PictureProps {
  picture: PictureRecord;
  className?: string;
  thumb?: '200x200' | '300x300' | '1000x1000';
}

export function Picture({ picture, className, thumb }: PictureProps) {
  const src = usePictureUrl(picture, thumb);

  return <img src={src} className={cn(className)} />;
}

export interface Color {
  h: number;
  s: number;
  l: number;
}
export interface PickerPictureProps extends PictureProps {
  onClick: (color: Color) => void;
}
