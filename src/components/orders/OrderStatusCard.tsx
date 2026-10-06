import { Link } from 'react-router-dom'
import { ORDER_STEPS, type Order } from '../../types/order'

export default function OrderStatusCard({ order }: { order: Order }) {
  const done = order.step === ORDER_STEPS.length - 1
  return (
    <Link to="/app/orders" className="block rounded-2xl border border-white/10 bg-[#141414] p-4 transition-colors hover:border-white/25">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold tracking-[0.14em] text-[#737373]">#{order.code}</p>
          <h3 className="mt-1 truncate text-[15px] font-bold">{order.designName}</h3>
          <p className="text-xs text-[#A3A3A3]">{order.quantity} unidades</p>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${done ? 'bg-white/10 text-white' : 'bg-[#FF4D00]/15 text-[#FF4D00]'}`}>
          {ORDER_STEPS[order.step]}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-1.5" role="img" aria-label={`Paso ${order.step + 1} de ${ORDER_STEPS.length}: ${ORDER_STEPS[order.step]}`}>
        {ORDER_STEPS.map((s, i) => <span key={s} className={`h-1.5 rounded-full ${i <= order.step ? 'bg-[#FF4D00]' : 'bg-white/10'}`} />)}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-[#737373]">
        <span>{ORDER_STEPS[0]}</span><span>{ORDER_STEPS[ORDER_STEPS.length - 1]}</span>
      </div>
    </Link>
  )
}
