import { createFileRoute } from '@tanstack/react-router';
import { useYarns } from '@/@data/yarns';

export const Route = createFileRoute('/inventory')({
  component: Inventory,
});

function Inventory() {
  const { data } = useYarns();

  console.log(data);

  return (
    <div className="p-8">
      {/* <DataTable columns={columns} data={data ?? []} /> */}
    </div>
  );
}
