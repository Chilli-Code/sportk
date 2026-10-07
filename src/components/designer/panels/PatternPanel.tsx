import { Check } from 'lucide-react'
import { PATTERNS } from '../../../lib/patterns'
import { useTarget } from '../../../hooks/useTarget'
import { useDesignStore } from '../../../stores/designStore'
import PatternSwatch from '../PatternSwatch'
import TargetSwitch from '../TargetSwitch'

export default function PatternPanel() {
  const d = useDesignStore()
  const shorts = useTarget() === 'shorts'
  const current = shorts ? d.shortsPattern : d.pattern
  const choose = shorts ? d.setShortsPattern : d.setPattern
  const base = shorts ? d.colors.shorts : d.colors.primary
  const accent = shorts ? d.colors.shortsAccent : d.colors.accent
  return (
    <div className="space-y-4">
      <TargetSwitch />
      <div className="grid grid-cols-3 gap-2.5">
        {PATTERNS.map((p) => (
          <button key={p.id} onClick={() => choose(p.id)} aria-pressed={current === p.id} className="text-left">
            <PatternSwatch id={p.id} base={base} accent={accent} className={`aspect-square w-full border-2 transition-colors ${current === p.id ? '!border-[#FF4D00]' : ''}`} />
            <span className="mt-1.5 block text-[11px] font-semibold leading-tight text-[#D4D4D4]">{p.label}</span>
          </button>
        ))}
      </div>
      {current !== 'solid' && !shorts && (
        <button onClick={() => d.setPatternSleeves(!d.patternSleeves)} aria-pressed={d.patternSleeves}
          className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#141414] p-3.5 text-sm font-semibold">
          Mangas con el mismo patrón
          <span className={`grid size-6 place-items-center rounded-md border ${d.patternSleeves ? 'border-[#FF4D00] bg-[#FF4D00]' : 'border-[#3a3a3a]'}`}>
            {d.patternSleeves && <Check size={14} strokeWidth={3} className="text-[#050505]" />}
          </span>
        </button>
      )}
      {current !== 'solid' && <p className="text-xs text-[#737373]">Los colores del patrón se cambian en “Color” (Base y Patrón).</p>}
    </div>
  )
}
