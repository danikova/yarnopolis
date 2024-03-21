import { isNil } from 'lodash';
import { useMemo } from 'react';
import { Label } from '../ui/label';
import { ErrorLabel } from './errorLabel';
import { useTsController } from '@ts-react/form';
import { MultiSelect, Option, type MultiSelectProps } from '../ui/multi-select';

interface MultiSelectFieldProps
  extends Pick<
    MultiSelectProps<any>,
    'options' | 'getBadgeComponent' | 'getItemLabel' | 'placeholder'
  > {
  label?: string;
  getOptId?: (option: Option<any>) => any;
}

export function MultiSelectField({ label, ...props }: MultiSelectFieldProps) {
  const { field, error } = useTsController<string[]>();
  const getOptId = useMemo(
    () => props.getOptId ?? ((option: Option<any>) => option.value.id),
    [props.getOptId]
  );
  const selected = useMemo(() => {
    const selected: Option<any>[] = [];
    for (const value of field.value ?? []) {
      const option = props.options.find(option => getOptId(option) === value);
      if (!isNil(option)) {
        selected.push(option);
      }
    }
    return selected;
  }, [field.value, props.options, getOptId]);

  return (
    <div>
      {label && <Label htmlFor={field.name}>{label}</Label>}
      <MultiSelect
        selected={selected}
        onSelectionChange={data => {
          field.onChange(data.map(option => getOptId(option)));
        }}
        {...props}
      />
      <ErrorLabel error={error} />
    </div>
  );
}
