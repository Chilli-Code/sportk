import { TOOLS } from '../../lib/designerTools'
import { useViewerStore, type ToolId } from '../../stores/viewerStore'

type Props = { orientation: 'row' | 'col'; labels?: boolean; active: ToolId | null }

export default function ToolBar({ orientation, labels = true, active }: Props) {
  const setTool = useViewerStore((s) => s.setTool)
  const row = orientation === 'row'
  return (
    <nav aria-label="Herramientas"
      className={row ? 'flex gap-1 overflow-x-auto px-3 py-2 [scrollbar-width:none]' : `flex flex-col gap-1 overflow-y-auto border-r border-white/10 bg-[#0D0D0D] p-2 ${labels ? 'w-52' : 'w-16'}`}>
      {TOOLS.map(({ id, label, icon: Icon }) => {
        const on = active === id
        return (
          <button key={id} onClick={() => setTool(id)} aria-pressed={on} title={label}
            className={`flex shrink-0 items-center rounded-xl transition-colors ${
              row ? 'h-14 w-16 flex-col justify-center gap-1' : labels ? 'h-12 gap-3 px-3.5' : 'h-12 justify-center'} ${
              on ? 'bg-[#FF4D00] text-[#050505]' : 'text-[#A3A3A3] hover:bg-white/5 hover:text-white'}`}>
            <Icon size={20} />
            {(row || labels) && <span className={`font-semibold ${row ? 'text-[11px]' : 'text-sm'}`}>{label}</span>}
          </button>
        )
      })}
    </nav>
  )
}
