import { YarnRecord } from '@/@data/yarns.types';
import { type ClassValue, clsx } from 'clsx';
import { useEffect, useMemo, useRef } from 'react';
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

export function useWhatChanged(props: Record<string, any>) {
  // cache the last set of props
  const prev = useRef(props);

  useEffect(() => {
    // check each prop to see if it has changed
    const changed = Object.entries(props).reduce(
      (a, [key, prop]: [string, unknown]) => {
        if (prev.current[key] === prop) return a;
        return {
          ...a,
          [key]: {
            prev: prev.current[key],
            next: prop,
          },
        };
      },
      {} as { [k: string]: any }
    );

    if (Object.keys(changed).length > 0) {
      console.group('Props That Changed');
      console.log(changed);
      console.groupEnd();
    }

    prev.current = props;
  }, [props]);
}

export async function cropFile(
  file: File,
  size: { width: number; height: number } = { width: 300, height: 300 }
): Promise<{ file: File; dataString?: string | ArrayBuffer | null }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = size.width;
        canvas.height = size.height;

        const scaleFactor = Math.max(
          size.width / img.width,
          size.height / img.height
        );
        const scaledWidth = img.width * scaleFactor;
        const scaledHeight = img.height * scaleFactor;

        const offsetX = (size.width - scaledWidth) / 2;
        const offsetY = (size.height - scaledHeight) / 2;

        // @ts-ignore
        ctx.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);

        canvas.toBlob(function (blob) {
          // @ts-ignore
          const file = new File([blob], 'image.png', { type: 'image/png' });
          resolve({ file, dataString: event?.target?.result });
        }, 'image/png');
      };
      // @ts-ignore
      img.src = event.target.result;
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}
