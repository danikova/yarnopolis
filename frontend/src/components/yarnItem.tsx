import { YarnRecord } from '@/@data/yarns.types';
import { Scale, Sigma } from 'lucide-react';
import { ManufacturerBadge, YarnTypeBadge } from './badges';
import { ItemBase, ItemDetailWrapper, ItemPictures } from './item';
import { Label, IconLabel } from './labels';
import { SizingLabel } from './sizeing';
import { useColor } from '@/@data/colors';
import { CSSProperties, useMemo } from 'react';

interface YarnItemProps {
  data: YarnRecord;
}

export function YarnItem({ data }: YarnItemProps) {
  const { data: color } = useColor(data.color);
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
          pictures={data?.pictures}
          className="rounded-md ring-2 ring-[hsla(var(--item-color),0.5)]"
        />
      )}
      <ItemDetailWrapper className="flex flex-col">
        <div className="flex-1">
          <div className="flex gap-2">
            <ManufacturerBadge manufacturerId={data.manufacturer} />
            <YarnTypeBadge yarnTypeId={data.type} />
          </div>
          <div className="flex flex-col gap-2 pt-4">
            {data.code && (
              <div className="flex gap-2">
                <Label keyValue="Code" value={data.code} />
                <div
                  style={{ background: 'hsl(var(--item-color))' }}
                  className="h-5 w-5 rounded-md"
                />
              </div>
            )}
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
