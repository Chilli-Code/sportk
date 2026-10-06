import type { MouseEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import '../../styles/collection.css'

// Cuando tengas las fotos, pon la ruta en `src` (ej: '/images/match.jpg').
// `pos` ajusta el encuadre: 'center top', 'center 30%', etc.
const items = [
  { n: '01', name: 'MATCH', cat: 'Camiseta deportiva', tag: 'MATCH DAY', perks: ['Colores', 'Dorsal', 'Escudo'], src: '', pos: 'center' },
  { n: '02', name: 'ELITE', cat: 'Uniforme deportivo', tag: 'COMPETICIÓN', perks: ['Nombres', 'Patrocinadores', 'Colores'], src: '', pos: 'center' },
  { n: '03', name: 'TRAINING', cat: 'Ropa de entrenamiento', tag: 'ENTRENO', perks: ['Colores', 'Logo'], src: '', pos: 'center' },
  { n: '04', name: 'PRO', cat: 'Conjunto deportivo', tag: 'PRO LINE', perks: ['Todo', 'Personalizable'], src: '', pos: 'center' },
]

function Card({ it, big = false }: { it: (typeof items)[number]; big?: boolean }) {
  const move = (e: MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }
  return (
    <a href="#disenar" className={`cc ${big ? 'cc-big' : ''}`} onMouseMove={move} aria-label={`${it.name}: ${it.cat}. Ver más`}>
      <div className="cc-img">
        {it.src
          ? <img src={it.src} alt="" loading="lazy" style={{ objectPosition: it.pos }} />
          : <div className="cc-ph"><span>IMAGEN</span><small>{big ? '4:5 vertical' : 'horizontal / cuadrada'}</small></div>}
      </div>
      <div className="cc-shade" />
      <div className="cc-light" />

      <div className="cc-top">
        <span className="cc-idx"><i />{it.n}<em> / 04</em></span>
        <span className="cc-tag">{it.tag}</span>
      </div>

      <div className="cc-panel">
        <div className="cc-row">
          <div>
            <h3>{it.name}</h3>
            <p>{it.cat}</p>
          </div>
          <span className="cc-go"><ArrowUpRight size={18} /></span>
        </div>
        <div className="cc-more"><div>
          <ul>{it.perks.map((p) => <li key={p}>{p}</li>)}</ul>
          <b>VER MÁS</b>
        </div></div>
      </div>
    </a>
  )
}

export default function CollectionSection() {
  return (
    <section id="coleccion" className="sec">
      <div className="wrap">
        <Reveal>
          <div className="cc-head">
            <h2 className="t-lg">COLECCIÓN.</h2>
            <p>Cuatro bases.<br />Cada una se convierte en tuya.</p>
          </div>
        </Reveal>
        <div className="cc-grid">
          {items.map((it, i) => (
            <div key={it.n} className={`cc-slot cc-s${i + 1}`}>
              <Reveal delay={i * 0.08}><Card it={it} big={i === 0} /></Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
