import { useMemo } from 'react';
import { Badge } from './ui/badge';
import randomColor from 'randomcolor';
import { Skeleton } from './ui/skeleton';
import { YarnTypeRecord } from '@/@data/yarnTypes.types';
import { ManufacturerRecord } from '@/@data/manufacturers.types';

interface BadgeProps {
  value: string;
  seed: string;
  hue?: number | string;
}

export function RandomColorBadge({ value, seed, hue }: BadgeProps) {
  const color = useMemo(
    () => randomColor({ luminosity: 'dark', seed: seed + value, hue }),
    [seed, value, hue]
  );
  return (
    <Badge className="w-fit" style={{ background: color }}>
      {value}
    </Badge>
  );
}

export function YarnTypeBadge({ yarnType }: { yarnType?: YarnTypeRecord }) {
  return yarnType ? (
    <RandomColorBadge value={yarnType.name} seed={yarnType.id} hue="pink" />
  ) : (
    <Skeleton className="h-5 w-14" />
  );
}

export function ManufacturerBadge({
  manufacturer,
}: {
  manufacturer?: ManufacturerRecord;
}) {
  return manufacturer ? (
    <RandomColorBadge
      value={manufacturer.name}
      seed={manufacturer.id}
      hue="blue"
    />
  ) : (
    <Skeleton className="h-5 w-14" />
  );
}

export function ColorCodeBadge({
  color,
  value,
}: {
  color: any;
  value?: string;
}) {
  return value ? (
    <Badge className="w-fit" style={{ background: color }}>
      <span className="pr-2">Color code:</span>
      {value}
    </Badge>
  ) : (
    <Skeleton className="h-5 w-14" />
  );
}
