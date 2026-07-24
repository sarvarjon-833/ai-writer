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
import * as Sentry from '@sentry/react';
import './sentry';
import Homepage from './pages/homePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
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
      {
        path: 'payment',
        element: <h1>Payment page</h1>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<p>xatolik yuz berdi</p>}>
      <Toaster />
      <AppContextProvider>
        <AuthProvider>
          <ContentContextProvider>
            <RouterProvider router={router} />
          </ContentContextProvider>
        </AuthProvider>
      </AppContextProvider>
    </Sentry.ErrorBoundary>
  </StrictMode>
);
