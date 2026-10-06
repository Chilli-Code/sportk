import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { LOGO_MARK, LOGO_VIEWBOX_MARK } from '../../lib/logoPaths'
import { introWillPlay } from './LogoIntro'
import '../../styles/hero.css'

// Diseños de ejemplo que se alternan solos en la prenda
const PRESETS = [
  { body: '#F5F5F5', sleeves: '#141414', collar: '#FF4D00', ink: '#050505', name: 'LYAN', no: '10' },
  { body: '#1F1F1F', sleeves: '#FF4D00', collar: '#F5F5F5', ink: '#FFFFFF', name: 'EMEL', no: '07' },
  { body: '#FF4D00', sleeves: '#050505', collar: '#050505', ink: '#050505', name: 'ATLAS', no: '23' },
  { body: '#737373', sleeves: '#F5F5F5', collar: '#050505', ink: '#FFFFFF', name: 'NOVA', no: '09' },
]
const SLEEVE_L = 'M122 38 L98 66 L46 94 L8 188 L70 216 L100 150 L100 70 Z'
const SLEEVE_R = 'M278 38 L302 66 L354 94 L392 188 L330 216 L300 150 L300 70 Z'
const TORSO = 'M122 38 L278 38 L300 70 L300 150 L304 404 Q200 420 96 404 L100 150 L100 70 Z'
const ease = [0.2, 0.7, 0.2, 1] as const

function Jersey({ i }: { i: number }) {
  const p = PRESETS[i]
  const t = { duration: 0.9, ease: 'easeInOut' as const }
  return (
    <svg viewBox="0 0 400 440" className="hx-jersey" role="img" aria-label="Camiseta deportiva de ejemplo">
      <defs>
        <linearGradient id="hx-shade" x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".5" /><stop offset=".3" stopColor="#000" stopOpacity="0" />
          <stop offset=".62" stopColor="#fff" stopOpacity=".1" /><stop offset="1" stopColor="#000" stopOpacity=".55" />
        </linearGradient>
        <linearGradient id="hx-fold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".14" /><stop offset=".5" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".35" />
        </linearGradient>
        <clipPath id="hx-clip"><path d={TORSO} /><path d={SLEEVE_L} /><path d={SLEEVE_R} /></clipPath>
      </defs>
      <motion.path d={TORSO} animate={{ fill: p.body }} transition={t} />
      <motion.path d={SLEEVE_L} animate={{ fill: p.sleeves }} transition={t} />
      <motion.path d={SLEEVE_R} animate={{ fill: p.sleeves }} transition={t} />
      <g clipPath="url(#hx-clip)">
        <rect width="400" height="440" fill="url(#hx-shade)" />
        <rect width="400" height="440" fill="url(#hx-fold)" />
      </g>
      <g stroke="#fff" strokeOpacity=".16" strokeWidth="1" strokeDasharray="3 4" fill="none">
        <path d="M100 70 V150 M300 70 V150 M130 150 L126 402 M270 150 L274 402 M99 390 Q200 406 301 390" />
      </g>
      <path d="M160 30 Q200 76 240 30 Q200 18 160 30 Z" fill="#050505" />
      <motion.path d="M146 34 Q200 98 254 34 L240 28 Q200 74 160 28 Z" animate={{ fill: p.collar }} transition={t} />
      <motion.g animate={{ fill: p.ink }} transition={t} transform="translate(134 102) scale(0.06) translate(-463 -363)" opacity=".9">
        <path d={LOGO_MARK} />
      </motion.g>
      <motion.g key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
        <text x="200" y="262" textAnchor="middle" fontSize="128" fontWeight="800" letterSpacing="-4" fill={p.ink} fontFamily="Manrope, Inter, sans-serif">{p.no}</text>
        <text x="200" y="302" textAnchor="middle" fontSize="20" fontWeight="700" letterSpacing="9" fill={p.ink} fontFamily="Manrope, Inter, sans-serif">{p.name}</text>
      </motion.g>
    </svg>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const [i, setI] = useState(0)
  const [d0] = useState(() => (introWillPlay() && !reduce ? 2.3 : 0))
  const mx = useMotionValue(0), my = useMotionValue(0)
  const sx = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), { stiffness: 60, damping: 18 })
  const sy = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), { stiffness: 60, damping: 18 })
  const { scrollY } = useScroll()
  const wmY = useTransform(scrollY, [0, 700], [0, 90])

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setI((n) => (n + 1) % PRESETS.length), 3600)
    return () => clearInterval(id)
  }, [reduce])

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
    mx.set(x - 0.5); my.set(y - 0.5)
    ref.current!.style.setProperty('--mx', `${x * 100}%`)
    ref.current!.style.setProperty('--my', `${y * 100}%`)
  }
  const line = (txt: string, n: number, accent = false) => (
    <span className="hx-line"><motion.span initial={{ y: '108%' }} animate={{ y: 0 }}
      transition={{ duration: 1, ease, delay: d0 + n * 0.12 }}>{txt}{accent && <b>.</b>}</motion.span></span>
  )

  return (
    <section id="inicio" ref={ref} className="hx" onMouseMove={onMove}>
      <div className="hx-spot" />
      <motion.div className="hx-wm" style={{ y: wmY }} aria-hidden>
        <svg viewBox={LOGO_VIEWBOX_MARK} fill="currentColor"><path d={LOGO_MARK} /></svg>
      </motion.div>

      <div className="wrap hx-in">
        <div className="hx-copy">
          <h1 className="hx-title">{line('VISTE', 0)}{line('TU', 1)}{line('IDENTIDAD', 2, true)}</h1>
          <motion.p className="t-sm" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d0 + 0.7, duration: 0.8 }}>
            Ropa deportiva personalizada diseñada para representar quién eres y cómo compites.
          </motion.p>
          <motion.div className="hx-cta" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d0 + 0.85, duration: 0.8 }}>
            <a href="#disenar" className="btn pri">DISEÑA AHORA</a>
            <a href="#coleccion" className="btn">VER COLECCIÓN</a>
          </motion.div>
        </div>


      </div>

      <div className="hx-side" aria-hidden>COLECCIÓN 2026</div>
      <div className="hx-scroll" aria-hidden><i /><span>Desliza</span></div>
    </section>
  )
}
