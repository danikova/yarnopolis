import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { z } from 'zod';
import { TsForm } from './tsForm';
import { MultiSelect, type Option } from './ui/multi-select';
import { SizeRecord } from '@/@data/sizes.types';
import { useSizes } from '@/@data/sizes';
import { useMap } from '@/lib/utils';

const SignUpSchema = z.object({
  email: z.string().email('Enter a real email please.'),
  password: z.string(),
  address: z.string(),
  favoriteColor: z.enum(['blue', 'red', 'purple']),
  isOver18: z.boolean(),
});

export function SheetFilter() {
  const { data } = useSizes();
  const selected = useMap<string, Option<SizeRecord>>();

  function onSubmit(data: z.infer<typeof SignUpSchema>) {
    console.log(data);
  }

  return (
    <Sheet>
      <div className="fixed right-8 top-8 ">
        <SheetTrigger asChild>
          <Button className="rounded-full">Filter</Button>
        </SheetTrigger>
        <Badge className="absolute -right-3 -top-3 select-none bg-background text-foreground ring-2 ring-foreground hover:pointer-events-none hover:bg-background">
          10
        </Badge>
      </div>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <TsForm
          renderAfter={() => <button type="submit">Submit</button>}
          schema={SignUpSchema}
          onSubmit={onSubmit}
          props={{
            email: {
              label: 'Email',
            },
            password: {
              label: 'Password',
            },
            address: {
              label: 'Address',
            },
            favoriteColor: {
              label: 'Favorite Color',
            },
            isOver18: {
              label: 'Are you over 18?',
            },
          }}
        />
        <MultiSelect
          options={data?.map(size => ({ label: size.id, value: size })) ?? []}
          selected={selected}
          onSelectionChange={data => console.log(data)}
          getBadgeComponent={(option, deselect) => (
            <Badge className="flex gap-2">
              <span>{option.value.value}</span>
              <span onClick={deselect}>x</span>
            </Badge>
          )}
          getItemLabel={option => option.value.value}
        />
      </SheetContent>
    </Sheet>
  );
}
