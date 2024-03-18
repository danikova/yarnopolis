import { useManufacturers } from '@/@data/manufacturers';
import { MultiSelectField } from './multiSelect';
import { BaseRecord } from '@/@data/base.types';
import { useMemo } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { Option } from '../ui/multi-select';
import { ManufacturerRecord } from '@/@data/manufacturers.types';
import { ManufacturerBadge, YarnTypeBadge } from '../badges';
import { createUniqueFieldSchema } from '@ts-react/form';
import { z } from 'zod';
import { useYarnTypes } from '@/@data/yarnTypes';
import { YarnTypeRecord } from '@/@data/yarnTypes.types';
import { useYarnCodes } from '@/@data/yarnCodes';
import { YarnCodesRecord } from '@/@data/yarnCodes.types';
import { Badge } from '../ui/badge';

function useOptions<T extends BaseRecord = BaseRecord>(
  useFunction: () => UseQueryResult<T[], any>,
  getLabel: (item: T) => string
) {
  const { data } = useFunction();
  return useMemo(
    () =>
      data?.map(item => ({
        label: getLabel(item),
        value: item,
      })) ?? [],
    [data, getLabel]
  );
}

export const ManufacturersSchema = createUniqueFieldSchema(
  z.array(z.string()),
  'manufacturer'
);
export function ManufacturersField(props: any) {
  const options = useOptions(useManufacturers, item => item.id);
  return (
    <MultiSelectField
      label="Manufacturer"
      placeholder="Select a manufacturer to filter"
      options={options}
      getItemLabel={(option: Option<ManufacturerRecord>) => option.value.name}
      getBadgeComponent={(option: Option<ManufacturerRecord>, deselect) => (
        <ManufacturerBadge manufacturer={option.value} onClick={deselect} />
      )}
      {...props}
    />
  );
}

export const YarnTypesSchema = createUniqueFieldSchema(
  z.array(z.string()),
  'yarnTypes'
);
export function YarnTypesField(props: any) {
  const options = useOptions(useYarnTypes, item => item.id);
  return (
    <MultiSelectField
      label="Yarn type"
      placeholder="Select a yarn type to filter"
      options={options}
      getItemLabel={(option: Option<YarnTypeRecord>) => option.value.name}
      getBadgeComponent={(option: Option<YarnTypeRecord>, deselect) => (
        <YarnTypeBadge yarnType={option.value} onClick={deselect} />
      )}
      {...props}
    />
  );
}

export const YarnCodesSchema = createUniqueFieldSchema(
  z.array(z.string()),
  'yarnCodes'
);
export function YarnCodesField(props: any) {
  const options = useOptions(useYarnCodes, item => item.code);
  return (
    <MultiSelectField
      label="Yarn codes"
      placeholder="Select a yarn code to filter"
      options={options}
      getItemLabel={(option: Option<YarnCodesRecord>) => option.value.code}
      getBadgeComponent={(option: Option<YarnCodesRecord>, deselect) => (
        <Badge onClick={deselect}>{option.value.code}</Badge>
      )}
      getOptId={(option: Option<YarnCodesRecord>) => option.value.code}
      {...props}
    />
  );
}
