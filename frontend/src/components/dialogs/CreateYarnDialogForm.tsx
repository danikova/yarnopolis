import { z } from 'zod';
import { useCreateYarn } from '@/@data/yarns';
import { DialogForm } from '@/components/dialogForm';
import { useCreateColor } from '@/@data/colors';
import { useCallback } from 'react';
import { useCreatePicture } from '@/@data/pictures';
import { CameraCaptureSchema } from '../fields/cameraCapture';
import {
  ManufacturersSchema,
  YarnTypesSchema,
} from '../fields/specificMultiSelects';
import { useToast } from '../ui/use-toast';

export const CreateNewYarnSchema = z.object({
  picture: CameraCaptureSchema,
  code: z.string().optional(),
  manufacturer: ManufacturersSchema.optional(),
  type: YarnTypesSchema.optional(),
  yarn_size: z.number().optional(),
  hook_size_min: z.number().optional(),
  hook_size_max: z.number().optional(),
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
            label: 'Code',
          },
          weight: {
            label: 'Weight',
          },
          hook_size_min: {
            label: 'Min. hook size',
          },
          hook_size_max: {
            label: 'Max. hook size',
          },
          yarn_size: {
            label: 'Yarn size',
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
