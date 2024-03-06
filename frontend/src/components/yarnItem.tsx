import { YarnRecord } from '@/@data/yarns.types';
import { Scale, Sigma } from 'lucide-react';
import { ColorCodeBadge, ManufacturerBadge, YarnTypeBadge } from './badges';
import { ItemBase, ItemDetailWrapper, ItemPictures } from './item';
import { IconLabel } from './labels';
import { SizingLabel } from './sizeing';
import { CSSProperties, useMemo } from 'react';

interface YarnItemProps {
  data: YarnRecord;
}

export function YarnItem({ data }: YarnItemProps) {
  const { color } = data.expand ?? {};
  const hslString = useMemo(
    () =>
      `${color?.hue}, ${(color?.saturation ?? 0) * 100}%, ${(color?.lightness ?? 0) * 100}%`,
    [color]
  );

  return (
    <ItemBase
      style={
        {
          '--item-color': hslString,
        } as CSSProperties
      }
      className="ring-2 ring-[hsla(var(--item-color),0.2)]"
    >
      {data?.pictures && data.pictures.length > 0 && (
        <ItemPictures
          pictures={data?.expand?.pictures ?? []}
          className="rounded-md ring-2 ring-[hsla(var(--item-color),0.5)]"
        />
      )}
      <ItemDetailWrapper className="flex flex-col">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2">
            <ManufacturerBadge manufacturer={data?.expand?.manufacturer} />
            <YarnTypeBadge yarnType={data?.expand?.type} />
            <ColorCodeBadge color={`hsl(${hslString})`} value={data?.code} />
          </div>
          <div className="flex flex-col gap-2 pt-4">
            <SizingLabel sizeIds={data.size} />
          </div>
        </div>
        <div className="flex flex-[0_0_auto] flex-row-reverse gap-4">
          <IconLabel
            icon={<Scale className="h-4 w-4 opacity-70" />}
            value={`${data.weight} g`}
          />
          <IconLabel
            icon={<Sigma className="h-4  w-4 opacity-70" />}
            value={data.quantity}
          />
        </div>
      </ItemDetailWrapper>
    </ItemBase>
  );
}