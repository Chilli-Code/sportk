import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import AnimatedTitle from '../ui/AnimatedTitle'
import '../../styles/intro.css'
import fondo from '/images/fondo.jpg'


// Foto horizontal (16:9), ≥2400px, tonos oscuros. Ej: '/images/vestuario.webp'
const IMAGE_SRC = fondo
const IMAGE_ALT = 'Equipo con uniformes personalizados'

function useMobile() {
  const [m, setM] = useState(false)
  useEffect(() => {
    const q = window.matchMedia('(max-width: 700px)')
    const f = () => setM(q.matches)
    f(); q.addEventListener('change', f)
    return () => q.removeEventListener('change', f)
  }, [])
  return m
}

function Photo() {
  return IMAGE_SRC
    ? <img src={IMAGE_SRC} alt={IMAGE_ALT} />
    : <div className="ia-ph"><span>IMAGEN</span><small>horizontal 16:9 · mín. 2400 px · tonos oscuros</small></div>
}

export default function IntroSection() {
  const reduce = !!useReducedMotion()
  const mobile = useMobile()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const w = useTransform(p, [0, 0.75], [mobile ? '74vw' : '34vw', '100vw'])
  const h = useTransform(p, [0, 0.75], [mobile ? '50vh' : '52vh', '100vh'])
  const r = useTransform(p, [0, 0.75], [28, 0])
  const zoom = useTransform(p, [0, 0.9], [1.18, 1])
  const textO = useTransform(p, [0.68, 0.92], [0, 1])
  const textY = useTransform(p, [0.68, 0.92], [28, 0])

  return (
    <section id="nosotros" className="ia">
      <div className="wrap ia-head">
        <span className="ia-eyebrow"><i />NOSOTROS</span>
        <AnimatedTitle lines={['NO ES', 'SOLO ROPA.']} />
        <p className="t-sm">Es la identidad que llevas cuando entras a la cancha.</p>
      </div>

      {reduce ? (
        <div className="ia-static"><Photo /></div>
      ) : (
        <div ref={ref} className="ia-clip">
          <div className="ia-pin">
            <motion.div className="ia-box" style={{ width: w, height: h, borderRadius: r }}>
              <motion.div className="ia-img" style={{ x: '-50%', y: '-50%', scale: zoom }}><Photo /></motion.div>
              <div className="ia-shade" />
            </motion.div>
            <motion.div className="ia-over" style={{ opacity: textO, y: textY }}>
              <span />HECHO PARA COMPETIR.
            </motion.div>
          </div>
        </div>
      )}
    </section>
  )
}
