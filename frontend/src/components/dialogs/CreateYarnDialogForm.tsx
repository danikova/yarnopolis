import { z } from 'zod';
import { useCreateYarn } from '@/@data/yarns';
import { DialogForm } from '@/components/dialogForm';
import { useCreateColor } from '@/@data/colors';
import { useCallback } from 'react';
import { useCreatePicture } from '@/@data/pictures';
import { CameraCaptureSchema } from '../fields/cameraCapture';
import {
  ManufacturersSchema,
  YarnCodesSchema,
  YarnTypesSchema,
} from '../fields/specificMultiSelects';
import { SizeRangeSchema } from '../fields/sizeRange';
import { SizeMinMaxSchema } from '../fields/sizeMinMax';

export const CreateNewYarnSchema = z.object({
  picture: CameraCaptureSchema,
  code: YarnCodesSchema.optional(),
  manufacturer: ManufacturersSchema.optional(),
  type: YarnTypesSchema.optional(),
  yarn_size: SizeRangeSchema.optional(),
  hook_size: SizeMinMaxSchema.optional(),
  quantity: z.number().optional(),
  weight: z.number().optional(),
});

export function CreateYarnDialogForm() {
  const onSubmit = useOnSubmit();

  return (
    <DialogForm
      title="Create new yarn"
      formProps={{
        onSubmit,
        schema: CreateNewYarnSchema,
        props: {
          code: {
            multiselect: false,
            addOpts: true,
          },
          quantity: {
            label: 'Quantity',
          },
          weight: {
            label: 'Weight',
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
      await createYarn(newYarnData);
      console.log(newYarnData);
    },
    [createYarn, createColor, uploadPicture]
  );
}
