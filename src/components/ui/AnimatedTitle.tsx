import { motion } from 'framer-motion'
import '../../styles/animated-title.css'

type Props = {
  /** Cada elemento es una línea. Las palabras se separan por espacios. */
  lines: string[]
  /** Tamaño del título. */
  size?: 'md' | 'lg' | 'xl'
 align?: 'center' | 'left' | 'right'
  /** Etiqueta HTML. Usa 'h1' solo una vez por página. */
  as?: 'h1' | 'h2' | 'h3' | 'div'
  /** Segundos de espera antes de empezar. */
  delay?: number
  className?: string
}

/**
 * Título que entra palabra por palabra con giro 3D al aparecer en pantalla.
 * Una palabra que termina en punto pinta ese punto en naranja.
 *
 *   <AnimatedTitle lines={['TU EQUIPO.', 'TU IDENTIDAD.']} />
 */
export default function AnimatedTitle({ lines, size = 'xl', align = 'center', as: Tag = 'h2', delay = 0, className = '' }: Props) {
  let n = 0
  return (
    <Tag className={`atl atl-${size} atl-${align} ${className}`} style={{ perspective: 1000 }}>
      {lines.map((line) => (
        <span key={line} className="atl-line">
          {line.split(' ').map((w) => {
            const dot = w.endsWith('.')
            const i = n++
            return (
              <motion.span key={`${w}${i}`} className="atl-word" style={{ transformOrigin: '50% 50% -150px' }}
                initial={{ opacity: 0, x: 10, y: 50, z: -60, rotateY: 60, rotateX: -40 }}
                whileInView={{ opacity: 1, x: 0, y: 0, z: 0, rotateY: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-12% 0px' }}
                transition={{ duration: 0.9, delay: delay + i * 0.07, ease: [0.2, 0.7, 0.2, 1] }}>
                {dot ? w.slice(0, -1) : w}{dot && <b>.</b>}
              </motion.span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}
