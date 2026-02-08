import { useState, type FormEvent } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Spinner } from '../ui/spinner';
import GenerateArticle from '@/utile/gemini';

export default function ContentCreate() {
  const [isLoading, setIsloading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.currentTarget;
    setForm({ ...form, [name]: value });
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsloading(true);
    const result = await GenerateArticle(form.title, form.description);
    console.log(result);
    setIsloading(false);
  }
  return (
    <div>
      <h1 className="font-semibold text-3xl">Article Writer</h1>
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
    </div>
  );
}
