import { useMemo } from 'react'
import { patternSwatch } from '../../lib/patterns'
import type { PatternId } from '../../types/kit'

export default function PatternSwatch({ id, base, accent, className = '' }: { id: PatternId; base: string; accent: string; className?: string }) {
  const url = useMemo(() => patternSwatch(id, base, accent), [id, base, accent])
  return <div aria-hidden className={`rounded-lg border border-white/10 bg-cover ${className}`} style={{ backgroundImage: `url(${url})` }} />
}
