import { useDesignStore } from '../../stores/designStore'
import { useViewerStore, type Target } from '../../stores/viewerStore'

const opts: { id: Target; label: string }[] = [{ id: 'shirt', label: 'Camiseta' }, { id: 'shorts', label: 'Short' }]

/** Solo aparece en un uniforme completo: elige qué prenda editan Estilo y Color. */
export default function TargetSwitch() {
  const garment = useDesignStore((s) => s.garment)
  const { target, setTarget } = useViewerStore()
  if (garment !== 'set') return null
  return (
    <div role="tablist" aria-label="Prenda a editar" className="mb-4 grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-[#141414] p-1">
      {opts.map((o) => (
        <button key={o.id} role="tab" aria-selected={target === o.id} onClick={() => setTarget(o.id)}
          className={`h-10 rounded-full text-sm font-bold transition-colors ${target === o.id ? 'bg-white text-[#050505]' : 'text-[#A3A3A3]'}`}>{o.label}</button>
      ))}
    </div>
  )
}
