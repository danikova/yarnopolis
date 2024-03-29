import { useHSLstringFromYarn } from '@/lib/utils';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { YarnRecord } from '@/@data/yarns.types';
import { TsForm } from '../tsForm';
import { z } from 'zod';
import {
  ManufacturersSchema,
  YarnTypesSchema,
} from '../fields/specificMultiSelects';
import { cloneDeep } from 'lodash';
import { CameraCaptureSchema } from '../fields/cameraCapture';
import { Picture } from '../picture';
import { Button } from '../ui/button';
import { useUpdateYarn } from '@/@data/yarns';
import { useToast } from '../ui/use-toast';
import { useCallback } from 'react';
import { useCreateColor } from '@/@data/colors';
import { useCreatePicture } from '@/@data/pictures';
import { ClientResponseError } from 'pocketbase';

export const UpdateYarnSchema = z.object({
  picture: CameraCaptureSchema.optional(),
  code: z.string().optional(),
  manufacturer: ManufacturersSchema.optional(),
  type: YarnTypesSchema.optional(),
  yarn_size: z.number().optional(),
  hook_size_min: z.number().optional(),
  hook_size_max: z.number().optional(),
  weight: z.number().optional(),
});

export function YarnDetailsDialog({ yarn }: { yarn: YarnRecord }) {
  const hslValue = useHSLstringFromYarn(yarn);
  const onSubmit = useOnSubmit(yarn);

  const defaultValues = {
    ...cloneDeep(yarn),
    manufacturer: [yarn.manufacturer],
    type: [yarn.type],
  };

  return (
    <DialogContent
      overlay={{
        style: {
          backgroundColor: `hsla(${hslValue}, 0.5)`,
        },
      }}
    >
      <DialogHeader>
        <DialogTitle>Update yarn</DialogTitle>
      </DialogHeader>
      <div className="flex gap-4 max-md:flex-col">
        {yarn.expand?.pictures && (
          <div className="flex flex-[0_1_400px] flex-col gap-4 max-md:flex-auto">
            <div
              className="flex w-full justify-center rounded-md p-2"
              style={{
                background: `hsl(${yarn.expand?.color?.hue}, ${yarn.expand?.color?.saturation}%, ${yarn.expand?.color?.lightness}%)`,
              }}
            >
              <div className="overflow-hidden rounded-md ring-2 ring-white ">
                <Picture picture={yarn.expand?.pictures} />
              </div>
            </div>
          </div>
        )}
        <div className="flex-auto">
          <TsForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            schema={UpdateYarnSchema}
            props={{
              // @ts-ignore
              picture: {
                label: 'Upload new picture',
              },
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
              // @ts-ignore
              manufacturer: {
                multiselect: false,
                addOpts: true,
              },
              // @ts-ignore
              type: {
                multiselect: false,
                addOpts: true,
              },
            }}
            renderAfter={() => <Button type="submit">Update</Button>}
          />
        </div>
      </div>
    </DialogContent>
  );
}

function useOnSubmit(yarn: YarnRecord) {
  const { mutateAsync: updateYarn } = useUpdateYarn(yarn.id);
  const { mutateAsync: createColor } = useCreateColor();
  const { mutateAsync: uploadPicture } = useCreatePicture();
  const { toast } = useToast();

  return useCallback(
    async (data: z.infer<typeof UpdateYarnSchema>) => {
      const updateYarnData: Record<string, unknown> = {
        ...data,
      };
      if (data.picture?.file) {
        const picture = await uploadPicture({ file: data.picture?.file });
        const color = await createColor({
          hue: data.picture?.color?.h,
          saturation: data.picture?.color?.s,
          lightness: data.picture?.color?.l,
        });
        updateYarnData.pictures = picture.id;
        updateYarnData.color = color.id;
      }
      try {
        await updateYarn(updateYarnData);
        toast({ title: 'Yarn updated' });
      } catch (e) {
        if (e instanceof ClientResponseError) {
          toast({
            title: e.message,
            description: JSON.stringify(e.data.data, null, 2),
          });
        }
      }
    },
    [updateYarn, createColor, uploadPicture, toast]
  );
}
