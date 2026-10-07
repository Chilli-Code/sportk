import { Drawer } from 'vaul'
import ToolBar from './ToolBar'
import ToolPanel, { toolTitle } from './ToolPanel'
import { useViewerStore, type ToolId } from '../../stores/viewerStore'

export const SHEET_H = '65dvh'

/** Hoja inferior (móvil vertical). No bloquea la pantalla: la prenda sigue visible y rotable. */
export default function ToolSheet({ tool }: { tool: ToolId | null }) {
  const setTool = useViewerStore((s) => s.setTool)
  return (
    <Drawer.Root open={tool !== null} onOpenChange={(o) => !o && setTool(null)} modal={false} shouldScaleBackground={false}>
      <Drawer.Portal>
        <Drawer.Content style={{ height: SHEET_H }} aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 z-[60] flex flex-col rounded-t-3xl border-t border-white/10 bg-[#0D0D0D] outline-none">
          <Drawer.Handle className="mt-2 !h-1 !w-10 !bg-white/20" />
          <Drawer.Title className="sr-only">{tool ? toolTitle(tool) : 'Herramientas'}</Drawer.Title>
          {tool && <ToolBar orientation="row" active={tool} />}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-3 pt-2">{tool && <ToolPanel tool={tool} />}</div>
          <div className="px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-1">
            <button onClick={() => setTool(null)} className="h-12 w-full rounded-full bg-[#FF4D00] text-sm font-extrabold tracking-[0.1em] text-[#050505] transition hover:bg-white">LISTO</button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
