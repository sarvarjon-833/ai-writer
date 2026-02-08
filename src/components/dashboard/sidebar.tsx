import type { TPromptHistory } from '@/shared/prompt-history.type';
import PromptHistory from './prompt-history';
import { PencilSquareIcon } from '@heroicons/react/16/solid';

const mockItems: TPromptHistory[] = [
  {
    date: 'Today',
    links: [
      {
        title: 'Prompt 1',
        url: '/dashboard/prompt/1',
      },
      {
        title: 'Prompt 2',
        url: '/dashboard/prompt/2',
      },
    ],
  },
  {
    date: 'Yesterday',
    links: [
      {
        title: 'Prompt 1',
        url: '/dashboard/prompt/1',
      },
      {
        title: 'Prompt 1',
        url: '/dashboard/prompt/2',
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <nav className="h-screen w-80 border-r p-4">
      <div className=" flex items-center justify-between">
        <h1 className="text-xl font-semibold">AI writer</h1>
        <button>
          <PencilSquareIcon className="w-6 h-6" />
        </button>
      </div>
      <PromptHistory items={mockItems} />
    </nav>
  );
}
