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
import { SortSelector } from './-components/SortSelector';
import { useState } from 'react';

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
  const [sort, setSort] = useState<string>('-created');
  const { data } = useYarns(sort);

  return (
    <>
      <div className="fixed right-8 top-8 z-50 flex flex-row-reverse gap-2">
        <SheetFilter
          basePath="/inventory/yarns"
          formProps={{
            schema: YarnFilterSchema,
          }}
        />
        <SortSelector
          onSortChange={(value, direction) => {
            switch (value) {
              case 'hue':
                setSort(`${direction === 'asc' ? '-' : ''}color.hue`);
                break;
              case 'lightness':
                setSort(`${direction === 'asc' ? '-' : ''}color.lightness`);
                break;
              case 'hook_size':
                setSort(
                  `${direction === 'asc' ? '' : '-'}hook_size_min,${direction === 'asc' ? '' : '-'}hook_size_max`
                );
                break;
              default:
                setSort(`${direction === 'asc' ? '' : '-'}${value}`);
            }
          }}
        />
        <CreateYarnDialogForm />
      </div>
      {data?.length !== 0 ? (
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
              {data?.length === 0 && <span></span>}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      ) : (
        <div className="fixed left-0 top-0 flex h-lvh w-lvw items-center justify-center">
          <span>No yarns found</span>
        </div>
      )}
    </>
  );
}
