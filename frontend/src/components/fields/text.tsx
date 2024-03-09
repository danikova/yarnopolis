import { useTsController } from '@ts-react/form';
import { Input, type InputProps } from '../ui/input';
import { Label } from '../ui/label';
import { ErrorLabel } from './errorLabel';

interface TextFieldProps extends InputProps {
  label: string;
}

export function TextField({ label, ...props }: TextFieldProps) {
  const { field, error } = useTsController<string>();
  return (
    <div>
      <Label htmlFor={field.name}>
        {}
        {label}
      </Label>
      <Input
        id={field.name}
        value={field.value ? field.value : ''}
        onChange={e => {
          field.onChange(e.target.value);
        }}
        {...props}
      />
      <ErrorLabel error={error} />
    </div>
  );
}
