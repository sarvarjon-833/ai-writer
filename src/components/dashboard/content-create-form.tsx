import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Spinner } from '../ui/spinner';
import type { ContentCreateRequestParams } from '@/shared/types/content-create-request-params';
import { z } from 'zod';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Controller, useForm } from 'react-hook-form';
import { InputGroup, InputGroupTextarea } from '../ui/input-group';

type ContentCreateFormProps = {
  isLoading: boolean;
  onSubmit: (params: ContentCreateRequestParams) => void;
};

const formSchema = z.object({
  title: z
    .string()
    .min(5, 'title must be at least 5 characters.')
    .max(50, 'title must be at most 32 characters.'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters.')
    .max(100, 'Description must be at most 100 characters.'),
});

export default function ContentCreateForm({
  isLoading,
  onSubmit,
}: ContentCreateFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    onSubmit(values);
  };

  return (
    <form
      className="mt-4"
      id="validated-form"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                {...field}
                id="title"
                aria-invalid={fieldState.invalid}
                placeholder="Title"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field
              className="grid w-full gap-1.5 mb-4"
              data-invalid={fieldState.invalid}
            >
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  id="description"
                  placeholder="Type your description here."
                  rows={6}
                  className="min-h-24 resize-none"
                  aria-invalid={fieldState.invalid}
                />
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button disabled={isLoading} type="submit">
        {isLoading && <Spinner data-icon="inline-start" />}
        Generate
      </Button>
    </form>
  );
}
