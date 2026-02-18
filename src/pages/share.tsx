import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useContentContext } from '@/context/content.context';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';

export default function Share() {
  const [generatedContent, setGeneratedContent] = useState<TGeneratedContent>();
  const { getContentById } = useContentContext();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const result = getContentById(id);
      setGeneratedContent(result);
    }
  }, [id, getContentById]);

  if (!generatedContent) {
    return <h1>not found !</h1>;
  }
  return (
    <Card className="m-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-lg">
            <span className="font-semibold">Title: </span>
            {generatedContent.title}
          </h1>
          <p className="text-lg">
            <span className="font-semibold">Date: </span>
            {dayjs(generatedContent.date).format('MMM DD, YYYY')}
          </p>
        </div>
        <p className="text-lg">
          <span className="font-semibold">Description: </span>
          {generatedContent.description}
        </p>
      </CardHeader>
      <hr />
      <CardContent className="p-4 md:p-6 lg:p-8">
        <div className="prose lg:prose-xl max-w-none">
          <Markdown>{generatedContent.content}</Markdown>
        </div>
      </CardContent>
    </Card>
  );
}
