import { useState, type FormEvent } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Spinner } from '../ui/spinner';
import type { ContentCreateRequestParams } from '@/shared/types/content-create-request-params';

type ContentCreateFormProps = {
  isLoading: boolean;
  onSubmit: (params: ContentCreateRequestParams) => void;
};

export default function ContentCreateForm({
  isLoading,
  onSubmit,
}: ContentCreateFormProps) {
  const [form, setForm] = useState<ContentCreateRequestParams>({
    title: '',
    description: '',
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(form);
  };

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.currentTarget;
    setForm({ ...form, [name]: value });
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div className="grid w-full gap-1.5 mb-4">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      <div className="grid w-full gap-1.5 mb-4">
        <Label htmlFor="message"> Description</Label>
        <Textarea
          id="textarea-message"
          name="description"
          placeholder="Type your description here."
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      <Button disabled={isLoading} type="submit">
        {isLoading && <Spinner data-icon="inline-start" />}
        Generate
      </Button>
    </form>
  );
}
