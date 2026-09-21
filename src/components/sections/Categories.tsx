import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { ProductCategory } from '../../types'

const CATEGORIES: { key: ProductCategory; label: string; image: string }[] = [
  {
    key: 'hoodies',
    label: 'Hoodies',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
  },
  {
    key: 'sneakers',
    label: 'Sneakers',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
  },
  {
    key: 'accessories',
    label: 'Accesorios',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
  },
]

export function Categories() {
  return (
    <section className="py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-accent mb-3">
            Categorías
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold">
            Elige tu <span className="text-accent">terreno</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/shop?category=${cat.key}`}
                className="group relative block aspect-[4/5] rounded-2xl overflow-hidden border border-border hover:border-accent transition-colors"
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between">
                  <h3 className="text-3xl md:text-4xl font-display font-bold">
                    {cat.label}
                  </h3>
                  <div className="w-12 h-12 rounded-full bg-accent text-black flex items-center justify-center translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}