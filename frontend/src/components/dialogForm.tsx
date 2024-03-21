import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { z } from 'zod';
import { uniqueId } from 'lodash';
import { TsForm } from './tsForm';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ComponentPropsWithoutRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from './ui/use-toast';
import { ClientResponseError } from 'pocketbase';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export interface DialogFormProps {
  formProps: PartialBy<ComponentPropsWithoutRef<typeof TsForm>, 'onSubmit'>;
  classname?: string;
  title?: string;
  description?: string;
}

export function DialogForm(props: DialogFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formKey, setFormKey] = useState(uniqueId());

  return (
    <Dialog open={isOpen}>
      <div className={cn(props.classname)}>
        <DialogTrigger asChild>
          <Button
            className="rounded-full"
            onClick={e => {
              e.stopPropagation();
              setIsOpen(true);
              setFormKey(uniqueId());
            }}
          >
            Add new
          </Button>
        </DialogTrigger>
      </div>
      <DialogFormContent key={formKey} setIsOpen={setIsOpen} {...props} />
    </Dialog>
  );
}

interface FormContentProps extends DialogFormProps {
  setIsOpen: (isOpen: boolean) => void;
}

function DialogFormContent({ setIsOpen, ...props }: FormContentProps) {
  type FormData = z.infer<typeof props.formProps.schema>;
  const form = useForm<FormData>({
    resolver: zodResolver(props.formProps.schema),
  });
  const { toast } = useToast();

  return (
    <DialogContent
      close={{
        style: {
          display: 'none',
        },
      }}
    >
      <DialogHeader>
        {props.title && <DialogTitle>{props.title}</DialogTitle>}
        {props.description && (
          <DialogDescription>{props.description}</DialogDescription>
        )}
      </DialogHeader>
      <TsForm
        {...props.formProps}
        form={form}
        onSubmit={async (data: FormData) => {
          try {
            props.formProps.onSubmit && (await props.formProps.onSubmit(data));
            setIsOpen(false);
          } catch (e) {
            if (e instanceof ClientResponseError) {
              toast({
                title: e.message,
                description: JSON.stringify(e.data.data, null, 2),
              });
            }
            console.error(e);
          }
        }}
        renderAfter={() => (
          <div className="flex flex-row-reverse flex-wrap gap-4">
            <Button type="submit" className="flex-auto">
              Create new
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
    </DialogContent>
  );
}
