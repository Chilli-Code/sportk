import { lazy, Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useLayoutMode } from '../../hooks/useLayoutMode'
import { useDesignStore } from '../../stores/designStore'
import { useViewerStore } from '../../stores/viewerStore'
import ToolBar from '../../components/designer/ToolBar'
import ToolPanel, { toolTitle } from '../../components/designer/ToolPanel'
import ToolSheet, { SHEET_H } from '../../components/designer/ToolSheet'
import ViewControls from '../../components/designer/ViewControls'
import SaveDialog from '../../components/designer/SaveDialog'
import GenderPicker from '../../components/designer/GenderPicker'

// three.js se descarga aparte: el resto de la app no paga su peso.
const DesignerCanvas = lazy(() => import('../../components/designer/DesignerCanvas'))

export default function DesignerPage() {
  const mode = useLayoutMode()
  const navigate = useNavigate()
  const name = useDesignStore((s) => s.name)
  const gender = useDesignStore((s) => s.gender)
  const rawTool = useViewerStore((s) => s.tool)
  const portrait = mode === 'portrait'
  const tool = rawTool ?? (portrait ? null : 'color')
  const sheetOpen = portrait && tool !== null

  return (
    // En móvil ocupa toda la pantalla (tapa el menú inferior); en PC vive junto a la sidebar.
    <div className={`flex flex-col bg-[#050505] text-white ${mode === 'desktop' ? 'h-svh' : 'fixed inset-0 z-50'}`}>
      <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-white/10 px-3 pt-[env(safe-area-inset-top)] sm:px-5">
        <button onClick={() => navigate('/app')} aria-label="Volver" className="grid size-10 place-items-center rounded-full text-[#D4D4D4] hover:bg-white/5 hover:text-white"><ArrowLeft size={20} /></button>
        <div className="min-w-0 text-center">
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#737373]">DISEÑADOR</p>
          <p className="truncate text-sm font-bold">{name}</p>
        </div>
        {gender ? <SaveDialog /> : <span className="size-10" />}
      </header>

      {!gender ? (
        <GenderPicker />
      ) : (
        <>
          <div className="flex min-h-0 flex-1 pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
            {!portrait && <ToolBar orientation="col" labels={mode === 'desktop'} active={tool} />}

            <div className="relative min-w-0 flex-1 bg-[radial-gradient(60%_50%_at_50%_45%,#1a1a1a,#050505_75%)] transition-[padding] duration-300"
              style={{ paddingBottom: sheetOpen ? SHEET_H : 0 }}>
              <Suspense fallback={<div className="grid h-full place-items-center text-sm text-[#737373]">Cargando visor 3D…</div>}>
                <DesignerCanvas />
              </Suspense>
              <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/10 bg-[#0D0D0D]/80 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#A3A3A3]">VISTA PREVIA TEMPORAL</span>
              <ViewControls />
            </div>

            {!portrait && tool && (
              <aside className={`shrink-0 overflow-y-auto overscroll-contain border-l border-white/10 bg-[#0D0D0D] p-5 ${mode === 'desktop' ? 'w-[340px]' : 'w-[46%] max-w-[420px]'}`}>
                <h2 className="mb-4 text-lg font-extrabold tracking-tight">{toolTitle(tool)}</h2>
                <ToolPanel tool={tool} />
              </aside>
            )}
          </div>

          {portrait && !sheetOpen && (
            <div className="shrink-0 border-t border-white/10 bg-[#0D0D0D] pb-[max(0.25rem,env(safe-area-inset-bottom))]">
              <ToolBar orientation="row" active={null} />
            </div>
          )}
          {portrait && <ToolSheet tool={tool} />}
        </>
      )}
    </div>
  )
}
