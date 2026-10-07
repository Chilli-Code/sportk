import { useDesignStore } from '../stores/designStore'
import { useViewerStore } from '../stores/viewerStore'

/** Qué prenda editan los paneles de Estilo y Color: la camiseta o el short. */
export function useTarget() {
  const garment = useDesignStore((s) => s.garment)
  const chosen = useViewerStore((s) => s.target)
  return garment === 'shorts' ? 'shorts' : garment === 'shirt' ? 'shirt' : chosen
}
