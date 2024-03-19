import { z } from 'zod';
import { sortBy } from 'lodash';
import { HookSizingLabel } from '../sizing';
import { useSizes } from '@/@data/sizes';
import { ErrorLabel } from './errorLabel';
import { RangeSlider } from '../ui/slider';
import { createUniqueFieldSchema, useTsController } from '@ts-react/form';
import { Label } from '../ui/label';
import { useMemo } from 'react';

export const SizeMinMaxSchema = createUniqueFieldSchema(
  z.array(z.string()),
  'sizeMinMax'
);
export function SizeMinMaxField(props: any) {
  const { field, error } = useTsController<z.infer<typeof SizeMinMaxSchema>>();
  const { data } = useSizes({
    select: data => sortBy(data, 'value'),
  });

  const minItemIndex = useMemo(() => {
    const minId = field.value?.[0];
    const i = data?.findIndex(item => item.id === minId);
    if (!i || i < 0) return 0;
    return i;
  }, [field.value, data]);

  const maxItemIndex = useMemo(() => {
    const maxId = field.value?.[1];
    const i = data?.findIndex(item => item.id === maxId);
    if (!i || i < 0) {
      if (data) return data.length - 1;
      else return 0;
    }
    return i;
  }, [field.value, data]);

  const minItem = data?.[minItemIndex];
  const maxItem = data?.[maxItemIndex];

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={field.name}>Hook sizing</Label>
      {maxItemIndex !== 0 && (
        <RangeSlider
          className="mb-0"
          min={0}
          max={data?.length ?? 0}
          minStepsBetweenThumbs={1}
          step={1}
          value={[minItemIndex, maxItemIndex]}
          onValueChange={value => {
            const minIndex = value[0];
            const maxIndex = value[1];
            field.onChange([data?.[minIndex].id, data?.[maxIndex].id]);
          }}
          {...props}
        />
      )}
      <HookSizingLabel
        min={minItem?.value ?? data?.[0].value ?? 0}
        max={maxItem?.value ?? data?.[data?.length - 1].value ?? 0}
      />
      {error && <ErrorLabel error={error} />}
    </div>
  );
}
