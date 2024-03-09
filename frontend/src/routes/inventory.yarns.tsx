import { useManufacturers } from '@/@data/manufacturers';
import { ManufacturerRecord } from '@/@data/manufacturers.types';
import { useYarns } from '@/@data/yarns';
import { ManufacturerBadge } from '@/components/badges';
import { YarnItem } from '@/components/items/yarn';
import { SheetFilter } from '@/components/sheetFilter';
import { Option } from '@/components/ui/multi-select';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { z } from 'zod';

const YarnFilterSchema = z.object({
  name: z.string().optional(),
  color: z.string().optional(),
  weight: z.string().optional(),
  fiber: z.string().optional(),
  manufacturer: z.array(z.string()).optional(),
});

export const Route = createFileRoute('/inventory/yarns')({
  component: Inventory,
  validateSearch: YarnFilterSchema.parse,
});

function useManufacturersOptions(): Option<ManufacturerRecord>[] {
  const { data } = useManufacturers();
  return useMemo(
    () =>
      data?.map(manufacturer => ({
        label: manufacturer.name,
        value: manufacturer,
      })) ?? [],
    [data]
  );
}

function Inventory() {
  const { data } = useYarns();

  const manufacturerOptions = useManufacturersOptions();

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 p-8 md:justify-normal">
        {data?.map(yarn => <YarnItem key={yarn.id} data={yarn} />)}
      </div>
      <SheetFilter
        basePath="/inventory/yarns"
        formProps={{
          schema: YarnFilterSchema,
          onSubmit: values => {
            console.log(values);
          },
          props: {
            name: {
              label: 'Name',
            },
            color: {
              label: 'Color',
            },
            weight: {
              label: 'Weight',
            },
            fiber: {
              label: 'Fiber',
            },
            manufacturer: {
              label: 'Manufacturer',
              placeholder: 'Select a manufacturer',
              options: manufacturerOptions,
              getItemLabel: (option: Option<ManufacturerRecord>) =>
                option.value.name,
              getBadgeComponent: (
                option: Option<ManufacturerRecord>,
                deselect
              ) => (
                <ManufacturerBadge
                  manufacturer={option.value}
                  onClick={deselect}
                />
              ),
            },
          },
        }}
      />
    </>
  );
}
