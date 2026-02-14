import type { TContentCreateRequestParams } from '@/shared/types/content-create-request-params';
import { createContext, useContext } from 'react';

interface IContentContext {
  generatingContent: boolean;
  setGeneratingContent: (value: boolean) => void;
  generateContent: (
    params: TContentCreateRequestParams
  ) => Promise<string | null>;
}

export const ContentContext = createContext<IContentContext | null>(null);

const useContentContext = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('Content context must be used whithin a ContentProvider');
  }
  return context;
};

export { useContentContext };
