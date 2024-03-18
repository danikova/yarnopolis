import { useMemo } from 'react';
import { Ruler } from 'lucide-react';
import { useSizes } from '@/@data/sizes';
import { isNaN } from 'lodash';

export function SizingLabelByIds({ sizeIds }: { sizeIds: string[] }) {
  const { data } = useSizes();
  const sizeMapping = useMemo(() => {
    const mapping: Record<string, number> = {};
    data?.forEach(size => {
      mapping[size.id] = size.value;
    });
    return mapping;
  }, [data]);
  const { min, max } = useMemo(() => {
    const values = sizeIds.map(id => sizeMapping[id]);
    return {
      min: Math.min(...values),
      max: Math.max(...values),
    };
  }, [sizeIds, sizeMapping]);

  if (sizeIds.length === 0)
    return (
      <div className="flex gap-2">
        <span>-</span>
        <Ruler className="h-5 w-5 opacity-70" />
      </div>
    );

  return <SizingLabel min={min} max={max} />;
}

export function SizingLabel({ min, max }: { min: number; max: number }) {
  if (max - min < 0.0005)
    return (
      <div className="flex gap-2">
        <span>{isNaN(min) ? 0.0 : min.toFixed(1)}</span>
        <Ruler className="h-5 w-5 opacity-70" />
      </div>
    );

  return (
    <div className="flex gap-2">
      <span>{isNaN(min) ? 0.0 : min.toFixed(1)}</span>-
      <span>{isNaN(max) ? 0.0 : max.toFixed(1)}</span>
      <Ruler className="h-5 w-5 opacity-70" />
    </div>
  );
}
