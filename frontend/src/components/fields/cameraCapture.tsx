import { z } from 'zod';
import { Input } from '../ui/input';
import { Color, PickerPicture } from '../picture';
import { createUniqueFieldSchema, useTsController } from '@ts-react/form';
import { useCreatePicture, useUpdatePicture } from '@/@data/pictures';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';
import { ErrorLabel } from './errorLabel';

export const CameraCaptureSchema = createUniqueFieldSchema(
  z.object({
    picture: z.string().optional(),
    color: z
      .object({
        h: z.number(),
        s: z.number(),
        l: z.number(),
      })
      .optional(),
  }),
  'cameraCapture'
);
export function CameraCaptureField(props: any) {
  const { field, error } =
    useTsController<z.infer<typeof CameraCaptureSchema>>();
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const { mutate: updatePicture, data: udata } = useUpdatePicture();
  const { mutate: createPicture, data: cdata } = useCreatePicture();
  const data = udata ?? cdata;

  useEffect(() => {
    if (data) {
      field.onChange({ ...field.value, picture: data.id });
      if (selectedColor) {
        field.onChange({
          ...field.value,
          color: {
            h: selectedColor.h,
            s: selectedColor.s,
            l: selectedColor.l,
          },
        });
      }
    }
  }, [data, selectedColor, field]);

  const onColorPick = useCallback(
    (color: Color) => setSelectedColor(color),
    []
  );

  return (
    <div>
      <Label>Upload picture</Label>
      <Input
        className={cn(data || (selectedColor && 'rounded-b-none'))}
        type="file"
        accept="image/*"
        capture
        onChange={e => {
          if (e.target.files?.[0]) {
            if (cdata)
              updatePicture({
                pictureId: cdata.id,
                file: e.target.files?.[0],
              });
            else createPicture({ file: e.target.files?.[0] });
          }
        }}
        {...props}
      />
      {data && (
        <div className="relative w-full">
          <PickerPicture
            key={data.updated}
            picture={data}
            className="h-full w-full"
            onClick={onColorPick}
            thumb="300x300"
          />
        </div>
      )}
      {selectedColor && (
        <div
          className="h-8 w-full rounded-b-md"
          style={{
            backgroundColor: `hsl(${selectedColor.h}, ${selectedColor.s}%, ${selectedColor.l}%)`,
          }}
        />
      )}
      {error && <ErrorLabel error={error} />}
    </div>
  );
}
