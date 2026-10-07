import { RotateCcw } from 'lucide-react'
import { useDesignStore } from '../../stores/designStore'
import { useSaveStatus } from '../../stores/saveStatus'

const since = (t: number | null) => {
  if (!t) return ''
  const m = Math.floor((Date.now() - t) / 60000)
  if (m < 1) return 'hace un momento'
  if (m < 60) return `hace ${m} min`
  const h = Math.floor(m / 60)
  if (h < 24) return `hace ${h} h`
  const d = Math.floor(h / 24)
  return d === 1 ? 'ayer' : `hace ${d} días`
}

/** Aparece solo si al abrir la página se recuperó un diseño sin terminar. */
export default function ResumeBanner() {
  const { restored, restoredAt, dismissRestore } = useSaveStatus()
  const gender = useDesignStore((s) => s.gender)
  const name = useDesignStore((s) => s.name)
  if (!restored || !gender) return null

  return (
    <div role="region" aria-label="Diseño recuperado" className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-white/10 bg-[#141414] px-4 py-2.5 sm:px-5">
      <p className="flex items-center gap-2 text-sm text-[#D4D4D4]">
        <RotateCcw size={15} className="shrink-0 text-[#FF4D00]" />
        <span>Recuperamos <b className="text-white">{name}</b> <span className="text-[#A3A3A3]">({since(restoredAt)})</span></span>
      </p>
      <div className="flex gap-2">
        <button onClick={dismissRestore} className="h-9 rounded-full bg-white px-4 text-xs font-extrabold tracking-wide text-[#050505] transition hover:bg-[#FF4D00]">Continuar</button>
        <button onClick={() => { useDesignStore.getState().newDesign(); dismissRestore() }}
          className="h-9 rounded-full border border-white/20 px-4 text-xs font-bold text-white transition hover:border-white">Empezar de nuevo</button>
      </div>
    </div>
  )
}
