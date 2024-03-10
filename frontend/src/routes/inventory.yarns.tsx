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

const YarnFilterSchema = z.object({
  manufacturer: ManufacturersSchema.optional(),
  yarnTypes: YarnTypesSchema.optional(),
  yarnCodes: YarnCodesSchema.optional(),
});

export const Route = createFileRoute('/inventory/yarns')({
  component: Inventory,
  validateSearch: YarnFilterSchema.parse,
});

function Inventory() {
  const { data } = useYarns();

  return (
    <>
      <div className="relative z-10 flex flex-wrap justify-center gap-4 p-8 md:justify-normal">
        {data?.map(yarn => <YarnItem key={yarn.id} data={yarn} />)}
      </div>
      <div className="relative z-50">
        <SheetFilter
          basePath="/inventory/yarns"
          formProps={{
            schema: YarnFilterSchema,
          }}
        />
      </div>
    </>
  );
}
