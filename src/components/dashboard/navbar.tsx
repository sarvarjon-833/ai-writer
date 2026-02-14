import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppContext } from '@/context/app.context';
import { Bars3Icon } from '@heroicons/react/16/solid';

export default function Navbar() {
  const { toggleSidebar } = useAppContext();
  return (
    <div className="border-b">
      <nav className="flex items-center justify-between p-4 h-16">
        <div className="flex items-center gap-2">
          <Button
            className="block md:hidden"
            variant={'outline'}
            onClick={toggleSidebar}
          >
            <Bars3Icon className="w-4 h-4" />
          </Button>
          <h4 className="font-semibold">Dashboard</h4>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Sarvarjon</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  );
}
