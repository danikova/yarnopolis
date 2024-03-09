import { createFileRoute } from '@tanstack/react-router';
import { useYarns } from '@/@data/yarns';
import { YarnItem } from '@/components/items/yarn';
import { SheetFilter } from '@/components/sheetFilter';

export const Route = createFileRoute('/inventory/yarns')({
  component: Inventory,
});

function Inventory() {
  const { data } = useYarns();

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 p-8 md:justify-normal">
        {data?.map(yarn => <YarnItem key={yarn.id} data={yarn} />)}
      </div>
      <SheetFilter />
    </>
  );
}
