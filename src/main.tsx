import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
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
import Login from './components/auth/login';
import ProtectedRoute from './components/auth/protected-route';
import './i18n';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1 className="text-5xl">hello world</h1>,
  },
  {
    path: 'dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
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
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
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
