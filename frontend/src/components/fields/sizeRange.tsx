import { z } from 'zod';
import { sortBy } from 'lodash';
import { YarnSizingLabel } from '../sizing';
import { useSizes } from '@/@data/sizes';
import { ErrorLabel } from './errorLabel';
import { Slider } from '../ui/slider';
import { createUniqueFieldSchema, useTsController } from '@ts-react/form';
import { Label } from '../ui/label';
import { useMemo } from 'react';

export const SizeRangeSchema = createUniqueFieldSchema(z.string(), 'sizeRange');
export function SizeRangeField(props: any) {
  const { field, error } = useTsController<z.infer<typeof SizeRangeSchema>>();
  const { data } = useSizes({
    select: data => sortBy(data, 'value'),
  });

  const itemIndex = useMemo(() => {
    const id = field.value;
    const i = data?.findIndex(item => item.id === id);
    if (!i || i < 0) return 1;
    return i;
  }, [field.value, data]);

  const item = data?.[itemIndex];

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={field.name}>Yarn sizing</Label>
      <Slider
        className="mb-0"
        min={1}
        max={data?.length ?? 0}
        step={2}
        value={[itemIndex]}
        onValueChange={value => {
          const index = value[0];
          field.onChange(data?.[index].id);
        }}
        {...props}
      />
      <YarnSizingLabel value={item?.value ?? data?.[0].value ?? 0} />
      <ErrorLabel error={error} />
    </div>
  );
}
