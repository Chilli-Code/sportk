import { RotateCcw } from 'lucide-react'
import { useViewerStore, type View } from '../../stores/viewerStore'

const views: { id: View; label: string }[] = [
  { id: 'front', label: 'Frente' },
  { id: 'back', label: 'Espalda' },
  { id: 'side', label: 'Lado' },
]

export default function ViewControls() {
  const { view, setView } = useViewerStore()
  return (
    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-[#0D0D0D]/90 p-1">
      {views.map((v) => (
        <button key={v.id} onClick={() => setView(v.id)} aria-pressed={view === v.id}
          className={`h-9 rounded-full px-3.5 text-xs font-bold transition-colors ${view === v.id ? 'bg-[#FF4D00] text-[#050505]' : 'text-[#A3A3A3] hover:text-white'}`}>
          {v.label}
        </button>
      ))}
      <button onClick={() => setView('front')} aria-label="Restablecer vista" className="grid size-9 place-items-center rounded-full text-[#A3A3A3] hover:text-white">
        <RotateCcw size={15} />
      </button>
    </div>
  )
}
