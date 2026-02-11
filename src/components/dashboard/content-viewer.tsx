import { ClipboardIcon, ShareIcon, StarIcon } from '@heroicons/react/16/solid';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import Markdown from 'react-markdown';
import toast from 'react-hot-toast';

type ContentViewerProps = {
  content: string;
};

export default function ContentViewer({ content }: ContentViewerProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('successfully copied to clibboard');
    } catch (error) {
      console.error('failed to copy to clipboard', error);
      toast.error('error occured while copying to clipboard');
    }
  };

  return (
    <Card className="mt-4">
      <CardContent className="p-8">
        <div className="prose lg:prose-xl">
          <Markdown>{content}</Markdown>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Button variant="outline">
          <ShareIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={handleCopy}>
          <ClipboardIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline">
          <StarIcon className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
