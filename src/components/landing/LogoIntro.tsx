import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { LOGO_LETTERS, LOGO_MARK, LOGO_VIEWBOX_FULL } from '../../lib/logoPaths'

const HOLD_MS = 4200 // duración total antes de que la pantalla suba
const EASE = [0.65, 0, 0.35, 1] as const

// Se reproduce una vez por carga de página (al refrescar vuelve a salir)
let played = false
export const introWillPlay = () => !played

/**
 * El logo se "dibuja": primero se traza el contorno (pathLength 0 → 1),
 * después el relleno aparece y la línea del contorno se desvanece.
 */
const draw = (delay: number, dur: number) => ({
  initial: { pathLength: 0, fillOpacity: 0, strokeOpacity: 1 },
  animate: { pathLength: 1, fillOpacity: 1, strokeOpacity: 0 },
  transition: {
    pathLength: { duration: dur, delay, ease: EASE },
    fillOpacity: { duration: 0.7, delay: delay + dur * 0.75, ease: 'easeOut' as const },
    strokeOpacity: { duration: 0.5, delay: delay + dur + 0.1 },
  },
})

export default function LogoIntro() {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(!played && !reduce)

  useEffect(() => {
    if (!show) return
    played = true
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => setShow(false), HOLD_MS)
    return () => { clearTimeout(t); document.body.style.overflow = '' }
  }, [show])

  return (
    <AnimatePresence onExitComplete={() => { document.body.style.overflow = '' }}>
      {show && (
        <motion.div
          key="intro"
          aria-hidden
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#050505', display: 'grid', placeItems: 'center', color: '#fff' }}
        >
          <div style={{ width: 'min(72vw, 560px)' }}>
            <svg
              viewBox={LOGO_VIEWBOX_FULL}
              width="100%"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={2.4}
              strokeLinejoin="round"
              style={{ display: 'block', overflow: 'visible' }}
            >
              {/* La L grande se dibuja primero */}
              <motion.path d={LOGO_MARK} {...draw(0.2, 1.7)} />
              {/* Después las letras, una tras otra */}
              {LOGO_LETTERS.map((l, i) => (
                <motion.path key={l.id} d={l.d} {...draw(1.1 + i * 0.11, 1.0)} />
              ))}
            </svg>

            {/* Línea naranja: único acento, indicador de carga */}
            <div style={{ height: 2, marginTop: 28, background: 'rgba(255,255,255,.08)', overflow: 'hidden' }}>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: HOLD_MS / 1000 - 0.3, ease: 'easeInOut' }}
                style={{ height: '100%', background: '#FF4D00', transformOrigin: 'left' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}