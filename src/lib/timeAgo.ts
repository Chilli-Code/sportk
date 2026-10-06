export function timeAgo(iso: string) {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 864e5)
  if (d <= 0) return 'hoy'
  if (d === 1) return 'ayer'
  if (d < 7) return `hace ${d} días`
  return `hace ${Math.floor(d / 7)} sem.`
}
