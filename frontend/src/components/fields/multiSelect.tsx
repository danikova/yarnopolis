import { isNil } from 'lodash';
import { useMemo } from 'react';
import { Label } from '../ui/label';
import { ErrorLabel } from './errorLabel';
import { useTsController } from '@ts-react/form';
import { MultiSelect, Option, type MultiSelectProps } from '../ui/multi-select';

interface MultiSelectFieldProps
  extends Pick<
    MultiSelectProps<any>,
    'options' | 'getBadgeComponent' | 'getItemLabel'
  > {
  label?: string;
}

export function MultiSelectField({ label, ...props }: MultiSelectFieldProps) {
  const { field, error } = useTsController<string[]>();
  const selected = useMemo(() => {
    const selected: Option<any>[] = [];
    for (const value of field.value ?? []) {
      const option = props.options.find(option => option.value.id === value);
      if (!isNil(option)) {
        selected.push(option);
      }
    }
    return selected;
  }, [field.value, props.options]);

  return (
    <div>
      {label && <Label htmlFor={field.name}>{label}</Label>}
      <MultiSelect
        selected={selected}
        onSelectionChange={data => {
          field.onChange(data.map(d => d.value.id));
        }}
        {...props}
      />
      {error?.map((e, i) => <ErrorLabel key={i} error={e} />)}
    </div>
  );
}
