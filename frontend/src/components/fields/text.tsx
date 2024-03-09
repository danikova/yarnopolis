import { useTsController } from '@ts-react/form';
import { Input, type InputProps } from '../ui/input';
import { Label } from '../ui/label';
import { ErrorLabel } from './errorLabel';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

interface TextFieldProps extends InputProps {
  label?: string;
}

export function TextField({ label, ...props }: TextFieldProps) {
  const { field, error } = useTsController<string>();
  return (
    <div>
      {label && <Label htmlFor={field.name}>{label}</Label>}
      <div className="flex gap-2">
        <Input
          id={field.name}
          value={field.value ? field.value : ''}
          onChange={e => {
            field.onChange(e.target.value);
          }}
          {...props}
        />
        <Button
          onClick={() => field.onChange('')}
          variant="outline"
          type="button"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ErrorLabel error={error} />
    </div>
  );
}
