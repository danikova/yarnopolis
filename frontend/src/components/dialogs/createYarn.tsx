import { z } from 'zod';
import { useCreateYarn } from '@/@data/yarns';
import { DialogForm } from '@/components/dialogForm';
import { useCreateColor } from '@/@data/colors';
import { useCallback, useMemo } from 'react';
import { useCreatePicture } from '@/@data/pictures';
import { CameraCaptureSchema } from '../fields/cameraCapture';
import {
  ManufacturersSchema,
  YarnTypesSchema,
} from '../fields/specificMultiSelects';
import { useToast } from '../ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useYarnAverages } from '@/@data/yarnAverages';

export const CreateNewYarnSchema = z.object({
  picture: CameraCaptureSchema,
  code: z.string(),
  manufacturer: ManufacturersSchema.optional(),
  type: YarnTypesSchema.optional(),
  yarn_size: z.number().optional(),
  hook_size_min: z.number().optional(),
  hook_size_max: z.number().optional(),
  weight: z.number().optional(),
});

export function CreateYarnDialogForm() {
  const onSubmit = useOnSubmit();

  const form = useForm<z.infer<typeof CreateNewYarnSchema>>({
    resolver: zodResolver(CreateNewYarnSchema),
  });
  const { watch } = form;

  const manufacturer = watch('manufacturer') as string[];
  const averageValue = useAverageValues(manufacturer && manufacturer[0]);

  return (
    <DialogForm
      title="Create new yarn"
      formProps={{
        form,
        onSubmit,
        schema: CreateNewYarnSchema,
        props: {
          picture: {
            label: 'Upload picture',
          },
          code: {
            label: 'Code',
          },
          weight: {
            label: 'Weight',
          },
          hook_size_min: {
            label: 'Min. hook size',
            placeholder: averageValue.avg_hook_size_min,
          },
          hook_size_max: {
            label: 'Max. hook size',
            placeholder: averageValue.avg_hook_size_max,
          },
          yarn_size: {
            label: 'Yarn size',
            placeholder: averageValue.avg_yarn_size,
          },
          manufacturer: {
            multiselect: false,
            addOpts: true,
          },
          type: {
            multiselect: false,
            addOpts: true,
          },
        },
      }}
    />
  );
}

function useOnSubmit() {
  const { mutateAsync: createYarn } = useCreateYarn();
  const { mutateAsync: createColor } = useCreateColor();
  const { mutateAsync: uploadPicture } = useCreatePicture();
  const { toast } = useToast();

  return useCallback(
    async (data: z.infer<typeof CreateNewYarnSchema>) => {
      const picture = await uploadPicture({ file: data.picture.file });
      const color = await createColor({
        hue: data.picture?.color?.h,
        saturation: data.picture?.color?.s,
        lightness: data.picture?.color?.l,
      });
      const newYarnData = {
        ...data,
        pictures: picture.id,
        color: color.id,
      };
      const newYarn = await createYarn(newYarnData);
      toast({ title: `Yarn created with id: ${newYarn.id}` });
    },
    [createYarn, createColor, uploadPicture, toast]
  );
}

type AvgType = {
  avg_hook_size_max?: string;
  avg_hook_size_min?: string;
  avg_yarn_size?: string;
};

function useAverageValues(manufacturerId?: string) {
  const { data } = useYarnAverages();
  return useMemo<AvgType>(() => {
    for (const item of data ?? []) {
      if (item.id === manufacturerId) {
        return {
          avg_hook_size_max:
            'avg. ' + roundToFirstDecimal(item.avg_hook_size_max).toString(),
          avg_hook_size_min:
            'avg. ' + roundToFirstDecimal(item.avg_hook_size_min).toString(),
          avg_yarn_size:
            'avg. ' + roundToFirstDecimal(item.avg_yarn_size).toString(),
        };
      }
    }
    return {};
  }, [data, manufacturerId]);
}

function roundToFirstDecimal(value: number) {
  return Math.round(value * 10) / 10;
}
