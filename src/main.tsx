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
import Share from './pages/share';
import { AuthLayout } from './components/layout/auth-layout';
import Register from './components/auth/register';
import { AuthProvider } from './context/auth.context.provider';

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
  {
    path: 'share/:id',
    element: <Share />,
    errorElement: <ContentNotFound />,
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <AppContextProvider>
      <AuthProvider>
        <ContentContextProvider>
          <RouterProvider router={router} />
        </ContentContextProvider>
      </AuthProvider>
    </AppContextProvider>
  </StrictMode>
);
