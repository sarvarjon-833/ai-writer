import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/layout/dashboard-layout';
import DashboardHome from './pages/dashboard-home';
import { AppContextProvider } from './context/app.provider';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1 className="text-5xl">hello world</h1>,
  },
  {
    path: 'login',
    element: <h1 className="text-5xl">Login</h1>,
  },
  {
    path: 'register',
    element: <h1 className="text-5xl">Register</h1>,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </StrictMode>
);
