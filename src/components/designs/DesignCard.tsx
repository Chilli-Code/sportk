import { Link } from 'react-router-dom'
import { Pencil } from 'lucide-react'
import type { Design, DesignStatus } from '../../types/design'
import { timeAgo } from '../../lib/timeAgo'
import DesignThumb from './DesignThumb'

const status: Record<DesignStatus, { label: string; cls: string }> = {
  draft: { label: 'Borrador', cls: 'bg-white/10 text-[#D4D4D4]' },
  saved: { label: 'Guardado', cls: 'bg-white/10 text-white' },
  ordered: { label: 'En pedido', cls: 'bg-[#FF4D00] text-[#050505]' },
}

export default function DesignCard({ design }: { design: Design }) {
  const s = status[design.status]
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#141414] transition-colors hover:border-white/25">
      <div className="relative grid aspect-[4/3.4] place-items-center bg-gradient-to-b from-[#1f1f1f] to-[#0d0d0d] p-5">
        <DesignThumb design={design} className="h-full w-full drop-shadow-[0_18px_16px_rgba(0,0,0,.6)] transition-transform duration-500 group-hover:scale-105" />
        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold ${s.cls}`}>{s.label}</span>
      </div>
      <div className="p-4">
        <h3 className="truncate text-[15px] font-bold">{design.name}</h3>
        <p className="mt-0.5 text-xs text-[#A3A3A3]">Actualizado {timeAgo(design.updatedAt)}</p>
        <Link to="/app/designer" className="mt-4 flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 text-sm font-bold transition hover:border-white hover:bg-white hover:text-[#050505]">
          <Pencil size={16} />Editar
        </Link>
      </div>
    </article>
  )
}
