import ContentCreateForm from '@/components/dashboard/content-create-form';
import ContentViewer from '@/components/dashboard/content-viewer';
import { useAppContext } from '@/context/app.context';
import type { ContentCreateRequestParams } from '@/shared/types/content-create-request-params';
import GenerateArticle from '@/utile/gemini';
import { useState } from 'react';

export default function DashboardHome() {
  const { generatingContent, setGeneratingContent } = useAppContext();
  const [content, setContent] = useState<null | string | undefined>(null);

  async function handleSubmit(params: ContentCreateRequestParams) {
    setGeneratingContent(true);
    const { title, description } = params;
    const result = await GenerateArticle(title, description);
    setContent(result);
    setGeneratingContent(false);
  }
  return (
    <div>
      <h1 className="font-semibold text-3xl">Article Writer</h1>
      {content ? (
        <ContentViewer content={content} />
      ) : (
        <ContentCreateForm
          isLoading={generatingContent}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
