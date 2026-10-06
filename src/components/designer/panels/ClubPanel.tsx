import { useMemo, useState } from 'react'
import { ChevronLeft, Check } from 'lucide-react'
import { CLUBS, KIT_TYPE_LABEL } from '../../../data/clubs'
import { PATTERNS } from '../../../lib/patterns'
import { useDesignStore } from '../../../stores/designStore'
import PatternSwatch from '../PatternSwatch'

/** Paso 1: elegir equipo · Paso 2: elegir año · Paso 3: elegir camiseta de ese año. */
export default function ClubPanel() {
  const { clubId, kitId, applyKit, clearKit } = useDesignStore()
  const [open, setOpen] = useState<string | null>(clubId)
  const [yearSel, setYear] = useState<number | null>(null)
  const club = CLUBS.find((c) => c.id === open)
  const years = useMemo(() => [...new Set(club?.kits.map((k) => k.year))].sort((a, b) => b - a), [club])
  const year = yearSel && years.includes(yearSel) ? yearSel : (club?.kits.find((k) => k.id === kitId)?.year ?? years[0])

  if (!club) {
    return (
      <div className="space-y-2">
        {CLUBS.map((c) => (
          <button key={c.id} onClick={() => { setOpen(c.id); setYear(null) }}
            className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-[#141414] p-3 text-left transition-colors hover:border-white/25">
            <PatternSwatch id={c.kits[0].pattern} base={c.kits[0].colors.primary} accent={c.kits[0].colors.accent} className="size-12 shrink-0" />
            <span className="min-w-0 flex-1"><span className="block truncate font-bold">{c.name}</span><span className="text-xs text-[#A3A3A3]">{c.country} · {c.kits.length} camisetas</span></span>
          </button>
        ))}
        <p className="pt-1 text-xs text-[#737373]">Equipos y camisetas de prueba (ficticios).</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <button onClick={() => { setOpen(null); clearKit() }} className="flex items-center gap-1 text-sm font-semibold text-[#A3A3A3] hover:text-white"><ChevronLeft size={16} />Cambiar equipo</button>
      <h3 className="text-base font-extrabold">{club.name}</h3>
      <div role="tablist" aria-label="Año" className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
        {years.map((y) => (
          <button key={y} role="tab" aria-selected={y === year} onClick={() => setYear(y)}
            className={`h-10 shrink-0 rounded-full border px-4 text-sm font-bold transition-colors ${y === year ? 'border-white bg-white text-[#050505]' : 'border-white/15 text-[#D4D4D4]'}`}>{y}</button>
        ))}
      </div>
      <div className="grid gap-2">
        {club.kits.filter((k) => k.year === year).map((k) => (
          <button key={k.id} onClick={() => applyKit(club.id, k)} aria-pressed={kitId === k.id}
            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${kitId === k.id ? 'border-[#FF4D00] bg-[#FF4D00]/10' : 'border-white/10 bg-[#141414] hover:border-white/25'}`}>
            <PatternSwatch id={k.pattern} base={k.colors.primary} accent={k.colors.accent} className="size-14 shrink-0" />
            <span className="min-w-0 flex-1">
              <span className="block font-bold">{k.year} · {KIT_TYPE_LABEL[k.type]}</span>
              <span className="text-xs text-[#A3A3A3]">{PATTERNS.find((p) => p.id === k.pattern)?.label}</span>
            </span>
            {kitId === k.id && <Check size={18} className="text-[#FF4D00]" />}
          </button>
        ))}
      </div>
      <p className="text-xs text-[#737373]">Después de elegir, puedes cambiar colores y estilo para hacerla tuya.</p>
    </div>
  )
}
