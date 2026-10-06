import { useEffect, useState } from 'react'
import Logo from '../ui/Logo'
const links = [['Inicio', '#inicio'], ['Colección', '#coleccion'], ['Personalización', '#personalizacion'], ['Nosotros', '#nosotros']]
export default function LandingHeader() {
  const [on, setOn] = useState(false), [open, setOpen] = useState(false)
  useEffect(() => { const f = () => setOn(scrollY > 24); f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [])
  return (
    <header className={`hdr ${on || open ? 'on' : ''}`}>
      <div className="wrap">
        <Logo />
        <nav className="nav">{links.map(([l, h]) => <a key={h} href={h}>{l}</a>)}</nav>
        <div className="act">
          <a href="#contacto" className="btn ghost">Contacto</a>
          <a href="#disenar" className="btn pri">Diseñar ahora</a>
          <button className="burger" aria-label="Menú" aria-expanded={open} onClick={() => setOpen(!open)}>
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d={open ? 'M5 5l14 14M19 5L5 19' : 'M3 8h18M3 16h18'} /></svg>
          </button>
        </div>
      </div>
      {open && <div className="mob" onClick={() => setOpen(false)}>{[...links, ['Contacto', '#contacto']].map(([l, h]) => <a key={h} href={h}>{l}</a>)}</div>}
    </header>
  )
}
