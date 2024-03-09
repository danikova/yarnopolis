import { useTsController } from '@ts-react/form';
import { Label } from '../ui/label';
import { Checkbox, type CheckboxProps } from '../ui/checkbox';
import { ErrorLabel } from './errorLabel';

interface CheckBoxFieldProps extends CheckboxProps {
  label: string;
}

export function CheckBoxField({ label, ...props }: CheckBoxFieldProps) {
  const { field, error } = useTsController<boolean>();
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id={field.name}
          checked={field.value}
          onCheckedChange={e => {
            field.onChange(!!e);
          }}
          {...props}
        />
        <Label
          htmlFor={field.name}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </Label>
      </div>
      <ErrorLabel error={error} />
    </div>
  );
}
