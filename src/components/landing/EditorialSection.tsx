import Garment from './Garment'
import AnimatedTitle from '../ui/AnimatedTitle'

export default function EditorialSection() {
  return (
    <section className="edi">
      <Garment kind="set" alt="Uniforme completo (reemplazar por foto de campaña)" />
      <div className="wrap">
        <AnimatedTitle lines={['TU EQUIPO.', 'TU IDENTIDAD.']} align="left" />
      </div>
    </section>
  )
}