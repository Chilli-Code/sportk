import { lazy } from 'react'
import type React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import LandingLayout from '../layouts/LandingLayout'
import AppLayout from '../layouts/AppLayout'
import LandingPage from '../pages/landing/LandingPage'
import LoginPage from '../pages/auth/LoginPage'

const HomePage = lazy(() => import('../pages/app/HomePage'))
const DesignsPage = lazy(
  () => import('../pages/app/DesignsPage') as Promise<{ default: React.ComponentType<any> }>
)

const ProfilePage = lazy(
  () => import('../pages/app/ProfilePage') as Promise<{ default: React.ComponentType<any> }>
)
const DesignerPage = lazy(() => import('../pages/app/DesignerPage'))
const OrdersPage = lazy(() => import('../pages/app/OrdersPage'))


export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingLayout />,
    children: [{ index: true, element: <LandingPage /> }],
  },
  { path: '/login', element: <LoginPage /> },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'designs', element: <DesignsPage /> },
      { path: 'designer', element: <DesignerPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])