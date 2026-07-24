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
    let generatedContent: TGeneratedContent | null = null;
    setGeneratingContent(true);
    const { title, description } = params;
    try {
      const content = await GenerateArticle(title, description);
      if (content) {
        generatedContent = {
          id: uuidv4(),
          title,
          description,
          content,
          date: new Date(),
        };
        setContentItems([generatedContent, ...(contentItems || [])]);
      }
    } catch (error) {
      toast.error('error occured while generating article');
      console.error('failed to generate article', error);
    } finally {
      setGeneratingContent(false);
    }
    return generatedContent;
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

  const getContentById = (id: string) => {
    const generatedContent = contentItems?.find((item) => item.id === id);
    if (!generatedContent) {
      throw new Error('content not found');
    }
    return generatedContent;
  };

  const updatedById = (id: string, generatedContent: TGeneratedContent) => {
    const updatedContentItems = contentItems?.map((item) => {
      if (item.id === id) {
        return generatedContent;
      }
      return item;
    });
    setContentItems(updatedContentItems || []);
  };

  return (
    <ContentContext.Provider
      value={{
        generateContent,
        generatingContent,
        setGeneratingContent,
        getPromptHistory,
        getContentById,
        updatedById,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export { ContentContextProvider };
