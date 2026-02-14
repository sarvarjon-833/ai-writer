import GenerateArticle from '@/utile/gemini';
import { useState, type FC, type ReactNode } from 'react';
import toast from 'react-hot-toast';
import { ContentContext } from './content.context';
import type { TContentCreateRequestParams } from '@/shared/types/content-create-request-params';
import type { TGeneratedContent } from '@/shared/types/generated-content';

interface IProps {
  children: ReactNode;
}

const ContentContextProvider: FC<IProps> = ({ children }) => {
  const [generatingContent, setGeneratingContent] = useState(false);
  const generateContent = async (params: TContentCreateRequestParams) => {
    let content = null;
    setGeneratingContent(true);
    const { title, description } = params;
    try {
      content = await GenerateArticle(title, description);
      if (content) {
        const generatedContentItem: TGeneratedContent = {
          id: '12345',
          title,
          description,
          content,
          date: new Date(),
        };
        localStorage.setItem(
          'contentItems',
          JSON.stringify([generatedContentItem])
        );
      }
    } catch (error) {
      toast.error('error occured while generating article');
      console.error('failed to generate article', error);
    } finally {
      setGeneratingContent(false);
    }
    return content;
  };

  return (
    <ContentContext.Provider
      value={{ generateContent, generatingContent, setGeneratingContent }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export { ContentContextProvider };
