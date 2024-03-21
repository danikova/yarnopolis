import { z } from 'zod';
import { Input } from '../ui/input';
import { Color } from '../picture';
import { createUniqueFieldSchema, useTsController } from '@ts-react/form';
import { useRef, useEffect, useState, memo } from 'react';
import { cn, parseRgbExpression, rgbaToHsl } from '@/lib/utils';
import { Label } from '../ui/label';
import { ErrorLabel } from './errorLabel';
import { ImageColorPicker } from 'react-image-color-picker';

export const CameraCaptureSchema = createUniqueFieldSchema(
  z.object({
    file: z.instanceof(File),
    color: z.object({
      h: z.number(),
      s: z.number(),
      l: z.number(),
    }),
  }),
  'cameraCapture'
);
export function CameraCaptureField(props: any) {
  const { field, error } =
    useTsController<z.infer<typeof CameraCaptureSchema>>();

  const [selectedColor, setSelectedColor] = useState<Color | undefined>();
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [base64Content, setBase64Content] = useState<string | undefined>();

  useEffect(() => {
    field.onChange({
      file: selectedFile,
      color: selectedColor,
    });
  }, [selectedFile, selectedColor]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Label>Upload picture</Label>
      <Input
        className={cn(selectedColor && 'rounded-b-none')}
        type="file"
        accept="image/*"
        capture
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
              // @ts-ignore
              setBase64Content(event.target.result);
            };
            reader.readAsDataURL(file);
          }
        }}
        {...props}
      />
      {base64Content && (
        <div
          className="flex w-full justify-center rounded-b-md p-2"
          style={{
            background: `hsl(${selectedColor?.h}, ${selectedColor?.s}%, ${selectedColor?.l}%)`,
          }}
        >
          <div className="overflow-hidden rounded-md ring-2 ring-white ">
            <CustomImageColorPicker
              onImagePick={(file: File) => {
                setSelectedFile(file);
              }}
              onColorPick={(rgbExpression: string) => {
                const rgb = parseRgbExpression(rgbExpression);
                const hsl = rgbaToHsl(rgb.red, rgb.green, rgb.blue);
                setSelectedColor(hsl);
              }}
              imgSrc={base64Content}
            />
          </div>
        </div>
      )}
      <ErrorLabel error={error} />
    </div>
  );
}

interface CustomImageColorPickerProps {
  imgSrc: string;
  onImagePick: (file: File) => void;
  onColorPick: (color: string) => void;
}

const CustomImageColorPicker = memo(
  function CustomImageColorPicker(props: CustomImageColorPickerProps) {
    const pickerRef = useRef<HTMLCanvasElement | null>(null);
    const { imgSrc, onColorPick, onImagePick } = props;

    useEffect(() => {
      pickerRef.current = document.getElementById(
        'image-color-pick-canvas'
      ) as HTMLCanvasElement | null;
      const timeoutId = setTimeout(() => {
        const canvas = pickerRef.current;
        if (canvas) {
          const dataUrl = canvas.toDataURL('image/png');

          fetch(dataUrl)
            .then(res => res.blob())
            .then(blob => {
              const file = new File([blob], 'cropped-image.png', {
                type: 'image/png',
              });
              onImagePick(file);
            });
        }
      }, 50);
      return () => clearTimeout(timeoutId);
    }, [imgSrc, onImagePick]);

    return (
      <div className="h-[300px] w-[300px]">
        <ImageColorPicker imgSrc={imgSrc} onColorPick={onColorPick} zoom={0} />
      </div>
    );
  },
  (prevProps, props) => prevProps.imgSrc === props.imgSrc
);
