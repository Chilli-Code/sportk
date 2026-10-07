import { useState } from 'react'
import { PALETTE } from '../../../lib/designerTools'
import { useTarget } from '../../../hooks/useTarget'
import { useDesignStore, type ColorPart } from '../../../stores/designStore'
import TargetSwitch from '../TargetSwitch'

export default function ColorPanel() {
  const { colors, setColor, pattern, shortsPattern } = useDesignStore()
  const shorts = useTarget() === 'shorts'
  const [sel, setSel] = useState<ColorPart>('primary')

  // Cada prenda tiene sus propias partes: la camiseta (cuerpo, patrón, mangas, cuello) y el short (base, patrón, cinturilla).
  const parts: { id: ColorPart; label: string }[] = shorts
    ? [
        { id: 'shorts', label: 'Short' },
        ...(shortsPattern !== 'solid' ? [{ id: 'shortsAccent' as ColorPart, label: 'Patrón' }] : []),
        { id: 'collar', label: 'Cinturilla' },
        { id: 'secondary', label: 'Número' },
      ]
    : [
        { id: 'primary', label: pattern === 'solid' ? 'Cuerpo' : 'Base' },
        ...(pattern !== 'solid' ? [{ id: 'accent' as ColorPart, label: 'Patrón' }] : []),
        { id: 'sleeves', label: 'Mangas' },
        { id: 'collar', label: 'Cuello' },
        { id: 'secondary', label: 'Detalles' },
      ]
  const part = parts.some((p) => p.id === sel) ? sel : parts[0].id
  const is = (c: string) => colors[part].toLowerCase() === c.toLowerCase()

  return (
    <div className="space-y-4">
      <TargetSwitch />
      <div className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
        {parts.map((p) => (
          <button key={p.id} onClick={() => setSel(p.id)} aria-pressed={part === p.id}
            className={`flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${part === p.id ? 'border-white bg-white text-[#050505]' : 'border-white/15 text-[#D4D4D4]'}`}>
            <span className="size-3.5 rounded-full border border-black/20" style={{ background: colors[p.id] }} />{p.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-6 gap-2.5">
        {PALETTE.map((c) => (
          <button key={c} onClick={() => setColor(part, c)} aria-label={`Color ${c}`} aria-pressed={is(c)}
            className={`aspect-square rounded-full border-2 transition-transform ${is(c) ? 'scale-110 border-white' : 'border-white/15'}`} style={{ background: c }} />
        ))}
      </div>
      <label className="flex items-center justify-between rounded-xl border border-white/10 bg-[#141414] p-3 text-sm font-semibold">
        Color personalizado
        <input type="color" value={colors[part]} onChange={(e) => setColor(part, e.target.value)} className="h-9 w-14 cursor-pointer rounded-lg border-0 bg-transparent" />
      </label>
    </div>
  )
}
