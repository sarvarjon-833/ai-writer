import ContentCreateForm from '@/components/dashboard/content-create-form';
import ContentViewer from '@/components/dashboard/content-viewer';
import { useContentContext } from '@/context/content.context';
import type { TContentCreateRequestParams } from '@/shared/types/content-create-request-params';
import { useState } from 'react';

export default function DashboardHome() {
  const { generatingContent, generateContent } = useContentContext();
  const [content, setContent] = useState<null | string | undefined>(null);

  async function handleSubmit(params: TContentCreateRequestParams) {
    const result = await generateContent(params);
    setContent(result);
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
