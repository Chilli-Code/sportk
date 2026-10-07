import { Check, Loader2, TriangleAlert } from 'lucide-react'
import { useSaveStatus } from '../../stores/saveStatus'

/** Estado del guardado automático, bajo el nombre del diseño. */
export default function SaveIndicator() {
  const status = useSaveStatus((s) => s.status)
  const base = 'flex items-center justify-center gap-1 text-[10px] font-bold tracking-[0.14em]'
  if (status === 'saving') return <p className={`${base} text-[#A3A3A3]`} role="status"><Loader2 size={11} className="animate-spin" />GUARDANDO…</p>
  if (status === 'saved') return <p className={`${base} text-[#A3A3A3]`} role="status"><Check size={11} className="text-[#FF4D00]" />GUARDADO</p>
  if (status === 'error') return <p className={`${base} text-red-300`} role="alert"><TriangleAlert size={11} />NO SE PUDO GUARDAR</p>
  return <p className={`${base} text-[#737373]`}>DISEÑADOR</p>
}
