import { Outlet } from 'react-router-dom';
import { Navbar } from '../dashboard/navbar';
import { Sidebar } from '../dashboard/sidebar';

export function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
