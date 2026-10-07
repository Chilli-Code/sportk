import { motion } from 'framer-motion'
import { FIT, toPath } from '../../lib/fitShapes'
import { useDesignStore, type Gender } from '../../stores/designStore'

const opts: { id: Gender; label: string; sub: string }[] = [
  { id: 'men', label: 'HOMBRE', sub: 'Corte recto' },
  { id: 'women', label: 'MUJER', sub: 'Corte entallado' },
]

/** Primer paso al crear un diseño. */
export default function GenderPicker() {
  const setGender = useDesignStore((s) => s.setGender)
  return (
    <div className="grid min-h-0 flex-1 place-items-center overflow-y-auto px-5 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }} className="w-full max-w-2xl">
        <h1 className="text-center text-[clamp(26px,5vw,40px)] font-extrabold leading-tight tracking-[-0.03em]">¿Para quién es el diseño?</h1>
        <p className="mt-2 text-center text-[#A3A3A3]">Elige el corte de la prenda. Podrás cambiarlo después.</p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5">
          {opts.map((o) => (
            <button key={o.id} onClick={() => { setGender(o.id); useDesignStore.temporal.getState().clear() }}
              className="group flex flex-col items-center rounded-3xl border border-white/10 bg-gradient-to-b from-[#1c1c1c] to-[#0d0d0d] p-4 pb-5 transition-colors hover:border-[#FF4D00] focus-visible:border-[#FF4D00] sm:p-6">
              <svg viewBox="0 0 400 440" className="h-[min(34dvh,240px)] w-full transition-transform duration-500 group-hover:scale-105" aria-hidden>
                {[FIT[o.id].left, FIT[o.id].right, FIT[o.id].torso].map((p, i) => <path key={i} d={toPath(p)} fill={i < 2 ? '#FF4D00' : '#2b2b2b'} stroke="#3d3d3d" strokeWidth="3" strokeLinejoin="round" />)}
              </svg>
              <span className="mt-3 text-lg font-extrabold tracking-[0.12em]">{o.label}</span>
              <span className="text-sm text-[#A3A3A3]">{o.sub}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
