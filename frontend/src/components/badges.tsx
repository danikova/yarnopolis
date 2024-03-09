import { useMemo } from 'react';
import randomColor from 'randomcolor';
import { YarnTypeRecord } from '@/@data/yarnTypes.types';
import { ManufacturerRecord } from '@/@data/manufacturers.types';
import { Badge, type BadgeProps as BadgePropsOriginal } from './ui/badge';

interface BadgeProps extends BadgePropsOriginal {
  value: string;
  seed: string;
  hue?: number | string;
}

export function RandomColorBadge({ value, seed, hue, ...props }: BadgeProps) {
  const color = useMemo(
    () => randomColor({ luminosity: 'light', seed: seed + value, hue }),
    [seed, value, hue]
  );
  return (
    <Badge
      className="w-fit text-foreground"
      style={{ background: color }}
      {...props}
    >
      {value}
    </Badge>
  );
}

export interface YarnTypeBadgeProps extends BadgePropsOriginal {
  yarnType?: YarnTypeRecord;
}

export function YarnTypeBadge({ yarnType, ...props }: YarnTypeBadgeProps) {
  return yarnType ? (
    <RandomColorBadge
      value={yarnType.name}
      seed={yarnType.id}
      hue="pink"
      {...props}
    />
  ) : null;
}

export interface ManufacturerBadgeProps extends BadgePropsOriginal {
  manufacturer?: ManufacturerRecord;
}

export function ManufacturerBadge({
  manufacturer,
  ...props
}: ManufacturerBadgeProps) {
  return manufacturer ? (
    <RandomColorBadge
      value={manufacturer.name}
      seed={manufacturer.id}
      hue="blue"
      {...props}
    />
  ) : null;
}

export interface ColorCodeBadgeProps extends BadgePropsOriginal {
  color: any;
  value?: string;
}

export function ColorCodeBadge({
  color,
  value,
  ...props
}: ColorCodeBadgeProps) {
  if (value)
    return (
      <Badge className="w-fit" style={{ background: color }} {...props}>
        <span className="pr-2 max-lg:hidden">Color code:</span>
        {value}
      </Badge>
    );

  if (color)
    return (
      <Badge className="w-fit" style={{ background: color }} {...props}>
        Color
      </Badge>
    );

  return null;
}
