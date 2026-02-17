import ContentCreateForm from '@/components/dashboard/content-create-form';
import { useContentContext } from '@/context/content.context';
import type { TContentCreateRequestParams } from '@/shared/types/content-create-request-params';
import { useNavigate } from 'react-router-dom';

export default function DashboardHome() {
  const { generatingContent, generateContent } = useContentContext();
  const navigate = useNavigate();
  async function handleSubmit(params: TContentCreateRequestParams) {
    const result = await generateContent(params);
    if (result) {
      navigate(`/dashboard/content/${result.id}`);
    }
  }
  return (
    <div>
      <h1 className="font-semibold text-3xl">Article Writer</h1>
      <ContentCreateForm
        isLoading={generatingContent}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
