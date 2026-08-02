import { useEffect, useState, type FC, type ReactNode } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ContentContext } from './content.context';
import type { TContentCreateRequestParams } from '@/shared/types/content-create-request-params';
import type { TGeneratedContent } from '@/shared/types/generated-content';
import type {
  IContentItem,
  TPromptHistory,
  TPromptLink,
} from '@/shared/types/prompt-history.type';
import dayjs from 'dayjs';

interface IProps {
  children: ReactNode;
}

const ContentContextProvider: FC<IProps> = ({ children }) => {
  const [generatingContent, setGeneratingContent] = useState(false);
  const [contentItems, setContentItems] = useState<IContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get(
          'http://localhost:5000/api/v1/prompt',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setContentItems(response.data.data.list);
      } catch (err) {
        console.log('Prompt tarixini olishda xatolik', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const generateContent = async (params: TContentCreateRequestParams) => {
    let generatedContent: TGeneratedContent | null = null;
    setGeneratingContent(true);
    const { title, description } = params;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/v1/prompt/',
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      generatedContent = response.data.data.prompt;
      if (generatedContent) {
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
    if (!contentItems || contentItems.length === 0) {
      return [];
    }
    const groupedItems = contentItems.reduce(
      (prev: { [key: string]: TPromptLink[] }, next) => {
        const dataKey = dayjs(next.createdAt).format('MMM DD, YYYY');
        if (!prev[dataKey]) {
          prev[dataKey] = [];
        }
        prev[dataKey].push({
          title: next.title,
          url: `/dashboard/content/${next._id}`,
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

  const getContentById = (id: string): IContentItem | undefined => {
    return contentItems?.find((item) => item._id === id);
  };

  const updatedById = (id: string, generatedContent: TGeneratedContent) => {
    const updatedContentItems = contentItems?.map((item) => {
      if (item._id === id) {
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
        loading,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export { ContentContextProvider };
