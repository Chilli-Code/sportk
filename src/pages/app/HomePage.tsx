import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Plus } from 'lucide-react'
import PageContainer from '../../components/layout/PageContainer'
import DesignCard from '../../components/designs/DesignCard'
import DesignThumb from '../../components/designs/DesignThumb'
import OrderStatusCard from '../../components/orders/OrderStatusCard'
import { mockDesigns } from '../../data/mockDesigns'
import { mockOrders } from '../../data/mockOrders'
import { mockUser } from '../../data/mockUser'
import { useAuthStore } from '../../stores/authStore'
import { useDesignStore } from '../../stores/designStore'
const rise = (i = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] as const },
})

function SectionTitle({ title, to, link }: { title: string; to?: string; link?: string }) {
  return (
    <div className="mb-4 flex items-end justify-between">
      <h2 className="text-lg font-extrabold tracking-tight">{title}</h2>
      {to && <Link to={to} className="flex items-center gap-1 text-sm font-semibold text-[#A3A3A3] transition-colors hover:text-[#FF4D00]">{link}<ArrowRight size={15} /></Link>}
    </div>
  )
}

export default function HomePage() {
  const user = useAuthStore((s) => s.user) ?? mockUser
  const name = user.name.charAt(0).toUpperCase() + user.name.slice(1)
  const draft = mockDesigns.find((d) => d.status === 'draft')
  const recent = [...mockDesigns].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)).slice(0, 4)

  return (
    <PageContainer>
      <motion.header {...rise(0)}>
        <h1 className="text-[clamp(30px,5vw,44px)] font-extrabold leading-tight tracking-[-0.03em]">Hola, {name}</h1>
        <p className="mt-1 text-base text-[#A3A3A3]">¿Qué quieres diseñar hoy?</p>
      </motion.header>

      {/* Acción principal */}
      <motion.div {...rise(1)}>
        <Link to="/app/designer" onClick={() => useDesignStore.getState().newDesign()}
          className="group mt-6 flex min-h-[68px] items-center justify-between gap-4 rounded-2xl bg-[#FF4D00] px-5 py-4 text-[#050505] transition hover:bg-white">
          <span>
            <span className="block text-lg font-extrabold tracking-wide">CREAR NUEVO DISEÑO</span>
            <span className="block text-sm font-medium opacity-75">Elige una prenda y personalízala</span>
          </span>
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#050505] text-white transition-transform group-hover:rotate-90"><Plus size={22} /></span>
        </Link>
      </motion.div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-12">
        <div className="min-w-0 space-y-10">
          {draft && (
            <motion.section {...rise(2)} aria-labelledby="cont">
              <h2 id="cont" className="mb-4 text-lg font-extrabold tracking-tight">Continuar diseñando</h2>
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#141414] p-4">
                <div className="grid size-24 shrink-0 place-items-center rounded-xl bg-gradient-to-b from-[#1f1f1f] to-[#0d0d0d] p-2.5 sm:size-28">
                  <DesignThumb design={draft} className="h-full w-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-bold">{draft.name}</h3>
                  <p className="mt-0.5 text-sm text-[#A3A3A3]">{draft.missing}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuenow={draft.progress} aria-valuemin={0} aria-valuemax={100} aria-label="Avance del diseño">
                      <motion.div className="h-full rounded-full bg-[#FF4D00]" initial={{ width: 0 }} animate={{ width: `${draft.progress}%` }} transition={{ duration: 1, delay: 0.4 }} />
                    </div>
                    <span className="text-xs font-bold text-[#D4D4D4]">{draft.progress}%</span>
                  </div>
                  <Link to="/app/designer" className="mt-3 inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-[#050505] transition hover:bg-[#FF4D00]">
                    Continuar<ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </motion.section>
          )}

          <motion.section {...rise(3)} aria-labelledby="rec">
            <div id="rec"><SectionTitle title="Mis diseños recientes" to="/app/designs" link="Ver todos" /></div>
            <div className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-3">
              {recent.map((d) => <DesignCard key={d.id} design={d} />)}
            </div>
          </motion.section>
        </div>

        <motion.aside {...rise(4)} aria-labelledby="ped" className="lg:sticky lg:top-10 lg:self-start">
          <div id="ped"><SectionTitle title="Estado de tus pedidos" to="/app/orders" link="Ver todos" /></div>
          <div className="space-y-3">
            {mockOrders.map((o) => <OrderStatusCard key={o.id} order={o} />)}
          </div>
        </motion.aside>
      </div>
    </PageContainer>
  )
}
