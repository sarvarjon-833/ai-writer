import { ClipboardIcon, ShareIcon } from '@heroicons/react/16/solid';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import Markdown from 'react-markdown';
import toast from 'react-hot-toast';
import { PencilIcon } from 'lucide-react';
import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import type { TGeneratedContent } from '@/shared/types/generated-content';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

type ContentViewerProps = {
  generatedContent: TGeneratedContent;
  onSave: (generatedContent: TGeneratedContent) => void;
};

type Mode = 'view' | 'edit';

export default function ContentViewer({
  generatedContent,
  onSave,
}: ContentViewerProps) {
  const [mode, setMode] = useState<Mode>('view');
  const [editedContent, setEditedContent] = useState<string>(
    generatedContent.content
  );
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent.content);
      toast.success('successfully copied to clibboard');
    } catch (error) {
      console.error('failed to copy to clipboard', error);
      toast.error('error occured while copying to clipboard');
    }
  };

  const handleEdit = () => {
    setMode('edit');
  };

  const handleContentChange = (value?: string) => {
    setEditedContent(value || '');
  };

  const handleCancel = () => {
    setMode('view');
    setEditedContent(generatedContent.content);
  };

  const handleSave = () => {
    onSave({ ...generatedContent, content: editedContent });
    setMode('view');
  };

  const handleShare = async () => {
    try {
      const { origin } = window.location;
      await navigator.clipboard.writeText(
        `${origin}/share/${generatedContent.id}`
      );
      toast.success('share link successfully copied to clibboard');
    } catch (error) {
      console.error('failed to copy to clipboard', error);
      toast.error('error occured while copying to clipboard');
    }
  };

  return mode === 'view' ? (
    <Card className="mt-4">
      <CardContent className="p-4 md:p-6 lg:p-8">
        <div className="prose lg:prose-xl">
          <Markdown>{generatedContent.content}</Markdown>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={handleEdit}>
                <PencilIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={handleShare}>
                <ShareIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={handleCopy}>
                <ClipboardIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  ) : (
    <div>
      <MDEditor
        height={400}
        className="mt-4"
        value={editedContent}
        onChange={handleContentChange}
      />
      <div className="mt-4 flex gap-2">
        <Button onClick={handleSave}>Save</Button>
        <Button variant="destructive" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
