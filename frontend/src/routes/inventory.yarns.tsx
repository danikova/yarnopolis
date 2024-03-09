import { useManufacturers } from '@/@data/manufacturers';
import { ManufacturerRecord } from '@/@data/manufacturers.types';
import { useYarnTypes } from '@/@data/yarnTypes';
import { YarnTypeRecord } from '@/@data/yarnTypes.types';
import { useYarns } from '@/@data/yarns';
import { ManufacturerBadge, YarnTypeBadge } from '@/components/badges';
import { YarnItem } from '@/components/items/yarn';
import { SheetFilter } from '@/components/sheetFilter';
import { Option } from '@/components/ui/multi-select';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { z } from 'zod';

const YarnFilterSchema = z.object({
  manufacturer: z.array(z.string()).optional(),
  yarnTypes: z.array(z.string()).optional(),
});

export const Route = createFileRoute('/inventory/yarns')({
  component: Inventory,
  validateSearch: YarnFilterSchema.parse,
});

function useManufacturersOptions(): Option<ManufacturerRecord>[] {
  const { data } = useManufacturers();
  return useMemo(
    () =>
      data?.map(item => ({
        label: item.name,
        value: item,
      })) ?? [],
    [data]
  );
}

function useYarnTypesOptions(): Option<YarnTypeRecord>[] {
  const { data } = useYarnTypes();
  return useMemo(
    () =>
      data?.map(item => ({
        label: item.name,
        value: item,
      })) ?? [],
    [data]
  );
}

function Inventory() {
  const { data } = useYarns();

  const manufacturerOptions = useManufacturersOptions();
  const yarnTypeOptions = useYarnTypesOptions();

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
            onSubmit: values => {
              console.log(values);
            },
            props: {
              manufacturer: {
                label: 'Manufacturer',
                placeholder: 'Select a manufacturer to filter',
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
              yarnTypes: {
                label: 'Yarn Types',
                placeholder: 'Select a yarn type to filter',
                options: yarnTypeOptions,
                getItemLabel: (option: Option<YarnTypeRecord>) =>
                  option.value.name,
                getBadgeComponent: (
                  option: Option<ManufacturerRecord>,
                  deselect
                ) => (
                  <YarnTypeBadge yarnType={option.value} onClick={deselect} />
                ),
              },
            },
          }}
        />
      </div>
    </>
  );
}
