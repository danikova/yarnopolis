import { YarnRecord } from '@/@data/yarns.types';
import { type ClassValue, clsx } from 'clsx';
import { useMemo } from 'react';
import { useMap as useMapOriginal } from '@uidotdev/usehooks';
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

export function useMap<K, V>(initialState?: [K, V][]) {
  return useMapOriginal(initialState) as never as Map<K, V>;
}
