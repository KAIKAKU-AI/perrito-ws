import { ConfigProvider } from '@contexts/ConfigContext';
import { MessagePresetsProvider } from '@contexts/PresetsContext';
import { ServerProvider } from '@contexts/ServerContext';
import DashboardPage from '@pages/DashboardPage';
import ErrorPage from '@pages/ErrorPage';
import ServersPage from '@pages/ServersPage';
import SettingsPage from '@pages/SettingsPage';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import './normalize.css';
import './styles.css';

const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard/:serverId',
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/dashboard/:serverId/:clientId',
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/servers',
    element: <Navigate to="/servers/create" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/servers/create',
    element: <ServersPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/servers/:serverId',
    element: <ServersPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/settings',
    element: <Navigate to="/settings/general" replace />,
  },
  {
    path: '/settings/:section',
    element: <SettingsPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider>
      <MessagePresetsProvider>
        <ThemeProvider>
          <ServerProvider>
            <RouterProvider router={router} />
          </ServerProvider>
        </ThemeProvider>
      </MessagePresetsProvider>
    </ConfigProvider>
  </StrictMode>,
);
