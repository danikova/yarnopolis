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
      `${color?.hue}, ${color?.saturation ?? 0}%, ${color?.lightness ?? 0}%`,
    [color]
  );
  return hslString;
}

export function useMap<K, V>(initialState?: [K, V][]) {
  return useMapOriginal(initialState) as never as Map<K, V>;
}

export function parseRgbExpression(rgbExpression: string) {
  const regex = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/;
  const match = rgbExpression.match(regex);

  if (match) {
    const red = parseInt(match[1], 10);
    const green = parseInt(match[2], 10);
    const blue = parseInt(match[3], 10);
    return { red, green, blue };
  } else {
    return { red: 0, green: 0, blue: 0 };
  }
}

export function rgbaToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h ? (h /= 6) : (h = 0);
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}
