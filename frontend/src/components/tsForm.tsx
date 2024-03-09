import { createTsForm } from '@ts-react/form';
import { z } from 'zod';
import { TextField } from './fields/text';
import { CheckBoxField } from './fields/checkBox';
import { NumberField } from './fields/number';
import { PropsWithChildren } from 'react';
import { MultiSelectField } from './fields/multiSelect';

const mapping = [
  [z.string(), TextField] as const,
  [z.boolean(), CheckBoxField] as const,
  [z.number(), NumberField] as const,
  // @ts-ignore
  [z.enum(), TextField] as const,
  [z.array(z.string()), MultiSelectField] as const,
] as const;

function MyCustomFormComponent({
  children,
  onSubmit,
}: PropsWithChildren<{
  onSubmit: () => void;
}>) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
      {children}
    </form>
  );
}

export const TsForm = createTsForm(mapping, {
  FormComponent: MyCustomFormComponent,
});
