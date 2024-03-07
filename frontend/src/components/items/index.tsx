import { cn } from '@/lib/utils';
import { Picture } from '../picture';
import { Card, CardContent } from '../ui/card';
import { PictureRecord } from '@/@data/pictures.type';
import { CSSProperties, PropsWithChildren } from 'react';
import { Dialog, DialogTrigger } from '../ui/dialog';

export function ItemBase({
  children,
  className,
  style,
  bgPicture,
  detailsDialog,
}: PropsWithChildren<{
  className?: string;
  style?: CSSProperties;
  bgPicture?: PictureRecord;
  detailsDialog?: JSX.Element;
}>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className={cn('relative h-fit w-[400px]', className)}
          style={style}
        >
          {bgPicture && (
            <div
              className="absolute left-0 top-0 z-0 h-full w-full overflow-hidden rounded-md"
              style={{
                maskImage:
                  'linear-gradient(270deg, rgba(0, 0, 0, 1.0) 0%, transparent 100%)',
              }}
            >
              <Picture
                picture={bgPicture}
                className="object-cover opacity-50 blur-[1px]"
              />
            </div>
          )}
          <CardContent className="relative z-20 flex h-full gap-4 p-4">
            {children}
          </CardContent>
        </Card>
      </DialogTrigger>
      {detailsDialog}
    </Dialog>
  );
}
