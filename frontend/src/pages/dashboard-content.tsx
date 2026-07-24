import ContentViewer from '@/components/dashboard/content-viewer';
import { useContentContext } from '@/context/content.context';
import type { TGeneratedContent } from '@/shared/types/generated-content';
import { StarIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
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

  const handleRateChange = (rate: number) => {
    if (generatedContent) {
      handleSave({
        ...generatedContent,
        rate,
      });
    }
  };
  return (
    <div>
      <div className="flex gap-2 items-center">
        <h1 className="text-3xl font-semibold">{generatedContent.title}</h1>
        <div className="flex gap-1">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <StarIcon
                key={index}
                className={clsx(
                  'w-8 h-8 cursor-pointer',
                  (generatedContent.rate || 0) > index && 'fill-amber-200'
                )}
                onClick={() => handleRateChange(index + 1)}
              />
            ))}
        </div>
      </div>
      <ContentViewer
        generatedContent={generatedContent}
        key={generatedContent.id}
        onSave={handleSave}
      />
    </div>
  );
}
