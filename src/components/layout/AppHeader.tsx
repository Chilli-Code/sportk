import { Link } from 'react-router-dom'
import { LOGO_MARK, LOGO_VIEWBOX_MARK } from '../../lib/logoPaths'
import { mockUser } from '../../data/mockUser'

/** Barra superior solo en móvil. En escritorio la marca vive en la sidebar. */
export default function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#050505]/80 px-5 pt-[env(safe-area-inset-top)] backdrop-blur-xl md:hidden">
      <Link to="/app" aria-label="Inicio" className="flex items-center gap-3 text-white">
        <svg viewBox={LOGO_VIEWBOX_MARK} height="26" fill="currentColor" aria-hidden><path d={LOGO_MARK} /></svg>
        <span className="text-xs font-extrabold tracking-[0.28em]">LYAN EMEL</span>
      </Link>
      <Link to="/app/profile" aria-label="Perfil" className="grid size-9 place-items-center rounded-full bg-[#1F1F1F] text-sm font-bold text-white">
        {mockUser.name[0]}
      </Link>
    </header>
  )
}
