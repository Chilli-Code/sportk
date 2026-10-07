import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Check, X } from 'lucide-react'
import { notify } from '../../lib/notify'
import { useDesignStore } from '../../stores/designStore'

/** Guardado simulado (solo estado local). Después se conecta al backend. */
export default function SaveDialog() {
  const { name, setName } = useDesignStore()
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)

  const save = () => { notify.success({ title: 'Diseño guardado', description: name.trim() }); setDone(true); setTimeout(() => { setOpen(false); setDone(false) }, 1100) }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="h-10 rounded-full bg-[#FF4D00] px-5 text-sm font-extrabold tracking-wide text-[#050505] transition hover:bg-white">Guardar</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[80] w-[calc(100%-2.5rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-[#141414] p-6 text-white outline-none">
          <Dialog.Close aria-label="Cerrar" className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-[#A3A3A3] hover:text-white"><X size={18} /></Dialog.Close>
          <Dialog.Title className="text-xl font-extrabold tracking-tight">Guardar diseño</Dialog.Title>
          <Dialog.Description className="mt-1 text-sm text-[#A3A3A3]">Ponle un nombre para encontrarlo después.</Dialog.Description>
          <input value={name} onChange={(e) => setName(e.target.value)} maxLength={40} aria-label="Nombre del diseño"
            className="mt-5 h-12 w-full rounded-xl border border-[#2a2a2a] bg-[#0D0D0D] px-4 text-[15px] outline-none focus:border-[#FF4D00] focus:ring-4 focus:ring-[#FF4D00]/15" />
          <button onClick={save} disabled={!name.trim() || done}
            className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#FF4D00] text-sm font-extrabold tracking-[0.1em] text-[#050505] transition hover:bg-white disabled:opacity-80">
            {done ? <><Check size={18} />GUARDADO</> : 'GUARDAR DISEÑO'}
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
