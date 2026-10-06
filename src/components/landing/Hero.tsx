
import {  useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { LOGO_MARK, LOGO_VIEWBOX_MARK } from '../../lib/logoPaths'
import { introWillPlay } from './LogoIntro'
import '../../styles/hero.css'

export default function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  const [d0] = useState(() =>
    introWillPlay() && !reduce ? 2.3 : 0
  )

  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const { scrollY } = useScroll()

  const wmY = useTransform(
    scrollY,
    [0, 700],
    [0, 90]
  )

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()

    if (!r || !ref.current) return

    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height

    mx.set(x - 0.5)
    my.set(y - 0.5)

    r && ref.current.style.setProperty(
      '--mx',
      `${x * 100}%`
    )

    r && ref.current.style.setProperty(
      '--my',
      `${y * 100}%`
    )
  }

  const line = (
    txt: string,
    n: number,
    accent = false
  ) => (
    <span className="hx-line">
      <motion.span
        initial={{ y: '108%' }}
        animate={{ y: 0 }}
        transition={{
          duration: 1,
          ease: [0.2, 0.7, 0.2, 1],
          delay: d0 + n * 0.12,
        }}
      >
        {txt}
        {accent && <b>.</b>}
      </motion.span>
    </span>
  )

  return (
    <section
      id="inicio"
      ref={ref}
      className="hx"
      onMouseMove={onMove}
    >
      <div className="hx-spot" />

      <motion.div
        className="hx-wm"
        style={{ y: wmY }}
        aria-hidden
      >
        <svg
          viewBox={LOGO_VIEWBOX_MARK}
          fill="currentColor"
        >
          <path d={LOGO_MARK} />
        </svg>
      </motion.div>

      <div className="wrap hx-in">
        <div className="hx-copy">
          <h1 className="hx-title">
            {line('VISTE', 0)}
            {line('TU', 1)}
            {line('IDENTIDAD', 2, true)}
          </h1>

          <motion.p
            className="t-sm"
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: d0 + 0.7,
              duration: 0.8,
            }}
          >
            Ropa deportiva personalizada diseñada para representar quién eres y cómo compites.
          </motion.p>

          <motion.div
            className="hx-cta"
            initial={{
              opacity: 0,
              y: 14,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: d0 + 0.85,
              duration: 0.8,
            }}
          >
            <a
              href="#disenar"
              className="btn pri"
            >
              DISEÑA AHORA
            </a>

            <a
              href="#coleccion"
              className="btn"
            >
              VER COLECCIÓN
            </a>
          </motion.div>
        </div>

        {/* Espacio reservado para futura imagen */}
        <motion.div
          className="hx-media-placeholder"
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: d0 + 0.45,
            duration: 1,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          aria-hidden
        />
      </div>

      <div
        className="hx-side"
        aria-hidden
      >
        COLECCIÓN 2026
      </div>

      <div
        className="hx-scroll"
        aria-hidden
      >
        <i />
        <span>Desliza</span>
      </div>
    </section>
  )
}

