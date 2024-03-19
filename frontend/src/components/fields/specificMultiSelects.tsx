import { useCreateManufacturer, useManufacturers } from '@/@data/manufacturers';
import { MultiSelectField } from './multiSelect';
import { BaseRecord } from '@/@data/base.types';
import { useMemo, useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { Option } from '../ui/multi-select';
import { ManufacturerRecord } from '@/@data/manufacturers.types';
import { ManufacturerBadge, YarnTypeBadge } from '../badges';
import { createUniqueFieldSchema } from '@ts-react/form';
import { z } from 'zod';
import { useCreateYarnType, useYarnTypes } from '@/@data/yarnTypes';
import { YarnTypeRecord } from '@/@data/yarnTypes.types';
import { useCreateYarnCode, useYarnCodes } from '@/@data/yarnCodes';
import { YarnCodeRecord } from '@/@data/yarnCodes.types';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';

interface SpecificMultiSelectFieldProps extends Record<string, unknown> {
  addOpts?: boolean;
}

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

function MultiselectWrapper({
  children,
  onCreateNewBadge,
  props,
}: {
  children: React.ReactNode;
  onCreateNewBadge: (name: string) => void;
  props: SpecificMultiSelectFieldProps;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');

  return (
    <div className="flex w-full items-end gap-2">
      <div className="flex-auto">{children}</div>
      {props.addOpts && (
        <Button onClick={() => setIsOpen(true)} variant="outline" type="button">
          <Plus className="h-4 w-4" />
        </Button>
      )}
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogTitle>Add new manufacturer</DialogTitle>
          <DialogDescription>
            Add a new manufacturer to the list
          </DialogDescription>
          <Input onChange={e => setName(e.target.value)} />
          <div className="flex flex-row-reverse flex-wrap gap-4">
            <Button
              className="flex-auto"
              onClick={() => {
                setIsOpen(false);
                onCreateNewBadge && onCreateNewBadge(name);
              }}
            >
              Create new
            </Button>
            <Button
              type="button"
              className="w-fit"
              variant="destructive"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const ManufacturersSchema = createUniqueFieldSchema(
  z.array(z.string()),
  'manufacturer'
);
export function ManufacturersField(props: SpecificMultiSelectFieldProps) {
  const options = useOptions(useManufacturers, item => item.id);
  const { mutate } = useCreateManufacturer();
  return (
    <MultiselectWrapper
      props={props}
      onCreateNewBadge={name => mutate({ name })}
    >
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
    </MultiselectWrapper>
  );
}

export const YarnTypesSchema = createUniqueFieldSchema(
  z.array(z.string()),
  'yarnTypes'
);
export function YarnTypesField(props: any) {
  const options = useOptions(useYarnTypes, item => item.id);
  const { mutate } = useCreateYarnType();
  return (
    <MultiselectWrapper
      props={props}
      onCreateNewBadge={name => mutate({ name })}
    >
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
    </MultiselectWrapper>
  );
}

export const YarnCodesSchema = createUniqueFieldSchema(
  z.array(z.string()),
  'yarnCodes'
);
export function YarnCodesField(props: any) {
  const options = useOptions(useYarnCodes, item => item.code);
  const { mutate } = useCreateYarnCode();

  return (
    <MultiselectWrapper
      props={props}
      onCreateNewBadge={name => mutate({ name })}
    >
      <MultiSelectField
        label="Yarn code"
        placeholder="Select a yarn code to filter"
        options={options}
        getItemLabel={(option: Option<YarnCodeRecord>) => option.value.name}
        getBadgeComponent={(option: Option<YarnCodeRecord>, deselect) => (
          <Badge onClick={deselect}>{option.value.name}</Badge>
        )}
        {...props}
      />
    </MultiselectWrapper>
  );
}
