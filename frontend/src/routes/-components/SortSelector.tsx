import { Select, SelectContent, SelectItem } from '@/components/ui/select';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { ArrowDownNarrowWide, ArrowDownWideNarrow } from 'lucide-react';

export interface SortSelectorProps {
  onSortChange?: (
    sort: (typeof SortingOptions)[number],
    direction: 'asc' | 'desc'
  ) => void;
}

const SortingOptions = [
  'code',
  'created',
  'updated',
  'yarn_size',
  'hook_size',
  'lightness',
  'weight',
] as const;

function getFancyLabel(option: (typeof SortingOptions)[number]) {
  const o = option.replace('_', ' ');
  return o.charAt(0).toUpperCase() + o.slice(1);
}

export function SortSelector({ onSortChange }: SortSelectorProps) {
  const [selected, setSelected] =
    useState<(typeof SortingOptions)[number]>('created');
  const [direction, setDirection] = useState<'asc' | 'desc'>('desc');
  const [isOpen, setIsOpen] = useState(false);

  const DirectionIndicator =
    direction === 'asc' ? ArrowDownNarrowWide : ArrowDownWideNarrow;

  useEffect(() => {
    onSortChange && onSortChange(selected, direction);
  }, [selected, direction, onSortChange]);

  return (
    <div className="flex flex-row-reverse">
      <div className="flex flex-row">
        <Button
          className="rounded-full rounded-r-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          Sort
        </Button>
        <Button
          className="rounded-full rounded-l-none"
          onClick={() => setDirection(direction === 'asc' ? 'desc' : 'asc')}
        >
          <DirectionIndicator />
        </Button>
      </div>
      <Select
        value={selected}
        onValueChange={value => setSelected(value as typeof selected)}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <SelectPrimitive.Trigger />
        <SelectContent>
          {SortingOptions.map(option => (
            <SelectItem key={option} value={option}>
              {getFancyLabel(option)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
