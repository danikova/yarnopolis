import { useClickAway } from '@uidotdev/usehooks';
import { ElementRef, useState } from 'react';
import { Select, SelectContent, SelectItem } from './select';
import { BaseRecord } from '@/@data/base.types';
import * as SelectPrimitive from '@radix-ui/react-select';
import { useMap } from '@/lib/utils';
import { Option } from 'lucide-react';

export interface Option<T> {
  label: string;
  value: T;
}

export interface MultiSelectProps<T = BaseRecord> {
  options: Option<T>[];
  selected: Map<string, Option<T>>;
  onSelectionChange: (selected: Option<T>[]) => void;
  getBadgeComponent: (option: Option<T>, deselect: () => void) => JSX.Element;
  getItemLabel: (option: Option<T>) => any;
  placeholder?: string;
}

export function MultiSelect<T extends BaseRecord = BaseRecord>({
  options,
  selected,
  onSelectionChange,
  getBadgeComponent,
  getItemLabel: getItemComponent,
  ...props
}: MultiSelectProps<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useClickAway<ElementRef<typeof SelectContent>>(() => {
    setIsOpen(false);
  });
  const notSelected = useMap<string, Option<T>>(
    options.map(option => [option.value.id, option])
  );

  return (
    <Select open={isOpen}>
      <SelectPrimitive.Trigger
        onClick={e => {
          if (e.target !== e.currentTarget) return;
          setIsOpen(true);
        }}
        className="flex h-fit w-full flex-wrap items-center justify-normal gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
      >
        {[...selected.values()].map(option =>
          getBadgeComponent(option, () => {
            notSelected.set(option.value.id, option);
            selected.delete(option.value.id);
            onSelectionChange([...selected.values()]);
          })
        )}
        {selected.size === 0 && (
          <span className="text-muted-foreground">{props.placeholder ?? 'Select something'}</span>
        )}
      </SelectPrimitive.Trigger>
      <SelectContent ref={ref}>
        {[...notSelected.values()].map(option => {
          return (
            <SelectItem
              value={option.value.id}
              onClick={() => {
                selected.set(option.value.id, option);
                notSelected.delete(option.value.id);
                onSelectionChange([...selected.values()]);
              }}
            >
              {getItemComponent(option)}
            </SelectItem>
          );
        })}
        {notSelected.size === 0 && (
          <SelectItem disabled value='no item'>
            <span className="text-muted-foreground">No more options</span>
            </SelectItem>
            )}
      </SelectContent>
    </Select>
  );
}
