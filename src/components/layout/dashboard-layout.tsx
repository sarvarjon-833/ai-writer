import { Outlet } from 'react-router-dom';
import Sidebar from '../dashboard/sidebar';
import Navbar from '../dashboard/navbar';

export default function Dashboard() {
  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
