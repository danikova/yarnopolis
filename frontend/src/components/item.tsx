import { CSSProperties, PropsWithChildren } from 'react';
import { Card, CardContent } from './ui/card';
import { Picture } from './picture';
import { cn } from '@/lib/utils';

export function ItemBase({
  children,
  className,
  style,
}: PropsWithChildren<{ className?: string; style?: CSSProperties }>) {
  return (
    <Card className={cn('h-[200px] w-[400px]', className)} style={style}>
      <CardContent className="flex h-full gap-4 p-4">{children}</CardContent>
    </Card>
  );
}

export function ItemPictures({
  pictures,
  className,
}: {
  pictures: string[];
  className?: string;
}) {
  return (
    <div className="h-full flex-[0_0_150px]">
      {pictures.map(pictureId => (
        <Picture
          key={pictureId}
          pictureId={pictureId}
          thumb="200x200"
          className={cn(className)}
        />
      ))}
    </div>
  );
}

export function ItemDetailWrapper({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn('flex flex-auto flex-col gap-2', className)}>
      {children}
    </div>
  );
}
