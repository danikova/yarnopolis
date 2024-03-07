import { YarnRecord } from '@/@data/yarns.types';
import { type ClassValue, clsx } from 'clsx';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useHSLstringFromYarn(yarn: YarnRecord) {
  const { color } = yarn.expand ?? {};
  const hslString = useMemo(
    () =>
      `${color?.hue}, ${(color?.saturation ?? 0) * 100}%, ${(color?.lightness ?? 0) * 100}%`,
    [color]
  );
  return hslString;
}
