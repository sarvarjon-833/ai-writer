import PromptHistory from './prompt-history';
import { PencilSquareIcon } from '@heroicons/react/16/solid';
import { useAppContext } from '@/context/app.context';
import { Spinner } from '../ui/spinner';
import { useContentContext } from '@/context/content.context';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const { sidebarOpen } = useAppContext();
  const { generatingContent, getPromptHistory } = useContentContext();
  const historyItems = getPromptHistory();
  const classes = sidebarOpen ? 'w-1/2 border-r p-2' : 'w-0';
  return (
    <nav
      className={`transition-all duration-500 overflow-x-hidden h-screen md:w-80 md:border-r md:p-4 ${classes}`}
    >
      <div className=" flex items-center justify-between">
        <h1 className="text-xl font-semibold">AI writer</h1>
        {generatingContent ? (
          <Spinner data-icon="inline-start" />
        ) : (
          <Link to="/dashboard">
            <PencilSquareIcon className="w-4 md:w-6 h-4 md:h-6" />
          </Link>
        )}
      </div>
      <PromptHistory items={historyItems} />
    </nav>
  );
}
