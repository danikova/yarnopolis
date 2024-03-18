import { z } from 'zod';
import { sortBy } from 'lodash';
import { SizingLabel } from '../sizing';
import { useSizes } from '@/@data/sizes';
import { ErrorLabel } from './errorLabel';
import { RangeSlider } from '../ui/slider';
import { createUniqueFieldSchema, useTsController } from '@ts-react/form';
import { Label } from '../ui/label';

export const SizeMinMaxSchema = createUniqueFieldSchema(
  z.object({
    min: z.number().optional(),
    max: z.number().optional(),
  }),
  'sizeMinMax'
);
export function SizeMinMaxField(props: any) {
  const { field, error } = useTsController<z.infer<typeof SizeMinMaxSchema>>();
  const { data } = useSizes({
    select: data => sortBy(data, 'value'),
  });

  const rangeMinValue = data?.[0].value ?? 0;
  const rangeMaxValue = data?.[data?.length - 1].value ?? 0;
  const minValue = field.value?.min ?? rangeMinValue;
  const maxValue = field.value?.max ?? rangeMaxValue;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={field.name}>Yarn sizing</Label>
      <RangeSlider
        className="mb-0"
        min={rangeMinValue}
        max={rangeMaxValue}
        minStepsBetweenThumbs={0.5}
        step={0.5}
        value={[minValue ?? rangeMinValue, maxValue ?? rangeMaxValue]}
        onValueChange={value => {
          field.onChange({ min: value[0], max: value[1] });
        }}
        {...props}
      />
      <SizingLabel min={minValue} max={maxValue} />
      {error && <ErrorLabel error={error} />}
    </div>
  );
}
