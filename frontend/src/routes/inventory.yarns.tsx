import { z } from 'zod';
import { useYarns } from '@/@data/yarns';
import {
  ManufacturersSchema,
  YarnCodesSchema,
  YarnTypesSchema,
} from '@/components/fields/specificMultiSelects';
import { YarnItem } from '@/components/items/yarn';
import { SheetFilter } from '@/components/sheetFilter';
import { createFileRoute } from '@tanstack/react-router';
import { DialogForm } from '@/components/dialogForm';
import { SizeMinMaxSchema } from '@/components/fields/sizeMinMax';

const YarnFilterSchema = z.object({
  manufacturer: ManufacturersSchema.optional(),
  yarnTypes: YarnTypesSchema.optional(),
  yarnCodes: YarnCodesSchema.optional(),
  sizes: SizeMinMaxSchema.optional(),
});

const CreateNewYarnSchema = z.object({
  code: z.string().optional(),
  manufacturer: ManufacturersSchema.optional(),
  yarnTypes: YarnTypesSchema.optional(),
  sizes: SizeMinMaxSchema.optional(),
  quantity: z.number().optional(),
  weight: z.number().optional(),
});

export const Route = createFileRoute('/inventory/yarns')({
  component: Inventory,
  validateSearch: YarnFilterSchema.parse,
});

function Inventory() {
  const { data } = useYarns();

  return (
    <>
      <div className="relative z-50">
        <SheetFilter
          classname="fixed right-8 top-8"
          basePath="/inventory/yarns"
          formProps={{
            schema: YarnFilterSchema,
          }}
        />
        <DialogForm
          classname="fixed left-8 top-8"
          formProps={{
            schema: CreateNewYarnSchema,
            props: {
              code: {
                label: 'Yarn code',
              },
              quantity: {
                label: 'Quantity',
              },
              weight: {
                label: 'Weight',
              },
              manufacturer: {
                multiselect: false,
              },
              yarnTypes: {
                multiselect: false,
              },
            },
          }}
        />
      </div>
      <div className="relative z-10 flex flex-wrap justify-center gap-4 p-8 md:justify-normal">
        {data?.map(yarn => <YarnItem key={yarn.id} data={yarn} />)}
      </div>
    </>
  );
}
