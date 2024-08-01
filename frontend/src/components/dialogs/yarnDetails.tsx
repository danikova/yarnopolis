import { getKeyValue, useHSLstringFromYarn } from '@/lib/utils';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { YarnRecord } from '@/@data/yarns.types';
import { TsForm } from '../tsForm';
import { z } from 'zod';
import {
  ManufacturersSchema,
  YarnTypesSchema,
} from '../fields/specificMultiSelects';
import { cloneDeep, isEqual } from 'lodash';
import { CameraCaptureSchema } from '../fields/cameraCapture';
import { Picture } from '../picture';
import { Button } from '../ui/button';
import { useDeleteYarn, useUpdateYarn } from '@/@data/yarns';
import { useToast } from '../ui/use-toast';
import { useCallback, useMemo } from 'react';
import { useCreateColor } from '@/@data/colors';
import { useCreatePicture } from '@/@data/pictures';
import { ClientResponseError } from 'pocketbase';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const UpdateYarnPictureSchema = z.object({
  picture: CameraCaptureSchema,
});

export const UpdateYarnSchema = z.object({
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
  const { updatePictureProps, updateYarnProps } = useOnSubmit(yarn);
  const { mutateAsync: deleteYarn } = useDeleteYarn();

  const defaultValues = useMemo(
    () => ({
      ...cloneDeep(yarn),
      manufacturer: [yarn.manufacturer],
      type: [yarn.type],
    }),
    [yarn]
  );

  type FormData = z.infer<typeof UpdateYarnSchema>;
  const form = useForm<FormData>({
    resolver: zodResolver(UpdateYarnSchema),
    defaultValues,
  });
  const watchedFields = form.watch();
  const isDirty = useMemo(() => {
    for (const fieldKey in watchedFields) {
      const val1 = getKeyValue(defaultValues, fieldKey);
      const val2 = getKeyValue(watchedFields, fieldKey);
      if (val1 && val2 && !isEqual(val1, val2)) {
        return true;
      }
    }
    return false;
  }, [watchedFields, defaultValues]);

  console.log(isDirty);

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
            formProps={{
              className: 'flex flex-row gap-4',
              style: {
                alignItems: 'flex-end',
              },
            }}
            onSubmit={updatePictureProps}
            schema={UpdateYarnPictureSchema}
            props={{
              picture: {
                label: 'Upload new picture',
              },
            }}
            renderAfter={() => (
              <Button type="submit" className="flex-[1_1_auto]">
                Update picture
              </Button>
            )}
          />
          <TsForm
            form={form}
            schema={UpdateYarnSchema}
            onSubmit={updateYarnProps}
            props={{
              // @ts-ignore
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
            renderAfter={() => (
              <div className="flex flex-row-reverse flex-wrap gap-4">
                <Button
                  type="submit"
                  className="flex-[1_1_auto]"
                  disabled={!isDirty}
                >
                  Update
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  className="w-fit"
                  onClick={() => form.reset(defaultValues)}
                  disabled={!isDirty}
                >
                  Reset
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  className="w-fit"
                  onClick={() => {
                    confirm('Are you sure you want to delete this yarn?') &&
                      deleteYarn(yarn.id);
                  }}
                >
                  Delete
                </Button>
              </div>
            )}
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

  const updateFunction = useCallback(
    async (data: any) => {
      try {
        await updateYarn(data);
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
    [toast, updateYarn]
  );

  const updatePictureProps = useCallback(
    async (data: z.infer<typeof UpdateYarnPictureSchema>) => {
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
      await updateFunction(updateYarnData);
    },
    [uploadPicture, createColor, updateFunction]
  );

  const updateYarnProps = useCallback(
    async (data: z.infer<typeof UpdateYarnSchema>) => {
      await updateFunction(data);
    },
    [updateFunction]
  );

  return {
    updatePictureProps,
    updateYarnProps,
  };
}
