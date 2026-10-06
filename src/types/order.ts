export const ORDER_STEPS = ['Diseño', 'Producción', 'Preparando', 'Enviado', 'Entregado'] as const

export type Order = {
  id: string
  code: string
  designId: string
  designName: string
  quantity: number
  /** Índice dentro de ORDER_STEPS */
  step: number
}
