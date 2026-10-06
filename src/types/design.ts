export type Garment = 'shirt' | 'shorts' | 'set'
export type DesignStatus = 'draft' | 'saved' | 'ordered'

export type Design = {
  id: string
  name: string
  garment: Garment
  model: string
  colors: { primary: string; secondary: string; sleeves: string; collar: string }
  player: { name: string; number: string }
  status: DesignStatus
  /** 0-100: cuánto del diseño está completo */
  progress: number
  /** Qué falta, para mostrarlo en "Continuar diseñando" */
  missing?: string
  createdAt: string
  updatedAt: string
}
