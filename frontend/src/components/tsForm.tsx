import { createTsForm } from '@ts-react/form';
import { z } from 'zod';
import { TextField } from './fields/text';
import { CheckBoxField } from './fields/checkBox';
import { NumberField } from './fields/number';
import { PropsWithChildren } from 'react';

const mapping = [
  [z.string(), TextField],
  [z.boolean(), CheckBoxField],
  [z.number(), NumberField],
  // @ts-ignore
  [z.enum(), TextField],
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
