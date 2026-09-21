import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { notificationService } from '../../services'

export function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      notificationService.error('Email inválido', 'Revisa el formato')
      return
    }
    notificationService.success('¡Suscrito!', 'Bienvenido al drop list')
    setEmail('')
  }

  return (
    <section className="py-24 border-t border-border">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs uppercase tracking-widest text-accent mb-3">
            Drop list
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold">
            Sé el primero en <span className="text-accent">saberlo</span>
          </h2>
          <p className="mt-6 text-muted max-w-lg mx-auto">
            Nuevos drops, restocks y descuentos exclusivos. Sin spam, lo prometemos.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="flex-1 h-14 px-6 rounded-full bg-surface border border-border focus:border-accent outline-none transition-colors text-sm"
            />
            <button
              type="submit"
              className="h-14 px-8 rounded-full bg-accent text-black font-bold text-sm uppercase tracking-widest inline-flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(196,255,0,0.4)] transition-shadow"
            >
              Suscribirme
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}