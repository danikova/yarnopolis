import { useMemo } from 'react';
import { Badge } from './ui/badge';
import randomColor from 'randomcolor';
import { useYarnType } from '@/@data/yarnTypes';
import { Skeleton } from './ui/skeleton';
import { useManufacturer } from '@/@data/manufacturers';

interface BadgeProps {
  value: string;
  seed: string;
  hue?: number | string;
}

export function ColorBadge({ value, seed, hue }: BadgeProps) {
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

interface YarnTypeBadgeProps {
  yarnTypeId: string;
}

export function YarnTypeBadge({ yarnTypeId }: YarnTypeBadgeProps) {
  const { data } = useYarnType(yarnTypeId);
  return data ? (
    <ColorBadge value={data.name} seed={yarnTypeId} hue="pink" />
  ) : (
    <Skeleton className="h-5 w-14" />
  );
}

interface ManufacturerBadgeProps {
  manufacturerId: string;
}

export function ManufacturerBadge({ manufacturerId }: ManufacturerBadgeProps) {
  const { data } = useManufacturer(manufacturerId);
  return data ? (
    <ColorBadge value={data.name} seed={manufacturerId} hue="blue" />
  ) : (
    <Skeleton className="h-5 w-14" />
  );
}
