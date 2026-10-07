import { Check } from 'lucide-react'
import { TOOLS } from '../../lib/designerTools'
import { useDesignStore, type Garment, type Gender } from '../../stores/designStore'
import type { ToolId } from '../../stores/viewerStore'
import ClubPanel from './panels/ClubPanel'
import ColorPanel from './panels/ColorPanel'
import PatternPanel from './panels/PatternPanel'

const field = 'h-12 w-full rounded-xl border border-[#2a2a2a] bg-[#141414] px-4 text-[15px] text-white outline-none transition focus:border-[#FF4D00] focus:ring-4 focus:ring-[#FF4D00]/15'
const lbl = 'text-xs font-bold uppercase tracking-[0.1em] text-[#D4D4D4]'

function Garments() {
  const { garment, setGarment, gender, setGender } = useDesignStore()
  const opts: { id: Garment; label: string; sub: string }[] = [
    { id: 'shirt', label: 'Camiseta', sub: 'Solo la parte superior' },
    { id: 'shorts', label: 'Short', sub: 'Solo la parte inferior' },
    { id: 'set', label: 'Uniforme', sub: 'Camiseta y short' },
  ]
  const cuts: { id: Gender; label: string }[] = [{ id: 'men', label: 'Hombre' }, { id: 'women', label: 'Mujer' }]
  return (
    <div className="space-y-5">
      <div>
        <p className={`${lbl} mb-2`}>Corte</p>
        <div className="grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-[#141414] p-1">
          {cuts.map((c) => (
            <button key={c.id} onClick={() => setGender(c.id)} aria-pressed={gender === c.id}
              className={`h-10 rounded-full text-sm font-bold transition-colors ${gender === c.id ? 'bg-white text-[#050505]' : 'text-[#A3A3A3]'}`}>{c.label}</button>
          ))}
        </div>
      </div>
      <div className="grid gap-2">
        {opts.map((o) => (
          <button key={o.id} onClick={() => setGarment(o.id)} aria-pressed={garment === o.id}
            className={`flex items-center justify-between rounded-xl border p-4 text-left transition-colors ${garment === o.id ? 'border-[#FF4D00] bg-[#FF4D00]/10' : 'border-white/10 bg-[#141414] hover:border-white/25'}`}>
            <span><span className="block font-bold">{o.label}</span><span className="text-xs text-[#A3A3A3]">{o.sub}</span></span>
            {garment === o.id && <Check size={18} className="text-[#FF4D00]" />}
          </button>
        ))}
      </div>
    </div>
  )
}

function Player() {
  const { player, setPlayer, garment } = useDesignStore()
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="d-num" className={lbl}>Número</label>
        <input id="d-num" inputMode="numeric" maxLength={2} className={field} value={player.number} onChange={(e) => setPlayer({ number: e.target.value.replace(/\D/g, '') })} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="d-name" className={lbl}>Nombre</label>
        <input id="d-name" maxLength={12} className={`${field} uppercase`} value={player.name} onChange={(e) => setPlayer({ name: e.target.value.toUpperCase() })} />
      </div>
      <p className="text-xs text-[#737373]">
        {garment === 'shorts' ? 'En el short el número va en la pierna izquierda.' : 'El nombre aparece en la espalda. Gira la prenda con “Espalda”.'} El color se cambia en “Color › Detalles”.
      </p>
    </div>
  )
}

function Soon({ id }: { id: ToolId }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 p-6 text-center">
      <p className="font-bold">{TOOLS.find((t) => t.id === id)?.label}</p>
      <p className="mt-1 text-sm text-[#A3A3A3]">Esta herramienta llega en el siguiente paso.</p>
    </div>
  )
}

export const toolTitle = (id: ToolId) => TOOLS.find((t) => t.id === id)?.label ?? ''

export default function ToolPanel({ tool }: { tool: ToolId }) {
  switch (tool) {
    case 'club': return <ClubPanel />
    case 'garment': return <Garments />
    case 'pattern': return <PatternPanel />
    case 'color': return <ColorPanel />
    case 'player': return <Player />
    default: return <Soon id={tool} />
  }
}
