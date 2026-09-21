import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Orbes de fondo (patrón 21st.dev) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-hot/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      {/* Grid sutil de fondo */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full py-24">
        <div className="max-w-4xl">
          {/* Badge superior */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 backdrop-blur-md px-4 py-2 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-widest">
              Drop 03 · Disponible ahora
            </span>
          </motion.div>

          {/* Título */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(3rem,10vw,9rem)] leading-[0.85] font-display font-bold"
          >
            <span className="text-gradient">Sin filtros.</span>
            <br />
            <span className="text-gradient">Sin reglas.</span>
            <br />
            <span className="text-accent text-accent-glow">Sin permiso.</span>
          </motion.h1>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 text-lg text-muted max-w-xl leading-relaxed"
          >
            Streetwear para quienes marcan su propio camino. Piezas limitadas,
            diseño brutal y actitud que no se negocia.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/shop"
              className="group inline-flex items-center gap-3 h-14 px-8 rounded-full bg-accent text-black font-bold text-sm uppercase tracking-widest transition-all hover:shadow-[0_0_40px_rgba(196,255,0,0.4)] hover:gap-4"
            >
              Explorar drop
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/shop?category=hoodies"
              className="h-14 px-8 rounded-full border border-border-strong text-sm font-bold uppercase tracking-widest flex items-center hover:border-accent hover:text-accent transition-colors"
            >
              Ver hoodies
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-lg"
          >
            {[
              { value: '50K+', label: 'Clientes' },
              { value: '4.9★', label: 'Rating' },
              { value: '200+', label: 'Drops' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl md:text-4xl font-bold text-accent">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-widest text-subtle mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-subtle">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-[1px] h-8 bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>
    </section>
  )
}