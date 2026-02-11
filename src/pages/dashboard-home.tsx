import ContentCreateForm from '@/components/dashboard/content-create-form';
import ContentViewer from '@/components/dashboard/content-viewer';
import { useAppContext } from '@/context/app.context';
import type { ContentCreateRequestParams } from '@/shared/types/content-create-request-params';
import GenerateArticle from '@/utile/gemini';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function DashboardHome() {
  const { generatingContent, setGeneratingContent } = useAppContext();
  const [content, setContent] = useState<null | string | undefined>(null);

  async function handleSubmit(params: ContentCreateRequestParams) {
    setGeneratingContent(true);
    const { title, description } = params;
    try {
      const result = await GenerateArticle(title, description);
      setContent(result);
    } catch (error) {
      toast.error('error occured while generating article');
      console.error('failed to generate article', error);
    } finally {
      setGeneratingContent(false);
    }
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
