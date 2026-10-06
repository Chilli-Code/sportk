import { Link, NavLink } from 'react-router-dom'
import { House, LogOut, Package, Pencil, Shirt, User } from 'lucide-react'
import { LOGO_MARK, LOGO_VIEWBOX_MARK } from '../../lib/logoPaths'

const items = [
  { to: '/app', label: 'Inicio', icon: House, end: true },
  { to: '/app/designs', label: 'Mis diseños', icon: Shirt, end: false },
  { to: '/app/orders', label: 'Mis pedidos', icon: Package, end: false },
]

function Item({ to, label, icon: Icon, end }: (typeof items)[number]) {
  return (
    <NavLink to={to} end={end} title={label} className="block">
      {({ isActive }) => (
        <div className={`relative flex h-12 items-center justify-center gap-3.5 rounded-xl text-sm font-semibold transition-colors lg:justify-start lg:px-4 ${
          isActive ? 'bg-white/10 text-white' : 'text-[#A3A3A3] hover:bg-white/5 hover:text-white'}`}>
          <span className={`absolute bottom-2.5 left-0 top-2.5 w-[3px] rounded-full bg-[#FF4D00] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} />
          <Icon size={20} className={isActive ? 'text-[#FF4D00]' : ''} />
          <span className="hidden lg:inline">{label}</span>
        </div>
      )}
    </NavLink>
  )
}

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-20 flex-col border-r border-white/10 bg-[#0D0D0D] md:flex lg:w-64">
      <Link to="/app" aria-label="Inicio" className="flex h-20 items-center justify-center gap-3 lg:justify-start lg:px-7">
        <div className="flex items-center gap-3 text-white">
          <svg viewBox={LOGO_VIEWBOX_MARK} height="30" fill="currentColor" aria-hidden><path d={LOGO_MARK} /></svg>
          <span className="hidden text-[13px] font-extrabold tracking-[0.28em] lg:inline">LYAN EMEL</span>
        </div>
      </Link>

      <nav aria-label="Principal" className="flex flex-1 flex-col gap-1 px-3">
        <NavLink to="/app/designer" title="Diseñar" className="mb-4 block">
          {({ isActive }) => (
           <div className={`flex h-14 items-center justify-center gap-3 rounded-2xl text-sm font-extrabold tracking-wide transition ${
  isActive ? 'bg-[#FF4D00] text-[#050505]' : 'bg-white/10 text-white hover:bg-white hover:text-[#050505]'}`}>
              <Pencil size={20} /><span className="hidden lg:inline">DISEÑAR</span>
            </div>
          )}
        </NavLink>
        {items.map((i) => <Item key={i.to} {...i} />)}
      </nav>

      <div className="flex flex-col gap-1 border-t border-white/10 p-3">
        <Item to="/app/profile" label="Perfil" icon={User} end={false} />
        <Link to="/login" title="Cerrar sesión" className="block">
          <div className="flex h-12 items-center justify-center gap-3.5 rounded-xl text-sm font-semibold text-[#A3A3A3] transition-colors hover:bg-white/5 hover:text-white lg:justify-start lg:px-4">
            <LogOut size={20} /><span className="hidden lg:inline">Cerrar sesión</span>
          </div>
        </Link>
      </div>
    </aside>
  )
}