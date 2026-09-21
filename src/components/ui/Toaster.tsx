import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { notificationService } from '../../services'
import type { ToastEvent } from '../../services/NotificationService'
import { cn } from '../../lib/cn'

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
}

const colorMap = {
  success: 'text-accent',
  error: 'text-hot',
  info: 'text-blue-400',
}

export function Toaster() {
  const [toasts, setToasts] = useState<ToastEvent[]>([])

  useEffect(() => {
    const unsubscribe = notificationService.subscribe((event) => {
      setToasts((prev) => [...prev, event])

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== event.id))
      }, 4000)
    })
    return unsubscribe
  }, [])

  const dismiss = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id))

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = iconMap[toast.type]
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className={cn(
                'pointer-events-auto flex items-start gap-3 rounded-2xl border border-border bg-surface/95 p-4 backdrop-blur-xl shadow-2xl'
              )}
            >
              <Icon className={cn('w-5 h-5 mt-0.5 shrink-0', colorMap[toast.type])} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">{toast.title}</p>
                {toast.message && (
                  <p className="text-xs text-muted mt-0.5 truncate">{toast.message}</p>
                )}
              </div>
              <button
                onClick={() => dismiss(toast.id)}
                className="text-subtle hover:text-text transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}