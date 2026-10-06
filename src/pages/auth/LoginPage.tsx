import { useId, useState, type FormEvent, type MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, Eye, EyeOff, Loader2 } from 'lucide-react'
import { LOGO_MARK, LOGO_VIEWBOX_MARK } from '../../lib/logoPaths'
import { authService } from '../../services/authService'
import { useAuthStore } from '../../stores/authStore'
import '../../styles/login.css'

const ease = [0.2, 0.7, 0.2, 1] as const
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const label = 'text-xs font-bold uppercase tracking-[0.1em] text-[#D4D4D4]'
const input =
  'h-[52px] w-full rounded-xl border border-[#2a2a2a] bg-[#141414] px-4 text-[15px] text-white outline-none transition placeholder:text-[#555] hover:border-[#3a3a3a] focus:border-[#FF4D00] focus:ring-4 focus:ring-[#FF4D00]/15 aria-invalid:border-red-400'
const btn =
  'inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full text-sm tracking-[0.1em] transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const uid = useId().replace(/:/g, '')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({})

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const next: typeof errors = {}
    if (!EMAIL_RE.test(email)) next.email = 'Escribe un correo válido.'
    if (password.length < 6) next.password = 'Mínimo 6 caracteres.'
    setErrors(next)
    if (next.email || next.password) return
    setLoading(true)
    try {
      login(await authService.login(email, password))
      navigate('/app')
    } catch {
      setErrors({ form: 'Correo o contraseña incorrectos.' })
      setLoading(false)
    }
  }

  return (
    <main className="login grid min-h-svh grid-cols-1 bg-[#050505] font-[Manrope,Inter,system-ui,sans-serif] text-white lg:grid-cols-[1.05fr_1fr]">
      {/* ---------- Panel de marca ---------- */}
      <aside
        onMouseMove={onMove}
        className="login-grain relative isolate flex flex-col justify-between gap-9 overflow-hidden border-b border-[#1F1F1F] bg-[#0D0D0D] px-5 pb-7 pt-6 lg:gap-0 lg:border-b-0 lg:border-r lg:p-14"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(520px_circle_at_var(--mx,30%)_var(--my,60%),rgba(255,255,255,0.07),transparent_65%)]" />
        <svg viewBox={LOGO_VIEWBOX_MARK} fill="currentColor" aria-hidden
          className="pointer-events-none absolute -bottom-[8%] -right-[14%] -z-10 w-[min(78%,640px)] text-white/5">
          <path d={LOGO_MARK} />
        </svg>

        <Link to="/" aria-label="Volver al inicio"
          className="inline-flex w-max items-center p-5! gap-3.5 text-[13px] font-extrabold tracking-[0.28em] text-white">
          <svg viewBox={LOGO_VIEWBOX_MARK} height="34" fill="currentColor" aria-hidden><path d={LOGO_MARK} /></svg>
          <span>LYAN EMEL</span>
        </Link>

       <div className="px-10 text-center mb-10! md:mb-0!">
          <h2 className="text-[clamp(40px,13vw,72px)] text-center font-extrabold uppercase leading-[0.9] tracking-[-0.045em] lg:text-[clamp(46px,7.2vw,118px)]">
            {['ENTRA A TU', 'ESTUDIO'].map((t, i) => (
              <span key={t} className="block overflow-hidden pb-[0.06em]">
                <motion.span className="block" initial={{ y: '110%' }} animate={{ y: 0 }}
                  transition={{ duration: 1, ease, delay: 0.15 + i * 0.12 }}>
                  {t}{i === 1 && <b className="text-[#FF4D00]">.</b>}
                </motion.span>
              </span>
            ))}
          </h2>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 hidden text-center text-[clamp(15px,1.3vw,18px)] leading-relaxed text-[#A3A3A3] lg:block">
            Retoma tus diseños y sigue creando <br /> la ropa deportiva de tu equipo.
          </motion.p>
        </div>

        <span className="hidden text-xs tracking-[0.1em] text-[#555] lg:block">© {new Date().getFullYear()} LYAN EMEL</span>
      </aside>

      {/* ---------- Formulario ---------- */}
      <section className="relative grid place-items-start justify-items-center px-5 pb-12 pt-7 lg:place-items-center lg:px-16 lg:py-12">
        <Link to="/" className="absolute right-14 top-7 hidden items-center gap-2 text-[13px] text-[#A3A3A3] transition-colors hover:text-white lg:inline-flex">
          <ArrowLeft size={16} />Volver al inicio
        </Link>

        <motion.form onSubmit={submit} noValidate
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.1 }}
          className="flex w-full max-w-[400px] flex-col gap-[18px] p-4!">
          <h1 className="text-[clamp(30px,3vw,40px)] font-extrabold leading-[1.05] tracking-[-0.035em]">Inicia sesión</h1>
          <p className="-mt-1.5 mb-1.5 text-[15px] leading-relaxed text-[#A3A3A3]">
            Bienvenido de vuelta. Entra para continuar con tus diseños.
          </p>

          {errors.form && (
            <div role="alert" className="rounded-xl border border-red-400/35 bg-red-400/10 px-3.5 py-3 text-sm text-red-300">{errors.form}</div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor={`${uid}e`} className={label}>Correo electrónico</label>
            <input id={`${uid}e`} type="email" autoComplete="email" placeholder="tu@correo.com" className={input}
              value={email} onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.email} aria-describedby={errors.email ? `${uid}ee` : undefined} />
            {errors.email && <small id={`${uid}ee`} className="text-[12.5px] text-red-300">{errors.email}</small>}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <label htmlFor={`${uid}p`} className={label}>Contraseña</label>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-[#A3A3A3] transition-colors hover:text-[#FF4D00]">¿La olvidaste?</a>
            </div>
            <div className="relative">
              <input id={`${uid}p`} type={show ? 'text' : 'password'} autoComplete="current-password" placeholder="••••••••"
                className={`${input} pr-[50px]`} value={password} onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors.password} aria-describedby={errors.password ? `${uid}pe` : undefined} />
              <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className="absolute right-1.5 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-lg text-[#A3A3A3] hover:text-white">
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <small id={`${uid}pe`} className="text-[12.5px] text-red-300">{errors.password}</small>}
          </div>

          <label className="flex cursor-pointer select-none items-center gap-2.5 text-sm text-[#D4D4D4]">
            <input type="checkbox" className="peer sr-only" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            <span className={`grid size-5 shrink-0 place-items-center rounded-md border transition peer-focus-visible:ring-4 peer-focus-visible:ring-[#FF4D00]/25 ${remember ? 'border-[#FF4D00] bg-[#FF4D00]' : 'border-[#3a3a3a] bg-[#141414]'}`}>
              {remember && <Check size={14} strokeWidth={3} className="text-[#050505]" />}
            </span>
            Mantener la sesión iniciada
          </label>

          <button type="submit" disabled={loading}
            className={`${btn} border border-[#FF4D00] bg-[#FF4D00] font-extrabold text-[#050505] enabled:hover:border-white enabled:hover:bg-white disabled:cursor-wait disabled:opacity-70`}>
            {loading ? <><Loader2 size={18} className="animate-spin" />ENTRANDO…</> : 'ENTRAR'}
          </button>

          <div className="flex items-center gap-3.5 text-xs text-[#555] before:h-px before:flex-1 before:bg-[#1F1F1F] after:h-px after:flex-1 after:bg-[#1F1F1F]">o</div>

          <button type="button" className={`${btn} border border-[#333] font-bold tracking-[0.04em] text-white hover:border-white`}>
            Continuar con Google
          </button>

          <p className="text-center text-sm text-[#A3A3A3]">
            ¿Aún no tienes cuenta?{' '}
            <a href="#" onClick={(e) => e.preventDefault()} className="font-bold text-white underline decoration-[#FF4D00] underline-offset-[5px]">Crear cuenta</a>
          </p>
          <p className="text-center text-xs leading-normal text-[#555]">
           
          </p>
        </motion.form>
      </section>
    </main>
  )
}
