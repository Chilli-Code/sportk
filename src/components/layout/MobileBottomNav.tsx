
import { NavLink } from 'react-router-dom'
import { House, Package, Pencil, User } from 'lucide-react'

const tabs = [
  { to: '/app', label: 'Inicio', icon: House, end: true },
  { to: '/app/designer', label: 'Diseñar', icon: Pencil, end: false },
  { to: '/app/orders', label: 'Pedidos', icon: Package, end: false },
  { to: '/app/profile', label: 'Perfil', icon: User, end: false },
]

export default function MobileBottomNav() {
  return (
    <nav
      aria-label="Principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#0D0D0D]/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {tabs.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink to={to} end={end} className="block">
              {({ isActive }) => (
                <div className="relative flex h-16 flex-col items-center justify-center gap-1">
                  <span className="relative h-8 w-14">
                    <span
                      className={`absolute left-1/2 top-1/2 grid size-11 place-items-center rounded-2xl transition-all duration-300 ${
                        isActive
                          ? 'bg-[#FF4D00] text-[#050505] shadow-[0_10px_30px_-8px_rgba(255,77,0,0.7)] ring-4 ring-[#0D0D0D]'
                          : 'text-[#737373]'
                      }`}
                      style={{
                        transform: `translate(-50%, calc(-50% - ${
                          isActive ? '8px' : '0px'
                        }))${isActive ? ' scale(1.05)' : ''}`,
                      }}
                    >
                      <Icon size={isActive ? 24 : 22} />
                    </span>
                  </span>

                  <span
                    className={`text-[11px] font-semibold ${
                      isActive ? 'text-white' : 'text-[#737373]'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
