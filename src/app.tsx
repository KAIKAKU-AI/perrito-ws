import DashboardPage from '@pages/DashboardPage'
import ErrorPage from '@pages/ErrorPage'
import ServersPage from '@pages/ServersPage'
import SettingsPage from '@pages/SettingsPage'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import './normalize.css'
import './styles.css'

const router = createBrowserRouter([
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
    path: '/dashboard/:connectionId',
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/servers',
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
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
