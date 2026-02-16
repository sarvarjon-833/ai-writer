import GenerateArticle from '@/utile/gemini';
import { useState, type FC, type ReactNode } from 'react';
import toast from 'react-hot-toast';
import { ContentContext } from './content.context';
import type { TContentCreateRequestParams } from '@/shared/types/content-create-request-params';
import type { TGeneratedContent } from '@/shared/types/generated-content';
import { useLocalStorage } from 'react-use';
import type {
  TPromptHistory,
  TPromptLink,
} from '@/shared/types/prompt-history.type';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

interface IProps {
  children: ReactNode;
}

const ContentContextProvider: FC<IProps> = ({ children }) => {
  const [generatingContent, setGeneratingContent] = useState(false);
  const [contentItems, setContentItems] = useLocalStorage<TGeneratedContent[]>(
    'contentItems',
    []
  );
  const generateContent = async (params: TContentCreateRequestParams) => {
    let content = null;
    setGeneratingContent(true);
    const { title, description } = params;
    try {
      content = await GenerateArticle(title, description);
      if (content) {
        const generatedContentItem: TGeneratedContent = {
          id: uuidv4(),
          title,
          description,
          content,
          date: new Date(),
        };
        setContentItems([generatedContentItem, ...(contentItems || [])]);
      }
    } catch (error) {
      toast.error('error occured while generating article');
      console.error('failed to generate article', error);
    } finally {
      setGeneratingContent(false);
    }
    return content;
  };

  const getPromptHistory = (): TPromptHistory[] => {
    if (!contentItems) {
      return [];
    }
    const groupedItems = contentItems.reduce(
      (prev: { [key: string]: TPromptLink[] }, next) => {
        const dataKey = dayjs(next.date).format('MMM DD, YYYY');
        if (!prev[dataKey]) {
          prev[dataKey] = [];
        }
        prev[dataKey].push({
          title: next.title,
          url: `/dashboard/content/${next.id}`,
        });
        return prev;
      },
      {}
    );

    return Object.keys(groupedItems)
      .sort((a, b) => dayjs(b).diff(a))
      .map((date: string) => ({
        date: date,
        links: groupedItems[date],
      }));
  };

  return (
    <ContentContext.Provider
      value={{
        generateContent,
        generatingContent,
        setGeneratingContent,
        getPromptHistory,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export { ContentContextProvider };
