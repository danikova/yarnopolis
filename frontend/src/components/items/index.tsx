import { cn } from '@/lib/utils';
import { Picture } from '../picture';
import { Card, CardContent } from '../ui/card';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { PictureRecord } from '@/@data/pictures.type';
import { useInView } from 'react-intersection-observer';
import { CSSProperties, PropsWithChildren } from 'react';

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
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className={cn('relative h-fit w-full', className)}
          style={style}
          ref={ref}
        >
          {inView && bgPicture && (
            <div
              className="absolute left-0 top-0 z-0 h-full w-full overflow-hidden rounded-md"
              style={{
                maskImage:
                  'linear-gradient(270deg, rgba(0, 0, 0, 1.0) 0%, transparent 100%)',
              }}
            >
              <Picture
                picture={bgPicture}
                className="h-full w-full object-cover opacity-50 blur-[0.3px]"
                thumb="300x300"
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
