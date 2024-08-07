import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { z } from 'zod';
import { TsForm } from './tsForm';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { useSearch } from '@tanstack/react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { isEmpty, isNil, pickBy, isEqual, isArray, uniqueId } from 'lodash';
import { FileRoutesByPath, useNavigate } from '@tanstack/react-router';
import { ComponentPropsWithoutRef, useMemo, useState } from 'react';
import { cn, getKeyValue } from '@/lib/utils';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export interface SheetFilterProps {
  basePath: keyof FileRoutesByPath;
  formProps: PartialBy<ComponentPropsWithoutRef<typeof TsForm>, 'onSubmit'>;
  classname?: string;
  title?: string;
  description?: string;
}

export function SheetFilter(props: SheetFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formKey, setFormKey] = useState(uniqueId());
  const search = useSearch({
    from: props.basePath,
  });
  const badgeNumber = useMemo(() => {
    let count = 0;
    for (const values of Object.values(search)) {
      if (isArray(values)) count += values.length;
      else if (!isNil(values) && !isEmpty(values)) count += 1;
    }
    return count;
  }, [search]);

  return (
    <Sheet open={isOpen}>
      <div className={cn(props.classname)}>
        <SheetTrigger asChild>
          <Button
            className="rounded-full"
            onClick={e => {
              e.stopPropagation();
              setIsOpen(true);
              setFormKey(uniqueId());
            }}
          >
            Filter
          </Button>
        </SheetTrigger>
        {badgeNumber > 0 && (
          <Badge className="absolute -right-3 -top-3 select-none bg-background text-foreground ring-2 ring-foreground hover:pointer-events-none hover:bg-background">
            {badgeNumber}
          </Badge>
        )}
      </div>
      <SheetForm key={formKey} setIsOpen={setIsOpen} {...props} />
    </Sheet>
  );
}

interface FormContentProps extends SheetFilterProps {
  setIsOpen: (isOpen: boolean) => void;
}

function SheetForm({ setIsOpen, ...props }: FormContentProps) {
  const defaultValues = useSearch({
    from: props.basePath,
  });
  type FormData = z.infer<typeof props.formProps.schema>;
  const form = useForm<FormData>({
    resolver: zodResolver(props.formProps.schema),
    defaultValues,
  });
  const watchedFields = form.watch();
  const isDirty = useMemo(() => {
    for (const fieldKey in watchedFields) {
      if (
        !isEqual(
          getKeyValue(defaultValues, fieldKey),
          getKeyValue(watchedFields, fieldKey)
        )
      )
        return true;
    }
    return false;
  }, [watchedFields, defaultValues]);
  const navigate = useNavigate();

  return (
    <SheetContent>
      <SheetHeader>
        {props.title && <SheetTitle>{props.title}</SheetTitle>}
        {props.description && (
          <SheetDescription>{props.description}</SheetDescription>
        )}
      </SheetHeader>
      <TsForm
        {...props.formProps}
        form={form}
        onSubmit={(data: FormData) => {
          props.formProps.onSubmit && props.formProps.onSubmit(data);
          setIsOpen(false);
          navigate({
            to: props.basePath,
            search: pickBy(data, i => !isNil(i) && !isEmpty(i)),
          });
        }}
        renderAfter={() => (
          <div className="flex flex-row-reverse flex-wrap gap-4">
            <Button
              type="submit"
              className="flex-[1_1_100%]"
              disabled={!isDirty}
            >
              Update
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="w-fit"
              onClick={() => form.reset(defaultValues)}
              disabled={!isDirty}
            >
              Reset
            </Button>
            <Button
              type="button"
              className="w-fit"
              variant="destructive"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        )}
      />
    </SheetContent>
  );
}
