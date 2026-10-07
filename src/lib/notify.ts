import { sileo } from 'sileo'

type Opts = Parameters<typeof sileo.success>[0]
let last: string | undefined

// Cierra el aviso anterior antes de mostrar el nuevo
const once = (fn: (o: Opts) => string) => (o: Opts) => {
  if (last) sileo.dismiss(last)
  last = fn(o)
  return last
}

export const notify = {
  success: once((o) => sileo.success(o)),
  error: once((o) => sileo.error(o)),
  info: once((o) => sileo.info(o)),
  warning: once((o) => sileo.warning(o)),
}