import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/layout/dashboard-layout';
import DashboardHome from './pages/dashboard-home';
import { AppContextProvider } from './context/app.provider';
import { Toaster } from 'react-hot-toast';
import { ContentContextProvider } from './context/contentContextProvider';
import DashboardContent from './pages/dashboard-content';
import ContentNotFound from './components/dashboard/content-error-notfound';

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
      {
        path: 'content/:id',
        element: <DashboardContent />,
        errorElement: <ContentNotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <AppContextProvider>
      <ContentContextProvider>
        <RouterProvider router={router} />
      </ContentContextProvider>
    </AppContextProvider>
  </StrictMode>
);
