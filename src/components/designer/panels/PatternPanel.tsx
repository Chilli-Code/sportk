import { Check } from 'lucide-react'
import { PATTERNS } from '../../../lib/patterns'
import { useDesignStore } from '../../../stores/designStore'
import PatternSwatch from '../PatternSwatch'

export default function PatternPanel() {
  const { pattern, setPattern, colors, patternSleeves, setPatternSleeves } = useDesignStore()
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2.5">
        {PATTERNS.map((p) => (
          <button key={p.id} onClick={() => setPattern(p.id)} aria-pressed={pattern === p.id} className="text-left">
            <PatternSwatch id={p.id} base={colors.primary} accent={colors.accent} className={`aspect-square w-full border-2 transition-colors ${pattern === p.id ? '!border-[#FF4D00]' : ''}`} />
            <span className="mt-1.5 block text-[11px] font-semibold leading-tight text-[#D4D4D4]">{p.label}</span>
          </button>
        ))}
      </div>
      {pattern !== 'solid' && (
        <>
          <button onClick={() => setPatternSleeves(!patternSleeves)} aria-pressed={patternSleeves}
            className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#141414] p-3.5 text-sm font-semibold">
            Mangas con el mismo patrón
            <span className={`grid size-6 place-items-center rounded-md border ${patternSleeves ? 'border-[#FF4D00] bg-[#FF4D00]' : 'border-[#3a3a3a]'}`}>
              {patternSleeves && <Check size={14} strokeWidth={3} className="text-[#050505]" />}
            </span>
          </button>
          <p className="text-xs text-[#737373]">Los colores del patrón se cambian en “Color” (Base y Patrón).</p>
        </>
      )}
    </div>
  )
}
