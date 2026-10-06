const paths = {
  shirt: 'M34 8 L50 3 Q60 14 70 3 L86 8 L112 30 L98 46 L88 38 V112 H32 V38 L22 46 L8 30 Z',
  shorts: 'M22 20 H98 L108 104 H66 L60 62 L54 104 H12 Z',
  set: 'M34 4 L50 0 Q60 9 70 0 L86 4 L108 22 L96 36 L88 30 V70 H32 V30 L24 36 L12 22 Z M32 76 H88 L96 118 H64 L60 94 L56 118 H24 Z',
}

type Props = { kind?: keyof typeof paths; src?: string; alt?: string; className?: string }

/** Placeholder de prenda. Pasa `src` con una foto real para reemplazarlo. */
export default function Garment({ kind = 'shirt', src, alt = '', className = '' }: Props) {
  return (
    <div className={`gmbox ${className}`} role="img" aria-label={alt}>
      {src ? <img src={src} alt={alt} loading="lazy" /> : (
        <svg viewBox="0 0 120 120" aria-hidden>
          <defs><linearGradient id={`g-${kind}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2a2a2a" /><stop offset="1" stopColor="#0a0a0a" /></linearGradient></defs>
          <path d={paths[kind]} fill={`url(#g-${kind})`} stroke="#3a3a3a" strokeWidth=".6" />
          <path d="M60 3 V30" stroke="#FF4D00" strokeWidth="1.2" opacity={kind === 'shorts' ? 0 : 1} />
        </svg>
      )}
    </div>
  )
}
