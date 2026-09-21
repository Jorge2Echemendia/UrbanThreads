import { motion } from 'framer-motion'
import { ArrowRight, HelpCircle, Package, RotateCcw, Wallet } from 'lucide-react'
import { SEO } from '../components/SEO'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

const STEPS = [
  {
    n: '01',
    title: 'Solicita la devolución',
    text: 'Escríbenos a returns@urbanthreads.co con tu número de pedido en los 30 días siguientes.',
    icon: HelpCircle,
  },
  {
    n: '02',
    title: 'Recibe la etiqueta',
    text: 'Te enviamos una etiqueta prepagada en menos de 24h. Imprímela y pégala en el paquete.',
    icon: Package,
  },
  {
    n: '03',
    title: 'Envíanos el paquete',
    text: 'Déjalo en cualquier punto de recogida. No hace falta que lo envuelvas de nuevo, solo la bolsa original.',
    icon: RotateCcw,
  },
  {
    n: '04',
    title: 'Recibe tu reembolso',
    text: 'Procesamos el reembolso en 3-5 días hábiles tras recibir el paquete.',
    icon: Wallet,
  },
]

const FAQ = [
  {
    q: '¿Cuánto tiempo tengo para devolver?',
    a: '30 días desde la fecha de entrega. Sin preguntas, sin dramas.',
  },
  {
    q: '¿Qué puedo devolver?',
    a: 'Todo excepto drops de edición limitada numerados, que son final sale. Lo verás marcado en la ficha del producto.',
  },
  {
    q: '¿La devolución es gratis?',
    a: 'Sí, la primera devolución de cada pedido es siempre gratis en península.',
  },
  {
    q: '¿Puedo cambiar por otra talla?',
    a: 'Sí, marca "cambio" en el formulario. Si hay stock, te enviamos la nueva talla al recibir la primera.',
  },
  {
    q: '¿Y si el producto llega defectuoso?',
    a: 'Escríbenos con una foto y te enviamos uno nuevo sin coste, además de un 15% en tu siguiente compra.',
  },
]

export function Returns() {
  return (
    <>
      <SEO
        title="Devoluciones"
        description="Política de devoluciones y cambios en UrbanThreads. 30 días, gratis en península."
        path="/returns"
      />

      {/* Hero */}
      <section className="pt-32 pb-20 mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-widest text-accent mb-3">Sin dramas</p>
          <h1 className="text-5xl md:text-7xl font-display font-bold">
            Devoluciones <span className="text-accent">fáciles</span>
          </h1>
          <p className="mt-8 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            30 días para cambiar de opinión. Primera devolución gratis. Sin
            letra pequeña, sin preguntas incómodas.
          </p>
        </motion.div>
      </section>

      {/* Steps — animaciones hover con iconos */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-2xl border border-border bg-surface/50 hover:border-accent/60 transition-colors overflow-hidden cursor-default"
              >
                {/* Fondo gradiente en hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icono superior derecho */}
                <motion.div
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface-2 border border-border flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:border-accent/60 group-hover:bg-accent group-hover:text-black transition-all duration-500"
                  whileHover={{ rotate: 12 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.div>

                {/* Número */}
                <span className="relative font-mono text-accent font-bold text-sm">
                  {step.n}
                </span>

                <h3 className="relative font-display font-bold text-xl mt-4 mb-3 group-hover:text-accent transition-colors">
                  {step.title}
                </h3>
                <p className="relative text-muted text-sm leading-relaxed">{step.text}</p>

                {/* Línea inferior que crece */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent group-hover:w-full transition-all duration-500" />
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* FAQ — hover animado con desplazamiento de padding */}
      <section className="border-t border-border py-24 mx-auto max-w-4xl px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-bold mb-12 text-center"
        >
          Preguntas <span className="text-accent">frecuentes</span>
        </motion.h2>

        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <motion.details
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border border-border bg-surface/50 overflow-hidden transition-colors open:border-accent hover:border-accent/60 hover:bg-surface"
            >
              <summary className="p-6 cursor-pointer font-display font-semibold text-lg flex justify-between items-center list-none">
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  {item.q}
                </span>
                <span className="text-accent text-2xl leading-none group-open:rotate-45 transition-transform duration-300 group-hover:scale-125 shrink-0 ml-4">
                  +
                </span>
              </summary>
              <p className="px-6 pb-6 text-muted text-sm leading-relaxed">{item.a}</p>
            </motion.details>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="pb-24 mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="group relative rounded-3xl border border-border hover:border-accent/60 bg-surface/50 p-12 overflow-hidden transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <h2 className="relative text-3xl md:text-4xl font-display font-bold mb-4">
            ¿Dudas con tu pedido?
          </h2>
          <p className="relative text-muted mb-8">Escríbenos — contestamos en 24h.</p>
          <div className="relative inline-block">
            <Link to="/contact">
              <Button size="lg">
                Contactar soporte
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  )
}