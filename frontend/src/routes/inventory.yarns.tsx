import { useYarns } from '@/@data/yarns';
import { YarnItem } from '@/components/items/yarn';
import { SheetFilter } from '@/components/sheetFilter';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

const YarnFilterSchema = z.object({
  name: z.string().optional(),
  color: z.string().optional(),
  weight: z.string().optional(),
  fiber: z.string().optional(),
});

export const Route = createFileRoute('/inventory/yarns')({
  component: Inventory,
  validateSearch: YarnFilterSchema.parse,
});

function Inventory() {
  const { data } = useYarns();

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 p-8 md:justify-normal">
        {data?.map(yarn => <YarnItem key={yarn.id} data={yarn} />)}
      </div>
      <SheetFilter
        basePath="/inventory/yarns"
        formProps={{
          schema: YarnFilterSchema,
          onSubmit: values => {
            console.log(values);
          },
          props: {
            name: {
              label: 'Name',
            },
            color: {
              label: 'Color',
            },
            weight: {
              label: 'Weight',
            },
            fiber: {
              label: 'Fiber',
            },
          },
        }}
      />
    </>
  );
}
