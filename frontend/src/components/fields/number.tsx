import { useTsController } from '@ts-react/form';
import { Input, type InputProps } from '../ui/input';
import { Label } from '../ui/label';
import { ErrorLabel } from './errorLabel';

interface NumberFieldProps extends InputProps {
  label?: string;
}

export function NumberField({ label, ...props }: NumberFieldProps) {
  const { field, error } = useTsController<number>();
  return (
    <div>
      {label && <Label htmlFor={field.name}>{label}</Label>}
      <Input
        type="number"
        id={field.name}
        value={field.value ? field.value : ''}
        onChange={e => {
          field.onChange(parseInt(e.target.value, 10));
        }}
        {...props}
      />
      <ErrorLabel error={error} />
    </div>
  );
}
