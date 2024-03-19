import { ItemBase } from '.';
import { CSSProperties } from 'react';
import { IconLabel } from '../labels';
import { HookSizingLabel, YarnSizingLabel } from '../sizing';
import { Scale, Sigma } from 'lucide-react';
import { YarnRecord } from '@/@data/yarns.types';
import { ColorCodeBadge, ManufacturerBadge, YarnTypeBadge } from '../badges';
import { YarnDetailsDialog } from '../dialogs/yarn';
import { useHSLstringFromYarn } from '@/lib/utils';

export function YarnItem({ data: yarn }: { data: YarnRecord }) {
  const hslValue = useHSLstringFromYarn(yarn);

  return (
    <ItemBase
      style={
        {
          '--item-color': hslValue,
          '--tw-ring-color': 'hsla(var(--item-color), 0.5)',
        } as CSSProperties
      }
      className="ring-2 transition-shadow hover:cursor-pointer hover:ring-4"
      bgPicture={yarn?.expand?.pictures}
      detailsDialog={<YarnDetailsDialog yarn={yarn} />}
    >
      <div className="flex flex-auto flex-col gap-2">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2">
            <ManufacturerBadge manufacturer={yarn?.expand?.manufacturer} />
            <YarnTypeBadge yarnType={yarn?.expand?.type} />
            <ColorCodeBadge
              color={`hsl(var(--item-color))`}
              value={yarn?.expand?.code?.name}
            />
          </div>
          <div className="flex gap-4 pt-2">
            <YarnSizingLabel value={yarn.expand?.yarn_size?.value ?? 0} />
            <HookSizingLabel
              min={yarn.expand?.hook_size?.[0].value ?? 0}
              max={yarn.expand?.hook_size?.[1].value ?? 0}
            />
          </div>
        </div>
        <div className="flex flex-[0_0_auto] flex-row-reverse gap-4">
          <IconLabel
            icon={<Scale className="h-4 w-4 opacity-70" />}
            value={`${yarn.weight} g`}
          />
          <IconLabel
            icon={<Sigma className="h-4  w-4 opacity-70" />}
            value={yarn.quantity}
          />
        </div>
      </div>
    </ItemBase>
  );
}
