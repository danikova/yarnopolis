import { createFileRoute } from '@tanstack/react-router';
import { useYarns } from '@/@data/yarns';
import { YarnItem } from '@/components/yarnItem';

export const Route = createFileRoute('/inventory')({
  component: Inventory,
});

function Inventory() {
  const { data } = useYarns();

  return (
    <div className="flex flex-wrap gap-4 p-8">
      {data?.map(yarn => <YarnItem key={yarn.id} data={yarn} />)}
    </div>
  );
}
