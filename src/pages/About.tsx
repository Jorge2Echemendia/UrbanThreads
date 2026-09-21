import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SEO } from '../components/SEO'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'

const VALUES = [
  {
    n: '01',
    title: 'Sin filtros',
    text: 'Diseñamos lo que nos da la gana. Si no te gusta, hay miles de tiendas aburridas.',
  },
  {
    n: '02',
    title: 'Ediciones reales',
    text: 'Cuando decimos "limitado", es limitado. No reponemos drops agotados.',
  },
  {
    n: '03',
    title: 'Producción consciente',
    text: 'Algodón orgánico certificado, tintas al agua y talleres auditados.',
  },
]

const TIMELINE = [
  {
    year: '2020',
    title: 'El primer drop',
    text: '50 hoodies impresos a mano en un garaje de Madrid.',
  },
  {
    year: '2022',
    title: 'Primera tienda',
    text: 'Abrimos nuestro primer espacio físico en Lavapiés.',
  },
  {
    year: '2024',
    title: 'Global',
    text: 'Enviamos a 24 países sin perder la actitud.',
  },
  {
    year: '2026',
    title: 'Drop 03',
    text: 'Más de 50K clientes confían en UrbanThreads.',
  },
]

const TEAM = [
  { name: 'Álex Ruiz', role: 'Fundador & Diseño' },
  { name: 'Sara Kim', role: 'Dirección creativa' },
  { name: 'Diego Ortega', role: 'Producción & Logística' },
]

export function About() {
  return (
    <>
      <SEO
        title="Sobre nosotros"
        description="Conoce la historia de UrbanThreads: streetwear sin filtros desde 2020."
        path="/about"
      />

      {/* Hero */}
      <section className="pt-32 pb-20 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <p className="text-xs uppercase tracking-widest text-accent mb-3">Nuestra historia</p>
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-[0.9]">
            Ropa para los que <span className="text-accent">no piden permiso</span>
          </h1>
          <p className="mt-8 text-lg text-muted max-w-2xl leading-relaxed">
            UrbanThreads nació en 2020 en un garaje de Madrid con una idea simple: hacer
            ropa que no se vea en Zara. Hoy seguimos igual — diseño brutal, series cortas
            y cero filtros.
          </p>
        </motion.div>
      </section>

      {/* Imagen + texto */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="group aspect-[4/5] rounded-3xl overflow-hidden border border-border hover:border-accent/50 transition-colors"
          >
            <img
              src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=800&q=80"
              alt="Taller UrbanThreads"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          <div>
            <p className="text-xs uppercase tracking-widest text-accent mb-3">Filosofía</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Menos drops, mejor ropa
            </h2>
            <p className="text-muted leading-relaxed mb-4">
              No sacamos una colección cada dos semanas para vender. Sacamos una cada
              trimestre, con piezas que aguanten años — no una temporada.
            </p>
            <p className="text-muted leading-relaxed">
              Cada prenda pasa por tres revisiones antes de salir. Si no la usaríamos
              nosotros, no la vendemos.
            </p>
          </div>
        </div>
      </section>

      {/* Valores — animaciones hover estilo 21st.dev */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-12">
            Lo que nos <span className="text-accent">mueve</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-2xl border border-border bg-surface/50 hover:border-accent/60 transition-colors overflow-hidden cursor-default"
              >
                {/* Gradiente que aparece en hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Número que rota y escala */}
                <motion.span
                  className="relative inline-block font-mono text-accent font-bold text-sm origin-left"
                  whileHover={{ scale: 1.4, rotate: -8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {v.n}
                </motion.span>

                <h3 className="relative font-display font-bold text-2xl mt-4 mb-3 group-hover:text-accent transition-colors">
                  {v.title}
                </h3>
                <p className="relative text-muted text-sm leading-relaxed">{v.text}</p>

                {/* Línea decorativa inferior */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline — hover animado */}
      <section className="py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-12">
            El <span className="text-accent">camino</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative p-6 rounded-2xl border border-transparent hover:border-border hover:bg-surface/50 transition-all cursor-default"
              >
                <motion.span
                  className="inline-block px-4 py-1.5 rounded-full bg-accent text-black font-mono font-bold text-xs mb-4"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {item.year}
                </motion.span>
                <h3 className="font-display font-bold text-xl mb-2 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted">{item.text}</p>

                {/* Línea vertical izquierda que crece */}
                <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-accent scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team — hover con rotación del inicial */}
      <section className="py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-12">
            El <span className="text-accent">equipo</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TEAM.map((person) => (
              <motion.div
                key={person.name}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group text-center cursor-default"
              >
                <motion.div
                  className="relative aspect-square rounded-3xl overflow-hidden border border-border group-hover:border-accent/60 mb-4 bg-gradient-to-br from-surface to-surface-2 flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Gradiente radial que aparece */}
                  <div className="absolute inset-0 bg-radial-gradient from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <motion.span
                    className="font-display font-bold text-6xl text-accent/30 group-hover:text-accent/70 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {person.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </motion.span>

                  {/* Esquina decorativa */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/0 group-hover:border-accent/60 transition-colors duration-500 rounded-tr-2xl" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-accent/0 group-hover:border-accent/60 transition-colors duration-500 rounded-bl-2xl" />
                </motion.div>

                <h3 className="font-display font-bold text-lg group-hover:text-accent transition-colors">
                  {person.name}
                </h3>
                <p className="text-sm text-muted">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="group relative rounded-3xl border border-border hover:border-accent/60 bg-surface/50 p-12 md:p-16 text-center overflow-hidden transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <h2 className="relative text-3xl md:text-5xl font-display font-bold mb-4">
            ¿Listo para el próximo drop?
          </h2>
          <p className="relative text-muted mb-8 max-w-lg mx-auto">
            Date de alta en la drop list y sé el primero en saberlo.
          </p>
          <div className="relative inline-block">
            <Link to="/shop">
              <Button size="lg">
                Ver catálogo
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  )
}