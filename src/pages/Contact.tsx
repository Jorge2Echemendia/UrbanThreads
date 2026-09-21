// src/pages/Contact.tsx
import { useState } from 'react'
import { Mail, MapPin, Clock, Send } from 'lucide-react'
import { SEO } from '../components/SEO'
import { Button } from '../components/ui/Button'
import { notificationService } from '../services'
import { cn } from '../lib/cn'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
  accepted: boolean
}

const INITIAL: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
  accepted: false,
}

const SUBJECTS = [
  { value: '', label: 'Selecciona un tema' },
  { value: 'order', label: 'Estado de mi pedido' },
  { value: 'return', label: 'Devolución o cambio' },
  { value: 'collab', label: 'Colaboración / prensa' },
  { value: 'wholesale', label: 'Venta al por mayor' },
  { value: 'other', label: 'Otro' },
]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<string[]>([])
  const [sending, setSending] = useState(false)

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors([])
  }

  const validate = (): string[] => {
    const list: string[] = []
    if (!form.name.trim()) list.push('El nombre es obligatorio.')
    else if (form.name.trim().length < 2) list.push('El nombre debe tener al menos 2 caracteres.')
    if (!form.email.trim()) list.push('El email es obligatorio.')
    else if (!EMAIL_REGEX.test(form.email.trim())) list.push('El email no tiene un formato válido.')
    if (!form.subject) list.push('Selecciona un asunto.')
    if (!form.message.trim()) list.push('El mensaje no puede estar vacío.')
    else if (form.message.trim().length < 10) list.push('El mensaje debe tener al menos 10 caracteres.')
    else if (form.message.trim().length > 1500) list.push('El mensaje no puede superar los 1500 caracteres.')
    if (!form.accepted) list.push('Debes aceptar la política de privacidad.')
    return list
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      notificationService.error('Revisa el formulario', `${validationErrors.length} error(es)`)
      return
    }

    setSending(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSending(false)
    setForm(INITIAL)
    setErrors([])
    notificationService.success('¡Mensaje enviado!', 'Te contestamos en menos de 24h')
  }

  return (
    <>
      <SEO
        title="Contacto"
        description="Escríbenos. Contestamos en menos de 24 horas."
        path="/contact"
      />

      <section className="pt-32 pb-16 mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <p className="text-xs uppercase tracking-widest text-accent mb-3">Hablemos</p>
        <h1 className="text-5xl md:text-7xl font-display font-bold">
          Cuéntanos tu <span className="text-accent">rollo</span>
        </h1>
        <p className="mt-8 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
          Dudas con un pedido, encargos especiales, colaboraciones o simplemente
          decir hola. Escríbenos.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12">
          {/* Info */}
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-display font-bold">Email</p>
                <p className="text-sm text-muted">hola@urbanthreads.co</p>
                <p className="text-xs text-subtle mt-1">Respuesta en 24h</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-display font-bold">Estudio</p>
                <p className="text-sm text-muted">Calle Embajadores 42</p>
                <p className="text-sm text-muted">Madrid, 28012</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-display font-bold">Horario</p>
                <p className="text-sm text-muted">Lun a Vie · 10:00 – 19:00</p>
                <p className="text-sm text-muted">Sáb · 11:00 – 15:00</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {errors.length > 0 && (
              <div className="p-4 rounded-2xl bg-hot/10 border border-hot/30">
                <p className="text-sm font-bold text-hot mb-2">Revisa el formulario:</p>
                <ul className="text-xs text-hot/90 space-y-1 list-disc list-inside">
                  {errors.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Tu nombre"
                  className={cn(
                    'w-full h-12 px-5 rounded-2xl bg-surface border outline-none transition-colors text-sm',
                    errors.some((e) => e.includes('nombre'))
                      ? 'border-hot'
                      : 'border-border focus:border-accent'
                  )}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="tu@email.com"
                  className={cn(
                    'w-full h-12 px-5 rounded-2xl bg-surface border outline-none transition-colors text-sm',
                    errors.some((e) => e.includes('email'))
                      ? 'border-hot'
                      : 'border-border focus:border-accent'
                  )}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                Asunto *
              </label>
              <select
                value={form.subject}
                onChange={(e) => update('subject', e.target.value)}
                className={cn(
                  'w-full h-12 px-5 rounded-2xl bg-surface border outline-none transition-colors text-sm cursor-pointer',
                  errors.some((e) => e.includes('asunto'))
                    ? 'border-hot'
                    : 'border-border focus:border-accent'
                )}
              >
                {SUBJECTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2">
                Mensaje *
              </label>
              <textarea
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                rows={6}
                placeholder="Cuéntanos con detalle..."
                className={cn(
                  'w-full p-5 rounded-2xl bg-surface border outline-none transition-colors text-sm resize-none',
                  errors.some((e) => e.includes('mensaje'))
                    ? 'border-hot'
                    : 'border-border focus:border-accent'
                )}
              />
              <p className="mt-1 text-[10px] text-subtle text-right">
                {form.message.length} / 1500
              </p>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.accepted}
                onChange={(e) => update('accepted', e.target.checked)}
                className="mt-1 accent-[#c4ff00]"
              />
              <span className="text-xs text-muted leading-relaxed">
                Acepto la política de privacidad y el tratamiento de mis datos para
                responder a esta consulta.
              </span>
            </label>

            <Button type="submit" size="lg" fullWidth disabled={sending}>
              {sending ? (
                'Enviando...'
              ) : (
                <>
                  Enviar mensaje
                  <Send className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </section>
    </>
  )
}