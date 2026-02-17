import ContentViewer from '@/components/dashboard/content-viewer';
import { useContentContext } from '@/context/content.context';
import type { TGeneratedContent } from '@/shared/types/generated-content';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function DashboardContent() {
  const [generatedContent, setGeneratedContent] = useState<TGeneratedContent>();
  const { getContentById, updatedById } = useContentContext();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const result = getContentById(id);
      setGeneratedContent(result);
    }
  }, [id, getContentById]);

  const handleSave = (generatedContent: TGeneratedContent) => {
    updatedById(generatedContent.id, generatedContent);
  };

  if (!generatedContent) {
    return (
      <div>
        <h1>not found</h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold">{generatedContent.title}</h1>
      <ContentViewer
        generatedContent={generatedContent}
        key={generatedContent.id}
        onSave={handleSave}
      />
    </div>
  );
}
