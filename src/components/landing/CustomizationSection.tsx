import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { LOGO_MARK, LOGO_VIEWBOX_MARK } from '../../lib/logoPaths'
import '../../styles/customization.css'

const cards = [
  { id: 'colores', label: 'COLORES', text: 'Nuestra base. Tu combinación.', rot: -9, ty: -4 },
  { id: 'dorsales', label: 'DORSALES', text: 'Tu número. Tu identidad.', rot: 4, ty: 0 },
  { id: 'nombres', label: 'NOMBRES', text: 'Lleva tu nombre.', rot: -4, ty: 5 },
  { id: 'escudos', label: 'ESCUDOS', text: 'Representa a tu equipo.', rot: 4, ty: -3 },
  { id: 'patrocinadores', label: 'PATROCINADORES', text: 'Tu marca también juega.', rot: -8, ty: 4 },
]

// Visual de cada tarjeta. Sustituye por foto/render con <img> cuando lo tengas.
function Visual({ id }: { id: string }) {
  switch (id) {
    case 'colores':
      return <div className="cz-sw">{['#F5F5F5', '#737373', '#1F1F1F', '#FF4D00'].map((c) => <i key={c} style={{ background: c }} />)}</div>
    case 'dorsales':
      return <span className="cz-no">10</span>
    case 'nombres':
      return <span className="cz-nm">LYAN</span>
    case 'escudos':
      return <svg viewBox={LOGO_VIEWBOX_MARK} className="cz-mk" fill="currentColor"><path d={LOGO_MARK} /></svg>
    default:
      return <div className="cz-sp"><i style={{ width: '78%' }} /><i style={{ width: '54%' }} /><i style={{ width: '66%', background: '#FF4D00' }} /></div>
  }
}

function Card({ c, i, p, still }: { c: (typeof cards)[number]; i: number; p: MotionValue<number>; still: boolean }) {
  const s = 0.1 + i * 0.1
  const y = useTransform(p, [s, s + 0.3], ['125vh', '0vh'])
  return (
    <div className="cz-slot" style={{ marginTop: `${c.ty * 0.8}vw` }}>
      <motion.div style={still ? { rotate: c.rot } : { y, rotate: c.rot }}>
        <article className="cz-card" tabIndex={0}>
          <div className="cz-vis"><Visual id={c.id} /></div>
          <h3>{c.label}</h3>
          <p>{c.text}</p>
        </article>
      </motion.div>
    </div>
  )
}

export default function CustomizationSection() {
  const ref = useRef<HTMLElement>(null)
  const still = !!useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x1 = useTransform(p, [0, 0.9], ['-10vw', '24vw'])
  const x2 = useTransform(p, [0, 0.9], ['12vw', '-20vw'])
  const x3 = useTransform(p, [0, 0.9], ['8vw', '-40vw'])

  return (
    <section id="personalizacion" ref={ref} className={`cz ${still ? 'cz-still' : ''}`}>
      <div className="cz-pin">
        <h2 className="cz-title">
          <motion.span style={still ? undefined : { x: x1 }}>HAZLO</motion.span>
          <motion.span className="cz-out" style={still ? undefined : { x: x2 }}>TUYO.</motion.span>
          <motion.span className="cz-strip" aria-hidden style={still ? undefined : { x: x3 }}>
            COLORES · DORSALES · NOMBRES · ESCUDOS · PATROCINADORES
          </motion.span>
        </h2>
        <div className="cz-row">{cards.map((c, i) => <Card key={c.id} c={c} i={i} p={p} still={still} />)}</div>
      </div>
    </section>
  )
}
