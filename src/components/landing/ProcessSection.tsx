
import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import Reveal from '../ui/Reveal'
import "../../styles/process.css"
const steps = [
  {
    number: '01',
    title: 'ELIGE',
    description:
      'Selecciona la camiseta, pantaloneta o uniforme deportivo que quieres personalizar.',
    image: '/images/process/elige.webp',
  },
  {
    number: '02',
    title: 'PERSONALIZA',
    description:
      'Define colores, nombres, dorsales, escudos, patrocinadores y cada detalle de tu uniforme.',
    image: '/images/process/personaliza.webp',
  },
  {
    number: '03',
    title: 'CREA',
    description:
      'Visualiza tu diseño y conviértelo en una prenda deportiva que represente la identidad de tu equipo.',
    image: '/images/process/crea.webp',
  },
]

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)

  /*
   * Equivalente al:
   *
   * trigger: ".spotlight"
   * start: "top top"
   * end: "bottom bottom"
   * scrub: true
   *
   * del código GSAP original.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  /*
   * Un pequeño smoothing para que el movimiento
   * sea más natural, parecido al scrub de GSAP.
   */
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.2,
  })

  return (
    <section
      ref={sectionRef}
      className="process-section"
    >
      <div className="process-wrap">

        {/* =====================================
            TÍTULO
            ===================================== */}

        <Reveal>
          <div className="process-heading">
            <span className="process-label">
              EL PROCESO
            </span>

            <h2>
              CÓMO FUNCIONA.
            </h2>
          </div>
        </Reveal>


        {/* =====================================
            CONTENIDO
            ===================================== */}

        <div className="process-content">

          {/* =====================================
              SVG ORIGINAL
              ===================================== */}

          <div
            className="process-svg"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 1378 2760"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMin meet"
            >
              <motion.path
                id="stroke-path"
                d="
                  M639.668 100
                  C639.668 100 105.669 100 199.669 601.503
                  C293.669 1103.01 1277.17 691.502 1277.17 1399.5
                  C1277.17 2107.5 -135.332 1968 140.168 1438.5
                  C435.669 909.002 1442.66 2093.5 713.168 2659.5
                "
                stroke="#FF5F04"
                strokeWidth="200"
                strokeLinecap="round"
                pathLength={1}
                style={{
                  pathLength,
                }}
              />
            </svg>
          </div>


          {/* =====================================
              PASO 01
              ===================================== */}

          <Reveal delay={0.1}>
            <article className="process-row process-row-01">

              <div className="process-column">

                <div className="process-card">

                  <span className="process-number">
                    {steps[0].number}
                  </span>

                  <h3>
                    {steps[0].title}
                  </h3>

                  <p>
                    {steps[0].description}
                  </p>

                </div>

              </div>


              <div className="process-column">

                <div className="process-image">

                  <img
                    src={steps[0].image}
                    alt={steps[0].title}
                    draggable={false}
                  />

                </div>

              </div>

            </article>
          </Reveal>


          {/* =====================================
              PASO 02
              ===================================== */}

          <Reveal delay={0.15}>
            <article className="process-row process-row-02">

              <div className="process-column">

                <div className="process-image">

                  <img
                    src={steps[1].image}
                    alt={steps[1].title}
                    draggable={false}
                  />

                </div>

              </div>


              <div className="process-column">

                <div className="process-card">

                  <span className="process-number">
                    {steps[1].number}
                  </span>

                  <h3>
                    {steps[1].title}
                  </h3>

                  <p>
                    {steps[1].description}
                  </p>

                </div>

              </div>

            </article>
          </Reveal>


          {/* =====================================
              PASO 03
              ===================================== */}

          <Reveal delay={0.2}>
            <article className="process-row process-row-03">

              <div className="process-column">

                <div className="process-card">

                  <span className="process-number">
                    {steps[2].number}
                  </span>

                  <h3>
                    {steps[2].title}
                  </h3>

                  <p>
                    {steps[2].description}
                  </p>

                </div>

              </div>


              <div className="process-column">

                <div className="process-image">

                  <img
                    src={steps[2].image}
                    alt={steps[2].title}
                    draggable={false}
                  />

                </div>

              </div>

            </article>
          </Reveal>

        </div>
      </div>
    </section>
  )
}

