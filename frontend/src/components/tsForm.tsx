import { createTsForm } from '@ts-react/form';
import { z } from 'zod';
import { TextField } from './fields/text';
import { CheckBoxField } from './fields/checkBox';
import { NumberField } from './fields/number';
import { HTMLProps, PropsWithChildren } from 'react';
import { MultiSelectField } from './fields/multiSelect';
import {
  ManufacturersField,
  ManufacturersSchema,
  YarnCodesField,
  YarnCodesSchema,
  YarnTypesField,
  YarnTypesSchema,
} from './fields/specificMultiSelects';
import { SizeMinMaxField, SizeMinMaxSchema } from './fields/sizeMinMax';
import {
  CameraCaptureField,
  CameraCaptureSchema,
} from './fields/cameraCapture';
import { SizeRangeField, SizeRangeSchema } from './fields/sizeRange';
import { cn } from '@/lib/utils';

const mapping = [
  [z.string(), TextField] as const,
  [z.boolean(), CheckBoxField] as const,
  [z.number(), NumberField] as const,
  [z.array(z.string()), MultiSelectField] as const,
  [ManufacturersSchema, ManufacturersField] as const,
  [YarnTypesSchema, YarnTypesField] as const,
  [YarnCodesSchema, YarnCodesField] as const,
  [SizeMinMaxSchema, SizeMinMaxField] as const,
  [CameraCaptureSchema, CameraCaptureField] as const,
  [SizeRangeSchema, SizeRangeField] as const,
] as const;

interface MyCustomFormProps extends HTMLProps<HTMLFormElement> {
  onSubmit: () => void;
  className?: string;
}

function MyCustomFormComponent({
  children,
  onSubmit,
  className,
  ...props
}: PropsWithChildren<MyCustomFormProps>) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn('flex flex-col gap-y-4', className)}
      {...props}
    >
      {children}
    </form>
  );
}

export const TsForm = createTsForm(mapping, {
  FormComponent: MyCustomFormComponent,
});
