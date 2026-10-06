import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import MobileBottomNav from '../components/layout/MobileBottomNav'
import AppHeader from '../components/layout/AppHeader'

export default function AppLayout() {
  return (
    <div className="min-h-svh bg-[#050505] text-white">
      <Sidebar />
      <div className="md:pl-20 lg:pl-64">
        <AppHeader />
        <main className="pb-28 md:pb-0">
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  )
}
