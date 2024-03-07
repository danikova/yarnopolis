import { useHSLstringFromYarn } from '@/lib/utils';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { YarnRecord } from '@/@data/yarns.types';

export function YarnDetailsDialog({ yarn }: { yarn: YarnRecord }) {
  const hslValue = useHSLstringFromYarn(yarn);

  return (
    <DialogContent
      overlay={{
        style: {
          backgroundColor: `hsla(${hslValue}, 0.5)`,
        },
      }}
    >
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
