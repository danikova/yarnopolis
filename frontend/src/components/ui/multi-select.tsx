import { Option } from 'lucide-react';
import { BaseRecord } from '@/@data/base.types';
import { useClickAway } from '@uidotdev/usehooks';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Select, SelectContent, SelectItem } from './select';
import { ElementRef, useMemo, useRef, useState } from 'react';

export interface Option<T> {
  label: string;
  value: T;
}

export interface MultiSelectProps<T = BaseRecord> {
  options: Option<T>[];
  selected: Option<T>[];
  getBadgeComponent: (option: Option<T>, deselect: () => void) => JSX.Element;
  getItemLabel: (option: Option<T>) => any;
  onSelectionChange?: (selected: Option<T>[]) => void;
  placeholder?: string;
  multiselect?: boolean;
}

export function MultiSelect<T extends BaseRecord = BaseRecord>({
  options,
  selected,
  onSelectionChange,
  getBadgeComponent,
  getItemLabel: getItemComponent,
  multiselect = true,
  ...props
}: MultiSelectProps<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useClickAway<ElementRef<typeof SelectContent>>(() => {
    setIsOpen(false);
  });
  const selectedSet = useMemo(() => new Set(selected), [selected]);
  const notSelectedSet = useMemo(
    () => new Set(options.filter(option => !selectedSet.has(option))),
    [options, selectedSet]
  );
  const placeholderRef = useRef<HTMLSpanElement>(null);

  return (
    <Select open={isOpen} value="">
      <SelectPrimitive.Trigger
        onClick={e => {
          if (e.target === placeholderRef.current) setIsOpen(true);
          if (e.target !== e.currentTarget) return;
          setIsOpen(true);
        }}
        className="flex h-fit w-full flex-wrap items-center justify-normal gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
      >
        {[...selectedSet].map(option =>
          getBadgeComponent(option, () => {
            const newSelectedSet = new Set(selectedSet);
            newSelectedSet.delete(option);
            onSelectionChange && onSelectionChange([...newSelectedSet]);
          })
        )}
        {selectedSet.size === 0 && (
          <span ref={placeholderRef} className="text-muted-foreground">
            {props.placeholder ?? 'Select something'}
          </span>
        )}
      </SelectPrimitive.Trigger>
      <SelectContent ref={ref}>
        {[...notSelectedSet].map(option => {
          return (
            <SelectItem
              value={option.value.id}
              onClick={() => {
                if(multiselect){
                  const newSelectedSet = new Set(selectedSet);
                  newSelectedSet.add(option);
                  onSelectionChange && onSelectionChange([...newSelectedSet]);
                  if(newSelectedSet.size === options.length) setIsOpen(false);
                } else {
                  onSelectionChange && onSelectionChange([option]);
                  setIsOpen(false);
                }
              }}
            >
              {getItemComponent(option)}
            </SelectItem>
          );
        })}
        {notSelectedSet.size === 0 && (
          <SelectItem disabled value="no item">
            <span className="text-muted-foreground">No more options</span>
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
