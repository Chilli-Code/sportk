import { Redo2, Undo2 } from 'lucide-react'
import { useHistory } from '../../hooks/useHistory'

const mac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)
const mod = mac ? '⌘' : 'Ctrl+'

const btn = 'grid size-10 place-items-center rounded-full transition-colors enabled:text-[#D4D4D4] enabled:hover:bg-white/5 enabled:hover:text-white disabled:text-[#3a3a3a]'

export default function UndoRedo() {
  const { canUndo, canRedo, undo, redo } = useHistory()
  return (
    <div className="flex items-center">
      <button onClick={undo} disabled={!canUndo} className={btn} aria-label="Deshacer" title={`Deshacer (${mod}Z)`}><Undo2 size={18} /></button>
      <button onClick={redo} disabled={!canRedo} className={btn} aria-label="Rehacer" title={`Rehacer (${mod}${mac ? '⇧Z' : 'Y'})`}><Redo2 size={18} /></button>
    </div>
  )
}
