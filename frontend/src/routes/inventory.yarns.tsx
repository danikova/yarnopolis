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
import { SizeMinMaxSchema } from '@/components/fields/sizeMinMax';
import { CreateYarnDialogForm } from '@/components/dialogs/createYarn';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const YarnFilterSchema = z.object({
  manufacturer: ManufacturersSchema.optional(),
  yarnTypes: YarnTypesSchema.optional(),
  yarnCodes: YarnCodesSchema.optional(),
  sizes: SizeMinMaxSchema.optional(),
});

export const Route = createFileRoute('/inventory/yarns')({
  component: Inventory,
  validateSearch: YarnFilterSchema.parse,
});

function Inventory() {
  const { data } = useYarns();

  return (
    <>
      <div className="fixed right-8 top-8 z-50 flex flex-row-reverse gap-2">
        <SheetFilter
          basePath="/inventory/yarns"
          formProps={{
            schema: YarnFilterSchema,
          }}
        />
        <CreateYarnDialogForm />
      </div>
      {/* <div className="relative z-10 flex max-h-lvh flex-wrap justify-center gap-4 overflow-auto p-8 pt-[calc(2rem*2+40px)] md:justify-normal">
        {data?.map(yarn => <YarnItem key={yarn.id} data={yarn} />)}
      </div> */}
      <div className="xl: max-h-lvh justify-center overflow-auto xl:flex">
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 640: 1, 768: 2, 1024: 3, 1280: 4 }}
          className="block p-8 pt-[calc(2rem*2+40px)] xl:w-[80rem] "
        >
          <Masonry className="gap-[1rem_!important]">
            {data?.map(yarn => (
              <div key={yarn.id} className="mb-4 block w-full">
                <YarnItem data={yarn} />
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
}
